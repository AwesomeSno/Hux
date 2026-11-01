#include <Arduino.h>
#include "../include/config.h"
#include "eyes.h"
#include "halo.h"
#include "audio.h"
#include "home_assistant.h"

// Hardware driver singletons
EyeEngine eyeEngine;
HaloController halo;
AudioDriver audio;
HomeAssistantClient haClient;

// Global state tracking
volatile HuxState globalState = STATE_IDLE;
TaskHandle_t uiTaskHandle = NULL;
TaskHandle_t audioNetTaskHandle = NULL;

// Callback when Home Assistant changes state
void onStateChanged(HuxState newState) {
    globalState = newState;
    eyeEngine.setState(newState);
    halo.setState(newState);

    if (newState == STATE_LISTENING) {
        audio.playWakeChime();
    } else if (newState == STATE_SUCCESS) {
        audio.playSuccessChime();
    } else if (newState == STATE_ALERT) {
        audio.playAlertChime();
    }
}

// ----------------------------------------------------------------------------
// Core 1 FreeRTOS Task: Dedicated 60fps Vector UI & NeoPixel Halo
// ----------------------------------------------------------------------------
void uiTask(void* parameter) {
    for (;;) {
        eyeEngine.update();
        halo.update();
        vTaskDelay(pdMS_TO_TICKS(16)); // ~60 fps
    }
}

// ----------------------------------------------------------------------------
// Core 0 FreeRTOS Task: Audio Streaming, Mic DSP, and Network WebSockets
// ----------------------------------------------------------------------------
void audioNetTask(void* parameter) {
    int16_t micBuffer[MIC_BUFFER_SIZE];
    uint32_t lastMicCheck = 0;

    for (;;) {
        haClient.update();

        // Read microphone input
        size_t samplesRead = audio.readMic(micBuffer, MIC_BUFFER_SIZE);
        if (samplesRead > 0) {
            float rms = audio.getMicRMS();
            eyeEngine.setAudioLevel(rms);
            halo.setAudioLevel(rms);

            // If active voice session, stream audio frames to Home Assistant
            if (globalState == STATE_LISTENING) {
                haClient.sendAudioChunk(micBuffer, samplesRead);
            }

            // Local audio threshold trigger (wake simulation)
            if (globalState == STATE_IDLE && rms > 0.45f) {
                uint32_t now = millis();
                if (now - lastMicCheck > 1500) {
                    lastMicCheck = now;
                    onStateChanged(STATE_LISTENING);
                    haClient.startVoiceSession();
                }
            }
        }

        vTaskDelay(pdMS_TO_TICKS(10));
    }
}

// ----------------------------------------------------------------------------
// Hardware Initialization and Setup
// ----------------------------------------------------------------------------
void setup() {
    Serial.begin(115200);
    delay(500);
    Serial.println();
    Serial.println("==================================================");
    Serial.println("   Hux Desktop Voice Assistant - ESP32-S3 Firmware");
    Serial.println("   Version: 1.0.0");
    Serial.println("==================================================");

    // Initialize physical user button (BOOT on GPIO 0)
    pinMode(PIN_BTN_BOOT, INPUT_PULLUP);

    // 1. Initialize Halo NeoPixels
    halo.begin();
    halo.setState(STATE_IDLE);

    // 2. Initialize Vector Eye Engine on ST7789
    eyeEngine.begin();
    eyeEngine.setState(STATE_IDLE);

    // 3. Initialize Dual I2S Audio Drivers
    if (audio.begin()) {
        Serial.println("[Audio] Dual I2S initialized successfully.");
        audio.playBootChime();
    } else {
        Serial.println("[Audio] Warning: I2S peripheral initialization returned non-zero.");
    }

    // 4. Initialize Network and Home Assistant Client
    haClient.setStateCallback(onStateChanged);
    haClient.begin(DEFAULT_WIFI_SSID, DEFAULT_WIFI_PASS, DEFAULT_HA_HOST, DEFAULT_HA_PORT, DEFAULT_HA_TOKEN);

    // 5. Spawn FreeRTOS Multithreaded Tasks on Core 1 and Core 0
    xTaskCreatePinnedToCore(
        uiTask,
        "UITask",
        TASK_UI_STACK_SIZE,
        NULL,
        TASK_UI_PRIORITY,
        &uiTaskHandle,
        TASK_UI_CORE
    );

    xTaskCreatePinnedToCore(
        audioNetTask,
        "AudioNetTask",
        TASK_AUDIO_STACK_SIZE,
        NULL,
        TASK_AUDIO_PRIORITY,
        &audioNetTaskHandle,
        TASK_AUDIO_CORE
    );

    Serial.println("[System] FreeRTOS tasks launched on Core 0 and Core 1.");
}

// ----------------------------------------------------------------------------
// Main Loop: Handles Button Interrupts & State Transitions
// ----------------------------------------------------------------------------
void loop() {
    static bool lastBtnState = HIGH;
    static uint32_t btnPressTime = 0;

    bool currentBtnState = digitalRead(PIN_BTN_BOOT);

    // Detect button press (active LOW)
    if (lastBtnState == HIGH && currentBtnState == LOW) {
        btnPressTime = millis();
    } else if (lastBtnState == LOW && currentBtnState == HIGH) {
        uint32_t pressDuration = millis() - btnPressTime;
        if (pressDuration > 50 && pressDuration < 1000) {
            // Short press: cycle state or trigger voice assistant
            if (globalState == STATE_IDLE) {
                onStateChanged(STATE_LISTENING);
                haClient.startVoiceSession();
            } else if (globalState == STATE_LISTENING) {
                onStateChanged(STATE_THINKING);
                haClient.stopVoiceSession();
            } else {
                onStateChanged(STATE_IDLE);
            }
        } else if (pressDuration >= 1000) {
            // Long press: trigger alert test
            onStateChanged(STATE_ALERT);
        }
    }
    lastBtnState = currentBtnState;

    delay(20);
}
