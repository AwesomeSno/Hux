# Checkpoint Script: Hux 5-Hour Checkpoint (59 Seconds)

**Duration:** 59.0 seconds (1770 frames @ 30fps)
**Resolution:** 1080x1920 (9:16 Vertical Reel)
**Style:** Cinematic Hardware Motion Graphics (OLED dark background, native raytraced 3D PCB camera angles, real component macro sweeps, 60fps vector eye HUD, synchronized technical badges)
**Voice:** `en-US-AndrewMultilingualNeural` (Natural, energetic maker cadence)
**Rendered Video:** `Videos/hux_5h_checkpoint.mp4`

---

## Clean Spoken Narration Script

> "Hey everyone! This is my 5-hour checkpoint video for Hux, my desktop AI companion for Hack Club's Half Life.
>
> Here is what I have built and planned so far.
>
> I ditched lifeless smart speakers to build an expressive companion powered by an ESP32-S3.
>
> It features a crisp color IPS display with animated vector eyes that blink, look around, and react in real time.
>
> Surrounding the screen is an 8-LED Arc-Reactor halo ring for instant ambient feedback.
>
> For audio, I designed a digital I2S voice pipeline with an INMP441 mic and a MAX98357A amplifier driving a 3W speaker, keeping it free from Wi-Fi RF interference.
>
> Hux connects directly to my local Home Assistant server over WebSockets with sub-15ms response times and zero cloud lag.
>
> Next up for hour 10: routing the PCB in KiCad and writing the display driver firmware.
>
> Thanks for watching, and see you at the next checkpoint!"

---

## Timed Scene and Visual Breakdown

| Time | Frame Range | Spoken Text | Visual Showcase and Hardware Camera Angles |
|---|---|---|---|
| **0:00 - 0:07** | 0 - 204 | "Hey everyone! This is my 5-hour checkpoint video for Hux, my desktop AI companion for Hack Club's Half Life." | **Scene 1 (Hero Isometric 3D):** Full-bleed raytraced isometric render (`01_hero_isometric_3d.png`) with smooth slow camera push-in and clean typographic title: "Hux Companion // ESP32-S3 • Color IPS • Arc-Reactor • Local Home Assistant". |
| **0:07 - 0:15** | 204 - 470 | "Here is what I have built and planned so far. I ditched lifeless smart speakers to build an expressive companion powered by an ESP32-S3." | **Scene 2 (Cinematic Front Tilt to ESP32 Macro):** Dynamic low-angle front perspective (`02_low_angle_front_cinematic.png`) crossfading into macro close-up of ESP32-S3 and acoustic port (`05_esp32_macro_closeup.png`). Minimal tag: "ESP32-S3-WROOM-1 // 240MHz Dual-Core // 16MB Flash // 8MB PSRAM". |
| **0:15 - 0:22** | 470 - 687 | "It features a crisp color IPS display with animated vector eyes that blink, look around, and react in real time." | **Scene 3 (Top Ortho with Live Vector Eyes):** Top engineering render (`03_top_ortho_clean.png`) with live 60fps vector robot eyes docked directly on the board display footprint, blinking and tracking. Callout: "ST7789 1.69 Inch IPS (240x280) // 60 FPS Procedural Vector Eyes". |
| **0:22 - 0:28** | 687 - 863 | "Surrounding the screen is an 8-LED Arc-Reactor halo ring for instant ambient feedback." | **Scene 4 (Arc-Reactor Halo Macro):** Extreme macro shot of the circular NeoPixel ring (`08_halo_led_ring_macro.png`) highlighting the 8 addressable RGB LEDs. Callout: "8x SK6812 MINI-E Ring // Ambient Glow, Intent Spin, Alert Pulse". |
| **0:28 - 0:42** | 863 - 1267 | "For audio, I designed a digital I2S voice pipeline with an INMP441 mic and a MAX98357A amplifier driving a 3W speaker, keeping it free from Wi-Fi RF interference." | **Scene 5 (Digital Audio Stage Macro):** Macro shot of MAX98357A QFN-16 DAC amp and speaker header (`06_audio_amp_macro.png`) paired with real-time bouncing audio visualizer bars. Callout: "INMP441 + MAX98357A // 100% Digital I2S (Zero RF Buzz)". |
| **0:42 - 0:49** | 1267 - 1493 | "Hux connects directly to my local Home Assistant server over WebSockets with sub-15ms response times and zero cloud lag." | **Scene 6 (Bottom Copper Routing):** High-res render of bottom layer copper routing, differential USB traces, and stitched ground plane (`04_bottom_traces_routing.png`). Callout: "Home Assistant WebSockets // Sub-15ms Toggle // 100% Private LAN". |
| **0:49 - 0:59** | 1493 - 1770 | "Next up for hour 10: routing the PCB in KiCad and writing the display driver firmware. Thanks for watching, and see you at the next checkpoint!" | **Scene 7 (Milestone Summary and Outro):** Full hero isometric perspective with clean Swiss-style progress card: Checkpoint 1 complete, Hour 10 goals (KiCad schematic capture, PCB layout routing, display firmware bringup), and Hack Club Half Life banner. |

---

## File Deliverables

- **Rendered Video:** [`Videos/hux_5h_checkpoint.mp4`](file:///Users/harinandanjv/Projects/01HackClub/Half%20Life/Hux/Videos/hux_5h_checkpoint.mp4)
- **Audio Voiceover:** [`Videos/hux_5h_checkpoint_voice.mp3`](file:///Users/harinandanjv/Projects/01HackClub/Half%20Life/Hux/Videos/hux_5h_checkpoint_voice.mp3)
- **Subtitles (WebVTT):** [`Videos/hux_5h_checkpoint_subtitles.vtt`](file:///Users/harinandanjv/Projects/01HackClub/Half%20Life/Hux/Videos/hux_5h_checkpoint_subtitles.vtt)
- **Remotion Component:** [`hux-reel/src/Hux5HourCheckpoint.tsx`](file:///Users/harinandanjv/Projects/01HackClub/Half%20Life/Hux/hux-reel/src/Hux5HourCheckpoint.tsx)
- **Component 3D Render Directory:** [`assets/renders/`](file:///Users/harinandanjv/Projects/01HackClub/Half%20Life/Hux/assets/renders/)
