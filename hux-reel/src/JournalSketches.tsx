import React from "react";

const STYLES = {
  bg: "#080a0f",
  cardBg: "rgba(16, 21, 32, 0.85)",
  cardBorder: "rgba(255, 255, 255, 0.12)",
  cyan: "#00f0ff",
  gold: "#ffb703",
  green: "#00f5a0",
  red: "#ff4d4d",
  textPrimary: "#f5f7fa",
  textSecondary: "#8b949e",
  mono: "'SF Mono', 'Fira Code', 'Roboto Mono', Menlo, monospace",
  sans: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif",
};

const Header: React.FC<{ num: string; title: string; subtitle: string; tag: string }> = ({
  num,
  title,
  subtitle,
  tag,
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      paddingBottom: 16,
      marginBottom: 24,
      width: "100%",
    }}
  >
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
        <span
          style={{
            fontFamily: STYLES.mono,
            fontSize: 16,
            color: STYLES.cyan,
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          FIG {num} • HUX DEVLOG
        </span>
        <span
          style={{
            fontSize: 13,
            backgroundColor: "rgba(0, 240, 255, 0.12)",
            color: STYLES.cyan,
            padding: "3px 10px",
            borderRadius: 12,
            border: "1px solid rgba(0, 240, 255, 0.3)",
            fontWeight: 600,
          }}
        >
          {tag}
        </span>
      </div>
      <h1
        style={{
          fontFamily: STYLES.sans,
          fontSize: 32,
          fontWeight: 800,
          color: STYLES.textPrimary,
          margin: 0,
          letterSpacing: -0.5,
        }}
      >
        {title}
      </h1>
      <p style={{ fontFamily: STYLES.sans, fontSize: 16, color: STYLES.textSecondary, margin: "4px 0 0 0" }}>
        {subtitle}
      </p>
    </div>

    <div style={{ textAlign: "right", fontFamily: STYLES.mono, fontSize: 13, color: STYLES.textSecondary }}>
      <div>HACK CLUB HALF LIFE</div>
      <div style={{ color: STYLES.gold, marginTop: 4 }}>BUDGET CAP: &lt;$65</div>
    </div>
  </div>
);

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      width: 1200,
      height: 800,
      backgroundColor: STYLES.bg,
      color: STYLES.textPrimary,
      padding: "36px 48px",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden",
      backgroundImage: `
        radial-gradient(circle at 10% 20%, rgba(0, 240, 255, 0.05) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, rgba(255, 183, 3, 0.04) 0%, transparent 40%),
        linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
      `,
      backgroundSize: "100% 100%, 100% 100%, 40px 40px, 40px 40px",
    }}
  >
    {children}
  </div>
);

// ─── 01: Concept Teardown: Lifeless Speaker vs Hux ───
export const Sketch01: React.FC = () => (
  <Container>
    <Header
      num="01"
      title="Problem Teardown: Lifeless Smart Speakers vs Hux Companion"
      subtitle="Analyzing UX failure modes of commercial voice pucks vs expressive desktop companion"
      tag="CONCEPT & UX"
    />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, flex: 1 }}>
      {/* Conventional Hub */}
      <div
        style={{
          backgroundColor: "rgba(255, 77, 77, 0.04)",
          border: "1px solid rgba(255, 77, 77, 0.25)",
          borderRadius: 20,
          padding: 28,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: STYLES.red, margin: 0 }}>
            Standard Commercial Smart Puck
          </h2>
          <span style={{ fontSize: 13, color: STYLES.red, fontFamily: STYLES.mono, fontWeight: 700 }}>
            ✕ REJECTED
          </span>
        </div>

        <ul style={{ fontSize: 16, lineHeight: 1.8, color: STYLES.textSecondary, paddingLeft: 20, margin: "0 0 24px 0" }}>
          <li><strong style={{ color: "#fff" }}>Zero Visual Expression:</strong> Monolithic black plastic cylinder. No glanceable status.</li>
          <li><strong style={{ color: "#fff" }}>Opaque State:</strong> Single ambiguous blinking LED leaves user guessing if listening.</li>
          <li><strong style={{ color: "#fff" }}>Cloud Latency:</strong> 800ms–2000ms roundtrip delay for basic light switch toggles.</li>
          <li><strong style={{ color: "#fff" }}>Privacy & Ecosystem Lock-in:</strong> Requires proprietary cloud accounts.</li>
        </ul>

        <div style={{ marginTop: "auto", padding: 16, backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 12 }}>
          <div style={{ fontFamily: STYLES.mono, fontSize: 13, color: STYLES.red }}>
            STATUS: Lifeless ambient dust-collector. No desktop character.
          </div>
        </div>
      </div>

      {/* Hux Companion */}
      <div
        style={{
          backgroundColor: "rgba(0, 240, 255, 0.04)",
          border: "1px solid rgba(0, 240, 255, 0.35)",
          borderRadius: 20,
          padding: 28,
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 0 30px rgba(0, 240, 255, 0.08)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: STYLES.cyan, margin: 0 }}>
            Hux: The Desktop AI Companion
          </h2>
          <span style={{ fontSize: 13, color: STYLES.cyan, fontFamily: STYLES.mono, fontWeight: 700 }}>
            ✓ ARCHITECTURE
          </span>
        </div>

        <ul style={{ fontSize: 16, lineHeight: 1.8, color: STYLES.textSecondary, paddingLeft: 20, margin: "0 0 24px 0" }}>
          <li><strong style={{ color: "#fff" }}>Animated Face Display:</strong> 1.69" IPS screen with reactive eyes (blinks, pupils, HUD).</li>
          <li><strong style={{ color: "#fff" }}>Arc-Reactor RGB Halo:</strong> 8x addressable LEDs ring the screen bezel with radiant state cues.</li>
          <li><strong style={{ color: "#fff" }}>Local-First Home Assistant:</strong> Direct Wi-Fi WebSocket protocol; sub-50ms instant control.</li>
          <li><strong style={{ color: "#fff" }}>Dedicated Voice Hardware:</strong> Digital MEMS I2S mic + 3W audio amp for clear persona speech.</li>
        </ul>

        <div style={{ marginTop: "auto", padding: 16, backgroundColor: "rgba(0, 240, 255, 0.1)", borderRadius: 12 }}>
          <div style={{ fontFamily: STYLES.mono, fontSize: 13, color: STYLES.cyan }}>
            VERDICT: Distinct desk companion with living persona & instant local smart home control.
          </div>
        </div>
      </div>
    </div>
  </Container>
);

// ─── 02: Full System Architecture Block Diagram ───
export const Sketch02: React.FC = () => (
  <Container>
    <Header
      num="02"
      title="System Architecture & Hardware Subsystem Interconnect"
      subtitle="Complete functional block diagram spanning compute, display, audio, power, and Wi-Fi"
      tag="BLOCK DIAGRAM"
    />
    <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1, justifyContent: "center" }}>
      {/* Central Diagram Flow */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr 1fr", gap: 24, alignItems: "stretch" }}>
        {/* Left Inputs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ backgroundColor: STYLES.cardBg, border: `1px solid ${STYLES.cardBorder}`, borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: STYLES.gold, marginBottom: 6 }}>USB-C 5V Input</div>
            <div style={{ fontSize: 14, color: STYLES.textSecondary, fontFamily: STYLES.mono }}>VBUS 5.0V @ 1A + ESD Diode Array</div>
          </div>
          <div style={{ backgroundColor: STYLES.cardBg, border: `1px solid ${STYLES.cardBorder}`, borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: STYLES.cyan, marginBottom: 6 }}>INMP441 MEMS Mic</div>
            <div style={{ fontSize: 14, color: STYLES.textSecondary, fontFamily: STYLES.mono }}>Digital I2S Audio In • Sound Port</div>
          </div>
          <div style={{ backgroundColor: STYLES.cardBg, border: `1px solid ${STYLES.cardBorder}`, borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: STYLES.textPrimary, marginBottom: 6 }}>Buttons & Sensors</div>
            <div style={{ fontSize: 14, color: STYLES.textSecondary, fontFamily: STYLES.mono }}>Boot (IO0), Reset (EN), I2C Header</div>
          </div>
        </div>

        {/* Center MCU Core */}
        <div
          style={{
            backgroundColor: "rgba(0, 240, 255, 0.06)",
            border: `2px solid ${STYLES.cyan}`,
            borderRadius: 24,
            padding: 28,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 0 40px rgba(0, 240, 255, 0.12)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>ESP32-S3-WROOM-1</span>
            <span style={{ fontSize: 14, fontFamily: STYLES.mono, color: STYLES.cyan, fontWeight: 700 }}>240MHz DUAL-CORE</span>
          </div>
          <div style={{ fontSize: 15, color: STYLES.textSecondary, margin: "16px 0", lineHeight: 1.6 }}>
            • 16MB Flash + 8MB Octal PSRAM (for smooth LVGL framebuffers)<br />
            • 2.4 GHz 802.11 b/g/n Wi-Fi + BLE 5.0<br />
            • Dedicated Hardware I2S DMA Engine (Simultaneous TX/RX)<br />
            • High-Speed 40MHz SPI Master for ST7789 Display<br />
            • Hardware RMT Controller for 800kHz NeoPixel Timing
          </div>
          <div style={{ padding: "10px 16px", backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 12, fontFamily: STYLES.mono, fontSize: 13, color: STYLES.green }}>
            LOCAL PIPELINE: Home Assistant Native WebSocket Client
          </div>
        </div>

        {/* Right Outputs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ backgroundColor: STYLES.cardBg, border: `1px solid ${STYLES.cardBorder}`, borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: STYLES.cyan, marginBottom: 6 }}>ST7789 IPS LCD</div>
            <div style={{ fontSize: 14, color: STYLES.textSecondary, fontFamily: STYLES.mono }}>240x280 Color • SPI @ 40MHz</div>
          </div>
          <div style={{ backgroundColor: STYLES.cardBg, border: `1px solid ${STYLES.cardBorder}`, borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: STYLES.gold, marginBottom: 6 }}>Arc-Reactor Halo</div>
            <div style={{ fontSize: 14, color: STYLES.textSecondary, fontFamily: STYLES.mono }}>8x SK6812 MINI-E RGB Ring</div>
          </div>
          <div style={{ backgroundColor: STYLES.cardBg, border: `1px solid ${STYLES.cardBorder}`, borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: STYLES.green, marginBottom: 6 }}>Audio Out (3W Spk)</div>
            <div style={{ fontSize: 14, color: STYLES.textSecondary, fontFamily: STYLES.mono }}>MAX98357A I2S Class-D DAC Amp</div>
          </div>
        </div>
      </div>
    </div>
  </Container>
);

// ─── 03: ESP32-S3 Pinout & Peripheral Mapping ───
export const Sketch03: React.FC = () => (
  <Container>
    <Header
      num="03"
      title="ESP32-S3 Pin Allocation & Peripheral Mapping"
      subtitle="Strict GPIO budget mapping high-speed display, I2S audio channels, and system buses"
      tag="PINOUT BUDGET"
    />
    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24, flex: 1 }}>
      {/* Table */}
      <div style={{ backgroundColor: STYLES.cardBg, border: `1px solid ${STYLES.cardBorder}`, borderRadius: 18, padding: 20, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, textAlign: "left", fontFamily: STYLES.mono }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.15)", color: STYLES.cyan }}>
              <th style={{ padding: "8px 12px" }}>GPIO</th>
              <th style={{ padding: "8px 12px" }}>Net Name</th>
              <th style={{ padding: "8px 12px" }}>Peripheral</th>
              <th style={{ padding: "8px 12px" }}>Purpose</th>
            </tr>
          </thead>
          <tbody style={{ color: STYLES.textSecondary }}>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <td style={{ padding: "7px 12px", color: "#fff" }}>IO11 / IO12</td>
              <td style={{ padding: "7px 12px", color: STYLES.cyan }}>DISP_SDA/SCK</td>
              <td style={{ padding: "7px 12px" }}>SPI2 Master</td>
              <td style={{ padding: "7px 12px" }}>ST7789 High-Speed Video Data</td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <td style={{ padding: "7px 12px", color: "#fff" }}>IO9 / IO10</td>
              <td style={{ padding: "7px 12px", color: STYLES.cyan }}>DISP_DC / RES</td>
              <td style={{ padding: "7px 12px" }}>GPIO Out</td>
              <td style={{ padding: "7px 12px" }}>Data/Cmd select & HW Reset</td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <td style={{ padding: "7px 12px", color: "#fff" }}>IO14 / IO21</td>
              <td style={{ padding: "7px 12px", color: STYLES.cyan }}>DISP_CS / BLK</td>
              <td style={{ padding: "7px 12px" }}>LEDC PWM</td>
              <td style={{ padding: "7px 12px" }}>Chip Select & Backlight dimming</td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <td style={{ padding: "7px 12px", color: "#fff" }}>IO4 / 5 / 6</td>
              <td style={{ padding: "7px 12px", color: STYLES.gold }}>MIC_SD/WS/SCK</td>
              <td style={{ padding: "7px 12px" }}>I2S0 (RX)</td>
              <td style={{ padding: "7px 12px" }}>INMP441 Digital MEMS Mic In</td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <td style={{ padding: "7px 12px", color: "#fff" }}>IO7 / 15 / 16</td>
              <td style={{ padding: "7px 12px", color: STYLES.green }}>SPK_LRC/BCLK/DIN</td>
              <td style={{ padding: "7px 12px" }}>I2S1 (TX)</td>
              <td style={{ padding: "7px 12px" }}>MAX98357A 3.2W DAC Audio Out</td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <td style={{ padding: "7px 12px", color: "#fff" }}>IO48</td>
              <td style={{ padding: "7px 12px", color: STYLES.gold }}>NEOPIXEL</td>
              <td style={{ padding: "7px 12px" }}>RMT Transmitter</td>
              <td style={{ padding: "7px 12px" }}>8x SK6812 RGB Arc-Reactor Ring</td>
            </tr>
            <tr>
              <td style={{ padding: "7px 12px", color: "#fff" }}>IO19 / IO20</td>
              <td style={{ padding: "7px 12px", color: "#fff" }}>USB_DN / DP</td>
              <td style={{ padding: "7px 12px" }}>USB Serial/JTAG</td>
              <td style={{ padding: "7px 12px" }}>Native USB Flashing & Logging</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Constraints Card */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ backgroundColor: STYLES.cardBg, border: `1px solid ${STYLES.cardBorder}`, borderRadius: 18, padding: 24 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: STYLES.cyan, marginTop: 0 }}>Design Rules Enforced</h3>
          <ul style={{ fontSize: 15, lineHeight: 1.6, color: STYLES.textSecondary, paddingLeft: 18 }}>
            <li>No shared I2S clocks: Separate I2S0 (Mic RX) and I2S1 (Speaker TX) to prevent clock jitter and rate collisions.</li>
            <li>Zero strapping pin conflicts: MTDO (GPIO40), GPIO0, GPIO45 kept strictly clean for boot safety.</li>
            <li>Octal PSRAM lines reserved internally (GPIO33–37 unused).</li>
          </ul>
        </div>
      </div>
    </div>
  </Container>
);

// ─── 04: Expressive Face Emotion State Machine ───
export const Sketch04: React.FC = () => (
  <Container>
    <Header
      num="04"
      title="Expressive Face Emotion State Machine"
      subtitle="Reactive vector eye animation states rendering personality & smart home status"
      tag="UI & STATE MACHINE"
    />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, flex: 1, alignItems: "center" }}>
      {/* State 1: Idle */}
      <div style={{ backgroundColor: STYLES.cardBg, border: `1px solid ${STYLES.cardBorder}`, borderRadius: 20, padding: 20, textAlign: "center" }}>
        <div style={{ height: 120, backgroundColor: "#000", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 16 }}>
          <div style={{ width: 24, height: 36, backgroundColor: STYLES.cyan, borderRadius: 8, boxShadow: `0 0 15px ${STYLES.cyan}` }} />
          <div style={{ width: 24, height: 36, backgroundColor: STYLES.cyan, borderRadius: 8, boxShadow: `0 0 15px ${STYLES.cyan}` }} />
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: STYLES.cyan, marginBottom: 6 }}>1. IDLE BLINK</div>
        <div style={{ fontSize: 13, color: STYLES.textSecondary }}>Natural randomized blinking (every 3-5s), gentle pupil saccades across desk.</div>
      </div>

      {/* State 2: Listening */}
      <div style={{ backgroundColor: STYLES.cardBg, border: `1px solid ${STYLES.cyan}`, borderRadius: 20, padding: 20, textAlign: "center", boxShadow: "0 0 20px rgba(0,240,255,0.15)" }}>
        <div style={{ height: 120, backgroundColor: "#000", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 16 }}>
          <div style={{ width: 32, height: 44, backgroundColor: STYLES.cyan, borderRadius: 12, boxShadow: `0 0 20px ${STYLES.cyan}` }} />
          <div style={{ width: 32, height: 44, backgroundColor: STYLES.cyan, borderRadius: 12, boxShadow: `0 0 20px ${STYLES.cyan}` }} />
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: STYLES.cyan, marginBottom: 6 }}>2. LISTENING</div>
        <div style={{ fontSize: 13, color: STYLES.textSecondary }}>Wake-word triggered; dilated attentive pupils, cyan halo pulses to voice cadence.</div>
      </div>

      {/* State 3: Thinking */}
      <div style={{ backgroundColor: STYLES.cardBg, border: `1px solid ${STYLES.gold}`, borderRadius: 20, padding: 20, textAlign: "center" }}>
        <div style={{ height: 120, backgroundColor: "#000", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 16 }}>
          <div style={{ width: 36, height: 14, backgroundColor: STYLES.gold, borderRadius: 6, transform: "rotate(10deg)", boxShadow: `0 0 15px ${STYLES.gold}` }} />
          <div style={{ width: 36, height: 14, backgroundColor: STYLES.gold, borderRadius: 6, transform: "rotate(-10deg)", boxShadow: `0 0 15px ${STYLES.gold}` }} />
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: STYLES.gold, marginBottom: 6 }}>3. THINKING</div>
        <div style={{ fontSize: 13, color: STYLES.textSecondary }}>Processing Home Assistant request; animated squint with rotating amber halo.</div>
      </div>

      {/* State 4: Speaking / HUD */}
      <div style={{ backgroundColor: STYLES.cardBg, border: `1px solid ${STYLES.green}`, borderRadius: 20, padding: 20, textAlign: "center" }}>
        <div style={{ height: 120, backgroundColor: "#000", borderRadius: 16, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 14 }}>
            <div style={{ width: 22, height: 26, backgroundColor: STYLES.green, borderRadius: 6 }} />
            <div style={{ width: 22, height: 26, backgroundColor: STYLES.green, borderRadius: 6 }} />
          </div>
          <div style={{ width: 40, height: 6, backgroundColor: STYLES.green, borderRadius: 3 }} />
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: STYLES.green, marginBottom: 6 }}>4. SPEAKING & HUD</div>
        <div style={{ fontSize: 13, color: STYLES.textSecondary }}>Voice playback active; eyes bounce to speech amplitude; splits into device cards.</div>
      </div>
    </div>
  </Container>
);

// ─── 05: Arc-Reactor RGB Status Halo Optics ───
export const Sketch05: React.FC = () => (
  <Container>
    <Header
      num="05"
      title="Arc-Reactor RGB Status Halo Geometry"
      subtitle="Circular 25.0mm radius array of 8x SK6812 MINI-E LEDs delivering radiant status cues"
      tag="OPTICS & LIGHTING"
    />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, flex: 1, alignItems: "center" }}>
      {/* Visual Circle */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            width: 380,
            height: 380,
            borderRadius: "50%",
            border: `2px dashed rgba(0,240,255,0.4)`,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 240, 255, 0.03)",
          }}
        >
          <div style={{ width: 180, height: 200, backgroundColor: "#000", border: `2px solid ${STYLES.cyan}`, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", color: STYLES.cyan, fontFamily: STYLES.mono, fontSize: 14 }}>
            ST7789 DISPLAY
          </div>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => {
            const rad = (ang * Math.PI) / 180;
            const x = 160 * Math.cos(rad);
            const y = 160 * Math.sin(rad);
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  transform: `translate(${x}px, ${y}px)`,
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  backgroundColor: STYLES.cyan,
                  boxShadow: `0 0 16px ${STYLES.cyan}`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Details */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ backgroundColor: STYLES.cardBg, border: `1px solid ${STYLES.cardBorder}`, borderRadius: 18, padding: 24 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: STYLES.cyan, marginTop: 0 }}>Geometry Specifications</h3>
          <ul style={{ fontSize: 15, lineHeight: 1.7, color: STYLES.textSecondary, paddingLeft: 20, margin: 0 }}>
            <li><strong style={{ color: "#fff" }}>Array Radius:</strong> Exactly 25.0mm from PCB center (36.0mm, 34.0mm).</li>
            <li><strong style={{ color: "#fff" }}>Angular Step:</strong> 45.0° intervals across 8 nodes for uniform circular luminance.</li>
            <li><strong style={{ color: "#fff" }}>Device:</strong> SK6812 MINI-E (3.5 × 3.5mm reverse-mount package).</li>
            <li><strong style={{ color: "#fff" }}>Driver:</strong> Single GPIO48 line with 330Ω damping resistor & 0.1µF local caps.</li>
          </ul>
        </div>

        <div style={{ backgroundColor: STYLES.cardBg, border: `1px solid ${STYLES.cardBorder}`, borderRadius: 18, padding: 24 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: STYLES.gold, marginTop: 0 }}>Status Lighting Patterns</h3>
          <div style={{ fontSize: 14, fontFamily: STYLES.mono, color: STYLES.textSecondary, lineHeight: 1.6 }}>
            • CYAN BREATHE (0.5Hz): Idle & Ambient Desk Mode<br />
            • CYAN WAVEFORM: Actively capturing voice input<br />
            • AMBER CHASE (4Hz): Processing LLM / Home Assistant command<br />
            • RED BLINK: Smart home security or sensor threshold alert
          </div>
        </div>
      </div>
    </div>
  </Container>
);

// ─── 06: Dual I2S Audio Pipeline ───
export const Sketch06: React.FC = () => (
  <Container>
    <Header
      num="06"
      title="Dual I2S Audio Pipeline: Digital Mic & Class-D DAC"
      subtitle="Full-duplex digital voice capture and crystal-clear response synthesis"
      tag="AUDIO & DSP"
    />
    <div style={{ display: "flex", flexDirection: "column", gap: 24, flex: 1, justifyContent: "center" }}>
      {/* Flow Boxes */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 0.3fr 1.2fr 0.3fr 1fr", gap: 12, alignItems: "center" }}>
        {/* Step 1: Input */}
        <div style={{ backgroundColor: STYLES.cardBg, border: `1px solid ${STYLES.cardBorder}`, borderRadius: 18, padding: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: STYLES.cyan, marginBottom: 8 }}>INMP441 MEMS Mic</div>
          <div style={{ fontSize: 13, color: STYLES.textSecondary, lineHeight: 1.5 }}>
            • Bottom-port acoustic opening through PCB<br />
            • 24-bit I2S data stream @ 16kHz<br />
            • 61dB SNR high voice clarity
          </div>
        </div>

        <div style={{ textAlign: "center", fontSize: 24, color: STYLES.cyan }}>➔</div>

        {/* Step 2: DSP Core */}
        <div style={{ backgroundColor: "rgba(0, 240, 255, 0.05)", border: `2px solid ${STYLES.cyan}`, borderRadius: 20, padding: 24 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 8 }}>ESP32-S3 Audio DSP Engine</div>
          <div style={{ fontSize: 14, color: STYLES.textSecondary, lineHeight: 1.6 }}>
            • DMA Buffer Ping-Pong (1024 bytes per frame)<br />
            • Local Wake-Word Engine (openWakeWord / microWakeWord)<br />
            • Opus Audio Compression for Wi-Fi streaming to Home Assistant Assist
          </div>
        </div>

        <div style={{ textAlign: "center", fontSize: 24, color: STYLES.green }}>➔</div>

        {/* Step 3: Output */}
        <div style={{ backgroundColor: STYLES.cardBg, border: `1px solid ${STYLES.cardBorder}`, borderRadius: 18, padding: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: STYLES.green, marginBottom: 8 }}>MAX98357A + 3W Spk</div>
          <div style={{ fontSize: 13, color: STYLES.textSecondary, lineHeight: 1.5 }}>
            • Mono Class-D I2S DAC Amp<br />
            • Direct 5V VBUS power rail (3.2W into 4Ω)<br />
            • 92% efficiency; low thermal output
          </div>
        </div>
      </div>

      <div style={{ padding: 18, backgroundColor: "rgba(255, 183, 3, 0.08)", border: `1px solid rgba(255, 183, 3, 0.3)`, borderRadius: 16 }}>
        <div style={{ fontFamily: STYLES.mono, fontSize: 14, color: STYLES.gold }}>
          KEY ENGINEERING BENEFIT: Dual hardware I2S channels eliminate software bit-banging and allow zero-latency echo cancellation.
        </div>
      </div>
    </div>
  </Container>
);

// ─── 07: Home Assistant Local API Architecture ───
export const Sketch07: React.FC = () => (
  <Container>
    <Header
      num="07"
      title="Local-First Home Assistant Integration"
      subtitle="Zero-cloud local WebSockets & REST pipeline for instant device management"
      tag="SOFTWARE & IOT"
    />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, flex: 1 }}>
      <div style={{ backgroundColor: STYLES.cardBg, border: `1px solid ${STYLES.cardBorder}`, borderRadius: 20, padding: 24 }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: STYLES.cyan, marginTop: 0 }}>Local WebSocket Telemetry</h3>
        <p style={{ fontSize: 15, color: STYLES.textSecondary, lineHeight: 1.6 }}>
          Hux establishes a persistent, authenticated WebSocket connection directly to your local Home Assistant server (`ws://homeassistant.local:8123/api/websocket`).
        </p>
        <div style={{ backgroundColor: "#000", padding: 14, borderRadius: 12, fontFamily: STYLES.mono, fontSize: 12, color: STYLES.green }}>
          {"{"}<br />
          &nbsp;&nbsp;"id": 18,<br />
          &nbsp;&nbsp;"type": "subscribe_events",<br />
          &nbsp;&nbsp;"event_type": "state_changed"<br />
          {"}"}
        </div>
        <p style={{ fontSize: 14, color: STYLES.textSecondary, marginTop: 12 }}>
          Event-driven: Screen updates instantly when any room light or sensor changes.
        </p>
      </div>

      <div style={{ backgroundColor: STYLES.cardBg, border: `1px solid ${STYLES.cardBorder}`, borderRadius: 20, padding: 24 }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: STYLES.green, marginTop: 0 }}>Assist Voice Pipeline</h3>
        <p style={{ fontSize: 15, color: STYLES.textSecondary, lineHeight: 1.6 }}>
          Leverages Home Assistant 2024+ Year of the Voice pipeline. Spoken commands stream via binary WebSocket chunks straight to Wyoming / Whisper / Piper.
        </p>
        <ul style={{ fontSize: 14, color: STYLES.textSecondary, lineHeight: 1.6, paddingLeft: 18 }}>
          <li><strong style={{ color: "#fff" }}>Sub-50ms Latency:</strong> Lights turn on before you even finish releasing your breath.</li>
          <li><strong style={{ color: "#fff" }}>No Cloud Subscriptions:</strong> Operates entirely on your local Wi-Fi network.</li>
          <li><strong style={{ color: "#fff" }}>Custom Persona:</strong> Injects British butler tone & witty personality prompt.</li>
        </ul>
      </div>
    </div>
  </Container>
);

// ─── 08: Power Delivery & ESD Protection ───
export const Sketch08: React.FC = () => (
  <Container>
    <Header
      num="08"
      title="Power Delivery, LDO Regulation & USB ESD Protection"
      subtitle="Clean 5V to 3.3V power tree with high-speed transient clamp diodes"
      tag="POWER & SCHEMATIC"
    />
    <div style={{ display: "flex", flexDirection: "column", gap: 24, flex: 1, justifyContent: "center" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
        {/* USB-C */}
        <div style={{ backgroundColor: STYLES.cardBg, border: `1px solid ${STYLES.cardBorder}`, borderRadius: 18, padding: 22 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: STYLES.cyan, marginBottom: 8 }}>1. USB-C 16-Pin</div>
          <div style={{ fontSize: 14, color: STYLES.textSecondary, lineHeight: 1.5 }}>
            • 5.1kΩ pull-downs on CC1/CC2 for standard 5V host negotiation<br />
            • Grounded shield tabs for robust mechanical desk strain relief
          </div>
        </div>

        {/* ESD Clamp */}
        <div style={{ backgroundColor: STYLES.cardBg, border: `1px solid ${STYLES.cardBorder}`, borderRadius: 18, padding: 22 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: STYLES.gold, marginBottom: 8 }}>2. USBLC6-2SC6 ESD</div>
          <div style={{ fontSize: 14, color: STYLES.textSecondary, lineHeight: 1.5 }}>
            • Ultra-low capacitance (3.5pF) protection on USB D+/D-<br />
            • ±15kV air-discharge clamp prevents static shocks when plugging in
          </div>
        </div>

        {/* 3.3V LDO */}
        <div style={{ backgroundColor: STYLES.cardBg, border: `1px solid ${STYLES.cardBorder}`, borderRadius: 18, padding: 22 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: STYLES.green, marginBottom: 8 }}>3. TLV75533 3.3V LDO</div>
          <div style={{ fontSize: 14, color: STYLES.textSecondary, lineHeight: 1.5 }}>
            • 500mA rating with ultra-low 130mV dropout voltage<br />
            • 10µF input & output ceramic caps eliminate Wi-Fi RF brownouts
          </div>
        </div>
      </div>

      <div style={{ padding: 20, backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ fontFamily: STYLES.mono, fontSize: 14, color: STYLES.textPrimary, lineHeight: 1.6 }}>
          POWER SPLIT: 5V VBUS supplies high-draw components (MAX98357A Audio Amp & 8x SK6812 NeoPixels) directly, keeping the 3.3V MCU rail totally clean and noise-free.
        </div>
      </div>
    </div>
  </Container>
);

// ─── 09: Mechanical Floorplan & Ergonomics ───
export const Sketch09: React.FC = () => (
  <Container>
    <Header
      num="09"
      title="Mechanical Floorplan & Ergonomic Constraints"
      subtitle="72mm x 72mm 2-layer PCB layout with symmetric M3 mounting and acoustic port"
      tag="CAD & MECHANICAL"
    />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, flex: 1, alignItems: "center" }}>
      {/* 72x72 Board Drawing */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: 360,
            height: 360,
            backgroundColor: "#10141e",
            border: `2px solid ${STYLES.cyan}`,
            borderRadius: 30,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 24,
            boxShadow: "0 0 40px rgba(0, 240, 255, 0.15)",
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: "50%", border: `2px solid ${STYLES.gold}`, backgroundColor: "#000" }} />
          <div style={{ fontSize: 13, color: STYLES.gold, fontFamily: STYLES.mono }}>Acoustic Port (Mic In)</div>
          
          <div style={{ width: 160, height: 170, backgroundColor: "#000", border: "1px dashed rgba(255,255,255,0.3)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", color: STYLES.textSecondary, fontSize: 13, fontFamily: STYLES.mono }}>
            ST7789 SCREEN
          </div>

          <div style={{ width: 60, height: 16, backgroundColor: "#252b3b", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontFamily: STYLES.mono, color: STYLES.cyan }}>
            USB-C
          </div>

          {/* Corner Holes */}
          <div style={{ position: "absolute", top: 18, left: 18, width: 14, height: 14, borderRadius: "50%", border: "2px solid #888" }} />
          <div style={{ position: "absolute", top: 18, right: 18, width: 14, height: 14, borderRadius: "50%", border: "2px solid #888" }} />
          <div style={{ position: "absolute", bottom: 18, left: 18, width: 14, height: 14, borderRadius: "50%", border: "2px solid #888" }} />
          <div style={{ position: "absolute", bottom: 18, right: 18, width: 14, height: 14, borderRadius: "50%", border: "2px solid #888" }} />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ backgroundColor: STYLES.cardBg, border: `1px solid ${STYLES.cardBorder}`, borderRadius: 18, padding: 24 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: STYLES.cyan, marginTop: 0 }}>Key Dimensions</h3>
          <ul style={{ fontSize: 15, lineHeight: 1.7, color: STYLES.textSecondary, paddingLeft: 20, margin: 0 }}>
            <li><strong style={{ color: "#fff" }}>Board Outline:</strong> 72.0mm × 72.0mm with 6.0mm corner fillet.</li>
            <li><strong style={{ color: "#fff" }}>Mounting:</strong> 4x M3 standoff holes placed at (6mm, 6mm) offsets.</li>
            <li><strong style={{ color: "#fff" }}>Screen Offset:</strong> Centered at (36mm, 34mm) for natural gaze angle.</li>
            <li><strong style={{ color: "#fff" }}>Cable Route:</strong> USB-C port at bottom center prevents desk clutter.</li>
          </ul>
        </div>
      </div>
    </div>
  </Container>
);

// ─── 10: Half Life Budget & BOM Optimization ───
export const Sketch10: React.FC = () => (
  <Container>
    <Header
      num="10"
      title="Half Life Hardware Budget & BOM Optimization"
      subtitle="Strict financial breakdown verifying full JLCPCB SMT fabrication under $65"
      tag="BUDGET & BOM"
    />
    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24, flex: 1, alignItems: "center" }}>
      {/* Cost Table */}
      <div style={{ backgroundColor: STYLES.cardBg, border: `1px solid ${STYLES.cardBorder}`, borderRadius: 18, padding: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, textAlign: "left", fontFamily: STYLES.mono }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.15)", color: STYLES.gold }}>
              <th style={{ padding: "8px 10px" }}>Item Description</th>
              <th style={{ padding: "8px 10px" }}>Supplier Code</th>
              <th style={{ padding: "8px 10px", textAlign: "right" }}>Cost (USD)</th>
            </tr>
          </thead>
          <tbody style={{ color: STYLES.textSecondary }}>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <td style={{ padding: "7px 10px", color: "#fff" }}>JLCPCB 2-Layer Board + SMT Assembly</td>
              <td style={{ padding: "7px 10px" }}>5 pcs / JLCPCB</td>
              <td style={{ padding: "7px 10px", textAlign: "right", color: STYLES.green }}>$16.00</td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <td style={{ padding: "7px 10px", color: "#fff" }}>ESP32-S3-WROOM-1-N16R8 Module</td>
              <td style={{ padding: "7px 10px" }}>LCSC: C5180337</td>
              <td style={{ padding: "7px 10px", textAlign: "right", color: STYLES.green }}>$6.50</td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <td style={{ padding: "7px 10px", color: "#fff" }}>ST7789 1.69" IPS Color Display</td>
              <td style={{ padding: "7px 10px" }}>LCSC: C2903565</td>
              <td style={{ padding: "7px 10px", textAlign: "right", color: STYLES.green }}>$4.50</td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <td style={{ padding: "7px 10px", color: "#fff" }}>INMP441 I2S MEMS Microphone</td>
              <td style={{ padding: "7px 10px" }}>LCSC: C444583</td>
              <td style={{ padding: "7px 10px", textAlign: "right", color: STYLES.green }}>$1.80</td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <td style={{ padding: "7px 10px", color: "#fff" }}>MAX98357A Amp + 3W Speaker</td>
              <td style={{ padding: "7px 10px" }}>LCSC: C268261</td>
              <td style={{ padding: "7px 10px", textAlign: "right", color: STYLES.green }}>$3.20</td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <td style={{ padding: "7px 10px", color: "#fff" }}>SK6812 MINI-E RGB Ring (8 pcs) + Passives</td>
              <td style={{ padding: "7px 10px" }}>LCSC: C2890040</td>
              <td style={{ padding: "7px 10px", textAlign: "right", color: STYLES.green }}>$2.50</td>
            </tr>
            <tr>
              <td style={{ padding: "7px 10px", color: "#fff" }}>Global Direct Line Shipping & Taxes</td>
              <td style={{ padding: "7px 10px" }}>Standard Line</td>
              <td style={{ padding: "7px 10px", textAlign: "right", color: STYLES.green }}>$15.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Summary Card */}
      <div style={{ backgroundColor: STYLES.cardBg, border: `2px solid ${STYLES.gold}`, borderRadius: 20, padding: 26, textAlign: "center" }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: STYLES.gold, fontFamily: STYLES.mono, letterSpacing: 2 }}>
          TOTAL ESTIMATE
        </div>
        <div style={{ fontSize: 56, fontWeight: 900, color: "#fff", margin: "10px 0" }}>
          $49.50
        </div>
        <div style={{ fontSize: 16, color: STYLES.green, fontWeight: 700, marginBottom: 16 }}>
          ✓ COMFORTABLY UNDER $65 CAP
        </div>
        <div style={{ fontSize: 13, color: STYLES.textSecondary, fontFamily: STYLES.mono }}>
          REMAINING BUFFER: $15.50 (for optional enclosure filament or fasteners)
        </div>
      </div>
    </div>
  </Container>
);
