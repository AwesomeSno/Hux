# Hux - Devlog

## Initial Conception & Architecture

I've always wanted a proper smart desktop assistant that actually feels alive instead of just another boring black speaker puck sitting on my desk. For Half Life, I'm building Hux—an expressive desktop companion inspired by Jarvis with animated vector eyes on a color IPS display, an Arc-Reactor RGB ring, and local voice control hooked straight into Home Assistant.

The whole thing needs to run locally without cloud lag, look clean on a desk, and stay strictly under the $65 Half Life budget limit.

Here is the breakdown of the initial concept and the 10 engineering sketches I put together.

---

### 01: Why normal smart speakers suck

I started by breaking down what's wrong with commercial smart speakers like Echo or Nest. They're just lifeless plastic cylinders with a single blinking dot, you have no clue what they're doing, and routing every request through the cloud adds annoying delay. Hux fixes this by giving it an expressive face on a display, an ambient light ring, and instant local Wi-Fi control.

![Fig 01: Concept Teardown](images/initial_01_problem_lifeless_speakers.png)

---

### 02: Hardware block diagram

Mapped out the full hardware setup and how everything connects. The ESP32-S3 runs the show, driving the ST7789 display over SPI, an 8-LED NeoPixel ring via RMT, an INMP441 digital microphone, and a MAX98357A Class-D amplifier with a 3W speaker over two separate I2S buses. Power comes in through USB-C with onboard 3.3V regulation.

![Fig 02: System Architecture](images/initial_02_hux_system_block_diagram.png)

---

### 03: ESP32-S3 pin budget

I picked the ESP32-S3 because it has plenty of horsepower (dual 240MHz cores), built-in Wi-Fi, and enough hardware peripherals to handle a fast display and two separate audio streams simultaneously. Mapped out every single GPIO pin so SPI, I2S RX, I2S TX, NeoPixels, and I2C don't step on each other.

![Fig 03: ESP32-S3 Pinout Budget](images/initial_03_esp32s3_pinout_budget.png)

---

### 04: Expressive face state machine

Static avatars look robotic, so I planned the eyes as a dynamic state machine with procedural curves. It has idle blinking, a wide-eyed listening state, looking-up thinking states, and a speaking animation that bounces with the audio waveform. Because it's drawn with code rather than static images, it runs smooth at 60fps and takes barely any flash memory.

![Fig 04: Face Animation State Machine](images/initial_04_expressive_face_state_machine.png)

---

### 05: Arc-Reactor halo ring

Sketched out an 8-LED circular ring using SK6812 MINI-E addressable NeoPixels placed directly around the display bezel. It acts as an ambient status light—spinning cyan when listening for wake words, breathing when processing, and showing volume levels—diffused through a 3D-printed frosted ring.

![Fig 05: Arc-Reactor Halo](images/initial_05_arc_reactor_halo_optics.png)

---

### 06: Digital I2S audio pipeline

Analog audio on microcontroller boards always picks up buzzing from Wi-Fi bursts, so I went 100% digital. An INMP441 MEMS microphone handles voice capture over I2S, and a MAX98357A amplifier decodes digital audio and powers the 3W micro-speaker. No analog mic lines on the board means zero RF hum.

![Fig 06: Audio Pipeline](images/initial_06_voice_pipeline_i2s_dsp.png)

---

### 07: Home Assistant local integration

Zero cloud dependencies. Hux connects directly to my local Home Assistant server over Wi-Fi using authenticated WebSockets. When I ask it to toggle a light or check a sensor, it executes over the local LAN in under 15ms without bouncing traffic to an external server.

![Fig 07: Home Assistant Architecture](images/initial_07_home_assistant_local_api.png)

---

### 08: Power delivery and ESD protection

Designed the power input for everyday desk use. A standard 16-pin USB-C receptacle with 5.1k pull-downs negotiates 5V from any USB-C charger. Added a USBLC6-2SC6 TVS diode array to protect the USB data lines from static shocks when plugging in cables, plus a TLV75533 3.3V LDO with ceramic decoupling caps to keep the power rail steady during Wi-Fi spikes.

![Fig 08: Power Delivery & ESD](images/initial_08_power_delivery_and_esd.png)

---

### 09: Board layout and ergonomics

Set the PCB form factor to 72mm × 72mm with rounded corners and four M3 mounting holes. The screen is centered right where you look, and the USB-C port sits at the bottom edge so the power cable plugs straight in from behind without cluttering the desk.

![Fig 09: Mechanical Floorplan](images/initial_09_pcb_floorplan_ergonomics.png)

---

### 10: BOM and Half Life budget check

Checked every part against JLCPCB and LCSC pricing to make sure we stay strictly under the $65 Half Life limit. 

- 5x custom PCBs + SMT assembly: ~$16.00
- ESP32-S3 module: ~$6.50
- ST7789 IPS display: ~$4.50
- INMP441 mic: ~$1.80
- MAX98357A amp + speaker: ~$3.20
- SK6812 LEDs + passives: ~$2.50
- Direct shipping & taxes: ~$15.00
- **Total: ~$49.50**

Leaves about $15.50 of headroom under the $65 cap for filament and hardware.

![Fig 10: Budget & BOM](images/initial_10_half_life_budget_bom.png)

---

### Summary & Next Steps

Initial planning and architecture are locked in. The system block diagram, pinout, audio circuits, display state machine, and PCB envelope are all mapped out and safely under budget. Next up is routing the board in KiCad and writing the face animation firmware.
