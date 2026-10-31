import React from "react";

// ============================================================================
// DRAFTING DESIGN SYSTEM: Clean Engineering Lab / Technical Blueprint Sheet
// (Warm off-white drafting paper, crisp slate ink, technical blue accents,
//  clean monospace annotations, zero AI neon/glow slop).
// ============================================================================
const THEME = {
  bg: "#f8fafc",           // Crisp technical drafting paper
  grid: "#e2e8f0",         // Subtle 24px drafting grid
  border: "#cbd5e1",       // Technical sheet boundary
  borderDark: "#94a3b8",   // Stronger outline
  ink: "#0f172a",          // Deep technical ink (primary text & lines)
  inkMuted: "#475569",     // Secondary annotations
  inkFaint: "#64748b",     // Minor dimensions / labels
  panelBg: "#ffffff",      // White block fill
  panelSubtle: "#f1f5f9",  // Muted component fill
  blue: "#2563eb",         // Signal / bus blue
  blueLight: "#eff6ff",    // Active highlight
  blueBorder: "#93c5fd",   // Bus boundary
  green: "#16a34a",        // Ground / OK / Verified
  greenLight: "#f0fdf4",
  greenBorder: "#86efac",
  amber: "#d97706",        // Power rail / alert
  amberLight: "#fffbeb",
  amberBorder: "#fde68a",
  red: "#dc2626",          // Critical / dropped
  redLight: "#fef2f2",
  mono: "'SF Mono', Menlo, Monaco, 'JetBrains Mono', Consolas, monospace",
  sans: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif",
};

// ============================================================================
// SHARED ENGINEERING CONTAINER & TITLE BLOCK
// ============================================================================
const Sheet: React.FC<{
  dwgNo: string;
  rev?: string;
  sheetNo: string;
  title: string;
  subtitle: string;
  status?: string;
  children: React.ReactNode;
}> = ({ dwgNo, rev = "A.0", sheetNo, title, subtitle, status = "PRE-LAYOUT DRAFT", children }) => (
  <div
    style={{
      width: 1200,
      height: 800,
      backgroundColor: THEME.bg,
      position: "relative",
      padding: "24px 28px",
      boxSizing: "border-box",
      fontFamily: THEME.sans,
      color: THEME.ink,
      display: "flex",
      flexDirection: "column",
      backgroundImage: `radial-gradient(${THEME.grid} 1.2px, transparent 1.2px)`,
      backgroundSize: "24px 24px",
      overflow: "hidden",
    }}
  >
    {/* Outer Engineering Border */}
    <div
      style={{
        position: "absolute",
        top: 14,
        left: 14,
        right: 14,
        bottom: 14,
        border: `1.5px solid ${THEME.border}`,
        pointerEvents: "none",
        boxSizing: "border-box",
      }}
    />

    {/* Technical Header Block */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        borderBottom: `2px solid ${THEME.ink}`,
        paddingBottom: 12,
        marginBottom: 20,
        position: "relative",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: THEME.mono,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 2,
            color: THEME.blue,
            marginBottom: 4,
            textTransform: "uppercase",
          }}
        >
          PROJECT HUX // DESKTOP AI COMPANION // SPRINT 01
        </div>
        <div style={{ fontSize: 24, fontWeight: 800, color: THEME.ink, letterSpacing: -0.5 }}>
          {title}
        </div>
        <div style={{ fontSize: 13, color: THEME.inkMuted, marginTop: 2 }}>{subtitle}</div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 16,
          fontFamily: THEME.mono,
          fontSize: 11,
          textAlign: "right",
          color: THEME.inkMuted,
        }}
      >
        <div style={{ borderLeft: `1px solid ${THEME.border}`, paddingLeft: 12 }}>
          <div style={{ color: THEME.inkFaint, fontSize: 9 }}>STATUS</div>
          <div style={{ fontWeight: 700, color: THEME.ink }}>{status}</div>
        </div>
        <div style={{ borderLeft: `1px solid ${THEME.border}`, paddingLeft: 12 }}>
          <div style={{ color: THEME.inkFaint, fontSize: 9 }}>REV</div>
          <div style={{ fontWeight: 700, color: THEME.ink }}>{rev}</div>
        </div>
        <div style={{ borderLeft: `1px solid ${THEME.border}`, paddingLeft: 12 }}>
          <div style={{ color: THEME.inkFaint, fontSize: 9 }}>DRAWING NO.</div>
          <div style={{ fontWeight: 700, color: THEME.blue }}>{dwgNo}</div>
        </div>
        <div style={{ borderLeft: `1px solid ${THEME.border}`, paddingLeft: 12 }}>
          <div style={{ color: THEME.inkFaint, fontSize: 9 }}>SHEET</div>
          <div style={{ fontWeight: 700, color: THEME.ink }}>{sheetNo} OF 10</div>
        </div>
      </div>
    </div>

    {/* Content Canvas */}
    <div style={{ flex: 1, position: "relative", display: "flex", flexDirection: "column" }}>
      {children}
    </div>

    {/* Engineering Footer Bar */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: `1px solid ${THEME.border}`,
        paddingTop: 8,
        marginTop: 12,
        fontFamily: THEME.mono,
        fontSize: 10,
        color: THEME.inkFaint,
      }}
    >
      <div>DESIGNED BY: HARINANDAN J V // HACK CLUB HALF LIFE</div>
      <div>MCU: ESP32-S3-WROOM-1-N16R8 // LOCAL HOME ASSISTANT ARCHITECTURE</div>
      <div>DIMENSIONS IN MM UNLESS NOTED // SCALE: 1:1 / NTS</div>
    </div>
  </div>
);

// ============================================================================
// SKETCH 01: System Topology & Latency Comparison
// ============================================================================
export const Sketch01: React.FC = () => (
  <Sheet
    dwgNo="HUX-SK-01"
    sheetNo="01"
    title="System Topology & Latency Breakdown"
    subtitle="Network architecture: Conventional Cloud Smart Speaker vs. Hux Local-First Companion"
  >
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, flex: 1 }}>
      {/* Cloud Architecture */}
      <div
        style={{
          border: `1.5px solid ${THEME.border}`,
          borderRadius: 8,
          backgroundColor: THEME.panelBg,
          padding: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: THEME.ink }}>
            Standard Cloud Speaker Architecture
          </span>
          <span
            style={{
              fontFamily: THEME.mono,
              fontSize: 11,
              backgroundColor: THEME.redLight,
              color: THEME.red,
              padding: "2px 8px",
              borderRadius: 4,
              border: `1px solid #fecaca`,
            }}
          >
            HIGH LATENCY // CLOUD DEPENDENT
          </span>
        </div>

        {/* Pipeline visual */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            fontFamily: THEME.mono,
            fontSize: 12,
            marginBottom: 16,
          }}
        >
          <div style={{ padding: "10px 14px", backgroundColor: THEME.panelSubtle, borderRadius: 6, border: `1px solid ${THEME.border}` }}>
            <div style={{ fontWeight: 700 }}>1. Acoustic Voice Capture</div>
            <div style={{ color: THEME.inkMuted, fontSize: 11 }}>Passive puck on desk, single blinking LED</div>
          </div>
          <div style={{ textAlign: "center", color: THEME.inkFaint }}>↓ Wi-Fi Uplink (WAN)</div>
          <div style={{ padding: "10px 14px", backgroundColor: "#fff1f2", borderRadius: 6, border: `1px solid #fecdd3` }}>
            <div style={{ fontWeight: 700, color: THEME.red }}>2. Proprietary Cloud Servers</div>
            <div style={{ color: THEME.inkMuted, fontSize: 11 }}>Remote Whisper STT → LLM intent → Skill Router</div>
          </div>
          <div style={{ textAlign: "center", color: THEME.inkFaint }}>↓ Cloud-to-Cloud API Roundtrip</div>
          <div style={{ padding: "10px 14px", backgroundColor: THEME.panelSubtle, borderRadius: 6, border: `1px solid ${THEME.border}` }}>
            <div style={{ fontWeight: 700 }}>3. Smart Device Execution</div>
            <div style={{ color: THEME.inkMuted, fontSize: 11 }}>Cloud bounces toggle packet back to local home</div>
          </div>
        </div>

        <div style={{ marginTop: "auto", borderTop: `1px dashed ${THEME.border}`, paddingTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: THEME.mono, fontSize: 12 }}>
            <span style={{ color: THEME.inkMuted }}>Roundtrip Latency:</span>
            <span style={{ fontWeight: 700, color: THEME.red }}>950ms – 2,100ms</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: THEME.mono, fontSize: 12, marginTop: 4 }}>
            <span style={{ color: THEME.inkMuted }}>Offline Behavior:</span>
            <span style={{ color: THEME.red }}>Complete failure (brick)</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: THEME.mono, fontSize: 12, marginTop: 4 }}>
            <span style={{ color: THEME.inkMuted }}>Desk Feedback:</span>
            <span style={{ color: THEME.inkMuted }}>Opaque status dot</span>
          </div>
        </div>
      </div>

      {/* Hux Local Architecture */}
      <div
        style={{
          border: `1.5px solid ${THEME.blueBorder}`,
          borderRadius: 8,
          backgroundColor: THEME.blueLight,
          padding: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: THEME.blue }}>
            Hux Local-First Architecture
          </span>
          <span
            style={{
              fontFamily: THEME.mono,
              fontSize: 11,
              backgroundColor: THEME.greenLight,
              color: THEME.green,
              padding: "2px 8px",
              borderRadius: 4,
              border: `1px solid ${THEME.greenBorder}`,
            }}
          >
            SUB-20MS // 100% PRIVATE
          </span>
        </div>

        {/* Pipeline visual */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            fontFamily: THEME.mono,
            fontSize: 12,
            marginBottom: 16,
          }}
        >
          <div style={{ padding: "10px 14px", backgroundColor: "#ffffff", borderRadius: 6, border: `1px solid ${THEME.blueBorder}` }}>
            <div style={{ fontWeight: 700, color: THEME.blue }}>1. Hux Desktop Companion</div>
            <div style={{ color: THEME.inkMuted, fontSize: 11 }}>INMP441 I2S mic + animated eyes + halo feedback</div>
          </div>
          <div style={{ textAlign: "center", color: THEME.blue, fontWeight: 700 }}>↓ Local Wi-Fi WebSocket (LAN Only)</div>
          <div style={{ padding: "10px 14px", backgroundColor: "#ffffff", borderRadius: 6, border: `1px solid ${THEME.blueBorder}` }}>
            <div style={{ fontWeight: 700, color: THEME.blue }}>2. Local Home Assistant Server</div>
            <div style={{ color: THEME.inkMuted, fontSize: 11 }}>On-premise Assist pipeline (Whisper STT / Piper TTS)</div>
          </div>
          <div style={{ textAlign: "center", color: THEME.blue, fontWeight: 700 }}>↓ Direct Local Mesh (Zigbee/Matter/LAN)</div>
          <div style={{ padding: "10px 14px", backgroundColor: "#ffffff", borderRadius: 6, border: `1px solid ${THEME.blueBorder}` }}>
            <div style={{ fontWeight: 700, color: THEME.blue }}>3. Immediate Device Control</div>
            <div style={{ color: THEME.inkMuted, fontSize: 11 }}>Zero packets cross the public internet</div>
          </div>
        </div>

        <div style={{ marginTop: "auto", borderTop: `1px dashed ${THEME.blueBorder}`, paddingTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: THEME.mono, fontSize: 12 }}>
            <span style={{ color: THEME.inkMuted }}>Roundtrip Latency:</span>
            <span style={{ fontWeight: 700, color: THEME.green }}>&lt; 15ms command toggle</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: THEME.mono, fontSize: 12, marginTop: 4 }}>
            <span style={{ color: THEME.inkMuted }}>Offline Behavior:</span>
            <span style={{ color: THEME.green }}>100% functional without WAN</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: THEME.mono, fontSize: 12, marginTop: 4 }}>
            <span style={{ color: THEME.inkMuted }}>Desk Feedback:</span>
            <span style={{ color: THEME.blue }}>Emotive vector face + RGB halo</span>
          </div>
        </div>
      </div>
    </div>
  </Sheet>
);

// ============================================================================
// SKETCH 02: Hardware Functional Block Diagram
// ============================================================================
export const Sketch02: React.FC = () => (
  <Sheet
    dwgNo="HUX-SK-02"
    sheetNo="02"
    title="Hardware Functional Block Diagram"
    subtitle="Subsystem interconnection, peripheral buses, and power domains"
  >
    <div
      style={{
        flex: 1,
        border: `1.5px solid ${THEME.border}`,
        borderRadius: 8,
        backgroundColor: THEME.panelBg,
        padding: 20,
        display: "grid",
        gridTemplateColumns: "260px 1fr 260px",
        gap: 20,
        alignItems: "center",
      }}
    >
      {/* Left Peripherals */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Display */}
        <div style={{ border: `1px solid ${THEME.blueBorder}`, backgroundColor: THEME.blueLight, padding: 12, borderRadius: 6 }}>
          <div style={{ fontFamily: THEME.mono, fontSize: 10, color: THEME.blue, fontWeight: 700 }}>VISUAL HUD</div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>ST7789 1.69" IPS LCD</div>
          <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.inkMuted, marginTop: 4 }}>
            240×280 px // 60fps DMA<br />
            Bus: SPI Master @ 40MHz
          </div>
        </div>

        {/* Halo */}
        <div style={{ border: `1px solid ${THEME.amberBorder}`, backgroundColor: THEME.amberLight, padding: 12, borderRadius: 6 }}>
          <div style={{ fontFamily: THEME.mono, fontSize: 10, color: THEME.amber, fontWeight: 700 }}>OPTICAL AURA</div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>8x SK6812 MINI-E</div>
          <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.inkMuted, marginTop: 4 }}>
            Circular RGB Bezel Halo<br />
            Bus: Hardware RMT (IO48)
          </div>
        </div>

        {/* Sensors / Expansion */}
        <div style={{ border: `1px solid ${THEME.border}`, backgroundColor: THEME.panelSubtle, padding: 12, borderRadius: 6 }}>
          <div style={{ fontFamily: THEME.mono, fontSize: 10, color: THEME.inkFaint, fontWeight: 700 }}>TELEMETRY EXPANSION</div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>I2C Sensor Header</div>
          <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.inkMuted, marginTop: 4 }}>
            SDA (IO8) // SCL (IO18)<br />
            Onboard 4.7kΩ pull-ups
          </div>
        </div>
      </div>

      {/* Center MCU Core */}
      <div
        style={{
          border: `2px solid ${THEME.ink}`,
          borderRadius: 8,
          backgroundColor: "#ffffff",
          padding: 20,
          boxShadow: "0 4px 12px rgba(15, 23, 42, 0.05)",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ borderBottom: `1.5px solid ${THEME.ink}`, paddingBottom: 8, textAlign: "center" }}>
          <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.blue, fontWeight: 700 }}>MAIN PROCESSOR CORE</div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>ESP32-S3-WROOM-1</div>
          <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.inkMuted }}>
            Xtensa Dual-Core LX7 @ 240MHz // 512KB SRAM
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontFamily: THEME.mono, fontSize: 11 }}>
          <div style={{ padding: 8, backgroundColor: THEME.panelSubtle, borderRadius: 4 }}>
            <span style={{ color: THEME.inkFaint }}>MEMORY:</span><br />
            <strong>16MB Quad Flash</strong><br />
            <strong>8MB Octal PSRAM</strong>
          </div>
          <div style={{ padding: 8, backgroundColor: THEME.panelSubtle, borderRadius: 4 }}>
            <span style={{ color: THEME.inkFaint }}>WIRELESS:</span><br />
            <strong>802.11 b/g/n Wi-Fi</strong><br />
            <strong>Bluetooth 5.0 LE</strong>
          </div>
        </div>

        <div style={{ fontFamily: THEME.mono, fontSize: 11, backgroundColor: THEME.blueLight, padding: 8, borderRadius: 4, border: `1px solid ${THEME.blueBorder}` }}>
          <div style={{ color: THEME.blue, fontWeight: 700 }}>INTERNAL DMA ALLOCATION:</div>
          <div>• Channel 0: ST7789 SPI Display buffer (40MHz)</div>
          <div>• Channel 1: I2S0 RX (INMP441 MEMS microphone)</div>
          <div>• Channel 2: I2S1 TX (MAX98357A audio playback)</div>
        </div>
      </div>

      {/* Right Audio & Power */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Mic */}
        <div style={{ border: `1px solid ${THEME.greenBorder}`, backgroundColor: THEME.greenLight, padding: 12, borderRadius: 6 }}>
          <div style={{ fontFamily: THEME.mono, fontSize: 10, color: THEME.green, fontWeight: 700 }}>AUDIO INGESTION</div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>INMP441 MEMS Mic</div>
          <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.inkMuted, marginTop: 4 }}>
            24-bit 16kHz PCM<br />
            Bus: I2S0 RX (IO41/42/2)
          </div>
        </div>

        {/* Amp & Speaker */}
        <div style={{ border: `1px solid ${THEME.greenBorder}`, backgroundColor: THEME.greenLight, padding: 12, borderRadius: 6 }}>
          <div style={{ fontFamily: THEME.mono, fontSize: 10, color: THEME.green, fontWeight: 700 }}>AUDIO SYNTHESIS</div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>MAX98357A + 3W Spkr</div>
          <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.inkMuted, marginTop: 4 }}>
            Class-D DAC Amp (3.2W)<br />
            Bus: I2S1 TX (IO15/16/7)
          </div>
        </div>

        {/* Power Tree */}
        <div style={{ border: `1px solid ${THEME.border}`, backgroundColor: THEME.panelSubtle, padding: 12, borderRadius: 6 }}>
          <div style={{ fontFamily: THEME.mono, fontSize: 10, color: THEME.inkFaint, fontWeight: 700 }}>POWER TREE & ESD</div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>USB-C + TI TLV75533</div>
          <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.inkMuted, marginTop: 4 }}>
            5V VBUS → 3.3V 500mA LDO<br />
            USBLC6-2SC6 TVS clamp
          </div>
        </div>
      </div>
    </div>
  </Sheet>
);

// ============================================================================
// SKETCH 03: ESP32-S3 Pinout & Bus Budget
// ============================================================================
export const Sketch03: React.FC = () => (
  <Sheet
    dwgNo="HUX-SK-03"
    sheetNo="03"
    title="ESP32-S3 Pin Allocation & Peripheral Mapping"
    subtitle="GPIO multiplexing table, bus speeds, and DMA channel routing"
  >
    <div style={{ flex: 1, border: `1.5px solid ${THEME.border}`, borderRadius: 8, backgroundColor: THEME.panelBg, padding: 16, display: "flex", flexDirection: "column" }}>
      <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.blue, fontWeight: 700, marginBottom: 10 }}>
        GPIO ALLOCATION MATRIX // 16 PINS USED // ZERO BUS CONTENTION
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: THEME.mono, fontSize: 11 }}>
        <thead>
          <tr style={{ backgroundColor: THEME.panelSubtle, borderBottom: `2px solid ${THEME.border}` }}>
            <th style={{ textAlign: "left", padding: "8px 10px" }}>FUNCTIONAL DOMAIN</th>
            <th style={{ textAlign: "left", padding: "8px 10px" }}>GPIO PIN</th>
            <th style={{ textAlign: "left", padding: "8px 10px" }}>SIGNAL NAME</th>
            <th style={{ textAlign: "left", padding: "8px 10px" }}>BUS / TYPE</th>
            <th style={{ textAlign: "left", padding: "8px 10px" }}>SPEED / CLOCK</th>
            <th style={{ textAlign: "left", padding: "8px 10px" }}>HARDWARE PERIPHERAL</th>
          </tr>
        </thead>
        <tbody>
          {/* Display */}
          <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
            <td style={{ padding: "6px 10px", fontWeight: 700, color: THEME.blue }}>Display (ST7789)</td>
            <td style={{ padding: "6px 10px" }}>IO10, 12, 11</td>
            <td style={{ padding: "6px 10px" }}>MOSI, SCK, CS</td>
            <td style={{ padding: "6px 10px" }}>SPI Master</td>
            <td style={{ padding: "6px 10px" }}>40.0 MHz</td>
            <td style={{ padding: "6px 10px" }}>FSPI / DMA Ch 0</td>
          </tr>
          <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
            <td style={{ padding: "6px 10px", fontWeight: 700, color: THEME.blue }}>Display Control</td>
            <td style={{ padding: "6px 10px" }}>IO9, 4, 5</td>
            <td style={{ padding: "6px 10px" }}>DC, RST, BLK</td>
            <td style={{ padding: "6px 10px" }}>GPIO Out / PWM</td>
            <td style={{ padding: "6px 10px" }}>1.0 kHz PWM</td>
            <td style={{ padding: "6px 10px" }}>LEDC Backlight control</td>
          </tr>
          {/* Audio In */}
          <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
            <td style={{ padding: "6px 10px", fontWeight: 700, color: THEME.green }}>Mic In (INMP441)</td>
            <td style={{ padding: "6px 10px" }}>IO41, 42, 2</td>
            <td style={{ padding: "6px 10px" }}>BCLK, WS, DIN</td>
            <td style={{ padding: "6px 10px" }}>I2S RX (24-bit)</td>
            <td style={{ padding: "6px 10px" }}>16.0 kHz (1.024MHz)</td>
            <td style={{ padding: "6px 10px" }}>I2S0 / DMA Ch 1</td>
          </tr>
          {/* Audio Out */}
          <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
            <td style={{ padding: "6px 10px", fontWeight: 700, color: THEME.green }}>Audio Out (MAX98357)</td>
            <td style={{ padding: "6px 10px" }}>IO15, 16, 7</td>
            <td style={{ padding: "6px 10px" }}>BCLK, LRC, DOUT</td>
            <td style={{ padding: "6px 10px" }}>I2S TX (16-bit)</td>
            <td style={{ padding: "6px 10px" }}>44.1 kHz (2.822MHz)</td>
            <td style={{ padding: "6px 10px" }}>I2S1 / DMA Ch 2</td>
          </tr>
          {/* Aura */}
          <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
            <td style={{ padding: "6px 10px", fontWeight: 700, color: THEME.amber }}>RGB Halo Ring</td>
            <td style={{ padding: "6px 10px" }}>IO48</td>
            <td style={{ padding: "6px 10px" }}>RGB_DATA</td>
            <td style={{ padding: "6px 10px" }}>Single-Wire NRZ</td>
            <td style={{ padding: "6px 10px" }}>800.0 kHz</td>
            <td style={{ padding: "6px 10px" }}>RMT Peripheral Ch 0</td>
          </tr>
          {/* Sensor I2C */}
          <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
            <td style={{ padding: "6px 10px", fontWeight: 700 }}>Telemetry I2C</td>
            <td style={{ padding: "6px 10px" }}>IO8, 18</td>
            <td style={{ padding: "6px 10px" }}>SDA, SCL</td>
            <td style={{ padding: "6px 10px" }}>I2C Master</td>
            <td style={{ padding: "6px 10px" }}>400.0 kHz (Fast)</td>
            <td style={{ padding: "6px 10px" }}>I2C0 Peripheral</td>
          </tr>
          {/* Native USB */}
          <tr>
            <td style={{ padding: "6px 10px", fontWeight: 700 }}>Native Telemetry</td>
            <td style={{ padding: "6px 10px" }}>IO19, 20</td>
            <td style={{ padding: "6px 10px" }}>USB_D-, USB_D+</td>
            <td style={{ padding: "6px 10px" }}>USB 2.0 FS OTG</td>
            <td style={{ padding: "6px 10px" }}>12.0 Mbps</td>
            <td style={{ padding: "6px 10px" }}>USB-Serial-JTAG / Flash</td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: "auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, paddingTop: 10 }}>
        <div style={{ padding: 10, backgroundColor: THEME.panelSubtle, borderRadius: 6, border: `1px solid ${THEME.border}`, fontFamily: THEME.mono, fontSize: 11 }}>
          <strong style={{ color: THEME.blue }}>BUS SEPARATION ADVANTAGE:</strong>
          <div style={{ color: THEME.inkMuted, marginTop: 4 }}>
            Dual hardware I2S controllers ensure the microphone stream (I2S0) and speaker stream (I2S1) use independent sample clocks, eliminating buffer underflows during full-duplex conversations.
          </div>
        </div>
        <div style={{ padding: 10, backgroundColor: THEME.panelSubtle, borderRadius: 6, border: `1px solid ${THEME.border}`, fontFamily: THEME.mono, fontSize: 11 }}>
          <strong style={{ color: THEME.green }}>REMAINING EXPANSION CAPACITY:</strong>
          <div style={{ color: THEME.inkMuted, marginTop: 4 }}>
            29 GPIO lines remain completely uncommitted for future sensor integration (TOF distance sensor, capacitive touch buttons, or hardware mute switch).
          </div>
        </div>
      </div>
    </div>
  </Sheet>
);

// ============================================================================
// SKETCH 04: Vector Eye Animation State Machine
// ============================================================================
export const Sketch04: React.FC = () => (
  <Sheet
    dwgNo="HUX-SK-04"
    sheetNo="04"
    title="Vector Eye Animation State Machine"
    subtitle="Procedural Bézier rendering, transition conditions, and eye geometry"
  >
    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20, flex: 1 }}>
      {/* State Machine Nodes */}
      <div
        style={{
          border: `1.5px solid ${THEME.border}`,
          borderRadius: 8,
          backgroundColor: THEME.panelBg,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.blue, fontWeight: 700 }}>
          FINITE STATE MACHINE (FSM) TRANSITIONS
        </div>

        {/* State nodes */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div style={{ border: `1.5px solid ${THEME.blueBorder}`, backgroundColor: THEME.blueLight, padding: 10, borderRadius: 6 }}>
            <div style={{ fontFamily: THEME.mono, fontSize: 12, fontWeight: 700, color: THEME.blue }}>STATE: IDLE</div>
            <div style={{ fontSize: 11, color: THEME.inkMuted, marginTop: 2 }}>
              • Natural blink every 3.5s – 6.0s<br />
              • Smooth 2.5s floating rhythm<br />
              • Pupil radius: 14px default
            </div>
          </div>

          <div style={{ border: `1.5px solid ${THEME.greenBorder}`, backgroundColor: THEME.greenLight, padding: 10, borderRadius: 6 }}>
            <div style={{ fontFamily: THEME.mono, fontSize: 12, fontWeight: 700, color: THEME.green }}>STATE: LISTENING</div>
            <div style={{ fontSize: 11, color: THEME.inkMuted, marginTop: 2 }}>
              • Trigger: "Hey Hux" / Wake word<br />
              • Eye height scales +15%<br />
              • Halo pulses bright cyan beam
            </div>
          </div>

          <div style={{ border: `1.5px solid ${THEME.amberBorder}`, backgroundColor: THEME.amberLight, padding: 10, borderRadius: 6 }}>
            <div style={{ fontFamily: THEME.mono, fontSize: 12, fontWeight: 700, color: THEME.amber }}>STATE: THINKING</div>
            <div style={{ fontSize: 11, color: THEME.inkMuted, marginTop: 2 }}>
              • Gaze shifts to upper-right<br />
              • Vertical squint (-20% height)<br />
              • Halo in breathing pattern
            </div>
          </div>

          <div style={{ border: `1.5px solid ${THEME.borderDark}`, backgroundColor: THEME.panelSubtle, padding: 10, borderRadius: 6 }}>
            <div style={{ fontFamily: THEME.mono, fontSize: 12, fontWeight: 700 }}>STATE: SPEAKING</div>
            <div style={{ fontSize: 11, color: THEME.inkMuted, marginTop: 2 }}>
              • Height modulated by Audio RMS<br />
              • Silky procedural lip-sync<br />
              • Interpolated at 60fps
            </div>
          </div>
        </div>

        {/* Transition Logic Box */}
        <div style={{ marginTop: "auto", padding: 10, backgroundColor: THEME.panelSubtle, borderRadius: 6, border: `1px solid ${THEME.border}`, fontFamily: THEME.mono, fontSize: 11 }}>
          <div style={{ fontWeight: 700 }}>PROCEDURAL ADVANTAGE OVER PRE-RENDERED GIFS:</div>
          <div style={{ color: THEME.inkMuted, marginTop: 2 }}>
            Drawing eyes as parametric vectors with cubic Bézier curves uses under 4KB of flash memory, whereas pre-rendered video frames would consume megabytes and suffer choppy frame transitions.
          </div>
        </div>
      </div>

      {/* Geometric Eye Illustration */}
      <div
        style={{
          border: `1.5px solid ${THEME.border}`,
          borderRadius: 8,
          backgroundColor: THEME.panelBg,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.inkFaint, width: "100%" }}>
          EYE VECTOR GEOMETRY SPECIFICATION
        </div>

        {/* Technical Eye Graphic */}
        <div
          style={{
            width: 220,
            height: 140,
            backgroundColor: "#0f172a",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            boxShadow: "inset 0 2px 6px rgba(0,0,0,0.4)",
            position: "relative",
          }}
        >
          {/* Left Eye */}
          <div
            style={{
              width: 44,
              height: 68,
              backgroundColor: "#38bdf8",
              borderRadius: 22,
              border: "2px solid #bae6fd",
            }}
          />
          {/* Right Eye */}
          <div
            style={{
              width: 44,
              height: 68,
              backgroundColor: "#38bdf8",
              borderRadius: 22,
              border: "2px solid #bae6fd",
            }}
          />
        </div>

        {/* Dimensions table */}
        <div style={{ width: "100%", fontFamily: THEME.mono, fontSize: 11 }}>
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${THEME.border}`, padding: "4px 0" }}>
            <span style={{ color: THEME.inkMuted }}>Capsule Width (w):</span>
            <strong>44.0 px</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${THEME.border}`, padding: "4px 0" }}>
            <span style={{ color: THEME.inkMuted }}>Capsule Height (h):</span>
            <strong>68.0 px</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${THEME.border}`, padding: "4px 0" }}>
            <span style={{ color: THEME.inkMuted }}>Corner Radius (r):</span>
            <strong>22.0 px</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
            <span style={{ color: THEME.inkMuted }}>Inter-pupil Distance (d):</span>
            <strong>24.0 px</strong>
          </div>
        </div>
      </div>
    </div>
  </Sheet>
);

// ============================================================================
// SKETCH 05: Arc-Reactor Halo Optical Ring Layout
// ============================================================================
export const Sketch05: React.FC = () => (
  <Sheet
    dwgNo="HUX-SK-05"
    sheetNo="05"
    title="Arc-Reactor Halo Optical Geometry & Daisy Chain"
    subtitle="Polar LED array placement around display bezel and optical diffusion"
  >
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, flex: 1 }}>
      {/* Polar Placement Drawing */}
      <div
        style={{
          border: `1.5px solid ${THEME.border}`,
          borderRadius: 8,
          backgroundColor: THEME.panelBg,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.blue, fontWeight: 700, width: "100%" }}>
          CIRCULAR POLAR COORDINATES (RADIUS R = 24.50 MM)
        </div>

        {/* Circular Ring Graphic */}
        <div
          style={{
            width: 240,
            height: 240,
            borderRadius: "50%",
            border: `1.5px dashed ${THEME.blue}`,
            position: "relative",
            margin: "24px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Display cutout placeholder */}
          <div
            style={{
              width: 100,
              height: 120,
              border: `1.5px solid ${THEME.ink}`,
              backgroundColor: THEME.panelSubtle,
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: THEME.mono,
              fontSize: 10,
              textAlign: "center",
              color: THEME.inkMuted,
            }}
          >
            ST7789<br />1.69" LCD<br />240×280
          </div>

          {/* 8 LED nodes on circle */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
            const rad = (angle * Math.PI) / 180;
            const x = Math.round(108 + 108 * Math.cos(rad));
            const y = Math.round(108 + 108 * Math.sin(rad));
            return (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: THEME.blue,
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontFamily: THEME.mono,
                  fontWeight: 700,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                }}
              >
                {idx}
              </div>
            );
          })}
        </div>

        <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.inkMuted, textAlign: "center" }}>
          Polar spacing: Δθ = 45.0° equidistant // Center: (36.0, 34.0) mm
        </div>
      </div>

      {/* Optical & Daisy Chain Details */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ border: `1.5px solid ${THEME.border}`, borderRadius: 8, backgroundColor: THEME.panelBg, padding: 16 }}>
          <div style={{ fontFamily: THEME.mono, fontSize: 11, fontWeight: 700, color: THEME.ink, marginBottom: 8 }}>
            DAISY-CHAIN BUS SIGNAL FLOW
          </div>
          <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.inkMuted, lineHeight: 1.6 }}>
            ESP32-S3 (IO48 / RMT) → LED 0 (DIN → DOUT)<br />
            → LED 1 → LED 2 → LED 3 → LED 4<br />
            → LED 5 → LED 6 → LED 7 (End of chain)<br />
            Clock rate: 800 kHz single-wire NRZ timing
          </div>
        </div>

        <div style={{ border: `1.5px solid ${THEME.border}`, borderRadius: 8, backgroundColor: THEME.panelBg, padding: 16, flex: 1 }}>
          <div style={{ fontFamily: THEME.mono, fontSize: 11, fontWeight: 700, color: THEME.ink, marginBottom: 8 }}>
            OPTICAL DIFFUSION SPECIFICATION
          </div>
          <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.inkMuted, lineHeight: 1.6 }}>
            • <strong>LED Package</strong>: SK6812 MINI-E (3.2mm × 2.8mm footprint).<br />
            • <strong>Diffuser Ring</strong>: 3D-printed in translucent white PETG (100% infill) or frosted optical acrylic.<br />
            • <strong>Air Gap</strong>: 2.2mm standoff height between LED dies and front diffuser eliminates pinpoint hotspots, blending emitters into a uniform halo.
          </div>
        </div>
      </div>
    </div>
  </Sheet>
);

// ============================================================================
// SKETCH 06: Digital I2S Audio Pipeline
// ============================================================================
export const Sketch06: React.FC = () => (
  <Sheet
    dwgNo="HUX-SK-06"
    sheetNo="06"
    title="Digital I2S Audio Architecture & RF Noise Immunity"
    subtitle="Eliminating 2.4GHz Wi-Fi frame buzz through 100% digital I2S signal routing"
  >
    <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 16, flex: 1 }}>
      {/* Top: The Rejected Analog Failure Mode */}
      <div
        style={{
          border: `1.5px solid #fecaca`,
          borderRadius: 8,
          backgroundColor: THEME.redLight,
          padding: 14,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 700, fontSize: 13, color: THEME.red }}>
            FAILED CONVENTIONAL DESIGN: Analog Microphone Circuits
          </span>
          <span style={{ fontFamily: THEME.mono, fontSize: 10, color: THEME.red, fontWeight: 700 }}>
            REJECTED: RF NOISE SUSCEPTIBLE
          </span>
        </div>
        <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.inkMuted, lineHeight: 1.5 }}>
          Traditional electret microphones output microvolt-level analog signals across copper traces. When the onboard ESP32-S3 Wi-Fi power amplifier pulses at +20dBm during 2.4GHz packet bursts, electromagnetic radiation couples directly into high-impedance analog lines—inducing a loud 217Hz buzzing noise into the recorded voice stream.
        </div>
        <div style={{ fontFamily: THEME.mono, fontSize: 10, color: THEME.red, fontWeight: 700 }}>
          RESULT: Unacceptable audio hum, corrupted speech recognition, and ruined UX.
        </div>
      </div>

      {/* Bottom: Hux Pure Digital I2S Solution */}
      <div
        style={{
          border: `1.5px solid ${THEME.greenBorder}`,
          borderRadius: 8,
          backgroundColor: THEME.greenLight,
          padding: 14,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 700, fontSize: 13, color: THEME.green }}>
            HUX SOLUTION: Pure Digital I2S Audio Pipeline
          </span>
          <span style={{ fontFamily: THEME.mono, fontSize: 10, color: THEME.green, fontWeight: 700 }}>
            VERIFIED: ZERO ANALOG RF COUPLING
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, fontFamily: THEME.mono, fontSize: 11 }}>
          <div style={{ backgroundColor: "#ffffff", padding: 10, borderRadius: 6, border: `1px solid ${THEME.greenBorder}` }}>
            <strong style={{ color: THEME.green }}>1. DIGITAL CAPTURE (INMP441)</strong>
            <div style={{ color: THEME.inkMuted, marginTop: 4 }}>
              Bottom-port MEMS with on-die 24-bit delta-sigma ADC. Digitizes audio immediately inside the chip package. Digital bits transmitted over I2S0 RX are immune to Wi-Fi electromagnetic spikes.
            </div>
          </div>
          <div style={{ backgroundColor: "#ffffff", padding: 10, borderRadius: 6, border: `1px solid ${THEME.greenBorder}` }}>
            <strong style={{ color: THEME.green }}>2. DIGITAL SYNTHESIS (MAX98357A)</strong>
            <div style={{ color: THEME.inkMuted, marginTop: 4 }}>
              Integrated DAC + Class-D amplifier receives 16-bit PCM over I2S1 TX. Powers 3W 4Ω micro-speaker with 92% efficiency directly from 5V VBUS rail with zero audible hiss.
            </div>
          </div>
        </div>

        <div style={{ fontFamily: THEME.mono, fontSize: 10, color: THEME.green, fontWeight: 700 }}>
          RESULT: Crystal-clear wake word capture and punchy, crisp speech playback on desktop.
        </div>
      </div>
    </div>
  </Sheet>
);

// ============================================================================
// SKETCH 07: Home Assistant Local WebSocket Protocol
// ============================================================================
export const Sketch07: React.FC = () => (
  <Sheet
    dwgNo="HUX-SK-07"
    sheetNo="07"
    title="Home Assistant Local WebSocket Protocol"
    subtitle="Direct local LAN communication sequence and sub-15ms event execution"
  >
    <div style={{ flex: 1, border: `1.5px solid ${THEME.border}`, borderRadius: 8, backgroundColor: THEME.panelBg, padding: 16, display: "flex", flexDirection: "column" }}>
      <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.blue, fontWeight: 700, marginBottom: 12 }}>
        PROTOCOL SEQUENCE FLOW: HUX (CLIENT) ↔ HOME ASSISTANT SERVER (LAN)
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, fontFamily: THEME.mono, fontSize: 11 }}>
        {/* Step 1 */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ backgroundColor: THEME.blue, color: "#fff", padding: "2px 8px", borderRadius: 4, fontWeight: 700 }}>01</span>
          <div style={{ flex: 1, backgroundColor: THEME.panelSubtle, padding: "8px 12px", borderRadius: 4, border: `1px solid ${THEME.border}` }}>
            <strong>TCP / WebSocket Handshake:</strong> <span style={{ color: THEME.inkMuted }}>Connects to ws://homeassistant.local:8123/api/websocket</span>
          </div>
        </div>

        {/* Step 2 */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ backgroundColor: THEME.blue, color: "#fff", padding: "2px 8px", borderRadius: 4, fontWeight: 700 }}>02</span>
          <div style={{ flex: 1, backgroundColor: THEME.panelSubtle, padding: "8px 12px", borderRadius: 4, border: `1px solid ${THEME.border}` }}>
            <strong>Authentication Exchange:</strong> <span style={{ color: THEME.inkMuted }}>Sends Long-Lived Access Token in JSON frame → Server replies {`"type": "auth_ok"`}</span>
          </div>
        </div>

        {/* Step 3 */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ backgroundColor: THEME.blue, color: "#fff", padding: "2px 8px", borderRadius: 4, fontWeight: 700 }}>03</span>
          <div style={{ flex: 1, backgroundColor: THEME.panelSubtle, padding: "8px 12px", borderRadius: 4, border: `1px solid ${THEME.border}` }}>
            <strong>State Bus Subscription:</strong> <span style={{ color: THEME.inkMuted }}>Subscribes to state_changed events to display real-time sensor updates on face HUD</span>
          </div>
        </div>

        {/* Step 4 */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ backgroundColor: THEME.green, color: "#fff", padding: "2px 8px", borderRadius: 4, fontWeight: 700 }}>04</span>
          <div style={{ flex: 1, backgroundColor: THEME.greenLight, padding: "8px 12px", borderRadius: 4, border: `1px solid ${THEME.greenBorder}` }}>
            <strong>Voice Assist Binary Stream:</strong> <span style={{ color: THEME.green, fontWeight: 700 }}>Raw 16kHz PCM audio streams over binary frames directly to local Whisper STT engine</span>
          </div>
        </div>

        {/* Step 5 */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ backgroundColor: THEME.green, color: "#fff", padding: "2px 8px", borderRadius: 4, fontWeight: 700 }}>05</span>
          <div style={{ flex: 1, backgroundColor: THEME.greenLight, padding: "8px 12px", borderRadius: 4, border: `1px solid ${THEME.greenBorder}` }}>
            <strong>Instant Action Execution:</strong> <span style={{ color: THEME.green, fontWeight: 700 }}>Service call executed over local Zigbee/Matter in &lt;15ms; Piper TTS audio returns to Hux</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "auto", borderTop: `1px solid ${THEME.border}`, paddingTop: 10, display: "flex", justifyContent: "space-between", fontFamily: THEME.mono, fontSize: 10, color: THEME.inkMuted }}>
        <span>ZERO EXTERNAL CLOUD DEPENDENCY</span>
        <span>NO TELEMETRY SENT OUTSIDE LAN</span>
        <span>LATENCY JITTER: ±2.4 MS</span>
      </div>
    </div>
  </Sheet>
);

// ============================================================================
// SKETCH 08: USB-C Power Delivery & ESD Protection
// ============================================================================
export const Sketch08: React.FC = () => (
  <Sheet
    dwgNo="HUX-SK-08"
    sheetNo="08"
    title="Power Delivery, LDO Regulation & ESD Clamping"
    subtitle="USB Type-C sink negotiation, transient suppression, and power tree distribution"
  >
    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 20, flex: 1 }}>
      {/* Schematic Block */}
      <div style={{ border: `1.5px solid ${THEME.border}`, borderRadius: 8, backgroundColor: THEME.panelBg, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.blue, fontWeight: 700 }}>
          POWER DISTRIBUTION SCHEMATIC
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, fontFamily: THEME.mono, fontSize: 11 }}>
          {/* USB-C */}
          <div style={{ padding: 10, backgroundColor: THEME.panelSubtle, borderRadius: 6, border: `1px solid ${THEME.border}` }}>
            <strong>1. USB-C 16-PIN RECEPTACLE:</strong>
            <div style={{ color: THEME.inkMuted, marginTop: 2 }}>
              • CC1 & CC2: Dual independent 5.1kΩ ±1% pull-downs to GND.<br />
              • Enables standard 5V sink negotiation from all USB-C PD supplies.
            </div>
          </div>

          {/* ESD Protection */}
          <div style={{ padding: 10, backgroundColor: THEME.panelSubtle, borderRadius: 6, border: `1px solid ${THEME.border}` }}>
            <strong>2. USBLC6-2SC6 TVS CLAMP ARRAY:</strong>
            <div style={{ color: THEME.inkMuted, marginTop: 2 }}>
              • SOT-23-6 package clamped across VBUS, D+, D-, GND.<br />
              • Rated for ±15kV air discharge static protection during cable insertion.
            </div>
          </div>

          {/* 3.3V LDO */}
          <div style={{ padding: 10, backgroundColor: THEME.panelSubtle, borderRadius: 6, border: `1px solid ${THEME.border}` }}>
            <strong>3. TI TLV75533 3.3V LOW-DROPOUT REGULATOR:</strong>
            <div style={{ color: THEME.inkMuted, marginTop: 2 }}>
              • 500mA output rating with ultra-low 130mV dropout voltage.<br />
              • 10µF ceramic input + 10µF ceramic output + 100nF high-frequency decoupling.
            </div>
          </div>
        </div>
      </div>

      {/* Current Budget Table */}
      <div style={{ border: `1.5px solid ${THEME.border}`, borderRadius: 8, backgroundColor: THEME.panelBg, padding: 16, display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.inkFaint, fontWeight: 700, marginBottom: 10 }}>
          WORST-CASE CURRENT CONSUMPTION BUDGET
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: THEME.mono, fontSize: 11 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
              <th style={{ textAlign: "left", padding: "6px 0" }}>RAIL / SUBSYSTEM</th>
              <th style={{ textAlign: "right", padding: "6px 0" }}>TYPICAL</th>
              <th style={{ textAlign: "right", padding: "6px 0" }}>PEAK</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
              <td style={{ padding: "6px 0" }}>ESP32-S3 (Wi-Fi TX)</td>
              <td style={{ textAlign: "right" }}>95 mA</td>
              <td style={{ textAlign: "right", fontWeight: 700 }}>240 mA</td>
            </tr>
            <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
              <td style={{ padding: "6px 0" }}>ST7789 Backlight</td>
              <td style={{ textAlign: "right" }}>35 mA</td>
              <td style={{ textAlign: "right", fontWeight: 700 }}>45 mA</td>
            </tr>
            <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
              <td style={{ padding: "6px 0" }}>8x SK6812 NeoPixels</td>
              <td style={{ textAlign: "right" }}>40 mA</td>
              <td style={{ textAlign: "right", fontWeight: 700 }}>120 mA</td>
            </tr>
            <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
              <td style={{ padding: "6px 0" }}>INMP441 MEMS Mic</td>
              <td style={{ textAlign: "right" }}>1.4 mA</td>
              <td style={{ textAlign: "right", fontWeight: 700 }}>2.0 mA</td>
            </tr>
            <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
              <td style={{ padding: "6px 0" }}>MAX98357A (from 5V)</td>
              <td style={{ textAlign: "right" }}>120 mA</td>
              <td style={{ textAlign: "right", fontWeight: 700 }}>500 mA</td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: "auto", borderTop: `2px solid ${THEME.ink}`, paddingTop: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: THEME.mono, fontSize: 12 }}>
            <span>TOTAL PEAK POWER:</span>
            <span style={{ fontWeight: 800, color: THEME.blue }}>~907 mA @ 5V (4.5W)</span>
          </div>
          <div style={{ fontSize: 11, color: THEME.inkMuted, marginTop: 4 }}>
            Well within standard 1.5A / 5V USB-C capabilities.
          </div>
        </div>
      </div>
    </div>
  </Sheet>
);

// ============================================================================
// SKETCH 09: PCB Mechanical Floorplan & Ergonomics
// ============================================================================
export const Sketch09: React.FC = () => (
  <Sheet
    dwgNo="HUX-SK-09"
    sheetNo="09"
    title="PCB Mechanical Envelope & Enclosure Floorplan"
    subtitle="72.0mm × 72.0mm board dimensions, mounting hole locations, and component centers"
  >
    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 20, flex: 1 }}>
      {/* 2D CAD Layout */}
      <div
        style={{
          border: `1.5px solid ${THEME.border}`,
          borderRadius: 8,
          backgroundColor: THEME.panelBg,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.blue, fontWeight: 700, width: "100%", marginBottom: 8 }}>
          2-LAYER PCB PHYSICAL ENVELOPE (72.00 × 72.00 MM)
        </div>

        {/* Board Outline */}
        <div
          style={{
            width: 240,
            height: 240,
            border: `2px solid ${THEME.ink}`,
            borderRadius: 16,
            position: "relative",
            backgroundColor: "#f8fafc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Display cutout */}
          <div
            style={{
              width: 96,
              height: 110,
              border: `1.5px solid ${THEME.blue}`,
              backgroundColor: THEME.blueLight,
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: THEME.mono,
              fontSize: 9,
              textAlign: "center",
              color: THEME.blue,
              fontWeight: 700,
            }}
          >
            DISPLAY<br />(36.0, 34.0)
          </div>

          {/* USB-C */}
          <div
            style={{
              position: "absolute",
              bottom: -6,
              width: 48,
              height: 14,
              border: `1.5px solid ${THEME.ink}`,
              backgroundColor: "#ffffff",
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: THEME.mono,
              fontSize: 8,
              fontWeight: 700,
            }}
          >
            USB-C
          </div>

          {/* 4 Mounting Holes */}
          <div style={{ position: "absolute", top: 12, left: 12, width: 14, height: 14, borderRadius: "50%", border: `1.5px solid ${THEME.ink}`, backgroundColor: "#fff" }} />
          <div style={{ position: "absolute", top: 12, right: 12, width: 14, height: 14, borderRadius: "50%", border: `1.5px solid ${THEME.ink}`, backgroundColor: "#fff" }} />
          <div style={{ position: "absolute", bottom: 12, left: 12, width: 14, height: 14, borderRadius: "50%", border: `1.5px solid ${THEME.ink}`, backgroundColor: "#fff" }} />
          <div style={{ position: "absolute", bottom: 12, right: 12, width: 14, height: 14, borderRadius: "50%", border: `1.5px solid ${THEME.ink}`, backgroundColor: "#fff" }} />
        </div>

        <div style={{ fontFamily: THEME.mono, fontSize: 10, color: THEME.inkMuted, marginTop: 12 }}>
          Corner radius: R = 6.00 mm // 4x M3 mounting holes (Ø 3.20 mm)
        </div>
      </div>

      {/* Coordinate Table */}
      <div style={{ border: `1.5px solid ${THEME.border}`, borderRadius: 8, backgroundColor: THEME.panelBg, padding: 16, display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.inkFaint, fontWeight: 700, marginBottom: 10 }}>
          DATUM & CENTROID COORDINATE SPECIFICATION
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: THEME.mono, fontSize: 11 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
              <th style={{ textAlign: "left", padding: "6px 0" }}>FEATURE</th>
              <th style={{ textAlign: "left", padding: "6px 0" }}>LOCATION (X, Y)</th>
              <th style={{ textAlign: "left", padding: "6px 0" }}>SIZE / SPEC</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
              <td style={{ padding: "6px 0" }}>Board Origin (0,0)</td>
              <td>Top-Left Corner</td>
              <td>72.0 × 72.0 mm</td>
            </tr>
            <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
              <td style={{ padding: "6px 0" }}>M3 Hole Top-Left</td>
              <td>(6.00, 6.00) mm</td>
              <td>Ø 3.20 mm hole</td>
            </tr>
            <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
              <td style={{ padding: "6px 0" }}>M3 Hole Top-Right</td>
              <td>(66.00, 6.00) mm</td>
              <td>Ø 3.20 mm hole</td>
            </tr>
            <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
              <td style={{ padding: "6px 0" }}>M3 Hole Btm-Left</td>
              <td>(6.00, 66.00) mm</td>
              <td>Ø 3.20 mm hole</td>
            </tr>
            <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
              <td style={{ padding: "6px 0" }}>M3 Hole Btm-Right</td>
              <td>(66.00, 66.00) mm</td>
              <td>Ø 3.20 mm hole</td>
            </tr>
            <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
              <td style={{ padding: "6px 0" }}>Display Center</td>
              <td>(36.00, 34.00) mm</td>
              <td>28.0 × 31.0 mm window</td>
            </tr>
            <tr>
              <td style={{ padding: "6px 0" }}>USB-C Receptacle</td>
              <td>(36.00, 69.50) mm</td>
              <td>1.2 mm rear overhang</td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: "auto", fontFamily: THEME.mono, fontSize: 10, color: THEME.inkMuted }}>
          Designed for snug slip-fit into a 3D-printed desktop base tilted at 15° for ergonomic desk line-of-sight.
        </div>
      </div>
    </div>
  </Sheet>
);

// ============================================================================
// SKETCH 10: Hardware Architecture & Subassembly Stackup
// ============================================================================
export const Sketch10: React.FC = () => (
  <Sheet
    dwgNo="HUX-SK-10"
    sheetNo="10"
    title="Hardware Subassembly Stackup & Module Interconnects"
    subtitle="Mechanical layer order from front acrylic diffuser to desk stand base"
  >
    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 20, flex: 1 }}>
      {/* Stackup Layers */}
      <div style={{ border: `1.5px solid ${THEME.border}`, borderRadius: 8, backgroundColor: THEME.panelBg, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.blue, fontWeight: 700 }}>
          MECHANICAL EXPLODED ASSEMBLY STACKUP
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, fontFamily: THEME.mono, fontSize: 11 }}>
          <div style={{ padding: "8px 12px", backgroundColor: THEME.panelSubtle, borderRadius: 6, border: `1px solid ${THEME.border}` }}>
            <strong style={{ color: THEME.blue }}>LAYER 1: Front Bezel & Frosted Diffuser Ring</strong>
            <div style={{ color: THEME.inkMuted, fontSize: 10 }}>Snap-on magnetic bezel holding frosted halo ring</div>
          </div>

          <div style={{ padding: "8px 12px", backgroundColor: THEME.panelSubtle, borderRadius: 6, border: `1px solid ${THEME.border}` }}>
            <strong style={{ color: THEME.blue }}>LAYER 2: ST7789 1.69" IPS Color LCD Module</strong>
            <div style={{ color: THEME.inkMuted, fontSize: 10 }}>Centered in optical window, connected via 8-pin FPC / header</div>
          </div>

          <div style={{ padding: "8px 12px", backgroundColor: THEME.blueLight, borderRadius: 6, border: `1.5px solid ${THEME.blueBorder}` }}>
            <strong style={{ color: THEME.blue }}>LAYER 3: Custom 2-Layer Hux PCB (72×72mm)</strong>
            <div style={{ color: THEME.inkMuted, fontSize: 10 }}>Houses ESP32-S3, 8x SK6812 NeoPixels, INMP441, MAX98357A, USB-C</div>
          </div>

          <div style={{ padding: "8px 12px", backgroundColor: THEME.panelSubtle, borderRadius: 6, border: `1px solid ${THEME.border}` }}>
            <strong style={{ color: THEME.blue }}>LAYER 4: Acoustic Resonance Chamber & 3W Speaker</strong>
            <div style={{ color: THEME.inkMuted, fontSize: 10 }}>Sealed 12cc acoustic cavity optimizing low-end voice frequency response</div>
          </div>

          <div style={{ padding: "8px 12px", backgroundColor: THEME.panelSubtle, borderRadius: 6, border: `1px solid ${THEME.border}` }}>
            <strong style={{ color: THEME.blue }}>LAYER 5: 3D-Printed Desktop Base Stand</strong>
            <div style={{ color: THEME.inkMuted, fontSize: 10 }}>15° ergonomic tilt angle, anti-slip silicone feet, rear USB-C cable slot</div>
          </div>
        </div>
      </div>

      {/* Assembly Notes & Milestones */}
      <div style={{ border: `1.5px solid ${THEME.border}`, borderRadius: 8, backgroundColor: THEME.panelBg, padding: 16, display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.inkFaint, fontWeight: 700, marginBottom: 10 }}>
          INITIAL PLANNING MILESTONES COMPLETED
        </div>

        <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.inkMuted, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: THEME.green, fontWeight: 700 }}>✔</span>
            <span>Local Home Assistant WebSocket architecture defined</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: THEME.green, fontWeight: 700 }}>✔</span>
            <span>ESP32-S3 pin budget locked (16 pins allocated)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: THEME.green, fontWeight: 700 }}>✔</span>
            <span>Vector eye animation state machine mapped</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: THEME.green, fontWeight: 700 }}>✔</span>
            <span>8-LED Arc-Reactor halo ring polar layout sized</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: THEME.green, fontWeight: 700 }}>✔</span>
            <span>100% digital I2S audio pipeline planned</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: THEME.green, fontWeight: 700 }}>✔</span>
            <span>USB-C power tree & TVS protection established</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: THEME.green, fontWeight: 700 }}>✔</span>
            <span>72×72mm PCB mechanical envelope locked</span>
          </div>
        </div>

        <div style={{ marginTop: "auto", borderTop: `1px solid ${THEME.border}`, paddingTop: 10, fontFamily: THEME.mono, fontSize: 10, color: THEME.inkFaint }}>
          READY FOR SPRINT 02: KICAD SCHEMATIC CAPTURE & PCB ROUTING
        </div>
      </div>
    </div>
  </Sheet>
);
