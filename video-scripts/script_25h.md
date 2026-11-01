# Hux: 25-Hour Milestone Progress Reel Script (Hours 15 to 25)

**Project:** Hux: Desktop AI Companion  
**Program:** Hack Club Half Life  
**Milestone:** 25 Hours (Sprint 02: PCB Routing, SMT Fabrication Files, and Embedded Firmware)  
**Target Platform:** YouTube Shorts / Instagram Reels / TikTok (9:16 Vertical, 1080x1920)  
**Format:** Hardware Motion Graphics with native raytraced 3D PCB renders, procedural vector eye engine, and bench telemetry  
**Audio Voice:** en-US-AndrewMultilingualNeural (+20% rate)  
**Total Video Duration:** 58.50 seconds (1755 frames @ 30 fps)  

---

## Timed Scene Breakdown

### Scene 1: Milestone Hook & Overview (Frames 0 - 234 / 0.0s - 7.8s)
- **Voiceover:** "Hey everyone! Welcome to the 25-hour milestone for Hux on Hack Club's Half Life, covering our sprint from hour 15 to 25!"
- **Visual:** Raytraced 3D isometric view (`01_hero_isometric_3d.png`) with smooth camera push-in.
- **HUD Tag:** "HUX // 25-HOUR REEL", "HOURS 15 TO 25 COMPLETE", "SPRINT 02: PCB ROUTING, FAB GERBERS & FIRMWARE".

### Scene 2: 2-Layer Board Routing (Frames 234 - 367 / 7.8s - 12.2s)
- **Voiceover:** "With the schematic locked, I routed the entire 2-layer PCB in KiCad."
- **Visual:** Macro render of bottom copper traces and thermal reliefs (`04_bottom_traces_routing.png`).
- **HUD Tag:** "KICAD PCB ARCHITECTURE: 2-Layer FR4 Routing", "Top: 40MHz SPI // Bottom: Solid GND Plane".

### Scene 3: High-Speed SPI & Stitching Via Grid (Frames 367 - 607 / 12.2s - 20.2s)
- **Voiceover:** "I ran the 40MHz display SPI bus on top, poured solid ground planes on both sides, and added stitching vias to kill RF noise."
- **Visual:** Clean top orthographic view (`03_top_ortho_clean.png`) showing routed traces.
- **HUD Tag:** "RF NOISE MITIGATION: 5x5mm Stitching Via Grid", "40MHz ST7789 SPI + Thermal Relief".

### Scene 4: DRC Verification & Automated SMT (Frames 607 - 823 / 20.2s - 27.4s)
- **Voiceover:** "After passing DRC with zero errors, I exported the JLCPCB Gerbers and automated SMT pick-and-place files."
- **Visual:** USB-C power tree and TVS diode macro render (`07_usbc_power_macro.png`).
- **HUD Tag:** "DRC STATUS: PASSED (0 Errors / 0 Warnings)", "SMT PICK & PLACE: JLCPCB BOM & CPL Calibrated".

### Scene 5: Embedded 60fps Vector Eye Engine (Frames 823 - 1171 / 27.4s - 39.0s)
- **Voiceover:** "Next, I wrote the firmware in C++: an ST7789 display driver running a 60fps procedural vector eye engine with real-time gaze and blinking."
- **Visual:** Live interactive circular screen simulation rendering animated cyan vector eyes with saccadic eye motion, blink cycles, and CRT grid styling.
- **HUD Tag:** "EMBEDDED GRAPHICS ENGINE: Procedural Vector Eyes", "60 FPS Hardware SPI DMA Driver".

### Scene 6: Dual DMA I2S Audio & Arc-Reactor Halo (Frames 1171 - 1394 / 39.0s - 46.5s)
- **Voiceover:** "I configured dual DMA channels for the I2S mic and amp, plus an RMT driver for the eight Arc-Reactor NeoPixels."
- **Visual:** MAX98357A amplifier macro render (`06_audio_amp_macro.png`) paired with real-time animated EQ spectrum bars.
- **HUD Tag:** "AUDIO & HALO ENGINE: Dual DMA Channels + RMT", "INMP441 + MAX98357A + 8x SK6812".

### Scene 7: Local Home Assistant Bench Telemetry (Frames 1394 - 1608 / 46.5s - 53.6s)
- **Voiceover:** "Connected to my local Home Assistant over WebSockets, command latency is under 15 milliseconds at 62 milliamps idle."
- **Visual:** ESP32-S3 module macro render (`05_esp32_macro_closeup.png`) with live telemetry card.
- **HUD Tag:** "LOCAL WEBSOCKET LATENCY: < 15ms Response", "IDLE POWER DRAW: 62 mA @ 5V", "THERMAL: 34.2 deg C".

### Scene 8: Fabrication Ready & Outro (Frames 1608 - 1755 / 53.6s - 58.5s)
- **Voiceover:** "Hux is fully routed, coded, and ready for fabrication. See you at the next milestone!"
- **Visual:** Low-angle front cinematic render (`02_low_angle_front_cinematic.png`) with milestone summary card.
- **HUD Tag:** "MILESTONE: 25 HOURS COMPLETED", "Board Ready for Fabrication and Physical Assembly".
