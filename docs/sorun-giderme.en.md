# Troubleshooting

## The configurator doesn't see the device

- Are you using **Chrome / Edge / Opera**? Firefox and Safari don't support Web Serial.
- Is the cable a **data cable**? Some USB cables carry power only.
- Another program may be holding the port (PlatformIO monitor, Arduino IDE) — close it.
- If the port appears but isn't identified, restart the device and reconnect.

## Angles drift on their own

Calibration is missing or stale. Put the device on a flat surface and repeat
[calibration](konfigurator.md#calibration); don't touch it for 10 seconds.

If drift persists after calibration, make sure the sensor isn't mechanically loose.

## Movement is too jittery

Raise the **Filter (LPF)** value gradually (0.2 → 0.4 → 0.6). Higher values reduce
jitter but add lag; back off if the delay becomes noticeable in flight.

## Movement is too small / too large

Adjust **Sensitivity**. `PWM = 1500 + angle × sensitivity`. The default is 5.5 — raise
it if the gimbal moves too little, lower it if it overshoots. You can also clamp the
extremes with the **PWM output range**.

## An axis moves the wrong way

Tick **Reverse** for that axis. If channels are cross-coupled (turning your head
sideways tilts the gimbal up), the sensor is mounted at an angle — fix the mechanical
alignment, software can't correct it.

## The receiver won't connect

- Are both units powered, and within a few metres of each other?
- The transmitter must be in mode 0–2. **In backpack mode the receiver is silenced on
  purpose**; its log shows `BACKPACK MODU (cikis kapali)`.
- If the receiver's serial output shows `BAGLI` the link is fine and the problem is in
  the trainer cable or the radio settings.

## The radio sees no trainer signal

- Right mode? Sending PPM to a radio expecting SBUS won't work.
- SBUS polarity: if `SBUS` does nothing, try `SBUS (inverted)`.
- Is the trainer cable's tip/sleeve wiring right, and is GND common?
- Is the trainer input enabled in the radio's own menu?

## Backpack mode problems

See the troubleshooting table on the [ELRS Backpack](backpack.md#troubleshooting) page —
the status line tells you exactly where the chain breaks.

## None of the above helped

Grab the output of **Advanced → Show raw status** in the configurator and report the
problem with it on
[GitHub Issues](https://github.com/savas8008/headtracker-verici/issues).
