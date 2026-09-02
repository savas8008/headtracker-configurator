# ELRS Backpack mode

In this mode **no receiver module is needed**. The transmitter sends head angles over
ESP-NOW straight to the *backpack* chip inside your radio's ExpressLRS module; ELRS
writes those values into the channels you choose and the RC link carries them to the aircraft.

HDZero goggles normally do this job — we take the goggles' place. From the TX
backpack's point of view there is no difference.

## Requirements

- An **ELRS TX module with a backpack** (internal or external) in your radio
- ELRS **V4+**, TX backpack **1.5.2+**
- **EdgeTX 2.11+** if you use the trainer path

!!! danger "Check that you actually have a backpack"
    In the radio open ELRS Lua → **Backpack** and look at the **Version** line. If it
    is empty there is no working backpack in your module; this mode cannot work and
    you need PPM/SBUS instead.

## Setup

### 1. Bind the backpack once

**This is the step everyone misses.** The backpack that ships with a module has no
address from the factory (`00:00:00:00:00:00`). Until it is bound, nobody receives
the packets we send.

Press **[Bind]** once in ELRS Lua. That writes the TX module's own identity into the
backpack; the backpack saves it and reboots. From then on the addresses match.

### 2. Radio settings

ELRS Lua → **Backpack**:

| Setting | Value |
|---------|-------|
| Backpack | **On** |
| HT Enable | **On** (or map it to an AUX switch) |
| HT Start Channel | **Aux6** → CH10/11/12, or **EdgeTX** (trainer input) |
| Telemetry | **Off** or **ESPNOW** — **never WiFi** |

In the main ELRS settings, **Switch Mode must be 12ch or 16ch/2**. In 8ch mode CH10 and
above are never sent to the receiver and you will see no movement at all.

!!! warning "Telemetry: WiFi kills head tracking"
    With that option the backpack boots into its WiFi service and never starts ESP-NOW.
    Both `Off` and `ESPNOW` work; `Off` uses the least 2.4 GHz airtime.

!!! note "These settings are per model"
    `HT Enable` and `HT Start Channel` are stored **per model** in the radio. Switching
    models means setting them again. `Telemetry` is global.

### 3. Configure the transmitter

In the configurator:

1. **Protocol → ELRS Backpack (MSP)**
2. Enter your ELRS **bind phrase** (character-for-character the same as the radio's)
3. **Save** → then **restart the transmitter**

An identity (UID) is derived from the bind phrase; it becomes both the transmitter's
own address and the destination address.

??? question "I don't know my bind phrase"
    If the ELRS module was built without a phrase and bound with the button, the
    identity cannot be computed. Run **Advanced → Start UID scan** in the configurator
    and, while it runs, toggle HT Enable off/on in Lua. The backpack transmits at that
    moment and its address is captured; put the result in the **UID** field.

### 4. Verify

The **status line** in the configurator's backpack panel should turn green:
*"Working — head movement is being sent to the radio (link 100%)"*.

Then press **Test channels → Start test**: for 15 seconds a steady sweep signal is sent
instead of head movement. Open the channel monitor on the radio (**Model → Channels**)
and watch your chosen channel (**CH10** for Aux6) move slowly back and forth. At the end
the interface asks whether the channel moved and either confirms the setup or shows a
checklist.

## Troubleshooting

Follow whatever the status line says:

| Status | Meaning | Do this |
|--------|---------|---------|
| ⛔ **Inactive** | The transmitter could not start backpack mode | Enter a bind phrase or UID, save, restart the device |
| ⛔ **Radio not responding** | Packets go out but nobody is at that address | Do **[Bind]** in ELRS Lua. If it persists the phrase is wrong → run the UID scan |
| ⏸ **No data being sent** | The IMU cannot be read | Check calibration and the I2C pins |
| ⚠ **HT Enable is off** | Link is fine but ELRS isn't writing the channels | Lua → Backpack → HT Enable: **On** |
| ✅ **Working** but no channel movement | Link is fine, the mapping is wrong | Are you watching the right channel (Aux6 → CH10)? Is Switch Mode 12ch/16ch? Are you on the right model? |

If you chose the EdgeTX trainer path, also set **Model Setup → Trainer → Master/CRSF**
and use **TR1 / TR2 / TR3** as mixer sources.

For the protocol internals and code-level details see [Technical notes](gelistirici.md).
