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
    end: 28,
    text: "Hey everyone!",
  },
  {
    start: 28,
    end: 112,
    text: "Quick update on Hux for Hack Club's Half Life.",
  },
  {
    start: 112,
    end: 280,
    text: "We just crossed the 15-hour mark, and the complete hardware schematic and board architecture are locked down.",
  },
  {
    start: 280,
    end: 437,
    text: "After the initial planning, I spent these hours turning the block diagrams into real circuits in KiCad.",
  },
  {
    start: 437,
    end: 783,
    text: "First, I designed the power delivery with USB-C, TVS ESD diodes, and a clean 3.3-volt regulator to keep the ESP32-S3 stable under peak Wi-Fi bursts.",
  },
  {
    start: 783,
    end: 997,
    text: "Next, I wired the 40MHz SPI display bus and daisy-chained the eight Arc-Reactor NeoPixels using hardware RMT timing.",
  },
  {
    start: 997,
    end: 1334,
    text: "For audio, I routed digital I2S lines for the INMP441 mic and the MAX98357A amplifier, giving us clean voice interaction with zero RF buzz.",
  },
  {
    start: 1334,
    end: 1540,
    text: "Finally, I locked the 72-millimeter board outline with M3 mounting holes and passed ERC with zero errors.",
  },
  {
    start: 1540,
    end: 1649,
    text: "Next up: routing the copper layers and exporting Gerbers.",
  },
  {
    start: 1649,
    end: 1725,
    text: "Thanks for watching, and see you at the next milestone!",
  },
];

export const Hux15HourReel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalFrames = 1740;
  const progress = Math.min(1, frame / totalFrames);

  // Subtitle cue
  const currentSub = SUBTITLES.find((s) => frame >= s.start && frame < s.end);

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
      <Audio src={staticFile("hux_15h_voice.mp3")} volume={1.0} />
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
            HUX // 15-HOUR REEL
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
          HOURS 5 TO 15 COMPLETE
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
        {/* SCENE 1: Hero 3D Isometric View (Frames 0 - 280)                  */}
        {/* ================================================================ */}
        {frame >= 0 && frame < 280 && (
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
                  transform: `scale(${interpolate(frame, [0, 280], [1.02, 1.1])}) translateY(${interpolate(frame, [0, 280], [0, -15])}px)`,
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
                15 Hours Logged
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
                HARDWARE SCHEMATIC & BOARD ARCHITECTURE COMPLETE
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 2: KiCad Capture & Transition (Frames 280 - 437)            */}
        {/* ================================================================ */}
        {frame >= 280 && frame < 437 && (
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
                src={staticFile("images/renders/02_low_angle_front_cinematic.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.8))",
                  transform: `scale(${interpolate(frame, [280, 437], [1.0, 1.08])})`,
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
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.cyan }}>KICAD 10 DESIGN SPRINT</div>
                <div style={{ fontSize: 24, fontWeight: 800, marginTop: 2 }}>From Block Diagrams to Circuits</div>
              </div>
              <div style={{ width: 1, height: 32, backgroundColor: C.border }} />
              <div>
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.textMuted }}>WORKFLOW</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.green, marginTop: 2 }}>
                  Full Schematic Capture (Hours 5 to 15)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 3: USB-C & Power Tree Macro (Frames 437 - 783)              */}
        {/* ================================================================ */}
        {frame >= 437 && frame < 783 && (
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
                src={staticFile("images/renders/07_usbc_power_macro.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.8))",
                  transform: `scale(${interpolate(frame, [437, 783], [1.02, 1.1])})`,
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
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.amber }}>POWER TREE & PROTECTION</div>
                <div style={{ fontSize: 24, fontWeight: 800, marginTop: 2 }}>USB-C + TLV75533 LDO</div>
              </div>
              <div style={{ width: 1, height: 32, backgroundColor: C.border }} />
              <div>
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.textMuted }}>ESD PROTECTION</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.textMain, marginTop: 2 }}>
                  USBLC6-2 TVS Diodes + 5.1k CC Pull-Downs
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 4: 40MHz SPI Display & NeoPixel Halo (Frames 783 - 997)     */}
        {/* ================================================================ */}
        {frame >= 783 && frame < 997 && (
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
                  transform: `scale(${interpolate(frame, [783, 997], [1.02, 1.1])})`,
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
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.cyan }}>DISPLAY & STATUS HALO</div>
                <div style={{ fontSize: 24, fontWeight: 800, marginTop: 2 }}>40MHz SPI + 8x SK6812 Ring</div>
              </div>
              <div style={{ width: 1, height: 32, backgroundColor: C.border }} />
              <div>
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.textMuted }}>TIMING</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.amber, marginTop: 2 }}>
                  Single-Wire RMT Peripheral Bus (IO48)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 5: Digital I2S Audio Pipeline (Frames 997 - 1334)           */}
        {/* ================================================================ */}
        {frame >= 997 && frame < 1334 && (
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
                  transform: `scale(${interpolate(frame, [997, 1334], [1.02, 1.1])})`,
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
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.green }}>DIGITAL AUDIO</div>
                <div style={{ fontSize: 24, fontWeight: 800, marginTop: 2 }}>INMP441 + MAX98357A</div>
              </div>
              <div style={{ width: 1, height: 32, backgroundColor: C.border }} />
              <div>
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.textMuted }}>PERFORMANCE</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.textMain, marginTop: 2 }}>
                  3.2W Class-D Amp (Zero RF Noise)
                </div>
              </div>

              {/* Minimal Waveform Meter */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 28 }}>
                {[0.5, 0.9, 0.4, 1.0, 0.7, 0.3, 0.8, 0.6].map((f, i) => (
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
        {/* SCENE 6: 72mm Outline & ERC Zero Errors (Frames 1334 - 1540)      */}
        {/* ================================================================ */}
        {frame >= 1334 && frame < 1540 && (
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
                  transform: `scale(${interpolate(frame, [1334, 1540], [1.02, 1.08])})`,
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
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.green }}>RULES AUDIT</div>
                <div style={{ fontSize: 24, fontWeight: 800, marginTop: 2 }}>ERC Passed (0 Errors)</div>
              </div>
              <div style={{ width: 1, height: 32, backgroundColor: C.border }} />
              <div>
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.textMuted }}>GEOMETRY</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.cyan, marginTop: 2 }}>
                  72mm x 72mm Symmetrical PCB Layout
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 7: Milestone Summary & Outro (Frames 1540 - 1740)           */}
        {/* ================================================================ */}
        {frame >= 1540 && (
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
                  transform: `scale(${interpolate(frame, [1540, 1740], [1.0, 1.06])})`,
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
                  MILESTONE: 15 HOURS COMPLETED
                </div>
                <div style={{ fontFamily: C.mono, fontSize: 14, color: C.textMuted }}>
                  HACK CLUB HALF LIFE
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ color: C.green, fontWeight: 800 }}>✔</span>
                  <span>Full KiCad Schematic Captured and Verified (ERC Clean)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ color: C.green, fontWeight: 800 }}>✔</span>
                  <span>Power Delivery, Audio Pipeline and Arc-Reactor Wired</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, color: C.cyan, fontWeight: 700 }}>
                  <span>→</span>
                  <span>Next: 2-Layer PCB Routing and Gerber Export</span>
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
