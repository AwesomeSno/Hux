# Checkpoint Script: Hux 5-Hour Checkpoint (59 Seconds)

**Duration:** 59.0 seconds (1770 frames @ 30fps)
**Resolution:** 1080x1920 (9:16 Vertical Reel)
**Style:** Apple Minimalist / High-Agency Cyberpunk (OLED pure black, animated vector robot eyes, spinning Arc-Reactor RGB halo, frosted glass Bento cards, cyan/gold accents)
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

| Time | Frame Range | Spoken Text | Visual Showcase and Diagram Elements |
|---|---|---|---|
| **0:00 - 0:08** | 0 - 268 | "Hey everyone! This is my 5-hour checkpoint video for Hux, my desktop AI companion for Hack Club's Half Life. Here is what I have built and planned so far." | **Intro Scene:** Rotating 3D PCB hero board on dark turntable with subtle cyan aura, "HUX // 5 HOUR CHECKPOINT" Dynamic Island pill, and "CHECKPOINT 01 // 5 HOURS COMPLETED" badge. |
| **0:08 - 0:15** | 268 - 470 | "I ditched lifeless smart speakers to build an expressive companion powered by an ESP32-S3." | **Problem & Solution:** Teardown comparison showing lifeless plastic speaker puck (rejected) versus Hux companion with ESP32-S3 dual-core processor. |
| **0:15 - 0:22** | 470 - 687 | "It features a crisp color IPS display with animated vector eyes that blink, look around, and react in real time." | **Display & Vector Eyes:** ST7789 IPS display card showing smooth 60fps vector emotion state machine (blinking, looking around, and reacting). |
| **0:22 - 0:28** | 687 - 863 | "Surrounding the screen is an 8-LED Arc-Reactor halo ring for instant ambient feedback." | **Arc-Reactor Halo:** Circular 8-LED NeoPixel ring optics showcase with cyan listening glow, amber thinking spin, and alert pulse cues. |
| **0:28 - 0:42** | 863 - 1267 | "For audio, I designed a digital I2S voice pipeline with an INMP441 mic and a MAX98357A amplifier driving a 3W speaker, keeping it free from Wi-Fi RF interference." | **Digital Audio Pipeline:** Digital I2S pipeline diagram with INMP441 mic, MAX98357A amp, 3W speaker, and animated real-time bouncing equalizer waveform. |
| **0:42 - 0:49** | 1267 - 1493 | "Hux connects directly to my local Home Assistant server over WebSockets with sub-15ms response times and zero cloud lag." | **Local Home Assistant:** Direct local Wi-Fi WebSocket protocol flow, sub-15ms speed badge, and 100% private offline verification pills. |
| **0:49 - 0:59** | 1493 - 1770 | "Next up for hour 10: routing the PCB in KiCad and writing the display driver firmware. Thanks for watching, and see you at the next checkpoint!" | **Hour 10 Roadmap & Checkpoint Outro:** Checkpoint 1 completed checklist, next milestones (KiCad schematic capture, PCB layout, display firmware), and Half Life outro banner. |

---

## File Deliverables

- **Rendered Video:** [`Videos/hux_5h_checkpoint.mp4`](file:///Users/harinandanjv/Projects/01HackClub/Half%20Life/Hux/Videos/hux_5h_checkpoint.mp4)
- **Audio Voiceover:** [`Videos/hux_5h_checkpoint_voice.mp3`](file:///Users/harinandanjv/Projects/01HackClub/Half%20Life/Hux/Videos/hux_5h_checkpoint_voice.mp3)
- **Subtitles (WebVTT):** [`Videos/hux_5h_checkpoint_subtitles.vtt`](file:///Users/harinandanjv/Projects/01HackClub/Half%20Life/Hux/Videos/hux_5h_checkpoint_subtitles.vtt)
- **Remotion Component:** [`hux-reel/src/Hux5HourCheckpoint.tsx`](file:///Users/harinandanjv/Projects/01HackClub/Half%20Life/Hux/hux-reel/src/Hux5HourCheckpoint.tsx)
