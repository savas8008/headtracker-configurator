# Configurator

A browser-based settings tool. Nothing to install:
**[savas8008.github.io/headtracker-configurator](https://savas8008.github.io/headtracker-configurator/)**

!!! info "Browser support"
    Requires the Web Serial API: **Chrome, Edge or Opera** (desktop). Firefox and
    Safari do not support it.

## Connecting

1. Plug the device into USB
2. Press **Connect over USB** and pick the port
3. The device identifies itself; the TX panel opens for the transmitter, RX for the receiver

## Transmitter settings

| Setting | What it does |
|---------|--------------|
| **Sensitivity** | How strongly head angle maps to the channel. `PWM = 1500 + angle × sensitivity` |
| **Protocol** | Output mode: PPM / SBUS / inverted SBUS / [ELRS Backpack](backpack.md) |
| **Output pin** | Signal pin on the receiver (hidden in backpack mode) |
| **Filter (LPF)** | Vibration smoothing. 0 = off, 0.95 = very smooth but laggy |
| **PWM output range** | Lower/upper limit per axis (500–2500 µs) |
| **Reverse** | Inverts an axis |
| **SDA / SCL pin** | MPU6050 I2C pins (restart after changing) |

**Save** writes the settings to the device's non-volatile memory (NVS); they survive
a power cycle.

## Calibration

The sensor doesn't know its zero point at power-up; it has to be calibrated once.

1. Place the device on a **flat, vibration-free** surface
2. Press **Calibrate**
3. **Do not touch it** for 10 seconds
4. The result is stored permanently and loaded at every boot

!!! tip "When to recalibrate"
    If angles drift on their own, if you removed and remounted the sensor, or if the
    device will run at a very different temperature.

## Re-centring

Before flying, look straight ahead and short-press the transmitter's **BOOT button** —
the current heading becomes centre. This is different from calibration; nothing is
written permanently.

## Live preview

The TX panel shows a 3D model and live angle values. Use it to confirm the sensor
responds in the right direction.
