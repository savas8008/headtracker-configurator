# ELRS Backpack Modu

Bu modda **alıcı modüle ihtiyaç yoktur**. Verici, kafa açısını doğrudan
kumandanızdaki ExpressLRS modülünün içindeki *backpack* yongasına ESP-NOW ile
gönderir; ELRS bu değerleri seçtiğiniz kanallara yazar ve RC linkiyle uçağa taşır.

Normalde bu işi HDZero gözlükleri yapar — biz gözlüğün yerini alıyoruz. TX backpack
açısından fark yoktur.

## Gereksinimler

- Kumandada **backpack'li bir ELRS TX modülü** (dahili veya harici)
- ELRS **V4+**, TX backpack **1.5.2+**
- EdgeTX trainer yolunu kullanacaksanız **EdgeTX 2.11+**

!!! danger "Önce backpack'iniz var mı bakın"
    Kumandada ELRS Lua → **Backpack** klasörünü açın ve **Version** satırına bakın.
    Boşsa modülünüzde çalışan bir backpack yok demektir; bu mod çalışmaz, PPM/SBUS
    kullanmanız gerekir.

## Kurulum

### 1. Backpack'i bir kez bind edin

**En çok atlanan adım budur.** Modülle gelen backpack fabrikadan *adressiz* çıkar
(adresi `00:00:00:00:00:00`). Bind yapılmadan gönderdiğimiz paketleri kimse almaz.

ELRS Lua'da **[Bind]**'e bir kez basın. Bu, TX modülünün kendi kimliğini backpack'e
yazar; backpack kaydedip yeniden başlar. Bundan sonra adresler örtüşür.

### 2. Kumanda ayarları

ELRS Lua → **Backpack** klasörü:

| Ayar | Değer |
|------|-------|
| Backpack | **On** |
| HT Enable | **On** (ya da bir AUX'a bağlayıp switch ile aç/kapa) |
| HT Start Channel | **Aux6** → CH10/11/12, veya **EdgeTX** (trainer girişi) |
| Telemetry | **Off** ya da **ESPNOW** — **WiFi seçmeyin** |

Ana ELRS ayarlarında **Switch Mode: 12ch veya 16ch/2** olmalı. 8ch modunda CH10 ve
üzeri alıcıya hiç gönderilmez, hiçbir hareket göremezsiniz.

!!! warning "Telemetry: WiFi head tracking'i öldürür"
    O seçenekte backpack açılışta WiFi servisine girer ve ESP-NOW'u hiç başlatmaz.
    `Off` ve `ESPNOW` ikisi de çalışır; `Off` 2.4 GHz'i en az meşgul edendir.

!!! note "Bu ayarlar model bazlıdır"
    `HT Enable` ve `HT Start Channel` kumandada **modele özeldir**. Model değiştirince
    yeniden ayarlamanız gerekir. `Telemetry` geneldir.

### 3. Vericiyi ayarlayın

Konfigüratörde:

1. **Protokol → ELRS Backpack (MSP)**
2. **Bind Phrase** alanına ELRS bind phrase'inizi yazın (kumandanızdakiyle harfi harfine aynı)
3. **Kaydet** → sonra **vericiyi yeniden başlatın**

Bind phrase'den bir kimlik (UID) türetilir; bu kimlik hem vericinin adresi hem de
hedef adres olur.

??? question "Bind phrase'imi bilmiyorum"
    ELRS modülü phrase'siz derlenip butonla bind edildiyse kimlik hesaplanamaz.
    Konfigüratörde **Gelişmiş → UID Taramasını Başlat**'ı çalıştırın ve tarama
    süresince kumandada Lua'dan HT Enable'ı kapatıp açın. Backpack o an yayın
    yapacağı için adresi yakalanır; çıkan adresi **UID** alanına yazın.

### 4. Doğrulayın

Konfigüratörün backpack panelindeki **durum satırı** yeşile dönmeli:
*"Çalışıyor — kafa hareketi kumandaya gönderiliyor (link %100)"*.

Sonra **Kanalları test et → Testi Başlat**'a basın: 15 saniye boyunca kafa hareketi
yerine düzenli bir tarama sinyali gönderilir. Kumandada kanal monitörünü açın
(**Model → Kanallar**) ve seçtiğiniz kanalın (Aux6 ise **CH10**) yavaşça sağa sola
gidip geldiğini görün. Test sonunda arayüz kanalın oynayıp oynamadığını sorar ve
cevabınıza göre ya kurulumun bittiğini söyler ya da kontrol listesi gösterir.

## Sorun giderme

Durum satırı ne diyorsa ona göre ilerleyin:

| Durum | Anlamı | Yapılacak |
|-------|--------|-----------|
| ⛔ **Pasif** | Verici backpack modunu başlatamadı | Bind phrase veya UID girip Kaydet'e basın, cihazı yeniden başlatın |
| ⛔ **Kumanda cevap vermiyor** | Paketler havaya çıkıyor ama o adreste kimse yok | ELRS Lua → **[Bind]** yapın. Sürerse bind phrase yanlış → UID taraması |
| ⏸ **Veri gönderilmiyor** | IMU okunamıyor | Kalibrasyon ve I2C pinlerini kontrol edin |
| ⚠ **HT Enable kapalı** | Bağlantı var ama ELRS kanala yazmıyor | Lua → Backpack → HT Enable: **On** |
| ✅ **Çalışıyor** ama kanal oynamıyor | Link tamam, sorun kanal eşlemesinde | Doğru kanala mı bakıyorsunuz (Aux6 → CH10)? Switch Mode 12ch/16ch mi? Doğru modelde misiniz? |

EdgeTX trainer yolunu seçtiyseniz ayrıca: **Model Setup → Trainer → Master/CRSF**
ve mikserlerde kaynak olarak **TR1 / TR2 / TR3**.

Protokolün iç işleyişi ve kod düzeyindeki ayrıntılar için
[Teknik Notlar](gelistirici.md) sayfasına bakın.
