/**
 * i18n.js — Headtracker Configurator dil desteği
 * data-i18n / data-i18n-placeholder / data-i18n-title / data-i18n-aria / data-i18n-alt
 * attribute'ları üzerinden çeviri uygular. Varsayılan dil İngilizce; tarayıcıda
 * kalıcı olarak localStorage('ht_lang') içinde saklanır, geçiş sayfa yenilenmeden olur.
 */
const I18N = (() => {
    let _locale = {};
    let _lang = localStorage.getItem('ht_lang') || 'en';

    // "tx_panel.bp.status_waiting" -> locale.tx_panel.bp.status_waiting
    function t(key, params) {
        const parts = key.split('.');
        let cur = _locale;
        for (const p of parts) {
            if (cur == null || typeof cur !== 'object') { cur = undefined; break; }
            cur = cur[p];
        }
        let val = (typeof cur === 'string') ? cur : key;
        if (params) {
            for (const k in params) val = val.split('{' + k + '}').join(params[k]);
        }
        return val;
    }

    function setTextKeepIcon(el, text) {
        if (!el) return;
        let found = false;
        for (const node of el.childNodes) {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                node.textContent = ' ' + text;
                found = true;
                break;
            }
        }
        if (!found) {
            const icon = el.querySelector('i.bi, svg');
            if (icon) el.appendChild(document.createTextNode(' ' + text));
            else el.textContent = text;
        }
    }

    // Anahtar locale'de yoksa (ör. tarayıcı önbelleğinden eski bir locale
    // dosyası geldiyse) öğeye dokunma: HTML'deki varsayılan metin kalır,
    // kullanıcı ham anahtar adını görmez.
    function has(key) { return t(key) !== key; }

    function applyDataAttrs() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (has(key)) setTextKeepIcon(el, t(key));
        });
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            if (has(key)) el.innerHTML = t(key);
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (has(key)) el.placeholder = t(key);
        });
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (has(key)) el.title = t(key);
        });
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.getAttribute('data-i18n-aria');
            if (has(key)) el.setAttribute('aria-label', t(key));
        });
        document.querySelectorAll('[data-i18n-alt]').forEach(el => {
            const key = el.getAttribute('data-i18n-alt');
            if (has(key)) el.alt = t(key);
        });
    }

    function loadAndApply(lang) {
        _lang = lang;
        localStorage.setItem('ht_lang', lang);
        const globe = lang === 'tr' ? window.HT_LOCALE_TR : window.HT_LOCALE_EN;
        if (!globe) { console.warn('[i18n] locale bulunamadı:', lang); return; }
        _locale = globe;
        applyDataAttrs();
        updateToggleBtn();
        document.documentElement.setAttribute('lang', lang === 'tr' ? 'tr' : 'en');
        document.title = t('app.title');
        if (typeof window.htOnLangChange === 'function') window.htOnLangChange(lang);
    }

    function updateToggleBtn() {
        const btn = document.getElementById('langToggleBtn');
        if (!btn) return;
        btn.textContent = _lang === 'tr' ? 'EN' : 'TR';
        btn.title       = _lang === 'tr' ? 'Switch to English' : "Türkçe'ye geç";
    }

    function createToggleBtn() {
        const btn = document.createElement('button');
        btn.id = 'langToggleBtn';
        btn.type = 'button';
        btn.style.cssText = [
            'font-size:12px', 'font-weight:700', 'padding:6px 12px',
            'border-radius:999px', 'border:1px solid rgba(255,255,255,0.14)',
            'color:var(--text-primary,#edf7ff)', 'background:rgba(255,255,255,0.05)',
            'min-width:40px', 'letter-spacing:0.04em', 'flex-shrink:0', 'cursor:pointer',
            'box-shadow:none',
        ].join(';');
        btn.textContent = _lang === 'tr' ? 'EN' : 'TR';
        btn.title       = _lang === 'tr' ? 'Switch to English' : "Türkçe'ye geç";
        btn.addEventListener('click', () => loadAndApply(_lang === 'tr' ? 'en' : 'tr'));
        return btn;
    }

    function init() {
        const btn = createToggleBtn();
        const headerActions = document.querySelector('.header-actions');
        if (headerActions) headerActions.prepend(btn);
        else document.body.prepend(btn);
        loadAndApply(_lang);
    }

    return { init, t, setLang: loadAndApply, getLang: () => _lang };
})();

document.addEventListener('DOMContentLoaded', I18N.init);
