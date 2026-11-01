#include "halo.h"
#include <math.h>

HaloController::HaloController()
    : pixels(NEOPIXEL_COUNT, PIN_NEOPIXEL, NEO_GRB + NEO_KHZ800),
      currentState(STATE_IDLE),
      brightness(DEFAULT_HALO_BRIGHT),
      lastUpdate(0),
      animFrame(0),
      currentAudioLevel(0.0f) {}

void HaloController::begin() {
    pixels.begin();
    pixels.setBrightness(brightness);
    pixels.clear();
    pixels.show();
}

void HaloController::setBrightness(uint8_t b) {
    brightness = b;
    pixels.setBrightness(brightness);
    pixels.show();
}

void HaloController::setState(HuxState state) {
    if (currentState != state) {
        currentState = state;
        animFrame = 0;
    }
}

void HaloController::setAudioLevel(float level) {
    currentAudioLevel = constrain(level, 0.0f, 1.0f);
}

void HaloController::update() {
    uint32_t now = millis();
    if (now - lastUpdate < 20) { // ~50fps update rate
        return;
    }
    lastUpdate = now;
    animFrame++;

    switch (currentState) {
        case STATE_IDLE:
            renderIdle();
            break;
        case STATE_LISTENING:
            renderListening();
            break;
        case STATE_THINKING:
            renderThinking();
            break;
        case STATE_SPEAKING:
            renderSpeaking();
            break;
        case STATE_SUCCESS:
            renderSuccess();
            break;
        case STATE_ALERT:
            renderAlert();
            break;
    }
    pixels.show();
}

void HaloController::renderIdle() {
    // Warm amber breathing sine wave
    float breath = (sin((float)animFrame * 0.04f) + 1.0f) * 0.5f; // 0.0 to 1.0
    uint8_t r = (uint8_t)(255.0f * (0.3f + 0.7f * breath));
    uint8_t g = (uint8_t)(130.0f * (0.3f + 0.7f * breath));
    uint8_t b = (uint8_t)(20.0f * (0.3f + 0.7f * breath));

    for (int i = 0; i < NEOPIXEL_COUNT; i++) {
        pixels.setPixelColor(i, pixels.Color(r, g, b));
    }
}

void HaloController::renderListening() {
    // Electric cyan pulsing glow
    float breath = (sin((float)animFrame * 0.12f) + 1.0f) * 0.5f;
    uint8_t r = 0;
    uint8_t g = (uint8_t)(180.0f + 75.0f * breath);
    uint8_t b = (uint8_t)(220.0f + 35.0f * breath);

    for (int i = 0; i < NEOPIXEL_COUNT; i++) {
        pixels.setPixelColor(i, pixels.Color(r, g, b));
    }
}

void HaloController::renderThinking() {
    // Clockwise chasing amber/gold comet
    pixels.clear();
    int lead = (animFrame / 3) % NEOPIXEL_COUNT;

    for (int i = 0; i < NEOPIXEL_COUNT; i++) {
        int diff = (lead - i + NEOPIXEL_COUNT) % NEOPIXEL_COUNT;
        if (diff == 0) {
            pixels.setPixelColor(i, pixels.Color(255, 180, 0)); // Head
        } else if (diff == 1) {
            pixels.setPixelColor(i, pixels.Color(160, 90, 0));  // Mid tail
        } else if (diff == 2) {
            pixels.setPixelColor(i, pixels.Color(50, 25, 0));   // Weak tail
        } else {
            pixels.setPixelColor(i, pixels.Color(5, 2, 0));     // Ambient
        }
    }
}

void HaloController::renderSpeaking() {
    // Sound reactive equalizer ring
    // Maps audio amplitude to number of lit LEDs and brightness
    int litCount = (int)(currentAudioLevel * (float)NEOPIXEL_COUNT + 0.5f);
    litCount = constrain(litCount, 1, NEOPIXEL_COUNT);

    for (int i = 0; i < NEOPIXEL_COUNT; i++) {
        if (i < litCount) {
            // Gradient from cyan to purple
            uint8_t r = (uint8_t)(30 + (i * 20));
            uint8_t g = (uint8_t)(220 - (i * 15));
            uint8_t b = 255;
            pixels.setPixelColor(i, pixels.Color(r, g, b));
        } else {
            pixels.setPixelColor(i, pixels.Color(0, 15, 25));
        }
    }
}

void HaloController::renderSuccess() {
    // Bright emerald green confirmation flash and settle
    if (animFrame < 20) {
        pixels.clear();
        for (int i = 0; i < NEOPIXEL_COUNT; i++) {
            pixels.setPixelColor(i, pixels.Color(0, 255, 80));
        }
    } else {
        float decay = max(0.0f, 1.0f - (float)(animFrame - 20) * 0.05f);
        uint8_t g = (uint8_t)(255.0f * decay);
        for (int i = 0; i < NEOPIXEL_COUNT; i++) {
            pixels.setPixelColor(i, pixels.Color(0, g, (uint8_t)(g * 0.3f)));
        }
        if (decay <= 0.01f) {
            currentState = STATE_IDLE;
        }
    }
}

void HaloController::renderAlert() {
    // Pulsing crimson alert
    bool onPhase = ((animFrame / 6) % 2) == 0;
    for (int i = 0; i < NEOPIXEL_COUNT; i++) {
        if (onPhase) {
            pixels.setPixelColor(i, pixels.Color(255, 20, 20));
        } else {
            pixels.setPixelColor(i, pixels.Color(40, 0, 0));
        }
    }
}
