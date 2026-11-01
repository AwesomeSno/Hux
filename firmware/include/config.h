#pragma once

#include <Arduino.h>

// ============================================================================
// HUX HARDWARE CONFIGURATION AND PIN DEFINITIONS
// Target MCU: ESP32-S3-WROOM-1 (16MB Flash, 8MB PSRAM)
// All GPIO assignments strictly match the Hux KiCad PCB schematic.
// ============================================================================

// ----------------------------------------------------------------------------
// ST7789 IPS Display (240x280 resolution, SPI interface)
// ----------------------------------------------------------------------------
#define TFT_WIDTH           240
#define TFT_HEIGHT          280
#define PIN_TFT_MOSI        11
#define PIN_TFT_SCLK        12
#define PIN_TFT_CS          14
#define PIN_TFT_DC          9
#define PIN_TFT_RST         10
#define PIN_TFT_BL          21

// PWM Backlight configuration
#define TFT_BL_PWM_CHANNEL  0
#define TFT_BL_PWM_FREQ     5000
#define TFT_BL_PWM_RES      8
#define DEFAULT_BRIGHTNESS  220 // 0-255

// ----------------------------------------------------------------------------
// Arc-Reactor Halo (8x SK6812 MINI-E / WS2812B NeoPixels)
// ----------------------------------------------------------------------------
#define PIN_NEOPIXEL        48
#define NEOPIXEL_COUNT      8
#define DEFAULT_HALO_BRIGHT 140 // 0-255

// ----------------------------------------------------------------------------
// I2S Microphone Input (INMP441 MEMS Omnidirectional)
// ----------------------------------------------------------------------------
#define PIN_I2S_MIC_SCK     6
#define PIN_I2S_MIC_WS      5
#define PIN_I2S_MIC_SD      4
#define I2S_MIC_PORT        I2S_NUM_0
#define MIC_SAMPLE_RATE     16000
#define MIC_BUFFER_SIZE     1024

// ----------------------------------------------------------------------------
// I2S Audio Amplifier Output (MAX98357A 3.2W Class-D)
// ----------------------------------------------------------------------------
#define PIN_I2S_SPK_BCLK    15
#define PIN_I2S_SPK_LRC     7
#define PIN_I2S_SPK_DIN     16
#define I2S_SPK_PORT        I2S_NUM_1
#define SPK_SAMPLE_RATE     22050
#define SPK_BUFFER_SIZE     1024

// ----------------------------------------------------------------------------
// I2C Telemetry and Sensor Expansion Bus
// ----------------------------------------------------------------------------
#define PIN_I2C_SDA         1
#define PIN_I2C_SCL         2
#define I2C_FREQ_HZ         400000

// ----------------------------------------------------------------------------
// Hardware User Controls
// ----------------------------------------------------------------------------
#define PIN_BTN_BOOT        0

// ----------------------------------------------------------------------------
// Emotive States
// ----------------------------------------------------------------------------
enum HuxState {
    STATE_IDLE = 0,
    STATE_LISTENING,
    STATE_THINKING,
    STATE_SPEAKING,
    STATE_SUCCESS,
    STATE_ALERT
};

// ----------------------------------------------------------------------------
// Network and Home Assistant Defaults
// ----------------------------------------------------------------------------
#define DEFAULT_WIFI_SSID       "YourWiFiSSID"
#define DEFAULT_WIFI_PASS       "YourWiFiPassword"
#define DEFAULT_HA_HOST         "homeassistant.local"
#define DEFAULT_HA_PORT         8123
#define DEFAULT_HA_TOKEN        "YOUR_LONG_LIVED_ACCESS_TOKEN"
#define DEFAULT_DEVICE_NAME     "Hux Voice Assistant"
#define FIRMWARE_VERSION        "1.0.0"

// ----------------------------------------------------------------------------
// FreeRTOS Task Configurations
// ----------------------------------------------------------------------------
#define TASK_UI_STACK_SIZE      8192
#define TASK_UI_PRIORITY        2
#define TASK_UI_CORE            1

#define TASK_AUDIO_STACK_SIZE   8192
#define TASK_AUDIO_PRIORITY     3
#define TASK_AUDIO_CORE         0

#define TASK_NET_STACK_SIZE     8192
#define TASK_NET_PRIORITY       1
#define TASK_NET_CORE           0
