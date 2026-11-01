#pragma once

#include <Arduino.h>
#include <SPI.h>
#include <Adafruit_GFX.h>
#include <Adafruit_ST7789.h>
#include "../include/config.h"

struct EyeCoords {
    float x;
    float y;
    float width;
    float height;
    float pupilX;
    float pupilY;
    float pupilRadius;
    float openness; // 0.0 (closed) to 1.0 (fully open)
};

class EyeEngine {
public:
    EyeEngine();
    void begin();
    void update();
    void setState(HuxState state);
    void setAudioLevel(float level);
    void triggerBlink();

private:
    Adafruit_ST7789 tft;
    HuxState currentState;
    float audioLevel;

    EyeCoords leftEye;
    EyeCoords rightEye;

    // Saccadic target positions
    float targetLookX;
    float targetLookY;
    uint32_t nextSaccadeTime;

    // Blink state
    bool isBlinking;
    uint32_t blinkStartTime;
    uint32_t blinkDuration;
    uint32_t nextBlinkTime;

    // Frame timing
    uint32_t lastRenderTime;

    void updatePhysics();
    void renderFrame();
    void drawEye(const EyeCoords& eye, uint16_t primaryColor, uint16_t pupilColor);
    void drawWaveform(int y, float amp);
    void updateBlink();
    void updateSaccades();

    // Color definitions (16-bit 565 RGB)
    const uint16_t COLOR_BG       = 0x0821; // Very dark navy / black
    const uint16_t COLOR_CYAN     = 0x07FF; // Electric cyan
    const uint16_t COLOR_AMBER    = 0xFDC0; // Warm amber gold
    const uint16_t COLOR_GREEN    = 0x2FE6; // Bright emerald green
    const uint16_t COLOR_ALERT    = 0xF9A4; // Alert red-orange
    const uint16_t COLOR_PUPIL    = 0x0000; // Deep black pupil
    const uint16_t COLOR_HIGHLIGHT = 0xFFFF; // Pure white glint
};
