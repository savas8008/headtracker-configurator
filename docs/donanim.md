# Donanım

## Verici (kafa ünitesi)

| Bileşen | Değer |
|---------|-------|
| Kart | ESP32-C3 Mini **veya** Deneyap Kart |
| Sensör | MPU6050 veya LSM6DSM (I2C) |
| Besleme | 3.3 V |
| Seri hız | 115200 baud |

**Kart ve sensör birbirini kısıtlamaz** — dört kombinasyonun tamamı çalışır.
Cihaz açılışta I2C hattını tarar ve sensörü kendisi tanır; adres aralıkları
çakışmadığı için tanıma kesindir (MPU6050 `0x68`/`0x69`, LSM6DSM `0x6A`/`0x6B`).

| Kart | Varsayılan SDA | Varsayılan SCL | Not |
|------|----------------|----------------|-----|
| ESP32-C3 Mini | GPIO 8 | GPIO 9 | Harici sensör gerekir |
| Deneyap Kart | GPIO 4 | GPIO 15 | **LSM6DSM dahilidir**, ek kablo yok |

**Harici sensör bağlantısı:**

| Sensör | Karta |
|--------|-------|
| VCC | 3V3 |
| GND | GND |
| SDA | Yukarıdaki tabloya göre |
| SCL | Yukarıdaki tabloya göre |

I2C pinleri sabit değil — kartınızın yerleşimi farklıysa konfigüratördeki
**Sensör** bölümünden değiştirip cihazı yeniden başlatın. Aynı bölümden
sensörü elle de seçebilirsiniz, ama normalde **Otomatik**'te bırakın.

!!! tip "Deneyap Kart neden pratik?"
    IMU kart üzerinde olduğu için lehim, kablo ve I2C arıza yüzeyi ortadan kalkar.
    Buna karşılık kart ESP32-C3 Mini'den belirgin biçimde büyük ve daha çok akım
    çeker — gözlüğe monte edeceğiniz yeri önceden ölçün.

**BOOT butonu (GPIO 0):** kısa basış mevcut bakış yönünü sıfırlar (merkeze alır).
Uçuş öncesi başınız düz bakarken bir kez basın.

## Alıcı (kumanda ünitesi)

Yalnızca PPM / SBUS modlarında gerekir. **ELRS Backpack modunda alıcı kullanılmaz.**

| Bileşen | Değer |
|---------|-------|
| Kart | ESP32-C3 Mini **veya** Deneyap Kart |
| Çıkış pini | C3'te GPIO 7, Deneyap'ta GPIO 23 (D0) — değiştirilebilir |
| Seri hız | 115200 baud |

Çıkış pini **vericide** ayarlanır ve kablosuz olarak alıcıya bildirilir. Verici
alıcının hangi kart olduğunu bilemediği için alıcı geleni kendi tablosuna göre
doğrular; o kartta kullanılamayan bir pin gelirse kartın varsayılanına düşer.

Çıkış pini kumandanızın trainer girişine bağlanır; GND ortak olmalıdır.

!!! warning "Trainer kablosu"
    Kumandanın trainer jakı genelde 3.5 mm stereo'dur ve uç (tip) sinyal,
    gövde (sleeve) GND olur. Kumandanızın kılavuzundan doğrulayın; ters bağlantı
    sinyal görmemenize yol açar.

## Montaj ipuçları

- Sensörü (ya da dahili IMU'lu kartı) **gözlüğe sağlam sabitleyin**. Gevşek sensör
  titreşim ve sürüklenme üretir.
- Sensörün ekseni ile kafanızın ekseni hizalı olsun; hafif eğrilikler kalibrasyonla
  düzelmez, kanal karışmasına yol açar.
- Sensör 90° dönük ya da ters monte edildiyse bu bir montaj hatası değil, bir ayardır:
  konfigüratördeki **Eksen Yönü** alanından düzeltin (örn. `-Y+X+Z`), sonra yeniden
  kalibre edin.
- Kabloyu boynunuzda gerdirmeyecek şekilde bırakın; çekilen kablo I2C hatası verir.
