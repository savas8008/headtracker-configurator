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

## Kumandadan sıfırlama

Head tracker'ın butonuna uzanmak zahmetliyse merkezi **kumandadaki bir anahtarla**
sıfırlayabilirsiniz. ELRS'te ekstra bir yazılım kurmanız gerekmez: TX modülü,
seçtiğiniz AUX anahtarının konumu değiştiğinde zaten backpack'e bir mesaj yolluyor
ve backpack bu mesajı ESP-NOW ile head tracker'a iletiyor. Head tracker da bunu
sıfırlama komutu olarak sayar.

İki tetikleyici seçilebilir:

| Seçenek | Kumandadaki ayar | Nasıl davranır |
|---------|------------------|----------------|
| **DVR Rec** *(önerilen)* | Lua → Backpack → **DVR Rec** → boş bir AUX | Anahtarın her hareketi sıfırlar. Gözlük backpack'iniz yoksa bu ayarın başka işlevi yoktur; kafa takibi hiç kesilmez. Model bazlı değildir |
| **HT Enable** | Lua → Backpack → **HT Enable** → bir AUX | Anahtarı indirip kaldırmak sıfırlar. Anahtar aşağıdayken kafa takibi gerçekten kapanır, kanallar kumandanın kendi değerlerine döner. Model bazlıdır |

Kurulum:

1. Kumandada yukarıdaki ayarlardan birini bir AUX'a alın. `DVR Rec` seçtiyseniz
   `DVR Srt Delay` ve `DVR Stp Delay` **0** kalsın.
2. Konfigüratörde backpack panelindeki **Kumandadan sıfırlama → Tetikleyici**'yi
   seçin ve **Kaydet**'e basın.
3. Anahtarı oynatın. Panelde *"🎯 Kumandadan sıfırlandı"* satırı belirmelidir.

### Anahtar yerine kumandayı yatırmak

Fiziksel bir anahtar harcamak istemiyorsanız, kumandanın **kendi ivmeölçerini**
tetikleyici yapabilirsiniz: kumandayı belli bir açıdan fazla öne yatırınca sıfırlar.
Kafanız ileri bakmaya devam ettiği için merkez de doğru oturur.

Gerekenler: dahili IMU'su olan bir EdgeTX kumandası (kaynak listesinde **TltX** ve
**TltY** görünüyorsa vardır) ve head tracker'da **DVR Rec** tetikleyicisinin seçili
olması.

1. **Ekseni bulun.** Ön/arka yatırmanın hangi kaynağa düştüğü karta göre değişir
   (`IMU_SWAP_TILT_XY`). Boş bir kanala geçici olarak `TltX`, sonra `TltY` atayıp
   **Model → Kanallar**'da kumandayı yatırırken hangisinin oynadığına bakın.
2. **Eşiği okuyun.** Değer ivmeölçerden gelir, yani yerçekimine göre mutlaktır —
   kaymaz. Varsayılan ölçekte yüzde kabaca `100 × sin(açı)`: 20° ≈ %34, 30° ≈ %50,
   45° ≈ %71. Yine de kesin sayıyı aynı kanal monitöründen okumak en sağlıklısı.
3. **Mantıksal anahtar.** `L1: a<x`, kaynak eşikte belirlediğiniz eksen, değer
   okuduğunuz yüzde (öne yatırınca değer negatifleşiyorsa `a<x`, pozitifleşiyorsa
   `a>x`). **Delay ≈ 0.5 sn** verin — eşiğin tam sınırında titremeyi engeller.
4. **Mikser.** Boş bir kanal açın, kaynağı doğrudan **L1**, ağırlık 100. Kanal
   normalde −%100, eşik aşılınca +%100 olur.
5. **ELRS Lua → Backpack → DVR Rec** → o kanalın AUX'u, ↑ yönü.
   Eşleme: `AUX1 = CH5` … `AUX8 = CH12`, `AUX10 = CH14`.

!!! warning "Kanal seçerken dikkat"
    `HT Start Channel`'ın ezdiği kanalları seçmeyin. ELRS AUX'ları **ezme
    işleminden sonra** okur, yani `HT Start Channel: Aux6` ise CH10/11/12 head
    tracking verisini taşır; oraya koyduğunuz mantıksal anahtar görünmez.

!!! tip "Bu kanalın havaya çıkması gerekmez"
    ELRS AUX durumunu modülün içindeki kanal verisinden okur, telemetri veya OTA
    paketinden değil. Yani `Switch Mode: 8ch` olsa bile çalışır ve link
    bant genişliğinden bir şey götürmez.

Tetikleme **her iki kenarda** olur: kumandayı yatırınca bir, düzeltince bir daha
sıfırlar. İkincisi zararsız, hatta emniyet — asıl önemlisi tetiklediğiniz anda
**kafanızın merkez saymak istediğiniz yöne bakıyor** olması.

!!! note "Cihazın butonu çalışmaya devam eder"
    Bu özellik BOOT butonunun yerine geçmez, yanına eklenir. Ayrıca yalnızca
    backpack modunda çalışır — diğer modlarda kumandayla doğrudan bir bağ yoktur.

!!! tip "Anlık (momentary) anahtar"
    `DVR Rec` her konum değişiminde tetiklendiği için anlık bir düğmeyle de
    çalışır: basıp bıraktığınızda iki olay üretir, sonuç aynıdır.

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
