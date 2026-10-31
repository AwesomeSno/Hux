# Reel Script: Hux 5-Hour Progress Reel (~53 Seconds)

**Duration:** 53.33 seconds (1600 frames @ 30fps)
**Resolution:** 1080x1920 (9:16 Vertical Reel)
**Style:** Apple Minimalist / High-Agency Cyberpunk (OLED pure black, animated vector robot eyes, spinning Arc-Reactor RGB halo, frosted glass Bento cards, cyan/gold accents)
**Voice:** `en-US-AndrewMultilingualNeural` (Natural, energetic maker cadence)
**Rendered Video:** `Videos/hux_5h_progress_reel.mp4`

---

## Clean Spoken Narration Script

> "Hey everyone! Quick update on Hux for Hack Club's Half Life. I just wrapped up the first 5 hours of planning and architecture, and here is how it is shaping up.
>
> At the core is an ESP32-S3 driving a color display with animated vector eyes, encircled by an eight-LED Arc-Reactor halo ring.
>
> For audio, I went with a 100% digital I2S setup using an INMP441 MEMS microphone and a MAX98357A amplifier with a 3W speaker, eliminating RF buzz from the Wi-Fi antenna.
>
> Everything connects directly to my local Home Assistant server over WebSockets with instant sub-15ms response and zero cloud lag.
>
> The power tree is sorted with USB-C and ESD protection on a 72-millimeter board.
>
> Next up: routing the board in KiCad and writing the display firmware. Thanks for watching!"

---

## Timed Scene and Visual Breakdown

| Time | Frame Range | Spoken Text | Visual Showcase and Diagram Elements |
|---|---|---|---|
| **0:00 - 0:08** | 0 - 266 | "Hey everyone! Quick update on Hux for Hack Club's Half Life. I just wrapped up the first 5 hours of planning and architecture, and here is how it is shaping up." | **Intro Scene:** Rotating 3D PCB hero board on dark turntable with subtle cyan aura, "HUX // FIRST 5 HOURS PROGRESS" Dynamic Island pill, and project subtitle. |
| **0:08 - 0:18** | 266 - 564 | "At the core is an ESP32-S3 driving a color display with animated vector eyes, encircled by an eight-LED Arc-Reactor halo ring." | **Display & Halo Scene:** Animated vector robot eyes showcase (idle, listening, thinking, speaking) alongside the Arc-Reactor halo ring polar diagram. |
| **0:18 - 0:32** | 564 - 985 | "For audio, I went with a 100% digital I2S setup using an INMP441 MEMS microphone and a MAX98357A amplifier with a 3W speaker, eliminating RF buzz from the Wi-Fi antenna." | **Digital Audio Scene:** I2S audio pipeline diagram (INMP441 mic to ESP32-S3 to MAX98357A amp) with animated bouncing equalizer bars. |
| **0:32 - 0:41** | 985 - 1234 | "Everything connects directly to my local Home Assistant server over WebSockets with instant sub-15ms response and zero cloud lag." | **Home Assistant Scene:** Direct local Wi-Fi WebSocket protocol flow, sub-15ms speed badge, and 100% private offline verification pills. |
| **0:41 - 0:46** | 1234 - 1402 | "The power tree is sorted with USB-C and ESD protection on a 72-millimeter board." | **Power & Ergonomics:** USB-C connector with 5.1k CC pull-downs, TVS ESD protection, 3.3V LDO regulator, and 72x72mm PCB mechanical blueprint. |
| **0:46 - 0:53** | 1402 - 1600 | "Next up: routing the board in KiCad and writing the display firmware. Thanks for watching!" | **Next Steps & Outro:** Milestone checklist card with completed sprint items, "Next: KiCad Schematic & 2-Layer PCB Routing", and Half Life banner. |

---

## File Deliverables

- **Rendered Video:** [`Videos/hux_5h_progress_reel.mp4`](file:///Users/harinandanjv/Projects/01HackClub/Half%20Life/Hux/Videos/hux_5h_progress_reel.mp4)
- **Audio Voiceover:** [`Videos/hux_5h_voice.mp3`](file:///Users/harinandanjv/Projects/01HackClub/Half%20Life/Hux/Videos/hux_5h_voice.mp3)
- **Subtitles (WebVTT):** [`Videos/hux_5h_subtitles.vtt`](file:///Users/harinandanjv/Projects/01HackClub/Half%20Life/Hux/Videos/hux_5h_subtitles.vtt)
- **Remotion Component:** [`hux-reel/src/Hux5HourReel.tsx`](file:///Users/harinandanjv/Projects/01HackClub/Half%20Life/Hux/hux-reel/src/Hux5HourReel.tsx)
