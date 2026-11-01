# Hux Firmware

Production-grade C++ firmware for the **Hux Desktop Voice Assistant**, running on an **ESP32-S3-WROOM-1** (240MHz dual-core, 16MB Flash, 8MB PSRAM).

---

## Hardware Pin Mapping

All pins strictly match the KiCad PCB schematic (`hux.kicad_sch`):

| Peripheral | Signal | ESP32-S3 GPIO | Description |
| :--- | :--- | :--- | :--- |
| **ST7789 Display** | SPI MOSI | `GPIO 11` | SPI Master Out Slave In |
| | SPI SCLK | `GPIO 12` | SPI Clock (up to 40MHz) |
| | Chip Select (CS) | `GPIO 14` | Active LOW chip select |
| | Data/Command (DC) | `GPIO 9` | Mode selection |
| | Reset (RST) | `GPIO 10` | Hardware display reset |
| | Backlight (BLK) | `GPIO 21` | PWM brightness control |
| **Halo NeoPixels** | Data In | `GPIO 48` | 8x SK6812 MINI-E RGB LEDs |
| **INMP441 Mic** | Serial Clock (SCK)| `GPIO 6` | I2S Bit Clock (I2S0) |
| | Word Select (WS) | `GPIO 5` | I2S Left/Right Clock |
| | Serial Data (SD) | `GPIO 4` | I2S Data from MEMS mic |
| **MAX98357A Amp** | Bit Clock (BCLK) | `GPIO 15` | I2S Bit Clock (I2S1) |
| | LR Clock (LRC) | `GPIO 7` | I2S Left/Right Word Clock |
| | Data In (DIN) | `GPIO 16` | I2S Audio Out to 3.2W Amp |
| **I2C Expansion** | SDA | `GPIO 1` | Telemetry & Qwiic sensor bus |
| | SCL | `GPIO 2` | 400kHz I2C clock |
| **User Button** | BOOT / Trigger | `GPIO 0` | Active LOW multi-function switch |
| **Native USB** | D- / D+ | `GPIO 19` / `20` | Native USB CDC / JTAG |

---

## Multithreaded Architecture

Hux leverages FreeRTOS across both Xtensa LX7 cores:

- **Core 1 (UI Thread)**: Dedicated to rendering vector eyes on the ST7789 IPS display at 60 fps and animating the 8-pixel NeoPixel status halo.
- **Core 0 (Audio & Network Thread)**: Handles I2S DMA microphone streaming, DSP audio level calculation, chime generation, and bidirectional WebSocket communication with local Home Assistant.

---

## Emotive State Machine

Hux implements 6 distinct expressive states:

1. `STATE_IDLE`: Cyan gaze with organic micro-saccades and natural blinks (2.5s to 5.5s intervals). NeoPixel halo breathes warm amber.
2. `STATE_LISTENING`: Eyes widen (+15%), looking forward. NeoPixel halo glows electric cyan. Audio frames stream to Home Assistant Assist.
3. `STATE_THINKING`: Eyes glance upward-right. NeoPixel halo runs a clockwise amber comet animation.
4. `STATE_SPEAKING`: Eyes respond dynamically, while a 16-bar audio visualizer renders at the bottom of the screen.
5. `STATE_SUCCESS`: Joyful smiling arc eyes with bright emerald green confirmation flash.
6. `STATE_ALERT`: Focused slit eyes with pulsing crimson alert rings.

---

## Build and Flash Instructions

### Method 1: PlatformIO (Recommended)

1. Open this `firmware/` folder in VS Code with PlatformIO installed.
2. Connect Hux via USB-C.
3. Run the build and upload task:
   ```bash
   pio run --target upload
   ```
4. Open the serial monitor at 115200 baud:
   ```bash
   pio device monitor -b 115200
   ```

### Method 2: Arduino IDE

1. Install the **esp32** board package by Espressif in the Boards Manager (version 2.0.14 or later).
2. Select Board: **ESP32S3 Dev Module**.
3. Configure settings:
   - USB CDC On Boot: `Enabled`
   - Flash Size: `16MB (128Mb)`
   - Partition Scheme: `16M Flash (3MB APP/9.9MB FATFS)`
   - PSRAM: `OPI PSRAM`
4. Install required libraries from Library Manager:
   - `Adafruit GFX Library`
   - `Adafruit ST7735 and ST7789 Library`
   - `Adafruit NeoPixel`
   - `ArduinoWebsockets` by Gil Maimon
   - `ArduinoJson` by Benoit Blanchon
5. Open `firmware/hux_firmware.ino` and click **Upload**.
