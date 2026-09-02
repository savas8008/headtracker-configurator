# Technical notes

This page is for developers and anyone curious about the protocol. For normal use the
[Configurator](konfigurator.md) and [ELRS Backpack](backpack.md) pages are enough.

## Repository layout

| Repo | Main files |
|------|------------|
| `headtracker-verici` | `rx.ino` (main loop), `HeadTrackerIMU`, `HeadTrackerESPNow`, `HeadTrackerBackpack` |
| `headtracker-alici` | `alici.ino`, `HeadTrackerESPNow`, `PPMEncoder`, `SBUSEncoder` |
| `headtracker-configurator` | `configurator.html` (single-file app), `docs/` (this site) |

## Serial commands (115200 baud)

### Transmitter

| Command | Description |
|---------|-------------|
| `GET_ID` | returns `ID:TX` |
| `GET_DATA` | starts the continuous angle/status stream |
| `GET_CONFIG` | dumps the whole configuration on one line |
| `calibrate` | IMU calibration (10 s, stored in NVS) |
| `SET_PROTOCOL:0-3` | output mode |
| `SET_SENS:5.5` | sensitivity |
| `SET_LPF:0.00-0.95` | low-pass filter |
| `SET_I2C_PINS:SDA,SCL` | I2C pins |
| `SET_PWM_RANGE:YAW\|PITCH\|ROLL,min,max` | per-axis PWM range |
| `SET_REVERSE:YAW\|PITCH\|ROLL,0\|1` | axis reverse |
| `SET_BIND_PHRASE:<text>` | ELRS bind phrase (max 32 chars, no commas) |
| `SET_UID:a,b,c,d,e,f` | set the UID directly; `SET_UID:CLEAR` to clear |
| `BP_STATUS` | backpack diagnostic dump |
| `BP_TEST` | 15 s channel sweep test |
| `BP_SCAN` | 10 s ESP-NOW transmitter scan |

### Receiver

| Command | Description |
|---------|-------------|
| `GET_ID` | returns `ID:RX` |
| `GET_DATA` | streams the PWM values |

## Custom ESP-NOW protocol (modes 0–2)

The transmitter broadcasts a single `ht_packet_t` struct:

- `HT_PKT_HANDSHAKE` — protocol, output pin, sensitivity, PWM ranges
- `HT_PKT_READY` — receiver acknowledgement
- `HT_PKT_ORIENT` — yaw / pitch / roll

The receiver learns its settings from the handshake and needs no configuration of its own.

## ELRS Backpack protocol (mode 3)

The transmitter behaves like an ExpressLRS VRX backpack.

**Identity (UID)** — derived exactly as ExpressLRS `build_flags.py` does:

```
UID = md5('-DMY_BINDING_PHRASE="<phrase>"')[0:6]
UID[0] &= ~0x01      # MAC must be unicast → first byte even
```

The UID is both the device's WiFi MAC address and the ESP-NOW destination; both sides
use the same address. The TX backpack drops packets whose source MAC doesn't match its UID.

**Transport:** WiFi STA, channel **1**, unencrypted ESP-NOW.

**Outgoing — `MSP_ELRS_BACKPACK_SET_PTR (0x0383)`**, every 20 ms:
3 × int16 CRSF values (191…1792), ordered **Pan / Tilt / Roll**.

**Incoming — `MSP_ELRS_BACKPACK_SET_HEAD_TRACKING (0x030D)`**: the radio's HT Enable
state. The TX only broadcasts it *on change*, so a device powered up later would never
learn it; we request the cached packet with `MSP_ELRS_REQU_VTX_PKT (0x0B)`.

**MSP v2 frame:** `$X<` + flags(1) + function(2, LE) + payloadSize(2, LE) + payload +
`crc8_dvb_s2` (over header and payload, polynomial `0xD5`).

!!! note "PTR is sent regardless of HT state"
    On the ELRS side `processPanTiltRollPacket` runs unconditionally; channel override
    is already gated by HT Enable. So the system works even if `0x030D` never arrives.

## Persistent storage (NVS)

| Namespace | Contents |
|-----------|----------|
| `ht_verici` | protocol, pins, sensitivity, LPF, PWM ranges, reverse, bind phrase, UID |
| `imu-offsets` | 6 offsets (accel/gyro X-Y-Z) and the `calibrated_ok` flag |

## Known traps

- **The backpack ships without an address** (`00:00:00:00:00:00`). Until you press
  `[Bind]` once in ELRS Lua, nothing is received — this is the biggest time sink.
- **`Telemetry: WiFi`** makes the backpack boot into its WiFi service and never start
  ESP-NOW; head tracking dies completely. `Off` and `ESPNOW` both work.
- **`HT Enable` / `HT Start Channel` are per model** and reset when you switch models.
- **The same MAC address** is used by the TX backpack, by us, and by the goggles if
  present. Goggles and tracker powered at once will collide.
- **Changing modes** changes the WiFi MAC, so it requires a restart.

## Contributing

Pull requests are welcome. Firmware changes are built with PlatformIO by GitHub Actions
on every push to `main`; a PR that breaks the build should not be merged.
