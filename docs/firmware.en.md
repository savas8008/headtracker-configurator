# Flashing the firmware

Two options: flash a prebuilt binary, or build from source.

## Prebuilt firmware (recommended)

GitHub Actions builds the firmware on every push to `main` and keeps the output:

1. Open the repo's **Actions** tab
   ([transmitter](https://github.com/savas8008/headtracker-verici/actions),
   [receiver](https://github.com/savas8008/headtracker-alici/actions))
2. Pick the topmost successful (green) run
3. Download the firmware from the **Artifacts** section at the bottom

Write the `.bin` with a browser flasher such as
[ESP Web Tools](https://espressif.github.io/esptool-js/) or with `esptool.py`.

## Building from source

Requires [PlatformIO](https://platformio.org/):

```bash
git clone https://github.com/savas8008/headtracker-verici
cd headtracker-verici
pio run -t upload                  # build and flash
pio device monitor --baud 115200   # watch the serial output
```

The same steps apply to `headtracker-alici` for the receiver.

## After flashing

Plug the device into USB and open the [configurator](konfigurator.md). The transmitter
identifies itself as `ID:TX`, the receiver as `ID:RX`.

!!! note "If the board won't enter the bootloader"
    Hold the BOOT button while plugging in USB, then release. That puts the ESP32-C3
    into download mode.
