# Firmware Yükleme

Firmware, **konfigüratör üzerinden tarayıcıdan** yüklenir. İndirilecek dosya, kurulacak
program yoktur; konfigüratör güncel sürümü kendisi bulur ve cihaza yazar.

!!! info "Gereksinimler"
    **Chrome veya Edge** (masaüstü) ve bir **veri kablosu**. Firefox ve Safari
    tarayıcıdan flaşlamayı desteklemez.

## Adımlar

1. Konfigüratörü açın:
   **[savas8008.github.io/headtracker-configurator](https://savas8008.github.io/headtracker-configurator/)**
2. Cihazı henüz **bağlamayın** — açılış ekranındaki firmware kartlarını göreceksiniz:
   **Alıcı (RX)** ve **Verici (TX)**. Her kartta güncel sürüm otomatik kontrol edilir.
3. Cihazı USB ile takın ve **indirme moduna** alın:
   **BOOT** butonunu basılı tutarken **RESET**'e kısa basın, sonra BOOT'u bırakın.
4. Yüklemek istediğiniz cihazın düğmesine basın — **⚡ Vericiyi Flaşla** veya
   **⚡ Alıcıyı Flaşla**.
5. Açılan pencereden seri portu seçin ve yüklemenin bitmesini bekleyin.
6. Bitince cihazı bir kez fişten çekip takın, sonra **USB'den Bağlan** ile
   [konfigüratöre bağlanın](konfigurator.md).

!!! tip "Firmware kartlarını göremiyorum"
    Kartlar yalnızca **hiçbir cihaz bağlı değilken** görünür. Bağlıysanız önce
    bağlantıyı kesin.

## Yükleme sonrası

İlk kurulumda yapılması gerekenler:

1. [Kalibrasyon](konfigurator.md#kalibrasyon) — cihazı düz zemine koyup 10 sn bekleyin
2. [Çıkış modunu seçin](modlar.md) ve ayarları kaydedin
3. Backpack modu kullanacaksanız [ELRS Backpack](backpack.md) sayfasını izleyin

Ayarlarınız cihazın kalıcı belleğinde tutulur; firmware güncellemesi bunları
genelde korur, yine de güncelleme sonrası bir kez gözden geçirin.

## Sorun giderme

| Belirti | Çözüm |
|---------|-------|
| Düğme pasif, "Chrome/Edge gerekli" yazıyor | Desteklenmeyen tarayıcı — Chrome veya Edge kullanın |
| Port listesi boş | Kablo veri taşımıyor olabilir; başka kablo deneyin |
| Yükleme başlamıyor / hemen hata veriyor | Cihaz indirme modunda değil. BOOT basılıyken RESET'e basıp tekrar deneyin |
| Yükleme yarıda kesiliyor | USB hub yerine doğrudan bilgisayara takın |
| Sürüm "Kontrol ediliyor..." kalıyor | İnternet bağlantınızı kontrol edin; sürüm bilgisi çevrimiçi alınır |
