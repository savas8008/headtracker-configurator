# Donanım

## Verici (kafa ünitesi)

| Bileşen | Değer |
|---------|-------|
| Kart | ESP32-C3 Mini |
| Sensör | MPU6050 (I2C) |
| Besleme | 3.3 V |
| Seri hız | 115200 baud (USB CDC) |

**Varsayılan bağlantılar:**

| MPU6050 | ESP32-C3 |
|---------|----------|
| VCC | 3V3 |
| GND | GND |
| SDA | GPIO 8 |
| SCL | GPIO 9 |

I2C pinleri sabit değil — kartınızın yerleşimi farklıysa konfigüratördeki
**SDA/SCL Pini** alanlarından değiştirip cihazı yeniden başlatın.

**BOOT butonu (GPIO 0):** kısa basış mevcut bakış yönünü sıfırlar (merkeze alır).
Uçuş öncesi başınız düz bakarken bir kez basın.

## Alıcı (kumanda ünitesi)

Yalnızca PPM / SBUS modlarında gerekir. **ELRS Backpack modunda alıcı kullanılmaz.**

| Bileşen | Değer |
|---------|-------|
| Kart | ESP32-C3 Mini |
| Çıkış pini | GPIO 7 (varsayılan, değiştirilebilir) |
| Seri hız | 115200 baud |

Çıkış pini kumandanızın trainer girişine bağlanır; GND ortak olmalıdır.

!!! warning "Trainer kablosu"
    Kumandanın trainer jakı genelde 3.5 mm stereo'dur ve uç (tip) sinyal,
    gövde (sleeve) GND olur. Kumandanızın kılavuzundan doğrulayın; ters bağlantı
    sinyal görmemenize yol açar.

## Montaj ipuçları

- MPU6050'yi **gözlüğe sağlam sabitleyin**. Gevşek sensör titreşim ve sürüklenme üretir.
- Sensörün ekseni ile kafanızın ekseni hizalı olsun; hafif eğrilikler kalibrasyonla
  düzelmez, kanal karışmasına yol açar.
- Kabloyu boynunuzda gerdirmeyecek şekilde bırakın; çekilen kablo I2C hatası verir.
