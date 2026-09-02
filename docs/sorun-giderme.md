# Sorun Giderme

## Konfigüratör cihazı görmüyor

- Tarayıcı **Chrome / Edge / Opera** mı? Firefox ve Safari Web Serial desteklemez.
- Kablo **veri kablosu** mu? Bazı USB kabloları yalnızca güç taşır.
- Cihaz başka bir program tarafından tutuluyor olabilir (PlatformIO monitörü, Arduino IDE) — kapatın.
- Port listesinde çıkıyor ama tanınmıyorsa cihazı yeniden başlatıp tekrar bağlanın.

## Açılar sürükleniyor / kendiliğinden kayıyor

Kalibrasyon eksik ya da eskimiştir. Cihazı düz zemine koyup
[kalibrasyonu](konfigurator.md#kalibrasyon) tekrarlayın; 10 saniye boyunca dokunmayın.

Sürüklenme kalibrasyondan sonra da sürüyorsa sensörün mekanik olarak gevşek
olmadığından emin olun.

## Hareket çok titrek

**Filtre (LPF)** değerini kademeli artırın (0.2 → 0.4 → 0.6). Yüksek değerler
titremeyi azaltır ama tepkiyi geciktirir; uçuşta rahatsız edecek kadar gecikme
hissederseniz geri çekin.

## Hareket çok az / çok fazla

**Hassasiyet**'i ayarlayın. `PWM = 1500 + açı × hassasiyet`. Varsayılan 5.5;
gimbal az dönüyorsa artırın, aşırı dönüyorsa azaltın. Uç noktaları **PWM Çıkış
Aralığı** ile ayrıca sınırlayabilirsiniz.

## Eksen ters çalışıyor

İlgili eksenin **Reverse** kutusunu işaretleyin. Kanal karışıyorsa (kafayı yana
çevirince gimbal yukarı bakıyor gibi) sensörün montaj yönü hatalıdır — mekanik
hizalamayı düzeltin, yazılımla çözülmez.

## Alıcı bağlanmıyor

- Verici ve alıcı ikisi de açık mı, aralarında birkaç metreden fazla mesafe var mı?
- Vericinin modu 0–2'den biri olmalı. **Backpack modundaysa alıcı bilerek susturulur**;
  seri günlükte `BACKPACK MODU (cikis kapali)` yazar.
- Alıcının seri çıktısında `BAGLI` görünüyorsa bağlantı vardır, sorun trainer
  kablosunda veya kumanda ayarındadır.

## Kumanda trainer sinyali görmüyor

- Doğru mod mu? Kumandanız SBUS bekliyorsa PPM göndermek işe yaramaz.
- SBUS'ta polarite: `SBUS` çalışmıyorsa `SBUS (Ters)` deneyin.
- Trainer kablosunun uç/gövde bağlantısı doğru mu, GND ortak mı?
- Kumandanın kendi menüsünde trainer girişi etkin mi?

## Backpack modu sorunları

[ELRS Backpack](backpack.md#sorun-giderme) sayfasının sorun giderme tablosuna bakın —
durum satırı size hangi aşamada koptuğunu doğrudan söyler.

## Hiçbiri işe yaramadı

Konfigüratörde **Gelişmiş → Ham Durumu Göster** çıktısını alın ve sorununuzu
bu çıktıyla birlikte
[konfigüratör deposundaki Issues](https://github.com/savas8008/headtracker-configurator/issues)
üzerinden bildirin.
