# Flashing the firmware

Firmware is flashed **from the browser, through the configurator**. There is nothing to
download and nothing to install; the configurator finds the current build and writes it
to the device.

!!! info "Requirements"
    **Chrome or Edge** (desktop) and a **data-capable USB cable**. Firefox and Safari
    cannot flash from the browser.

## Steps

1. Open the configurator:
   **[savas8008.github.io/headtracker-configurator](https://savas8008.github.io/headtracker-configurator/)**
2. **Don't connect the device yet** — the start screen shows the firmware cards:
   **Receiver (RX)** and **Transmitter (TX)**. Each card checks the current version automatically.
3. Plug the device into USB and put it into **download mode**:
   hold **BOOT**, tap **RESET**, then release BOOT.
4. Press the button for the device you want to flash — **⚡ Flash transmitter** or
   **⚡ Flash receiver**.
5. Pick the serial port in the dialog and wait for the write to finish.
6. Unplug and replug the device once, then press **Connect over USB** to
   [open the configurator](konfigurator.md).

!!! tip "I can't see the firmware cards"
    The cards only appear when **no device is connected**. Disconnect first.

## After flashing

For a first-time setup:

1. [Calibrate](konfigurator.md#calibration) — place the device on a flat surface and wait 10 s
2. [Pick the output mode](modlar.md) and save your settings
3. For backpack mode, follow the [ELRS Backpack](backpack.md) page

Settings live in the device's non-volatile memory. A firmware update normally keeps
them, but review them once after updating.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Button disabled, says Chrome/Edge required | Unsupported browser — use Chrome or Edge |
| Port list is empty | The cable may be power-only; try another one |
| Flashing won't start or fails immediately | The device isn't in download mode. Hold BOOT, tap RESET, retry |
| Flashing stops halfway | Plug directly into the computer instead of a USB hub |
| Version stuck on "Checking..." | Check your internet connection; the version is fetched online |
