// ============================================================================
// HUX DESKTOP VOICE ASSISTANT - MAIN ARDUINO ENTRYPOINT
// Target: ESP32-S3-WROOM-1 (16MB Flash, 8MB PSRAM)
// Compatible with both Arduino IDE and PlatformIO
// ============================================================================

#include "include/config.h"
#include "src/eyes.h"
#include "src/halo.h"
#include "src/audio.h"
#include "src/home_assistant.h"

// Forward reference to main setup and loop implemented in src/main.cpp
// When compiling in Arduino IDE where all src files are linked, this serves
// as the master sketch entry file.
