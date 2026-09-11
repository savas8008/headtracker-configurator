# Hardware

## Transmitter (head unit)

| Component | Value |
|-----------|-------|
| Board | ESP32-C3 Mini **or** Deneyap Kart |
| Sensor | MPU6050 or LSM6DSM (I2C) |
| Supply | 3.3 V |
| Serial | 115200 baud |

**Board and sensor are independent** — all four combinations work. The device scans
the I2C bus at boot and identifies the sensor itself; detection is unambiguous
because the address ranges do not overlap (MPU6050 `0x68`/`0x69`,
LSM6DSM `0x6A`/`0x6B`).

| Board | Default SDA | Default SCL | Note |
|-------|-------------|-------------|------|
| ESP32-C3 Mini | GPIO 8 | GPIO 9 | Needs an external sensor |
| Deneyap Kart | GPIO 4 | GPIO 15 | **LSM6DSM is on-board**, no wiring |

**External sensor wiring:**

| Sensor | Board |
|--------|-------|
| VCC | 3V3 |
| GND | GND |
| SDA | Per the table above |
| SCL | Per the table above |

The I2C pins are not fixed — if your board differs, change them in the configurator's
**Sensor** section and restart the device. The same section lets you pick the sensor
by hand, but normally leave it on **Automatic**.

!!! tip "Why Deneyap Kart is convenient"
    With the IMU on the board, the soldering, the wiring and the whole I2C failure
    surface disappear. In exchange the board is noticeably larger than an ESP32-C3
    Mini and draws more current — measure your goggle mount before committing.

**BOOT button (GPIO 0):** a short press zeroes the current heading (re-centres).
Press it once before flying while looking straight ahead.

## Receiver (radio unit)

Only needed for PPM / SBUS modes. **Not used in ELRS Backpack mode.**

| Component | Value |
|-----------|-------|
| Board | ESP32-C3 Mini **or** Deneyap Kart |
| Output pin | GPIO 7 on C3, GPIO 23 (D0) on Deneyap — configurable |
| Serial | 115200 baud |

The output pin is set on the **transmitter** and announced to the receiver over the
air. The transmitter cannot know which board the receiver is, so the receiver
validates what arrives against its own table; a pin unusable on that board falls
back to the board default.

The output pin goes to your radio's trainer input; grounds must be common.

!!! warning "Trainer cable"
    The trainer jack is usually a 3.5 mm stereo connector with signal on the tip and
    GND on the sleeve. Verify against your radio's manual — a swapped cable simply
    produces no signal.

## Mounting tips

- Mount the sensor (or the board carrying it) **rigidly** to the goggles. A loose
  sensor produces vibration and drift.
- Align the sensor axes with your head axes; a tilted mount cannot be fixed by
  calibration and will cross-couple the channels.
- If the sensor sits rotated 90° or upside down, that is a setting rather than a
  mounting error: fix it in the configurator's **Axis orientation** field
  (e.g. `-Y+X+Z`), then recalibrate.
- Leave slack in the cable. A cable pulled taut around your neck causes I2C errors.
