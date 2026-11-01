#pragma once

#include <Arduino.h>
#include <Adafruit_NeoPixel.h>
#include "../include/config.h"

class HaloController {
public:
    HaloController();
    void begin();
    void update();
    void setState(HuxState state);
    void setBrightness(uint8_t brightness);
    void setAudioLevel(float level); // 0.0 to 1.0

private:
    Adafruit_NeoPixel pixels;
    HuxState currentState;
    uint8_t brightness;
    uint32_t lastUpdate;
    uint16_t animFrame;
    float currentAudioLevel;

    void renderIdle();
    void renderListening();
    void renderThinking();
    void renderSpeaking();
    void renderSuccess();
    void renderAlert();

    uint32_t colorWheel(uint8_t pos);
};
