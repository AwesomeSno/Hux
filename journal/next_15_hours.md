# Hux - Devlog

## Hours 11 - 25

After wrapping up the initial planning and block diagrams in the first 10 hours, I spent the next 15 hours capturing the full KiCad schematic, routing the 2-layer board, running DRC checks, exporting JLCPCB fabrication files, and writing the display and audio drivers.

Here is the breakdown of what I worked on:

---

### Hour 11: KiCad schematic setup and MCU power

Set up the KiCad project. Added the ESP32-S3-WROOM-1 symbol, wired up the decoupling caps, and added the USB-C port with standard 5.1k pull-downs and the TLV75533 3.3V LDO regulator.

![hour_11_schematic_mcu_power](https://halflife.hackclub-assets.com/sessions/hekUGdMUsJvkfZr4IeTGwJeZETfm9ZrV/2b1977eebba22c95336cbd65f3e68031b85eb25f7c55c7966d63325b266421e4.png)

---

### Hour 12: Schematic for ST7789 display and Arc-Reactor halo

Wired the ST7789 IPS display header over high-speed SPI with CS, DC, and reset lines. Then hooked up the 8 SK6812 MINI-E NeoPixels in a daisy chain with a 330 ohm resistor on the data line.

![hour_12_schematic_display_and_halo](https://halflife.hackclub-assets.com/sessions/hekUGdMUsJvkfZr4IeTGwJeZETfm9ZrV/dea4541b3d283b66bc0e9c06b1d945f941f76105b4ba8f2d9d0f9263475f7944.png)

---

### Hour 13: Digital audio input and output circuits

Hooked up the INMP441 MEMS mic for voice capture and the MAX98357A Class-D amplifier to power a small 3W speaker over I2S so we get crisp sound without analog noise.

![hour_13_schematic_i2s_audio](https://halflife.hackclub-assets.com/sessions/hekUGdMUsJvkfZr4IeTGwJeZETfm9ZrV/9fd6e1234802afec023f4e62a2b8d6c401c25b3ca4fb07cc3d0e24fa9a42dcfc.png)

---

### Hour 14: Running ERC and picking footprints

Ran KiCad's Electrical Rules Check to catch any floating pins or missing power flags. Assigned exact SMD footprints for all passives, ensuring 0805 packages for easy hand-assembly or automated SMT.

![hour_14_erc_and_footprint_assignment](https://halflife.hackclub-assets.com/sessions/hekUGdMUsJvkfZr4IeTGwJeZETfm9ZrV/7d34f9ee09cf4d4862bcb2521588e75f530b31b2a0a40472be0f868b0da3446d.png)

---

### Hour 15: Setting up board outline and mounting holes

Created the 72mm x 72mm PCB outline with smooth 6mm rounded corners. Added four M3 mounting holes in the corners so the board can screw cleanly into a desk stand or 3D printed base.

![hour_15_pcb_outline_and_mechanics](https://halflife.hackclub-assets.com/sessions/hekUGdMUsJvkfZr4IeTGwJeZETfm9ZrV/535517ccdce6d05e2c1e244f884c56c1029b196915a46f385b03b13e27cc83af.png)

---

### Hour 16: Placing components and planning the ring

Placed the display right in the center and arranged the 8 NeoPixels in a clean 50mm diameter circle around it. Put the ESP32-S3 up top so the antenna hangs off the edge, and USB-C at the bottom.

![hour_16_component_placement_halo](https://halflife.hackclub-assets.com/sessions/hekUGdMUsJvkfZr4IeTGwJeZETfm9ZrV/d320410ea6d004c66391854dbb86bfe5d3124da1fe97224d19236867908e8895.png)

---

### Hour 17: Routing the high-speed display and audio lines

Routed the 40MHz SPI traces to the screen with short direct runs to prevent ringing. Then routed the I2S clock and data lines together away from the Wi-Fi antenna area to avoid interference.

![hour_17_routing_spi_and_i2s_buses](https://halflife.hackclub-assets.com/sessions/hekUGdMUsJvkfZr4IeTGwJeZETfm9ZrV/9e2a48fed1b81f8a6561efb17738379881df82dd88f0eba5c184d5ef497038ed.png)

---

### Hour 18: Power traces and ground planes

Ran thick 0.8mm traces for 5V power and 3.3V power rails to handle peak Wi-Fi and speaker currents. Then poured uninterrupted solid ground planes on both the top and bottom copper layers.

![hour_18_power_traces_and_ground_pour](https://halflife.hackclub-assets.com/sessions/hekUGdMUsJvkfZr4IeTGwJeZETfm9ZrV/4e90329e8c00aa74148d176c4f0ecc637ab31fc0d5c2516501b09386c4836dc2.png)

---

### Hour 19: Stitching vias and thermal pads

Dropped stitching vias all across the ground planes to keep ground impedance low. Added thermal vias under the ESP32-S3 ground slug and the MAX98357A amplifier to pull heat into the copper planes.

![hour_19_ground_stitching_vias](https://halflife.hackclub-assets.com/sessions/hekUGdMUsJvkfZr4IeTGwJeZETfm9ZrV/52376249bb6f15d6d3eda45e44e085ab155351a5616b7bdb65b417a34537e8fc.png)

---

### Hour 20: DRC checks and silkscreen labels

Ran the KiCad Design Rules Check against JLCPCB 2-layer fab rules (6 mil trace/space). Added pin labels for the expansion header, clear polarity markings, and Hack Club Half Life silkscreen logos.

![hour_20_drc_and_silkscreen_legends](https://halflife.hackclub-assets.com/sessions/hekUGdMUsJvkfZr4IeTGwJeZETfm9ZrV/f94a16636d5d6192f4e4f5a7de0153c0fd86a0849e19be24b3142000462a56e8.png)

---

### Hour 21: Exporting Gerbers and drill files

Generated the Gerber files, drill map, and fabrication outputs. Inspected every layer in KiCad GerbView to double-check that solder mask expansions and drill registrations were 100% accurate.

![hour_21_gerbers_and_fab_files](https://halflife.hackclub-assets.com/sessions/hekUGdMUsJvkfZr4IeTGwJeZETfm9ZrV/3baae0b2ceaf5f4e8243bc206022cbbf7ed9c0d996fce1867df4083edd89ef1e.png)

---

### Hour 22: SMT BOM and Pick-and-Place CPL

Built the automated assembly BOM with LCSC component codes. Verified component rotations and pin-1 orientations in the CPL file so chips don't get placed upside down by pick-and-place machines.

![hour_22_smt_bom_and_cpl_rotations](https://halflife.hackclub-assets.com/sessions/hekUGdMUsJvkfZr4IeTGwJeZETfm9ZrV/1779e867df7241c141b3371d66d36d7950ea46f20227b28b574e7d9e463e3ffc.png)

---

### Hour 23: Firmware display driver and vector eye engine

Started the ESP32-S3 firmware in C++ using ESP-IDF. Wrote the ST7789 display driver over DMA SPI and built the procedural vector eye animation system that runs smooth 60fps blinks and pupil tracking.

![hour_23_firmware_vector_eyes_engine](https://halflife.hackclub-assets.com/sessions/hekUGdMUsJvkfZr4IeTGwJeZETfm9ZrV/bd615a86484e5082b2a23af692e60c4bd5578673cb18824efb8bf95049762f3f.png)

---

### Hour 24: Audio pipeline and Arc-Reactor halo code

Configured the dual hardware I2S channels for audio in and out. Wrote an RMT peripheral driver for the 8 NeoPixels so lighting animations run smoothly in the background without blocking the CPU.

![hour_24_firmware_audio_and_halo_rmt](https://halflife.hackclub-assets.com/sessions/hekUGdMUsJvkfZr4IeTGwJeZETfm9ZrV/76a7968251cd2de2eed303982be7096873328ff6815edfff52424a99c1748e81.png)

---

### Hour 25: Local Home Assistant integration and bench test

Wrote the WebSocket client to connect straight to Home Assistant over local Wi-Fi. Tested light toggles and sensor telemetry cards with sub-15ms response times, and measured idle power draw at 62mA.

![hour_25_local_ha_bench_testing](https://halflife.hackclub-assets.com/sessions/hekUGdMUsJvkfZr4IeTGwJeZETfm9ZrV/22368cadd393e0edf299a451bb6d55d8cc1446d4f1dbf9d78bb752a6735f20a6.png)

---

### Quick Summary

- **Hours Logged**: 15 hours (25 hours total project time)
- **Status**: Complete 2-layer PCB designed and routed in KiCad, JLCPCB Gerbers and SMT BOM/CPL verified, 60fps vector eye engine and audio firmware functional, and sub-15ms Home Assistant local control tested.
