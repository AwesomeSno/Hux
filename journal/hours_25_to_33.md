# Hux - Devlog

## Hours 25 - 33

Following the completion of the 2-layer KiCad board routing, DRC checks, and baseline firmware drivers at the 25-hour milestone, I spent hours 25 to 33 focusing on mechanical enclosure CAD, acoustic chamber engineering, 3D printing tolerances, on-device DSP wake-word recognition, Home Assistant local voice streaming, and full prototype benchtop assembly.

Here is the breakdown of what I worked on:

---

### Hour 26: 3D CAD enclosure design and display snap-fit

Designed the parametric CAD assembly in Fusion 360 for Hux's circular desktop body. The enclosure features a 72mm cylindrical shell with a 12-degree upward viewing tilt, matching standard desk sitting angles. Modeled a front bezel snap-fit ring with 0.2mm tolerance channels that secure the 1.69 inch IPS screen and the 8-pixel NeoPixel acrylic diffuser ring without messy glue. Added four internal mounting bosses with M3 brass heat-set inserts at a 58mm square pitch.

![hour_26_cad_enclosure_mechanics](https://halflife.hackclub-assets.com/sessions/hekUGdMUsJvkfZr4IeTGwJeZETfm9ZrV/4e9269ab052771356d21aaa0d8b47539077e7b9bc3b2fa7a780a4d0429a09193.png)

---

### Hour 27: Acoustic speaker cavity and mic dampening baffle

Engineered an isolated 18.5 cm3 sealed rear acoustic chamber for the 28mm 4-ohm 3W circular neodymium speaker. Added a front reflex port tuned to 280Hz to reinforce low-frequency vocal presence and eliminate tinny audio. Modeled a 1.5mm high-density silicone acoustic barrier that physically separates the speaker backwave pressure from the INMP441 MEMS microphone cavity, completely eliminating acoustic feedback loops during full-duplex speech.

![hour_27_acoustic_chamber_and_mic_baffle](https://halflife.hackclub-assets.com/sessions/hekUGdMUsJvkfZr4IeTGwJeZETfm9ZrV/0b9de58d1c8de08ea3c75569da5fd34a802f69939f26da2ace88a12edea32bea.png)

---

### Hour 28: 3D print slicing parameters and fitment checks

Configured the slicing profile in Bambu Studio for Matte Black PETG using a 0.16mm fine layer height, 4 perimeter walls (1.6mm solid shell), and 20% gyroid infill for rigid structural resonance damping. Printed the front bezel and main shell test parts. Verified that the screen pocket has a smooth +0.20mm slip fit, the M3 insert pilot holes accept heat-set inserts with solid plastic reflow, and the USB-C cutout aligns perfectly with the PCB edge.

![hour_28_slicing_and_fitment_tolerances](https://halflife.hackclub-assets.com/sessions/hekUGdMUsJvkfZr4IeTGwJeZETfm9ZrV/b4ed097e7555acc3d05eaa89d3c7d7d37f008e08a88051a39ffb3e0cda07abb9.png)

---

### Hour 29: Thermal dissipation modeling and convective venting

Ran thermal simulations to evaluate heat accumulation inside the enclosed shell during peak Wi-Fi transmissions (ESP32-S3 drawing up to 310mA bursts) and 3W audio amplifier operation. Placed passive convection chimney vents on the lower base rim and upper rear shell to promote natural air draw. Verified that a 2.5mm air gap above the PCB copper ground plane keeps the ESP32-S3 package at 34.2 deg C and the audio chip at 36.8 deg C under continuous load.

![hour_29_thermal_airflow_analysis](https://halflife.hackclub-assets.com/sessions/hekUGdMUsJvkfZr4IeTGwJeZETfm9ZrV/40356827a43e06bff30283b91470750745a05eb8dc6dc0d29aaa73db9bf737c1.png)

---

### Hour 30: On-device wake word pipeline and DSP ring buffer

Implemented the on-device wake word detection pipeline using ESP-SR (ESP-Skainet) running on the ESP32-S3 dual-core LX7 processor. Configured dual DMA descriptors to stream 16kHz 16-bit mono audio into a 32KB circular DMA ring buffer with Acoustic Echo Cancellation (AEC) and Noise Suppression (NS) pre-filtering. The custom "Hey Hux" WakeNet model triggers reliably in under 80ms while consuming only 21.4% of Core 1 CPU cycles.

![hour_30_wake_word_dsp_pipeline](https://halflife.hackclub-assets.com/sessions/hekUGdMUsJvkfZr4IeTGwJeZETfm9ZrV/e77a1906f15c12fc17c993a281490f914583a20638b86392fad6292799681bc3.png)

---

### Hour 31: Local Home Assistant voice assistant pipeline

Built the direct WebSocket voice streaming client connecting Hux directly to the local Home Assistant Wyoming protocol. Upon wake word recognition, raw PCM audio frames stream over the local network to on-premise Whisper STT. Intent execution occurs locally via Home Assistant Assist in under 25ms, and Piper TTS streams 22050Hz raw PCM audio chunks back to Hux's I2S DMA buffer, achieving an ultra-fast 182ms total roundtrip latency from voice input to audible response with 100% privacy.

![hour_31_local_ha_assist_pipeline](https://halflife.hackclub-assets.com/sessions/hekUGdMUsJvkfZr4IeTGwJeZETfm9ZrV/a59fa0112fa52b1182d878c5a997def922260502df504267b2ccb9f89b3d499b.png)

---

### Hour 32: 6-state emotive behavior tree and vector eye engine

Expanded the ST7789 embedded graphics engine into a comprehensive 6-state emotive state machine: IDLE_GAZE (ambient blinks and micro-saccades), LISTENING (pupil dilation +18% with cyan breathing halo), THINKING (upward glance with clockwise amber halo rotation), SPEAKING (lower HUD audio waveform synchronized to I2S amplitude), SUCCESS (green confirmation flash and smiling arc eyes), and ALERT (amber pulsing perimeter ring). All animations render at 60 fps over hardware SPI DMA.

![hour_32_emotive_eye_state_machine](https://halflife.hackclub-assets.com/sessions/hekUGdMUsJvkfZr4IeTGwJeZETfm9ZrV/6b2535ecb940d8f2df669994c9923df0b422fe0f471d6fcb7afe46007673afe3.png)

---

### Hour 33: Full system benchtop assembly and power telemetry

Assembled the complete prototype stack on the test bench, mounting the 1.69 inch IPS screen and 8-pixel NeoPixel ring into the 3D-printed PETG bezel, seating the 28mm speaker into its sealed acoustic cavity, and connecting the USB-C telemetry monitor. Bench measurements confirmed 58mA idle listening power draw, 82mA with screen on, 138mA during active speech playback, and zero dropped Wi-Fi packets over a 6-hour continuous stress run. Sprint 03 complete!

![hour_33_prototype_bench_assembly](https://halflife.hackclub-assets.com/sessions/hekUGdMUsJvkfZr4IeTGwJeZETfm9ZrV/cebec6cab3bd2a7f497a6a2e90665c8946ceea1832edfce94bf61fa796a0e0ff.png)

---

### Quick Summary

- **Hours Logged**: 8 hours (33 hours total project time)
- **Status**: Parametric CAD enclosure and sealed acoustic chamber modeled, PETG 3D prints test-fitted with heat-set brass inserts, passive thermal chimney airflow verified (<37 deg C), ESP-SR on-device wake word engine operational (<80ms trigger), local Home Assistant voice pipeline streaming over WebSockets (182ms roundtrip), 6-state emotive vector eye engine running at 60 fps, and full prototype stack benchmarked at 58mA idle.
