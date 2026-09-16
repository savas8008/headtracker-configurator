/**
 * en.js — Headtracker Configurator English locale (default language)
 */
window.HT_LOCALE_EN = {
    app: {
        title: 'ESP32 Headtracker Configurator',
    },
    header: {
        status_disconnected: 'Not connected',
        status_selecting_port: 'Selecting port...',
        status_identifying: 'Identifying device...',
        status_error: 'Connection error!',
        status_connected_tx: 'Connected: Head Tracker',
        status_connected_rx: 'Connected: Receiver Module',
        docs_btn: '📘 Guide',
        docs_btn_title: 'Setup and troubleshooting guide',
        usb_connection_alt: 'USB connection',
        connect_btn: "Connect via USB",
        disconnect_btn: 'Disconnect',
        connecting_btn: 'Connecting...',
    },
    common: {
        close: 'Close',
    },
    firmware: {
        section_title: '⚡ Firmware Update',
        flash_note_pre: 'Put the device into <strong>bootloader mode</strong> and press the button below.',
        flash_note_aria: 'How do I enter bootloader mode?',
        flash_note_post: 'Only <strong>Chrome / Edge</strong>.',
        flash_note_board: 'ESP32-C3 Mini and Deneyap Kart flash from the same button — the connected chip is detected automatically and the right firmware is selected.',
        checking: 'Checking...',
        not_found: '⚠ Firmware not found',
        rx_card_title: 'Receiver (RX) — Remote Module',
        rx_flash_btn: '⚡ Flash Receiver Module',
        tx_card_title: 'Head Tracker (Transmitter)',
        tx_card_icon_aria: 'FPV goggle head — head tracker device',
        tx_flash_btn: '⚡ Flash Head Tracker',
        unsupported: '⚠️ Chrome/Edge required',
    },
    tx_panel: {
        title: 'Head Tracker (Transmitter)',
        compact_note: 'Watch the cube to check head movement in real time.',
        compact_note_aria: 'About the cube visualization',
        cube: { right: 'RIGHT', left: 'LEFT', top: 'TOP', bottom: 'BOTTOM', front: 'FRONT', back: 'BACK' },
        i2c: {
            sda_label: 'SDA Pin',
            scl_label: 'SCL Pin',
            apply_btn: 'Apply (Restart)',
        },
        sensor: {
            title: '🧭 Sensor',
            title_aria: 'About sensor and I2C pins',
            detected_waiting: 'Waiting for sensor info…',
            sensor_label: 'Sensor',
            sensor_aria: 'About sensor selection',
            opt_auto: 'Auto-detect (recommended)',
            axes_label: 'Axis Orientation',
            axes_aria: 'What is axis orientation?',
            board_help_c3: 'Usable GPIO on this board: 0-10 and 18-21 (11-17 reserved for internal flash).',
            board_help_dydk: 'Usable GPIO on this board: 0-5, 12-15, 18-19, 21-23, 25-27, 32-33 (6-11 flash, 16-17 PSRAM, 34-39 input-only).',
            imu_badge_error: '⛔ <b>{board}</b> — sensor not found. Check the SDA/SCL pins and the wiring.',
            imu_badge_ok: '✅ <b>{board}</b> — <b>{detected}</b> connected',
            imu_badge_manual_suffix: ' (manually selected).',
            imu_badge_auto_suffix: ' (auto-detected).',
            apply_sent: '✓ Sent — restart the device',
            alert_invalid_i2c: 'Invalid I2C pin. {help}',
            alert_sda_scl_same: "SDA and SCL can't be the same pin.",
            alert_axes_format: 'Axis orientation must be in the +X+Y+Z format; each axis (X, Y, Z) must appear exactly once.',
            alert_invalid_zero_pin: 'Invalid button pin. {help}',
        },
        reset: {
            title: '🔄 Reset',
            desc: 'The ways you can reset the center — i.e. the direction treated as "forward".',
            pin_label: 'Button Pin',
            pin_aria: 'About the reset button pin',
            pin_placeholder: 'GPIO (default 0 = BOOT)',
            from_remote_label: 'From Remote',
            from_remote_aria: 'How does remote reset work?',
            opt_off: 'Off',
            opt_ht: 'HT Enable switch',
            opt_dvr: 'DVR Rec switch (recommended)',
            opt_both: 'Both',
            aux_link_aria: 'How do I find my reset AUX channel?',
            aux_link_text: 'How do I find my reset AUX channel?',
        },
        cal: {
            title: '🎯 Calibration',
            title_aria: 'About calibration',
            desc: 'Place the device on a flat surface.',
            btn: 'Calibrate IMU',
        },
        config: {
            title: '⚙️ Configuration',
            sens_label: 'Sensitivity',
            proto_label: 'Protocol',
            proto_sbus_rev: 'SBUS (Reversed)',
            output_pin_label: 'Output Pin',
            bind_label: 'Bind Phrase',
            bind_placeholder: 'ELRS bind phrase (no commas)',
            uid_label: 'UID (optional)',
            uid_placeholder: "64,69,87,110,97,85 — derived from phrase if empty",
            lpf_label: 'Filter (LPF)',
            kp_label: 'Shake Immunity',
            kp_aria: 'What is shake immunity?',
        },
        bp: {
            title_aria: 'About PWM range',
            status_waiting: 'Waiting for status…',
            test_title: 'Test channels',
            test_intro: 'For 15 seconds, a sweep signal is sent instead of head movement; you should see the matching channel move on your radio.',
            test_intro_aria: 'How to read the channel test',
            test_btn: 'Start Test (15 s)',
            test_running: '⏱ Sending sweep signal — <b>{left}</b> s. Watch the channel monitor on your radio.',
            ask_label: "Did the channel move left-right on your radio?",
            yes_btn: 'Yes, it moved',
            no_btn: 'No movement',
            verdict_yes: "✅ <b>The chain works.</b> Tracker → TX backpack → radio path is confirmed; your head movements now go through that channel. Setup complete.",
            verdict_no_intro: "⚠ <b>Packets are reaching the radio but not showing on the channel.</b> Check these in order:",
            verdict_no_1: 'Is Lua → Backpack → <b>HT Enable: On</b>? (if you bound it to an AUX, is that switch up?)',
            verdict_no_2: 'What is your <b>HT Start Channel</b>? If you chose Aux6, watch <b>CH10</b>, not CH1.',
            verdict_no_3: 'Is <b>Switch Mode 12ch or 16ch/2</b>? In 8ch mode, CH10+ is never sent.',
            verdict_no_4: 'If you chose EdgeTX, check Model Setup → Trainer → <b>Master/CRSF</b> with source TR1/TR2/TR3.',
            verdict_no_5: "These settings are <b>model-specific</b> — make sure you're on the right model.",
            guide_link: '📘 Detailed ELRS Backpack setup guide →',
            settings_aria: 'Radio settings',
            settings_label: 'Radio Settings',
            advanced_summary: 'Advanced',
            raw_status_btn: 'Show Raw Status',
            uid_scan_btn: 'UID Scan',
            advanced_tools_aria: 'What do these tools do?',
            scan_listening: "Listening — {left} s. Now toggle Lua → HT Enable off and on on your radio.",
            test_finished_pct: 'Test finished: <b>{sent}</b> sweep packets sent, <b>{q}%</b> received by the radio.',
            test_finished_none: "⛔ No packets reached the radio — the TX backpack isn't on this UID. On the radio, do <b>ELRS Lua → [Bind]</b>.",
            test_finished_plain: 'Test finished, back to normal operation.',
            pill_inactive: "⛔ <b>Inactive</b> — enter a bind phrase or UID and click Save, then restart the transmitter.",
            pill_measuring: 'Measuring…',
            pill_no_data: "⏸ <b>No data being sent</b> — the IMU may not be readable. Check calibration and I2C pins.",
            pill_no_ack: "⛔ <b>Radio isn't responding</b> — the TX backpack isn't on this UID. On the radio, do <b>ELRS Lua → [Bind]</b>.",
            pill_ht_off: '⚠ <b>HT Enable is off on the radio</b> — set Lua → Backpack → HT Enable: On. Data is being sent but not written to the channel.',
            pill_ok: '✅ <b>Working</b> — head movement is being sent to the radio',
            pill_ok_link: ' (link {q}%)',
            pill_ok_hint: 'Run the test below to confirm the channels actually move.',
        },
        pwm: {
            title: '📐 PWM Output Range',
            save_btn: 'Save',
            saved_btn: '✓ Saved',
            saved_backpack_btn: '✓ Saved — restart the transmitter',
        },
        rc_reset_help: {
            '0': 'Reset is only done using the button on the device.',
            '1': "Assign <b>Lua → Backpack → HT Enable</b> to an AUX on your radio; flipping the switch down and up resets.",
            '2': "Assign an empty AUX to <b>Lua → Backpack → DVR Rec</b> on your radio; every position change resets.",
            '3': 'Both switches reset.',
        },
        reset_from_radio: '🎯 <b>Reset from radio</b> — {src} switch ({time}).',
        alert_bind_or_uid_required: 'Backpack mode requires a bind phrase or UID.',
        alert_bind_no_comma: "Bind phrase can't contain a comma.",
    },
    rx_panel: {
        title: '🎮 Receiver (RX) — Remote Module',
        waiting_status: '⏳ Waiting for handshake — power on the transmitter and wait for the connection to be established.',
        pwm_active_status: '✅ PWM data stream active.',
        values_title: '📊 Channel PWM Values (Live)',
        passive_note: 'The receiver is in passive mode. All settings are configured through the transmitter.',
    },
    aux_modal: {
        title: 'How do I find my reset AUX channel?',
        body: `<p style="margin-top:8px">ELRS numbers channels as <b>AUX</b>, with an offset
    (<code>AUX1 = CH5</code>). Where head tracking data actually goes depends entirely
    on <b>HT Start Channel</b> — if <b>Aux…</b> is selected it overrides three RC channels,
    if <b>EdgeTX</b> is selected it goes to the radio as a trainer input without touching
    any channel. Choose your mode and the channel you're considering below.</p>`,
        channel_label: "Channel I'll use",
        channel_placeholder: 'CH number',
        aux_mode_edgetx: '📡 <b>EdgeTX (trainer) mode:</b> head tracking doesn\'t override any AUX channel. Data goes to the radio as a trainer input — <b>Pan → TR1</b>, <b>Tilt → TR2</b>, <b>Roll → TR3</b> (Model Setup → Trainer: Master/CRSF). So <b>all of CH5–CH14</b> are free for a reset switch.',
        aux_mode_n: '🎯 <b>Aux{n} mode:</b> head tracking overrides these channels — {list}. These channels can\'t be used for a reset switch.',
        aux_mode_over_suffix: ' (CH{chs} is already outside the DVR Rec list — not a problem.)',
        map_gimbal: '⛔ <b>CH{ch}</b> is a gimbal channel; ELRS doesn\'t list it as an AUX. The lowest selectable channel is <b>CH{first} = AUX1</b>.',
        map_out_of_range: '⛔ <b>CH{ch}</b> has no counterpart in Lua — the <b>DVR Rec</b> list ends at <b>AUX10 = CH{last}</b>.',
        map_used_by_ht: '⛔ <b>CH{ch} = AUX{aux}</b> — but head tracking uses this channel as <b>{role}</b>. Since ELRS reads AUXes after they\'re overridden, a switch placed here won\'t be seen. Choose another channel.',
        map_ok: '✅ <b>CH{ch} = AUX{aux}</b> — in Lua select <b>Backpack → DVR Rec: AUX{aux}↑</b>. This channel doesn\'t need to go over the air; Switch Mode doesn\'t matter.',
    },
    info: {
        flash: { title: 'Putting the device into bootloader mode', body: `
        <p>The ESP32 only accepts new firmware while in bootloader mode:</p>
        <ol>
            <li><b>Hold down</b> the <code>BOOT</code> button.</li>
            <li>While holding it, briefly press <code>RESET</code> once.</li>
            <li>Release <code>BOOT</code>, then click the flash button.</li>
        </ol>
        <p><b>These steps usually aren't needed on Deneyap Kart</b> — that board has a
           USB-UART bridge and enters bootloader mode automatically. Try clicking the
           flash button directly; if that doesn't work, follow the steps above.</p>
        <p>Select the device's serial port in the dialog that opens. Web Serial only
           works in <b>Chrome</b> and <b>Edge</b>; Firefox/Safari are not supported.</p>
        <p>Flashing isn't possible while the device is connected to the configurator —
           click <b>Disconnect</b> first.</p>` },

        i2c: { title: 'Sensor and I2C pins', body: `
        <p>The two GPIOs the sensor is wired to. The default depends on your board:
           <code>SDA = 8</code> / <code>SCL = 9</code> on the ESP32-C3 Mini,
           <code>SDA = 4</code> / <code>SCL = 15</code> on the Deneyap Kart.</p>
        <p>On the Deneyap Kart the built-in LSM6DSM is already wired to this bus — if
           you haven't attached an external sensor, you don't need to touch these
           values.</p>
        <p>Changing this <b>requires a restart</b> — the I2C bus is set up at boot.
           Power-cycle the device after applying.</p>
        <p>If the sensor isn't found at boot, the badge above turns red, the cube
           stays frozen, and <code>BP_STATUS</code> output shows <code>imu_hata=1</code>.</p>` },

        kp: { title: 'Shake immunity (Mahony Kp)', body: `
        <p>Controls <b>how much the filter trusts the accelerometer</b>. The
           accelerometer measures gravity — but when the device is shaken, it measures
           gravity <i>plus</i> the acceleration of that shake, and the filter can't
           tell the difference.</p>
        <p>If the value is high, the filter follows this false tilt as-is. Peak
           deviation produced by a small 0.3-second, 0.1 g shake:</p>
        <table style="width:100%; font-size:13px; border-collapse:collapse">
            <tr><td><b>10</b> (old)</td><td>5.4°</td></tr>
            <tr><td><b>5</b></td><td>4.4°</td></tr>
            <tr><td><b>2</b> (default)</td><td>2.6°</td></tr>
            <tr><td><b>1</b></td><td>1.5°</td></tr>
        </table>
        <p><b>Lowering it</b> gives more weight to the gyro: shake shows up less, but
           tilt correction slows down. <b>Raising it</b> does the opposite.</p>
        <p>If you see a few degrees of occasional jitter while the device is
           stationary, lower this setting — <code>2.0</code> is a good starting point,
           <code>1.0</code> if needed.</p>
        <p>This setting <b>doesn't directly affect yaw</b> (yaw has no gravity
           reference), but pitch/roll shake leaks into yaw if the reset reference was
           tilted — so it also reduces jitter on yaw.</p>` },

        'imu-select': { title: 'Sensor selection', body: `
        <p>The device scans the I2C bus at boot and <b>identifies the sensor itself</b>.
           The two families sit at different addresses, so there's no chance of
           confusion:</p>
        <ul>
            <li><b>MPU6050</b> — <code>0x68</code> / <code>0x69</code></li>
            <li><b>LSM6DSM</b> — <code>0x6A</code> / <code>0x6B</code>
                (the Deneyap Kart's built-in sensor)</li>
        </ul>
        <p>So normally leave this on <b>Auto</b>. Manual selection exists for dealing
           with an unrecognized clone chip, or for telling it which one to use when
           two sensors are present at once.</p>
        <p>The selection applies <b>immediately</b>; the device re-scans for the
           sensor right away.</p>` },

        axes: { title: 'Axis orientation', body: `
        <p>Tells the firmware which way the sensor faces inside the enclosure. This is
           needed because the chip is soldered in different orientations on different
           boards and breakout modules.</p>
        <p><b>Calibration doesn't fix this.</b> The symptom is: the cube tilts right
           when you raise your head, or an axis moves in reverse.</p>
        <p>How to find it — try one change at a time while watching the cube:</p>
        <ol>
            <li>If an axis moves <b>backwards</b>, put a <code>-</code> in front of
                that letter (e.g. <code>+X-Y+Z</code>).</li>
            <li>If two axes are <b>swapped</b>, swap the letters
                (e.g. <code>+Y+X+Z</code>).</li>
        </ol>
        <p>Each axis (X, Y, Z) must appear exactly once. After changing it,
           <b>repeat calibration</b> — gyro drift is stored in body-frame axes and was
           measured against the old mapping.</p>` },

        visual: { title: 'Cube visualization', body: `
        <p>The cube shows the <b>raw</b> angles from the device — sensitivity, PWM range,
           and reverse settings aren't reflected here. Its purpose is to confirm the
           sensor is reading correctly.</p>
        <p>You can drag the cube with your mouse; this only rotates the camera and
           doesn't affect the data.</p>
        <p>If the cube jitters, raise the <b>Filter (LPF)</b> value. If it drifts,
           run <b>Calibration</b>.</p>` },

        pwm: { title: 'PWM output range and reverse', body: `
        <p>The lowest and highest pulse width sent for each axis
           (500–2500 µs). Narrowing the handles by dragging them makes the camera turn
           less; widening them makes it turn more.</p>
        <p>The green line is the current value — turn your head and check whether it
           actually reaches the ends of the range.</p>
        <p><b>Reverse</b> flips the axis: check this if turning your head right makes
           the camera go left.</p>
        <p>In backpack mode this range is applied on the transmitter, and the result is
           converted to a CRSF channel value before being sent to the radio.</p>` },

        cal: { title: 'IMU calibration', body: `
        <p>Place the device on a <b>flat, vibration-free</b> surface and don't touch it
           for 10 seconds. Gyro drift is measured and written to the device's
           permanent storage — you don't need to repeat this on every boot.</p>
        <p>If the device moves during calibration the result will be off; if the
           angles drift slowly, repeat the calibration.</p>
        <p>Calibration is <b>not</b> the same as resetting the center. Press the reset
           button, or use remote reset, for that.</p>` },

        'zero-pin': { title: 'Reset button pin', body: `
        <p>The GPIO of the button that makes the current look direction the center on
           a short press. Default is <code>0</code>, i.e. the <b>BOOT</b> button on
           the board.</p>
        <p>If you wired your own button into the enclosure, enter its pin here. The
           button connects <b>between the pin and GND</b>; the internal pull-up is
           enabled, no external resistor is needed.</p>
        <p>Usable pins depend on your board; the note under the field shows the ones
           for your currently connected board. On the ESP32-C3: <code>0-10</code> and
           <code>18-21</code> (11-17 reserved for internal flash); on the Deneyap
           Kart: <code>0-5, 12-15, 18-19, 21-23, 25-27, 32-33</code> (6-11 flash,
           16-17 PSRAM, 34-39 input-only — no internal pull-ups, a button can't be
           wired there). It can't be the same as the I2C pins (SDA/SCL) — the device
           will reject that.</p>
        <p>The change takes effect immediately; no restart required.</p>` },

        'rc-reset': { title: 'How does remote reset work?', body: `
        <p>When the AUX switch you chose on the ELRS TX module <b>changes position</b>,
           it sends a message to the backpack, which relays it to the head tracker over
           ESP-NOW. In other words, the switch move is already a packet reaching us —
           we just treat it as a reset command. <b>No extra setup is needed on the
           ELRS side.</b></p>
        <table>
            <tr><th>Trigger</th><th>Radio setting</th><th>Behavior</th></tr>
            <tr><td><b>DVR Rec</b><br>(recommended)</td><td>Lua → Backpack → <b>DVR Rec</b> → an empty AUX</td>
                <td>Resets on every position change. If you don't have a goggle backpack,
                    this setting has no other function; head tracking is never
                    interrupted. It isn't model-specific.</td></tr>
            <tr><td><b>HT Enable</b></td><td>Lua → Backpack → <b>HT Enable</b> → an AUX</td>
                <td>Flipping the switch down then up resets. While the switch is down,
                    head tracking is actually disabled and the channels return to the
                    radio's own values. It is model-specific.</td></tr>
        </table>
        <p><b>Tilting the radio instead of a switch:</b> if your radio has a built-in
           gyro (if <code>TltX</code> / <code>TltY</code> appear in the source list),
           you can set up a logical switch and mix it onto a spare channel — tilting
           the radio past a certain angle resets. See the guide for details.</p>
        <p>The device's button keeps working in every case; this doesn't replace it.</p>` },

        'bp-setup': { title: 'Radio Settings', body: `
        <ol>
            <li>Open <b>ELRS Lua → Backpack</b>; the <b>Version</b> line should not be
                empty. If it is, no backpack is running on the module and this mode
                can't be used.</li>
            <li><b>Bind once on first setup.</b> The backpack ships unaddressed from
                the factory; without binding, nobody receives the packets we send.
                This is the step that wastes the most time.</li>
            <li><b>Backpack: On</b>, <b>HT Enable: On</b>,
                <b>HT Start Channel: Aux6</b> (→ CH10/11/12) or <b>EdgeTX</b> (trainer).</li>
            <li><b>Telemetry: Off</b> or <b>ESPNOW</b>. <b>Don't select WiFi</b> —
                in that mode the backpack never starts ESP-NOW, and head tracking dies
                entirely.</li>
            <li>In the main ELRS settings, <b>Switch Mode: 12ch</b> or <b>16ch/2</b>.
                In 8ch mode, CH10 and above never reach the receiver.</li>
            <li>Enter the bind phrase in the field on the left and click <b>Save</b>,
                then <b>restart</b> the device.</li>
        </ol>
        <p><b>Note:</b> <code>HT Enable</code> and <code>HT Start Channel</code> are
           model-specific settings — they reset when you switch models.</p>` },

        'bp-test': { title: 'How to read the channel test', body: `
        <p>Open the channel monitor on your radio: <b>Model → Channels</b>. Starting
           the test sends a steady sweep signal instead of head movement for 15
           seconds.</p>
        <p>You should see the channel you set as <b>HT Start Channel</b> (e.g. Aux6 →
           <b>CH10</b>) slowly sweep back and forth. This lets you visually confirm
           the whole chain (device → backpack → radio) is working.</p>
        <p>When the test ends, the interface asks whether the channel moved; based on
           your answer it either confirms the setup is complete or shows a checklist.</p>
        <p>No IMU data is sent during the test — this is normal, it returns to normal
           on its own after 15 seconds.</p>` },

        'bp-advanced': { title: 'Advanced diagnostic tools', body: `
        <p><b>Raw status:</b> dumps the UID, actual MAC address, WiFi channel, and
           packet counters. Share this output when reporting an issue.</p>
        <p><b>UID scan:</b> only needed if <b>you don't know your bind phrase</b>
           (e.g. the ELRS module was built without a phrase and bound with the
           button). It listens for 10 seconds and lists ESP-NOW addresses on the air.</p>
        <p>The TX backpack only transmits when a setting changes, so during the scan
           you need to toggle <b>HT Enable</b> off and on from Lua on the radio —
           otherwise there's nothing to hear and the list comes back empty. That
           doesn't mean "no backpack".</p>
        <p>No head tracking data is sent during the scan; channels on the radio freeze
           for 10 seconds. This is also normal.</p>` },
    },
    cal_modal: {
        running_title: 'Calibrating...',
        running_text: 'Hold the device still on a flat surface for 10 seconds.',
        waiting_esp: 'Waiting for confirmation from ESP...',
        success_title: 'Calibration Successful!',
        success_text: 'Sensor offsets saved.',
        ok_btn: 'OK',
    },
};
