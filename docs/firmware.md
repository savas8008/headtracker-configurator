# Firmware Yükleme

İki yol var: hazır derlenmiş dosyayı yüklemek ya da kaynaktan derlemek.

## Hazır firmware (önerilen)

Her `main` push'unda GitHub Actions firmware'i derler ve çıktısını saklar:

1. İlgili reponun **Actions** sekmesini açın
   ([verici](https://github.com/savas8008/headtracker-verici/actions),
   [alıcı](https://github.com/savas8008/headtracker-alici/actions))
2. En üstteki başarılı (yeşil) çalışmayı seçin
3. Sayfanın altındaki **Artifacts** bölümünden firmware dosyasını indirin

İndirdiğiniz `.bin` dosyasını [ESP Web Tools](https://espressif.github.io/esptool-js/)
gibi bir tarayıcı yükleyicisiyle ya da `esptool.py` ile yazabilirsiniz.

## Kaynaktan derleme

[PlatformIO](https://platformio.org/) kurulu olmalı:

```bash
git clone https://github.com/savas8008/headtracker-verici
cd headtracker-verici
pio run -t upload            # derle ve yükle
pio device monitor --baud 115200   # seri çıktıyı izle
```

Alıcı için aynı adımlar `headtracker-alici` reposunda geçerlidir.

## Yükleme sonrası

Cihazı USB ile bilgisayara takıp [konfigüratörü](konfigurator.md) açın. Verici
`ID:TX`, alıcı `ID:RX` olarak tanınır.

!!! note "Kart bootloader'a girmiyorsa"
    BOOT butonunu basılı tutarken USB'yi takın, sonra bırakın. ESP32-C3 böylece
    indirme moduna girer.
