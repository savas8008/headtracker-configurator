# FPV Head Tracker

An open-source, ESP32-C3 based head tracker that maps your head movement onto your
FPV camera gimbal. Turn your head, the camera follows.

## What the system is made of

| Part | Where it lives | What it does |
|------|----------------|--------------|
| **Transmitter** | On your goggles / helmet | Reads head angles from an MPU6050 and sends them wirelessly |
| **Receiver** | On the radio's trainer port | Converts the incoming angles into PPM or SBUS |
| **Configurator** | In your browser | Settings, calibration and diagnostics over USB |

There is a fourth option: **ELRS Backpack mode**. In this mode no receiver module is
needed — the transmitter sends data straight to the ExpressLRS backpack inside your
radio's TX module, and the channels are injected into the RC link from there.

## Which mode should I pick?

``` mermaid
graph TD
    A[Does your radio have an ELRS<br>module with a backpack?] -->|Yes| B[ELRS Backpack mode<br>no receiver module needed]
    A -->|No| C[What does your radio's<br>trainer input accept?]
    C -->|PPM| D[PPM mode]
    C -->|SBUS| E[SBUS mode<br>use inverted if it doesn't work]
```

| Mode | Receiver module | Radio connection |
|------|-----------------|------------------|
| PPM | required | Trainer port, PPM |
| SBUS | required | Trainer port, SBUS |
| SBUS (inverted) | required | Trainer port, for radios expecting inverted SBUS |
| **ELRS Backpack** | **not needed** | ESP-NOW to the ELRS TX backpack |

## Quick start

1. [Build the hardware](donanim.md) — transmitter and (if you use one) receiver
2. [Flash the firmware](firmware.md)
3. [Configure and calibrate](konfigurator.md)
4. Pick your mode: [PPM/SBUS](modlar.md) or [ELRS Backpack](backpack.md)

!!! tip "If something doesn't work"
    Start with [Troubleshooting](sorun-giderme.md). For backpack-specific problems the
    table at the end of the [ELRS Backpack](backpack.md) page is more useful.

## Source code

| Repo | Contents |
|------|----------|
| [headtracker-verici](https://github.com/savas8008/headtracker-verici) | Transmitter firmware |
| [headtracker-alici](https://github.com/savas8008/headtracker-alici) | Receiver firmware |
| [headtracker-configurator](https://github.com/savas8008/headtracker-configurator) | Browser UI and these docs |
