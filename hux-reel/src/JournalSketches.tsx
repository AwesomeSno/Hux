import React from "react";

// ============================================================================
// SLEEK, MINIMAL GRAPHIC-FIRST MAKER STYLE
// Open canvas, crisp vector graphics, high whitespace, zero corporate cards.
// ============================================================================
const C = {
  bg: "#ffffff",
  ink: "#0f172a",
  inkMuted: "#64748b",
  inkLight: "#94a3b8",
  blue: "#2563eb",
  cyan: "#0284c7",
  green: "#059669",
  red: "#dc2626",
  amber: "#d97706",
  line: "#e2e8f0",
  lineDark: "#cbd5e1",
  mono: "'SF Mono', Monaco, 'JetBrains Mono', Menlo, Consolas, monospace",
  sans: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif",
};

const Canvas: React.FC<{
  number: string;
  title: string;
  children: React.ReactNode;
}> = ({ number, title, children }) => (
  <div
    style={{
      width: 1200,
      height: 800,
      backgroundColor: C.bg,
      padding: "48px 64px",
      boxSizing: "border-box",
      fontFamily: C.sans,
      color: C.ink,
      display: "flex",
      flexDirection: "column",
      position: "relative",
    }}
  >
    {/* Clean, effortless header */}
    <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 36 }}>
      <span style={{ fontFamily: C.mono, fontSize: 18, fontWeight: 700, color: C.blue }}>
        #{number}
      </span>
      <span style={{ fontSize: 26, fontWeight: 700, color: C.ink, letterSpacing: -0.5 }}>
        {title}
      </span>
    </div>

    {/* Graphic area */}
    <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
      {children}
    </div>
  </div>
);

// ============================================================================
// SKETCH 01: Why Normal Smart Speakers Suck (PURE VISUAL FLOW)
// ============================================================================
export const Sketch01: React.FC = () => (
  <Canvas number="01" title="cloud smart speaker vs local hux">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "10px 0" }}>
      {/* Cloud Flow */}
      <div style={{ padding: "16px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, paddingBottom: 8, borderBottom: `1px solid ${C.line}` }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: C.inkLight, letterSpacing: 0.5 }}>TRADITIONAL CLOUD PUCK</span>
          <span style={{ fontFamily: C.mono, fontSize: 13, color: C.red, fontWeight: 700 }}>~1,800ms lag · requires cloud servers · no personality</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px" }}>
          {/* Puck */}
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 84, height: 54, borderRadius: 27, border: `2px solid ${C.inkLight}`, margin: "0 auto", backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: C.red }} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 12 }}>Desk Speaker</div>
            <div style={{ fontSize: 11, color: C.inkLight }}>single blinking dot</div>
          </div>

          <div style={{ flex: 1, textAlign: "center", borderTop: `2px dashed #fca5a5`, margin: "0 32px", position: "relative" }}>
            <span style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", fontSize: 11, fontFamily: C.mono, color: C.red, backgroundColor: "#fff", padding: "0 8px" }}>
              WAN upload
            </span>
          </div>

          {/* Cloud */}
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 96, height: 60, borderRadius: 16, border: `2px solid #f87171`, margin: "0 auto", backgroundColor: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>
              ☁️
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 12, color: C.red }}>Cloud Servers</div>
            <div style={{ fontSize: 11, color: C.inkLight }}>remote latency</div>
          </div>

          <div style={{ flex: 1, textAlign: "center", borderTop: `2px dashed #fca5a5`, margin: "0 32px", position: "relative" }}>
            <span style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", fontSize: 11, fontFamily: C.mono, color: C.red, backgroundColor: "#fff", padding: "0 8px" }}>
              WAN return
            </span>
          </div>

          {/* Light Bulb */}
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", border: `2px solid ${C.inkLight}`, margin: "0 auto", backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
              💡
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 12 }}>Smart Light</div>
            <div style={{ fontSize: 11, color: C.inkLight }}>delayed response</div>
          </div>
        </div>
      </div>

      {/* Hux Flow */}
      <div style={{ padding: "16px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, paddingBottom: 8, borderBottom: `1.5px solid #bfdbfe` }}>
          <span style={{ fontWeight: 800, fontSize: 15, color: C.blue, letterSpacing: 0.5 }}>HUX LOCAL ARCHITECTURE</span>
          <span style={{ fontFamily: C.mono, fontSize: 13, color: C.green, fontWeight: 700 }}>&lt; 15ms instant · 100% private & offline · living companion</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px" }}>
          {/* Hux */}
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 88, height: 68, borderRadius: 14, border: `2.5px solid ${C.blue}`, margin: "0 auto", backgroundColor: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 6px 16px rgba(37,99,235,0.2)" }}>
              <div style={{ width: 9, height: 18, borderRadius: 4, backgroundColor: "#38bdf8" }} />
              <div style={{ width: 9, height: 18, borderRadius: 4, backgroundColor: "#38bdf8" }} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, marginTop: 12, color: C.blue }}>Hux</div>
            <div style={{ fontSize: 11, color: C.inkMuted }}>expressive face & halo</div>
          </div>

          <div style={{ flex: 1, textAlign: "center", borderTop: `2px solid ${C.blue}`, margin: "0 32px", position: "relative" }}>
            <span style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", fontSize: 11, fontFamily: C.mono, color: C.blue, fontWeight: 700, backgroundColor: "#fff", padding: "0 8px" }}>
              Local Wi-Fi WebSocket
            </span>
          </div>

          {/* Local HA Server */}
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 96, height: 60, borderRadius: 16, border: `2px solid ${C.blue}`, margin: "0 auto", backgroundColor: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>
              🏠
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, marginTop: 12, color: C.blue }}>Home Assistant</div>
            <div style={{ fontSize: 11, color: C.inkMuted }}>local server on LAN</div>
          </div>

          <div style={{ flex: 1, textAlign: "center", borderTop: `2px solid ${C.green}`, margin: "0 32px", position: "relative" }}>
            <span style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", fontSize: 11, fontFamily: C.mono, color: C.green, fontWeight: 700, backgroundColor: "#fff", padding: "0 8px" }}>
              Zigbee / Matter
            </span>
          </div>

          {/* Light Bulb */}
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", border: `2px solid ${C.green}`, margin: "0 auto", backgroundColor: "#ecfdf5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
              💡
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, marginTop: 12, color: C.green }}>Instant Light</div>
            <div style={{ fontSize: 11, color: C.inkMuted }}>under 15ms</div>
          </div>
        </div>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 02: Hardware Block Diagram (CLEAN CONNECTED MAP)
// ============================================================================
export const Sketch02: React.FC = () => (
  <Canvas number="02" title="hardware block diagram">
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      {/* SVG connecting bus lines */}
      <svg style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0, pointerEvents: "none" }}>
        {/* Center to Top (Display) */}
        <line x1="536" y1="260" x2="536" y2="105" stroke={C.blue} strokeWidth="2" strokeDasharray="4 4" />
        {/* Center to Top-Right (Halo) */}
        <line x1="680" y1="280" x2="880" y2="120" stroke={C.amber} strokeWidth="2" strokeDasharray="4 4" />
        {/* Center to Left (Mic) */}
        <line x1="376" y1="330" x2="270" y2="330" stroke={C.green} strokeWidth="2" />
        {/* Center to Right (Amp) */}
        <line x1="696" y1="330" x2="800" y2="330" stroke={C.green} strokeWidth="2" />
        {/* Center to Bottom (Power) */}
        <line x1="536" y1="410" x2="536" y2="520" stroke={C.lineDark} strokeWidth="2" />
      </svg>

      {/* Center MCU */}
      <div
        style={{
          width: 320,
          padding: "28px 24px",
          borderRadius: 20,
          border: `2.5px solid ${C.ink}`,
          backgroundColor: "#ffffff",
          textAlign: "center",
          boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
          zIndex: 10,
        }}
      >
        <div style={{ fontFamily: C.mono, fontSize: 12, color: C.blue, fontWeight: 700 }}>MAIN CONTROLLER</div>
        <div style={{ fontSize: 26, fontWeight: 800, marginTop: 4 }}>ESP32-S3</div>
        <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>Dual 240MHz · 16MB Flash · 8MB PSRAM</div>
        <div style={{ fontFamily: C.mono, fontSize: 12, marginTop: 12, color: C.inkLight }}>Wi-Fi 802.11 b/g/n + BLE 5.0</div>
      </div>

      {/* Top: Screen */}
      <div
        style={{
          position: "absolute",
          top: 25,
          padding: "16px 24px",
          borderRadius: 14,
          border: `1.5px solid #93c5fd`,
          backgroundColor: "#eff6ff",
          textAlign: "center",
          zIndex: 5,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 15, color: C.blue }}>1.69" IPS Color Display</div>
        <div style={{ fontFamily: C.mono, fontSize: 12, color: C.inkMuted, marginTop: 2 }}>240×280 px · 40MHz SPI Bus</div>
      </div>

      {/* Top Right: Halo */}
      <div
        style={{
          position: "absolute",
          top: 35,
          right: 30,
          padding: "16px 24px",
          borderRadius: 14,
          border: `1.5px solid #fde68a`,
          backgroundColor: "#fffbeb",
          textAlign: "center",
          zIndex: 5,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 15, color: C.amber }}>8x RGB Halo Ring</div>
        <div style={{ fontFamily: C.mono, fontSize: 12, color: C.inkMuted, marginTop: 2 }}>SK6812 MINI-E · RMT IO48</div>
      </div>

      {/* Left: Mic */}
      <div
        style={{
          position: "absolute",
          left: 30,
          padding: "16px 24px",
          borderRadius: 14,
          border: `1.5px solid #a7f3d0`,
          backgroundColor: "#ecfdf5",
          textAlign: "center",
          zIndex: 5,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 15, color: C.green }}>INMP441 MEMS Mic</div>
        <div style={{ fontFamily: C.mono, fontSize: 12, color: C.inkMuted, marginTop: 2 }}>24-bit Digital Audio · I2S0 RX</div>
      </div>

      {/* Right: Speaker */}
      <div
        style={{
          position: "absolute",
          right: 30,
          padding: "16px 24px",
          borderRadius: 14,
          border: `1.5px solid #a7f3d0`,
          backgroundColor: "#ecfdf5",
          textAlign: "center",
          zIndex: 5,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 15, color: C.green }}>MAX98357A + 3W Spkr</div>
        <div style={{ fontFamily: C.mono, fontSize: 12, color: C.inkMuted, marginTop: 2 }}>Class-D DAC Amp · I2S1 TX</div>
      </div>

      {/* Bottom: USB-C Power */}
      <div
        style={{
          position: "absolute",
          bottom: 25,
          padding: "16px 24px",
          borderRadius: 14,
          border: `1.5px solid ${C.lineDark}`,
          backgroundColor: "#f8fafc",
          textAlign: "center",
          zIndex: 5,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 15 }}>USB-C (5V) + 3.3V LDO</div>
        <div style={{ fontFamily: C.mono, fontSize: 12, color: C.inkMuted, marginTop: 2 }}>TLV75533 Regulator · USBLC6-2 ESD Clamp</div>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 03: ESP32-S3 Pinout Mapping
// ============================================================================
export const Sketch03: React.FC = () => (
  <Canvas number="03" title="esp32-s3 pin allocation">
    <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "center" }}>
      {/* Display */}
      <div style={{ padding: 24, borderRadius: 16, border: `1.5px solid #bfdbfe`, backgroundColor: "#f8fafc" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.blue, marginBottom: 12 }}>Display Bus (SPI)</div>
        <div style={{ fontFamily: C.mono, fontSize: 13, display: "flex", flexDirection: "column", gap: 6 }}>
          <div><strong style={{ color: C.blue }}>IO10</strong> — MOSI</div>
          <div><strong style={{ color: C.blue }}>IO12</strong> — SCK (40MHz)</div>
          <div><strong style={{ color: C.blue }}>IO11</strong> — CS</div>
          <div><strong style={{ color: C.blue }}>IO9</strong>  — DC</div>
          <div><strong style={{ color: C.blue }}>IO4</strong>  — RST</div>
          <div><strong style={{ color: C.blue }}>IO5</strong>  — Backlight</div>
        </div>
      </div>

      {/* Audio Buses */}
      <div style={{ padding: 24, borderRadius: 16, border: `1.5px solid #a7f3d0`, backgroundColor: "#f8fafc" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.green, marginBottom: 12 }}>Digital Audio (I2S)</div>
        <div style={{ fontFamily: C.mono, fontSize: 13, display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontSize: 11, color: C.inkLight, fontWeight: 700 }}>MIC IN (I2S0):</div>
          <div><strong style={{ color: C.green }}>IO41</strong> — BCLK</div>
          <div><strong style={{ color: C.green }}>IO42</strong> — WS (16kHz)</div>
          <div><strong style={{ color: C.green }}>IO2</strong>  — DIN</div>
          <div style={{ fontSize: 11, color: C.inkLight, fontWeight: 700, marginTop: 6 }}>SPKR OUT (I2S1):</div>
          <div><strong style={{ color: C.green }}>IO15</strong> — BCLK</div>
          <div><strong style={{ color: C.green }}>IO16</strong> — LRC (44.1kHz)</div>
          <div><strong style={{ color: C.green }}>IO7</strong>  — DOUT</div>
        </div>
      </div>

      {/* Halo & Control */}
      <div style={{ padding: 24, borderRadius: 16, border: `1.5px solid #fde68a`, backgroundColor: "#f8fafc" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.amber, marginBottom: 12 }}>Halo & Telemetry</div>
        <div style={{ fontFamily: C.mono, fontSize: 13, display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontSize: 11, color: C.inkLight, fontWeight: 700 }}>AURA HALO:</div>
          <div><strong style={{ color: C.amber }}>IO48</strong> — RGB Data (RMT)</div>
          <div style={{ fontSize: 11, color: C.inkLight, fontWeight: 700, marginTop: 6 }}>I2C EXPANSION:</div>
          <div><strong>IO8</strong>  — SDA</div>
          <div><strong>IO18</strong> — SCL</div>
          <div style={{ fontSize: 11, color: C.inkLight, fontWeight: 700, marginTop: 6 }}>NATIVE USB:</div>
          <div><strong>IO19</strong> — USB D-</div>
          <div><strong>IO20</strong> — USB D+</div>
        </div>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 04: Face Animation States (CLEAN CUTE FACES)
// ============================================================================
export const Sketch04: React.FC = () => (
  <Canvas number="04" title="face animation states">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 20 }}>
        {/* Idle */}
        <div style={{ textAlign: "center" }}>
          <div style={{ height: 210, backgroundColor: "#0f172a", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}>
            <div style={{ width: 32, height: 56, backgroundColor: "#38bdf8", borderRadius: 16 }} />
            <div style={{ width: 32, height: 56, backgroundColor: "#38bdf8", borderRadius: 16 }} />
          </div>
          <div style={{ fontWeight: 700, fontSize: 15, marginTop: 14 }}>idle</div>
          <div style={{ fontSize: 12, color: C.inkMuted, marginTop: 2 }}>gentle floating blink</div>
        </div>

        {/* Listening */}
        <div style={{ textAlign: "center" }}>
          <div style={{ height: 210, backgroundColor: "#0f172a", borderRadius: 16, border: "2px solid #0284c7", display: "flex", alignItems: "center", justifyContent: "center", gap: 16, boxShadow: "0 8px 20px rgba(2,132,199,0.2)" }}>
            <div style={{ width: 36, height: 68, backgroundColor: "#38bdf8", borderRadius: 18 }} />
            <div style={{ width: 36, height: 68, backgroundColor: "#38bdf8", borderRadius: 18 }} />
          </div>
          <div style={{ fontWeight: 700, fontSize: 15, color: C.blue, marginTop: 14 }}>listening</div>
          <div style={{ fontSize: 12, color: C.inkMuted, marginTop: 2 }}>wide eyes (+15%)</div>
        </div>

        {/* Thinking */}
        <div style={{ textAlign: "center" }}>
          <div style={{ height: 210, backgroundColor: "#0f172a", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}>
            <div style={{ width: 34, height: 38, backgroundColor: "#38bdf8", borderRadius: 12, transform: "translate(4px, -10px)" }} />
            <div style={{ width: 34, height: 38, backgroundColor: "#38bdf8", borderRadius: 12, transform: "translate(4px, -10px)" }} />
          </div>
          <div style={{ fontWeight: 700, fontSize: 15, color: C.amber, marginTop: 14 }}>thinking</div>
          <div style={{ fontSize: 12, color: C.inkMuted, marginTop: 2 }}>looking up & squint</div>
        </div>

        {/* Speaking */}
        <div style={{ textAlign: "center" }}>
          <div style={{ height: 210, backgroundColor: "#0f172a", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}>
            <div style={{ width: 32, height: 46, backgroundColor: "#38bdf8", borderRadius: 16 }} />
            <div style={{ width: 32, height: 46, backgroundColor: "#38bdf8", borderRadius: 16 }} />
          </div>
          <div style={{ fontWeight: 700, fontSize: 15, marginTop: 14 }}>speaking</div>
          <div style={{ fontSize: 12, color: C.inkMuted, marginTop: 2 }}>bounces with voice RMS</div>
        </div>

        {/* Happy */}
        <div style={{ textAlign: "center" }}>
          <div style={{ height: 210, backgroundColor: "#0f172a", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}>
            <div style={{ width: 34, height: 18, borderTop: "6px solid #38bdf8", borderRadius: "18px 18px 0 0" }} />
            <div style={{ width: 34, height: 18, borderTop: "6px solid #38bdf8", borderRadius: "18px 18px 0 0" }} />
          </div>
          <div style={{ fontWeight: 700, fontSize: 15, color: C.green, marginTop: 14 }}>happy / done</div>
          <div style={{ fontSize: 12, color: C.inkMuted, marginTop: 2 }}>command executed</div>
        </div>
      </div>

      <div style={{ textAlign: "center", fontFamily: C.mono, fontSize: 13, color: C.inkMuted }}>
        Procedural vector eyes running at 60fps on ESP32-S3 (under 4KB flash)
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 05: Arc-Reactor Halo Ring
// ============================================================================
export const Sketch05: React.FC = () => (
  <Canvas number="05" title="arc-reactor halo ring">
    <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
      {/* Front Face Silhouette */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            width: 270,
            height: 270,
            borderRadius: "50%",
            border: `2px dashed ${C.blue}`,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f8fafc",
          }}
        >
          {/* Centered screen */}
          <div
            style={{
              width: 110,
              height: 130,
              backgroundColor: "#0f172a",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <div style={{ width: 14, height: 28, backgroundColor: "#38bdf8", borderRadius: 7 }} />
            <div style={{ width: 14, height: 28, backgroundColor: "#38bdf8", borderRadius: 7 }} />
          </div>

          {/* 8 LED dots */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
            const rad = (angle * Math.PI) / 180;
            const x = Math.round(122 + 122 * Math.cos(rad));
            const y = Math.round(122 + 122 * Math.sin(rad));
            return (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  backgroundColor: C.blue,
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontFamily: C.mono,
                  fontWeight: 800,
                  boxShadow: "0 2px 8px rgba(37,99,235,0.4)",
                }}
              >
                {idx}
              </div>
            );
          })}
        </div>

        <div style={{ fontFamily: C.mono, fontSize: 12, color: C.inkMuted, marginTop: 16 }}>
          8x SK6812 MINI-E NeoPixels around display bezel
        </div>
      </div>

      {/* Halo Behaviors */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ padding: "18px 24px", borderRadius: 14, border: `1.5px solid #bfdbfe`, backgroundColor: "#eff6ff" }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: C.blue }}>Wake-up Beam</div>
          <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
            Cyan pulse sweeps around the circle when "Hey Hux" is recognized.
          </div>
        </div>

        <div style={{ padding: "18px 24px", borderRadius: 14, border: `1.5px solid #fde68a`, backgroundColor: "#fffbeb" }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: C.amber }}>Processing Breath</div>
          <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
            All 8 LEDs smoothly breathe while Home Assistant processes commands.
          </div>
        </div>

        <div style={{ padding: "18px 24px", borderRadius: 14, border: `1.5px solid #a7f3d0`, backgroundColor: "#ecfdf5" }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: C.green }}>Radial Volume Bar</div>
          <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
            Lights up in an arc to show volume level and sensor metrics.
          </div>
        </div>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 06: Digital I2S Audio Pipeline
// ============================================================================
export const Sketch06: React.FC = () => (
  <Canvas number="06" title="digital audio pipeline">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
      {/* Audio Chain */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 30px" }}>
        {/* Mic */}
        <div style={{ padding: "26px 32px", borderRadius: 16, border: `2px solid #a7f3d0`, backgroundColor: "#ecfdf5", textAlign: "center" }}>
          <div style={{ fontSize: 26 }}>🎙️</div>
          <div style={{ fontWeight: 700, fontSize: 16, marginTop: 8, color: C.green }}>INMP441 Mic</div>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.inkMuted, marginTop: 2 }}>24-bit delta-sigma ADC</div>
        </div>

        <div style={{ flex: 1, textAlign: "center", borderTop: `2px solid ${C.green}`, margin: "0 24px", position: "relative" }}>
          <span style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", fontSize: 12, fontFamily: C.mono, color: C.green, fontWeight: 700, backgroundColor: "#fff", padding: "0 8px" }}>
            I2S0 RX (PCM)
          </span>
        </div>

        {/* ESP32-S3 */}
        <div style={{ padding: "28px 36px", borderRadius: 18, border: `2px solid ${C.ink}`, backgroundColor: "#fff", textAlign: "center", boxShadow: "0 6px 16px rgba(0,0,0,0.04)" }}>
          <div style={{ fontWeight: 800, fontSize: 19 }}>ESP32-S3</div>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.blue, marginTop: 4 }}>Dual DMA Channels</div>
        </div>

        <div style={{ flex: 1, textAlign: "center", borderTop: `2px solid ${C.blue}`, margin: "0 24px", position: "relative" }}>
          <span style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", fontSize: 12, fontFamily: C.mono, color: C.blue, fontWeight: 700, backgroundColor: "#fff", padding: "0 8px" }}>
            I2S1 TX (44.1kHz)
          </span>
        </div>

        {/* Amp & Speaker */}
        <div style={{ padding: "26px 32px", borderRadius: 16, border: `2px solid #bfdbfe`, backgroundColor: "#eff6ff", textAlign: "center" }}>
          <div style={{ fontSize: 26 }}>🔊</div>
          <div style={{ fontWeight: 700, fontSize: 16, marginTop: 8, color: C.blue }}>MAX98357A + 3W</div>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.inkMuted, marginTop: 2 }}>Class-D Amp & Speaker</div>
        </div>
      </div>

      <div style={{ padding: "20px 28px", borderRadius: 14, backgroundColor: "#f8fafc", border: `1px solid ${C.line}`, display: "flex", justifyContent: "space-between", fontFamily: C.mono, fontSize: 13 }}>
        <span>WHY 100% DIGITAL?</span>
        <span style={{ color: C.inkMuted }}>Analog mics on ESP32 boards pick up loud 2.4GHz Wi-Fi frame buzz. Pure I2S digital audio eliminates all RF interference.</span>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 07: Home Assistant Local Connection
// ============================================================================
export const Sketch07: React.FC = () => (
  <Canvas number="07" title="local home assistant integration">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
      {/* Network Flow */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 88, height: 68, borderRadius: 14, border: `2px solid ${C.blue}`, margin: "0 auto", backgroundColor: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <div style={{ width: 8, height: 16, borderRadius: 4, backgroundColor: "#38bdf8" }} />
            <div style={{ width: 8, height: 16, borderRadius: 4, backgroundColor: "#38bdf8" }} />
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, marginTop: 10, color: C.blue }}>Hux</div>
          <div style={{ fontSize: 11, color: C.inkMuted }}>desktop companion</div>
        </div>

        <div style={{ flex: 1, textAlign: "center", borderTop: `2px solid ${C.blue}`, margin: "0 32px", position: "relative" }}>
          <span style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", fontSize: 11, fontFamily: C.mono, color: C.blue, fontWeight: 700, backgroundColor: "#fff", padding: "0 8px" }}>
            ws://homeassistant.local:8123
          </span>
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ width: 96, height: 64, borderRadius: 16, border: `2px solid ${C.blue}`, margin: "0 auto", backgroundColor: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>
            🏠
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, marginTop: 10, color: C.blue }}>Home Assistant</div>
          <div style={{ fontSize: 11, color: C.inkMuted }}>local server on LAN</div>
        </div>

        <div style={{ flex: 1, textAlign: "center", borderTop: `2px solid ${C.green}`, margin: "0 32px", position: "relative" }}>
          <span style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", fontSize: 11, fontFamily: C.mono, color: C.green, fontWeight: 700, backgroundColor: "#fff", padding: "0 8px" }}>
            Zigbee / Matter Mesh
          </span>
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ width: 68, height: 68, borderRadius: "50%", border: `2px solid ${C.green}`, margin: "0 auto", backgroundColor: "#ecfdf5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>
            💡
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, marginTop: 10, color: C.green }}>Smart Devices</div>
          <div style={{ fontSize: 11, color: C.inkMuted }}>lights, plugs, scenes</div>
        </div>
      </div>

      {/* 3 Key Takeaways */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        <div style={{ padding: 18, borderRadius: 12, border: `1px solid #bfdbfe`, backgroundColor: "#eff6ff" }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: C.blue }}>1. Zero Cloud Hops</div>
          <div style={{ fontSize: 12, color: C.inkMuted, marginTop: 2 }}>Packets stay entirely within local Wi-Fi. Works even when the internet is down.</div>
        </div>

        <div style={{ padding: 18, borderRadius: 12, border: `1px solid #bfdbfe`, backgroundColor: "#eff6ff" }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: C.blue }}>2. Local Assist Voice</div>
          <div style={{ fontSize: 12, color: C.inkMuted, marginTop: 2 }}>Binary 16kHz audio stream directly parsed by local Whisper STT on your server.</div>
        </div>

        <div style={{ padding: 18, borderRadius: 12, border: `1px solid #a7f3d0`, backgroundColor: "#ecfdf5" }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: C.green }}>3. Sub-15ms Speed</div>
          <div style={{ fontSize: 12, color: C.inkMuted, marginTop: 2 }}>Instant switch execution without the 2-second cloud roundtrip lag.</div>
        </div>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 08: USB-C Power & Protection
// ============================================================================
export const Sketch08: React.FC = () => (
  <Canvas number="08" title="usb-c power & protection">
    <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
      {/* Circuit Overview */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ padding: 20, borderRadius: 14, border: `1.5px solid ${C.line}`, backgroundColor: "#fafafa" }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>USB-C Receptacle</div>
          <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
            Dual 5.1kΩ pull-downs on CC1/CC2 negotiate standard 5V power from any USB-C port.
          </div>
        </div>

        <div style={{ padding: 20, borderRadius: 14, border: `1.5px solid #bfdbfe`, backgroundColor: "#eff6ff" }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: C.blue }}>USBLC6-2SC6 ESD Diode</div>
          <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
            Protects USB data lines from ±15kV static discharge when plugging in cables on a desk.
          </div>
        </div>

        <div style={{ padding: 20, borderRadius: 14, border: `1.5px solid #a7f3d0`, backgroundColor: "#ecfdf5" }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: C.green }}>TLV75533 3.3V LDO</div>
          <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
            500mA low-dropout regulator supplies clean, quiet 3.3V power to the ESP32-S3 and screen.
          </div>
        </div>
      </div>

      {/* Power Budget */}
      <div style={{ padding: 28, borderRadius: 16, border: `1.5px solid ${C.line}`, backgroundColor: "#fafafa" }}>
        <div style={{ fontFamily: C.mono, fontSize: 13, fontWeight: 700, marginBottom: 16, color: C.inkMuted }}>
          CURRENT CONSUMPTION
        </div>

        <div style={{ fontFamily: C.mono, fontSize: 13, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>ESP32-S3 (Wi-Fi burst):</span>
            <strong>~240 mA</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>ST7789 Backlight:</span>
            <strong>~45 mA</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>8x NeoPixel Ring:</span>
            <strong>~120 mA</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>3W Speaker Amp (Peak):</span>
            <strong>~500 mA</strong>
          </div>
          <div style={{ borderTop: `1.5px dashed ${C.lineDark}`, paddingTop: 12, marginTop: 4, display: "flex", justifyContent: "space-between", color: C.blue }}>
            <span>Total Peak:</span>
            <strong>~900 mA @ 5V (4.5W)</strong>
          </div>
        </div>

        <div style={{ fontSize: 12, color: C.inkLight, marginTop: 14, fontFamily: C.mono }}>
          Runs comfortably from any 5V USB port or wall charger.
        </div>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 09: Board Shape & Sizing
// ============================================================================
export const Sketch09: React.FC = () => (
  <Canvas number="09" title="board shape & desk sizing">
    <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
      {/* 72x72 Board Graphic */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            width: 260,
            height: 260,
            borderRadius: 20,
            border: `2px solid ${C.ink}`,
            backgroundColor: "#f8fafc",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Centered screen */}
          <div
            style={{
              width: 110,
              height: 126,
              backgroundColor: "#0f172a",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: C.mono,
              fontSize: 11,
              fontWeight: 700,
              color: "#38bdf8",
              textAlign: "center",
            }}
          >
            1.69" IPS<br />SCREEN
          </div>

          {/* USB-C */}
          <div
            style={{
              position: "absolute",
              bottom: -6,
              width: 52,
              height: 14,
              backgroundColor: "#ffffff",
              border: `1.5px solid ${C.ink}`,
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: C.mono,
              fontSize: 9,
              fontWeight: 700,
            }}
          >
            USB-C
          </div>

          {/* 4 Corner M3 Holes */}
          <div style={{ position: "absolute", top: 14, left: 14, width: 14, height: 14, borderRadius: "50%", border: `1.5px solid ${C.ink}`, backgroundColor: "#fff" }} />
          <div style={{ position: "absolute", top: 14, right: 14, width: 14, height: 14, borderRadius: "50%", border: `1.5px solid ${C.ink}`, backgroundColor: "#fff" }} />
          <div style={{ position: "absolute", bottom: 14, left: 14, width: 14, height: 14, borderRadius: "50%", border: `1.5px solid ${C.ink}`, backgroundColor: "#fff" }} />
          <div style={{ position: "absolute", bottom: 14, right: 14, width: 14, height: 14, borderRadius: "50%", border: `1.5px solid ${C.ink}`, backgroundColor: "#fff" }} />
        </div>

        <div style={{ fontFamily: C.mono, fontSize: 13, color: C.inkMuted, marginTop: 16 }}>
          72.0mm × 72.0mm square footprint
        </div>
      </div>

      {/* Details */}
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ padding: "18px 24px", borderRadius: 14, border: `1.5px solid ${C.line}`, backgroundColor: "#fafafa" }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Centered Screen</div>
          <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
            Positioned right in your line of sight on the desk.
          </div>
        </div>

        <div style={{ padding: "18px 24px", borderRadius: 14, border: `1.5px solid ${C.line}`, backgroundColor: "#fafafa" }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Rear USB-C Port</div>
          <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
            Centered on the bottom edge so the power cable exits cleanly out the back.
          </div>
        </div>

        <div style={{ padding: "18px 24px", borderRadius: 14, border: `1.5px solid #bfdbfe`, backgroundColor: "#eff6ff" }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: C.blue }}>15° Angled Desk Stand</div>
          <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
            Designed for an angled 3D-printed desktop base with rubber feet.
          </div>
        </div>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 10: Parts Planning & Next Steps
// ============================================================================
export const Sketch10: React.FC = () => (
  <Canvas number="10" title="parts planning & next steps">
    <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48 }}>
      {/* Planned Parts */}
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: C.inkMuted }}>HARDWARE PIECES</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ padding: "14px 18px", borderRadius: 12, border: `1.5px solid ${C.line}`, backgroundColor: "#fafafa" }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>ESP32-S3-WROOM-1</div>
            <div style={{ fontSize: 12, color: C.inkMuted }}>16MB Flash, 8MB PSRAM, Wi-Fi & BLE</div>
          </div>

          <div style={{ padding: "14px 18px", borderRadius: 12, border: `1.5px solid ${C.line}`, backgroundColor: "#fafafa" }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>1.69" IPS LCD + 8x RGB Halo</div>
            <div style={{ fontSize: 12, color: C.inkMuted }}>ST7789 screen with circular NeoPixel ring</div>
          </div>

          <div style={{ padding: "14px 18px", borderRadius: 12, border: `1.5px solid ${C.line}`, backgroundColor: "#fafafa" }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Digital Audio Setup</div>
            <div style={{ fontSize: 12, color: C.inkMuted }}>INMP441 MEMS mic + MAX98357A amp + 3W speaker</div>
          </div>

          <div style={{ padding: "14px 18px", borderRadius: 12, border: `1.5px solid ${C.line}`, backgroundColor: "#fafafa" }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>USB-C Power & Protection</div>
            <div style={{ fontSize: 12, color: C.inkMuted }}>TLV75533 3.3V LDO + USBLC6-2 TVS diode</div>
          </div>
        </div>
      </div>

      {/* Next Actions */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: C.inkMuted }}>NEXT SPRINT</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ padding: "14px 18px", borderRadius: 12, border: `1.5px solid #bfdbfe`, backgroundColor: "#eff6ff", fontWeight: 600, fontSize: 13, color: C.blue }}>
              1. KiCad schematic capture
            </div>
            <div style={{ padding: "14px 18px", borderRadius: 12, border: `1.5px solid #bfdbfe`, backgroundColor: "#eff6ff", fontWeight: 600, fontSize: 13, color: C.blue }}>
              2. 2-layer PCB routing & DRC
            </div>
            <div style={{ padding: "14px 18px", borderRadius: 12, border: `1.5px solid #bfdbfe`, backgroundColor: "#eff6ff", fontWeight: 600, fontSize: 13, color: C.blue }}>
              3. Vector eye animation firmware
            </div>
            <div style={{ padding: "14px 18px", borderRadius: 12, border: `1.5px solid #bfdbfe`, backgroundColor: "#eff6ff", fontWeight: 600, fontSize: 13, color: C.blue }}>
              4. 3D enclosure CAD modeling
            </div>
          </div>
        </div>

        <div style={{ padding: 16, borderRadius: 12, backgroundColor: "#ecfdf5", border: `1.5px solid #a7f3d0`, textAlign: "center", fontFamily: C.mono, fontSize: 13, color: C.green, fontWeight: 700 }}>
          ✔ Initial 10 hours of planning complete
        </div>
      </div>
    </div>
  </Canvas>
);
