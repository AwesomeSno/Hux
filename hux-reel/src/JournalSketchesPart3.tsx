import React from "react";

// ============================================================================
// SLEEK, MINIMAL GRAPHIC-FIRST MAKER STYLE - PART 3 (HOURS 26 - 33)
// Open canvas, crisp vector graphics, high whitespace, zero corporate cards.
// Strictly ZERO em dashes or en dashes anywhere.
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
// SKETCH 26: 3D CAD Enclosure Design & Display Snap-Fit
// ============================================================================
export const Sketch26: React.FC = () => (
  <Canvas number="26" title="enclosure mechanical architecture and display snap-fit">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 32, alignItems: "center" }}>
        {/* CAD Schematic Representation */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.blue, fontWeight: 700, marginBottom: 12 }}>
            PARAMETRIC CAD ASSEMBLY // FUSION 360
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ border: `1.5px solid ${C.blue}`, padding: "14px 18px", borderRadius: 8, backgroundColor: "#eff6ff" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: C.blue }}>Front Bezel Ring</div>
              <div style={{ fontFamily: C.mono, fontSize: 11, color: C.inkMuted }}>72mm outer dia / 0.2mm snap-fit lips</div>
            </div>
            <div style={{ border: `1.5px solid ${C.cyan}`, padding: "14px 18px", borderRadius: 8, backgroundColor: "#f0f9ff" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: C.cyan }}>Diffuser Channel</div>
              <div style={{ fontFamily: C.mono, fontSize: 11, color: C.inkMuted }}>Holds 1.69 inch IPS screen + 8x NeoPixel acrylic ring</div>
            </div>
            <div style={{ border: `1.5px solid ${C.inkLight}`, padding: "14px 18px", borderRadius: 8, backgroundColor: "#fff" }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Main Cylindrical Shell</div>
              <div style={{ fontFamily: C.mono, fontSize: 11, color: C.inkMuted }}>12-degree upward viewing tilt / 4x M3 brass heat-set bosses</div>
            </div>
          </div>
        </div>

        {/* Technical Callout */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ borderLeft: `3px solid ${C.blue}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>12-Degree Ergonomic Angle</div>
            <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
              Positions screen normal vector toward user eyes at standard 60cm desk sitting distance.
            </div>
          </div>
          <div style={{ borderLeft: `3px solid ${C.cyan}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Heat-Set Brass Inserts</div>
            <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
              Four M3 x 4mm threaded inserts melted into 4.2mm pilot holes at 58mm square pitch.
            </div>
          </div>
          <div style={{ borderLeft: `3px solid ${C.green}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Serviceable Snap-Fit</div>
            <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
              Three cantilever snap latches allow toolless removal of bezel for screen servicing.
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 20, display: "flex", justifyContent: "space-between", fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>
        <span>CAD REPO: cad/hux_body_v2.step</span>
        <span>STATUS: PARAMETRIC CONSTRAINTS LOCKED</span>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 27: Acoustic Speaker Cavity & Mic Dampening Baffle
// ============================================================================
export const Sketch27: React.FC = () => (
  <Canvas number="27" title="isolated acoustic speaker cavity and mic dampening baffle">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 32 }}>
        {/* Acoustic Chambers Cross Section */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.purple, fontWeight: 700, marginBottom: 14 }}>
            ACOUSTIC ARCHITECTURE CROSS SECTION
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ border: `1.5px solid ${C.purple}`, padding: 14, borderRadius: 8, backgroundColor: "#faf5ff" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: C.purple }}>Rear Speaker Chamber</div>
              <div style={{ fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>Volume: 18.5 cm3 / Sealed air suspension</div>
            </div>
            <div style={{ border: `1.5px solid ${C.amber}`, padding: 14, borderRadius: 8, backgroundColor: "#fffbeb" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: C.amber }}>Silicone Acoustic Barrier</div>
              <div style={{ fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>1.5mm high-density gasket isolates mic from backwave</div>
            </div>
            <div style={{ border: `1.5px solid ${C.green}`, padding: 14, borderRadius: 8, backgroundColor: "#f0fdf4" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: C.green }}>Front Acoustic Port</div>
              <div style={{ fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>Tuned port tuned to 280Hz fundamental voice resonance</div>
            </div>
          </div>
        </div>

        {/* Spec Callouts */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ borderLeft: `3px solid ${C.purple}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Anti-Vibration Isolation</div>
            <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
              Separates the 3W speaker backwave pressure from the INMP441 MEMS microphone cavity.
            </div>
          </div>
          <div style={{ borderLeft: `3px solid ${C.amber}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Zero Acoustic Feedback</div>
            <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
              Prevents the bot from hearing its own voice and triggering false wake word loops.
            </div>
          </div>
          <div style={{ borderLeft: `3px solid ${C.blue}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Speaker Specs</div>
            <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
              28mm circular neodymium driver, 4-ohm impedance, 3W RMS rating.
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 20, display: "flex", justifyContent: "space-between", fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>
        <span>CHAMBER VOLUME: 18.5 CM3</span>
        <span>RESONANCE FREQUENCY: 280 HZ</span>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 28: 3D Slicing Parameters & Fitment Tolerances
// ============================================================================
export const Sketch28: React.FC = () => (
  <Canvas number="28" title="3d print slicing parameters and mechanical tolerance checks">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        {/* Slicer Settings */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.blue, fontWeight: 700, marginBottom: 14 }}>
            SLICER SETTINGS // MATTE BLACK PETG
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontFamily: C.mono, fontSize: 13 }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>Layer Height</span><span style={{ fontWeight: 700 }}>0.16mm (Fine)</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>Perimeter Walls</span><span style={{ fontWeight: 700 }}>4 Walls (1.6mm)</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>Infill Density</span><span style={{ fontWeight: 700 }}>20% Gyroid</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>Nozzle Temperature</span><span style={{ fontWeight: 700 }}>245 deg C</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Bed Temperature</span><span style={{ fontWeight: 700 }}>75 deg C (Textured PEI)</span>
            </div>
          </div>
        </div>

        {/* Fitment Tolerance Check */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.green, fontWeight: 700, marginBottom: 14 }}>
            MEASURED PHYSICAL CLEARANCES
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontFamily: C.mono, fontSize: 13 }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>Bezel Screen Pocket</span><span style={{ color: C.green, fontWeight: 700 }}>+0.20mm (Smooth fit)</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>M3 Insert Pilot Holes</span><span style={{ color: C.green, fontWeight: 700 }}>4.15mm (Interference)</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>USB-C Port Cutout</span><span style={{ color: C.green, fontWeight: 700 }}>9.2mm x 3.6mm</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>PCB Outer Perimeter</span><span style={{ color: C.green, fontWeight: 700 }}>72.4mm (0.4mm gap)</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Display Glass Reveal</span><span style={{ color: C.green, fontWeight: 700 }}>Flush 0.0mm coplanar</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 20, display: "flex", justifyContent: "space-between", fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>
        <span>MATERIAL: MATTE BLACK PETG</span>
        <span>TEST FIT: 100% SUCCESSFUL (ZERO BINDING)</span>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 29: Thermal Dissipation & Airflow Convection
// ============================================================================
export const Sketch29: React.FC = () => (
  <Canvas number="29" title="thermal dissipation modeling and convective venting channels">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32 }}>
        {/* Thermal Airflow Model */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.amber, fontWeight: 700, marginBottom: 14 }}>
            PASSIVE CONVECTIVE CHIMNEY AIRFLOW
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div style={{ border: `1.5px solid ${C.cyan}`, padding: "12px 16px", borderRadius: 8, textAlign: "center", backgroundColor: "#f0f9ff" }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: C.cyan }}>Base Vents</div>
              <div style={{ fontFamily: C.mono, fontSize: 11, color: C.inkMuted }}>Cool intake 22 deg C</div>
            </div>
            <span style={{ fontFamily: C.mono, fontSize: 18, color: C.blue }}>→</span>
            <div style={{ border: `1.5px solid ${C.amber}`, padding: "12px 16px", borderRadius: 8, textAlign: "center", backgroundColor: "#fffbeb" }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: C.amber }}>PCB Copper Core</div>
              <div style={{ fontFamily: C.mono, fontSize: 11, color: C.inkMuted }}>Heat slug dissipation</div>
            </div>
            <span style={{ fontFamily: C.mono, fontSize: 18, color: C.amber }}>→</span>
            <div style={{ border: `1.5px solid ${C.red}`, padding: "12px 16px", borderRadius: 8, textAlign: "center", backgroundColor: "#fef2f2" }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: C.red }}>Top Exhaust</div>
              <div style={{ fontFamily: C.mono, fontSize: 11, color: C.inkMuted }}>Warm exhaust 34 deg C</div>
            </div>
          </div>
        </div>

        {/* Temperature Points */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ borderLeft: `3px solid ${C.green}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>ESP32-S3 Package</div>
            <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
              34.2 deg C during 100% active Wi-Fi transmit bursts (safe limit: 85 deg C).
            </div>
          </div>
          <div style={{ borderLeft: `3px solid ${C.amber}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>MAX98357A Audio Slug</div>
            <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
              36.8 deg C at 3W continuous sine sweep test into 4-ohm load.
            </div>
          </div>
          <div style={{ borderLeft: `3px solid ${C.blue}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Internal Air Cavity</div>
            <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
              Stays within 6 deg C of ambient room temperature with zero active fan noise.
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 20, display: "flex", justifyContent: "space-between", fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>
        <span>THERMAL REGIME: 100% PASSIVE CONVECTION</span>
        <span>PEAK TEMPERATURE: 36.8 DEG C (STABLE)</span>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 30: On-Device Wake Word & Audio DSP Pipeline
// ============================================================================
export const Sketch30: React.FC = () => (
  <Canvas number="30" title="on-device wake word pipeline and dsp audio ring buffer">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32 }}>
        {/* DSP Flow Diagram */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.blue, fontWeight: 700, marginBottom: 14 }}>
            ESP-SR (SKAINET) ON-DEVICE WAKE WORD ARCHITECTURE
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ border: `1.5px solid ${C.inkLight}`, padding: "10px 14px", borderRadius: 8, fontSize: 13, fontWeight: 700, backgroundColor: "#fff" }}>
                INMP441 I2S Mic
              </div>
              <span style={{ fontFamily: C.mono, color: C.blue }}>→</span>
              <div style={{ border: `1.5px solid ${C.cyan}`, padding: "10px 14px", borderRadius: 8, fontSize: 13, fontWeight: 700, backgroundColor: "#f0f9ff" }}>
                DMA 32KB Ring Buffer
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ border: `1.5px solid ${C.purple}`, padding: "10px 14px", borderRadius: 8, fontSize: 13, fontWeight: 700, backgroundColor: "#faf5ff" }}>
                AEC / NS Pre-Filter
              </div>
              <span style={{ fontFamily: C.mono, color: C.blue }}>→</span>
              <div style={{ border: `1.5px solid ${C.green}`, padding: "10px 14px", borderRadius: 8, fontSize: 13, fontWeight: 700, backgroundColor: "#f0fdf4" }}>
                WakeNet Model (Hey Hux)
              </div>
            </div>
          </div>
        </div>

        {/* DSP Specs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ borderLeft: `3px solid ${C.blue}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Sampling Rate</div>
            <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
              16kHz 16-bit mono PCM stream with zero frame drops using dual DMA descriptors.
            </div>
          </div>
          <div style={{ borderLeft: `3px solid ${C.green}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Detection Latency</div>
            <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
              Under 80ms detection from phoneme completion to wake trigger callback.
            </div>
          </div>
          <div style={{ borderLeft: `3px solid ${C.purple}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Hardware Acceleration</div>
            <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
              Runs on ESP32-S3 Xtensa LX7 AI vector instructions with under 22% Core 1 CPU load.
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 20, display: "flex", justifyContent: "space-between", fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>
        <span>MODEL: WAKENET9 / HEY HUX</span>
        <span>CORE 1 DSP LOAD: 21.4%</span>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 31: Local Home Assistant Voice Assistant Pipeline
// ============================================================================
export const Sketch31: React.FC = () => (
  <Canvas number="31" title="local home assistant voice assistant pipeline architecture">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32 }}>
        {/* Pipeline Diagram */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.cyan, fontWeight: 700, marginBottom: 14 }}>
            DIRECT LOCAL WEBSOCKET PIPELINE (WYOMING PROTOCOL)
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontFamily: C.mono, fontSize: 13 }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>1. Audio Stream</span><span style={{ color: C.blue, fontWeight: 700 }}>Hux to HA Whisper STT</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>2. Intent Parse</span><span style={{ color: C.green, fontWeight: 700 }}>Home Assistant Assist</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>3. TTS Stream</span><span style={{ color: C.purple, fontWeight: 700 }}>Piper 22kHz to Hux I2S</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Roundtrip Delay</span><span style={{ color: C.green, fontWeight: 700 }}>182ms total voice loop</span>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ borderLeft: `3px solid ${C.green}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>100% On-Premise Privacy</div>
            <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
              Zero external cloud calls or subscriptions. Completely functional without internet.
            </div>
          </div>
          <div style={{ borderLeft: `3px solid ${C.cyan}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Real-Time Binary Frames</div>
            <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
              Raw Opus/PCM packets stream over dedicated LAN WebSocket without HTTP overhead.
            </div>
          </div>
          <div style={{ borderLeft: `3px solid ${C.blue}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Device Control</div>
            <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
              Direct light switches, HVAC, media, and sensor query execution in under 20ms.
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 20, display: "flex", justifyContent: "space-between", fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>
        <span>PROTOCOL: WYOMING BINARY WEBSOCKET</span>
        <span>LATENCY: 182MS (MIC TO EAR)</span>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 32: 6-State Emotive Vector Eye & Halo State Machine
// ============================================================================
export const Sketch32: React.FC = () => (
  <Canvas number="32" title="emotive behavior tree and procedural vector eye states">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* State Table 1 */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 20, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.blue, fontWeight: 700, marginBottom: 12 }}>
            INTERACTION STATES (1 - 3)
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ borderLeft: `3px solid ${C.cyan}`, paddingLeft: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>1. IDLE_GAZE</div>
              <div style={{ fontSize: 12, color: C.inkMuted }}>Natural blinks every 3-5s, soft ambient saccades</div>
            </div>
            <div style={{ borderLeft: `3px solid ${C.blue}`, paddingLeft: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>2. LISTENING</div>
              <div style={{ fontSize: 12, color: C.inkMuted }}>Pupils dilate +18%, cyan breathing halo ring</div>
            </div>
            <div style={{ borderLeft: `3px solid ${C.purple}`, paddingLeft: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>3. THINKING</div>
              <div style={{ fontSize: 12, color: C.inkMuted }}>Eyes glance up, clockwise rotating amber halo</div>
            </div>
          </div>
        </div>

        {/* State Table 2 */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 20, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.green, fontWeight: 700, marginBottom: 12 }}>
            RESPONSE & ALERT STATES (4 - 6)
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ borderLeft: `3px solid ${C.green}`, paddingLeft: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>4. SPEAKING</div>
              <div style={{ fontSize: 12, color: C.inkMuted }}>Lower HUD waveform bounces with audio volume</div>
            </div>
            <div style={{ borderLeft: `3px solid ${C.green}`, paddingLeft: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>5. SUCCESS</div>
              <div style={{ fontSize: 12, color: C.inkMuted }}>Quick green double flash + happy eye arc shape</div>
            </div>
            <div style={{ borderLeft: `3px solid ${C.amber}`, paddingLeft: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>6. ALERT</div>
              <div style={{ fontSize: 12, color: C.inkMuted }}>Amber warning pulse for notifications and alarms</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 20, display: "flex", justifyContent: "space-between", fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>
        <span>RENDER REFRESH: 60 FPS DMA</span>
        <span>STATES IMPLEMENTED: 6 EMOTIVE MODES</span>
      </div>
    </div>
  </Canvas>
);

// ============================================================================
// SKETCH 33: Full Prototype Benchtop Assembly & System Benchmarking
// ============================================================================
export const Sketch33: React.FC = () => (
  <Canvas number="33" title="full system benchtop assembly and power telemetry benchmark">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32 }}>
        {/* Measured Bench Telemetry */}
        <div style={{ border: `1.5px solid ${C.lineDark}`, borderRadius: 16, padding: 24, backgroundColor: "#fafbfc" }}>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.green, fontWeight: 700, marginBottom: 14 }}>
            MEASURED BENCHMARK TELEMETRY // 5.0V USB-C SUPPLY
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontFamily: C.mono, fontSize: 13 }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>Idle Current (Listening)</span><span style={{ color: C.green, fontWeight: 700 }}>58 mA (0.29 W)</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>Screen On (60fps Eyes)</span><span style={{ color: C.green, fontWeight: 700 }}>82 mA (0.41 W)</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>Active Speaking (3W Audio)</span><span style={{ color: C.amber, fontWeight: 700 }}>138 mA (0.69 W)</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <span>Peak Wi-Fi TX Burst</span><span style={{ color: C.blue, fontWeight: 700 }}>245 mA (1.22 W)</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Wi-Fi Packet Loss (6h Run)</span><span style={{ color: C.green, fontWeight: 700 }}>0.00% (Zero drops)</span>
            </div>
          </div>
        </div>

        {/* Milestone Milestones */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ borderLeft: `3px solid ${C.green}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Full Hardware Verified</div>
            <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
              ESP32-S3, 1.69 inch IPS display, I2S mic and amp, and 8x NeoPixel halo tested on bench.
            </div>
          </div>
          <div style={{ borderLeft: `3px solid ${C.blue}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>CAD Shells Printed</div>
            <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
              PETG matte black enclosure parts test-fitted with heat-set brass inserts and acoustic seal.
            </div>
          </div>
          <div style={{ borderLeft: `3px solid ${C.purple}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Sprint 03 Ready</div>
            <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
              Hux is officially 33 hours logged and primed for board manufacturing and final assembly.
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 20, display: "flex", justifyContent: "space-between", fontFamily: C.mono, fontSize: 12, color: C.inkMuted }}>
        <span>CUMULATIVE PROJECT LOGGED: 33 HOURS</span>
        <span>BENCH STATUS: 100% OPERATIONAL</span>
      </div>
    </div>
  </Canvas>
);
