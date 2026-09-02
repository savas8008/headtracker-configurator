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
| **SDA / SCL Pini** | MPU6050 I2C pinleri (değiştirince yeniden başlatın) |

Değişiklikler **Kaydet**'e basınca cihazın kalıcı belleğine (NVS) yazılır; güç
kesilse de korunur.

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
