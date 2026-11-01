#include "eyes.h"
#include <math.h>

EyeEngine::EyeEngine()
    : tft(PIN_TFT_CS, PIN_TFT_DC, PIN_TFT_MOSI, PIN_TFT_SCLK, PIN_TFT_RST),
      currentState(STATE_IDLE),
      audioLevel(0.0f),
      targetLookX(0.0f),
      targetLookY(0.0f),
      nextSaccadeTime(0),
      isBlinking(false),
      blinkStartTime(0),
      blinkDuration(160),
      nextBlinkTime(2000),
      lastRenderTime(0) {

    // Center coordinates for 240x280 portrait screen
    leftEye.x = 68.0f;
    leftEye.y = 125.0f;
    leftEye.width = 54.0f;
    leftEye.height = 72.0f;
    leftEye.pupilX = 0.0f;
    leftEye.pupilY = 0.0f;
    leftEye.pupilRadius = 14.0f;
    leftEye.openness = 1.0f;

    rightEye.x = 172.0f;
    rightEye.y = 125.0f;
    rightEye.width = 54.0f;
    rightEye.height = 72.0f;
    rightEye.pupilX = 0.0f;
    rightEye.pupilY = 0.0f;
    rightEye.pupilRadius = 14.0f;
    rightEye.openness = 1.0f;
}

void EyeEngine::begin() {
    // Initialize display backlight PWM
    ledcSetup(TFT_BL_PWM_CHANNEL, TFT_BL_PWM_FREQ, TFT_BL_PWM_RES);
    ledcAttachPin(PIN_TFT_BL, TFT_BL_PWM_CHANNEL);
    ledcWrite(TFT_BL_PWM_CHANNEL, DEFAULT_BRIGHTNESS);

    // Initialize ST7789 display controller
    tft.init(TFT_WIDTH, TFT_HEIGHT);
    tft.setRotation(0); // Portrait 240x280
    tft.fillScreen(COLOR_BG);

    // Initial eye draw
    renderFrame();
}

void EyeEngine::setState(HuxState state) {
    if (currentState != state) {
        currentState = state;
        tft.fillScreen(COLOR_BG); // Clear on state switch
    }
}

void EyeEngine::setAudioLevel(float level) {
    audioLevel = constrain(level, 0.0f, 1.0f);
}

void EyeEngine::triggerBlink() {
    if (!isBlinking) {
        isBlinking = true;
        blinkStartTime = millis();
        blinkDuration = 150 + random(0, 50);
    }
}

void EyeEngine::updateBlink() {
    uint32_t now = millis();

    if (!isBlinking && now >= nextBlinkTime) {
        triggerBlink();
        // Schedule next random blink (between 2.5 and 5.5 seconds)
        nextBlinkTime = now + random(2500, 5500);
    }

    if (isBlinking) {
        uint32_t elapsed = now - blinkStartTime;
        if (elapsed >= blinkDuration) {
            isBlinking = false;
            leftEye.openness = 1.0f;
            rightEye.openness = 1.0f;
        } else {
            // Symmetrical sine closing and opening curve
            float progress = (float)elapsed / (float)blinkDuration;
            float closing = sin(progress * 3.14159f);
            leftEye.openness = max(0.05f, 1.0f - closing);
            rightEye.openness = leftEye.openness;
        }
    }
}

void EyeEngine::updateSaccades() {
    uint32_t now = millis();

    // In listening or speaking state, look straight ahead
    if (currentState == STATE_LISTENING) {
        targetLookX = 0.0f;
        targetLookY = 0.0f;
        return;
    }

    // In thinking state, glance up and right
    if (currentState == STATE_THINKING) {
        targetLookX = 8.0f;
        targetLookY = -9.0f;
        return;
    }

    // In idle state, natural saccadic exploration
    if (now >= nextSaccadeTime) {
        targetLookX = (float)random(-10, 11);
        targetLookY = (float)random(-8, 9);
        nextSaccadeTime = now + random(1200, 3200);
    }
}

void EyeEngine::updatePhysics() {
    // Smooth exponential lerp towards target look position
    const float lerpFactor = 0.18f;
    leftEye.pupilX += (targetLookX - leftEye.pupilX) * lerpFactor;
    leftEye.pupilY += (targetLookY - leftEye.pupilY) * lerpFactor;
    rightEye.pupilX = leftEye.pupilX;
    rightEye.pupilY = leftEye.pupilY;

    // State specific height modifications
    if (currentState == STATE_LISTENING) {
        leftEye.height = 78.0f;  // Widened attention
        rightEye.height = 78.0f;
    } else if (currentState == STATE_ALERT) {
        leftEye.height = 42.0f;  // Focused slit
        rightEye.height = 42.0f;
    } else {
        leftEye.height = 72.0f;
        rightEye.height = 72.0f;
    }
}

void EyeEngine::drawEye(const EyeCoords& eye, uint16_t primaryColor, uint16_t pupilColor) {
    int currentH = (int)(eye.height * eye.openness);
    if (currentH < 4) currentH = 4;
    int currentW = (int)eye.width;
    int cornerR = min(currentW / 2, currentH / 2);

    int topX = (int)(eye.x - currentW / 2.0f);
    int topY = (int)(eye.y - currentH / 2.0f);

    // Draw outer eye capsule
    tft.fillRoundRect(topX, topY, currentW, currentH, cornerR, primaryColor);

    // Draw inner pupil if eye is sufficiently open
    if (eye.openness > 0.35f) {
        int px = (int)(eye.x + eye.pupilX);
        int py = (int)(eye.y + eye.pupilY);
        int pr = (int)(eye.pupilRadius * eye.openness);

        if (pr > 2) {
            tft.fillCircle(px, py, pr, pupilColor);
            // Glint specular reflection highlight
            tft.fillCircle(px + 3, py - 3, max(2, pr / 4), COLOR_HIGHLIGHT);
        }
    }
}

void EyeEngine::drawWaveform(int centerY, float amp) {
    int barWidth = 4;
    int gap = 3;
    int totalBars = 16;
    int startX = (TFT_WIDTH - (totalBars * (barWidth + gap))) / 2;

    for (int i = 0; i < totalBars; i++) {
        float phase = (float)i * 0.4f + (float)millis() * 0.008f;
        float h = (sin(phase) * 0.5f + 0.5f) * amp * 34.0f + 4.0f;
        int barH = (int)h;
        int bx = startX + i * (barWidth + gap);
        int by = centerY - barH / 2;

        tft.fillRoundRect(bx, by, barWidth, barH, 2, COLOR_CYAN);
    }
}

void EyeEngine::renderFrame() {
    // Fast partial screen refresh: redraw background box around eyes
    int clearY = 80;
    int clearH = 120;
    tft.fillRect(20, clearY, TFT_WIDTH - 40, clearH, COLOR_BG);

    uint16_t eyeColor = COLOR_CYAN;
    uint16_t pupilCol = COLOR_PUPIL;

    switch (currentState) {
        case STATE_IDLE:
            eyeColor = COLOR_CYAN;
            break;
        case STATE_LISTENING:
            eyeColor = 0x5FFF; // Very bright electric cyan
            break;
        case STATE_THINKING:
            eyeColor = COLOR_AMBER;
            break;
        case STATE_SPEAKING:
            eyeColor = COLOR_CYAN;
            break;
        case STATE_SUCCESS:
            eyeColor = COLOR_GREEN;
            break;
        case STATE_ALERT:
            eyeColor = COLOR_ALERT;
            break;
    }

    if (currentState == STATE_SUCCESS) {
        // Joyful smiling eyes: draw upward curved arcs
        tft.fillCircle((int)leftEye.x, (int)leftEye.y, 24, COLOR_GREEN);
        tft.fillCircle((int)leftEye.x, (int)leftEye.y + 6, 24, COLOR_BG);

        tft.fillCircle((int)rightEye.x, (int)rightEye.y, 24, COLOR_GREEN);
        tft.fillCircle((int)rightEye.x, (int)rightEye.y + 6, 24, COLOR_BG);
    } else {
        drawEye(leftEye, eyeColor, pupilCol);
        drawEye(rightEye, eyeColor, pupilCol);
    }

    // If speaking, render dynamic audio waveform at bottom
    if (currentState == STATE_SPEAKING) {
        tft.fillRect(30, 220, TFT_WIDTH - 60, 44, COLOR_BG);
        drawWaveform(242, max(0.2f, audioLevel));
    } else {
        // Clear bottom waveform area
        tft.fillRect(30, 220, TFT_WIDTH - 60, 44, COLOR_BG);
    }
}

void EyeEngine::update() {
    uint32_t now = millis();
    if (now - lastRenderTime < 16) { // Target 60 fps
        return;
    }
    lastRenderTime = now;

    updateBlink();
    updateSaccades();
    updatePhysics();
    renderFrame();
}
