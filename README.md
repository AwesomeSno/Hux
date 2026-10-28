# Hux

A desktop AI smart home companion built with an ESP32-S3, featuring an animated expressive face display, an addressable RGB status ring, dual I2S voice I/O, and native local integration with Home Assistant. Inspired by Jarvis from Iron Man.

![Hux Desktop Assistant Hero](assets/hux_cover_hero.png)

---

## What is this?

Most smart home speakers on the market are completely lifeless—they're just boring black plastic pucks sitting on your desk that listen to you with zero personality and no visual feedback beyond a single blinking LED.

For Hack Club's Half Life, I wanted to build something with actual life and presence on my desk: **Hux**. It's a custom desktop hardware companion powered by an ESP32-S3 microcontroller with a crisp color IPS display running expressive animated eyes and reactive facial emotions. 

When you speak to Hux or trigger automations around your room, it talks back, controls your Home Assistant entities (lights, plugs, AC, media) over local Wi-Fi, and dynamically switches its screen into a live telemetry HUD showing room sensor readings, weather, or device toggles.

---

## How it works

1. **Expressive Face & Telemetry Display**: A 1.69" / 2.0" ST7789 IPS LCD (240×280) sits in the center of the board, rendering smooth animated eye expressions (idle blinking, attentive listening, thinking, and speaking waveforms). When you ask about your room or devices, the screen smoothly docks into live Home Assistant glance cards.
2. **Arc-Reactor Status Halo**: A circular ring of 8 addressable RGB NeoPixels encircles the display bezel. It pulses cyan when listening, spins amber when thinking, and flashes red on sensor alerts, giving the desk unit a real presence.
3. **Local Home Assistant Integration**: Hux talks directly to Home Assistant using native WebSockets and REST APIs over local Wi-Fi. No slow cloud hops, no proprietary subscriptions—just instant local control over lights, switches, and smart entities.
4. **I2S Digital Voice Pipeline**: For voice input, an INMP441 digital MEMS microphone samples audio through a front-facing acoustic sound port drilled through the PCB. For voice replies, a MAX98357A I2S Class-D DAC amplifier powers an onboard 3W micro speaker.
5. **72mm Desktop Form Factor**: The whole system is packaged onto a 72mm × 72mm 2-layer PCB with rounded corners and M3 mounting holes, powered cleanly over USB-C.

![Hux Top 3D View](assets/hux_top_3d.png)

---

## Hardware Architecture

| Component | Part / Spec | Role |
|---|---|---|
| **MCU** | ESP32-S3-WROOM-1 (16MB Flash, 8MB PSRAM) | Dual-core 240MHz controller handling Wi-Fi, display, and dual I2S audio |
| **Display** | 1.69" or 2.0" ST7789 IPS SPI LCD (240×280) | Animated vector face and smart home telemetry cards |
| **Microphone** | INMP441 I2S Digital MEMS Mic | High-SNR voice input with front acoustic port |
| **Audio Out** | MAX98357A I2S Class-D DAC + 3W 4Ω Speaker | Voice synthesis and feedback playback |
| **Halo Lighting** | 8x SK6812 MINI-E Addressable RGB LEDs | Circular Arc-Reactor status glow |
| **Power & Circuit** | USB-C 16-pin, TLV75533 3.3V LDO, USBLC6-2SC6 ESD | Clean desktop USB 5V power and transient ESD protection |
| **Dimensions** | 72mm × 72mm × 1.6mm FR4 (6mm corner radii) | Standard M3 standoff mounting holes |

---

## Schematic & Hardware Design

The hardware is designed as a clean 2-layer board in KiCad 10:

![Hux Schematic](assets/hux_schematic.png)

All hardware design and manufacturing files are located in [`kicad/`](kicad/):
- Full Project: [`kicad/hux.kicad_pro`](kicad/hux.kicad_pro)
- Schematic: [`kicad/hux.kicad_sch`](kicad/hux.kicad_sch) (Printable: [`kicad/hux_schematic.pdf`](kicad/hux_schematic.pdf))
- PCB Layout: [`kicad/hux.kicad_pcb`](kicad/hux.kicad_pcb)
- Bill of Materials: [`kicad/bom.csv`](kicad/bom.csv) (JLCPCB pre-formatted with LCSC parts)
- Pick & Place: [`kicad/cpl.csv`](kicad/cpl.csv)
- Production Gerbers: [`kicad/hux_gerbers.zip`](kicad/hux_gerbers.zip)

---

## Components & Bill of Materials

| Item | Part / Designation | Supplier Code (LCSC / Mfg) | Package | Qty | Role |
|---|---|---|---|---|---|
| **Microcontroller** | ESP32-S3-WROOM-1-N16R8 | LCSC: C5180337 | SMD Module | 1 | 240MHz dual-core MCU, 16MB Flash, 8MB PSRAM, Wi-Fi & BLE |
| **Color IPS Display** | ST7789 1.69" / 2.0" IPS LCD | LCSC: C2903565 / ST7789V | 8-Pin Header / SPI | 1 | Expressive face animations & telemetry dashboard |
| **Digital MEMS Mic** | INMP441 | LCSC: C444583 | SMD Acoustic | 1 | Omnidirectional I2S microphone for voice commands |
| **Audio Amplifier** | MAX98357AETE+T | LCSC: C268261 | QFN-16 | 1 | 3.2W Mono Class-D I2S DAC amplifier |
| **Micro Speaker** | 4Ω 3W Cavity Speaker | JST-PH 2.0mm / C131337 | 28mm / 31mm | 1 | Voice responses and sound effects |
| **Arc-Reactor Halo** | SK6812 MINI-E | LCSC: C2890040 | SMD-3535 | 8 | Circular addressable RGB NeoPixels for status cues |
| **Voltage Regulator** | TLV75533PDBVR | LCSC: C397683 | SOT-23-5 | 1 | Low-dropout 3.3V 500mA LDO regulator |
| **ESD Protection** | USBLC6-2SC6 | LCSC: C7519 | SOT-23-6 | 1 | High-speed USB D+/D- transient ESD suppressor |
| **USB-C Receptacle** | TYPE-C-31-M-12 (16-Pin) | LCSC: C165948 | 16-Pin SMD | 1 | 5V DC power and native USB-CDC programming |
| **Tactile Buttons** | TL3342F160QG | LCSC: C318884 | SMD SPST | 2 | Hardware Reset (EN) and Bootloader (IO0) |
| **Ceramic Capacitors** | 10µF 16V X7R (0805) | LCSC: C15849 | 0805 | 3 | Bulk power input/output filters |
| **Decoupling Caps** | 100nF 50V X7R (0805) | LCSC: C14663 | 0805 | 11 | IC supply decoupling & LED smoothing |
| **Resistors** | 5.1kΩ 1% (0805) | LCSC: C17704 | 0805 | 2 | USB-C CC1/CC2 5V pull-downs |
| **Resistors** | 10kΩ 1% (0805) | LCSC: C17414 | 0805 | 3 | Pull-ups for EN, BOOT, SD_MODE |
| **Resistors** | 330Ω 1% (0805) | LCSC: C17632 | 0805 | 1 | NeoPixel DIN data line protection |
| **Telemetry Header** | 4-Pin 2.54mm Header | LCSC: C22548 | 1x04 P2.54mm | 1 | I2C sensor expansion (SDA, SCL, 3V3, GND) |

---

## Author

Designed and built by **Harinandan J V** ([@AwesomeSno](https://github.com/AwesomeSno)) for Hack Club's Half Life.
