import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  Audio,
  staticFile,
} from "remotion";

const THEME = {
  bg: "#06070a",
  cardBg: "rgba(18, 22, 31, 0.8)",
  cardBorder: "rgba(255, 255, 255, 0.12)",
  pillBg: "rgba(10, 14, 22, 0.9)",
  pillBorder: "rgba(0, 240, 255, 0.3)",
  textPrimary: "#f5f7fa",
  textSecondary: "#8b949e",
  cyan: "#00f0ff",
  cyanGlow: "rgba(0, 240, 255, 0.4)",
  gold: "#ffb703",
  green: "#00f5a0",
  red: "#ff4d4d",
};

const FONT_FAMILY =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif";
const FONT_MONO = "'SF Mono', Monaco, Menlo, 'JetBrains Mono', monospace";

interface Subtitle {
  start: number; // in frames (at 30fps)
  end: number;
  text: string;
}

const SUBTITLES: Subtitle[] = [
  {
    start: 2,
    end: 30,
    text: "Hey everyone!",
  },
  {
    start: 30,
    end: 113,
    text: "Quick update on Hux for Hack Club's Half Life.",
  },
  {
    start: 113,
    end: 266,
    text: "I just wrapped up the first 5 hours of planning and architecture, and here is how it is shaping up.",
  },
  {
    start: 266,
    end: 564,
    text: "At the core is an ESP32-S3 driving a color display with animated vector eyes, encircled by an eight-LED Arc-Reactor halo ring.",
  },
  {
    start: 564,
    end: 985,
    text: "For audio, I went with a 100% digital I2S setup using an INMP441 MEMS microphone and a MAX98357A amplifier with a 3W speaker, eliminating RF buzz from the Wi-Fi antenna.",
  },
  {
    start: 985,
    end: 1234,
    text: "Everything connects directly to my local Home Assistant server over WebSockets with instant sub-15ms response and zero cloud lag.",
  },
  {
    start: 1234,
    end: 1402,
    text: "The power tree is sorted with USB-C and ESD protection on a 72-millimeter board.",
  },
  {
    start: 1402,
    end: 1532,
    text: "Next up: routing the board in KiCad and writing the display firmware.",
  },
  {
    start: 1532,
    end: 1590,
    text: "Thanks for watching!",
  },
];

export const Hux5HourReel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalFrames = 1600;
  const progress = Math.min(1, frame / totalFrames);

  // Background pulsing aura
  const ambientPulse = 0.8 + 0.2 * Math.sin(frame * 0.08);

  // Subtitle cue
  const currentSub = SUBTITLES.find((s) => frame >= s.start && frame < s.end);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: THEME.bg,
        color: THEME.textPrimary,
        fontFamily: FONT_FAMILY,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Audio */}
      <Audio src={staticFile("hux_5h_voice.mp3")} volume={1.0} />
      <Audio src={staticFile("bg-music.mp3")} volume={0.16} />

      {/* Top Header: Dynamic Island Pill */}
      <div
        style={{
          position: "absolute",
          top: 64,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 50,
        }}
      >
        <div
          style={{
            backgroundColor: THEME.pillBg,
            border: `1.5px solid ${THEME.pillBorder}`,
            borderRadius: 30,
            padding: "14px 28px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            boxShadow: `0 8px 32px ${THEME.cyanGlow}`,
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: THEME.cyan,
              boxShadow: `0 0 12px ${THEME.cyan}`,
              transform: `scale(${ambientPulse})`,
            }}
          />
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 2,
              color: THEME.cyan,
              textTransform: "uppercase",
            }}
          >
            HUX // FIRST 5 HOURS PROGRESS
          </span>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 14,
              backgroundColor: "rgba(255, 183, 3, 0.15)",
              color: THEME.gold,
              padding: "4px 10px",
              borderRadius: 12,
              fontWeight: 700,
            }}
          >
            HALF LIFE
          </span>
        </div>
      </div>

      {/* Main Dynamic Viewport */}
      <div
        style={{
          position: "absolute",
          top: 150,
          bottom: 230,
          left: 48,
          right: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* ================================================================ */}
        {/* SCENE 1: Intro & 5-Hour Milestone (Frames 0 - 266)               */}
        {/* ================================================================ */}
        {frame >= 0 && frame < 266 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {/* 3D PCB Hero */}
            <div
              style={{
                width: 640,
                height: 640,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 32,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: 520,
                  height: 520,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, rgba(0, 240, 255, 0.25) 0%, transparent 70%)`,
                  filter: "blur(40px)",
                }}
              />
              <Img
                src={staticFile("images/hux_cover_hero.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.8))",
                  transform: `scale(${interpolate(frame, [0, 266], [0.95, 1.05])})`,
                }}
              />
            </div>

            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                letterSpacing: -1,
                color: THEME.textPrimary,
              }}
            >
              Hux
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 600,
                color: THEME.cyan,
                marginTop: 8,
              }}
            >
              Desktop AI Smart Home Companion
            </div>
            <div
              style={{
                fontFamily: FONT_MONO,
                fontSize: 18,
                color: THEME.textSecondary,
                marginTop: 12,
              }}
            >
              5 Hours Logged / Architectural Blueprint Ready
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 2: Core Hardware, Display & Halo (Frames 266 - 564)        */}
        {/* ================================================================ */}
        {frame >= 266 && frame < 564 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {/* Header Card */}
            <div
              style={{
                backgroundColor: THEME.cardBg,
                border: `1.5px solid ${THEME.cardBorder}`,
                borderRadius: 24,
                padding: "24px 32px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 14, color: THEME.cyan, fontWeight: 700 }}>
                  COMPUTE & VISUAL HUD
                </div>
                <div style={{ fontSize: 32, fontWeight: 800, marginTop: 4 }}>
                  ESP32-S3 + IPS Display
                </div>
              </div>
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 16,
                  color: THEME.green,
                  backgroundColor: "rgba(0, 245, 160, 0.15)",
                  padding: "8px 16px",
                  borderRadius: 16,
                  fontWeight: 700,
                }}
              >
                60 FPS VECTOR EYES
              </div>
            </div>

            {/* Visual Sketch Card */}
            <div
              style={{
                backgroundColor: THEME.cardBg,
                border: `1.5px solid ${THEME.cardBorder}`,
                borderRadius: 24,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Img
                src={staticFile("images/initial_04_expressive_face_state_machine.png")}
                style={{
                  width: "100%",
                  height: 520,
                  objectFit: "contain",
                  borderRadius: 16,
                  backgroundColor: "#ffffff",
                }}
              />
            </div>

            {/* Spec Row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ backgroundColor: THEME.cardBg, borderRadius: 20, padding: 20, border: `1px solid ${THEME.cardBorder}` }}>
                <div style={{ fontFamily: FONT_MONO, fontSize: 13, color: THEME.textSecondary }}>DISPLAY BUS</div>
                <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>40MHz High-Speed SPI</div>
                <div style={{ fontSize: 14, color: THEME.cyan, marginTop: 2 }}>ST7789 1.69" 240x280 IPS</div>
              </div>
              <div style={{ backgroundColor: THEME.cardBg, borderRadius: 20, padding: 20, border: `1px solid ${THEME.cardBorder}` }}>
                <div style={{ fontFamily: FONT_MONO, fontSize: 13, color: THEME.textSecondary }}>OPTICAL AURA</div>
                <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>8x NeoPixel Arc-Reactor</div>
                <div style={{ fontSize: 14, color: THEME.cyan, marginTop: 2 }}>Single-Wire RMT (IO48)</div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 3: 100% Digital I2S Audio Pipeline (Frames 564 - 985)      */}
        {/* ================================================================ */}
        {frame >= 564 && frame < 985 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {/* Header Card */}
            <div
              style={{
                backgroundColor: THEME.cardBg,
                border: `1.5px solid ${THEME.cardBorder}`,
                borderRadius: 24,
                padding: "24px 32px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 14, color: THEME.green, fontWeight: 700 }}>
                  AUDIO ARCHITECTURE
                </div>
                <div style={{ fontSize: 32, fontWeight: 800, marginTop: 4 }}>
                  Pure Digital I2S Audio
                </div>
              </div>
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 16,
                  color: THEME.green,
                  backgroundColor: "rgba(0, 245, 160, 0.15)",
                  padding: "8px 16px",
                  borderRadius: 16,
                  fontWeight: 700,
                }}
              >
                ZERO RF WI-FI BUZZ
              </div>
            </div>

            {/* Audio Sketch Showcase */}
            <div
              style={{
                backgroundColor: THEME.cardBg,
                border: `1.5px solid ${THEME.cardBorder}`,
                borderRadius: 24,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Img
                src={staticFile("images/initial_06_voice_pipeline_i2s_dsp.png")}
                style={{
                  width: "100%",
                  height: 480,
                  objectFit: "contain",
                  borderRadius: 16,
                  backgroundColor: "#ffffff",
                }}
              />
            </div>

            {/* Equalizer Waveform Animation */}
            <div
              style={{
                backgroundColor: THEME.cardBg,
                borderRadius: 20,
                padding: "16px 28px",
                border: `1px solid ${THEME.cardBorder}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 28 }}>🎙️</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>INMP441 MEMS + MAX98357A</div>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 13, color: THEME.textSecondary }}>24-bit delta-sigma ADC · 3W Class-D Amp</div>
                </div>
              </div>

              {/* Bouncing EQ Bars */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 36 }}>
                {[0.6, 1.0, 0.4, 0.9, 0.7, 0.3, 0.8, 0.5].map((factor, idx) => {
                  const barH = 12 + 24 * Math.abs(Math.sin(frame * 0.2 + idx * 0.7)) * factor;
                  return (
                    <div
                      key={idx}
                      style={{
                        width: 6,
                        height: barH,
                        backgroundColor: THEME.cyan,
                        borderRadius: 3,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 4: Local Home Assistant Integration (Frames 985 - 1234)    */}
        {/* ================================================================ */}
        {frame >= 985 && frame < 1234 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {/* Header Card */}
            <div
              style={{
                backgroundColor: THEME.cardBg,
                border: `1.5px solid ${THEME.cardBorder}`,
                borderRadius: 24,
                padding: "24px 32px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 14, color: THEME.cyan, fontWeight: 700 }}>
                  ZERO CLOUD LAG
                </div>
                <div style={{ fontSize: 32, fontWeight: 800, marginTop: 4 }}>
                  Local Home Assistant Link
                </div>
              </div>
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 16,
                  color: THEME.green,
                  backgroundColor: "rgba(0, 245, 160, 0.15)",
                  padding: "8px 16px",
                  borderRadius: 16,
                  fontWeight: 700,
                }}
              >
                &lt; 15MS RESPONSE
              </div>
            </div>

            {/* Protocol Sketch Showcase */}
            <div
              style={{
                backgroundColor: THEME.cardBg,
                border: `1.5px solid ${THEME.cardBorder}`,
                borderRadius: 24,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Img
                src={staticFile("images/initial_07_home_assistant_local_api.png")}
                style={{
                  width: "100%",
                  height: 500,
                  objectFit: "contain",
                  borderRadius: 16,
                  backgroundColor: "#ffffff",
                }}
              />
            </div>

            {/* 3 Metric Pills */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              <div style={{ backgroundColor: THEME.cardBg, padding: 18, borderRadius: 16, border: `1px solid ${THEME.cardBorder}`, textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: THEME.green }}>100%</div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: THEME.textSecondary, marginTop: 4 }}>LOCAL & PRIVATE</div>
              </div>
              <div style={{ backgroundColor: THEME.cardBg, padding: 18, borderRadius: 16, border: `1px solid ${THEME.cardBorder}`, textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: THEME.cyan }}>&lt; 15ms</div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: THEME.textSecondary, marginTop: 4 }}>LATENCY TOGGLE</div>
              </div>
              <div style={{ backgroundColor: THEME.cardBg, padding: 18, borderRadius: 16, border: `1px solid ${THEME.cardBorder}`, textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: THEME.gold }}>0</div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: THEME.textSecondary, marginTop: 4 }}>CLOUD HOPS</div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 5: Power Delivery & 72mm PCB (Frames 1234 - 1402)          */}
        {/* ================================================================ */}
        {frame >= 1234 && frame < 1402 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {/* Header Card */}
            <div
              style={{
                backgroundColor: THEME.cardBg,
                border: `1.5px solid ${THEME.cardBorder}`,
                borderRadius: 24,
                padding: "24px 32px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 14, color: THEME.gold, fontWeight: 700 }}>
                  POWER TREE & ERGONOMICS
                </div>
                <div style={{ fontSize: 32, fontWeight: 800, marginTop: 4 }}>
                  72mm Board + USB-C
                </div>
              </div>
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 16,
                  color: THEME.gold,
                  backgroundColor: "rgba(255, 183, 3, 0.15)",
                  padding: "8px 16px",
                  borderRadius: 16,
                  fontWeight: 700,
                }}
              >
                SUB-$65 CAP ($49.50)
              </div>
            </div>

            {/* Board Floorplan Sketch */}
            <div
              style={{
                backgroundColor: THEME.cardBg,
                border: `1.5px solid ${THEME.cardBorder}`,
                borderRadius: 24,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Img
                src={staticFile("images/initial_09_pcb_floorplan_ergonomics.png")}
                style={{
                  width: "100%",
                  height: 500,
                  objectFit: "contain",
                  borderRadius: 16,
                  backgroundColor: "#ffffff",
                }}
              />
            </div>

            {/* Power Callout */}
            <div
              style={{
                backgroundColor: THEME.cardBg,
                borderRadius: 20,
                padding: "16px 28px",
                border: `1px solid ${THEME.cardBorder}`,
                display: "flex",
                justifyContent: "space-between",
                fontFamily: FONT_MONO,
                fontSize: 15,
              }}
            >
              <span>TLV75533 3.3V LDO + USBLC6-2 ESD</span>
              <span style={{ color: THEME.green, fontWeight: 700 }}>4x M3 Mounting Holes</span>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 6: Next Steps & Outro (Frames 1402 - 1600)                 */}
        {/* ================================================================ */}
        {frame >= 1402 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {/* Checklist Bento Card */}
            <div
              style={{
                width: 680,
                backgroundColor: THEME.cardBg,
                borderRadius: 28,
                border: `2px solid ${THEME.pillBorder}`,
                padding: 40,
                boxShadow: `0 20px 60px ${THEME.cyanGlow}`,
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 15,
                  color: THEME.cyan,
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                SPRINT 01 MILESTONE REACHED
              </div>
              <div style={{ fontSize: 36, fontWeight: 900, marginBottom: 28 }}>
                First 5 Hours Done
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 18, fontSize: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ color: THEME.green, fontWeight: 800 }}>✔</span>
                  <span>Architecture & System Diagrams Completed</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ color: THEME.green, fontWeight: 800 }}>✔</span>
                  <span>ESP32-S3 Pinout & Digital Audio Pipeline Locked</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ color: THEME.green, fontWeight: 800 }}>✔</span>
                  <span>Arc-Reactor Halo & Vector Eyes Designed</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, color: THEME.cyan, fontWeight: 700 }}>
                  <span>→</span>
                  <span>Next: KiCad Schematic Capture & PCB Routing</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 36, fontSize: 22, color: THEME.textSecondary, fontFamily: FONT_MONO }}>
              Hack Club Half Life // Next Update Coming Soon!
            </div>
          </div>
        )}
      </div>

      {/* Bottom Subtitle Caption Overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 56,
          left: 48,
          right: 48,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 50,
        }}
      >
        {currentSub && (
          <div
            style={{
              backgroundColor: "rgba(6, 7, 10, 0.92)",
              border: `1.5px solid ${THEME.cyan}`,
              borderRadius: 20,
              padding: "16px 32px",
              boxShadow: `0 8px 30px ${THEME.cyanGlow}`,
              maxWidth: 900,
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: THEME.textPrimary,
                lineHeight: 1.35,
              }}
            >
              {currentSub.text}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Progress Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 6,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress * 100}%`,
            backgroundColor: THEME.cyan,
            boxShadow: `0 0 12px ${THEME.cyan}`,
          }}
        />
      </div>
    </div>
  );
};
