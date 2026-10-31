import React from "react";
import {
  interpolate,
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

  const ambientPulse = 0.8 + 0.2 * Math.sin(frame * 0.08);

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
      <Audio src={staticFile("hux_5h_checkpoint_voice.mp3")} volume={1.0} />
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
            HUX // 5 HOUR CHECKPOINT
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
        {/* SCENE 1: Intro & 5-Hour Checkpoint Hook (Frames 0 - 268)         */}
        {/* ================================================================ */}
        {frame >= 0 && frame < 268 && (
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
                  transform: `scale(${interpolate(frame, [0, 268], [0.95, 1.05])})`,
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
                color: THEME.gold,
                marginTop: 12,
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              CHECKPOINT 01 // 5 HOURS COMPLETED
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 2: Problem & ESP32-S3 Core (Frames 268 - 470)              */}
        {/* ================================================================ */}
        {frame >= 268 && frame < 470 && (
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
                  PROBLEM & ARCHITECTURE
                </div>
                <div style={{ fontSize: 32, fontWeight: 800, marginTop: 4 }}>
                  Lifeless Speakers vs Hux
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
                ESP32-S3 POWERED
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
                src={staticFile("images/initial_01_problem_lifeless_speakers.png")}
                style={{
                  width: "100%",
                  height: 520,
                  objectFit: "contain",
                  borderRadius: 16,
                  backgroundColor: "#ffffff",
                }}
              />
            </div>

            {/* Comparison Callout */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ backgroundColor: THEME.cardBg, borderRadius: 20, padding: 20, border: `1px solid ${THEME.cardBorder}` }}>
                <div style={{ fontFamily: FONT_MONO, fontSize: 13, color: THEME.red, fontWeight: 700 }}>REJECTED PUCK</div>
                <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>Black Plastic Cylinder</div>
                <div style={{ fontSize: 14, color: THEME.textSecondary, marginTop: 2 }}>0 emotion, single blinking LED</div>
              </div>
              <div style={{ backgroundColor: THEME.cardBg, borderRadius: 20, padding: 20, border: `1px solid ${THEME.cardBorder}` }}>
                <div style={{ fontFamily: FONT_MONO, fontSize: 13, color: THEME.green, fontWeight: 700 }}>HUX COMPANION</div>
                <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>Living Desktop Persona</div>
                <div style={{ fontSize: 14, color: THEME.cyan, marginTop: 2 }}>Color IPS + 8-LED halo ring</div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 3: Expressive Face & Vector Eyes (Frames 470 - 687)         */}
        {/* ================================================================ */}
        {frame >= 470 && frame < 687 && (
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
                  EXPRESSIVE FACE HUD
                </div>
                <div style={{ fontSize: 32, fontWeight: 800, marginTop: 4 }}>
                  Color IPS Display
                </div>
              </div>
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 16,
                  color: THEME.cyan,
                  backgroundColor: "rgba(0, 240, 255, 0.15)",
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
                <div style={{ fontFamily: FONT_MONO, fontSize: 13, color: THEME.textSecondary }}>EMOTION ENGINE</div>
                <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>Blink, Look, React</div>
                <div style={{ fontSize: 14, color: THEME.green, marginTop: 2 }}>Real-Time State Machine</div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 4: Arc-Reactor Status Halo (Frames 687 - 863)              */}
        {/* ================================================================ */}
        {frame >= 687 && frame < 863 && (
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
                  OPTICAL STATUS AURA
                </div>
                <div style={{ fontSize: 32, fontWeight: 800, marginTop: 4 }}>
                  Arc-Reactor Halo Ring
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
                8X ADDRESSABLE LEDS
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
                src={staticFile("images/initial_05_arc_reactor_halo_optics.png")}
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              <div style={{ backgroundColor: THEME.cardBg, borderRadius: 20, padding: 18, border: `1px solid ${THEME.cardBorder}`, textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: THEME.cyan }}>CYAN GLOW</div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: THEME.textSecondary, marginTop: 4 }}>Wake Listening</div>
              </div>
              <div style={{ backgroundColor: THEME.cardBg, borderRadius: 20, padding: 18, border: `1px solid ${THEME.cardBorder}`, textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: THEME.gold }}>AMBER SPIN</div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: THEME.textSecondary, marginTop: 4 }}>Intent Thinking</div>
              </div>
              <div style={{ backgroundColor: THEME.cardBg, borderRadius: 20, padding: 18, border: `1px solid ${THEME.cardBorder}`, textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: THEME.green }}>PULSE FX</div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: THEME.textSecondary, marginTop: 4 }}>Volume & States</div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 5: Digital I2S Audio Pipeline (Frames 863 - 1267)          */}
        {/* ================================================================ */}
        {frame >= 863 && frame < 1267 && (
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
        {/* SCENE 6: Local Home Assistant Integration (Frames 1267 - 1493)   */}
        {/* ================================================================ */}
        {frame >= 1267 && frame < 1493 && (
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
        {/* SCENE 7: Hour 10 Roadmap & Checkpoint Outro (Frames 1493 - 1770) */}
        {/* ================================================================ */}
        {frame >= 1493 && (
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
                  color: THEME.gold,
                  fontWeight: 700,
                  marginBottom: 8,
                  letterSpacing: 1,
                }}
              >
                CHECKPOINT 01 // 5 HOURS COMPLETED
              </div>
              <div style={{ fontSize: 36, fontWeight: 900, marginBottom: 28 }}>
                Hux Milestone Achieved
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 18, fontSize: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ color: THEME.green, fontWeight: 800 }}>✔</span>
                  <span>Architecture & System Topology Finalized</span>
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
                <div style={{ display: "flex", alignItems: "center", gap: 14, color: THEME.cyan, fontWeight: 700 }}>
                  <span>→</span>
                  <span>Next: Display Driver & Face Engine Firmware</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 36, fontSize: 22, color: THEME.textSecondary, fontFamily: FONT_MONO }}>
              Hack Club Half Life // See you at Checkpoint 2!
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
