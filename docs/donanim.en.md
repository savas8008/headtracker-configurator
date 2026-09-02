# Hardware

## Transmitter (head unit)

| Component | Value |
|-----------|-------|
| Board | ESP32-C3 Mini |
| Sensor | MPU6050 (I2C) |
| Supply | 3.3 V |
| Serial | 115200 baud (USB CDC) |

**Default wiring:**

| MPU6050 | ESP32-C3 |
|---------|----------|
| VCC | 3V3 |
| GND | GND |
| SDA | GPIO 8 |
| SCL | GPIO 9 |

The I2C pins are not fixed — if your board differs, change them in the configurator's
**SDA/SCL pin** fields and restart the device.

**BOOT button (GPIO 0):** a short press zeroes the current heading (re-centres).
Press it once before flying while looking straight ahead.

## Receiver (radio unit)

Only needed for PPM / SBUS modes. **Not used in ELRS Backpack mode.**

| Component | Value |
|-----------|-------|
| Board | ESP32-C3 Mini |
| Output pin | GPIO 7 (default, configurable) |
| Serial | 115200 baud |

The output pin goes to your radio's trainer input; grounds must be common.

!!! warning "Trainer cable"
    The trainer jack is usually a 3.5 mm stereo connector with signal on the tip and
    GND on the sleeve. Verify against your radio's manual — a swapped cable simply
    produces no signal.

## Mounting tips

- Mount the MPU6050 **rigidly** to the goggles. A loose sensor produces vibration and drift.
- Align the sensor axes with your head axes; a tilted mount cannot be fixed by
  calibration and will cross-couple the channels.
- Leave slack in the cable. A cable pulled taut around your neck causes I2C errors.
