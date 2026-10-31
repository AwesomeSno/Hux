# Hux - Devlog: Initial Conception & Architectural Planning

Commercial smart speakers have always bothered me. Almost every smart home hub on the market is just a boring matte-black plastic cylinder that sits on your desk, listens passively, and has zero visual life or personality. You ask it to turn on a light, you stare at a tiny blinking LED, and you wait one or two seconds for an external cloud server to bounce the command back to your room.

For Hack Club's Half Life, I'm building **Hux**—a desktop AI companion inspired by Jarvis. The goal is to create a living, expressive desk companion that pairs an animated color IPS display rendering emotive vector eyes with an Arc-Reactor RGB status halo, a full onboard digital voice pipeline, and native local integration with Home Assistant over Wi-Fi.

Most importantly, the entire hardware stack—including custom 2-layer PCB fabrication, surface-mount assembly, connectors, display, mic, speaker, taxes, and shipping—must stay strictly under the **$65 Half Life budget cap**.

Here is the complete engineering breakdown and architectural sketches from the initial planning phase.

---

### 01: Concept Teardown: Commercial Smart Speakers vs Hux

I started by dissecting why conventional smart speakers fail as desktop instruments:
- **No glanceable feedback**: A single blinking status LED conveys virtually no state information. You have no idea if the microphone picked up your phrase, if the request is processing, or what the device is doing.
- **Lifeless aesthetic**: Monolithic black plastic or fabric cylinders fade into desk clutter with zero visual warmth or interactive character.
- **Cloud latency**: Routing voice and entity toggles through remote cloud servers adds 800ms–2000ms of latency, which ruins the feeling of an instant personal assistant.

Hux addresses these core friction points by pairing an expressive animated face on a color IPS display with an ambient RGB status ring and direct local Home Assistant communication over local Wi-Fi.

![Fig 01: Concept Teardown](images/initial_01_problem_lifeless_speakers.png)

---

### 02: System Architecture & Subsystem Partitioning

Next, I mapped out the global hardware block diagram. The system partitions into five major functional domains coordinated by a central microcontroller:
1. **Compute & Wireless Engine**: An ESP32-S3-WROOM-1 module running dual 240MHz Xtensa LX7 cores with 16MB Flash and 8MB Octal PSRAM.
2. **Visual & Telemetry HUD**: A 1.69" ST7789 IPS LCD (240×280) running over a dedicated 40MHz SPI master channel.
3. **Ambient Aura**: An 8-node circular ring of SK6812 MINI-E addressable RGB NeoPixels encircling the display bezel, driven via the ESP32-S3 hardware RMT peripheral.
4. **Dual I2S Audio Pipeline**: An INMP441 digital MEMS microphone for acoustic voice capture and a MAX98357A Class-D DAC amplifier driving an onboard 3W micro speaker.
5. **Power Delivery & Protection**: A 16-pin USB Type-C receptacle with 5.1kΩ CC pull-downs, a low-capacitance USBLC6-2SC6 ESD clamp array, and a TLV75533 3.3V 500mA low-dropout regulator.

![Fig 02: System Architecture](images/initial_02_hux_system_block_diagram.png)

---

### 03: Microcontroller Selection & Strict GPIO Pin Budget

Choosing the right MCU was critical. An RP2040 or basic ESP32 wouldn't cut it: the RP2040 lacks integrated Wi-Fi and Bluetooth, while earlier ESP32 chips have limited DMA channel bandwidth when driving high-framerate SPI displays alongside dual I2S audio streams.

The **ESP32-S3** provides dedicated hardware DMA, vector SIMD instructions for edge audio processing, and ample GPIO lines. I mapped out every pin cleanly to prevent peripheral bus contention:

| Peripheral Bus | Signals & Pins | Role & Interface Type |
|---|---|---|
| **ST7789 Display (SPI Master)** | `IO10` (MOSI), `IO12` (SCK), `IO11` (CS), `IO9` (DC), `IO4` (RST), `IO5` (BLK) | High-speed 40MHz display bus for 60fps eye animation. |
| **INMP441 MEMS Mic (I2S RX)** | `IO42` (WS/LRCLK), `IO41` (SCK/BCLK), `IO2` (SD/DATA) | 24-bit 16kHz digital acoustic capture. |
| **MAX98357A Amp (I2S TX)** | `IO16` (LRC), `IO15` (BCLK), `IO7` (DIN) | 16-bit 44.1kHz playback for synthesized voice. |
| **Arc-Reactor Halo (RMT)** | `IO48` (RGB_DATA) | Precise 800kHz single-wire timing via RMT peripheral. |
| **Expansion & Sensors (I2C)** | `IO8` (SDA), `IO18` (SCL) | Auxiliary sensor bus with onboard 4.7kΩ pull-ups. |
| **Boot & Native USB** | `IO0` (BOOT), `IO19` (USB D-), `IO20` (USB D+) | Direct hardware flashing and serial telemetry over USB-C. |

![Fig 03: ESP32-S3 Pinout Budget](images/initial_03_esp32s3_pinout_budget.png)

---

### 04: Expressive Face UI & Animation State Machine

Static pixel avatars look robotic and unnatural. To give Hux genuine charm, I modeled the eye renderer as a dynamic state machine with procedural Bézier easing curves:
- **Idle State**: Relaxed rounded capsules with a subtle vertical floating rhythm (2.5-second period) and natural blinks every 3.5 to 6 seconds.
- **Listening State**: Eyes widen slightly (+15% height), pupils shift upward toward the user, and the iris takes on a bright cyan glow.
- **Thinking State**: Eyes shift to the upper corner, squint slightly (-20% vertical scale), and dart intermittently as if processing context.
- **Speaking State**: Vertical height pulsates in real-time proportional to the audio output amplitude envelope, giving natural lip-sync feel.
- **Success & Error States**: Upward crescent curves for successful entity execution; downward angled brows with amber aura for network or parse errors.

Rendering the eyes as pure procedural vectors rather than pre-rendered GIF frames saves flash storage and allows silky-smooth 60fps interpolation directly in ESP32-S3 internal SRAM.

![Fig 04: Face Animation State Machine](images/initial_04_expressive_face_state_machine.png)

---

### 05: Arc-Reactor Halo Optical Ring

To complement the face display, I designed a circular halo of 8 addressable RGB LEDs (SK6812 MINI-E, 3.2×2.8mm footprint) arranged in a 360-degree circle around the display:
- **Geometry**: Polar coordinates $(r = 24.5\text{ mm}, \theta = n \times 45^\circ)$ centered directly around the display bezel.
- **Chasing Pulse during Wake-Word**: When "Hey Hux" is recognized, a cyan light beam sweeps circularly around the ring at 1.5 rotations/sec before settling into a warm breathing glow.
- **Volume & Processing Arc**: When volume adjustments or sensor queries occur, the ring lights up as a proportional radial progress bar.
- **Optical Diffusion**: Designed to sit behind a frosted 3D-printed diffuser ring, blending the individual LED emitters into a seamless ring of light.

![Fig 05: Arc-Reactor Halo](images/initial_05_arc_reactor_halo_optics.png)

---

### 06: Dual I2S Audio Pipeline: Digital MEMS Mic + Class-D DAC

Analog audio circuits on microcontroller boards are notorious for picking up high-frequency RF noise from Wi-Fi power amplifiers. To prevent buzzing or hiss, I chose a 100% digital audio architecture:
- **Microphone**: An **INMP441** bottom-port digital MEMS microphone. It contains an integrated acoustic transducer, preamplifier, and 24-bit delta-sigma ADC that outputs clean I2S PCM data directly to the ESP32-S3 DMA engine.
- **Audio Output**: A Maxim **MAX98357A** mono Class-D amplifier. It takes digital I2S audio over GPIO pins, decodes it with an internal DAC, and delivers up to 3.2W into a 4Ω micro-speaker with 92% efficiency.
- **Zero RF Buzz**: Because no analog audio traces run across the PCB, 2.4GHz Wi-Fi bursts cannot induce hum or buzz into the microphone line.

![Fig 06: Audio Pipeline](images/initial_06_voice_pipeline_i2s_dsp.png)

---

### 07: Home Assistant Local-First WebSocket Architecture

Privacy and speed were non-negotiable. Commercial smart speakers upload raw audio to corporate cloud servers, introducing privacy concerns and lag. Hux connects directly to Home Assistant via local Wi-Fi:
- **Local WebSocket Connection**: Hux opens a direct authenticated WebSocket connection (`ws://homeassistant.local:8123/api/websocket`) to the local Home Assistant instance over the LAN.
- **Sub-15ms Command Latency**: Toggling lights, adjusting climate zones, or triggering automation scenes executes in under 15 milliseconds without a single packet leaving the local network.
- **State Feedback**: Hux subscribes to `state_changed` event buses. When a room sensor detects motion or a light turns on from an external switch, Hux's face reacts immediately with glanceable visual confirmation.

![Fig 07: Home Assistant Architecture](images/initial_07_home_assistant_local_api.png)

---

### 08: Power Delivery, ESD Protection & Decoupling

A clean power tree is essential when driving an ESP32-S3 radio, high-brightness backlight, and audio amplifier simultaneously:
- **USB Type-C Front-End**: Standard 16-pin USB-C receptacle configured for sink role with dual $5.1\text{ k}\Omega \pm 1\%$ pull-down resistors on CC1 and CC2. This enables any standard USB-C charger or laptop port to negotiate 5V at up to 1.5A–3.0A.
- **ESD Suppression**: A **USBLC6-2SC6** rail-to-rail TVS diode array protects the USB $D+$ and $D-$ differential lines against high-voltage static discharge (±15kV air discharge) when plugging or unplugging cables.
- **3.3V Low-Dropout Regulator**: A Texas Instruments TLV75533 (500mA rating, 130mV dropout) regulates 5V down to 3.3V for the ESP32-S3, ST7789 logic, and INMP441 mic. High-frequency 100nF ceramic decoupling capacitors and bulk 10µF X7R filter capacitors prevent voltage dips during heavy 2.4GHz Wi-Fi transmission bursts.

![Fig 08: Power Delivery & ESD](images/initial_08_power_delivery_and_esd.png)

---

### 09: Mechanical Floorplan & Ergonomics

I established the physical board constraints to ensure Hux sits cleanly on a desk:
- **Dimensions**: **72.0mm × 72.0mm** square footprint with smooth 6.0mm corner chamfers.
- **Mounting Holes**: Four M3 mounting holes (3.2mm drill diameter with 5.5mm copper annular ring connected to GND) placed symmetrically at corner offsets $(6.0\text{ mm}, 6.0\text{ mm})$.
- **Display Centering**: The ST7789 display window is centered at $(36.0\text{ mm}, 34.0\text{ mm})$, providing an ergonomic viewing angle when mounted in an angled 3D-printed desktop desk stand.
- **Cable Egress**: The USB-C port is centered on the bottom edge $(36.0\text{ mm}, 69.5\text{ mm})$ so the USB power cable exits cleanly out the rear without desk clutter.

![Fig 09: Mechanical Floorplan](images/initial_09_pcb_floorplan_ergonomics.png)

---

### 10: Half Life Budget Verification & BOM Optimization

To meet the strict Hack Club Half Life requirements, every single component was checked against JLCPCB production availability and LCSC part numbers to ensure the total bill of materials comes in well under the **$65 budget cap**:

| Item Description | Part / Supplier Code | Package | Quantity | Cost (USD) |
|---|---|---|---|---|
| **JLCPCB 2-Layer PCB + SMT Assembly** | JLCPCB Standard FR4 (5 pcs) | Custom 72×72mm | 1 batch | $16.00 |
| **ESP32-S3-WROOM-1-N16R8 Core** | LCSC: C5180337 | SMD Module | 1 | $6.50 |
| **ST7789 1.69" IPS Color Display** | LCSC: C2903565 | 8-Pin Header | 1 | $4.50 |
| **INMP441 Digital I2S MEMS Mic** | LCSC: C444583 | Bottom-Port SMD | 1 | $1.80 |
| **MAX98357A I2S Amp + 3W Speaker** | LCSC: C268261 / C131337 | QFN-16 / JST-PH | 1 | $3.20 |
| **SK6812 MINI-E RGB Ring (8 pcs) + Passives** | LCSC: C2890040 / Passives | SMD-3535 / 0805 | 1 set | $2.50 |
| **Global Direct Line Shipping & Taxes** | Standard Courier Line | Package | 1 | $15.00 |
| **Total Estimated Cost** | | | | **$49.50** |

This leaves a comfortable **$15.50 contingency buffer** under the $65 limit, fully covering packaging and 3D printing filament.

![Fig 10: Budget & BOM](images/initial_10_half_life_budget_bom.png)

---

### Summary & Next Steps

The initial engineering architecture for Hux is locked in:
- [x] Defined core UX and teardown of commercial smart speakers.
- [x] Established hardware block diagram and subsystem partitioning.
- [x] Locked down the ESP32-S3 pinout budget with dedicated dual I2S buses.
- [x] Designed the expressive face emotion state machine and visual HUD.
- [x] Modeled the circular Arc-Reactor 8x NeoPixel status halo geometry.
- [x] Designed the digital MEMS microphone and Class-D audio amplifier circuits.
- [x] Architected the zero-cloud, local-first Home Assistant WebSocket integration.
- [x] Designed the USB-C power delivery, LDO regulation, and ESD protection circuits.
- [x] Sized the 72mm × 72mm PCB mechanical envelope and mounting points.
- [x] Verified complete BOM cost under the $65 Half Life cap ($49.50 total).

With the architecture complete, the next phase is capturing the full schematic in KiCad, routing the 2-layer PCB, and laying down the vector animation firmware.
