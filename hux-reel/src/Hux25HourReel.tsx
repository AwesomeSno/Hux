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
  surface: "rgba(16, 20, 28, 0.88)",
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
    start: 2,
    end: 27,
    text: "Hey everyone!",
  },
  {
    start: 27,
    end: 234,
    text: "Welcome to the 25-hour milestone for Hux on Hack Club's Half Life, covering our sprint from hour 15 to 25!",
  },
  {
    start: 234,
    end: 367,
    text: "With the schematic locked, I routed the entire 2-layer PCB in KiCad.",
  },
  {
    start: 367,
    end: 607,
    text: "I ran the 40MHz display SPI bus on top, poured solid ground planes on both sides, and added stitching vias to kill RF noise.",
  },
  {
    start: 607,
    end: 823,
    text: "After passing DRC with zero errors, I exported the JLCPCB Gerbers and automated SMT pick-and-place files.",
  },
  {
    start: 823,
    end: 1171,
    text: "Next, I wrote the firmware in C++: an ST7789 display driver running a 60fps procedural vector eye engine with real-time gaze and blinking.",
  },
  {
    start: 1171,
    end: 1394,
    text: "I configured dual DMA channels for the I2S mic and amp, plus an RMT driver for the eight Arc-Reactor NeoPixels.",
  },
  {
    start: 1394,
    end: 1608,
    text: "Connected to my local Home Assistant over WebSockets, command latency is under 15 milliseconds at 62 milliamps idle.",
  },
  {
    start: 1608,
    end: 1706,
    text: "Hux is fully routed, coded, and ready for fabrication.",
  },
  {
    start: 1706,
    end: 1755,
    text: "See you at the next milestone!",
  },
];

export const Hux25HourReel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalFrames = 1755;
  const progress = Math.min(1, frame / totalFrames);

  // Subtitle cue
  const currentSub = SUBTITLES.find((s) => frame >= s.start && frame < s.end);

  // Eye animation calculations for Scene 5 (Frames 823 to 1171)
  const eyeRelFrame = frame - 823;
  // Blink cycle every 75 frames, blink lasts 12 frames
  const blinkCycle = eyeRelFrame % 75;
  const eyeScaleY = blinkCycle < 12 ? interpolate(blinkCycle, [0, 6, 12], [1, 0.08, 1]) : 1;
  // Saccade horizontal look (center -> right -> center -> left -> center)
  const gazeX = interpolate(
    eyeRelFrame % 140,
    [0, 30, 45, 75, 90, 120, 140],
    [0, 22, 22, -22, -22, 0, 0]
  );
  const gazeY = interpolate(
    eyeRelFrame % 140,
    [0, 30, 45, 75, 90, 120, 140],
    [0, -6, -6, 6, 6, 0, 0]
  );

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
      <Audio src={staticFile("hux_25h_voice.mp3")} volume={1.0} />
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
            HUX // 25-HOUR REEL
          </span>
        </div>

        <div
          style={{
            fontFamily: C.mono,
            fontSize: 14,
            fontWeight: 700,
            color: C.cyan,
            backgroundColor: "rgba(56, 189, 248, 0.12)",
            border: "1px solid rgba(56, 189, 248, 0.3)",
            padding: "6px 14px",
            borderRadius: 20,
            letterSpacing: 1,
          }}
        >
          HOURS 15 TO 25 COMPLETE
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
        {/* SCENE 1: Hero 3D Isometric View (Frames 0 - 234)                  */}
        {/* ================================================================ */}
        {frame >= 0 && frame < 234 && (
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
                  transform: `scale(${interpolate(frame, [0, 234], [1.02, 1.1])}) translateY(${interpolate(frame, [0, 234], [0, -15])}px)`,
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
                25 Hours Logged
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
                SPRINT 02: PCB ROUTING, FAB GERBERS & FIRMWARE
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 2: 2-Layer KiCad Board Routing (Frames 234 - 367)           */}
        {/* ================================================================ */}
        {frame >= 234 && frame < 367 && (
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
                height: 860,
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
                  transform: `scale(${interpolate(frame, [234, 367], [1.02, 1.09])})`,
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
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.cyan }}>KICAD PCB ARCHITECTURE</div>
                <div style={{ fontSize: 24, fontWeight: 800, marginTop: 2 }}>2-Layer FR4 Routing</div>
              </div>
              <div style={{ width: 1, height: 32, backgroundColor: C.border }} />
              <div>
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.textMuted }}>STACKUP SPEC</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.amber, marginTop: 2 }}>
                  Top: 40MHz SPI // Bottom: Solid GND Plane
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 3: SPI Bus & Stitching Vias (Frames 367 - 607)              */}
        {/* ================================================================ */}
        {frame >= 367 && frame < 607 && (
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
                src={staticFile("images/renders/03_top_ortho_clean.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.8))",
                  transform: `scale(${interpolate(frame, [367, 607], [1.02, 1.1])})`,
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
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.amber }}>RF NOISE MITIGATION</div>
                <div style={{ fontSize: 24, fontWeight: 800, marginTop: 2 }}>5x5mm Stitching Via Grid</div>
              </div>
              <div style={{ width: 1, height: 32, backgroundColor: C.border }} />
              <div>
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.textMuted }}>BUS FREQUENCY</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.green, marginTop: 2 }}>
                  40MHz ST7789 SPI + Thermal Relief
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 4: DRC Clean & SMT Fabrication Files (Frames 607 - 823)     */}
        {/* ================================================================ */}
        {frame >= 607 && frame < 823 && (
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
                height: 820,
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
                  transform: `scale(${interpolate(frame, [607, 823], [1.02, 1.1])})`,
                }}
              />
            </div>

            {/* DRC Verification Card Overlay */}
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
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.green }}>DRC STATUS: PASSED</div>
                <div style={{ fontSize: 24, fontWeight: 800, marginTop: 2 }}>0 Errors / 0 Warnings</div>
              </div>
              <div style={{ width: 1, height: 32, backgroundColor: C.border }} />
              <div>
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.textMuted }}>SMT PICK & PLACE</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.cyan, marginTop: 2 }}>
                  JLCPCB BOM & CPL Calibrated
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 5: ST7789 C++ Driver & 60fps Vector Eye Engine (823 - 1171) */}
        {/* ================================================================ */}
        {frame >= 823 && frame < 1171 && (
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
            {/* Live Interactive Vector Eye Display Viewport */}
            <div
              style={{
                width: 720,
                height: 720,
                borderRadius: "50%",
                backgroundColor: "#05070a",
                border: "4px solid rgba(56, 189, 248, 0.4)",
                boxShadow: "0 0 60px rgba(56, 189, 248, 0.25), inset 0 0 40px rgba(0,0,0,0.9)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle CRT Grid Lines */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "linear-gradient(rgba(56, 189, 248, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.05) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                  pointerEvents: "none",
                }}
              />

              {/* Display Bezel HUD Header */}
              <div
                style={{
                  position: "absolute",
                  top: 90,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontFamily: C.mono,
                  fontSize: 14,
                  color: C.cyan,
                  letterSpacing: 1.5,
                }}
              >
                <span>ST7789 240x280 IPS</span>
                <span>•</span>
                <span style={{ color: C.green }}>60.0 FPS DMA</span>
              </div>

              {/* Procedural Vector Eyes */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 56,
                  transform: `translate(${gazeX}px, ${gazeY}px) scaleY(${eyeScaleY})`,
                  transition: "transform 0.08s ease-out",
                }}
              >
                {/* Left Eye */}
                <div
                  style={{
                    width: 140,
                    height: 200,
                    borderRadius: 44,
                    backgroundColor: C.cyan,
                    boxShadow: "0 0 35px rgba(56, 189, 248, 0.8), inset 0 0 15px rgba(255,255,255,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  {/* Pupil Highlight */}
                  <div
                    style={{
                      width: 42,
                      height: 60,
                      borderRadius: 16,
                      backgroundColor: "#ffffff",
                      position: "absolute",
                      top: 30,
                      left: 30,
                      opacity: 0.85,
                    }}
                  />
                </div>

                {/* Right Eye */}
                <div
                  style={{
                    width: 140,
                    height: 200,
                    borderRadius: 44,
                    backgroundColor: C.cyan,
                    boxShadow: "0 0 35px rgba(56, 189, 248, 0.8), inset 0 0 15px rgba(255,255,255,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  {/* Pupil Highlight */}
                  <div
                    style={{
                      width: 42,
                      height: 60,
                      borderRadius: 16,
                      backgroundColor: "#ffffff",
                      position: "absolute",
                      top: 30,
                      left: 30,
                      opacity: 0.85,
                    }}
                  />
                </div>
              </div>

              {/* Display Bezel HUD Footer */}
              <div
                style={{
                  position: "absolute",
                  bottom: 95,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  fontFamily: C.mono,
                  fontSize: 13,
                  color: C.textMuted,
                }}
              >
                <span>STATE: REACTIVE GAZE</span>
                <span>•</span>
                <span>LATENCY: 16.6ms</span>
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
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.cyan }}>EMBEDDED GRAPHICS ENGINE</div>
                <div style={{ fontSize: 24, fontWeight: 800, marginTop: 2 }}>Procedural Vector Eyes</div>
              </div>
              <div style={{ width: 1, height: 32, backgroundColor: C.border }} />
              <div>
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.textMuted }}>PERFORMANCE</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.green, marginTop: 2 }}>
                  60 FPS Hardware SPI DMA Driver
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 6: Dual DMA I2S Audio & NeoPixels (Frames 1171 - 1394)      */}
        {/* ================================================================ */}
        {frame >= 1171 && frame < 1394 && (
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
                  transform: `scale(${interpolate(frame, [1171, 1394], [1.02, 1.1])})`,
                }}
              />
            </div>

            {/* Technical Overlay Tag with Audio Meter & NeoPixel Status */}
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
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.cyan }}>AUDIO & HALO ENGINE</div>
                <div style={{ fontSize: 24, fontWeight: 800, marginTop: 2 }}>Dual DMA Channels + RMT</div>
              </div>

              <div style={{ width: 1, height: 32, backgroundColor: C.border }} />

              {/* Animated EQ Bars */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 28 }}>
                {[0.8, 0.4, 0.95, 0.6, 0.75, 0.3, 0.9, 0.5, 0.85].map((scale, i) => {
                  const h =
                    8 +
                    20 *
                      Math.abs(
                        Math.sin((frame * 0.25) + i * 0.8) * scale
                      );
                  return (
                    <div
                      key={i}
                      style={{
                        width: 5,
                        height: h,
                        backgroundColor: i % 2 === 0 ? C.cyan : C.amber,
                        borderRadius: 3,
                      }}
                    />
                  );
                })}
              </div>

              <div style={{ width: 1, height: 32, backgroundColor: C.border }} />

              <div>
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.textMuted }}>PERIPHERALS</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.textMain, marginTop: 2 }}>
                  INMP441 + MAX98357A + 8x SK6812
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 7: Local Home Assistant Bench Telemetry (1394 - 1608)       */}
        {/* ================================================================ */}
        {frame >= 1394 && frame < 1608 && (
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
                height: 840,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Img
                src={staticFile("images/renders/05_esp32_macro_closeup.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.8))",
                  transform: `scale(${interpolate(frame, [1394, 1608], [1.02, 1.1])})`,
                }}
              />
            </div>

            {/* Bench Telemetry Card Overlay */}
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
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.green }}>LOCAL WEBSOCKET LATENCY</div>
                <div style={{ fontSize: 24, fontWeight: 800, marginTop: 2 }}>&lt; 15ms Response</div>
              </div>

              <div style={{ width: 1, height: 32, backgroundColor: C.border }} />

              <div>
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.cyan }}>IDLE POWER DRAW</div>
                <div style={{ fontSize: 24, fontWeight: 800, marginTop: 2 }}>62 mA @ 5V</div>
              </div>

              <div style={{ width: 1, height: 32, backgroundColor: C.border }} />

              <div>
                <div style={{ fontFamily: C.mono, fontSize: 13, color: C.textMuted }}>THERMAL BASELINE</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: C.amber, marginTop: 2 }}>
                  34.2 deg C
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCENE 8: Ready for Fabrication / Outro (Frames 1608 - 1755)       */}
        {/* ================================================================ */}
        {frame >= 1608 && (
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
                src={staticFile("images/renders/02_low_angle_front_cinematic.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 25px 45px rgba(0,0,0,0.85))",
                  transform: `scale(${interpolate(frame, [1608, 1755], [1.0, 1.06])})`,
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
                <div style={{ fontFamily: C.mono, fontSize: 14, color: C.cyan, fontWeight: 700 }}>
                  MILESTONE: 25 HOURS COMPLETED
                </div>
                <div style={{ fontFamily: C.mono, fontSize: 14, color: C.textMuted }}>
                  HACK CLUB HALF LIFE
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ color: C.green, fontWeight: 800 }}>✔</span>
                  <span>2-Layer KiCad Board Routed with 0 DRC Errors</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ color: C.green, fontWeight: 800 }}>✔</span>
                  <span>Automated JLCPCB Gerbers and SMT CPL Files Exported</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ color: C.green, fontWeight: 800 }}>✔</span>
                  <span>ST7789 60fps Vector Eye Engine and Dual I2S DMA Functional</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, color: C.cyan, fontWeight: 700 }}>
                  <span>→</span>
                  <span>Board Ready for Fabrication and Physical Assembly</span>
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
