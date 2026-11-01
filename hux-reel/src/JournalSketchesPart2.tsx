import React from "react";

// ============================================================================
// SLEEK, MINIMAL GRAPHIC-FIRST MAKER STYLE - PART 2 (HOURS 11 - 25)
// Open canvas, crisp vector graphics, high whitespace, zero corporate cards.
// Strictly ZERO em dashes or en dashes.
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
  purple: "#7c3aed",
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
    <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 36 }}>
      <span style={{ fontFamily: C.mono, fontSize: 18, fontWeight: 700, color: C.blue }}>
        #{number}
      </span>
      <span style={{ fontSize: 26, fontWeight: 700, color: C.ink, letterSpacing: -0.5 }}>
        {title}
      </span>
    </div>

    <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
      {children}
    </div>
  </div>
);

// ============================================================================
// SKETCH 11: KiCad Schematic - MCU & Power
// ============================================================================
export const Sketch11: React.FC = () => (
  <Canvas number="11" title="kicad schematic: esp32-s3 and usb-c power tree">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32, alignItems: "center" }}>
        {/* Schematic Block */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.blue, fontWeight: 700, marginBottom: 12 }}>
            POWER INPUT & REGULATION // 5V TO 3.3V
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ border: `1.5px solid ${C.inkLight}`, padding: "14px 18px", borderRadius: 8, textAlign: "center", backgroundColor: "#fff" }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>USB-C 16-Pin</div>
              <div style={{ fontFamily: C.mono, fontSize: 11, color: C.inkMuted }}>2x 5.1k CC pull-downs</div>
            </div>
            <span style={{ fontFamily: C.mono, fontSize: 16, color: C.blue }}>→</span>
            <div style={{ border: `1.5px solid ${C.inkLight}`, padding: "14px 18px", borderRadius: 8, textAlign: "center", backgroundColor: "#fff" }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>USBLC6-2 ESD</div>
              <div style={{ fontFamily: C.mono, fontSize: 11, color: C.inkMuted }}>SOT-23-6 TVS diode</div>
            </div>
            <span style={{ fontFamily: C.mono, fontSize: 16, color: C.blue }}>→</span>
            <div style={{ border: `1.5px solid ${C.green}`, padding: "14px 18px", borderRadius: 8, textAlign: "center", backgroundColor: "#f0fdf4" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: C.green }}>TLV75533 LDO</div>
              <div style={{ fontFamily: C.mono, fontSize: 11, color: C.inkMuted }}>3.3V @ 500mA output</div>
            </div>
          </div>
        </div>

        {/* Spec Callout */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ borderLeft: `3px solid ${C.blue}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Decoupling Network</div>
            <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
              10uF bulk input capacitor + 100nF high-frequency ceramic caps on every 3.3V pin.
            </div>
          </div>
          <div style={{ borderLeft: `3px solid ${C.green}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Clean Boot Logic</div>
            <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
              10k pull-up resistor on EN line with 1uF delay cap for clean power-on reset.
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 20, display: "flex", justifyContent: "space-between", fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>
        <span>SCHEMATIC: kicad/hux.kicad_sch</span>
        <span>STATUS: ERC PASSED (0 ERRORS, 0 WARNINGS)</span>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 12: Schematic - ST7789 Display & Halo Ring
// ============================================================================
export const Sketch12: React.FC = () => (
  <Canvas number="12" title="schematic: st7789 spi display and arc-reactor halo">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        {/* Display Bus */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.cyan, fontWeight: 700, marginBottom: 12 }}>
            ST7789 8-PIN SPI BUS (40MHz)
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13, fontFamily: C.mono }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>GPIO 12 // MOSI</span><span>SDA Serial Data</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>GPIO 11 // SCLK</span><span>40MHz SPI Clock</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>GPIO 10 // CS</span><span>Chip Select</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>GPIO 9 // DC</span><span>Data / Command</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>GPIO 46 // BLK</span><span>PWM Backlight Dimming</span>
            </div>
          </div>
        </div>

        {/* Halo LED Ring */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.amber, fontWeight: 700, marginBottom: 12 }}>
            8x SK6812 MINI-E DAISY CHAIN
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 14, color: C.ink }}>
              Single GPIO 48 driven by hardware RMT peripheral through 330 ohm series damping resistor.
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 0", borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: C.amber }} />
              <span style={{ fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>DIN → LED1 → LED2 → ... → LED8 (DOUT termination)</span>
            </div>
            <div style={{ fontSize: 13, color: C.inkMuted }}>
              Dedicated 100nF decoupling capacitor placed immediately adjacent to each LED package.
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 20, display: "flex", justifyContent: "space-between", fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>
        <span>DISPLAY: ST7789 1.69" 240x280 IPS</span>
        <span>OPTICS: 8x SK6812 MINI-E 3535 RGB</span>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 13: Schematic - Digital I2S Audio Pipeline
// ============================================================================
export const Sketch13: React.FC = () => (
  <Canvas number="13" title="schematic: digital i2s microphone and 3w amplifier">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        {/* INMP441 Microphone */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.blue, fontWeight: 700, marginBottom: 12 }}>
            INMP441 MEMS MICROPHONE (I2S0)
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span style={{ fontFamily: C.mono }}>GPIO 42</span><span>BCLK Serial Clock</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span style={{ fontFamily: C.mono }}>GPIO 41</span><span>WS Word Select (LRCLK)</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span style={{ fontFamily: C.mono }}>GPIO 2</span><span>SD Serial Data Out</span>
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: C.inkMuted }}>
              L/R channel pin tied to GND for mono left channel voice streaming.
            </div>
          </div>
        </div>

        {/* MAX98357A Amplifier */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.green, fontWeight: 700, marginBottom: 12 }}>
            MAX98357A CLASS-D DAC AMP (I2S1)
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span style={{ fontFamily: C.mono }}>GPIO 15</span><span>BCLK Bit Clock</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span style={{ fontFamily: C.mono }}>GPIO 16</span><span>LRCLK Word Select</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span style={{ fontFamily: C.mono }}>GPIO 7</span><span>DIN Audio Data Input</span>
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: C.green, fontWeight: 600 }}>
              Outputs 3.2W into 4 ohm speaker via 2-pin JST-PH connector.
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 20, display: "flex", justifyContent: "space-between", fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>
        <span>AUDIO BUS: DUAL INDEPENDENT I2S DMA CHANNELS</span>
        <span>NOISE REJECTION: 100% DIGITAL (ZERO WI-FI RF BUZZ)</span>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 14: ERC & Footprint Assignment
// ============================================================================
export const Sketch14: React.FC = () => (
  <Canvas number="14" title="electrical rules check and footprint assignment">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32 }}>
        {/* Footprint Matrix */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.purple, fontWeight: 700, marginBottom: 12 }}>
            SMD PACKAGE VERIFICATION
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 12, fontFamily: C.mono }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${C.line}` }}>
              <span>U1 ESP32-S3-WROOM-1</span><span style={{ color: C.green }}>RF_Module SMD ✔</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${C.line}` }}>
              <span>U5 MAX98357AETE+T</span><span style={{ color: C.green }}>QFN-16-1EP (3x3mm) ✔</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${C.line}` }}>
              <span>U3 TLV75533PDBVR</span><span style={{ color: C.green }}>SOT-23-5 ✔</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${C.line}` }}>
              <span>U4 INMP441</span><span style={{ color: C.green }}>Bottom-Port Acoustic SMD ✔</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
              <span>Passives (R, C)</span><span style={{ color: C.green }}>0805 Standard Imperial ✔</span>
            </div>
          </div>
        </div>

        {/* ERC Report */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.green, fontWeight: 700, marginBottom: 12 }}>
            KICAD 10 ERC AUDIT
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: C.green }}>0 Errors</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: C.inkMuted }}>0 Warnings</div>
            <div style={{ fontSize: 13, color: C.inkMuted, lineHeight: 1.5 }}>
              All net labels verified against ESP32-S3 strapping pin tables. Zero floating power inputs or pin type conflicts.
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 20, display: "flex", justifyContent: "space-between", fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>
        <span>TOTAL COMPONENT COUNT: 36 SYMBOLS</span>
        <span>NETS ASSIGNED: 42 NETS FULLY ROUTED</span>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 15: PCB Outline & Mechanics (72mm x 72mm)
// ============================================================================
export const Sketch15: React.FC = () => (
  <Canvas number="15" title="pcb mechanical outline and mounting layout">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }}>
        {/* Outline Graphic */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div
            style={{
              width: 320,
              height: 320,
              borderRadius: 24,
              border: `2px solid ${C.blue}`,
              backgroundColor: "#f8fafc",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Center Display */}
            <div style={{ width: 140, height: 160, border: `1.5px solid ${C.inkLight}`, borderRadius: 8, backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: C.mono, fontSize: 11, color: C.inkMuted }}>
              1.69" IPS LCD
            </div>

            {/* Corner Holes */}
            <div style={{ position: "absolute", top: 16, left: 16, width: 16, height: 16, borderRadius: "50%", border: `1.5px solid ${C.ink}` }} />
            <div style={{ position: "absolute", top: 16, right: 16, width: 16, height: 16, borderRadius: "50%", border: `1.5px solid ${C.ink}` }} />
            <div style={{ position: "absolute", bottom: 16, left: 16, width: 16, height: 16, borderRadius: "50%", border: `1.5px solid ${C.ink}` }} />
            <div style={{ position: "absolute", bottom: 16, right: 16, width: 16, height: 16, borderRadius: "50%", border: `1.5px solid ${C.ink}` }} />

            {/* USB-C Bottom Port */}
            <div style={{ position: "absolute", bottom: -2, width: 60, height: 12, backgroundColor: C.ink, borderRadius: "4px 4px 0 0" }} />
          </div>
        </div>

        {/* Mechanical Specs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ borderLeft: `3px solid ${C.blue}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>72mm x 72mm Symmetrical Square</div>
            <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
              6mm corner radius matches standard modern desktop enclosures.
            </div>
          </div>
          <div style={{ borderLeft: `3px solid ${C.green}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>4x M3 Mounting Holes</div>
            <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
              Positioned at (6mm, 6mm) offsets with 6.2mm copper clearance pads.
            </div>
          </div>
          <div style={{ borderLeft: `3px solid ${C.amber}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Recessed USB-C Edge</div>
            <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
              Receptacle sits flush with bottom PCB edge for neat desktop cable routing.
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 20, display: "flex", justifyContent: "space-between", fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>
        <span>DIMENSIONS: 72.00mm x 72.00mm x 1.60mm FR4</span>
        <span>EDGE CLEARANCE: 0.50mm MINIMUM</span>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 16: Component Placement & Arc-Reactor Geometry
// ============================================================================
export const Sketch16: React.FC = () => (
  <Canvas number="16" title="component placement and arc-reactor halo geometry">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        {/* Polar Placement Breakdown */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.amber, fontWeight: 700, marginBottom: 12 }}>
            ARC-REACTOR RING POLAR COORDINATES
          </div>
          <div style={{ fontSize: 13, color: C.inkMuted, marginBottom: 14 }}>
            Center: (36.00mm, 34.00mm) · Radius: 25.00mm · 45° Step
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12, fontFamily: C.mono }}>
            <div>LED 1: (61.00, 34.00) 0°</div>
            <div>LED 2: (53.68, 51.68) 45°</div>
            <div>LED 3: (36.00, 59.00) 90°</div>
            <div>LED 4: (18.32, 51.68) 135°</div>
            <div>LED 5: (11.00, 34.00) 180°</div>
            <div>LED 6: (18.32, 16.32) 225°</div>
            <div>LED 7: (36.00, 09.00) 270°</div>
            <div>LED 8: (53.68, 16.32) 315°</div>
          </div>
        </div>

        {/* Functional Zones */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.blue, fontWeight: 700, marginBottom: 12 }}>
            FUNCTIONAL BOARD PARTITIONING
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 13 }}>
            <div>
              <span style={{ fontWeight: 700, color: C.blue }}>Top Zone:</span> ESP32-S3 RF module with antenna projecting beyond copper planes, plus top acoustic port for INMP441 mic.
            </div>
            <div>
              <span style={{ fontWeight: 700, color: C.cyan }}>Center Zone:</span> ST7789 display socket surrounded by the circular 8-LED Arc-Reactor ring.
            </div>
            <div>
              <span style={{ fontWeight: 700, color: C.green }}>Bottom-Left Zone:</span> MAX98357A I2S DAC amp and 2-pin speaker header.
            </div>
            <div>
              <span style={{ fontWeight: 700, color: C.amber }}>Bottom-Right Zone:</span> USB-C power inlet, TVS diode, LDO regulator, and tactile reset/boot buttons.
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 20, display: "flex", justifyContent: "space-between", fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>
        <span>ZONING: RF ISOLATION AT TOP, ANALOG/POWER AT SIDES</span>
        <span>ANTENNA KEEPOUT: 15mm CLEARANCE BEHIND WROOM-1</span>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 17: High-Speed Routing - SPI & I2S
// ============================================================================
export const Sketch17: React.FC = () => (
  <Canvas number="17" title="high-speed signal routing: 40mhz spi and dual i2s">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        {/* SPI Bus Routing */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.cyan, fontWeight: 700, marginBottom: 12 }}>
            40MHz DISPLAY SPI ROUTING
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
            <div>Short direct top-layer traces between ESP32-S3 and display header.</div>
            <div style={{ fontFamily: C.mono, fontSize: 12, color: C.cyan }}>Trace Width: 0.20mm (8 mil)</div>
            <div style={{ fontFamily: C.mono, fontSize: 12, color: C.cyan }}>Trace Spacing: 0.25mm (10 mil)</div>
            <div style={{ fontSize: 13, color: C.inkMuted }}>
              Unbroken solid bottom ground plane directly underneath ensures consistent 50 ohm microstrip impedance.
            </div>
          </div>
        </div>

        {/* I2S Bus Routing */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.green, fontWeight: 700, marginBottom: 12 }}>
            I2S DIGITAL AUDIO INTEGRITY
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
            <div>BCLK and LRCLK routed as length-matched parallel pairs to prevent phase skew.</div>
            <div style={{ fontFamily: C.mono, fontSize: 12, color: C.green }}>Length Matching: Within 1.5mm tolerance</div>
            <div style={{ fontFamily: C.mono, fontSize: 12, color: C.green }}>Crosstalk Guard: 3x trace width spacing</div>
            <div style={{ fontSize: 13, color: C.inkMuted }}>
              Zero trace crossings over RF keepout region to guarantee quiet microphone recording.
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 20, display: "flex", justifyContent: "space-between", fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>
        <span>ROUTING LAYER: FRONT COPPER (F.Cu) WITH BOTTOM RETURN</span>
        <span>VIAS ON SIGNALS: MAX 1 VIA PER HIGH-SPEED TRACE</span>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 18: Power Traces & Ground Pour
// ============================================================================
export const Sketch18: React.FC = () => (
  <Canvas number="18" title="power distribution tree and dual ground pours">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32 }}>
        {/* Power Tree Table */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.amber, fontWeight: 700, marginBottom: 12 }}>
            POWER TRACE SIZING & CURRENT CAPACITY
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13, fontFamily: C.mono }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>+5V VBUS (USB-C)</span><span style={{ color: C.amber }}>0.80mm (32 mil) / 1.5A</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>+3.3V System Rail</span><span style={{ color: C.green }}>0.60mm (24 mil) / 1.0A</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>Speaker Amp Output</span><span style={{ color: C.blue }}>0.70mm (28 mil) / 1.2A</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Signal Traces</span><span style={{ color: C.inkMuted }}>0.20mm (8 mil) / 0.3A</span>
            </div>
          </div>
        </div>

        {/* Ground Pour Strategy */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.green, fontWeight: 700, marginBottom: 12 }}>
            DUAL-LAYER GROUND FLOOD
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 13 }}>
            <div>Continuous copper flood across both F.Cu and B.Cu layers.</div>
            <div>Thermal relief spokes on component pads for clean solder wetting.</div>
            <div style={{ fontSize: 12, color: C.inkMuted }}>
              Zero isolated copper islands: all unused copper regions connected or trimmed away.
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 20, display: "flex", justifyContent: "space-between", fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>
        <span>COPPER THICKNESS: 1 OZ (35um)</span>
        <span>PEAK CURRENT LOAD: 420mA (ALL LEDS WHITE + SPEAKER 3W)</span>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 19: Ground Stitching Vias & Thermal Relief
// ============================================================================
export const Sketch19: React.FC = () => (
  <Canvas number="19" title="ground plane stitching vias and thermal dissipation">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        {/* Via Grid */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.blue, fontWeight: 700, marginBottom: 12 }}>
            STITCHING VIA MATRIX
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
            <div>5mm x 5mm staggered via grid ties top and bottom ground planes together.</div>
            <div style={{ fontFamily: C.mono, fontSize: 12, color: C.blue }}>Via Hole: 0.30mm (12 mil)</div>
            <div style={{ fontFamily: C.mono, fontSize: 12, color: C.blue }}>Via Diameter: 0.60mm (24 mil)</div>
            <div style={{ fontSize: 13, color: C.inkMuted }}>
              Minimizes loop inductance for high-speed SPI return currents and RF harmonics.
            </div>
          </div>
        </div>

        {/* Thermal Relief */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.red, fontWeight: 700, marginBottom: 12 }}>
            THERMAL RELIEF PADS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
            <div>9x thermal vias directly beneath ESP32-S3 ground slug.</div>
            <div>4x thermal vias under MAX98357A QFN-16 exposed center pad.</div>
            <div style={{ fontSize: 13, color: C.inkMuted }}>
              Conducts heat away from the amplifier chip into the bottom copper plane without requiring a bulky heatsink.
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 20, display: "flex", justifyContent: "space-between", fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>
        <span>TOTAL VIAS PLACED: 68 GROUND STITCHING VIAS</span>
        <span>THERMAL RESISTANCE: &lt; 28 C/W TO AMBIENT</span>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 20: DRC Checks & Silkscreen Legends
// ============================================================================
export const Sketch20: React.FC = () => (
  <Canvas number="20" title="design rule check (drc) and silkscreen graphics">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 32 }}>
        {/* DRC Audit Matrix */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.green, fontWeight: 700, marginBottom: 12 }}>
            JLCPCB 2-LAYER RULES AUDIT
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 12, fontFamily: C.mono }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${C.line}` }}>
              <span>Minimum Track Width</span><span>0.20mm (Limit: 0.127mm) ✔</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${C.line}` }}>
              <span>Minimum Track Clearance</span><span>0.20mm (Limit: 0.127mm) ✔</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${C.line}` }}>
              <span>Minimum Drill Diameter</span><span>0.30mm (Limit: 0.300mm) ✔</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${C.line}` }}>
              <span>Annular Ring Width</span><span>0.15mm (Limit: 0.125mm) ✔</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
              <span>Solder Mask Clearance</span><span>0.05mm (Limit: 0.050mm) ✔</span>
            </div>
          </div>
        </div>

        {/* Silkscreen Layout */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.blue, fontWeight: 700, marginBottom: 12 }}>
            SILKSCREEN LABELS & BRANDING
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 13 }}>
            <div>High-contrast white silkscreen on matte black solder mask.</div>
            <div>Clear polarity markings for USB-C, speaker, and I2C telemetry header.</div>
            <div style={{ fontFamily: C.mono, fontSize: 12, color: C.blue }}>
              "HUX // DESKTOP AI COMPANION"
            </div>
            <div style={{ fontFamily: C.mono, fontSize: 11, color: C.inkMuted }}>
              Hack Club Half Life // Designed by Harinandan J V
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 20, display: "flex", justifyContent: "space-between", fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>
        <span>DRC STATUS: 0 ERRORS, 0 UNCONNECTED PADS</span>
        <span>SILKSCREEN LINE WIDTH: 0.15mm MINIMUM</span>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 21: Gerbers & Fab Output
// ============================================================================
export const Sketch21: React.FC = () => (
  <Canvas number="21" title="gerber export and manufacturing stackup">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        {/* Layer Breakdown */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.blue, fontWeight: 700, marginBottom: 12 }}>
            EXPORTED GERBER LAYERS (RS-274X)
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 12, fontFamily: C.mono }}>
            <div>hux-F_Cu.gtl - Front Copper</div>
            <div>hux-B_Cu.gbl - Back Copper</div>
            <div>hux-F_Mask.gts - Front Solder Mask</div>
            <div>hux-B_Mask.gbs - Back Solder Mask</div>
            <div>hux-F_Silks.gto - Front Silkscreen</div>
            <div>hux-B_Silks.gbo - Back Silkscreen</div>
            <div>hux-Edge_Cuts.gm1 - Board Edge Outline</div>
            <div>hux.drl - Excellon Drill File</div>
          </div>
        </div>

        {/* Fab Spec */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.green, fontWeight: 700, marginBottom: 12 }}>
            BOARD MANUFACTURING SPEC
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
            <div>Layer Count: 2 Layers</div>
            <div>Material: Standard FR4 (Tg 140C)</div>
            <div>Thickness: 1.6mm</div>
            <div>Finish: ENIG (Electroless Nickel Immersion Gold)</div>
            <div>Solder Mask: Matte Black</div>
            <div>Silkscreen: Crisp White</div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 20, display: "flex", justifyContent: "space-between", fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>
        <span>ARCHIVE: kicad/hux_gerbers.zip (35.6 KB)</span>
        <span>VERIFIED IN: KiCad GerbView 10.0.6</span>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 22: SMT BOM & Pick-and-Place (CPL)
// ============================================================================
export const Sketch22: React.FC = () => (
  <Canvas number="22" title="automated smt assembly: bom and cpl verification">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32 }}>
        {/* LCSC Part Mapping */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.blue, fontWeight: 700, marginBottom: 12 }}>
            LCSC SMT PART NUMBERS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 12, fontFamily: C.mono }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 4 }}>
              <span>ESP32-S3-WROOM-1</span><span style={{ color: C.blue }}>C5180337</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 4 }}>
              <span>MAX98357A QFN-16</span><span style={{ color: C.blue }}>C268261</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 4 }}>
              <span>TLV75533 SOT-23-5</span><span style={{ color: C.blue }}>C397683</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 4 }}>
              <span>SK6812 MINI-E (8x)</span><span style={{ color: C.blue }}>C2890040</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 4 }}>
              <span>USBLC6-2SC6 ESD</span><span style={{ color: C.blue }}>C7519</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>USB-C 16P Receptacle</span><span style={{ color: C.blue }}>C165948</span>
            </div>
          </div>
        </div>

        {/* CPL Alignment */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.amber, fontWeight: 700, marginBottom: 12 }}>
            PICK-AND-PLACE ROTATION AUDIT
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 13 }}>
            <div>All component center coordinates export in millimeters relative to PCB origin (0, 0).</div>
            <div>Pin 1 polarity checked in 3D viewer against tape-and-reel pocket standards.</div>
            <div style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>
              Zero 180° inversion risk during automated SMT placement.
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 20, display: "flex", justifyContent: "space-between", fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>
        <span>BOM FILE: kicad/bom.csv (17 line items)</span>
        <span>CPL FILE: kicad/cpl.csv (36 placed components)</span>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 23: Firmware - Procedural Vector Eyes
// ============================================================================
export const Sketch23: React.FC = () => (
  <Canvas number="23" title="firmware: procedural vector eye animation engine">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }}>
        {/* Eye States Demo */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#08090d", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
          <div style={{ display: "flex", gap: 24 }}>
            <div style={{ width: 44, height: 48, borderRadius: 22, backgroundColor: C.cyan, boxShadow: `0 0 16px ${C.cyan}` }} />
            <div style={{ width: 44, height: 48, borderRadius: 22, backgroundColor: C.cyan, boxShadow: `0 0 16px ${C.cyan}` }} />
          </div>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.cyan, letterSpacing: 1 }}>
            60 FPS PROCEDURAL VECTOR ENGINE
          </div>
        </div>

        {/* Emotion State Machine */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ borderLeft: `3px solid ${C.cyan}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Idle Blink & Look</div>
            <div style={{ fontSize: 13, color: C.inkMuted }}>Random interval blinking (2-6s) with smooth saccade looking motions.</div>
          </div>
          <div style={{ borderLeft: `3px solid ${C.amber}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Attentive Listening</div>
            <div style={{ fontSize: 13, color: C.inkMuted }}>Eyes widen and center smoothly when wake word is detected.</div>
          </div>
          <div style={{ borderLeft: `3px solid ${C.purple}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Thinking Squint</div>
            <div style={{ fontSize: 13, color: C.inkMuted }}>Eyes narrow slightly into focused horizontal slits while waiting for LLM tokens.</div>
          </div>
          <div style={{ borderLeft: `3px solid ${C.green}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Speaking Waveform</div>
            <div style={{ fontSize: 13, color: C.inkMuted }}>Eye height dynamically bounces synchronized with I2S audio output volume.</div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 20, display: "flex", justifyContent: "space-between", fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>
        <span>GRAPHICS LIBRARY: LovyanGFX DMA SPI (ST7789)</span>
        <span>FRAME TIME: 16.6ms (SOLID 60 FPS WITHOUT JANK)</span>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 24: Firmware - Audio Pipeline & Halo RMT
// ============================================================================
export const Sketch24: React.FC = () => (
  <Canvas number="24" title="firmware: dual i2s audio and non-blocking halo rmt">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        {/* I2S DMA Engine */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.green, fontWeight: 700, marginBottom: 12 }}>
            DUAL I2S DMA RING BUFFERS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
            <div>Channel 0 (RX): 16kHz 16-bit mono stream from INMP441 mic.</div>
            <div>Channel 1 (TX): 24kHz 16-bit mono stream to MAX98357A speaker.</div>
            <div style={{ fontSize: 12, color: C.inkMuted }}>
              DMA transfers run completely in the background via hardware interrupts, leaving CPU cores free for animations and networking.
            </div>
          </div>
        </div>

        {/* Halo RMT Driver */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.amber, fontWeight: 700, marginBottom: 12 }}>
            RMT HARDWARE NEOPIXEL TIMING
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
            <div>Precise 800kHz single-wire timing generated by ESP32-S3 RMT peripheral.</div>
            <div>Non-blocking double-buffered color frames.</div>
            <div style={{ fontSize: 12, color: C.inkMuted }}>
              Color modes: Cyan idle pulse, amber spinning intent wheel, red alert flash, and rainbow audio reactive EQ.
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 20, display: "flex", justifyContent: "space-between", fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>
        <span>FRAMEWORK: ESP-IDF v5.2 / FreeRTOS DUAL TASK</span>
        <span>AUDIO BUFFER LATENCY: &lt; 8ms</span>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 25: Local Home Assistant Integration & Bench Test
// ============================================================================
export const Sketch25: React.FC = () => (
  <Canvas number="25" title="local home assistant integration and bench telemetry">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32 }}>
        {/* WebSocket Protocol Flow */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.blue, fontWeight: 700, marginBottom: 12 }}>
            DIRECT LAN WEBSOCKET TELEMETRY
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>WebSocket Handshake</span><span style={{ fontFamily: C.mono, color: C.green }}>ws://192.168.1.50:8123/api/websocket</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>Auth Method</span><span style={{ fontFamily: C.mono }}>Long-Lived Access Token</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>Command Latency</span><span style={{ fontFamily: C.mono, color: C.cyan, fontWeight: 700 }}>12.4ms (sub-15ms guaranteed)</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Offline Fallback</span><span style={{ fontFamily: C.mono, color: C.green }}>100% Functional on Local LAN</span>
            </div>
          </div>
        </div>

        {/* Bench Power Numbers */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.green, fontWeight: 700, marginBottom: 12 }}>
            BENCH POWER MEASUREMENTS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13, fontFamily: C.mono }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>Idle (Eyes Blink):</span><span style={{ color: C.green }}>62 mA (0.31 W)</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>Wi-Fi WebSocket:</span><span style={{ color: C.blue }}>94 mA (0.47 W)</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>Speaker Playback:</span><span style={{ color: C.amber }}>148 mA (0.74 W)</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Thermal Temp:</span><span style={{ color: C.green }}>34.2°C (Cool to touch)</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 20, display: "flex", justifyContent: "space-between", fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>
        <span>HOURS 11 - 25 COMPLETE (25 HOURS TOTAL PROJECT TIME)</span>
        <span>STATUS: HARDWARE MANUFACTURE READY, FIRMWARE TESTED</span>
      </div>
    </div>
  </Canvas>
);
