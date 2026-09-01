// ── Three.js Küp görselleştirme ───────────────────────────────────────────────
let scene, camera, renderer, model, controls3d;
let threeReady = false;

function makeFaceTexture(label, bg) {
    const sz  = 512;
    const cvs = document.createElement('canvas');
    cvs.width = cvs.height = sz;
    const ctx = cvs.getContext('2d');

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, sz, sz);

    ctx.strokeStyle = 'rgba(0,0,0,0.18)';
    ctx.lineWidth   = 14;
    ctx.strokeRect(7, 7, sz - 14, sz - 14);

    if (label) {
        ctx.fillStyle    = '#000000';
        ctx.font         = 'bold 110px Arial, sans-serif';
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, sz / 2, sz / 2);
    }
    return new THREE.CanvasTexture(cvs);
}

function init3D() {
    if (threeReady) return;
    threeReady = true;
    const container = document.getElementById('visualizer');
    scene = new THREE.Scene();
    const w = container.clientWidth  || 680;
    const h = container.clientHeight || 260;
    camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(3.2, 2.2, 5);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x8888aa, 0.9));
    const sun = new THREE.DirectionalLight(0xffffff, 1.4);
    sun.position.set(4, 8, 5);
    scene.add(sun);

    controls3d = new THREE.OrbitControls(camera, renderer.domElement);
    controls3d.enableDamping = true;
    controls3d.dampingFactor = 0.08;

    // BoxGeometry yüz sırası: +X, -X, +Y, -Y, +Z, -Z
    const materials = [
        new THREE.MeshStandardMaterial({ map: makeFaceTexture('SAĞ',  '#86efac'), roughness: 0.45 }),
        new THREE.MeshStandardMaterial({ map: makeFaceTexture('SOL',  '#fca5a5'), roughness: 0.45 }),
        new THREE.MeshStandardMaterial({ map: makeFaceTexture('ÜST',  '#e0e7ff'), roughness: 0.45 }),
        new THREE.MeshStandardMaterial({ map: makeFaceTexture('ALT',  '#fde68a'), roughness: 0.45 }),
        new THREE.MeshStandardMaterial({ map: makeFaceTexture('ÖN',   '#7dd3fc'), roughness: 0.45 }),
        new THREE.MeshStandardMaterial({ map: makeFaceTexture('ARKA', '#d8b4fe'), roughness: 0.45 }),
    ];

    const geo  = new THREE.BoxGeometry(2.5, 2.5, 2.5);
    model      = new THREE.Mesh(geo, materials);
    scene.add(model);

    const edges = new THREE.EdgesGeometry(geo);
    const line  = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x1e293b }));
    model.add(line);

    new ResizeObserver(() => {
        const cw = container.clientWidth, ch = container.clientHeight;
        if (!cw || !ch) return;
        camera.aspect = cw / ch;
        camera.updateProjectionMatrix();
        renderer.setSize(cw, ch);
    }).observe(container);

    (function animate() {
        requestAnimationFrame(animate);
        controls3d.update();
        renderer.render(scene, camera);
    })();
}

// ── İkon sabitleri ────────────────────────────────────────────────────────
const ICON_USB    = `<img src="assets/icons/usb.png" alt="USB" width="30" height="30">`;
const ICON_UNPLUG = `<img src="assets/icons/usb.png" alt="USB" width="30" height="30">`;

// ── DOM ────────────────────────────────────────────────────────────
const fwContainer   = document.getElementById('firmware-container');
const connectBtn    = document.getElementById('connectButton');
const statusDiv     = document.getElementById('status');
const loaderDiv     = document.getElementById('loader');
const txPanel       = document.getElementById('tx-panel');
const rxPanel       = document.getElementById('rx-panel');
const sensSlider    = document.getElementById('sensSlider');
const sensValSpan   = document.getElementById('sensVal');
const protoSelect   = document.getElementById('protoSelect');
const pinInput      = document.getElementById('pinInput');
const saveConfigBtn = document.getElementById('saveConfigBtn');
const lpfSlider     = document.getElementById('lpfSlider');
const lpfValSpan    = document.getElementById('lpfVal');
const sdaInput      = document.getElementById('sdaInput');
const sclInput      = document.getElementById('sclInput');
const applyPinBtn   = document.getElementById('applyPinButton');
const calibrateBtn  = document.getElementById('calibrateButton');
const calModal      = document.getElementById('cal-modal');
const modalTitle    = document.getElementById('modal-title');
const modalText     = document.getElementById('modal-text');
const progBar       = document.getElementById('prog-bar');
const countdown     = document.getElementById('countdown-timer');
const calDoneBtn    = document.getElementById('calibration-complete-btn');
const rxStatusBar   = document.getElementById('rx-status-bar');
const pwmYaw        = document.getElementById('pwmYaw');
const pwmPitch      = document.getElementById('pwmPitch');
const pwmRoll       = document.getElementById('pwmRoll');
const pwmYawVal     = document.getElementById('pwmYawVal');
const pwmPitchVal   = document.getElementById('pwmPitchVal');
const pwmRollVal    = document.getElementById('pwmRollVal');
const reverseInputs = {
    YAW: document.getElementById('yawReverse'),
    PITCH: document.getElementById('pitchReverse'),
    ROLL: document.getElementById('rollReverse')
};

// ── ELRS Elements ──
const modeTabs           = document.querySelectorAll('.mode-tab');
const bleContent         = document.getElementById('ble-content');
const elrsContent        = document.getElementById('elrs-content');
const elrsBindPhrase     = document.getElementById('elrsBindPhrase');
const elrsWifiChannel    = document.getElementById('elrsWifiChannel');
const elrsBackpackIP     = document.getElementById('elrsBackpackIP');
const applyELRSButton    = document.getElementById('applyELRSButton');
const elrsStatus         = document.getElementById('elrsStatus');
const elrsUID            = document.getElementById('elrsUID');

let port, reader, writer, lineBuffer = '', deviceType = null, calTimer, isClosing = false, identifyInterval = null;
let currentMode = 'ble';

// ── Mode Tab Switching ──
modeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const mode = tab.getAttribute('data-mode');
        switchMode(mode);
    });
});

function switchMode(mode) {
    currentMode = mode;
    
    // Update tab UI
    modeTabs.forEach(t => t.classList.remove('active'));
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    
    // Show/hide content
    if (mode === 'ble') {
        bleContent.classList.add('active');
        elrsContent.classList.remove('active');
    } else if (mode === 'elrs') {
        bleContent.classList.remove('active');
        elrsContent.classList.add('active');
    }
}

// ── RX PWM slider track renk güncelleme ──────────────────────────────────────
function updatePwmTrack(slider, value) {
    const pct = ((value - 1000) / 1000 * 100).toFixed(1);
    slider.style.background =
        `linear-gradient(to right, #22c55e 0%, #22c55e ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)`;
}
[pwmYaw, pwmPitch, pwmRoll].forEach(s => updatePwmTrack(s, 1500));

// ── TX Dual-range PWM ───────────────────────────────────────────────────────
const drChannels = [
    { min: document.getElementById('yawPwmMin'),   max: document.getElementById('yawPwmMax'),   fill: document.getElementById('drFillYaw'),   badge: document.getElementById('yawRangeBadge'),   cur: document.getElementById('drCurYaw') },
    { min: document.getElementById('pitchPwmMin'), max: document.getElementById('pitchPwmMax'), fill: document.getElementById('drFillPitch'), badge: document.getElementById('pitchRangeBadge'), cur: document.getElementById('drCurPitch') },
    { min: document.getElementById('rollPwmMin'),  max: document.getElementById('rollPwmMax'),  fill: document.getElementById('drFillRoll'),  badge: document.getElementById('rollRangeBadge'),  cur: document.getElementById('drCurRoll') },
];

function updateDualRangeCurrent(ch, pwmVal) {
    const lo = parseInt(ch.min.value), hi = parseInt(ch.max.value);
    const clamped = Math.max(lo, Math.min(hi, pwmVal));
    const pct = (clamped - 500) / 2000 * 100;
    ch.cur.style.left    = pct + '%';
    ch.cur.style.display = 'block';
}

function updateDualRange(ch) {
    const lo = parseInt(ch.min.value), hi = parseInt(ch.max.value);
    const total = 2500 - 500;
    const leftPct  = (lo - 500) / total * 100;
    const rightPct = (hi - 500) / total * 100;
    ch.fill.style.left  = leftPct  + '%';
    ch.fill.style.width = (rightPct - leftPct) + '%';
    ch.badge.innerHTML  = lo + '<br>' + hi;
}

drChannels.forEach(ch => {
    updateDualRange(ch);
    ch.min.addEventListener('input', () => {
        if (parseInt(ch.min.value) > parseInt(ch.max.value) - 50)
            ch.min.value = parseInt(ch.max.value) - 50;
        updateDualRange(ch);
    });
    ch.max.addEventListener('input', () => {
        if (parseInt(ch.max.value) < parseInt(ch.min.value) + 50)
            ch.max.value = parseInt(ch.min.value) + 50;
        updateDualRange(ch);
    });
    ch.min.addEventListener('input', () => {
        ch.min.style.zIndex = parseInt(ch.min.value) > 2000 ? '5' : '';
    });
});

// ── Olay Dinleyiciler ───────────────────────────────────────────────────────
calDoneBtn.addEventListener('click', () => calModal.classList.remove('show'));
connectBtn.addEventListener('click', () => port ? disconnectSerial() : connectSerial());

sensSlider.addEventListener('input', () => {
    sensValSpan.textContent = parseFloat(sensSlider.value).toFixed(1);
});

lpfSlider.addEventListener('input', () => {
    lpfValSpan.textContent = parseFloat(lpfSlider.value).toFixed(2);
});

applyPinBtn.addEventListener('click', () => {
    const sda = parseInt(sdaInput.value);
    const scl = parseInt(sclInput.value);
    if (sda >= 0 && sda <= 39 && scl >= 0 && scl <= 39 && sda !== scl) {
        writeSerial(`SET_I2C_PINS:${sda},${scl}\n`);
        applyPinBtn.textContent = '✓ Kaydedildi – Cihazı Yeniden Başlatın';
        setTimeout(() => { applyPinBtn.textContent = 'Uygula (Yeniden Başlat)'; }, 3000);
    }
});

saveConfigBtn.addEventListener('click', () => {
    const p = parseInt(pinInput.value);
    if (p < 0 || p > 39) return;
    writeSerial(`SET_SENS:${parseFloat(sensSlider.value).toFixed(1)}\n`);
    writeSerial(`SET_PROTOCOL:${protoSelect.value}\n`);
    writeSerial(`SET_OUTPUT_PIN:${p}\n`);
    writeSerial(`SET_LPF:${parseFloat(lpfSlider.value).toFixed(2)}\n`);
    const [yaw, pitch, roll] = drChannels;
    writeSerial(`SET_PWM_RANGE:YAW,${yaw.min.value},${yaw.max.value}\n`);
    writeSerial(`SET_PWM_RANGE:PITCH,${pitch.min.value},${pitch.max.value}\n`);
    writeSerial(`SET_PWM_RANGE:ROLL,${roll.min.value},${roll.max.value}\n`);
    writeSerial(`SET_REVERSE:YAW,${reverseInputs.YAW.checked ? 1 : 0}\n`);
    writeSerial(`SET_REVERSE:PITCH,${reverseInputs.PITCH.checked ? 1 : 0}\n`);
    writeSerial(`SET_REVERSE:ROLL,${reverseInputs.ROLL.checked ? 1 : 0}\n`);
    saveConfigBtn.textContent = '✓ Kaydedildi';
    setTimeout(() => { saveConfigBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg> Kaydet'; }, 3000);
});

calibrateBtn.addEventListener('click', () => { writeSerial('calibrate\n'); startCalVisuals(); });

// ── ELRS Backpack Button ──
applyELRSButton.addEventListener('click', () => {
    const phrase = elrsBindPhrase.value.trim();
    if (!phrase) {
        alert('Lütfen bir bind phrase girin');
        return;
    }
    writeSerial(`SET_MODE_ELRS:${phrase}\n`);
    applyELRSButton.textContent = '⏳ Bağlanılıyor...';
    applyELRSButton.disabled = true;
});

// ── Seri Port ──────────────────────────────────────────────────────────
async function connectSerial() {
    connectBtn.disabled = true;
    connectBtn.innerHTML = '<div class="loader" style="width:16px;height:16px;border-top-color:white;margin:0"></div>&nbsp;Bağlanılıyor...';
    statusDiv.textContent = 'Port seçiliyor...';
    statusDiv.className = '';
    try {
        port = await navigator.serial.requestPort({ filters: [
            { usbVendorId: 0x10C4 }, { usbVendorId: 0x1A86 }, { usbVendorId: 0x303A }
        ]});
        await port.open({ baudRate: 115200 });
        connectBtn.disabled = false;
        connectBtn.className = 'btn-connected';
        connectBtn.innerHTML = ICON_UNPLUG + '&nbsp;Bağlantıyı Kes';
        statusDiv.textContent = 'Cihaz tanımlanıyor...';
        statusDiv.className = 'connected';
        const enc = new TextEncoderStream();
        enc.readable.pipeTo(port.writable);
        writer = enc.writable.getWriter();
        const dec = new TextDecoderStream();
        port.readable.pipeTo(dec.writable);
        reader = dec.readable.getReader();
        readLoop();
        writeSerial('GET_ID\n');
        identifyInterval = setInterval(() => {
            if (!deviceType) writeSerial('GET_ID\n');
            else { clearInterval(identifyInterval); identifyInterval = null; }
        }, 2000);
    } catch (err) {
        connectBtn.disabled = false;
        connectBtn.className = 'btn-disconnected';
        connectBtn.innerHTML = ICON_USB + '&nbsp;USB\'den Bağlan';
        statusDiv.textContent = err.message.includes('No port selected') ? 'Bağlı Değil' : 'Bağlantı Hatası!';
        statusDiv.className = 'disconnected';
    }
}

async function disconnectSerial() {
    if (isClosing) return;
    isClosing = true;
    try { if (reader) await reader.cancel(); } catch (_) {}
    reader = null;
    try { if (writer) await writer.close(); } catch (_) {}
    writer = null;
    try { if (port) await port.close(); } catch (_) {}
    port = null;
    connectBtn.disabled = false;
    connectBtn.className = 'btn-disconnected';
    connectBtn.innerHTML = ICON_USB + '&nbsp;USB\'den Bağlan';
    statusDiv.textContent = 'Bağlı Değil';
    statusDiv.className = 'disconnected';
    txPanel.style.display = 'none';
    rxPanel.style.display = 'none';
    fwContainer.style.display = 'block';
    deviceType = null;
    if (identifyInterval) { clearInterval(identifyInterval); identifyInterval = null; }
    isClosing = false;
}

async function writeSerial(data) { if (writer) await writer.write(data); }

async function readLoop() {
    try {
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            lineBuffer += value;
            let i;
            while ((i = lineBuffer.indexOf('\n')) >= 0) {
                const line = lineBuffer.substring(0, i + 1).trim();
                lineBuffer = lineBuffer.substring(i + 1);
                if (line) handleLine(line);
            }
        }
    } catch (_) { if (!isClosing) disconnectSerial(); }
}

// ── Seri Veri İşleme ───────────────────────────────────────────────────────
function handleLine(line) {
    // Cihaz tanıma
    if (line.startsWith('ID:')) {
        const id = line.substring(3).trim();
        if (id === 'TX' && deviceType !== 'TX') {
            deviceType = 'TX';
            if (identifyInterval) { clearInterval(identifyInterval); identifyInterval = null; }
            statusDiv.textContent = 'Bağlı: Verici (TX)';
            fwContainer.style.display = 'none';
            txPanel.style.display = 'block';
            rxPanel.style.display = 'none';
            init3D();
            writeSerial('GET_CONFIG\n');
            writeSerial('GET_DATA\n');
            writeSerial('GET_MODE\n');
        } else if (id === 'RX' && deviceType !== 'RX') {
            deviceType = 'RX';
            if (identifyInterval) { clearInterval(identifyInterval); identifyInterval = null; }
            statusDiv.textContent = 'Bağlı: Alıcı (RX)';
            fwContainer.style.display = 'none';
            rxPanel.style.display = 'block';
            txPanel.style.display = 'none';
            writeSerial('GET_DATA\n');
        }
        return;
    }

    // Mode info
    if (line.startsWith('MODE:')) {
        const mode = parseInt(line.substring(5));
        if (mode === 2) {
            switchMode('elrs');
            writeSerial('GET_ELRS_STATUS\n');
        } else {
            switchMode('ble');
        }
        return;
    }

    // ELRS Status
    if (line.startsWith('ELRS_PHRASE:')) {
        elrsBindPhrase.value = line.substring(12);
        return;
    }

    if (line.startsWith('ELRS_UID:')) {
        const uid = line.substring(9);
        elrsUID.textContent = uid;
        return;
    }

    if (line.startsWith('ELRS_CONNECTED:')) {
        const connected = line.substring(15) === '1';
        elrsStatus.textContent = connected ? '✅ Bağlı' : '❌ Bağlı Değil';
        elrsStatus.style.color = connected ? 'var(--success-color)' : 'var(--danger-color)';
        applyELRSButton.textContent = '⚡ ELRS Backpack\'e Bağlan';
        applyELRSButton.disabled = false;
        return;
    }

    // TX canlı veri: P:pitch,R:roll,Y:yaw
    if (line.startsWith('P:') && deviceType === 'TX') {
        let pitch = 0, roll = 0, yaw = 0;
        line.split(',').forEach(p => {
            if (p.startsWith('P:'))      pitch = parseFloat(p.slice(2));
            else if (p.startsWith('R:')) roll  = parseFloat(p.slice(2));
            else if (p.startsWith('Y:')) yaw   = parseFloat(p.slice(2));
        });
        document.getElementById('pitchVal').textContent = pitch.toFixed(2);
        document.getElementById('yawVal').textContent   = yaw.toFixed(2);
        document.getElementById('rollVal').textContent  = roll.toFixed(2);
        if (model) {
            const r = Math.PI / 180;
            model.rotation.set(-pitch * r, yaw * r, -roll * r);
        }
        const sens = parseFloat(sensSlider.value) || 5.5;
        updateDualRangeCurrent(drChannels[0], Math.round(1500 + yaw   * sens * (reverseInputs.YAW.checked ? -1 : 1)));
        updateDualRangeCurrent(drChannels[1], Math.round(1500 + pitch * sens * (reverseInputs.PITCH.checked ? -1 : 1)));
        updateDualRangeCurrent(drChannels[2], Math.round(1500 + roll  * sens * (reverseInputs.ROLL.checked ? -1 : 1)));
        return;
    }

    // RX PWM verisi: PWM:yaw,pitch,roll
    if (line.startsWith('PWM:') && deviceType === 'RX') {
        const parts = line.substring(4).split(',');
        const y = parseInt(parts[0]) || 1500;
        const p = parseInt(parts[1]) || 1500;
        const ro = parseInt(parts[2]) || 1500;
        pwmYaw.value   = y;  pwmYawVal.textContent   = y;
        pwmPitch.value = p;  pwmPitchVal.textContent = p;
        pwmRoll.value  = ro; pwmRollVal.textContent  = ro;
        updatePwmTrack(pwmYaw, y);
        updatePwmTrack(pwmPitch, p);
        updatePwmTrack(pwmRoll, ro);
        if (rxStatusBar.classList.contains('waiting')) {
            rxStatusBar.classList.remove('waiting');
            rxStatusBar.classList.add('passive');
            rxStatusBar.textContent = '✅ PWM veri akışı aktif.';
        }
        return;
    }

    // TX konfig: CONFIG:PROTO:0,PIN:7,SENS:5.50,YAW:1000-2000,PITCH:1000-2000,ROLL:1000-2000
    if (line.startsWith('CONFIG:')) {
        const chMap = { YAW: drChannels[0], PITCH: drChannels[1], ROLL: drChannels[2] };
        line.substring(7).split(',').forEach(part => {
            if (part.startsWith('PROTO:'))     protoSelect.value = part.substring(6);
            else if (part.startsWith('PIN:'))  pinInput.value    = part.substring(4);
            else if (part.startsWith('SENS:')) {
                const v = parseFloat(part.substring(5));
                sensSlider.value = v;
                sensValSpan.textContent = v.toFixed(1);
            } else if (part.startsWith('SDA:')) {
                sdaInput.value = part.substring(4);
            } else if (part.startsWith('SCL:')) {
                sclInput.value = part.substring(4);
            } else if (part.startsWith('LPF:')) {
                const v = parseFloat(part.substring(4));
                lpfSlider.value = v;
                lpfValSpan.textContent = v.toFixed(2);
            } else {
                const m = part.match(/^(YAW|PITCH|ROLL):(\d+)-(\d+)(?::([01]))?$/);
                if (m && chMap[m[1]]) {
                    const ch = chMap[m[1]];
                    ch.min.value = m[2];
                    ch.max.value = m[3];
                    updateDualRange(ch);
                    if (reverseInputs[m[1]]) reverseInputs[m[1]].checked = m[4] === '1';
                }
            }
        });
        return;
    }

    // OK/ERR
    if (line.startsWith('OK:') || line.startsWith('ERR:')) {
        console.log('ESP:', line);
        if (line.toLowerCase().includes('kalibrasyon tamamland')) showCalComplete();
    }
}

// ── Kalibrasyon ─────────────────────────────────────────────────────────
function startCalVisuals() {
    modalTitle.textContent = 'Kalibrasyon Sürüyor...';
    modalText.textContent  = 'Cihazı 10 saniye düz zeminde sabit tutun.';
    progBar.style.width = '0%';
    progBar.style.backgroundColor = 'var(--primary-color)';
    countdown.textContent = '10';
    countdown.style.display = 'block';
    calDoneBtn.style.display = 'none';
    calModal.classList.add('show');
    
    let remaining = 10;
    calTimer = setInterval(() => {
        remaining--;
        countdown.textContent = remaining;
        progBar.style.width = ((10 - remaining) / 10 * 100) + '%';
        if (remaining <= 0) {
            clearInterval(calTimer);
            showCalComplete();
        }
    }, 1000);
}

function showCalComplete() {
    clearInterval(calTimer);
    modalTitle.textContent = 'Kalibrasyon Tamamlandı!';
    modalText.textContent  = 'IMU başarıyla kalibre edildi.';
    countdown.style.display = 'none';
    progBar.style.width = '100%';
    calDoneBtn.style.display = 'inline-flex';
}
