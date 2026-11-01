#pragma once

#include <Arduino.h>
#include <driver/i2s.h>
#include "../include/config.h"

class AudioDriver {
public:
    AudioDriver();
    bool begin();
    
    // Microphone operations
    size_t readMic(int16_t* buffer, size_t sampleCount);
    float getMicRMS(); // Returns normalized RMS amplitude 0.0 to 1.0

    // Speaker operations
    size_t writeSpeaker(const int16_t* buffer, size_t sampleCount);
    void playTone(float freqHz, uint32_t durationMs, float volume = 0.5f);
    void playBootChime();
    void playWakeChime();
    void playSuccessChime();
    void playAlertChime();

    void setVolume(float vol); // 0.0 to 1.0

private:
    float currentVolume;
    bool micInitialized;
    bool spkInitialized;

    void initMicI2S();
    void initSpkI2S();
};
