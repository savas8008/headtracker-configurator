# FPV Head Tracker

ESP32-C3 tabanlı, kafa hareketinizi FPV kameranızın gimbal'ine taşıyan açık kaynaklı
bir head tracker sistemi. Başınızı çevirdiğinizde kamera da çevrilir.

## Sistem neyden oluşuyor

| Parça | Nerede durur | Ne yapar |
|-------|--------------|----------|
| **Verici** | Gözlüğün/kaskın üstünde | MPU6050 ile kafa açısını okur, kablosuz gönderir |
| **Alıcı** | Kumandanın trainer portunda | Gelen açıyı PPM veya SBUS sinyaline çevirir |
| **Konfigüratör** | Tarayıcıda | USB ile ayar yapar, kalibrasyon ve teşhis sunar |

Dördüncü bir seçenek daha var: **ELRS Backpack modu**. Bu modda alıcı modüle hiç
gerek kalmaz — verici, veriyi doğrudan kumandanızdaki ExpressLRS modülünün backpack'ine
gönderir, kanallar RC linkine oradan işlenir.

## Hangi modu seçmeliyim?

``` mermaid
graph TD
    A[Kumandanızda ELRS modülü<br>ve backpack var mı?] -->|Evet| B[ELRS Backpack modu<br>alıcı modül gerekmez]
    A -->|Hayır| C[Kumandanın trainer girişi<br>hangisini kabul ediyor?]
    C -->|PPM| D[PPM modu]
    C -->|SBUS| E[SBUS modu<br>ters çalışırsa SBUS ters]
```

| Mod | Alıcı modül | Kumanda bağlantısı |
|-----|-------------|--------------------|
| PPM | gerekli | Trainer portu, PPM |
| SBUS | gerekli | Trainer portu, SBUS |
| SBUS (ters) | gerekli | Trainer portu, ters SBUS isteyen kumandalar |
| **ELRS Backpack** | **gerekmez** | ESP-NOW ile ELRS TX backpack |

## Hızlı başlangıç

1. [Donanımı kurun](donanim.md) — verici ve (kullanacaksanız) alıcı
2. [Firmware yükleyin](firmware.md)
3. [Konfigüratörden ayarlayın ve kalibre edin](konfigurator.md)
4. Modunuzu seçin: [PPM/SBUS](modlar.md) veya [ELRS Backpack](backpack.md)

!!! tip "Bir şey çalışmıyorsa"
    Önce [Sorun Giderme](sorun-giderme.md) sayfasına bakın. Backpack moduna özel
    sorunlar için [ELRS Backpack](backpack.md) sayfasının sonundaki tablo daha faydalı.

## Kaynak kod

| Repo | İçerik |
|------|--------|
| [headtracker-verici](https://github.com/savas8008/headtracker-verici) | Verici firmware'i |
| [headtracker-alici](https://github.com/savas8008/headtracker-alici) | Alıcı firmware'i |
| [headtracker-configurator](https://github.com/savas8008/headtracker-configurator) | Tarayıcı arayüzü ve bu dokümanlar |
