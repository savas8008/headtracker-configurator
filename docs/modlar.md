# Çıkış Modları

Verici dört moddan biriyle çalışır. Mod, konfigüratördeki **Protokol** listesinden
seçilir ve cihazın kalıcı belleğine yazılır.

| Değer | Mod | Veri yolu |
|-------|-----|-----------|
| 0 | PPM | verici → alıcı → PPM → trainer portu |
| 1 | SBUS | verici → alıcı → SBUS → trainer portu |
| 2 | SBUS (ters) | verici → alıcı → ters SBUS → trainer portu |
| 3 | [ELRS Backpack](backpack.md) | verici → ELRS TX backpack → RC kanalları |

Mod 0–2'de verici ile alıcı arasındaki kablosuz bağlantı ESP-NOW üzerinden kurulur;
verici ayarlarını (hassasiyet, pin, PWM aralığı) alıcıya kendisi bildirir, ayrıca
alıcıyı ayrı ayarlamanız gerekmez.

## PPM

| Parametre | Değer |
|-----------|-------|
| Kanal sayısı | 8 |
| Çerçeve süresi | 22.5 ms |
| Darbe genişliği | 300 µs |
| Değer aralığı | 1000–2000 µs (merkez 1500) |
| Kanal 1 / 2 / 3 | Yaw / Pitch / Roll |
| Kanal 4–8 | Sabit 1500 µs |

Sinyal ESP32'nin RMT donanım birimiyle üretilir, ana döngüyü bloke etmez.

## SBUS ve SBUS (ters)

| Parametre | Değer |
|-----------|-------|
| Hız | 100000 baud, 8E2 |
| Çerçeve | 25 bayt, 16 kanal |
| Kanal 1 / 2 / 3 | Yaw / Pitch / Roll |

Çoğu kumanda **ters çevrilmiş** SBUS bekler — bu, listedeki `SBUS` seçeneğidir.
Kumandanız sinyal görmüyorsa `SBUS (Ters)` seçeneğini deneyin; ikisi yalnızca
sinyal polaritesinde farklıdır.

## Açı → kanal dönüşümü

Üç modda da aynı formül kullanılır:

```
PWM = 1500 + (açı_derece × hassasiyet)
```

Sonuç, o eksen için belirlediğiniz **PWM aralığına** kırpılır. Varsayılan hassasiyet
`5.5`; yani 45° kafa dönüşü ≈ 1500 + 247 = 1747 µs.

### Anti-wrap koruması

Yaw ekseni ±180°'de sarmalandığı için, sınıra yaklaşan bir değer aniden diğer uca
atlayabilir. Firmware bunu algılar: kanal alt/üst sınırın %25'lik bandındayken ters
uca sıçrama olursa değer sıçratılmaz, sınırda tutulur. Böylece arkanıza baktığınızda
gimbal ters yöne fırlamaz.

## Mod değiştirme

Konfigüratörden yeni modu seçip **Kaydet**'e basın.

!!! warning "Backpack moduna geçerken yeniden başlatın"
    Backpack modu cihazın WiFi MAC adresini değiştirdiği için, 0–2 ile 3 arasında
    geçiş yaparken vericinin yeniden başlatılması gerekir. Konfigüratör bunu
    Kaydet düğmesinde hatırlatır.

Verici backpack moduna geçtiğinde, açık kalmış bir alıcı modül varsa onu da otomatik
olarak susturur: alıcı PPM/SBUS çıkışını kapatır ve seri günlüğünde
`BACKPACK MODU (cikis kapali)` yazar.
