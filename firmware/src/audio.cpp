#include "audio.h"
#include <math.h>

AudioDriver::AudioDriver()
    : currentVolume(0.7f),
      micInitialized(false),
      spkInitialized(false) {}

bool AudioDriver::begin() {
    initMicI2S();
    initSpkI2S();
    return micInitialized && spkInitialized;
}

void AudioDriver::setVolume(float vol) {
    currentVolume = constrain(vol, 0.0f, 1.0f);
}

void AudioDriver::initMicI2S() {
    i2s_config_t i2s_mic_config = {
        .mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_RX),
        .sample_rate = MIC_SAMPLE_RATE,
        .bits_per_sample = I2S_BITS_PER_SAMPLE_16BIT,
        .channel_format = I2S_CHANNEL_FMT_ONLY_LEFT,
        .communication_format = I2S_COMM_FORMAT_STAND_I2S,
        .intr_alloc_flags = ESP_INTR_FLAG_LEVEL1,
        .dma_buf_count = 4,
        .dma_buf_len = 256,
        .use_apll = false,
        .tx_desc_auto_clear = false,
        .fixed_mclk = 0
    };

    i2s_pin_config_t mic_pins = {
        .bck_io_num = PIN_I2S_MIC_SCK,
        .ws_io_num = PIN_I2S_MIC_WS,
        .data_out_num = I2S_PIN_NO_CHANGE,
        .data_in_num = PIN_I2S_MIC_SD
    };

    esp_err_t err = i2s_driver_install(I2S_MIC_PORT, &i2s_mic_config, 0, NULL);
    if (err == ESP_OK) {
        i2s_set_pin(I2S_MIC_PORT, &mic_pins);
        i2s_zero_dma_buffer(I2S_MIC_PORT);
        micInitialized = true;
    }
}

void AudioDriver::initSpkI2S() {
    i2s_config_t i2s_spk_config = {
        .mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_TX),
        .sample_rate = SPK_SAMPLE_RATE,
        .bits_per_sample = I2S_BITS_PER_SAMPLE_16BIT,
        .channel_format = I2S_CHANNEL_FMT_RIGHT_LEFT,
        .communication_format = I2S_COMM_FORMAT_STAND_I2S,
        .intr_alloc_flags = ESP_INTR_FLAG_LEVEL1,
        .dma_buf_count = 6,
        .dma_buf_len = 256,
        .use_apll = false,
        .tx_desc_auto_clear = true,
        .fixed_mclk = 0
    };

    i2s_pin_config_t spk_pins = {
        .bck_io_num = PIN_I2S_SPK_BCLK,
        .ws_io_num = PIN_I2S_SPK_LRC,
        .data_out_num = PIN_I2S_SPK_DIN,
        .data_in_num = I2S_PIN_NO_CHANGE
    };

    esp_err_t err = i2s_driver_install(I2S_SPK_PORT, &i2s_spk_config, 0, NULL);
    if (err == ESP_OK) {
        i2s_set_pin(I2S_SPK_PORT, &spk_pins);
        i2s_zero_dma_buffer(I2S_SPK_PORT);
        spkInitialized = true;
    }
}

size_t AudioDriver::readMic(int16_t* buffer, size_t sampleCount) {
    if (!micInitialized) return 0;
    size_t bytesRead = 0;
    i2s_read(I2S_MIC_PORT, buffer, sampleCount * sizeof(int16_t), &bytesRead, portMAX_DELAY);
    return bytesRead / sizeof(int16_t);
}

float AudioDriver::getMicRMS() {
    if (!micInitialized) return 0.0f;
    const size_t testSamples = 128;
    int16_t raw[testSamples];
    size_t samplesRead = readMic(raw, testSamples);

    if (samplesRead == 0) return 0.0f;

    float sumSquares = 0.0f;
    for (size_t i = 0; i < samplesRead; i++) {
        float norm = (float)raw[i] / 32768.0f;
        sumSquares += norm * norm;
    }

    float rms = sqrt(sumSquares / (float)samplesRead);
    return constrain(rms * 4.0f, 0.0f, 1.0f); // Scaled sensitivity
}

size_t AudioDriver::writeSpeaker(const int16_t* buffer, size_t sampleCount) {
    if (!spkInitialized) return 0;
    size_t bytesWritten = 0;
    i2s_write(I2S_SPK_PORT, buffer, sampleCount * sizeof(int16_t), &bytesWritten, portMAX_DELAY);
    return bytesWritten / sizeof(int16_t);
}

void AudioDriver::playTone(float freqHz, uint32_t durationMs, float volume) {
    if (!spkInitialized) return;

    size_t totalSamples = (size_t)((float)SPK_SAMPLE_RATE * ((float)durationMs / 1000.0f));
    const size_t chunkSamples = 128;
    int16_t chunk[chunkSamples * 2]; // Stereo (L+R)

    float phase = 0.0f;
    float phaseIncrement = (2.0f * 3.14159265f * freqHz) / (float)SPK_SAMPLE_RATE;
    float amp = currentVolume * volume * 24000.0f;

    size_t samplesGenerated = 0;
    while (samplesGenerated < totalSamples) {
        size_t samplesInThisChunk = min(chunkSamples, totalSamples - samplesGenerated);
        for (size_t i = 0; i < samplesInThisChunk; i++) {
            int16_t sample = (int16_t)(sin(phase) * amp);
            chunk[i * 2] = sample;     // Left
            chunk[i * 2 + 1] = sample; // Right
            phase += phaseIncrement;
            if (phase >= 2.0f * 3.14159265f) phase -= 2.0f * 3.14159265f;
        }

        size_t written = 0;
        i2s_write(I2S_SPK_PORT, chunk, samplesInThisChunk * 2 * sizeof(int16_t), &written, portMAX_DELAY);
        samplesGenerated += samplesInThisChunk;
    }
}

void AudioDriver::playBootChime() {
    playTone(523.25f, 120, 0.5f); // C5
    delay(30);
    playTone(659.25f, 120, 0.6f); // E5
    delay(30);
    playTone(783.99f, 220, 0.7f); // G5
}

void AudioDriver::playWakeChime() {
    playTone(659.25f, 90, 0.6f);  // E5
    delay(20);
    playTone(880.00f, 140, 0.7f); // A5
}

void AudioDriver::playSuccessChime() {
    playTone(783.99f, 100, 0.6f);  // G5
    delay(20);
    playTone(1046.50f, 180, 0.7f); // C6
}

void AudioDriver::playAlertChime() {
    playTone(880.00f, 120, 0.8f);
    delay(40);
    playTone(587.33f, 200, 0.8f);
}
