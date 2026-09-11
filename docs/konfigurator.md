# Konfigüratör

Tarayıcıdan çalışan ayar arayüzü. Kurulum gerekmez:
**[savas8008.github.io/headtracker-configurator](https://savas8008.github.io/headtracker-configurator/)**

!!! info "Tarayıcı desteği"
    Web Serial API gerektirir: **Chrome, Edge veya Opera** (masaüstü). Firefox ve
    Safari desteklemez.

## Bağlanma

1. Cihazı USB ile takın
2. **USB'den Bağlan** düğmesine basın, listeden portu seçin
3. Cihaz kendini tanıtır; verici için TX paneli, alıcı için RX paneli açılır

## Verici ayarları

| Ayar | Ne işe yarar |
|------|--------------|
| **Hassasiyet** | Kafa açısının kanala ne kadar büyük yansıyacağı. `PWM = 1500 + açı × hassasiyet` |
| **Protokol** | Çıkış modu: PPM / SBUS / SBUS ters / [ELRS Backpack](backpack.md) |
| **Çıkış Pini** | Alıcıdaki sinyal pini (backpack modunda görünmez) |
| **Filtre (LPF)** | Titreşim yumuşatma. 0 = kapalı, 0.95 = çok yumuşak ama gecikmeli |
| **PWM Çıkış Aralığı** | Her eksen için alt/üst sınır (500–2500 µs) |
| **Reverse** | Ekseni ters çevirir |
| **Sensör** | Hangi IMU kullanılacak: Otomatik / MPU6050 / LSM6DSM |
| **SDA / SCL Pini** | I2C pinleri (değiştirince yeniden başlatın) |
| **Eksen Yönü** | Sensörün kutu içindeki yönü, örn. `+X+Y+Z` veya `-Y+X+Z` |

Değişiklikler **Kaydet**'e basınca cihazın kalıcı belleğine (NVS) yazılır; güç
kesilse de korunur.

## Sensör bölümü

Panelin üstündeki rozet hangi kartın bağlı olduğunu ve hangi sensörün tanındığını
gösterir. Normal durumda yeşildir ve sensör adını yazar.

**Sensör** seçimini genelde **Otomatik**'te bırakın: cihaz açılışta I2C hattını
tarar, iki ailenin adresleri çakışmadığı için tanıma kesindir. Elle seçim,
tanınmayan bir klon yongayla uğraşırken ya da hatta iki sensör birden varken
işe yarar.

**Eksen Yönü**, sensörün kutu içinde hangi yöne baktığını söyler. Belirtisi:
kafanızı yukarı kaldırdığınızda küp sağa yatıyor ya da bir eksen ters hareket
ediyor. Bunu kalibrasyon düzeltmez.

- Bir eksen ters hareket ediyorsa o harfin başına `-` koyun → `+X-Y+Z`
- İki eksen yer değiştirmişse harfleri takas edin → `+Y+X+Z`

Her eksen (X, Y, Z) tam bir kez geçmelidir. Değiştirdikten sonra **kalibrasyonu
tekrarlayın** — jiroskop sapması eski eksen haritasıyla ölçülmüştür.

**Uygula** düğmesi sensör seçimini, eksen yönünü ve I2C pinlerini birlikte
gönderir. I2C veri yolu açılışta kurulduğu için pin değişikliği yeniden başlatma
ister.

## Kalibrasyon

Sensör her açılışta sıfır noktasını bilmez; bir kez kalibre edilmesi gerekir.

1. Cihazı **düz ve titreşimsiz** bir zemine koyun
2. **Kalibrasyon** düğmesine basın
3. 10 saniye boyunca **hiç dokunmayın**
4. Sonuç kalıcı belleğe yazılır, her açılışta yüklenir

!!! tip "Ne zaman tekrar kalibre etmeli?"
    Açılar kendiliğinden sürükleniyorsa, sensörü söküp taktıysanız veya cihaz
    çok farklı bir sıcaklıkta çalışacaksa.

## Yön sıfırlama

Uçuş öncesi düz bakarken vericinin **BOOT butonuna** kısa basın — o an baktığınız
yön merkez kabul edilir. Kalibrasyondan farklıdır; kalıcı bir şey yazmaz.

## Canlı önizleme

TX paneli 3B bir model ve açı değerleriyle hareketi anlık gösterir. Sensörün doğru
yöne tepki verdiğini buradan doğrulayabilirsiniz.
