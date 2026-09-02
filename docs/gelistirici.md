# Teknik Notlar

Bu sayfa geliştiriciler ve protokolü merak edenler için. Kullanım için
[Konfigüratör](konfigurator.md) ve [ELRS Backpack](backpack.md) sayfaları yeterlidir.

## Depo yapısı

| Repo | Ana dosyalar |
|------|--------------|
| `headtracker-verici` | `rx.ino` (ana döngü), `HeadTrackerIMU`, `HeadTrackerESPNow`, `HeadTrackerBackpack` |
| `headtracker-alici` | `alici.ino`, `HeadTrackerESPNow`, `PPMEncoder`, `SBUSEncoder` |
| `headtracker-configurator` | `configurator.html` (tek dosya uygulama), `docs/` (bu site) |

## Seri komutlar (115200 baud)

### Verici

| Komut | Açıklama |
|-------|----------|
| `GET_ID` | `ID:TX` döner |
| `GET_DATA` | Sürekli açı/durum akışını başlatır |
| `GET_CONFIG` | Tüm konfigürasyonu tek satırda döker |
| `calibrate` | IMU kalibrasyonu (10 sn, NVS'e yazılır) |
| `SET_PROTOCOL:0-3` | Çıkış modu |
| `SET_SENS:5.5` | Hassasiyet |
| `SET_LPF:0.00-0.95` | Alçak geçiren filtre |
| `SET_I2C_PINS:SDA,SCL` | I2C pinleri |
| `SET_PWM_RANGE:YAW\|PITCH\|ROLL,min,max` | Eksen PWM aralığı |
| `SET_REVERSE:YAW\|PITCH\|ROLL,0\|1` | Eksen tersleme |
| `SET_BIND_PHRASE:<metin>` | ELRS bind phrase (maks. 32 karakter, virgülsüz) |
| `SET_UID:a,b,c,d,e,f` | UID'yi doğrudan gir; `SET_UID:CLEAR` ile sıfırla |
| `BP_STATUS` | Backpack teşhis dökümü |
| `BP_TEST` | 15 sn kanal süpürme testi |
| `BP_SCAN` | 10 sn ESP-NOW gönderici taraması |

### Alıcı

| Komut | Açıklama |
|-------|----------|
| `GET_ID` | `ID:RX` döner |
| `GET_DATA` | PWM değerlerini yayınlar |

## Kendi ESP-NOW protokolü (mod 0–2)

Verici, tek bir `ht_packet_t` yapısını broadcast eder:

- `HT_PKT_HANDSHAKE` — protokol, çıkış pini, hassasiyet, PWM aralıkları
- `HT_PKT_READY` — alıcının onayı
- `HT_PKT_ORIENT` — yaw / pitch / roll

Alıcı ayarları handshake'ten öğrenir; ayrıca yapılandırılması gerekmez.

## ELRS Backpack protokolü (mod 3)

Verici, ExpressLRS'in VRX backpack'i gibi davranır.

**Kimlik (UID)** — ExpressLRS `build_flags.py` ile birebir aynı türetme:

```
UID = md5('-DMY_BINDING_PHRASE="<phrase>"')[0:6]
UID[0] &= ~0x01      # MAC unicast olmalı → ilk bayt çift
```

UID hem cihazın WiFi MAC adresi hem de ESP-NOW hedef adresidir; iki taraf da aynı
adresi kullanır. TX backpack, kaynak MAC'i kendi UID'sine uymayan paketleri atar.

**Taşıma:** WiFi STA, kanal **1**, ESP-NOW şifresiz.

**Giden — `MSP_ELRS_BACKPACK_SET_PTR (0x0383)`**, 20 ms periyot:
3 × int16 CRSF değeri (191…1792), sıra **Pan / Tilt / Roll**.

**Gelen — `MSP_ELRS_BACKPACK_SET_HEAD_TRACKING (0x030D)`**: kumandadaki HT Enable
durumu. TX bunu yalnızca *değiştiğinde* yayınlar; sonradan açılan bir cihaz durumu
öğrenemeyeceği için `MSP_ELRS_REQU_VTX_PKT (0x0B)` ile önbellekteki paket istenir.

**MSP v2 çerçevesi:** `$X<` + flags(1) + function(2, LE) + payloadSize(2, LE) +
payload + `crc8_dvb_s2` (başlık ve payload üzerinden, polinom `0xD5`).

!!! note "PTR, HT durumundan bağımsız gönderilir"
    ELRS tarafında `processPanTiltRollPacket` koşulsuz çalışır; kanal ezme zaten
    HT Enable'a bağlıdır. Böylece `0x030D` hiç gelmese de sistem çalışır.

## Kalıcı depolama (NVS)

| Namespace | İçerik |
|-----------|--------|
| `ht_verici` | protokol, pinler, hassasiyet, LPF, PWM aralıkları, reverse, bind phrase, UID |
| `imu-offsets` | 6 offset değeri (accel/gyro X-Y-Z) ve `calibrated_ok` bayrağı |

## Bilinen tuzaklar

- **Backpack fabrikadan adressizdir** (`00:00:00:00:00:00`). ELRS Lua'dan bir kez
  `[Bind]` yapılmadan hiçbir paket alınmaz — en çok vakit kaybettiren nokta budur.
- **`Telemetry: WiFi`** seçilirse backpack açılışta WiFi servisine girer ve ESP-NOW'u
  hiç başlatmaz; head tracking tamamen ölür. `Off` ve `ESPNOW` çalışır.
- **`HT Enable` / `HT Start Channel` model bazlıdır**; model değişince sıfırlanır.
- **Aynı MAC adresi** hem TX backpack'te hem bizde hem de (varsa) gözlükte kullanılır.
  Gözlük ve tracker aynı anda açıksa çakışırlar.
- **Mod değişimi** WiFi MAC'ini değiştirdiği için yeniden başlatma ister.

## Katkı

Pull request'ler açıktır. Firmware değişiklikleri `main`'e push'ta GitHub Actions
tarafından PlatformIO ile derlenir; derleme kırılırsa PR birleştirilmemelidir.
