import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  Audio,
  staticFile,
  Sequence,
} from "remotion";

const THEME = {
  bg: "#06070a",
  cardBg: "rgba(18, 22, 31, 0.75)",
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

interface Subtitle {
  start: number; // in frames (at 30fps)
  end: number;
  text: string;
}

const SUBTITLES: Subtitle[] = [
  {
    start: 2,
    end: 140,
    text: "Most smart home hubs are just lifeless black cylinders with zero personality.",
  },
  {
    start: 140,
    end: 294,
    text: "For Hack Club's Half Life, I wanted to build something with actual life and presence.",
  },
  {
    start: 294,
    end: 443,
    text: "Meet Hux, a desktop AI smart home companion inspired by Jarvis.",
  },
  {
    start: 443,
    end: 704,
    text: "At its center is a color IPS display showing expressive animated eye emotions, encircled by an Arc-Reactor RGB status halo.",
  },
  {
    start: 704,
    end: 1010,
    text: "Powered by an ESP32-S3, it controls Home Assistant locally over Wi-Fi with zero cloud lag, paired with an I2S digital mic and speaker.",
  },
  {
    start: 1010,
    end: 1103,
    text: "And it's all designed under a sixty-five dollar budget.",
  },
  {
    start: 1103,
    end: 1215,
    text: "Now, let me walk you through the basics of how this comes together!",
  },
];

export const HuxIntroReel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Global progress (0 -> 1)
  const totalFrames = 1230;
  const progress = Math.min(1, frame / totalFrames);

  // Background ambient pulsing cyan glow
  const ambientPulse = 0.8 + 0.2 * Math.sin(frame * 0.08);

  // Current Subtitle
  const currentSub = SUBTITLES.find(
    (s) => frame >= s.start && frame < s.end
  );

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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Background Audio */}
      <Audio src={staticFile("bg-music.mp3")} volume={0.12} loop />
      <Audio src={staticFile("hux_intro_voice.mp3")} volume={1.0} />

      {/* Grid Pattern Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(circle at center, black 40%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 40%, transparent 85%)",
        }}
      />

      {/* Ambient Lighting Orbs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${THEME.cyanGlow} 0%, transparent 70%)`,
          opacity: 0.25 * ambientPulse,
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* TOP HEADER: Dynamic Island & Progress Bar */}
      <div
        style={{
          width: "90%",
          maxWidth: 960,
          marginTop: 60,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          zIndex: 10,
        }}
      >
        {/* Progress Line */}
        <div
          style={{
            width: "100%",
            height: 4,
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress * 100}%`,
              height: "100%",
              backgroundColor: THEME.cyan,
              boxShadow: `0 0 10px ${THEME.cyan}`,
            }}
          />
        </div>

        {/* Dynamic Island Capsule */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 24px",
            backgroundColor: THEME.pillBg,
            border: `1px solid ${THEME.pillBorder}`,
            borderRadius: 36,
            backdropFilter: "blur(20px)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: THEME.cyan,
                boxShadow: `0 0 12px ${THEME.cyan}`,
              }}
            />
            <span
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 1.5,
                color: THEME.textPrimary,
              }}
            >
              HUX // 01
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "rgba(0, 240, 255, 0.12)",
              padding: "6px 14px",
              borderRadius: 20,
              border: `1px solid rgba(0, 240, 255, 0.25)`,
            }}
          >
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: THEME.cyan,
                letterSpacing: 0.5,
              }}
            >
              HALF LIFE • <span style={{ color: THEME.gold }}>$65 CAP</span>
            </span>
          </div>
        </div>
      </div>

      {/* MAIN DYNAMIC CONTENT SCENES */}
      <div
        style={{
          flex: 1,
          width: "90%",
          maxWidth: 960,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 5,
        }}
      >
        {/* SCENE 1: The Problem (Frames 0 -> 140) */}
        <Sequence from={0} durationInFrames={140}>
          <SceneProblem />
        </Sequence>

        {/* SCENE 2: The Half Life Vision (Frames 140 -> 294) */}
        <Sequence from={140} durationInFrames={154}>
          <SceneVision />
        </Sequence>

        {/* SCENE 3: Introducing Hux (Frames 294 -> 443) */}
        <Sequence from={294} durationInFrames={149}>
          <SceneIntroHux />
        </Sequence>

        {/* SCENE 4: Expressive Face & Arc Halo (Frames 443 -> 704) */}
        <Sequence from={443} durationInFrames={261}>
          <SceneFaceAndHalo />
        </Sequence>

        {/* SCENE 5: Tech Core - ESP32-S3 & Home Assistant (Frames 704 -> 1010) */}
        <Sequence from={704} durationInFrames={306}>
          <SceneTechCore />
        </Sequence>

        {/* SCENE 6: Budget Under $65 (Frames 1010 -> 1103) */}
        <Sequence from={1010} durationInFrames={93}>
          <SceneBudget />
        </Sequence>

        {/* SCENE 7: Outro Handoff - Let's Walk Through The Basics (Frames 1103 -> 1230) */}
        <Sequence from={1103} durationInFrames={127}>
          <SceneOutroHandoff />
        </Sequence>
      </div>

      {/* BOTTOM FLOATING SUBTITLE BAR */}
      <div
        style={{
          width: "90%",
          maxWidth: 960,
          marginBottom: 80,
          zIndex: 10,
        }}
      >
        {currentSub && (
          <div
            style={{
              padding: "20px 30px",
              backgroundColor: "rgba(10, 14, 22, 0.88)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 24,
              backdropFilter: "blur(20px)",
              boxShadow: "0 15px 40px rgba(0, 0, 0, 0.6)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 34,
                fontWeight: 600,
                lineHeight: 1.35,
                color: "#ffffff",
                letterSpacing: -0.5,
              }}
            >
              {currentSub.text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── SCENE 1: The Problem ───
const SceneProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, config: { damping: 14 } });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        transform: `scale(${enter})`,
        opacity: enter,
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "8px 20px",
          borderRadius: 20,
          backgroundColor: "rgba(255, 77, 77, 0.15)",
          border: `1px solid rgba(255, 77, 77, 0.4)`,
          color: THEME.red,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 2,
          marginBottom: 30,
          textTransform: "uppercase",
        }}
      >
        The Problem
      </div>

      <h1
        style={{
          fontSize: 68,
          fontWeight: 800,
          lineHeight: 1.15,
          margin: "0 0 40px 0",
          letterSpacing: -1.5,
          color: "#fff",
        }}
      >
        Boring Black <br />
        <span style={{ color: THEME.textSecondary }}>Desk Cylinders</span>
      </h1>

      {/* Cross-out Graphic Card */}
      <div
        style={{
          width: 500,
          height: 380,
          backgroundColor: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 32,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
        }}
      >
        {/* Silhouette of boring smart speaker puck */}
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            backgroundColor: "#181a20",
            border: "2px solid #282c35",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "inset 0 0 40px rgba(0,0,0,0.9)",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: "#444",
            }}
          />
        </div>

        {/* Huge Red X Mark Overlay */}
        <div
          style={{
            position: "absolute",
            width: 280,
            height: 6,
            backgroundColor: THEME.red,
            transform: "rotate(45deg)",
            borderRadius: 3,
            boxShadow: `0 0 16px ${THEME.red}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 280,
            height: 6,
            backgroundColor: THEME.red,
            transform: "rotate(-45deg)",
            borderRadius: 3,
            boxShadow: `0 0 16px ${THEME.red}`,
          }}
        />

        <div
          style={{
            marginTop: 40,
            fontSize: 24,
            fontWeight: 600,
            color: THEME.textSecondary,
          }}
        >
          Zero Personality • No Visual Feedback
        </div>
      </div>
    </div>
  );
};

// ─── SCENE 2: The Half Life Vision ───
const SceneVision: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, config: { damping: 14 } });
  const pulse = 1 + 0.05 * Math.sin(frame * 0.1);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        transform: `scale(${enter})`,
        opacity: enter,
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "8px 24px",
          borderRadius: 24,
          backgroundColor: "rgba(255, 183, 3, 0.15)",
          border: `1px solid rgba(255, 183, 3, 0.4)`,
          color: THEME.gold,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 2,
          marginBottom: 30,
        }}
      >
        HACK CLUB • HALF LIFE
      </div>

      <h1
        style={{
          fontSize: 66,
          fontWeight: 800,
          lineHeight: 1.15,
          margin: "0 0 40px 0",
          letterSpacing: -1.5,
        }}
      >
        Building Something With <br />
        <span
          style={{
            background: `linear-gradient(90deg, ${THEME.cyan}, #ffffff)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Life and Presence
        </span>
      </h1>

      <div
        style={{
          width: 580,
          padding: "40px",
          backgroundColor: THEME.cardBg,
          border: `1px solid ${THEME.cardBorder}`,
          borderRadius: 32,
          backdropFilter: "blur(20px)",
          boxShadow: `0 20px 60px rgba(0,0,0,0.6)`,
          transform: `scale(${pulse})`,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: THEME.textPrimary,
            lineHeight: 1.4,
            marginBottom: 20,
          }}
        >
          A companion that looks at you, responds with character, and controls
          your entire room.
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <span
            style={{
              padding: "8px 16px",
              borderRadius: 16,
              backgroundColor: "rgba(0, 240, 255, 0.15)",
              color: THEME.cyan,
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            Custom PCB
          </span>
          <span
            style={{
              padding: "8px 16px",
              borderRadius: 16,
              backgroundColor: "rgba(0, 245, 160, 0.15)",
              color: THEME.green,
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            ESP32-S3 Core
          </span>
          <span
            style={{
              padding: "8px 16px",
              borderRadius: 16,
              backgroundColor: "rgba(255, 183, 3, 0.15)",
              color: THEME.gold,
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            Voice & Vision
          </span>
        </div>
      </div>
    </div>
  );
};

// ─── SCENE 3: Introducing Hux ───
const SceneIntroHux: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, config: { damping: 12 } });
  const floatY = 12 * Math.sin(frame * 0.08);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        transform: `scale(${enter})`,
        opacity: enter,
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "8px 24px",
          borderRadius: 24,
          backgroundColor: "rgba(0, 240, 255, 0.15)",
          border: `1px solid rgba(0, 240, 255, 0.4)`,
          color: THEME.cyan,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 2,
          marginBottom: 20,
        }}
      >
        MEET YOUR DESKTOP COMPANION
      </div>

      <h1
        style={{
          fontSize: 88,
          fontWeight: 900,
          margin: "0 0 10px 0",
          letterSpacing: -2,
          color: "#ffffff",
          textShadow: `0 0 40px ${THEME.cyanGlow}`,
        }}
      >
        HUX
      </h1>

      <p
        style={{
          fontSize: 26,
          color: THEME.textSecondary,
          margin: "0 0 35px 0",
          fontWeight: 500,
        }}
      >
        AI Smart Home Assistant • Inspired by Jarvis
      </p>

      {/* 3D PCB Hero Image Floating */}
      <div
        style={{
          width: 540,
          height: 480,
          position: "relative",
          transform: `translateY(${floatY}px)`,
          filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.8))",
        }}
      >
        <Img
          src={staticFile("images/hux_cover_hero.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
};

// ─── SCENE 4: Expressive Face & Arc Halo ───
const SceneFaceAndHalo: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, config: { damping: 14 } });

  // Blinking eyes animation
  const blink = Math.sin(frame * 0.15);
  const eyeHeight = blink > 0.9 ? 4 : 45;

  // Arc reactor rotation
  const rotAngle = frame * 1.5;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        transform: `scale(${enter})`,
        opacity: enter,
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "8px 24px",
          borderRadius: 24,
          backgroundColor: "rgba(0, 240, 255, 0.15)",
          border: `1px solid ${THEME.cyan}`,
          color: THEME.cyan,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 2,
          marginBottom: 20,
        }}
      >
        VISUAL PRESENCE
      </div>

      <h1
        style={{
          fontSize: 60,
          fontWeight: 800,
          lineHeight: 1.15,
          margin: "0 0 40px 0",
          letterSpacing: -1,
        }}
      >
        Expressive Face & <br />
        <span style={{ color: THEME.cyan }}>Arc-Reactor RGB Halo</span>
      </h1>

      {/* Interactive Mockup of Screen & Halo */}
      <div
        style={{
          width: 520,
          height: 520,
          borderRadius: "50%",
          backgroundColor: "rgba(10, 14, 24, 0.85)",
          border: "2px solid rgba(0, 240, 255, 0.3)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 60px ${THEME.cyanGlow}`,
        }}
      >
        {/* Rotating Arc Reactor Ticks */}
        <div
          style={{
            position: "absolute",
            inset: 15,
            borderRadius: "50%",
            border: "2px dashed rgba(0, 240, 255, 0.5)",
            transform: `rotate(${rotAngle}deg)`,
          }}
        />

        {/* 8 Halo LED Nodes */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          const r = 210;
          const x = r * Math.cos(rad);
          const y = r * Math.sin(rad);
          return (
            <div
              key={idx}
              style={{
                position: "absolute",
                transform: `translate(${x}px, ${y}px)`,
                width: 22,
                height: 22,
                borderRadius: "50%",
                backgroundColor: THEME.cyan,
                boxShadow: `0 0 20px ${THEME.cyan}`,
              }}
            />
          );
        })}

        {/* ST7789 Center Screen Box with Animated Robot Eyes */}
        <div
          style={{
            width: 260,
            height: 290,
            backgroundColor: "#000",
            borderRadius: 24,
            border: "3px solid #1a2233",
            boxShadow: "inset 0 0 30px rgba(0, 240, 255, 0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            padding: 20,
          }}
        >
          {/* Eyes Container */}
          <div style={{ display: "flex", gap: 32 }}>
            {/* Left Eye */}
            <div
              style={{
                width: 55,
                height: eyeHeight,
                backgroundColor: THEME.cyan,
                borderRadius: 16,
                boxShadow: `0 0 25px ${THEME.cyan}`,
                transition: "height 0.1s ease",
              }}
            />
            {/* Right Eye */}
            <div
              style={{
                width: 55,
                height: eyeHeight,
                backgroundColor: THEME.cyan,
                borderRadius: 16,
                boxShadow: `0 0 25px ${THEME.cyan}`,
                transition: "height 0.1s ease",
              }}
            />
          </div>

          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: THEME.textSecondary,
              letterSpacing: 2,
              marginTop: 15,
            }}
          >
            ST7789 IPS LCD
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── SCENE 5: Tech Core - ESP32-S3 & Home Assistant ───
const SceneTechCore: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, config: { damping: 14 } });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        transform: `scale(${enter})`,
        opacity: enter,
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "8px 24px",
          borderRadius: 24,
          backgroundColor: "rgba(0, 245, 160, 0.15)",
          border: `1px solid ${THEME.green}`,
          color: THEME.green,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 2,
          marginBottom: 20,
        }}
      >
        HARDWARE STACK
      </div>

      <h1
        style={{
          fontSize: 58,
          fontWeight: 800,
          lineHeight: 1.15,
          margin: "0 0 35px 0",
          letterSpacing: -1,
        }}
      >
        ESP32-S3 Core & <br />
        <span style={{ color: THEME.green }}>Local Home Assistant</span>
      </h1>

      {/* 4 Feature Bento Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          width: 720,
        }}
      >
        <div
          style={{
            padding: 28,
            backgroundColor: THEME.cardBg,
            border: `1px solid ${THEME.cardBorder}`,
            borderRadius: 24,
            textAlign: "left",
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: THEME.cyan,
              marginBottom: 8,
            }}
          >
            ESP32-S3 Brain
          </div>
          <div style={{ fontSize: 20, color: THEME.textSecondary }}>
            Dual Xtensa 240MHz, 16MB Flash, 8MB PSRAM for display & audio DSP.
          </div>
        </div>

        <div
          style={{
            padding: 28,
            backgroundColor: THEME.cardBg,
            border: `1px solid ${THEME.cardBorder}`,
            borderRadius: 24,
            textAlign: "left",
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: THEME.green,
              marginBottom: 8,
            }}
          >
            Home Assistant Native
          </div>
          <div style={{ fontSize: 20, color: THEME.textSecondary }}>
            Local WebSockets & REST APIs over Wi-Fi. Zero cloud lag or fees.
          </div>
        </div>

        <div
          style={{
            padding: 28,
            backgroundColor: THEME.cardBg,
            border: `1px solid ${THEME.cardBorder}`,
            borderRadius: 24,
            textAlign: "left",
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: THEME.gold,
              marginBottom: 8,
            }}
          >
            INMP441 MEMS Mic
          </div>
          <div style={{ fontSize: 20, color: THEME.textSecondary }}>
            Digital I2S acoustic port drilled directly through the PCB copper.
          </div>
        </div>

        <div
          style={{
            padding: 28,
            backgroundColor: THEME.cardBg,
            border: `1px solid ${THEME.cardBorder}`,
            borderRadius: 24,
            textAlign: "left",
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: 8,
            }}
          >
            MAX98357A + 3W Spk
          </div>
          <div style={{ fontSize: 20, color: THEME.textSecondary }}>
            Class-D I2S DAC amplifier driving voice output with crisp highs.
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── SCENE 6: Budget Under $65 ───
const SceneBudget: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, config: { damping: 14 } });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        transform: `scale(${enter})`,
        opacity: enter,
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "8px 24px",
          borderRadius: 24,
          backgroundColor: "rgba(255, 183, 3, 0.15)",
          border: `1px solid ${THEME.gold}`,
          color: THEME.gold,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 2,
          marginBottom: 20,
        }}
      >
        HALF LIFE GRANT CONSTRAINT
      </div>

      <h1
        style={{
          fontSize: 88,
          fontWeight: 900,
          lineHeight: 1,
          margin: "0 0 20px 0",
          color: THEME.gold,
          textShadow: "0 0 50px rgba(255, 183, 3, 0.4)",
        }}
      >
        UNDER $65
      </h1>

      <p
        style={{
          fontSize: 28,
          fontWeight: 600,
          color: THEME.textSecondary,
          maxWidth: 600,
          lineHeight: 1.4,
          margin: "0 0 40px 0",
        }}
      >
        Custom 2-layer PCB fabrication, full JLCPCB SMT components, and delivery
        charges fully covered.
      </p>

      <div
        style={{
          display: "flex",
          gap: 20,
        }}
      >
        <div
          style={{
            padding: "16px 32px",
            backgroundColor: THEME.cardBg,
            border: `1px solid ${THEME.cardBorder}`,
            borderRadius: 20,
            fontSize: 22,
            fontWeight: 700,
            color: "#ffffff",
          }}
        >
          2-Layer FR4 ENIG Board
        </div>
        <div
          style={{
            padding: "16px 32px",
            backgroundColor: THEME.cardBg,
            border: `1px solid ${THEME.cardBorder}`,
            borderRadius: 20,
            fontSize: 22,
            fontWeight: 700,
            color: THEME.green,
          }}
          >
          ✓ Budget Verified
        </div>
      </div>
    </div>
  );
};

// ─── SCENE 7: Outro Handoff (The Basics -> Next Steps) ───
const SceneOutroHandoff: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = spring({ frame, fps: 30, config: { damping: 14 } });
  const pulse = 1 + 0.04 * Math.sin(frame * 0.1);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        transform: `scale(${enter})`,
        opacity: enter,
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "8px 24px",
          borderRadius: 24,
          backgroundColor: "rgba(0, 240, 255, 0.15)",
          border: `1px solid ${THEME.cyan}`,
          color: THEME.cyan,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 2,
          marginBottom: 20,
        }}
      >
        WALKTHROUGH READY
      </div>

      <h1
        style={{
          fontSize: 68,
          fontWeight: 900,
          lineHeight: 1.15,
          margin: "0 0 35px 0",
          letterSpacing: -1.5,
          color: "#ffffff",
        }}
      >
        Now, Let's Dive Into <br />
        <span
          style={{
            background: `linear-gradient(90deg, ${THEME.cyan}, ${THEME.green})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          How It All Comes Together
        </span>
      </h1>

      <div
        style={{
          width: 600,
          padding: "35px 40px",
          backgroundColor: THEME.cardBg,
          border: `1px solid rgba(0, 240, 255, 0.3)`,
          borderRadius: 30,
          backdropFilter: "blur(20px)",
          boxShadow: `0 20px 60px rgba(0,0,0,0.6)`,
          transform: `scale(${pulse})`,
        }}
      >
        <p
          style={{
            fontSize: 26,
            fontWeight: 600,
            color: THEME.textPrimary,
            lineHeight: 1.4,
            margin: "0 0 20px 0",
          }}
        >
          Schematic • PCB Layout • Firmware Architecture • 3D Desk Enclosure
        </p>

        <div
          style={{
            display: "inline-block",
            padding: "10px 28px",
            backgroundColor: THEME.cyan,
            color: "#000",
            fontWeight: 800,
            fontSize: 22,
            borderRadius: 20,
            letterSpacing: 1,
          }}
        >
          LET'S GO →
        </div>
      </div>
    </div>
  );
};
