# Hux

A compact, desktop AI smart home assistant inspired by Jarvis from Iron Man. Hux features an animated digital face, real-time status display, voice interaction, and native integration with Home Assistant to control your home with personality.

---

## What is Hux?

Most smart home voice hubs are boring black cylinders with no personality or visual life. Hux is designed to bring an Iron Man-style desktop companion to your desk without spending hundreds of dollars.

Built around an ESP32-S3 microcontroller, Hux sits on your desk displaying an expressive animated face with reactive eye states (idle, listening, processing, speaking, alert). When you speak to Hux or trigger smart automations, it talks back with custom personality, controls your Home Assistant entities (lights, media, switches, climate), and dynamically switches its screen to display live device cards, weather, or room telemetry.

---

## Key Features

- **Expressive Face & HUD Display**: A crisp IPS color screen showing reactive eye animations, facial expressions, and dynamic dashboard cards for home devices.
- **Jarvis-like Persona**: Low-latency voice interaction paired with LLM or local Home Assistant Assist pipelines for witty, helpful responses.
- **Home Assistant Native**: Direct communication with Home Assistant via WebSockets and REST APIs for zero-cloud, instant local device control.
- **Full Voice Pipeline**: Onboard digital I2S MEMS microphone for wake-word and voice pickup, paired with an I2S DAC amplifier and speaker for clear voice output.
- **Ambient Status Halo**: Addressable RGB NeoPixels around the perimeter for Arc Reactor-inspired glowing status cues.
- **Budget-Conscious (<$65)**: Spec'd specifically to remain under the Hack Club Half Life $65 limit, including PCB fabrication, all BOM components, taxes, and shipping.

---

## Hardware Architecture

| Component | Part / Spec | Role |
|---|---|---|
| **MCU** | ESP32-S3-WROOM-1 (16MB Flash, 8MB PSRAM) | Dual-core 240MHz controller with Wi-Fi & BLE |
| **Display** | 1.69" or 2.0" ST7789 IPS SPI LCD (240×280) | Expressive animated face & smart home telemetry HUD |
| **Microphone** | INMP441 / ICS-43434 I2S Digital MEMS Mic | High-SNR voice input and wake-word capture |
| **Audio Out** | MAX98357A I2S Class-D DAC + 3W 4Ω Speaker | Voice synthesis and feedback playback |
| **Aesthetics** | WS2812B NeoPixel Ring (8–12 LEDs) | Arc Reactor aura / voice activity glow |
| **Power & Enclosure** | USB-C 5V input + 3D Printed Desk Stand | Clean desktop footprint |

---

## Half Life Budget Estimate (Under $65 Cap)

| Item | Estimated Cost (USD) |
|---|---|
| Custom 2-Layer PCB + SMT Assembly (JLCPCB 5 pcs) | ~$16.00 |
| ESP32-S3 Module + Passives | ~$6.50 |
| ST7789 Color IPS Display (SPI) | ~$4.50 |
| INMP441 I2S Microphone Module | ~$1.80 |
| MAX98357A I2S Amp + 3W Speaker | ~$3.20 |
| Addressable RGB Ring + USB-C Port & LDO | ~$2.50 |
| Shipping, Taxes & Packaging Allowance | ~$15.00 |
| **Total Estimated Cost** | **~$49.50 (Comfortably under $65)** |

---

## Status & Roadmap

- [x] Initial concept & architecture
- [ ] Schematic design in KiCad
- [ ] PCB layout & 3D enclosure modeling
- [ ] Face animation engine & LVGL dashboard firmware
- [ ] Home Assistant API & Assist voice pipeline integration

---

## Author

Designed and built by **Harinandan J V** ([@AwesomeSno](https://github.com/AwesomeSno)) for Hack Club's Half Life hardware grant program.
