/**
 * tr.js — Headtracker Configurator Türkçe dil dosyası
 */
window.HT_LOCALE_TR = {
    app: {
        title: 'ESP32 Headtracker Konfigüratör',
    },
    header: {
        status_disconnected: 'Bağlı değil',
        status_selecting_port: 'Port seçiliyor...',
        status_identifying: 'Cihaz tanımlanıyor...',
        status_error: 'Bağlantı Hatası!',
        status_connected_tx: 'Bağlı: Kafa Takip Cihazı',
        status_connected_rx: 'Bağlı: Kumanda Modülü',
        docs_btn: '📘 Kılavuz',
        docs_btn_title: 'Kurulum ve sorun giderme kılavuzu',
        usb_connection_alt: 'USB bağlantısı',
        connect_btn: "USB'den Bağlan",
        disconnect_btn: 'Bağlantıyı Kes',
        connecting_btn: 'Bağlanılıyor...',
    },
    common: {
        close: 'Kapat',
    },
    firmware: {
        section_title: '⚡ Firmware Güncelleme',
        flash_note_pre: 'Cihazı <strong>bootloader moduna</strong> alıp aşağıdaki butona basın.',
        flash_note_aria: 'Nasıl bootloader moduna alınır?',
        flash_note_post: 'Sadece <strong>Chrome / Edge</strong>.',
        flash_note_board: 'ESP32-C3 Mini ve Deneyap Kart aynı butondan yüklenir — bağlı çip otomatik tanınıp doğru firmware seçilir.',
        checking: 'Kontrol ediliyor...',
        not_found: '⚠ Firmware bulunamadi',
        rx_card_title: 'Alıcı (RX) — Kumanda Modülü',
        rx_flash_btn: '⚡ Kumanda Modülünü Flaşla',
        tx_card_title: 'Kafa Takip Cihazı (Verici)',
        tx_card_icon_aria: 'FPV gözlüklü kafa — kafa takip cihazı',
        tx_flash_btn: '⚡ Kafa Takip Cihazını Flaşla',
        unsupported: '⚠️ Chrome/Edge gerekli',
    },
    tx_panel: {
        title: 'Kafa Takip Cihazı (Verici)',
        compact_note: 'Küpü izleyerek baş hareketini anlık kontrol edin.',
        compact_note_aria: 'Küp görselleştirme hakkında',
        cube: { right: 'SAĞ', left: 'SOL', top: 'ÜST', bottom: 'ALT', front: 'ÖN', back: 'ARKA' },
        i2c: {
            sda_label: 'SDA Pini',
            scl_label: 'SCL Pini',
            apply_btn: 'Uygula (Yeniden Başlat)',
        },
        sensor: {
            title: '🧭 Sensör',
            title_aria: 'Sensör ve I2C pinleri hakkında',
            detected_waiting: 'Sensör bilgisi bekleniyor…',
            sensor_label: 'Sensör',
            sensor_aria: 'Sensör seçimi hakkında',
            opt_auto: 'Otomatik tanı (önerilen)',
            axes_label: 'Eksen Yönü',
            axes_aria: 'Eksen yönü nedir?',
            board_help_c3: 'Bu kartta kullanılabilir GPIO: 0-10 ve 18-21 (11-17 dahili flash).',
            board_help_dydk: 'Bu kartta kullanılabilir GPIO: 0-5, 12-15, 18-19, 21-23, 25-27, 32-33 (6-11 flash, 16-17 PSRAM, 34-39 yalnızca giriş).',
            imu_badge_error: '⛔ <b>{board}</b> — sensör bulunamadı. SDA/SCL pinlerini ve kabloyu kontrol edin.',
            imu_badge_ok: '✅ <b>{board}</b> — <b>{detected}</b> bağlı',
            imu_badge_manual_suffix: ' (elle seçildi).',
            imu_badge_auto_suffix: ' (otomatik tanındı).',
            apply_sent: '✓ Gönderildi — cihazı yeniden başlatın',
            alert_invalid_i2c: 'Geçersiz I2C pini. {help}',
            alert_sda_scl_same: 'SDA ve SCL aynı pin olamaz.',
            alert_axes_format: 'Eksen yönü +X+Y+Z biçiminde olmalı; her eksen (X, Y, Z) tam bir kez geçmeli.',
            alert_invalid_zero_pin: 'Geçersiz buton pini. {help}',
        },
        reset: {
            title: '🔄 Sıfırlama',
            desc: 'Merkezi — yani "ileri" kabul edilen yönü — hangi yollarla sıfırlayabileceğiniz.',
            pin_label: 'Buton Pini',
            pin_aria: 'Sıfırlama butonu pini hakkında',
            pin_placeholder: 'GPIO (varsayılan 0 = BOOT)',
            from_remote_label: 'Kumandadan',
            from_remote_aria: 'Kumandadan sıfırlama nasıl çalışıyor?',
            opt_off: 'Kapalı',
            opt_ht: 'HT Enable anahtarı',
            opt_dvr: 'DVR Rec anahtarı (önerilen)',
            opt_both: 'İkisi de',
            aux_link_aria: 'Sıfırlama AUX kanalımı nasıl öğrenebilirim?',
            aux_link_text: 'Sıfırlama AUX kanalımı nasıl öğrenebilirim?',
        },
        cal: {
            title: '🎯 Kalibrasyon',
            title_aria: 'Kalibrasyon hakkında',
            desc: 'Cihazı düz bir zemine koyun.',
            btn: 'IMU Kalibre Et',
        },
        config: {
            title: '⚙️ Yapılandırma',
            sens_label: 'Hassasiyet',
            proto_label: 'Protokol',
            proto_sbus_rev: 'SBUS (Ters)',
            output_pin_label: 'Çıkış Pini',
            bind_label: 'Bind Phrase',
            bind_placeholder: 'ELRS bind phrase (virgülsüz)',
            uid_label: 'UID (opsiyonel)',
            uid_placeholder: "64,69,87,110,97,85 — boşsa phrase'den türetilir",
            lpf_label: 'Filtre (LPF)',
            kp_label: 'Sarsıntı Bağışıklığı',
            kp_aria: 'Sarsıntı bağışıklığı nedir?',
        },
        bp: {
            title_aria: 'PWM aralığı hakkında',
            status_waiting: 'Durum bekleniyor…',
            test_title: 'Kanalları test et',
            test_intro: '15 sn boyunca kafa hareketi yerine tarama sinyali gönderilir; kumandada ilgili kanalın oynadığını görmelisiniz.',
            test_intro_aria: 'Kanal testi nasıl okunur?',
            test_btn: 'Testi Başlat (15 sn)',
            test_running: '⏱ Tarama sinyali gönderiliyor — <b>{left}</b> sn. Kumandadaki kanal monitörüne bakın.',
            ask_label: 'Kumandada kanal sağa-sola oynadı mı?',
            yes_btn: 'Evet, oynadı',
            no_btn: 'Hayır, hareket yok',
            verdict_yes: '✅ <b>Zincir çalışıyor.</b> Tracker → TX backpack → kumanda yolu tamam; artık kafa hareketleriniz aynı kanaldan gidiyor. Kurulum bitti.',
            verdict_no_intro: '⚠ <b>Paketler kumandaya ulaşıyor ama kanala yansımıyor.</b> Sırayla kontrol edin:',
            verdict_no_1: 'Lua → Backpack → <b>HT Enable: On</b> mu? (bir AUX\'a bağladıysanız o switch yukarıda mı)',
            verdict_no_2: '<b>HT Start Channel</b> hangisi? Aux6 seçtiyseniz <b>CH10</b>\'a bakmalısınız, CH1\'e değil.',
            verdict_no_3: '<b>Switch Mode 12ch veya 16ch/2</b> mi? 8ch modunda CH10+ hiç gönderilmez.',
            verdict_no_4: 'EdgeTX seçtiyseniz Model Setup → Trainer → <b>Master/CRSF</b> ve kaynak TR1/TR2/TR3.',
            verdict_no_5: 'Bu ayarlar <b>model bazlıdır</b> — doğru modelde olduğunuzdan emin olun.',
            guide_link: '📘 Ayrıntılı ELRS Backpack kurulum kılavuzu →',
            settings_aria: 'Kumanda ayarları',
            settings_label: 'Kumanda Ayarları',
            advanced_summary: 'Gelişmiş',
            raw_status_btn: 'Ham Durumu Göster',
            uid_scan_btn: 'UID Taraması',
            advanced_tools_aria: 'Bu araçlar ne yapar?',
            scan_listening: "Dinleniyor — {left} sn. Şimdi kumandada Lua → HT Enable'ı kapatıp açın.",
            test_finished_pct: 'Test bitti: <b>{sent}</b> tarama paketi gönderildi, <b>%{q}</b>\'i kumanda tarafından alındı.',
            test_finished_none: '⛔ Hiçbir paket kumandaya ulaşmadı — TX backpack bu UID\'de değil. Kumandada <b>ELRS Lua → [Bind]</b> yapın.',
            test_finished_plain: 'Test bitti, normal akışa dönüldü.',
            pill_inactive: '⛔ <b>Pasif</b> — bind phrase veya UID girip Kaydet\'e basın, sonra vericiyi yeniden başlatın.',
            pill_measuring: 'Ölçülüyor…',
            pill_no_data: '⏸ <b>Veri gönderilmiyor</b> — IMU okunamıyor olabilir. Kalibrasyonu ve I2C pinlerini kontrol edin.',
            pill_no_ack: '⛔ <b>Kumanda cevap vermiyor</b> — TX backpack bu UID\'de değil. Kumandada <b>ELRS Lua → [Bind]</b> yapın.',
            pill_ht_off: '⚠ <b>Kumandada HT Enable kapalı</b> — Lua → Backpack → HT Enable: On yapın. Veri gidiyor ama kanala yazılmıyor.',
            pill_ok: '✅ <b>Çalışıyor</b> — kafa hareketi kumandaya gönderiliyor',
            pill_ok_link: ' (link %{q})',
            pill_ok_hint: 'Kanalların gerçekten oynadığını görmek için aşağıdaki testi çalıştırın.',
        },
        pwm: {
            title: '📐 PWM Çıkış Aralığı',
            save_btn: 'Kaydet',
            saved_btn: '✓ Kaydedildi',
            saved_backpack_btn: '✓ Kaydedildi — vericiyi yeniden başlatın',
        },
        rc_reset_help: {
            '0': 'Sıfırlama yalnızca cihazdaki butonla yapılır.',
            '1': 'Kumandada <b>Lua → Backpack → HT Enable</b>\'ı bir AUX\'a alın; anahtarı indirip kaldırmak sıfırlar.',
            '2': 'Kumandada <b>Lua → Backpack → DVR Rec</b>\'e boş bir AUX seçin; her konum değişimi sıfırlar.',
            '3': 'Her iki anahtar da sıfırlar.',
        },
        reset_from_radio: '🎯 <b>Kumandadan sıfırlandı</b> — {src} anahtarı ({time}).',
        alert_bind_or_uid_required: 'Backpack modu için bind phrase veya UID gerekli.',
        alert_bind_no_comma: 'Bind phrase virgül içeremez.',
    },
    rx_panel: {
        title: '🎮 Alıcı (RX) — Kumanda Modülü',
        waiting_status: '⏳ Handshake bekleniyor — vericiyi açın ve bağlantının kurulmasını bekleyin.',
        pwm_active_status: '✅ PWM veri akışı aktif.',
        values_title: '📊 Kanal PWM Değerleri (Canlı)',
        passive_note: 'Alıcı pasif moddadır. Tüm ayarlar verici üzerinden yapılandırılır.',
    },
    aux_modal: {
        title: 'Sıfırlama AUX kanalımı nasıl öğrenebilirim?',
        body: `<p style="margin-top:8px">ELRS kanalları <b>AUX</b> adıyla sayar ve numaralar kaymıştır
    (<code>AUX1 = CH5</code>). Kafa takibi verisinin nereye gittiği ise
    <b>HT Start Channel</b>'a göre tamamen değişir — <b>Aux…</b> seçiliyse üç RC kanalını
    ezer, <b>EdgeTX</b> seçiliyse hiçbir kanala dokunmadan kumandaya trainer girişi
    olarak gider. Aşağıdan modunuzu ve kullanmayı düşündüğünüz kanalı seçin.</p>`,
        channel_label: 'Kullanacağım kanal',
        channel_placeholder: 'CH numarası',
        aux_mode_edgetx: '📡 <b>EdgeTX (trainer) modu:</b> kafa takibi hiçbir AUX kanalını ezmez. Veri kumandaya trainer girişi olarak gider — <b>Pan → TR1</b>, <b>Tilt → TR2</b>, <b>Roll → TR3</b> (Model Setup → Trainer: Master/CRSF). Dolayısıyla <b>CH5–CH14\'ün tamamı</b> sıfırlama anahtarına serbesttir.',
        aux_mode_n: '🎯 <b>Aux{n} modu:</b> kafa takibi şu kanalları ezer — {list}. Bu kanallar sıfırlama anahtarına kullanılamaz.',
        aux_mode_over_suffix: ' (CH{chs} zaten DVR Rec listesinin dışında — sorun değil.)',
        map_gimbal: '⛔ <b>CH{ch}</b> gimbal kanalıdır; ELRS onu AUX olarak listelemez. En düşük seçilebilir kanal <b>CH{first} = AUX1</b>.',
        map_out_of_range: '⛔ <b>CH{ch}</b> için Lua\'da karşılık yok — <b>DVR Rec</b> listesi <b>AUX10 = CH{last}</b>\'te biter.',
        map_used_by_ht: '⛔ <b>CH{ch} = AUX{aux}</b> — ama bu kanalı kafa takibi <b>{role}</b> olarak kullanıyor. ELRS AUX\'ları ezmeden sonra okuduğu için buraya koyduğunuz anahtar görünmez. Başka bir kanal seçin.',
        map_ok: '✅ <b>CH{ch} = AUX{aux}</b> — Lua\'da <b>Backpack → DVR Rec: AUX{aux}↑</b> seçin. Bu kanalın havaya çıkması gerekmez, Switch Mode fark etmez.',
    },
    info: {
        flash: { title: 'Cihazı bootloader moduna alma', body: `
        <p>ESP32 yeni firmware'i ancak bootloader modundayken kabul eder:</p>
        <ol>
            <li><code>BOOT</code> butonunu <b>basılı tutun</b>.</li>
            <li>Basılı tutarken <code>RESET</code>'e kısa bir kez basın.</li>
            <li><code>BOOT</code>'u bırakın, ardından flaşlama butonuna tıklayın.</li>
        </ol>
        <p><b>Deneyap Kart'ta bu adımlar genellikle gerekmez</b> — o kartta USB-UART
           köprüsü vardır ve bootloader'a otomatik geçilir. Doğrudan flaşlama
           butonuna basmayı deneyin, olmazsa yukarıdaki sırayı izleyin.</p>
        <p>Açılan pencereden cihazın seri portunu seçin. Web Serial yalnızca
           <b>Chrome</b> ve <b>Edge</b>'de vardır; Firefox/Safari çalışmaz.</p>
        <p>Cihaz konfigüratöre bağlıyken flaşlama yapılamaz — önce
           <b>Bağlantıyı Kes</b>'e basın.</p>` },

        i2c: { title: 'Sensör ve I2C pinleri', body: `
        <p>Sensörün bağlı olduğu iki GPIO. Varsayılan kartınıza göre değişir:
           ESP32-C3 Mini'de <code>SDA = 8</code> / <code>SCL = 9</code>,
           Deneyap Kart'ta <code>SDA = 4</code> / <code>SCL = 15</code>.</p>
        <p>Deneyap Kart'ta dahili LSM6DSM zaten bu hatta bağlıdır — harici sensör
           takmadıysanız bu değerlere dokunmanız gerekmez.</p>
        <p>Değişiklik <b>yeniden başlatma ister</b> — I2C veri yolu açılışta kuruluyor.
           Uyguladıktan sonra cihazın gücünü kesip verin.</p>
        <p>Açılışta sensör bulunamazsa yukarıdaki rozet kırmızı olur, küp donuk
           kalır ve <code>BP_STATUS</code> çıktısında <code>imu_hata=1</code> görünür.</p>` },

        kp: { title: 'Sarsıntı bağışıklığı (Mahony Kp)', body: `
        <p>Filtrenin <b>ivmeölçere ne kadar güvendiğini</b> belirler. İvmeölçer
           yerçekimini ölçer — ama cihaz sarsıldığında yerçekimi <i>artı</i> o
           sarsıntının ivmesini ölçer, ve filtre aradaki farkı bilemez.</p>
        <p>Değer yüksekse filtre bu sahte eğimi olduğu gibi takip eder. 0.3 saniye
           süren küçük bir sarsıntının (0.1 g) ürettiği tepe sapma:</p>
        <table style="width:100%; font-size:13px; border-collapse:collapse">
            <tr><td><b>10</b> (eski)</td><td>5.4°</td></tr>
            <tr><td><b>5</b></td><td>4.4°</td></tr>
            <tr><td><b>2</b> (varsayılan)</td><td>2.6°</td></tr>
            <tr><td><b>1</b></td><td>1.5°</td></tr>
        </table>
        <p><b>Düşürmek</b> jiroskopa ağırlık verir: sarsıntı daha az yansır,
           buna karşılık eğim düzeltmesi yavaşlar. <b>Yükseltmek</b> tersi.</p>
        <p>Cihaz dururken arada bir kaç derecelik titreme görüyorsanız bu ayarı
           düşürün — <code>2.0</code> iyi bir başlangıç, gerekirse <code>1.0</code>.</p>
        <p>Bu ayar <b>yaw'ı doğrudan etkilemez</b> (yaw'ın yerçekimi referansı
           yoktur), ama pitch/roll sarsıntısı sıfırlama referansı eğikse yaw'a
           sızar — dolayısıyla yaw'daki titremeyi de azaltır.</p>` },

        'imu-select': { title: 'Sensör seçimi', body: `
        <p>Cihaz açılışta I2C hattını tarar ve sensörü <b>kendisi tanır</b>. İki aile
           farklı adreslerde durduğu için karışma ihtimali yok:</p>
        <ul>
            <li><b>MPU6050</b> — <code>0x68</code> / <code>0x69</code></li>
            <li><b>LSM6DSM</b> — <code>0x6A</code> / <code>0x6B</code>
                (Deneyap Kart'ın dahili sensörü)</li>
        </ul>
        <p>Bu yüzden normalde <b>Otomatik</b>'te bırakın. Elle seçim, tanınmayan bir
           klon yongayla uğraşırken ya da hatta iki sensör birden varken hangisinin
           kullanılacağını söylemek için vardır.</p>
        <p>Seçim <b>anında</b> uygulanır; cihaz sensörü hemen yeniden arar.</p>` },

        axes: { title: 'Eksen yönü', body: `
        <p>Sensörün kutunun içinde hangi yöne baktığını söyler. Farklı kartlarda ve
           breakout'larda yonga farklı yönde lehimli olduğu için gerekir.</p>
        <p><b>Kalibrasyon bunu düzeltmez.</b> Belirtisi şudur: kafanızı yukarı
           kaldırdığınızda küp sağa yatıyor, ya da bir eksen tersine hareket ediyor.</p>
        <p>Nasıl bulunur — küpe bakarak tek tek deneyin:</p>
        <ol>
            <li>Bir eksen <b>ters</b> hareket ediyorsa o harfin başına <code>-</code> koyun
                (örn. <code>+X-Y+Z</code>).</li>
            <li>İki eksen <b>yer değiştirmişse</b> harfleri takas edin
                (örn. <code>+Y+X+Z</code>).</li>
        </ol>
        <p>Her eksen (X, Y, Z) tam bir kez geçmelidir. Değiştirdikten sonra
           <b>kalibrasyonu tekrarlayın</b> — jiroskop sapması gövde eksenlerinde
           saklanır ve eski haritayla ölçülmüştür.</p>` },

        visual: { title: 'Küp görselleştirme', body: `
        <p>Küp, cihazdan gelen <b>ham</b> açıları gösterir — hassasiyet, PWM aralığı ve
           reverse ayarları buraya yansımaz. Amacı sensörün sağlıklı okuduğunu doğrulamak.</p>
        <p>Küpü fareyle döndürebilirsiniz; bu yalnızca kamerayı çevirir, veriyi etkilemez.</p>
        <p>Küp titriyorsa <b>Filtre (LPF)</b> değerini yükseltin. Kayıyorsa
           <b>Kalibrasyon</b> yapın.</p>` },

        pwm: { title: 'PWM çıkış aralığı ve reverse', body: `
        <p>Her eksen için gönderilecek en düşük ve en yüksek darbe genişliği
           (500–2500 µs). Kolları sürükleyerek daraltırsanız kamera daha az döner,
           genişletirseniz daha çok.</p>
        <p>Yeşil çizgi o anki değerdir — kafanızı çevirip aralığın uçlarına
           gerçekten ulaşıp ulaşmadığınızı görebilirsiniz.</p>
        <p><b>Reverse</b> ekseni ters çevirir: kafanızı sağa çevirdiğinizde kamera
           sola gidiyorsa bunu işaretleyin.</p>
        <p>Backpack modunda bu aralık vericide uygulanır, sonuç CRSF kanal değerine
           çevrilerek kumandaya gider.</p>` },

        cal: { title: 'IMU kalibrasyonu', body: `
        <p>Cihazı <b>düz ve titreşimsiz</b> bir zemine koyun, 10 saniye boyunca
           dokunmayın. Jiroskop sapması ölçülür ve cihazın kalıcı hafızasına yazılır —
           her açılışta tekrarlamanız gerekmez.</p>
        <p>Kalibrasyon sırasında cihaz hareket ederse sonuç bozulur; açılar yavaşça
           kayıyorsa kalibrasyonu tekrarlayın.</p>
        <p>Kalibrasyon <b>merkezi sıfırlamak</b> değildir. Merkez için butona basın
           ya da kumandadan sıfırlamayı kullanın.</p>` },

        'zero-pin': { title: 'Sıfırlama butonu pini', body: `
        <p>Kısa basışta o anki bakış yönünü merkez yapan butonun GPIO'su.
           Varsayılan <code>0</code>, yani kartın üstündeki <b>BOOT</b> butonu.</p>
        <p>Kutuya kendi butonunuzu taktıysanız onun pinini yazın. Buton
           <b>pin ile GND arasına</b> bağlanır; dahili pull-up açıktır, harici
           direnç gerekmez.</p>
        <p>Kullanılabilir pinler karta göre değişir; alanın altındaki not o an bağlı
           kartınınkini gösterir. ESP32-C3'te <code>0-10</code> ve <code>18-21</code>
           (11-17 dahili flash); Deneyap Kart'ta <code>0-5, 12-15, 18-19, 21-23,
           25-27, 32-33</code> (6-11 flash, 16-17 PSRAM, 34-39 yalnızca giriş —
           dahili pull-up'ları yoktur, buton bağlanamaz). I2C pinleriyle (SDA/SCL)
           aynı olamaz — cihaz bunu reddeder.</p>
        <p>Değişiklik anında geçerli olur, yeniden başlatma gerekmez.</p>` },

        'rc-reset': { title: 'Kumandadan sıfırlama nasıl çalışıyor?', body: `
        <p>ELRS TX modülü, seçtiğiniz AUX anahtarının konumu <b>değiştiğinde</b>
           backpack'e bir mesaj yolluyor; backpack de bunu ESP-NOW ile kafa takip
           cihazına iletiyor. Yani anahtar hareketi zaten bize ulaşan bir pakettir —
           biz onu sıfırlama komutu sayıyoruz. <b>ELRS tarafında ek bir kurulum yok.</b></p>
        <table>
            <tr><th>Tetikleyici</th><th>Kumandadaki ayar</th><th>Davranış</th></tr>
            <tr><td><b>DVR Rec</b><br>(önerilen)</td><td>Lua → Backpack → <b>DVR Rec</b> → boş bir AUX</td>
                <td>Her konum değişiminde sıfırlar. Gözlük backpack'iniz yoksa bu ayarın
                    başka işlevi yoktur; kafa takibi hiç kesilmez. Model bazlı değildir.</td></tr>
            <tr><td><b>HT Enable</b></td><td>Lua → Backpack → <b>HT Enable</b> → bir AUX</td>
                <td>Anahtarı indirip kaldırmak sıfırlar. Anahtar aşağıdayken kafa takibi
                    gerçekten kapanır, kanallar kumandanın kendi değerlerine döner. Model bazlıdır.</td></tr>
        </table>
        <p><b>Anahtar yerine kumandayı yatırmak:</b> kumandanızda dahili gyro varsa
           (kaynak listesinde <code>TltX</code> / <code>TltY</code> görünüyorsa) bir mantıksal
           anahtar kurup onu boş bir kanala bindirebilirsiniz — kumandayı belli bir açıdan
           fazla yatırınca sıfırlar. Ayrıntılar kılavuzda.</p>
        <p>Cihazın butonu her durumda çalışmaya devam eder; bu onun yerine geçmez.</p>` },

        'bp-setup': { title: 'Kumanda Ayarları', body: `
        <ol>
            <li><b>ELRS Lua → Backpack</b> klasörünü açın; <b>Version</b> satırı dolu olmalı.
                Boşsa modülde çalışan bir backpack yok, bu mod kullanılamaz.</li>
            <li><b>İlk kurulumda bir kez [Bind]</b> yapın. Backpack fabrikadan adressiz gelir;
                bind yapılmadan gönderdiğimiz paketleri kimse almaz. En çok vakit kaybettiren adım budur.</li>
            <li><b>Backpack: On</b>, <b>HT Enable: On</b>,
                <b>HT Start Channel: Aux6</b> (→ CH10/11/12) veya <b>EdgeTX</b> (trainer).</li>
            <li><b>Telemetry: Off</b> ya da <b>ESPNOW</b>. <b>WiFi seçmeyin</b> —
                o modda backpack ESP-NOW'u hiç başlatmaz, kafa takibi tamamen ölür.</li>
            <li>Ana ELRS ayarlarında <b>Switch Mode: 12ch</b> veya <b>16ch/2</b>.
                8ch modunda CH10 ve üstü alıcıya hiç gitmez.</li>
            <li>Bind phrase'i soldaki alana girip <b>Kaydet</b>'e basın, sonra cihazı
                <b>yeniden başlatın</b>.</li>
        </ol>
        <p><b>Dikkat:</b> <code>HT Enable</code> ve <code>HT Start Channel</code> model bazlı
           ayarlardır — model değiştirince sıfırlanırlar.</p>` },

        'bp-test': { title: 'Kanal testi nasıl okunur?', body: `
        <p>Kumandada kanal monitörünü açın: <b>Model → Kanallar</b>. Teste basınca 15 saniye
           boyunca kafa hareketi yerine düzenli bir tarama sinyali gönderilir.</p>
        <p><b>HT Start Channel</b> olarak seçtiğiniz kanalın (ör. Aux6 → <b>CH10</b>)
           yavaşça sağa-sola gidip geldiğini görmelisiniz. Böylece tüm zincirin
           (cihaz → backpack → kumanda) çalıştığını gözünüzle doğrularsınız.</p>
        <p>Test bitince arayüz kanalın oynayıp oynamadığını sorar; cevabınıza göre ya
           kurulumun tamam olduğunu söyler ya da kontrol listesini gösterir.</p>
        <p>Test sırasında IMU verisi gönderilmez — bu normaldir, 15 sn sonra kendiliğinden
           normale döner.</p>` },

        'bp-advanced': { title: 'Gelişmiş teşhis araçları', body: `
        <p><b>Ham durum:</b> UID, gerçek MAC adresi, WiFi kanalı ve paket sayaçlarını dökümler.
           Bir sorun bildirirken bu çıktıyı paylaşın.</p>
        <p><b>UID taraması:</b> yalnızca <b>bind phrase'inizi bilmiyorsanız</b> gerekir
           (ELRS modülü phrase'siz derlenip butonla bind edilmişse). 10 saniye boyunca
           havadaki ESP-NOW adresleri dinlenir ve listelenir.</p>
        <p>TX backpack ancak bir ayarı değiştiğinde yayın yapar; bu yüzden tarama sırasında
           kumandada Lua'dan <b>HT Enable</b>'ı kapatıp açmanız gerekir — yoksa dinlenecek
           yayın olmaz ve liste boş çıkar. Bu "backpack yok" demek değildir.</p>
        <p>Tarama boyunca kafa takibi verisi gönderilmez, kumandadaki kanallar 10 sn donar.
           Bu da normaldir.</p>` },
    },
    cal_modal: {
        running_title: 'Kalibrasyon Sürüyor...',
        running_text: 'Cihazı 10 saniye düz zeminde sabit tutun.',
        waiting_esp: "ESP'den onay bekleniyor...",
        success_title: 'Kalibrasyon Başarılı!',
        success_text: 'Sensör ofsetleri kaydedildi.',
        ok_btn: 'Tamam',
    },
};
