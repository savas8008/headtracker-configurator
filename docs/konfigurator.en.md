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
| **Shake immunity** | How much the filter trusts the accelerometer (Mahony Kp). Lower = more disturbance-resistant |
| **PWM output range** | Lower/upper limit per axis (500–2500 µs) |
| **Reverse** | Inverts an axis |
| **Sensor** | Which IMU to use: Automatic / MPU6050 / LSM6DSM |
| **SDA / SCL pin** | I2C pins (restart after changing) |
| **Axis orientation** | How the sensor sits in the enclosure, e.g. `+X+Y+Z` or `-Y+X+Z` |

**Save** writes the settings to the device's non-volatile memory (NVS); they survive
a power cycle.

## Sensor section

The badge at the top of the panel shows which board is connected and which sensor
was detected. Normally it is green and names the sensor.

Leave **Sensor** on **Automatic** in the usual case: the device scans the I2C bus at
boot and, because the two families sit at non-overlapping addresses, detection is
unambiguous. Manual selection is there for an unrecognised clone chip, or when two
sensors share the bus.

**Axis orientation** tells the device how the sensor faces inside the enclosure. The
symptom of a wrong value: you tilt your head up and the cube rolls sideways, or one
axis moves backwards. Calibration does not fix this.

- One axis moves backwards → put `-` in front of that letter: `+X-Y+Z`
- Two axes are swapped → swap the letters: `+Y+X+Z`

Each axis (X, Y, Z) must appear exactly once. After changing it, **recalibrate** —
the stored gyro bias was measured under the old axis map.

**Apply** sends the sensor selection, the axis orientation and the I2C pins together.
The I2C bus is set up at boot, so a pin change needs a restart.

## If it twitches while sitting still

The accelerometer measures gravity — but when the device is jolted it measures
gravity *plus* that jolt's acceleration, and the filter cannot tell them apart.
With **Shake immunity** set high, the filter follows that false tilt as-is.

Peak deviation produced by a small 0.3-second disturbance (0.1 g):

| Setting | Peak deviation |
|---------|----------------|
| 10 (old default) | 5.4° |
| 5 | 4.4° |
| **2 (default)** | **2.6°** |
| 1 | 1.5° |

If you see occasional multi-degree twitches while the device is still, lower
this. Lowering it shifts weight onto the gyro: disturbances show up less, tilt
correction gets a little slower.

!!! note "If the twitch is in yaw"
    Yaw has no absolute reference (no magnetometer, and the accelerometer cannot
    observe rotation about the gravity axis). A yaw wobble that **jumps and comes
    back** is therefore not yaw itself — it is a pitch/roll disturbance leaking
    into yaw. The leak grows when the zero reference is tilted, so **zero the
    device while it is level.** On the serial console, `IMU_STATS` reports that
    tilt as `ref_egim_derece` and the size of the disturbance driving the filter
    as `ivme_sapma_max_derece`.

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
