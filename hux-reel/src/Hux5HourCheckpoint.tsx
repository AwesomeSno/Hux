import React from "react";
import {
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Img,
  Audio,
  staticFile,
} from "remotion";

const C = {
  bg: "#08090d",
  surface: "rgba(16, 20, 28, 0.85)",
  border: "rgba(255, 255, 255, 0.12)",
  textMain: "#ffffff",
  textMuted: "#94a3b8",
  cyan: "#38bdf8",
  cyanGlow: "rgba(56, 189, 248, 0.35)",
  amber: "#f59e0b",
  green: "#10b981",
  mono: "'SF Mono', Monaco, 'JetBrains Mono', Menlo, Consolas, monospace",
  sans: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif",
};

interface Subtitle {
  start: number;
  end: number;
  text: string;
}

const SUBTITLES: Subtitle[] = [
  {
    start: 1,
    end: 26,
    text: "Hey everyone!",
  },
  {
    start: 26,
    end: 204,
    text: "This is my 5-hour checkpoint video for Hux, my desktop AI companion for Hack Club's Half Life.",
  },
  {
    start: 204,
    end: 268,
    text: "Here is what I have built and planned so far.",
  },
  {
    start: 268,
    end: 470,
    text: "I ditched lifeless smart speakers to build an expressive companion powered by an ESP32-S3.",
  },
  {
    start: 470,
    end: 687,
    text: "It features a crisp color IPS display with animated vector eyes that blink, look around, and react in real time.",
  },
  {
    start: 687,
    end: 863,
    text: "Surrounding the screen is an 8-LED Arc-Reactor halo ring for instant ambient feedback.",
  },
  {
    start: 863,
    end: 1267,
    text: "For audio, I designed a digital I2S voice pipeline with an INMP441 mic and a MAX98357A amplifier driving a 3W speaker, keeping it free from Wi-Fi RF interference.",
  },
  {
    start: 1267,
    end: 1493,
    text: "Hux connects directly to my local Home Assistant server over WebSockets with sub-15ms response times and zero cloud lag.",
  },
  {
    start: 1493,
    end: 1671,
    text: "Next up for hour 10: routing the PCB in KiCad and writing the display driver firmware.",
  },
  {
    start: 1671,
    end: 1746,
    text: "Thanks for watching, and see you at the next checkpoint!",
  },
];

export const Hux5HourCheckpoint: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalFrames = 1770;
  const progress = Math.min(1, frame / totalFrames);

  // Subtitle cue
  const currentSub = SUBTITLES.find((s) => frame >= s.start && frame < s.end);

  // Animated vector eye logic
  const blinkCycle = frame % 90;
  const eyeHeight = blinkCycle > 82 ? interpolate(blinkCycle, [82, 86, 90], [36, 4, 36]) : 36;
  const lookX = Math.sin(frame * 0.05) * 12;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: C.bg,
        color: C.textMain,
        fontFamily: C.sans,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Audio Tracks */}
      <Audio src={staticFile("hux_5h_checkpoint_voice.mp3")} volume={1.0} />
      <Audio src={staticFile("bg-music.mp3")} volume={0.14} />

      {/* Background Soft Studio Lighting */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          top: "35%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, rgba(8, 9, 13, 0) 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Top Header: Minimalist Studio Island */}
      <div
        style={{
          position: "absolute",
          top: 64,
          left: 56,
          right: 56,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 60,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: C.cyan,
              boxShadow: `0 0 10px ${C.cyan}`,
            }}
          />
          <span
            style={{
              fontFamily: C.mono,
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 2,
              color: C.textMain,
            }}
          >
            HUX // CHECKPOINT 01
          </span>
        </div>

        <div
          style={{
            fontFamily: C.mono,
            fontSize: 14,
            fontWeight: 700,
            color: C.amber,
            backgroundColor: "rgba(245, 158, 11, 0.12)",
            border: "1px solid rgba(245, 158, 11, 0.3)",
            padding: "6px 14px",
            borderRadius: 20,
            letterSpacing: 1,
          }}
        >
          5 HOURS LOGGED
        </div>
      </div>

      {/* Main Cinematic Visual Stage */}
      <div
        style={{
          position: "absolute",
          top: 140,
          bottom: 220,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* ================================================================ */}
        {/* SCENE 1: Hero 3D Isometric View (Frames 0 - 204)                  */}
        {/* ================================================================ */}
        {frame >= 0 && frame < 204 && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 980,
                height: 860,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Img
                src={staticFile("images/renders/01_hero_isometric_3d.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 25px 45px rgba(0,0,0,0.75))",
                  transform: `scale(${interpolate(frame, [0, 204], [1.02, 1.1])}) translateY(${interpolate(frame, [0, 204], [0, -15])}px)`,
                }}
              />
            </div>

            {/* Minimal Lower Label */}
            <div
              style={{
                position: "absolute",
                bottom: 40,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 56, fontWeight: 900, letterSpacing: -1 }}>
                Hux Companion
              </div>
              <div
                style={{
                  fontFamily: C.mono,
                  fontSize: 18,
                  color: C.cyan,
                  marginTop: 8,
                  letterSpacing: 1.5,
                }}
              >
                ESP32-S3 // COLOR IPS // ARC-REACTOR // LOCAL HOME ASSISTANT
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 2: Cinematic Front Tilt into ESP32-S3 Macro (Frames 204 - 470) */}
        {/* ================================================================ */}
        {frame >= 204 && frame < 470 && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 1000,
                height: 840,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {frame < 330 ? (
                <Img
                  src={staticFile("images/renders/02_low_angle_front_cinematic.png")}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.8))",
                    transform: `scale(${interpolate(frame, [204, 330], [1.0, 1.08])})`,
                  }}
                />
              ) : (
                <Img
                  src={staticFile("images/renders/05_esp32_macro_closeup.png")}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.8))",
                    transform: `scale(${interpolate(frame, [330, 470], [1.02, 1.1])})`,
                  }}
                />
              )}
            </div>

            {/* Technical Overlay Tag */}
            <div
              style={{
                position: "absolute",
                bottom: 36,
                backgroundColor: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                padding: "16px 28px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                backdropFilter: "blur(20px)",
              }}
            >
              <div>
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.cyan }}>CORE MCU & COMPUTE</div>
                <div style={{ fontSize: 24, fontWeight: 800, marginTop: 2 }}>ESP32-S3-WROOM-1</div>
              </div>
              <div style={{ width: 1, height: 32, backgroundColor: C.border }} />
              <div>
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.textMuted }}>SPECS</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.textMain, marginTop: 2 }}>
                  240MHz Dual-Core / 16MB Flash / 8MB PSRAM
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 3: Top Ortho with Live Vector Eyes HUD (Frames 470 - 687)   */}
        {/* ================================================================ */}
        {frame >= 470 && frame < 687 && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 920,
                height: 800,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Img
                src={staticFile("images/renders/03_top_ortho_clean.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.8))",
                  transform: `scale(${interpolate(frame, [470, 687], [1.02, 1.08])})`,
                }}
              />

              {/* Live Vector Robot Eyes Docked directly on the Screen Area */}
              <div
                style={{
                  position: "absolute",
                  width: 140,
                  height: 160,
                  backgroundColor: "#050608",
                  borderRadius: 12,
                  border: "2px solid rgba(56, 189, 248, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                  boxShadow: `0 0 24px ${C.cyanGlow}`,
                }}
              >
                {/* Left Eye */}
                <div
                  style={{
                    width: 32,
                    height: eyeHeight,
                    backgroundColor: C.cyan,
                    borderRadius: 16,
                    transform: `translateX(${lookX}px)`,
                    boxShadow: `0 0 12px ${C.cyan}`,
                    transition: "height 0.05s ease",
                  }}
                />
                {/* Right Eye */}
                <div
                  style={{
                    width: 32,
                    height: eyeHeight,
                    backgroundColor: C.cyan,
                    borderRadius: 16,
                    transform: `translateX(${lookX}px)`,
                    boxShadow: `0 0 12px ${C.cyan}`,
                    transition: "height 0.05s ease",
                  }}
                />
              </div>
            </div>

            {/* Technical Overlay Tag */}
            <div
              style={{
                position: "absolute",
                bottom: 36,
                backgroundColor: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                padding: "16px 28px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                backdropFilter: "blur(20px)",
              }}
            >
              <div>
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.cyan }}>DISPLAY & GRAPHICS</div>
                <div style={{ fontSize: 24, fontWeight: 800, marginTop: 2 }}>ST7789 1.69" IPS (240x280)</div>
              </div>
              <div style={{ width: 1, height: 32, backgroundColor: C.border }} />
              <div>
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.textMuted }}>ANIMATION RATE</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.green, marginTop: 2 }}>
                  60 FPS Procedural Vector Eyes
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 4: Arc-Reactor Halo Macro Shot (Frames 687 - 863)           */}
        {/* ================================================================ */}
        {frame >= 687 && frame < 863 && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 1000,
                height: 840,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Img
                src={staticFile("images/renders/08_halo_led_ring_macro.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.8))",
                  transform: `scale(${interpolate(frame, [687, 863], [1.02, 1.1])})`,
                }}
              />
            </div>

            {/* Technical Overlay Tag */}
            <div
              style={{
                position: "absolute",
                bottom: 36,
                backgroundColor: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                padding: "16px 28px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                backdropFilter: "blur(20px)",
              }}
            >
              <div>
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.amber }}>STATUS LIGHTING</div>
                <div style={{ fontSize: 24, fontWeight: 800, marginTop: 2 }}>8x SK6812 MINI-E Ring</div>
              </div>
              <div style={{ width: 1, height: 32, backgroundColor: C.border }} />
              <div>
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.textMuted }}>FUNCTION</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.textMain, marginTop: 2 }}>
                  Ambient Glow / Intent Spin / Alert Pulse
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 5: Digital I2S Audio Amp Macro (Frames 863 - 1267)          */}
        {/* ================================================================ */}
        {frame >= 863 && frame < 1267 && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 1000,
                height: 840,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Img
                src={staticFile("images/renders/06_audio_amp_macro.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.8))",
                  transform: `scale(${interpolate(frame, [863, 1267], [1.02, 1.1])})`,
                }}
              />
            </div>

            {/* Technical Overlay Tag with Audio Meter */}
            <div
              style={{
                position: "absolute",
                bottom: 36,
                backgroundColor: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                padding: "16px 28px",
                display: "flex",
                alignItems: "center",
                gap: 24,
                backdropFilter: "blur(20px)",
              }}
            >
              <div>
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.green }}>AUDIO PIPELINE</div>
                <div style={{ fontSize: 24, fontWeight: 800, marginTop: 2 }}>INMP441 + MAX98357A</div>
              </div>
              <div style={{ width: 1, height: 32, backgroundColor: C.border }} />
              <div>
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.textMuted }}>SIGNAL</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.textMain, marginTop: 2 }}>
                  100% Digital I2S (Zero RF Buzz)
                </div>
              </div>

              {/* Minimal Waveform Meter */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 28 }}>
                {[0.4, 0.9, 0.6, 1.0, 0.7, 0.3, 0.8, 0.5].map((f, i) => (
                  <div
                    key={i}
                    style={{
                      width: 5,
                      height: 8 + 20 * Math.abs(Math.sin(frame * 0.25 + i * 0.8)) * f,
                      backgroundColor: C.green,
                      borderRadius: 2.5,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 6: Bottom Copper Routing & Home Assistant (Frames 1267 - 1493) */}
        {/* ================================================================ */}
        {frame >= 1267 && frame < 1493 && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 1000,
                height: 840,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Img
                src={staticFile("images/renders/04_bottom_traces_routing.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.8))",
                  transform: `scale(${interpolate(frame, [1267, 1493], [1.02, 1.1])})`,
                }}
              />
            </div>

            {/* Technical Overlay Tag */}
            <div
              style={{
                position: "absolute",
                bottom: 36,
                backgroundColor: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                padding: "16px 28px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                backdropFilter: "blur(20px)",
              }}
            >
              <div>
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.cyan }}>LOCAL CONTROL</div>
                <div style={{ fontSize: 24, fontWeight: 800, marginTop: 2 }}>Home Assistant WebSockets</div>
              </div>
              <div style={{ width: 1, height: 32, backgroundColor: C.border }} />
              <div>
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.textMuted }}>LATENCY</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.cyan, marginTop: 2 }}>
                  Sub-15ms Toggle / 100% Private LAN
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 7: Outro & Next Milestones (Frames 1493 - 1770)              */}
        {/* ================================================================ */}
        {frame >= 1493 && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 900,
                height: 700,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Img
                src={staticFile("images/renders/01_hero_isometric_3d.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 25px 45px rgba(0,0,0,0.85))",
                  transform: `scale(${interpolate(frame, [1493, 1770], [1.0, 1.06])})`,
                }}
              />
            </div>

            {/* Minimalist Swiss-Style Milestone Card */}
            <div
              style={{
                position: "absolute",
                bottom: 30,
                backgroundColor: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 20,
                padding: "24px 36px",
                width: 760,
                backdropFilter: "blur(24px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <div style={{ fontFamily: C.mono, fontSize: 14, color: C.amber, fontWeight: 700 }}>
                  CHECKPOINT 01 // 5 HOURS COMPLETED
                </div>
                <div style={{ fontFamily: C.mono, fontSize: 14, color: C.textMuted }}>
                  HACK CLUB HALF LIFE
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ color: C.green, fontWeight: 800 }}>✔</span>
                  <span>Architecture, Pinout and Digital I2S Audio Confirmed</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ color: C.green, fontWeight: 800 }}>✔</span>
                  <span>ST7789 Display, 8x NeoPixel Halo and USB-C Power Mapped</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, color: C.cyan, fontWeight: 700 }}>
                  <span>→</span>
                  <span>Next: KiCad Schematic Capture and 2-Layer PCB Routing</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Subtitle Caption Overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 54,
          left: 56,
          right: 56,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 70,
        }}
      >
        {currentSub && (
          <div
            style={{
              backgroundColor: "rgba(8, 9, 13, 0.94)",
              border: "1px solid rgba(255, 255, 255, 0.16)",
              borderRadius: 18,
              padding: "14px 28px",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.6)",
              maxWidth: 920,
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontSize: 23,
                fontWeight: 600,
                color: C.textMain,
                lineHeight: 1.35,
              }}
            >
              {currentSub.text}
            </span>
          </div>
        )}
      </div>

      {/* Minimal Bottom Progress Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: "rgba(255, 255, 255, 0.08)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress * 100}%`,
            backgroundColor: C.cyan,
          }}
        />
      </div>
    </div>
  );
};
