# Reel Script: Hux 15-Hour Progress Reel (58 Seconds)

**Duration:** 58.0 seconds (1740 frames @ 30fps)
**Resolution:** 1080x1920 (9:16 Vertical Reel)
**Style:** Cinematic Hardware Motion Graphics (OLED dark background, native raytraced 3D PCB camera sweeps, real component macro close-ups, clean typographic lower thirds, active audio visualizer)
**Voice:** `en-US-AndrewMultilingualNeural` (Natural, energetic maker cadence)
**Rendered Video:** `Videos/hux_15h_progress_reel.mp4`

---

## Clean Spoken Narration Script

> "Hey everyone! Quick update on Hux for Hack Club's Half Life. We just crossed the 15-hour mark, and the complete hardware schematic and board architecture are locked down.
>
> After the initial planning, I spent these hours turning the block diagrams into real circuits in KiCad.
>
> First, I designed the power delivery with USB-C, TVS ESD diodes, and a clean 3.3-volt regulator to keep the ESP32-S3 stable under peak Wi-Fi bursts.
>
> Next, I wired the 40MHz SPI display bus and daisy-chained the eight Arc-Reactor NeoPixels using hardware RMT timing.
>
> For audio, I routed digital I2S lines for the INMP441 mic and the MAX98357A amplifier, giving us clean voice interaction with zero RF buzz.
>
> Finally, I locked the 72-millimeter board outline with M3 mounting holes and passed ERC with zero errors.
>
> Next up: routing the copper layers and exporting Gerbers. Thanks for watching, and see you at the next milestone!"

---

## Timed Scene and Visual Breakdown

| Time | Frame Range | Spoken Text | Visual Showcase and Hardware Camera Angles |
|---|---|---|---|
| **0:00 - 0:09** | 0 - 280 | "Hey everyone! Quick update on Hux for Hack Club's Half Life. We just crossed the 15-hour mark, and the complete hardware schematic and board architecture are locked down." | **Scene 1 (Hero Isometric 3D):** Full-bleed raytraced isometric render (`01_hero_isometric_3d.png`) with smooth slow camera push-in and clean typographic title: "15 Hours Logged // HARDWARE SCHEMATIC & BOARD ARCHITECTURE COMPLETE". |
| **0:09 - 0:14** | 280 - 437 | "After the initial planning, I spent these hours turning the block diagrams into real circuits in KiCad." | **Scene 2 (KiCad Capture & Transition):** Low-angle front perspective (`02_low_angle_front_cinematic.png`) showcasing board depth and component layout. Minimal tag: "KICAD 10 DESIGN SPRINT // From Block Diagrams to Circuits". |
| **0:14 - 0:26** | 437 - 783 | "First, I designed the power delivery with USB-C, TVS ESD diodes, and a clean 3.3-volt regulator to keep the ESP32-S3 stable under peak Wi-Fi bursts." | **Scene 3 (USB-C & Power Tree Macro):** Close-up macro on USB-C receptacle, TVS ESD protection diodes, and TLV75533 3.3V LDO regulator (`07_usbc_power_macro.png`). Minimal tag: "POWER TREE & PROTECTION // USB-C 16-Pin + TLV75533 LDO". |
| **0:26 - 0:33** | 783 - 997 | "Next, I wired the 40MHz SPI display bus and daisy-chained the eight Arc-Reactor NeoPixels using hardware RMT timing." | **Scene 4 (40MHz SPI Display & NeoPixel Halo):** Close-up macro of the 8x SK6812 MINI-E NeoPixel Arc-Reactor ring (`08_halo_led_ring_macro.png`). Minimal tag: "DISPLAY & STATUS HALO // 40MHz SPI + 8x SK6812 Ring". |
| **0:33 - 0:44** | 997 - 1334 | "For audio, I routed digital I2S lines for the INMP441 mic and the MAX98357A amplifier, giving us clean voice interaction with zero RF buzz." | **Scene 5 (Digital Audio Pipeline):** Close-up macro on MAX98357A QFN-16 DAC amp and speaker terminal (`06_audio_amp_macro.png`) paired with real-time bouncing audio visualizer meter. Minimal tag: "DIGITAL AUDIO // INMP441 + MAX98357A (Zero RF Noise)". |
| **0:44 - 0:51** | 1334 - 1540 | "Finally, I locked the 72-millimeter board outline with M3 mounting holes and passed ERC with zero errors." | **Scene 6 (72mm Outline & ERC Audit):** Clean Top Orthogonal layout view (`03_top_ortho_clean.png`) showing 72x72mm outline, 6mm corner fillets, 4x M3 mounting holes, and electrical verification. Minimal tag: "RULES AUDIT // ERC Passed (0 Errors, 0 Warnings)". |
| **0:51 - 0:58** | 1540 - 1740 | "Next up: routing the copper layers and exporting Gerbers. Thanks for watching, and see you at the next milestone!" | **Scene 7 (Milestone Summary & Outro):** Full hero isometric perspective with clean Swiss-style progress card: 15 hours logged, completed sprint items, next goals (2-layer PCB routing and Gerber export), and Hack Club Half Life banner. |

---

## File Deliverables

- **Rendered Video:** [`Videos/hux_15h_progress_reel.mp4`](file:///Users/harinandanjv/Projects/01HackClub/Half%20Life/Hux/Videos/hux_15h_progress_reel.mp4)
- **Audio Voiceover:** [`Videos/hux_15h_voice.mp3`](file:///Users/harinandanjv/Projects/01HackClub/Half%20Life/Hux/Videos/hux_15h_voice.mp3)
- **Subtitles (WebVTT):** [`Videos/hux_15h_subtitles.vtt`](file:///Users/harinandanjv/Projects/01HackClub/Half%20Life/Hux/Videos/hux_15h_subtitles.vtt)
- **Remotion Component:** [`hux-reel/src/Hux15HourReel.tsx`](file:///Users/harinandanjv/Projects/01HackClub/Half%20Life/Hux/hux-reel/src/Hux15HourReel.tsx)
