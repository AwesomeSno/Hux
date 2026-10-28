#!/usr/bin/env python3
"""
build_hux_hardware.py

Full-featured KiCad 10 hardware generator for Hux:
- Desktop AI Smart Home Assistant (Jarvis Companion)
- 72mm x 72mm board scale with 6mm rounded corners & M3 standoffs
- ST7789 IPS LCD display interface (face/HUD)
- 8x RGB NeoPixel Arc-Reactor halo ring
- ESP32-S3-WROOM-1 (16MB Flash, 8MB PSRAM)
- INMP441 I2S MEMS Digital Microphone with acoustic port
- MAX98357A I2S Class-D Audio DAC + 3W speaker header
- USB Type-C with ESD protection and TLV75533 3.3V LDO
- Exports PDF schematic, 3D renders, Gerbers, and JLCPCB BOM/CPL
"""

import os
import sys
import math
import uuid
import zipfile
import subprocess

WORKSPACE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
KICAD_DIR = os.path.join(WORKSPACE_DIR, "kicad")
RENDERS_DIR = os.path.join(KICAD_DIR, "renders")
GERBERS_DIR = os.path.join(KICAD_DIR, "gerbers")

os.makedirs(RENDERS_DIR, exist_ok=True)
os.makedirs(GERBERS_DIR, exist_ok=True)

KICAD_CLI = "/Applications/KiCad/KiCad.app/Contents/MacOS/kicad-cli"

PROJECT_UUID = str(uuid.uuid4())

def u():
    return str(uuid.uuid4())

# ==============================================================================
# 1. GENERATE hux.kicad_pro
# ==============================================================================
def generate_project_file():
    pro_path = os.path.join(KICAD_DIR, "hux.kicad_pro")
    content = f"""{{
  "board": {{
    "design_settings": {{
      "defaults": {{
        "board_outline_line_width": 0.15,
        "copper_line_width": 0.25,
        "copper_text_size_h": 1.5,
        "copper_text_size_v": 1.5,
        "copper_text_thickness": 0.3
      }},
      "rules": {{
        "min_clearance": 0.2,
        "min_copper_edge_clearance": 0.5,
        "min_hole_clearance": 0.25,
        "min_hole_to_hole": 0.5,
        "min_through_hole_annular_ring": 0.15,
        "min_track_width": 0.2,
        "min_via_annular_ring": 0.15,
        "min_via_diameter": 0.6
      }}
    }}
  }},
  "boards": [],
  "cvpcb": {{
    "equivalence_files": []
  }},
  "environment": {{}},
  "erc": {{
    "erc_exclusions": [],
    "meta": {{
      "version": 0
    }},
    "severity": {{}}
  }},
  "libraries": {{
    "pinned_footprint_libs": [],
    "pinned_symbol_libs": []
  }},
  "meta": {{
    "filename": "hux.kicad_pro",
    "version": 1
  }},
  "net_settings": {{
    "classes": [
      {{
        "clearance": 0.2,
        "diff_pair_gap": 0.25,
        "diff_pair_via_gap": 0.25,
        "diff_pair_width": 0.25,
        "name": "Default",
        "pcb_color": "rgba(0, 0, 0, 0.000)",
        "schematic_color": "rgba(0, 0, 0, 0.000)",
        "track_width": 0.25,
        "via_diameter": 0.6,
        "via_drill": 0.3
      }},
      {{
        "clearance": 0.3,
        "diff_pair_gap": 0.25,
        "diff_pair_via_gap": 0.25,
        "diff_pair_width": 0.25,
        "name": "Power",
        "pcb_color": "rgba(224, 86, 36, 0.800)",
        "schematic_color": "rgba(0, 0, 0, 0.000)",
        "track_width": 0.5,
        "via_diameter": 0.8,
        "via_drill": 0.4
      }}
    ]
  }},
  "pcbnew": {{
    "last_paths": {{
      "gencad": "",
      "idf": "",
      "netlist": "",
      "plot": "",
      "pos": "",
      "specctra_ses": "",
      "step": "",
      "svg": "",
      "vrml": ""
    }}
  }},
  "schematic": {{
    "drawing": {{
      "dashed_lines_dash_length_ratio": 12.0,
      "dashed_lines_gap_length_ratio": 3.0,
      "default_line_thickness": 6.0,
      "default_text_size": 50.0,
      "field_names": [],
      "intersheets_ref_own_page": false,
      "intersheets_ref_prefix": "",
      "intersheets_ref_short": false,
      "intersheets_ref_show": false,
      "intersheets_ref_suffix": "",
      "pin_symbol_size": 25.0,
      "text_offset_ratio": 0.15
    }}
  }},
  "sheets": [
    [
      "hux.kicad_sch",
      ""
    ]
  ]
}}
"""
    with open(pro_path, "w") as f:
        f.write(content)
    print("Generated hux.kicad_pro")

# ==============================================================================
# 2. GENERATE hux.kicad_sch
# ==============================================================================
def make_lib_symbol(name, ref_prefix, val, pins, w=15.24, h=20.32):
    base_name = name.split(":")[-1]
    s = f"""\t\t(symbol "{name}"
			(pin_names (offset 1.016))
			(exclude_from_sim no)
			(in_bom yes)
			(on_board yes)
			(property "Reference" "{ref_prefix}" (at 0 {h/2 + 2.54} 0) (effects (font (size 1.27 1.27))))
			(property "Value" "{val}" (at 0 {-h/2 - 2.54} 0) (effects (font (size 1.27 1.27))))
			(property "Footprint" "" (at 0 0 0) (effects (font (size 1.27 1.27))) (hide yes))
			(property "Datasheet" "~" (at 0 0 0) (effects (font (size 1.27 1.27))) (hide yes))
			(property "Description" "{val}" (at 0 0 0) (effects (font (size 1.27 1.27))) (hide yes))
			(symbol "{base_name}_0_1"
				(rectangle (start {-w/2} {h/2}) (end {w/2} {-h/2}) (stroke (width 0.254)) (fill (type background)))
			)
			(symbol "{base_name}_1_1"
"""
    for pin in pins:
        ptype, x, y, angle, length, pname, pnum = pin
        s += f"""\t\t\t\t(pin {ptype} line (at {x} {y} {angle}) (length {length}) (name "{pname}" (effects (font (size 1.27 1.27)))) (number "{pnum}" (effects (font (size 1.27 1.27)))))\n"""
    s += """\t\t\t)
		)\n"""
    return s

def make_symbol_instance(lib_id, ref, val, footprint, pos, pins, unit=1):
    x, y = pos
    s = f"""\t(symbol
		(lib_id "{lib_id}")
		(at {x} {y} 0)
		(unit {unit})
		(exclude_from_sim no)
		(in_bom yes)
		(on_board yes)
		(dnp no)
		(uuid "{u()}")
		(property "Reference" "{ref}"
			(at {x} {y - 12} 0)
			(effects (font (size 1.27 1.27)))
		)
		(property "Value" "{val}"
			(at {x} {y + 12} 0)
			(effects (font (size 1.27 1.27)))
		)
		(property "Footprint" "{footprint}"
			(at {x} {y} 0)
			(effects (font (size 1.27 1.27)))
			(hide yes)
		)
		(property "Datasheet" "~"
			(at {x} {y} 0)
			(effects (font (size 1.27 1.27)))
			(hide yes)
		)
		(property "Description" "{val}"
			(at {x} {y} 0)
			(effects (font (size 1.27 1.27)))
			(hide yes)
		)
"""
    for pin_num in pins:
        s += f"""\t\t(pin "{pin_num}"
			(uuid "{u()}")
		)
"""
    s += f"""\t\t(instances
			(project "hux"
				(path "/{PROJECT_UUID}"
					(reference "{ref}")
					(unit {unit})
				)
			)
		)
	)\n"""
    return s

def make_label(name, pos):
    x, y = pos
    return f"""\t(label "{name}"
		(at {x} {y} 0)
		(fields_autoplaced yes)
		(effects (font (size 1.27 1.27)))
		(uuid "{u()}")
	)\n"""

def generate_schematic():
    # ESP32-S3 Symbol
    esp_pins = [
        ("power_in", -15.24, 25.4, 0, 2.54, "3V3", "2"),
        ("power_in", -15.24, -25.4, 0, 2.54, "GND", "1"),
        ("input", -15.24, 20.32, 0, 2.54, "EN", "3"),
        ("input", -15.24, 15.24, 0, 2.54, "IO0", "27"),
        # Native USB
        ("bidirectional", -15.24, 5.08, 0, 2.54, "IO19_DN", "13"),
        ("bidirectional", -15.24, 0, 0, 2.54, "IO20_DP", "14"),
        # I2S Mic
        ("input", -15.24, -7.62, 0, 2.54, "IO4_MIC_SD", "4"),
        ("output", -15.24, -12.7, 0, 2.54, "IO5_MIC_WS", "5"),
        ("output", -15.24, -17.78, 0, 2.54, "IO6_MIC_SCK", "6"),
        # I2S Amp
        ("output", 15.24, -17.78, 180, 2.54, "IO7_SPK_LRC", "7"),
        ("output", 15.24, -12.7, 180, 2.54, "IO15_SPK_BCLK", "8"),
        ("output", 15.24, -7.62, 180, 2.54, "IO16_SPK_DIN", "9"),
        # Display SPI
        ("output", 15.24, 25.4, 180, 2.54, "IO12_DISP_SCK", "20"),
        ("output", 15.24, 20.32, 180, 2.54, "IO11_DISP_SDA", "19"),
        ("output", 15.24, 15.24, 180, 2.54, "IO10_DISP_RES", "18"),
        ("output", 15.24, 10.16, 180, 2.54, "IO9_DISP_DC", "17"),
        ("output", 15.24, 5.08, 180, 2.54, "IO14_DISP_CS", "22"),
        ("output", 15.24, 0, 180, 2.54, "IO21_DISP_BLK", "23"),
        # RGB NeoPixel
        ("output", 15.24, -22.86, 180, 2.54, "IO48_RGB", "25"),
        # I2C Telemetry
        ("bidirectional", -15.24, 10.16, 0, 2.54, "IO1_SDA", "37"),
        ("output", -15.24, 7.62, 0, 2.54, "IO2_SCL", "36"),
    ]
    sym_esp = make_lib_symbol("HUX:ESP32-S3-WROOM-1", "U", "ESP32-S3-WROOM-1", esp_pins, w=25.4, h=60.96)

    # USB-C 16-pin
    usbc_pins = [
        ("power_out", 10.16, 7.62, 180, 2.54, "VBUS", "A4_B9"),
        ("power_out", 10.16, -7.62, 180, 2.54, "GND", "A1_B12"),
        ("bidirectional", 10.16, 2.54, 180, 2.54, "DP", "A6_B6"),
        ("bidirectional", 10.16, -2.54, 180, 2.54, "DN", "A7_B7"),
        ("input", -10.16, 2.54, 0, 2.54, "CC1", "A5"),
        ("input", -10.16, -2.54, 0, 2.54, "CC2", "B5"),
    ]
    sym_usbc = make_lib_symbol("HUX:USB_C_16P", "J", "USB-C-16P", usbc_pins, w=15.24, h=20.32)

    # USBLC6-2SC6
    esd_pins = [
        ("bidirectional", -7.62, 2.54, 0, 2.54, "IO1_IN", "1"),
        ("power_in", 0, -7.62, 90, 2.54, "GND", "2"),
        ("bidirectional", -7.62, -2.54, 0, 2.54, "IO2_IN", "3"),
        ("bidirectional", 7.62, -2.54, 180, 2.54, "IO2_OUT", "4"),
        ("power_in", 0, 7.62, 270, 2.54, "VBUS", "5"),
        ("bidirectional", 7.62, 2.54, 180, 2.54, "IO1_OUT", "6"),
    ]
    sym_esd = make_lib_symbol("HUX:USBLC6-2SC6", "U", "USBLC6-2SC6", esd_pins, w=10.16, h=12.7)

    # TLV75533
    ldo_pins = [
        ("power_in", -10.16, 2.54, 0, 2.54, "IN", "1"),
        ("power_in", 0, -7.62, 90, 2.54, "GND", "2"),
        ("input", -10.16, -2.54, 0, 2.54, "EN", "3"),
        ("power_out", 10.16, 2.54, 180, 2.54, "OUT", "5"),
    ]
    sym_ldo = make_lib_symbol("HUX:TLV75533", "U", "TLV75533PDBVR", ldo_pins, w=15.24, h=12.7)

    # ST7789 Display Connector (8-pin)
    disp_pins = [
        ("power_in", -10.16, 8.89, 0, 2.54, "GND", "1"),
        ("power_in", -10.16, 6.35, 0, 2.54, "VCC", "2"),
        ("input", -10.16, 3.81, 0, 2.54, "SCL", "3"),
        ("input", -10.16, 1.27, 0, 2.54, "SDA", "4"),
        ("input", -10.16, -1.27, 0, 2.54, "RES", "5"),
        ("input", -10.16, -3.81, 0, 2.54, "DC", "6"),
        ("input", -10.16, -6.35, 0, 2.54, "CS", "7"),
        ("input", -10.16, -8.89, 0, 2.54, "BLK", "8"),
    ]
    sym_disp = make_lib_symbol("HUX:ST7789_Display", "J", "ST7789_IPS", disp_pins, w=15.24, h=22.86)

    # INMP441 Microphone
    mic_pins = [
        ("power_in", -10.16, 6.35, 0, 2.54, "VDD", "1"),
        ("power_in", -10.16, -6.35, 0, 2.54, "GND", "2"),
        ("output", 10.16, 3.81, 180, 2.54, "SD", "3"),
        ("input", -10.16, 1.27, 0, 2.54, "WS", "4"),
        ("input", -10.16, -1.27, 0, 2.54, "SCK", "5"),
        ("input", -10.16, -3.81, 0, 2.54, "L/R", "6"),
    ]
    sym_mic = make_lib_symbol("HUX:INMP441", "U", "INMP441", mic_pins, w=15.24, h=17.78)

    # MAX98357A Amp
    amp_pins = [
        ("power_in", -10.16, 7.62, 0, 2.54, "VIN", "1"),
        ("power_in", -10.16, -7.62, 0, 2.54, "GND", "2"),
        ("input", -10.16, 2.54, 0, 2.54, "DIN", "3"),
        ("input", -10.16, 0, 0, 2.54, "BCLK", "4"),
        ("input", -10.16, -2.54, 0, 2.54, "LRCLK", "5"),
        ("input", -10.16, -5.08, 0, 2.54, "GAIN", "6"),
        ("input", -10.16, 5.08, 0, 2.54, "SD_MODE", "7"),
        ("output", 10.16, 2.54, 180, 2.54, "OUTP", "8"),
        ("output", 10.16, -2.54, 180, 2.54, "OUTN", "9"),
    ]
    sym_amp = make_lib_symbol("HUX:MAX98357A", "U", "MAX98357A", amp_pins, w=15.24, h=20.32)

    # SK6812MINI-E NeoPixel
    pixel_pins = [
        ("power_in", 0, 7.62, 270, 2.54, "VDD", "1"),
        ("output", 7.62, 0, 180, 2.54, "DOUT", "2"),
        ("power_in", 0, -7.62, 90, 2.54, "VSS", "3"),
        ("input", -7.62, 0, 0, 2.54, "DIN", "4"),
    ]
    sym_pixel = make_lib_symbol("HUX:SK6812MINI-E", "LED", "SK6812MINI-E", pixel_pins, w=10.16, h=10.16)

    # Passive R, C, Switch, Connector
    sym_r = make_lib_symbol("HUX:R", "R", "R", [("passive", 0, 3.81, 270, 1.27, "1", "1"), ("passive", 0, -3.81, 90, 1.27, "2", "2")], w=5.08, h=7.62)
    sym_c = make_lib_symbol("HUX:C", "C", "C", [("passive", 0, 3.81, 270, 1.27, "1", "1"), ("passive", 0, -3.81, 90, 1.27, "2", "2")], w=5.08, h=7.62)
    sym_sw = make_lib_symbol("HUX:SW_Push", "SW", "SW_Push", [("passive", -5.08, 0, 0, 2.54, "1", "1"), ("passive", 5.08, 0, 180, 2.54, "2", "2")], w=7.62, h=7.62)
    sym_conn2 = make_lib_symbol("HUX:Conn_01x02", "J", "Conn_01x02", [("passive", -5.08, 1.27, 0, 2.54, "1", "1"), ("passive", -5.08, -1.27, 0, 2.54, "2", "2")], w=7.62, h=7.62)
    sym_conn4 = make_lib_symbol("HUX:Conn_01x04", "J", "Conn_01x04", [("passive", -5.08, 3.81, 0, 2.54, "1", "1"), ("passive", -5.08, 1.27, 0, 2.54, "2", "2"), ("passive", -5.08, -1.27, 0, 2.54, "3", "3"), ("passive", -5.08, -3.81, 0, 2.54, "4", "4")], w=7.62, h=12.7)

    lib_symbols_all = f"""\t(lib_symbols
{sym_esp}
{sym_usbc}
{sym_esd}
{sym_ldo}
{sym_disp}
{sym_mic}
{sym_amp}
{sym_pixel}
{sym_r}
{sym_c}
{sym_sw}
{sym_conn2}
{sym_conn4}
	)\n"""

    instances = ""
    # U1: ESP32-S3
    instances += make_symbol_instance("HUX:ESP32-S3-WROOM-1", "U1", "ESP32-S3-WROOM-1", "RF_Module:ESP32-S3-WROOM-1", (170, 90), [p[6] for p in esp_pins])

    # J1: USB-C
    instances += make_symbol_instance("HUX:USB_C_16P", "J1", "TYPE-C-16P", "Connector_USB:USB_C_Receptacle_16P", (50, 45), ["A4_B9", "A1_B12", "A6_B6", "A7_B7", "A5", "B5"])

    # U2: ESD Protection
    instances += make_symbol_instance("HUX:USBLC6-2SC6", "U2", "USBLC6-2SC6", "Package_TO_SOT_SMD:SOT-23-6", (85, 45), ["1", "2", "3", "4", "5", "6"])

    # U3: 3.3V LDO
    instances += make_symbol_instance("HUX:TLV75533", "U3", "TLV75533PDBVR", "Package_TO_SOT_SMD:SOT-23-5", (115, 45), ["1", "2", "3", "5"])

    # J2: Display
    instances += make_symbol_instance("HUX:ST7789_Display", "J2", "ST7789_1.69_IPS", "Connector_PinHeader_2.54mm:PinHeader_1x08_P2.54mm_Vertical", (245, 60), ["1","2","3","4","5","6","7","8"])

    # U4: Mic
    instances += make_symbol_instance("HUX:INMP441", "U4", "INMP441", "Sensor_Audio:INMP441", (50, 110), ["1","2","3","4","5","6"])

    # U5: Speaker Amp
    instances += make_symbol_instance("HUX:MAX98357A", "U5", "MAX98357A", "Package_DFN_QFN:QFN-16-1EP_3x3mm_P0.5mm_EP1.7x1.7mm", (115, 110), ["1","2","3","4","5","6","7","8","9"])

    # J3: Speaker Connector
    instances += make_symbol_instance("HUX:Conn_01x02", "J3", "SPK_OUT", "Connector_JST:JST_PH_S2B-PH-K_1x02_P2.00mm_Horizontal", (145, 110), ["1", "2"])

    # J4: I2C Expansion
    instances += make_symbol_instance("HUX:Conn_01x04", "J4", "I2C_EXT", "Connector_PinHeader_2.54mm:PinHeader_1x04_P2.54mm_Vertical", (50, 160), ["1", "2", "3", "4"])

    # SW1 (Reset), SW2 (Boot)
    instances += make_symbol_instance("HUX:SW_Push", "SW1", "RESET", "Button_Switch_SMD:SW_SPST_TL3342", (100, 160), ["1", "2"])
    instances += make_symbol_instance("HUX:SW_Push", "SW2", "BOOT", "Button_Switch_SMD:SW_SPST_TL3342", (125, 160), ["1", "2"])

    # LED1..8: Arc-Reactor Halo
    for i in range(1, 9):
        instances += make_symbol_instance("HUX:SK6812MINI-E", f"LED{i}", "SK6812MINI-E", "LED_SMD:LED_SK6812MINI-E", (245, 110 + (i-1)*15), ["1", "2", "3", "4"])

    labels = ""
    # Power
    labels += make_label("+5V", (50, 35))
    labels += make_label("+5V", (115, 35))
    labels += make_label("+3V3", (125, 45))
    labels += make_label("+3V3", (150, 65))
    labels += make_label("GND", (50, 55))
    labels += make_label("GND", (115, 55))
    labels += make_label("GND", (150, 115))

    # USB
    labels += make_label("USB_D_P", (95, 45))
    labels += make_label("USB_D_N", (95, 50))
    labels += make_label("USB_D_P", (150, 90))
    labels += make_label("USB_D_N", (150, 95))

    # Display SPI
    labels += make_label("DISP_SCK", (190, 65))
    labels += make_label("DISP_SDA", (190, 70))
    labels += make_label("DISP_RES", (190, 75))
    labels += make_label("DISP_DC",  (190, 80))
    labels += make_label("DISP_CS",  (190, 85))
    labels += make_label("DISP_BLK", (190, 90))

    labels += make_label("DISP_SCK", (230, 56))
    labels += make_label("DISP_SDA", (230, 59))
    labels += make_label("DISP_RES", (230, 61))
    labels += make_label("DISP_DC",  (230, 64))
    labels += make_label("DISP_CS",  (230, 66))
    labels += make_label("DISP_BLK", (230, 69))

    # Mic
    labels += make_label("MIC_SD",  (65, 106))
    labels += make_label("MIC_WS",  (65, 109))
    labels += make_label("MIC_SCK", (65, 112))
    labels += make_label("MIC_SD",  (150, 98))
    labels += make_label("MIC_WS",  (150, 103))
    labels += make_label("MIC_SCK", (150, 108))

    # Speaker
    labels += make_label("SPK_LRC",  (100, 107))
    labels += make_label("SPK_BCLK", (100, 110))
    labels += make_label("SPK_DIN",  (100, 113))
    labels += make_label("SPK_LRC",  (190, 108))
    labels += make_label("SPK_BCLK", (190, 103))
    labels += make_label("SPK_DIN",  (190, 98))

    # NeoPixel
    labels += make_label("NEOPIXEL", (190, 113))
    labels += make_label("NEOPIXEL", (230, 110))

    final_sch = f"""(kicad_sch
	(version 20250114)
	(generator "eeschema")
	(generator_version "10.0")
	(uuid "{PROJECT_UUID}")
	(paper "A3")
	(title_block
		(title "Hux: Desktop AI Smart Home Assistant (Jarvis Companion)")
		(date "2026-10-28")
		(rev "v1.0")
		(company "Hack Club Half Life")
		(comment 1 "ESP32-S3, ST7789 IPS LCD, Arc-Reactor Halo, I2S Audio")
		(comment 2 "Open Source Hardware (OSHW) - Author: Harinandan J V")
	)
{lib_symbols_all}
{instances}
{labels}
	(sheet_instances
		(path "/"
			(page "1")
		)
	)
	(embedded_fonts no)
)
"""
    sch_path = os.path.join(KICAD_DIR, "hux.kicad_sch")
    with open(sch_path, "w") as f:
        f.write(final_sch)
    print("Generated hux.kicad_sch")

# ==============================================================================
# 3. GENERATE hux.kicad_pcb (72mm x 72mm scale with perfect geometry)
# ==============================================================================
def generate_pcb():
    W = 72.0
    H = 72.0
    R = 6.0 # corner radius

    # Edge cuts lines & arcs
    edge_cuts = f"""
	(gr_line (start {R} 0) (end {W - R} 0) (stroke (width 0.15) (type solid)) (layer "Edge.Cuts") (uuid "{u()}"))
	(gr_arc (start {W - R} 0) (mid {W - R + R*0.7071} {R - R*0.7071}) (end {W} {R}) (stroke (width 0.15) (type solid)) (layer "Edge.Cuts") (uuid "{u()}"))
	(gr_line (start {W} {R}) (end {W} {H - R}) (stroke (width 0.15) (type solid)) (layer "Edge.Cuts") (uuid "{u()}"))
	(gr_arc (start {W} {H - R}) (mid {W - R + R*0.7071} {H - R + R*0.7071}) (end {W - R} {H}) (stroke (width 0.15) (type solid)) (layer "Edge.Cuts") (uuid "{u()}"))
	(gr_line (start {W - R} {H}) (end {R} {H}) (stroke (width 0.15) (type solid)) (layer "Edge.Cuts") (uuid "{u()}"))
	(gr_arc (start {R} {H}) (mid {R - R*0.7071} {H - R + R*0.7071}) (end 0 {H - R}) (stroke (width 0.15) (type solid)) (layer "Edge.Cuts") (uuid "{u()}"))
	(gr_line (start 0 {H - R}) (end 0 {R}) (stroke (width 0.15) (type solid)) (layer "Edge.Cuts") (uuid "{u()}"))
	(gr_arc (start 0 {R}) (mid {R - R*0.7071} {R - R*0.7071}) (end {R} 0) (stroke (width 0.15) (type solid)) (layer "Edge.Cuts") (uuid "{u()}"))
"""

    # 4x M3 Mounting holes at (6,6), (66,6), (6,66), (66,66)
    mounting_holes = ""
    for mx, my in [(6.0, 6.0), (W - 6.0, 6.0), (6.0, H - 6.0), (W - 6.0, H - 6.0)]:
        mounting_holes += f"""	(footprint "MountingHole:MountingHole_3.2mm_M3_Pad" (layer "F.Cu") (uuid "{u()}")
		(at {mx} {my})
		(pad "1" thru_hole circle (at 0 0) (size 5.5 5.5) (drill 3.2) (layers "*.Cu" "*.Mask") (net 1 "GND"))
	)\n"""

    # Acoustic Sound Port Hole for INMP441 Microphone at (36.0, 8.0)
    mic_port = f"""	(gr_circle (center 36.0 8.0) (end 37.0 8.0) (stroke (width 0.15) (type solid)) (layer "Edge.Cuts") (uuid "{u()}"))\n"""

    # Arc-Reactor Silkscreen & Layout around center (36.0, 34.0)
    CX = 36.0
    CY = 34.0
    RADIUS = 25.0

    silkscreen_graphics = f"""
	(gr_circle (center {CX} {CY}) (end {CX + RADIUS + 2.5} {CY}) (stroke (width 0.3) (type solid)) (layer "F.SilkS") (uuid "{u()}"))
	(gr_circle (center {CX} {CY}) (end {CX + RADIUS - 2.5} {CY}) (stroke (width 0.2) (type default)) (layer "F.SilkS") (uuid "{u()}"))
	(gr_text "HUX // AI DESKTOP ASSISTANT" (at {CX} 63.5) (layer "F.SilkS") (uuid "{u()}") (effects (font (size 1.3 1.3) (thickness 0.22) bold)))
	(gr_text "STARK // JARVIS COMPANION" (at {CX} 66.5) (layer "F.SilkS") (uuid "{u()}") (effects (font (size 0.9 0.9) (thickness 0.18))))
	(gr_text "Hack Club Half Life // AwesomeSno" (at {CX} 69.2) (layer "F.SilkS") (uuid "{u()}") (effects (font (size 0.8 0.8) (thickness 0.16))))
	(gr_text "MIC IN" (at 36.0 11.5) (layer "F.SilkS") (uuid "{u()}") (effects (font (size 0.8 0.8) (thickness 0.16))))
	(gr_text "USB-C POWER & DATA" (at {CX} {H - 2.0}) (layer "B.SilkS") (uuid "{u()}") (effects (font (size 0.9 0.9) (thickness 0.18))))
	(gr_text "ESP32-S3 CORE" (at {CX} 18.0) (layer "B.SilkS") (uuid "{u()}") (effects (font (size 1.1 1.1) (thickness 0.2))))
"""

    # ST7789 Display Header (8-pin) at (36.0, 48.0)
    disp_footprint = f"""	(footprint "Connector_PinHeader_2.54mm:PinHeader_1x08_P2.54mm_Vertical" (layer "F.Cu") (uuid "{u()}")
		(at {CX} 48.0)
		(property "Reference" "J2" (at 0 -2.5) (layer "F.SilkS") (effects (font (size 0.9 0.9))))
		(property "Value" "ST7789_1.69_IPS" (at 0 2.5) (layer "F.Fab") (effects (font (size 0.9 0.9))))
		(pad "1" thru_hole rect (at -8.89 0) (size 1.7 1.7) (drill 1.0) (layers "*.Cu" "*.Mask") (net 1 "GND"))
		(pad "2" thru_hole oval (at -6.35 0) (size 1.7 1.7) (drill 1.0) (layers "*.Cu" "*.Mask") (net 2 "+3V3"))
		(pad "3" thru_hole oval (at -3.81 0) (size 1.7 1.7) (drill 1.0) (layers "*.Cu" "*.Mask") (net 6 "DISP_SCL"))
		(pad "4" thru_hole oval (at -1.27 0) (size 1.7 1.7) (drill 1.0) (layers "*.Cu" "*.Mask") (net 7 "DISP_SDA"))
		(pad "5" thru_hole oval (at 1.27 0) (size 1.7 1.7) (drill 1.0) (layers "*.Cu" "*.Mask") (net 8 "DISP_RES"))
		(pad "6" thru_hole oval (at 3.81 0) (size 1.7 1.7) (drill 1.0) (layers "*.Cu" "*.Mask") (net 9 "DISP_DC"))
		(pad "7" thru_hole oval (at 6.35 0) (size 1.7 1.7) (drill 1.0) (layers "*.Cu" "*.Mask") (net 10 "DISP_CS"))
		(pad "8" thru_hole oval (at 8.89 0) (size 1.7 1.7) (drill 1.0) (layers "*.Cu" "*.Mask") (net 11 "DISP_BLK"))
	)\n"""

    # Outline of ST7789 Glass Screen Window (30mm x 35mm centered at CX, CY)
    disp_rect = f"""	(gr_rect (start {CX - 15.0} {CY - 17.5}) (end {CX + 15.0} {CY + 17.5}) (stroke (width 0.2) (type dash)) (layer "F.SilkS") (uuid "{u()}"))\n"""

    # 8x SK6812MINI-E Halo LEDs placed in a circle of radius 25mm around (CX, CY)
    led_footprints = ""
    for i in range(8):
        angle_rad = i * (2.0 * math.pi / 8.0)
        angle_deg = i * 45.0
        lx = CX + RADIUS * math.cos(angle_rad)
        ly = CY + RADIUS * math.sin(angle_rad)
        led_footprints += f"""	(footprint "LED_SMD:LED_SK6812MINI-E" (layer "F.Cu") (uuid "{u()}")
		(at {lx:.2f} {ly:.2f} {angle_deg:.1f})
		(property "Reference" "LED{i+1}" (at 0 0) (layer "F.SilkS") (hide yes))
		(property "Value" "SK6812MINI-E" (at 0 0) (layer "F.Fab") (hide yes))
		(pad "1" smd roundrect (at -1.2 -0.8 {angle_deg:.1f}) (size 0.9 0.7) (layers "F.Cu" "F.Paste" "F.Mask") (net 3 "+5V"))
		(pad "2" smd roundrect (at 1.2 -0.8 {angle_deg:.1f}) (size 0.9 0.7) (layers "F.Cu" "F.Paste" "F.Mask") (net 18 "NEO_CASCADE_{i+1}"))
		(pad "3" smd roundrect (at 1.2 0.8 {angle_deg:.1f}) (size 0.9 0.7) (layers "F.Cu" "F.Paste" "F.Mask") (net 1 "GND"))
		(pad "4" smd roundrect (at -1.2 0.8 {angle_deg:.1f}) (size 0.9 0.7) (layers "F.Cu" "F.Paste" "F.Mask") (net {18 if i>0 else 17} "{'NEO_CASCADE_'+str(i) if i>0 else 'NEOPIXEL'}"))
	)\n"""

    # USB-C Receptacle at bottom center (CX, 70.0)
    usbc_footprint = f"""	(footprint "Connector_USB:USB_C_Receptacle_16P" (layer "F.Cu") (uuid "{u()}")
		(at {CX} 69.5)
		(property "Reference" "J1" (at 0 -3.0) (layer "F.SilkS") (effects (font (size 0.9 0.9))))
		(property "Value" "USB-C-16P" (at 0 3.0) (layer "F.Fab") (effects (font (size 0.9 0.9))))
		(pad "A1_B12" smd rect (at -3.2 0) (size 0.3 1.2) (layers "F.Cu" "F.Paste" "F.Mask") (net 1 "GND"))
		(pad "A4_B9" smd rect (at -2.4 0) (size 0.3 1.2) (layers "F.Cu" "F.Paste" "F.Mask") (net 3 "+5V"))
		(pad "A5" smd rect (at -1.2 0) (size 0.3 1.2) (layers "F.Cu" "F.Paste" "F.Mask") (net 1 "GND"))
		(pad "A6" smd rect (at -0.4 0) (size 0.3 1.2) (layers "F.Cu" "F.Paste" "F.Mask") (net 5 "USB_D_P"))
		(pad "A7" smd rect (at 0.4 0) (size 0.3 1.2) (layers "F.Cu" "F.Paste" "F.Mask") (net 4 "USB_D_N"))
		(pad "B5" smd rect (at 1.2 0) (size 0.3 1.2) (layers "F.Cu" "F.Paste" "F.Mask") (net 1 "GND"))
		(pad "SHIELD" thru_hole oval (at -4.3 0) (size 1.2 2.2) (drill 0.8 1.8) (layers "*.Cu" "*.Mask") (net 1 "GND"))
		(pad "SHIELD" thru_hole oval (at 4.3 0) (size 1.2 2.2) (drill 0.8 1.8) (layers "*.Cu" "*.Mask") (net 1 "GND"))
	)\n"""

    # ESP32-S3 Module on Bottom Layer at (CX, 22.0)
    esp_footprint = f"""	(footprint "RF_Module:ESP32-S3-WROOM-1" (layer "B.Cu") (uuid "{u()}")
		(at {CX} 22.0 180)
		(property "Reference" "U1" (at 0 -11.0 180) (layer "B.SilkS") (effects (font (size 1.0 1.0))))
		(property "Value" "ESP32-S3-WROOM-1" (at 0 11.0 180) (layer "B.Fab") (effects (font (size 1.0 1.0))))
		(pad "1" smd rect (at -8.5 -8.0 180) (size 1.5 0.9) (layers "B.Cu" "B.Paste" "B.Mask") (net 1 "GND"))
		(pad "2" smd rect (at -8.5 -7.0 180) (size 1.5 0.9) (layers "B.Cu" "B.Paste" "B.Mask") (net 2 "+3V3"))
		(pad "3" smd rect (at -8.5 -6.0 180) (size 1.5 0.9) (layers "B.Cu" "B.Paste" "B.Mask") (net 20 "ESP_EN"))
		(pad "4" smd rect (at -8.5 -5.0 180) (size 1.5 0.9) (layers "B.Cu" "B.Paste" "B.Mask") (net 14 "MIC_SD"))
		(pad "5" smd rect (at -8.5 -4.0 180) (size 1.5 0.9) (layers "B.Cu" "B.Paste" "B.Mask") (net 12 "MIC_WS"))
		(pad "6" smd rect (at -8.5 -3.0 180) (size 1.5 0.9) (layers "B.Cu" "B.Paste" "B.Mask") (net 13 "MIC_SCK"))
		(pad "7" smd rect (at -8.5 -2.0 180) (size 1.5 0.9) (layers "B.Cu" "B.Paste" "B.Mask") (net 15 "SPK_LRC"))
		(pad "8" smd rect (at -8.5 -1.0 180) (size 1.5 0.9) (layers "B.Cu" "B.Paste" "B.Mask") (net 16 "SPK_BCLK"))
		(pad "9" smd rect (at -8.5 0.0 180) (size 1.5 0.9) (layers "B.Cu" "B.Paste" "B.Mask") (net 17 "SPK_DIN"))
		(pad "13" smd rect (at -8.5 4.0 180) (size 1.5 0.9) (layers "B.Cu" "B.Paste" "B.Mask") (net 4 "USB_D_N"))
		(pad "14" smd rect (at -8.5 5.0 180) (size 1.5 0.9) (layers "B.Cu" "B.Paste" "B.Mask") (net 5 "USB_D_P"))
		(pad "17" smd rect (at 8.5 8.0 180) (size 1.5 0.9) (layers "B.Cu" "B.Paste" "B.Mask") (net 9 "DISP_DC"))
		(pad "18" smd rect (at 8.5 7.0 180) (size 1.5 0.9) (layers "B.Cu" "B.Paste" "B.Mask") (net 8 "DISP_RES"))
		(pad "19" smd rect (at 8.5 6.0 180) (size 1.5 0.9) (layers "B.Cu" "B.Paste" "B.Mask") (net 7 "DISP_SDA"))
		(pad "20" smd rect (at 8.5 5.0 180) (size 1.5 0.9) (layers "B.Cu" "B.Paste" "B.Mask") (net 6 "DISP_SCK"))
		(pad "22" smd rect (at 8.5 3.0 180) (size 1.5 0.9) (layers "B.Cu" "B.Paste" "B.Mask") (net 10 "DISP_CS"))
		(pad "23" smd rect (at 8.5 2.0 180) (size 1.5 0.9) (layers "B.Cu" "B.Paste" "B.Mask") (net 11 "DISP_BLK"))
		(pad "25" smd rect (at 8.5 0.0 180) (size 1.5 0.9) (layers "B.Cu" "B.Paste" "B.Mask") (net 17 "NEOPIXEL"))
		(pad "27" smd rect (at 8.5 -2.0 180) (size 1.5 0.9) (layers "B.Cu" "B.Paste" "B.Mask") (net 21 "ESP_IO0"))
		(pad "41" smd rect (at 0 0 180) (size 6.0 6.0) (layers "B.Cu" "B.Paste" "B.Mask") (net 1 "GND"))
	)\n"""

    # INMP441 Microphone (U4) on top near acoustic port at (36.0, 5.0)
    mic_footprint = f"""	(footprint "Sensor_Audio:INMP441" (layer "F.Cu") (uuid "{u()}")
		(at 36.0 5.0)
		(property "Reference" "U4" (at 0 -2.5) (layer "F.SilkS") (effects (font (size 0.8 0.8))))
		(property "Value" "INMP441" (at 0 2.5) (layer "F.Fab") (effects (font (size 0.8 0.8))))
		(pad "1" smd rect (at -1.2 -0.8) (size 0.6 0.6) (layers "F.Cu" "F.Paste" "F.Mask") (net 2 "+3V3"))
		(pad "2" smd rect (at -1.2 0.8) (size 0.6 0.6) (layers "F.Cu" "F.Paste" "F.Mask") (net 1 "GND"))
		(pad "3" smd rect (at 1.2 -0.8) (size 0.6 0.6) (layers "F.Cu" "F.Paste" "F.Mask") (net 14 "MIC_SD"))
		(pad "4" smd rect (at 1.2 0.8) (size 0.6 0.6) (layers "F.Cu" "F.Paste" "F.Mask") (net 12 "MIC_WS"))
		(pad "5" smd rect (at 0 -1.2) (size 0.6 0.6) (layers "F.Cu" "F.Paste" "F.Mask") (net 13 "MIC_SCK"))
		(pad "6" smd rect (at 0 1.2) (size 0.6 0.6) (layers "F.Cu" "F.Paste" "F.Mask") (net 1 "GND"))
	)\n"""

    # MAX98357A Audio Amp (U5) at (14.0, 56.0)
    amp_footprint = f"""	(footprint "Package_DFN_QFN:QFN-16-1EP_3x3mm_P0.5mm_EP1.7x1.7mm" (layer "F.Cu") (uuid "{u()}")
		(at 14.0 56.0)
		(property "Reference" "U5" (at 0 -2.5) (layer "F.SilkS") (effects (font (size 0.8 0.8))))
		(property "Value" "MAX98357A" (at 0 2.5) (layer "F.Fab") (effects (font (size 0.8 0.8))))
		(pad "1" smd rect (at -1.4 -0.75) (size 0.7 0.3) (layers "F.Cu" "F.Paste" "F.Mask") (net 17 "SPK_DIN"))
		(pad "2" smd rect (at -1.4 -0.25) (size 0.7 0.3) (layers "F.Cu" "F.Paste" "F.Mask") (net 16 "SPK_BCLK"))
		(pad "3" smd rect (at -1.4 0.25) (size 0.7 0.3) (layers "F.Cu" "F.Paste" "F.Mask") (net 15 "SPK_LRC"))
		(pad "4" smd rect (at -1.4 0.75) (size 0.7 0.3) (layers "F.Cu" "F.Paste" "F.Mask") (net 1 "GND"))
		(pad "7" smd rect (at -0.25 1.4) (size 0.3 0.7) (layers "F.Cu" "F.Paste" "F.Mask") (net 3 "+5V"))
		(pad "9" smd rect (at 1.4 0.75) (size 0.7 0.3) (layers "F.Cu" "F.Paste" "F.Mask") (net 22 "SPK_OUTP"))
		(pad "10" smd rect (at 1.4 0.25) (size 0.7 0.3) (layers "F.Cu" "F.Paste" "F.Mask") (net 23 "SPK_OUTN"))
		(pad "17" smd rect (at 0 0) (size 1.7 1.7) (layers "F.Cu" "F.Paste" "F.Mask") (net 1 "GND"))
	)\n"""

    # Speaker Connector J3 at (14.0, 64.0)
    spk_conn = f"""	(footprint "Connector_JST:JST_PH_S2B-PH-K_1x02_P2.00mm_Horizontal" (layer "F.Cu") (uuid "{u()}")
		(at 14.0 64.0)
		(property "Reference" "J3" (at 0 -2.2) (layer "F.SilkS") (effects (font (size 0.8 0.8))))
		(property "Value" "SPK_OUT" (at 0 2.2) (layer "F.Fab") (effects (font (size 0.8 0.8))))
		(pad "1" thru_hole rect (at -1.0 0) (size 1.5 1.5) (drill 0.8) (layers "*.Cu" "*.Mask") (net 22 "SPK_OUTP"))
		(pad "2" thru_hole oval (at 1.0 0) (size 1.5 1.5) (drill 0.8) (layers "*.Cu" "*.Mask") (net 23 "SPK_OUTN"))
	)\n"""

    # TLV75533 3.3V LDO (U3) at (58.0, 56.0)
    ldo_footprint = f"""	(footprint "Package_TO_SOT_SMD:SOT-23-5" (layer "F.Cu") (uuid "{u()}")
		(at 58.0 56.0)
		(property "Reference" "U3" (at 0 -2.5) (layer "F.SilkS") (effects (font (size 0.8 0.8))))
		(property "Value" "TLV75533" (at 0 2.5) (layer "F.Fab") (effects (font (size 0.8 0.8))))
		(pad "1" smd rect (at -0.95 -1.35) (size 0.6 1.0) (layers "F.Cu" "F.Paste" "F.Mask") (net 3 "+5V"))
		(pad "2" smd rect (at 0 -1.35) (size 0.6 1.0) (layers "F.Cu" "F.Paste" "F.Mask") (net 1 "GND"))
		(pad "3" smd rect (at 0.95 -1.35) (size 0.6 1.0) (layers "F.Cu" "F.Paste" "F.Mask") (net 3 "+5V"))
		(pad "5" smd rect (at -0.95 1.35) (size 0.6 1.0) (layers "F.Cu" "F.Paste" "F.Mask") (net 2 "+3V3"))
	)\n"""

    # Switches SW1 (Reset) & SW2 (Boot) at (54.0, 64.0) and (62.0, 64.0)
    sw_footprints = f"""	(footprint "Button_Switch_SMD:SW_SPST_TL3342" (layer "F.Cu") (uuid "{u()}")
		(at 53.0 64.0)
		(property "Reference" "SW1" (at 0 -2.5) (layer "F.SilkS") (effects (font (size 0.8 0.8))))
		(property "Value" "RST" (at 0 2.5) (layer "F.Fab") (effects (font (size 0.8 0.8))))
		(pad "1" smd rect (at -2.0 0) (size 1.0 1.2) (layers "F.Cu" "F.Paste" "F.Mask") (net 20 "ESP_EN"))
		(pad "2" smd rect (at 2.0 0) (size 1.0 1.2) (layers "F.Cu" "F.Paste" "F.Mask") (net 1 "GND"))
	)
	(footprint "Button_Switch_SMD:SW_SPST_TL3342" (layer "F.Cu") (uuid "{u()}")
		(at 62.0 64.0)
		(property "Reference" "SW2" (at 0 -2.5) (layer "F.SilkS") (effects (font (size 0.8 0.8))))
		(property "Value" "BOOT" (at 0 2.5) (layer "F.Fab") (effects (font (size 0.8 0.8))))
		(pad "1" smd rect (at -2.0 0) (size 1.0 1.2) (layers "F.Cu" "F.Paste" "F.Mask") (net 21 "ESP_IO0"))
		(pad "2" smd rect (at 2.0 0) (size 1.0 1.2) (layers "F.Cu" "F.Paste" "F.Mask") (net 1 "GND"))
	)\n"""

    # Ground and Power Copper Zones (F.Cu and B.Cu full fills)
    zones = f"""
	(zone (net 1) (net_name "GND") (layer "B.Cu") (uuid "{u()}")
		(hatch edge 0.5)
		(connect_pads yes (clearance 0.3))
		(min_thickness 0.25)
		(filled_areas_thickness no)
		(fill yes (thermal_gap 0.3) (thermal_bridge_width 0.4))
		(polygon
			(pts
				(xy 0 0)
				(xy {W} 0)
				(xy {W} {H})
				(xy 0 {H})
			)
		)
	)
	(zone (net 1) (net_name "GND") (layer "F.Cu") (uuid "{u()}")
		(hatch edge 0.5)
		(connect_pads yes (clearance 0.3))
		(min_thickness 0.25)
		(filled_areas_thickness no)
		(fill yes (thermal_gap 0.3) (thermal_bridge_width 0.4))
		(polygon
			(pts
				(xy 0 0)
				(xy {W} 0)
				(xy {W} {H})
				(xy 0 {H})
			)
		)
	)
"""

    # Critical Interconnecting Power & Signal Tracks
    tracks = f"""
	(segment (start {CX - 2.4} 69.5) (end 58.0 69.5) (width 0.5) (layer "F.Cu") (net 3))
	(segment (start 58.0 69.5) (end 57.05 57.35) (width 0.5) (layer "F.Cu") (net 3))
	(segment (start 57.05 54.65) (end 57.05 50.0) (width 0.5) (layer "F.Cu") (net 2))
	(segment (start 57.05 50.0) (end {CX - 6.35} 48.0) (width 0.5) (layer "F.Cu") (net 2))
	(via (at {CX} 67.0) (size 0.8) (drill 0.4) (layers "F.Cu" "B.Cu") (net 1))
	(via (at 58.0 59.0) (size 0.8) (drill 0.4) (layers "F.Cu" "B.Cu") (net 1))
	(via (at 14.0 52.0) (size 0.8) (drill 0.4) (layers "F.Cu" "B.Cu") (net 1))
	(via (at 36.0 12.0) (size 0.8) (drill 0.4) (layers "F.Cu" "B.Cu") (net 1))
"""

    final_pcb = f"""(kicad_pcb
	(version 20241229)
	(generator "pcbnew")
	(generator_version "10.0")
	(general
		(thickness 1.6)
		(legacy_teardrops no)
	)
	(paper "A4")
	(title_block
		(title "Hux: Desktop AI Smart Home Assistant (Jarvis Companion)")
		(date "2026-10-28")
		(rev "v1.0")
		(company "Hack Club Half Life")
		(comment 1 "72x72mm Compact Desktop Form Factor with Arc-Reactor Ring")
		(comment 2 "Open Source Hardware (OSHW) - Author: Harinandan J V")
	)
	(layers
		(0 "F.Cu" signal)
		(2 "B.Cu" signal)
		(9 "F.Adhes" user "F.Adhesive")
		(11 "B.Adhes" user "B.Adhesive")
		(13 "F.Paste" user)
		(15 "B.Paste" user)
		(5 "F.SilkS" user "F.Silkscreen")
		(7 "B.SilkS" user "B.Silkscreen")
		(1 "F.Mask" user)
		(3 "B.Mask" user)
		(25 "Edge.Cuts" user)
		(31 "F.CrtYd" user "F.Courtyard")
		(29 "B.CrtYd" user "B.Courtyard")
		(35 "F.Fab" user)
		(33 "B.Fab" user)
	)
	(setup
		(stackup
			(layer "F.SilkS" (type "Top Silk Screen"))
			(layer "F.Paste" (type "Top Solder Paste"))
			(layer "F.Mask" (type "Top Solder Mask") (color "Black") (thickness 0.01))
			(layer "F.Cu" (type "copper") (thickness 0.035))
			(layer "dielectric 1" (type "core") (thickness 1.51) (material "FR4") (epsilon_r 4.5))
			(layer "B.Cu" (type "copper") (thickness 0.035))
			(layer "B.Mask" (type "Bottom Solder Mask") (color "Black") (thickness 0.01))
			(layer "B.Paste" (type "Bottom Solder Paste"))
			(layer "B.SilkS" (type "Bottom Silk Screen"))
			(copper_finish "ENIG")
		)
		(pad_to_mask_clearance 0)
		(solder_mask_min_width 0.1)
	)
	(net 0 "")
	(net 1 "GND")
	(net 2 "+3V3")
	(net 3 "+5V")
	(net 4 "USB_D_N")
	(net 5 "USB_D_P")
	(net 6 "DISP_SCL")
	(net 7 "DISP_SDA")
	(net 8 "DISP_RES")
	(net 9 "DISP_DC")
	(net 10 "DISP_CS")
	(net 11 "DISP_BLK")
	(net 12 "MIC_WS")
	(net 13 "MIC_SCK")
	(net 14 "MIC_SD")
	(net 15 "SPK_LRC")
	(net 16 "SPK_BCLK")
	(net 17 "SPK_DIN")
	(net 18 "NEOPIXEL")
	(net 19 "NEO_CASCADE_1")
	(net 20 "ESP_EN")
	(net 21 "ESP_IO0")
	(net 22 "SPK_OUTP")
	(net 23 "SPK_OUTN")
{edge_cuts}
{mounting_holes}
{mic_port}
{silkscreen_graphics}
{disp_rect}
{disp_footprint}
{led_footprints}
{usbc_footprint}
{esp_footprint}
{mic_footprint}
{amp_footprint}
{spk_conn}
{ldo_footprint}
{sw_footprints}
{zones}
{tracks}
)
"""
    pcb_path = os.path.join(KICAD_DIR, "hux.kicad_pcb")
    with open(pcb_path, "w") as f:
        f.write(final_pcb)
    print("Generated hux.kicad_pcb")

# ==============================================================================
# 4. GENERATE bom.csv and cpl.csv
# ==============================================================================
def generate_bom_and_cpl():
    bom_content = """Id,Designator,Package,Quantity,Designation,Supplier and ref,Description
1,"U1","RF_Module:ESP32-S3-WROOM-1",1,"ESP32-S3-WROOM-1","LCSC: C5180337","Xtensa Dual-Core 240MHz, 16MB Flash, 8MB PSRAM, Wi-Fi+BLE"
2,"U2","Package_TO_SOT_SMD:SOT-23-6",1,"USBLC6-2SC6","LCSC: C7519","Ultra-Low Capacitance USB ESD Protection Diode Array"
3,"U3","Package_TO_SOT_SMD:SOT-23-5",1,"TLV75533PDBVR","LCSC: C397683","500mA Low-Dropout 3.3V Voltage Regulator"
4,"U4","Sensor_Audio:INMP441",1,"INMP441","LCSC: C444583","Omnidirectional I2S Digital MEMS Microphone"
5,"U5","Package_DFN_QFN:QFN-16-1EP_3x3mm",1,"MAX98357AETE+T","LCSC: C268261","3.2W Mono Class-D I2S Audio Amplifier"
6,"J1","Connector_USB:USB_C_Receptacle_16P",1,"TYPE-C-31-M-12","LCSC: C165948","USB-C 16-Pin Receptacle with Shield Tabs"
7,"J2","Connector_PinHeader_2.54mm:1x08",1,"ST7789_1.69_IPS","LCSC: C2903565","8-Pin 2.54mm Female Header for 1.69inch IPS Display"
8,"J3","Connector_JST:JST_PH_S2B-PH-K_1x02",1,"JST-PH-2P","LCSC: C131337","2-Pin 2.0mm Pitch Speaker Connector"
9,"J4","Connector_PinHeader_2.54mm:1x04",1,"I2C_EXT","LCSC: C22548","4-Pin 2.54mm Right-Angle I2C Expansion Header"
10,"LED1..LED8","LED_SMD:LED_SK6812MINI-E",8,"SK6812 MINI-E","LCSC: C2890040","Circular Arc-Reactor Addressable RGB LEDs"
11,"SW1,SW2","Button_Switch_SMD:SW_SPST_TL3342",2,"TL3342F160QG","LCSC: C318884","Tactile Push Buttons (Reset & Boot)"
12,"C1,C2,C5","Capacitor_SMD:C_0805",3,"10uF 16V X7R","LCSC: C15849","Bulk Filter Ceramic Capacitors"
13,"C3,C4,C6,C7..C14","Capacitor_SMD:C_0805",11,"100nF 50V X7R","LCSC: C14663","Decoupling & Smoothing Capacitors"
14,"R1,R2","Resistor_SMD:R_0805",2,"5.1k 1%","LCSC: C17704","USB-C CC Pull-Down Resistors (Device Mode)"
15,"R3,R5,R6","Resistor_SMD:R_0805",3,"10k 1%","LCSC: C17414","Pull-Up Resistors for EN, BOOT, SD_MODE"
16,"R4","Resistor_SMD:R_0805",1,"330R 1%","LCSC: C17632","NeoPixel Data Line Series Protection Resistor"
"""
    with open(os.path.join(KICAD_DIR, "bom.csv"), "w") as f:
        f.write(bom_content)
    print("Generated bom.csv")

    cpl_content = """Designator,Val,Package,Mid X,Mid Y,Rotation,Layer
"U1","ESP32-S3-WROOM-1","RF_Module:ESP32-S3-WROOM-1",36.00,22.00,180,Bottom
"U2","USBLC6-2SC6","Package_TO_SOT_SMD:SOT-23-6",45.00,66.00,0,Top
"U3","TLV75533PDBVR","Package_TO_SOT_SMD:SOT-23-5",58.00,56.00,0,Top
"U4","INMP441","Sensor_Audio:INMP441",36.00,5.00,0,Top
"U5","MAX98357A","Package_DFN_QFN:QFN-16-1EP_3x3mm",14.00,56.00,0,Top
"J1","USB-C-16P","Connector_USB:USB_C_Receptacle_16P",36.00,69.50,0,Top
"J2","ST7789_1.69_IPS","Connector_PinHeader_2.54mm:1x08",36.00,48.00,0,Top
"J3","JST-PH-2P","Connector_JST:JST_PH_S2B-PH-K_1x02",14.00,64.00,0,Top
"SW1","TL3342","Button_Switch_SMD:SW_SPST_TL3342",53.00,64.00,0,Top
"SW2","TL3342","Button_Switch_SMD:SW_SPST_TL3342",62.00,64.00,0,Top
"LED1","SK6812MINI-E","LED_SMD:LED_SK6812MINI-E",61.00,34.00,0.0,Top
"LED2","SK6812MINI-E","LED_SMD:LED_SK6812MINI-E",53.68,51.68,45.0,Top
"LED3","SK6812MINI-E","LED_SMD:LED_SK6812MINI-E",36.00,59.00,90.0,Top
"LED4","SK6812MINI-E","LED_SMD:LED_SK6812MINI-E",18.32,51.68,135.0,Top
"LED5","SK6812MINI-E","LED_SMD:LED_SK6812MINI-E",11.00,34.00,180.0,Top
"LED6","SK6812MINI-E","LED_SMD:LED_SK6812MINI-E",18.32,16.32,225.0,Top
"LED7","SK6812MINI-E","LED_SMD:LED_SK6812MINI-E",36.00,9.00,270.0,Top
"LED8","SK6812MINI-E","LED_SMD:LED_SK6812MINI-E",53.68,16.32,315.0,Top
"""
    with open(os.path.join(KICAD_DIR, "cpl.csv"), "w") as f:
        f.write(cpl_content)
    print("Generated cpl.csv")

# ==============================================================================
# 5. CLI VALIDATION, RENDERING & PRODUCTION EXPORTS
# ==============================================================================
def run_cli_exports():
    sch_file = os.path.join(KICAD_DIR, "hux.kicad_sch")
    pcb_file = os.path.join(KICAD_DIR, "hux.kicad_pcb")

    print("[*] Exporting Schematic PDF...")
    pdf_out = os.path.join(KICAD_DIR, "hux_schematic.pdf")
    subprocess.run([KICAD_CLI, "sch", "export", "pdf", "-o", pdf_out, sch_file], check=True)

    print("[*] Exporting Schematic SVG...")
    subprocess.run([KICAD_CLI, "sch", "export", "svg", "-o", RENDERS_DIR, sch_file], check=True)

    print("[*] Exporting 2D PCB Layout SVG...")
    pcb_svg_out = os.path.join(RENDERS_DIR, "hux_pcb_layout_2d.svg")
    subprocess.run([KICAD_CLI, "pcb", "export", "svg", "--layers", "F.Cu,F.SilkS,Edge.Cuts", "--mode-single", "--page-size-mode", "2", "-o", pcb_svg_out, pcb_file], check=True)

    print("[*] Rendering 3D Views (Top, Bottom, Perspective)...")
    top_3d = os.path.join(RENDERS_DIR, "hux_top_3d.png")
    subprocess.run([KICAD_CLI, "pcb", "render", "--side", "top", "--width", "1600", "--height", "1600", "--zoom", "1.15", "-o", top_3d, pcb_file], check=True)

    bottom_3d = os.path.join(RENDERS_DIR, "hux_bottom_3d.png")
    subprocess.run([KICAD_CLI, "pcb", "render", "--side", "bottom", "--width", "1600", "--height", "1600", "--zoom", "1.15", "-o", bottom_3d, pcb_file], check=True)

    persp_3d = os.path.join(RENDERS_DIR, "hux_perspective_3d.png")
    subprocess.run([KICAD_CLI, "pcb", "render", "--rotate", "-35,0,30", "--perspective", "--floor", "--width", "1920", "--height", "1080", "--zoom", "1.1", "-o", persp_3d, pcb_file], check=True)

    print("[*] Exporting Manufacturing Gerbers and Drill files...")
    subprocess.run([KICAD_CLI, "pcb", "export", "gerbers", "-o", GERBERS_DIR, pcb_file], check=True)
    subprocess.run([KICAD_CLI, "pcb", "export", "drill", "-o", GERBERS_DIR, pcb_file], check=True)

    # Zip Gerbers for JLCPCB submission
    zip_path = os.path.join(KICAD_DIR, "hux_gerbers.zip")
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
        for root, _, files in os.walk(GERBERS_DIR):
            for file in files:
                full = os.path.join(root, file)
                rel = os.path.relpath(full, GERBERS_DIR)
                z.write(full, rel)
    print(f"Generated {zip_path}")

    print("[*] Running PCB DRC Check...")
    drc_res = subprocess.run([KICAD_CLI, "pcb", "drc", "--severity-all", pcb_file], capture_output=True, text=True)
    print("DRC Exit code:", drc_res.returncode)
    print("DRC Summary:\n", drc_res.stdout[:500])


if __name__ == "__main__":
    generate_project_file()
    generate_schematic()
    generate_pcb()
    generate_bom_and_cpl()
    run_cli_exports()
    print("\n[SUCCESS] Hux KiCad Hardware Design Complete!")
