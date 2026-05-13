/* ==========================================================
   DURU OS — Portfolyo JavaScript
   ----------------------------------------------------------
   Bölümler:
   1)  Çeviriler (i18n)
   2)  Durum & Tema/Dil
   3)  Ses (Web Audio)
   4)  Bildirim sistemi
   5)  Pencere yöneticisi (WindowManager)
   6)  Uygulama tanımları (APPS)
   7)  Spotlight aramasi
   8)  Terminal
   9)  Parallax wallpaper
   10) Boot ekranı
   11) Saat
   12) İkonlar / Dock
   13) İletişim pop-up
   14) Toggle'lar
   15) Context menü
   16) Yıldız cursor izi
   17) Klavye kısayolları
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

/* ==========================================================
   1) ÇEVİRİLER
   ========================================================== */
const TRANSLATIONS = {
    tr: {
        'boot.subtitle': 'v1.0 — Portfolyo Sürümü',
        'boot.start':    'Masaüstüne geç',
        'today.label':   'BUGÜN',
        'today.coffee':  '3. kahve',
        'boot.msg.0':    'Tohum ekiliyor...',
        'boot.msg.1':    'Toprak ısınıyor...',
        'boot.msg.2':    'Filiz veriyor...',
        'boot.msg.3':    'Yapraklar açılıyor...',
        'boot.msg.4':    'Tomurcuk hazır...',
        'boot.msg.5':    'Çiçek açtı 🌸',

        'menu.file': 'Dosya', 'menu.edit': 'Düzen',
        'menu.view': 'Görünüm', 'menu.help': 'Yardım',

        'icon.about': 'Hakkımda', 'icon.projects': 'Projelerim',
        'icon.skills': 'Yetenekler', 'icon.education': 'Eğitim',

        'sticky1.title': '📌 Hoş geldin!',
        'sticky1.text':  'Ben Duru — bu masaüstüne hoş geldin. İkonlara <b>çift tıklayarak</b> gez.',
        'sticky2.title': '💡 İpucu',
        'sticky2.text':  'Boş bir alana <b>sağ tıklayarak</b> tema ve dili değiştirebilirsin 🌗 · Arama için <b>Ctrl/⌘+K</b>',

        'nw.title':   'Şu an çalışıyor',
        'nw.project': 'Full-Stack Portfolyo',

        'popup.role':     'Full-Stack Developer · Yazılım Müh. Öğrencisi',
        'popup.location': 'İstanbul, Türkiye',
        'popup.status':   'İş birliğine açığım',

        'ctx.theme':   'Tema Değiştir',
        'ctx.lang':    'Dili Değiştir',
        'ctx.search':  'Ara',
        'ctx.refresh': 'Masaüstünü Yenile',
        'ctx.about':   'Duru OS Hakkında',
        'ctx.theme.light': '(şu an: aydınlık)',
        'ctx.theme.dark':  '(şu an: karanlık)',
        'ctx.lang.tr':     '(şu an: TR)',
        'ctx.lang.en':     '(şu an: EN)',

        'dock.about':    'Hakkımda',
        'dock.projects': 'Projeler',
        'dock.skills':   'Yetenekler',
        'dock.terminal': 'Terminal',
        'dock.contact':  'İletişim',

        'view.theme':  'Tema',
        'view.light':  'Aydınlık',
        'view.dark':   'Karanlık',
        'view.lang':   'Dil',
        'edit.iconsize':   'İkon Boyutu',
        'edit.size.small': 'Küçük',
        'edit.size.normal':'Normal',
        'edit.size.large': 'Büyük',
        'theme.label':       'Tema',
        'theme.now.light':   'Aydınlık',
        'theme.now.dark':    'Karanlık',
        'help.q':      'Sorun mu var?',
        'help.cta':    'Bana mail at!',
        'help.btn':    '✉️ Mail gönder',

        'mail.title':       'Yeni Mesaj',
        'mail.headline':    'Sorunu paylaş',
        'mail.sub':         'Mesajını yaz, "Gönder"e bas — varsayılan mail uygulaman açılacak.',
        'mail.to':          'Kime',
        'mail.subject':     'Konu',
        'mail.subject.ph':  'Örn: Portfolyon hakkında',
        'mail.body.ph':     'Mesajınız...',
        'mail.send':        'Gönder',
        'mail.hint':        'duru.altinok2004@gmail.com',
        'mail.empty':       'Konu ve mesaj boş bırakılamaz.',
        'mail.opened.t':    'Mail uygulaman açıldı',
        'mail.opened.b':    'Varsayılan mail istemcinde yeni mesaj penceresi açıldı.',
        'win.mail':         'Mail',

        'spotlight.placeholder': 'Uygulama, sayfa veya komut ara...',
        'spotlight.empty':       'Sonuç yok',
        'spotlight.app':         'Uygulama',
        'spotlight.command':     'Komut',

        'win.about':     'Hakkımda',
        'win.projects':  'Projelerim',
        'win.skills':    'Yetenekler',
        'win.education': 'Eğitim',
        'win.blog':      'Blog',
        'win.resume':    'CV',
        'win.terminal':  'Terminal',

        'about.alert':   'Duru OS v1.0 — Duru Altınok tarafından geliştirildi 💙',
        'notif.welcome.t':   'Hoş geldin Duru OS\'a',
        'notif.welcome.b':   'İkonlara çift tıklayarak veya ⌘K ile ara yaparak başlayabilirsin.',
        'notif.theme.t':     'Tema değişti',
        'notif.lang.t':      'Dil değişti',
        'notif.muted.t':     'Ses kapatıldı',
        'notif.unmuted.t':   'Ses açıldı'
    },
    en: {
        'boot.subtitle': 'v1.0 — Portfolio Edition',
        'boot.start':    "Enter desktop",
        'today.label':   'TODAY',
        'today.coffee':  '3rd coffee',
        'boot.msg.0':    'Planting the seed...',
        'boot.msg.1':    'Warming up the soil...',
        'boot.msg.2':    'Sprouting...',
        'boot.msg.3':    'Leaves unfurling...',
        'boot.msg.4':    'Bud forming...',
        'boot.msg.5':    'In bloom 🌸',

        'menu.file': 'File', 'menu.edit': 'Edit',
        'menu.view': 'View', 'menu.help': 'Help',

        'icon.about': 'About', 'icon.projects': 'My Projects',
        'icon.skills': 'Skills', 'icon.education': 'Education',

        'sticky1.title': '📌 Welcome!',
        'sticky1.text':  "I'm Duru — welcome to my desktop. <b>Double-click</b> the icons to explore.",
        'sticky2.title': '💡 Tip',
        'sticky2.text':  '<b>Right-click</b> anywhere to change the theme and language 🌗 · Search with <b>Ctrl/⌘+K</b>',

        'nw.title':   'Currently working on',
        'nw.project': 'Full-Stack Portfolio',

        'popup.role':     'Full-Stack Developer · Software Eng. Student',
        'popup.location': 'Istanbul, Türkiye',
        'popup.status':   'Open to collaboration',

        'ctx.theme':   'Switch Theme',
        'ctx.lang':    'Change Language',
        'ctx.search':  'Search',
        'ctx.refresh': 'Refresh Desktop',
        'ctx.about':   'About Duru OS',
        'ctx.theme.light': '(now: light)',
        'ctx.theme.dark':  '(now: dark)',
        'ctx.lang.tr':     '(now: TR)',
        'ctx.lang.en':     '(now: EN)',

        'dock.about':    'About',
        'dock.projects': 'Projects',
        'dock.skills':   'Skills',
        'dock.terminal': 'Terminal',
        'dock.contact':  'Contact',

        'view.theme':  'Theme',
        'view.light':  'Light',
        'view.dark':   'Dark',
        'view.lang':   'Language',
        'edit.iconsize':   'Icon Size',
        'edit.size.small': 'Small',
        'edit.size.normal':'Normal',
        'edit.size.large': 'Large',
        'theme.label':       'Theme',
        'theme.now.light':   'Light',
        'theme.now.dark':    'Dark',
        'help.q':      'Need help?',
        'help.cta':    'Drop me a mail!',
        'help.btn':    '✉️ Send mail',

        'mail.title':       'New Message',
        'mail.headline':    'Share what you need',
        'mail.sub':         'Type your message and press "Send" — your default mail app will open.',
        'mail.to':          'To',
        'mail.subject':     'Subject',
        'mail.subject.ph':  'e.g. About your portfolio',
        'mail.body.ph':     'Your message...',
        'mail.send':        'Send',
        'mail.hint':        'duru.altinok2004@gmail.com',
        'mail.empty':       'Subject and body cannot be empty.',
        'mail.opened.t':    'Mail client opened',
        'mail.opened.b':    'A new message window was opened in your default mail client.',
        'win.mail':         'Mail',

        'spotlight.placeholder': 'Search apps, pages, commands...',
        'spotlight.empty':       'No results',
        'spotlight.app':         'App',
        'spotlight.command':     'Command',

        'win.about':     'About',
        'win.projects':  'My Projects',
        'win.skills':    'Skills',
        'win.education': 'Education',
        'win.blog':      'Blog',
        'win.resume':    'Résumé',
        'win.terminal':  'Terminal',

        'about.alert':   'Duru OS v1.0 — Built by Duru Altınok 💙',
        'notif.welcome.t':   'Welcome to Duru OS',
        'notif.welcome.b':   'Double-click an icon or press ⌘K to search.',
        'notif.theme.t':     'Theme changed',
        'notif.lang.t':      'Language changed',
        'notif.muted.t':     'Sound muted',
        'notif.unmuted.t':   'Sound on'
    }
};

const t = (key) => (TRANSLATIONS[state.lang] && TRANSLATIONS[state.lang][key]) || key;

/* ==========================================================
   2) DURUM + TEMA/DİL UYGULAMA
   ========================================================== */
const state = {
    lang:     localStorage.getItem('lang')     || 'tr',
    theme:    localStorage.getItem('theme')    || 'light',
    muted:    localStorage.getItem('muted')    === 'true',
    iconSize: localStorage.getItem('iconSize') || 'normal'
};

let themeInitialized = false;
function applyTheme(theme) {
    const prev = state.theme;
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const hint = document.getElementById('ctx-theme-hint');
    if (hint) hint.textContent = t('ctx.theme.' + theme);
    if (themeInitialized && prev !== theme) showThemeIndicator(theme);
}

function applyIconSize(size) {
    state.iconSize = size;
    document.documentElement.setAttribute('data-icon-size', size);
    localStorage.setItem('iconSize', size);
}

/* Tema değişimi göstergesi — ekran ortasından iner, kısa süre kalır, kaybolur */
function showThemeIndicator(theme) {
    const ind = document.getElementById('theme-indicator');
    if (!ind) return;
    const isLight = theme === 'light';
    const icon = ind.querySelector('.theme-indicator-icon');
    const labelEl = ind.querySelector('.theme-indicator-label');
    const modeEl  = ind.querySelector('#theme-indicator-mode');

    icon.textContent = isLight ? '☀️' : '🌙';
    icon.className   = 'theme-indicator-icon ' + (isLight ? 'is-sun' : 'is-moon');
    if (labelEl) labelEl.textContent = t('theme.label');
    if (modeEl)  modeEl.textContent  = t('theme.now.' + theme);

    ind.classList.remove('hidden', 'hide-up');
    // reflow ile animasyonu yeniden başlat
    void ind.offsetWidth;
    ind.classList.add('show');

    clearTimeout(showThemeIndicator._t);
    showThemeIndicator._t = setTimeout(() => {
        ind.classList.remove('show');
        ind.classList.add('hide-up');
        setTimeout(() => ind.classList.add('hidden'), 600);
    }, 1900);
}

function applyLang(lang) {
    state.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('lang', lang);
    const dict = TRANSLATIONS[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (dict[key]) el.innerHTML = dict[key];
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        if (dict[key]) el.setAttribute('title', dict[key]);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) el.setAttribute('placeholder', dict[key]);
    });

    const thHint = document.getElementById('ctx-theme-hint');
    const lgHint = document.getElementById('ctx-lang-hint');
    if (thHint) thHint.textContent = dict['ctx.theme.' + state.theme];
    if (lgHint) lgHint.textContent = dict['ctx.lang.'  + lang];
}

applyTheme(state.theme);
applyLang(state.lang);
applyIconSize(state.iconSize);
// İlk yükleme sonrası flag'i aç — sonraki tema değişimlerinde gösterge çıkacak
setTimeout(() => { themeInitialized = true; }, 0);

/* ==========================================================
   3) SES (Web Audio)
   ========================================================== */
const sound = {
    ctx: null,
    init() { if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)(); },
    tone({ freq = 800, dur = 0.08, vol = 0.06, type = 'sine', delay = 0 } = {}) {
        if (state.muted || !this.ctx) return;
        const ctx = this.ctx;
        const now = ctx.currentTime + delay;
        const osc = ctx.createOscillator();
        const g   = ctx.createGain();
        osc.type = type; osc.frequency.value = freq;
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(vol, now + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
        osc.connect(g).connect(ctx.destination);
        osc.start(now); osc.stop(now + dur + 0.05);
    },
    click()   { this.tone({ freq: 880, dur: 0.05, vol: 0.04 }); },
    open()    { this.tone({ freq: 660, dur: 0.08, vol: 0.05 }); this.tone({ freq: 990, dur: 0.08, vol: 0.04, delay: 0.04 }); },
    close()   { this.tone({ freq: 520, dur: 0.06, vol: 0.04 }); },
    notify()  { this.tone({ freq: 523.25, dur: 0.18, vol: 0.06 }); this.tone({ freq: 659.25, dur: 0.18, vol: 0.05, delay: 0.08 }); },
    boot()    {
        [261.63, 329.63, 392, 523.25].forEach((f, i) =>
            this.tone({ freq: f, dur: 0.5, vol: 0.06, delay: i * 0.12, type: 'sine' }));
    }
};

/* ==========================================================
   4) BİLDİRİMLER
   ========================================================== */
function notify({ title, body = '', icon = '🔔', duration = 4200 } = {}) {
    const stack = document.getElementById('notifications');
    if (!stack) return;
    const el = document.createElement('div');
    el.className = 'notification';
    el.innerHTML = `
        <div class="notif-icon">${icon}</div>
        <div class="notif-content">
            <div class="notif-title"></div>
            <div class="notif-body"></div>
        </div>
        <button class="notif-close" aria-label="kapat">×</button>`;
    el.querySelector('.notif-title').textContent = title;
    el.querySelector('.notif-body').textContent  = body;
    stack.appendChild(el);
    sound.notify();
    const remove = () => { el.classList.add('out'); setTimeout(() => el.remove(), 300); };
    const timer = setTimeout(remove, duration);
    el.querySelector('.notif-close').addEventListener('click', () => { clearTimeout(timer); remove(); });
}

/* ==========================================================
   5) PENCERE YÖNETİCİSİ
   ========================================================== */
class WindowManager {
    constructor() {
        this.windows = new Map();
        this.z = 100;
        this.container = document.getElementById('windows-container');
    }
    open(appId) {
        const app = APPS[appId];
        if (!app) return;
        if (this.windows.has(appId)) { this.focus(appId); return; }

        const win = document.createElement('div');
        win.className = 'window focused';
        win.dataset.appId = appId;

        const w = app.width  || 600;
        const h = app.height || 480;
        const baseX = Math.max(40, (window.innerWidth  - w) / 2);
        const baseY = Math.max(50, (window.innerHeight - h) / 2 - 30);
        const offset = this.windows.size * 28;
        win.style.left   = (baseX + offset) + 'px';
        win.style.top    = (baseY + offset) + 'px';
        win.style.width  = w + 'px';
        win.style.height = h + 'px';

        win.innerHTML = `
            <header class="window-header">
                <div class="window-controls">
                    <span class="ctrl close" data-action="close" title="Kapat"></span>
                    <span class="ctrl min"   data-action="min"   title="Küçült"></span>
                    <span class="ctrl max"   data-action="max"   title="Tam ekran"></span>
                </div>
                <span class="window-title">${app.icon} ${t(app.titleKey)}</span>
                <div style="width: 60px"></div>
            </header>
            <div class="window-body skeleton-wrap">${this.getSkeleton()}</div>`;

        this.container.appendChild(win);
        this.windows.set(appId, win);
        this.bindEvents(win, appId);
        this.focus(appId);
        sound.open();

        // Önce skeleton göster, sonra gerçek içeriği yerleştir + animasyon
        setTimeout(() => {
            const body = win.querySelector('.window-body');
            body.innerHTML = app.content();
            body.classList.remove('skeleton-wrap');
            body.classList.add('content-in');
            applyLang(state.lang);
            if (app.onOpen) app.onOpen(win);
            setTimeout(() => body.classList.remove('content-in'), 500);
        }, 580);
    }

    getSkeleton() {
        return `
            <div class="skeleton">
                <div class="sk-row">
                    <div class="sk-circle"></div>
                    <div class="sk-col">
                        <div class="sk-line sk-mid"></div>
                        <div class="sk-line sk-short"></div>
                    </div>
                </div>
                <div class="sk-line sk-long"></div>
                <div class="sk-line sk-mid"></div>
                <div class="sk-block"></div>
                <div class="sk-row">
                    <div class="sk-card"></div>
                    <div class="sk-card"></div>
                </div>
            </div>`;
    }
    focus(appId) {
        const win = this.windows.get(appId);
        if (!win) return;
        this.windows.forEach(w => w.classList.remove('focused'));
        win.classList.add('focused');
        win.style.zIndex = ++this.z;
    }
    close(appId) {
        const win = this.windows.get(appId);
        if (!win) return;
        if (APPS[appId]?.onClose) APPS[appId].onClose(win);
        win.classList.add('closing');
        sound.close();
        setTimeout(() => { win.remove(); this.windows.delete(appId); }, 240);
    }
    bindEvents(win, appId) {
        const header  = win.querySelector('.window-header');
        const closeBt = win.querySelector('[data-action="close"]');
        const maxBt   = win.querySelector('[data-action="max"]');
        const minBt   = win.querySelector('[data-action="min"]');

        closeBt.addEventListener('click', (e) => { e.stopPropagation(); this.close(appId); });
        maxBt.addEventListener('click',   (e) => { e.stopPropagation(); win.classList.toggle('maximized'); });
        minBt.addEventListener('click',   (e) => { e.stopPropagation(); this.close(appId); });

        win.addEventListener('mousedown', () => this.focus(appId));

        let drag = false, sx, sy, sl, st;
        header.addEventListener('mousedown', (e) => {
            if (e.target.closest('.ctrl')) return;
            if (win.classList.contains('maximized')) return;
            drag = true;
            sx = e.clientX; sy = e.clientY;
            const r = win.getBoundingClientRect();
            sl = r.left; st = r.top;
            e.preventDefault();
        });
        document.addEventListener('mousemove', (e) => {
            if (!drag) return;
            const nx = sl + (e.clientX - sx);
            const ny = Math.max(30, st + (e.clientY - sy));
            win.style.left = nx + 'px';
            win.style.top  = ny + 'px';
        });
        document.addEventListener('mouseup', () => drag = false);
    }
}
const wm = new WindowManager();

/* ==========================================================
   6) UYGULAMA TANIMLARI
   ========================================================== */
const APPS = {
    about: {
        icon: '📁', titleKey: 'win.about',
        width: 820, height: 640,
        content: () => `
            <div class="app-about-pixel">
              <div class="pixel-sky">
                <div class="pixel-cloud c1"></div>
                <div class="pixel-cloud c2"></div>
                <div class="pixel-cloud c3"></div>
              </div>

              <!-- Üst: portre + selamlama -->
              <div class="pixel-top">
                <div class="pixel-card pixel-portrait">
                  <div class="pixel-card-bar">
                    <span>Digital Me</span><span class="pixel-dots">○○</span>
                  </div>
                  <div class="pixel-card-body">
                    <div class="pixel-avatar-frame">
                      <img src="assets/avatar.png" alt="Duru Altınok"
                           onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                      <div class="pixel-avatar-fallback">👩‍💻</div>
                    </div>
                    <div class="pixel-portrait-name">Duru Altınok</div>
                    <div class="pixel-portrait-role" data-i18n="about.pixel.role">YAZILIM MÜH.</div>
                  </div>
                </div>
                <div class="pixel-welcome-block">
                  <p data-i18n="about.welcome">Hi! Welcome to my portfolio!</p>
                  <p class="pixel-typing" id="pixel-typing"></p>
                </div>
              </div>

              <!-- Alt grid: about + interests + languages -->
              <div class="pixel-grid">
                <div class="pixel-card">
                  <div class="pixel-card-bar">
                    <span>About Me</span><span class="pixel-dots">○○</span>
                  </div>
                  <div class="pixel-card-body">
                    <p data-i18n="about.pixel.bio">Hey! Ben Duru, yazılım mühendisliği öğrencisiyim. Pixel ile modern tasarımı harmanlayıp temiz kodla buluşturmayı seviyorum. Hem teknik hem yaratıcı tarafımı eğlenceli arayüzlerde birleştiriyorum.</p>
                  </div>
                </div>
                <div class="pixel-card">
                  <div class="pixel-card-bar">
                    <span>My Interests</span><span class="pixel-dots">○○</span>
                  </div>
                  <div class="pixel-card-body">
                    <div class="pixel-stat">
                      <span>🎮 <span data-i18n="about.int.games">Oyun</span></span>
                      <div class="pixel-bar"><div class="pixel-bar-fill" data-fill="92"></div></div>
                    </div>
                    <div class="pixel-stat">
                      <span>📚 <span data-i18n="about.int.books">Kitap</span></span>
                      <div class="pixel-bar"><div class="pixel-bar-fill" data-fill="86"></div></div>
                    </div>
                    <div class="pixel-stat">
                      <span>🎨 <span data-i18n="about.int.art">Resim</span></span>
                      <div class="pixel-bar"><div class="pixel-bar-fill" data-fill="80"></div></div>
                    </div>
                  </div>
                </div>
                <div class="pixel-card">
                  <div class="pixel-card-bar">
                    <span>Languages</span><span class="pixel-dots">○○</span>
                  </div>
                  <div class="pixel-card-body">
                    <div class="pixel-stat">
                      <span>Türkçe</span>
                      <div class="pixel-bar"><div class="pixel-bar-fill" data-fill="100"></div></div>
                    </div>
                    <div class="pixel-stat">
                      <span>English</span>
                      <div class="pixel-bar"><div class="pixel-bar-fill" data-fill="80"></div></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="pixel-mountains"></div>
            </div>`,
        onOpen: (win) => activateAboutShowcase(win)
    },
    projects: {
        icon: '💼', titleKey: 'win.projects',
        width: 680, height: 540,
        content: () => `
            <div class="app-projects">
              <h2 data-i18n="projects.title">Projelerim</h2>
              <p class="projects-sub" data-i18n="projects.sub">Veritabanından dinamik olarak yüklendi (PHP + MySQL).</p>
              <div class="project-grid" id="project-grid">
                <div class="loading-msg">Yükleniyor...</div>
              </div>
            </div>`,
        onOpen: (win) => loadProjects(win)
    },
    education: {
        icon: '🎓', titleKey: 'win.education',
        width: 720, height: 580,
        content: () => `
            <div class="app-education">
              <h2 data-i18n="edu.title">Eğitim Yolculuğu</h2>
              <p class="edu-sub" data-i18n="edu.sub">Mantar panoma iğnelediğim okullar</p>
              <div class="edu-board" data-edu-board>
                <!-- 1) İstek Bilge Kağan Anadolu Lisesi -->
                <div class="edu-note" data-step="0"
                     style="top: 40px; left: 28px; --rot: -4deg;">
                  <div class="edu-note-body">
                    <div class="edu-date" data-text="2018 – 2022"></div>
                    <h3 data-i18n-text="edu.hs.t" data-text="İstek Bilge Kağan Anadolu Lisesi"></h3>
                    <p data-i18n-text="edu.hs.b" data-text="Anadolu Lisesi · İstanbul"></p>
                  </div>
                  <div class="edu-logo edu-logo-istek" data-fallback="İBK"
                       style="--logo-rot: 8deg;">
                    <img src="assets/istek-logo.png" alt="İstek Bilge Kağan"
                         onerror="this.style.display='none'; this.parentElement.classList.add('fallback')">
                  </div>
                </div>
                <!-- 2) Haliç Üniversitesi -->
                <div class="edu-note" data-step="1"
                     style="top: 260px; left: 330px; --rot: 3deg;">
                  <div class="edu-note-body">
                    <div class="edu-date" data-text="2023 – 2027"></div>
                    <h3 data-i18n-text="edu.uni.t" data-text="Haliç Üniversitesi"></h3>
                    <p data-i18n-text="edu.uni.b" data-text="Software Engineering — Lisans"></p>
                    <p class="edu-detail" data-i18n-text="edu.uni.d" data-text="3. sınıf · İstanbul"></p>
                  </div>
                  <div class="edu-logo edu-logo-halic" data-fallback="H"
                       style="--logo-rot: -7deg;">
                    <img src="assets/halic-uni-logo.png" alt="Haliç University"
                         onerror="this.style.display='none'; this.parentElement.classList.add('fallback')">
                  </div>
                </div>
              </div>
            </div>`,
        onOpen: (win) => activateEducationTimeline(win)
    },
    blog: {
        icon: '📝', titleKey: 'win.blog',
        width: 560, height: 520,
        content: () => `
            <div class="app-blog">
              <h2 data-i18n="blog.title">Blog</h2>
              <p class="blog-intro" data-i18n="blog.intro">Veritabanından dinamik olarak yüklendi.</p>
              <ul class="blog-list" id="blog-list">
                <li class="loading-msg">Yükleniyor...</li>
              </ul>
            </div>`,
        onOpen: (win) => loadBlog(win)
    },
    resume: {
        icon: '📄', titleKey: 'win.resume',
        width: 560, height: 620,
        content: () => `
            <div class="app-cv">
              <h2 data-i18n="cv.title">CV / Özgeçmiş</h2>
              <div class="cv-preview">
                <h2>Duru Altınok</h2>
                <p data-i18n="popup.role">Full-Stack Developer · Yazılım Müh. Öğrencisi</p>
                <hr>
                <h3 data-i18n="cv.h.edu">Eğitim</h3>
                <div class="cv-entry">
                  <strong data-i18n="cv.edu1.t">Haliç Üniversitesi</strong>
                  <span data-i18n="cv.edu1.d"> · Software Engineering</span>
                  <span class="cv-date" data-i18n="cv.edu1.y">2023 – 2027 (devam ediyor)</span>
                </div>
                <div class="cv-entry">
                  <strong data-i18n="cv.edu2.t">İstek Bilge Kağan Anadolu Lisesi</strong>
                  <span class="cv-date" data-i18n="cv.edu2.y">2018 – 2022</span>
                </div>
                <h3 data-i18n="cv.h.skills">Yetenekler</h3>
                <p>HTML5, CSS3, JavaScript, PHP, MySQL, Python, Git</p>
                <h3 data-i18n="cv.h.contact">İletişim</h3>
                <p>duru.altinok2004@gmail.com · İstanbul</p>
              </div>
              <div class="cv-actions">
                <button class="btn-primary" data-i18n="cv.download">📥 PDF olarak indir</button>
              </div>
            </div>`
    },
    skills: {
        icon: '⚙️', titleKey: 'win.skills',
        width: 720, height: 540,
        content: () => `
            <div class="code-editor">
              <div class="code-tabs"><span class="code-tab active">📄 skills.js</span></div>
              <pre class="code-body"><code id="code-body"></code><span class="code-cursor">▎</span></pre>
            </div>`,
        onOpen: (win) => typeSkillsCode(win),
        onClose: () => { if (typingTimer) clearTimeout(typingTimer); typingTimer = null; }
    },
    terminal: {
        icon: '⌨️', titleKey: 'win.terminal',
        width: 640, height: 420,
        content: () => `
            <div class="terminal" id="term-${Date.now()}">
              <div class="term-history"></div>
              <div class="term-input-wrap">
                <span class="term-prompt">duru@portfolio:~$</span>
                <input type="text" class="term-input" autocomplete="off" spellcheck="false" autofocus>
              </div>
            </div>`,
        onOpen: (win) => initTerminal(win)
    },
    finder: {
        icon: '🗂️', titleKey: 'win.finder',
        width: 720, height: 500,
        content: () => `
            <div class="app-finder">
              <aside class="finder-sidebar">
                <div class="finder-section">
                  <div class="finder-section-title" data-i18n="finder.fav">Favoriler</div>
                  <div class="finder-item active" data-target="all">
                    <span>📁</span><span data-i18n="finder.all">Tümü</span>
                  </div>
                  <div class="finder-item" data-target="apps">
                    <span>⚙️</span><span data-i18n="finder.apps">Uygulamalar</span>
                  </div>
                  <div class="finder-item" data-target="docs">
                    <span>📄</span><span data-i18n="finder.docs">Belgeler</span>
                  </div>
                  <div class="finder-item" data-target="links">
                    <span>🔗</span><span data-i18n="finder.links">Bağlantılar</span>
                  </div>
                </div>
              </aside>
              <main class="finder-main">
                <div class="finder-toolbar">
                  <div class="finder-nav">
                    <button class="finder-nav-btn" title="Geri">‹</button>
                    <button class="finder-nav-btn" title="İleri">›</button>
                  </div>
                  <div class="finder-search">
                    <input type="text" id="finder-search-input"
                           data-i18n-placeholder="finder.search.ph"
                           placeholder="Bu pencerede ara...">
                  </div>
                </div>
                <div class="finder-grid" id="finder-grid"></div>
              </main>
            </div>`,
        onOpen: (win) => initFinder(win)
    },
    mail: {
        icon: '✉️', titleKey: 'win.mail',
        width: 540, height: 480,
        content: () => `
            <div class="app-mail">
              <div>
                <h2 class="mail-headline" data-i18n="mail.headline">Sorunu paylaş</h2>
                <p class="mail-sub" data-i18n="mail.sub">Mesajını yaz, "Gönder"e bas — varsayılan mail uygulaman açılacak.</p>
              </div>
              <div class="mail-field">
                <label data-i18n="mail.to">Kime</label>
                <input type="email" id="mail-to" value="duru.altinok2004@gmail.com" readonly>
              </div>
              <div class="mail-field">
                <label data-i18n="mail.subject">Konu</label>
                <input type="text" id="mail-subject" data-i18n-placeholder="mail.subject.ph" placeholder="Örn: Portfolyon hakkında">
              </div>
              <div class="mail-field mail-body-field">
                <textarea id="mail-body" data-i18n-placeholder="mail.body.ph" placeholder="Mesajınız..."></textarea>
              </div>
              <div class="mail-actions">
                <span class="mail-hint" data-i18n="mail.hint">duru.altinok2004@gmail.com</span>
                <button class="btn-primary" id="mail-send-btn">
                  <span>✈️</span><span data-i18n="mail.send">Gönder</span>
                </button>
              </div>
            </div>`,
        onOpen: (win) => initMailApp(win)
    }
};

// Çeviri zenginleştirmeleri (TR/EN için ek anahtarlar)
Object.assign(TRANSLATIONS.tr, {
    'about.bio': 'Hey! Ben Duru — Haliç Üniversitesi\'nde yazılım mühendisliği okuyorum. Kod yazmayı oyun geliştirmek için öğreniyorum; bir gün kendi yarattığım dünyalarda dolaşmak istiyorum. Yeni teknolojiyi kurcalamak, tasarımla kodu birleştirmek ve hayal kurmak en sevdiklerim.',
    'about.location': 'Konum',
    'about.edu': 'Eğitim', 'about.edu.v': 'Yazılım Müh., 3. sınıf',
    'about.langs': 'Diller', 'about.interests': 'İlgi', 'about.interests.v': 'Oyun, kitap, resim',
    'about.welcome':   'Hi! Welcome to my portfolio!',
    'about.intro.t':   '🎨 Tema değişiyor, beni tanıyın!',
    'about.intro.b':   'Pixel art moduna geçtik — eğlence başlasın.',
    'about.pixel.role':'YAZILIM MÜH.',
    'about.pixel.bio': 'Hey! Ben Duru — Haliç Üniversitesi\'nde yazılım mühendisliği okuyorum 🎮 Kod yazmayı, bir gün kendi oyunlarımı yaratabilmek için öğreniyorum. Yeni teknolojiyi kurcalamayı, tasarımla kodu birleştirmeyi ve hayal kurmayı seviyorum. Bilgisayar başında değilsem oyundayım, kitabımdayım ya da bir şeyler çiziyorum ✨ Projelerime göz at — beğendiğin bir şey olursa mail at, birlikte güzel şeyler yapalım!',
    'about.int.games': 'Oyun',
    'about.int.books': 'Kitap',
    'about.int.art':   'Resim',
    'about.typing.0':  '> Sistem hazır...',
    'about.typing.1':  '> Profil yüklendi: Duru',
    'about.typing.2':  '> Şu an çevrimiçi!',
    'projects.title': 'Projelerim',
    'projects.sub': 'Bu liste yakında veritabanından dinamik olarak yüklenecek (PHP + MySQL).',
    'proj.1.t':'Duru OS Portfolyo','proj.1.b':'Bilgisayar masaüstü temalı dinamik portfolyo.',
    'proj.2.t':'QR Sipariş Sistemi','proj.2.b':'Restoranlar için QR kodlu masa sipariş uygulaması.',
    'proj.3.t':'Veri Görselleştirici','proj.3.b':'CSV verilerinden interaktif grafikler üreten araç.',
    'edu.title':'Eğitim Yolculuğu',
    'edu.sub':'Mantar panoma iğnelediğim okullar',
    'edu.uni.t':'Haliç Üniversitesi','edu.uni.b':'Software Engineering — Lisans',
    'edu.uni.d':'3. sınıf · İstanbul',
    'edu.hs.t':'İstek Bilge Kağan Anadolu Lisesi','edu.hs.b':'Anadolu Lisesi · İstanbul',
    'blog.title':'Blog','blog.intro':'Yazılar yakında — backend bağlandığında veritabanından gelecek.',
    'blog.1.t':'Bu portfolyoyu nasıl yaptım','blog.1.b':'Vanilla JS ile bir masaüstü simülasyonu kurmak...',
    'blog.2.t':'PHP & MySQL ile veri akışı','blog.2.b':'Backend tarafındaki ilk öğrenimlerim...',
    'cv.title':'CV / Özgeçmiş',
    'cv.h.edu':'Eğitim',
    'cv.edu1.t':'Haliç Üniversitesi','cv.edu1.d':' · Software Engineering',
    'cv.edu1.y':'2023 – 2027 (devam ediyor)',
    'cv.edu2.t':'İstek Bilge Kağan Anadolu Lisesi',
    'cv.edu2.y':'2018 – 2022',
    'cv.h.skills':'Yetenekler','cv.h.contact':'İletişim',
    'cv.download':'📥 PDF olarak indir',
    'win.finder':'Finder',
    'finder.fav':'Favoriler','finder.all':'Tümü','finder.apps':'Uygulamalar',
    'finder.docs':'Belgeler','finder.links':'Bağlantılar',
    'finder.search.ph':'Bu pencerede ara...',
    'finder.empty':'Sonuç yok'
});
Object.assign(TRANSLATIONS.en, {
    'about.bio': "Hey! I'm Duru — studying software engineering at Haliç University. I'm learning to code because I want to build games one day. Poking at new tech, blending design with code, and daydreaming about projects are my favorite things.",
    'about.location': 'Location',
    'about.edu': 'Education', 'about.edu.v': 'Software Eng., Junior year',
    'about.langs': 'Languages', 'about.interests': 'Interests', 'about.interests.v': 'Games, books, art',
    'about.welcome':   'Hi! Welcome to my portfolio!',
    'about.intro.t':   '🎨 Theme switching — get to know me!',
    'about.intro.b':   'Pixel art mode activated. Let the fun begin.',
    'about.pixel.role':'SOFTWARE ENG.',
    'about.pixel.bio': "Hey! I'm Duru — studying software engineering at Haliç University 🎮 I'm learning to code so I can build my own games one day. I love poking at new tech, blending design with code, and daydreaming about cool projects. When I'm not at my computer, you'll find me playing games, reading, or drawing ✨ Check out my projects — if something catches your eye, drop me a mail. Let's build something cool together!",
    'about.int.games': 'Games',
    'about.int.books': 'Books',
    'about.int.art':   'Drawing',
    'about.typing.0':  '> System ready...',
    'about.typing.1':  '> Profile loaded: Duru',
    'about.typing.2':  '> Online right now!',
    'projects.title': 'My Projects',
    'projects.sub': 'This list will soon be loaded dynamically from a database (PHP + MySQL).',
    'proj.1.t':'Duru OS Portfolio','proj.1.b':'A desktop-themed dynamic portfolio.',
    'proj.2.t':'QR Order System','proj.2.b':'QR-based table ordering app for restaurants.',
    'proj.3.t':'Data Visualizer','proj.3.b':'Tool that turns CSV data into interactive charts.',
    'edu.title':'Education Journey',
    'edu.sub':'Schools I pinned to my corkboard',
    'edu.uni.t':'Haliç University','edu.uni.b':'Software Engineering — B.Sc.',
    'edu.uni.d':'Junior year · Istanbul',
    'edu.hs.t':'İstek Bilge Kağan Anatolian High School','edu.hs.b':'Anatolian High School · Istanbul',
    'blog.title':'Blog','blog.intro':'Posts coming soon — will be loaded from the database once the backend is connected.',
    'blog.1.t':'How I built this portfolio','blog.1.b':'Setting up a desktop simulation with vanilla JS...',
    'blog.2.t':'Data flow with PHP & MySQL','blog.2.b':'My first lessons on the backend side...',
    'cv.title':'Résumé',
    'cv.h.edu':'Education',
    'cv.edu1.t':'Haliç University','cv.edu1.d':' · Software Engineering',
    'cv.edu1.y':'2023 – 2027 (ongoing)',
    'cv.edu2.t':'İstek Bilge Kağan Anatolian High School',
    'cv.edu2.y':'2018 – 2022',
    'cv.h.skills':'Skills','cv.h.contact':'Contact',
    'cv.download':'📥 Download as PDF',
    'win.finder':'Finder',
    'finder.fav':'Favorites','finder.all':'All','finder.apps':'Apps',
    'finder.docs':'Documents','finder.links':'Links',
    'finder.search.ph':'Search this window...',
    'finder.empty':'No results'
});

/* ==========================================================
   7) SPOTLIGHT
   ========================================================== */
const spotlight = document.getElementById('spotlight');
const spotInput = document.getElementById('spotlight-input');
const spotResults = document.getElementById('spotlight-results');

const SPOT_ITEMS = [
    { id: 'about',     icon: '📁', kind: 'app', titleKey: 'win.about' },
    { id: 'projects',  icon: '💼', kind: 'app', titleKey: 'win.projects' },
    { id: 'skills',    icon: '⚙️', kind: 'app', titleKey: 'win.skills' },
    { id: 'education', icon: '🎓', kind: 'app', titleKey: 'win.education' },
    { id: 'resume',    icon: '📄', kind: 'app', titleKey: 'win.resume' },
    { id: 'blog',      icon: '📝', kind: 'app', titleKey: 'win.blog' },
    { id: 'terminal',  icon: '⌨️', kind: 'app', titleKey: 'win.terminal' },
    { id: 'contact',   icon: '✉️', kind: 'app', titleKey: 'dock.contact' },
    { id: 'cmd:theme', icon: '🌗', kind: 'cmd', titleKey: 'ctx.theme',
      action: () => applyTheme(state.theme === 'light' ? 'dark' : 'light') },
    { id: 'cmd:lang',  icon: '🌐', kind: 'cmd', titleKey: 'ctx.lang',
      action: () => { applyLang(state.lang === 'tr' ? 'en' : 'tr'); updateClock(); } },
    { id: 'cmd:mute',  icon: '🔇', kind: 'cmd', titleKey: 'spotlight.app',
      action: () => toggleMute() }
];

let spotIndex = 0;
function openSpotlight() {
    spotlight.classList.remove('hidden');
    spotInput.value = '';
    renderSpot('');
    setTimeout(() => spotInput.focus(), 30);
}
function closeSpotlight() { spotlight.classList.add('hidden'); }
function renderSpot(query) {
    const q = (query || '').toLowerCase().trim();
    const matches = SPOT_ITEMS.filter(it => {
        const title = t(it.titleKey).toLowerCase();
        return !q || title.includes(q) || it.id.toLowerCase().includes(q);
    });
    spotIndex = 0;
    if (!matches.length) {
        spotResults.innerHTML = `<div class="spot-empty">${t('spotlight.empty')}</div>`;
        return;
    }
    spotResults.innerHTML = matches.map((it, i) => `
        <div class="spot-result ${i === 0 ? 'active' : ''}" data-idx="${i}" data-id="${it.id}">
            <span class="spot-icon">${it.icon}</span>
            <span class="spot-title">${t(it.titleKey)}</span>
            <span class="spot-hint">${it.kind === 'cmd' ? t('spotlight.command') : t('spotlight.app')}</span>
        </div>`).join('');
    spotResults.querySelectorAll('.spot-result').forEach(r => {
        r.addEventListener('click',     () => triggerSpot(matches[+r.dataset.idx]));
        r.addEventListener('mouseenter', () => {
            spotResults.querySelectorAll('.spot-result').forEach(x => x.classList.remove('active'));
            r.classList.add('active');
            spotIndex = +r.dataset.idx;
        });
    });
}
function triggerSpot(item) {
    closeSpotlight();
    if (!item) return;
    if (item.kind === 'cmd') item.action?.();
    else if (item.id === 'contact') showContactPopup();
    else wm.open(item.id);
}
/* Menü bar'daki Finder butonu — Spotlight yerine Finder uygulamasını açar */
document.getElementById('finder-toggle')?.addEventListener('click', () => {
    wm.open('finder');
});

spotInput?.addEventListener('input', (e) => renderSpot(e.target.value));
spotInput?.addEventListener('keydown', (e) => {
    const items = spotResults.querySelectorAll('.spot-result');
    if (e.key === 'ArrowDown') { e.preventDefault(); spotIndex = Math.min(items.length - 1, spotIndex + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); spotIndex = Math.max(0, spotIndex - 1); }
    else if (e.key === 'Enter') {
        e.preventDefault();
        const active = items[spotIndex];
        if (active) {
            const id = active.dataset.id;
            const item = SPOT_ITEMS.find(x => x.id === id);
            triggerSpot(item);
        }
        return;
    } else if (e.key === 'Escape') { closeSpotlight(); }
    items.forEach((x, i) => x.classList.toggle('active', i === spotIndex));
});
spotlight?.addEventListener('click', (e) => { if (e.target === spotlight) closeSpotlight(); });
document.getElementById('spotlight-toggle')?.addEventListener('click', openSpotlight);

/* ==========================================================
   8) TERMINAL
   ========================================================== */
function initTerminal(win) {
    const root  = win.querySelector('.terminal');
    const hist  = root.querySelector('.term-history');
    const input = root.querySelector('.term-input');

    const isTR = () => state.lang === 'tr';
    const intro = isTR()
        ? 'Duru Shell v1.0 — komutlar için "help" yaz.'
        : 'Duru Shell v1.0 — type "help" for commands.';
    appendOutput(intro);

    function appendLine(html) {
        const line = document.createElement('div');
        line.className = 'term-line';
        line.innerHTML = html;
        hist.appendChild(line);
        root.scrollTop = root.scrollHeight;
    }
    function appendOutput(text, err = false) {
        appendLine(`<span class="term-output ${err ? 'term-error' : ''}">${escapeHtml(text)}</span>`);
    }
    function escapeHtml(s) { return String(s).replace(/[&<>]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;' }[c])); }

    const COMMANDS = {
        help: () => isTR()
            ? `Komutlar: help, whoami, about, skills, projects, education, blog, contact,\n          theme [light|dark], lang [tr|en], open <uygulama>, ls, cat <dosya>, date, clear`
            : `Commands: help, whoami, about, skills, projects, education, blog, contact,\n          theme [light|dark], lang [tr|en], open <app>, ls, cat <file>, date, clear`,
        whoami: () => 'duru — full-stack dev, computer engineering student',
        about: () => isTR()
            ? 'Bilgisayar mühendisliği öğrencisi. Tasarım + kod ikilisi.'
            : 'Computer engineering student. Design + code duo.',
        skills: () => 'HTML5★★★★★  CSS3★★★★★  JavaScript★★★★☆  PHP★★★★☆  MySQL★★★★☆  Python★★★☆☆',
        projects: () => '• Duru OS Portfolyo\n• QR Sipariş Sistemi\n• Veri Görselleştirici',
        education: () => '2022-2026 · Bilgisayar Mühendisliği\n2018-2022 · Fen Lisesi',
        blog: () => isTR() ? 'blog/post-1.md  blog/post-2.md' : 'blog/post-1.md  blog/post-2.md',
        contact: () => 'duru.altinok2004@gmail.com',
        theme: (arg) => {
            if (arg === 'light' || arg === 'dark') { applyTheme(arg); return `theme → ${arg}`; }
            return 'usage: theme [light|dark]';
        },
        lang: (arg) => {
            if (arg === 'tr' || arg === 'en') { applyLang(arg); updateClock(); return `lang → ${arg}`; }
            return 'usage: lang [tr|en]';
        },
        ls: () => 'about.txt  projects/  skills.json  resume.pdf  blog/  contact.vcf',
        cat: (arg) => {
            const files = {
                'about.txt':   isTR() ? 'Duru — full-stack dev.' : 'Duru — full-stack dev.',
                'skills.json': '{"HTML":95,"CSS":92,"JS":88,"PHP":78,"MySQL":80}',
                'contact.vcf': 'EMAIL:duru.altinok2004@gmail.com'
            };
            return files[arg] || `cat: ${arg}: ${isTR() ? 'dosya yok' : 'no such file'}`;
        },
        open: (arg) => {
            const map = {
                about:'about', hakkimda:'about',
                projects:'projects', projeler:'projects',
                skills:'skills', yetenekler:'skills',
                education:'education', egitim:'education',
                blog:'blog', resume:'resume', cv:'resume',
                terminal:'terminal'
            };
            const app = map[arg];
            if (app) { wm.open(app); return `opening ${arg}...`; }
            return `open: ${arg}: ${isTR() ? 'bilinmeyen uygulama' : 'unknown app'}`;
        },
        date: () => new Date().toLocaleString(state.lang === 'tr' ? 'tr-TR' : 'en-US'),
        clear: () => '__CLEAR__',
        cls: () => '__CLEAR__',
        sudo: () => isTR() ? 'sudo: bu kullanıcı sudoers dosyasında yok 😄' : "sudo: user not in sudoers 😄"
    };

    const history = [];
    let histIdx = -1;

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const raw = input.value.trim();
            appendLine(`<span class="term-prompt">duru@portfolio:~$</span> <span>${escapeHtml(raw)}</span>`);
            if (raw) {
                history.unshift(raw); histIdx = -1;
                const [cmd, ...args] = raw.split(/\s+/);
                const handler = COMMANDS[cmd];
                if (!handler) appendOutput(`${cmd}: ${isTR() ? 'komut bulunamadı' : 'command not found'}`, true);
                else {
                    const out = handler(args.join(' '));
                    if (out === '__CLEAR__') hist.innerHTML = '';
                    else appendOutput(out);
                }
            }
            input.value = '';
        } else if (e.key === 'ArrowUp') {
            if (history.length && histIdx < history.length - 1) { histIdx++; input.value = history[histIdx]; }
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            if (histIdx > 0) { histIdx--; input.value = history[histIdx]; }
            else { histIdx = -1; input.value = ''; }
            e.preventDefault();
        }
    });

    root.addEventListener('click', () => input.focus());
}

/* ==========================================================
   9) PARALLAX WALLPAPER
   ========================================================== */
const wallpaper = document.getElementById('wallpaper-bg');
let parallaxRAF = null;
let lastParallax = { x: 0, y: 0 };
document.addEventListener('mousemove', (e) => {
    if (!wallpaper) return;
    const tx = (e.clientX / window.innerWidth  - 0.5) * -16;
    const ty = (e.clientY / window.innerHeight - 0.5) * -16;
    lastParallax = { x: tx, y: ty };
    if (parallaxRAF) return;
    parallaxRAF = requestAnimationFrame(() => {
        wallpaper.style.transform = `translate3d(${lastParallax.x}px, ${lastParallax.y}px, 0)`;
        parallaxRAF = null;
    });
});

/* ==========================================================
   10) BOOT EKRANI (butonla giriş)
   ========================================================== */
const bootScreen   = document.getElementById('boot-screen');
const desktop      = document.getElementById('desktop');
const progressFill = document.getElementById('progress-fill');
const bootStatus   = document.getElementById('boot-status');
const bootStart    = document.getElementById('boot-start');

const bootMessageKeys = [
    { at:  0, key: 'boot.msg.0' },
    { at: 20, key: 'boot.msg.1' },
    { at: 40, key: 'boot.msg.2' },
    { at: 60, key: 'boot.msg.3' },
    { at: 80, key: 'boot.msg.4' },
    { at: 100, key: 'boot.msg.5' }
];

/* Boot ekranı parçacıkları */
(function spawnBootParticles() {
    const container = document.getElementById('boot-particles');
    if (!container) return;
    const N = 38;
    for (let i = 0; i < N; i++) {
        const p = document.createElement('div');
        p.className = 'boot-particle';
        const size = 2 + Math.random() * 4;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = (Math.random() * 100) + '%';
        p.style.setProperty('--dur',   (14 + Math.random() * 18) + 's');
        p.style.setProperty('--drift', (Math.random() * 140 - 70) + 'px');
        p.style.setProperty('--peak',  (0.2 + Math.random() * 0.35).toFixed(2));
        p.style.setProperty('--delay', (-Math.random() * 22) + 's');
        container.appendChild(p);
    }
})();

/* Çiçek büyüme referansları */
const gardenStem  = document.getElementById('garden-stem');
const gardenBud   = document.getElementById('garden-bud');
const gardenBloom = document.getElementById('garden-bloom');
const gardenLeaf1 = document.querySelector('.garden-leaf-1');
const gardenLeaf2 = document.querySelector('.garden-leaf-2');
const flowerGarden = document.querySelector('.flower-garden');

let progress = 0;
const bootInterval = setInterval(() => {
    progress += 1;
    progressFill.style.width = progress + '%';
    const msg = bootMessageKeys.find(m => m.at === progress);
    if (msg) bootStatus.textContent = t(msg.key);

    // Sap büyür (max 150px)
    if (gardenStem) {
        const stemH = (progress / 100) * 150;
        gardenStem.style.height = stemH + 'px';
        // Tomurcuk/çiçek sap tepesinde durur
        if (gardenBud)   gardenBud.style.bottom   = (14 + stemH - 10) + 'px';
        if (gardenBloom) gardenBloom.style.bottom = (14 + stemH - 8)  + 'px';
    }
    // Yapraklar belirli noktalarda açılır
    if (progress === 32) gardenLeaf1?.classList.add('show');
    if (progress === 58) gardenLeaf2?.classList.add('show');
    // Tomurcuk
    if (progress === 75) gardenBud?.classList.add('show');
    // Çiçek açıyor — tomurcuk gidiyor, bloom geliyor
    if (progress === 96) {
        gardenBud?.classList.remove('show');
        gardenBloom?.classList.add('show');
        flowerGarden?.classList.add('bloomed');
    }

    if (progress >= 100) {
        clearInterval(bootInterval);
        bootStart.classList.remove('hidden');
    }
}, 30);

bootStart?.addEventListener('click', () => {
    try { sound.init(); sound.boot(); } catch (e) { /* ses başlatılamadıysa sessizce devam */ }
    bootScreen.classList.add('fade-out');
    setTimeout(() => {
        bootScreen.classList.add('hidden');
        desktop.classList.remove('hidden');

        // Sticky'leri sırayla iğnele
        setTimeout(() => {
            document.querySelectorAll('.sticky-note').forEach((s, i) => {
                setTimeout(() => s.classList.add('pinned'), i * 350);
            });
        }, 300);

        // Kontak popup'ı otomatik açılmıyor — kullanıcı İletişim'e tıklayınca açılacak
        setTimeout(() => {
            notify({
                icon: '👋',
                title: t('notif.welcome.t'),
                body:  t('notif.welcome.b'),
                duration: 5500
            });
        }, 1400);
    }, 600);
});

/* ==========================================================
   11) SAAT + TODAY WIDGET
   ========================================================== */
const TODAY_QUOTES = {
    tr: ['Kod yaz, kahve iç','Bugün de iyi pikseller','Bug değil, feature','Build something fun','Yarın kendine teşekkür edecek','Sleep is for the weak ☕'],
    en: ['Code & coffee','Make good pixels','Not a bug, a feature','Build something fun','Your future self thanks you','Sleep is for the weak ☕']
};

function updateClock() {
    const now = new Date();
    const daysTR = ['Paz','Pzt','Sal','Çar','Per','Cum','Cmt'];
    const daysEN = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const day = (state.lang === 'tr' ? daysTR : daysEN)[now.getDay()];
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const clock = document.getElementById('clock');
    if (clock) clock.textContent = `${day} ${h}:${m}`;
    updateTodayWidget();
}

function updateTodayWidget() {
    const now = new Date();
    const daysFullTR = ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'];
    const daysFullEN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const monthsTR = ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'];
    const monthsEN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    const dayEl   = document.getElementById('today-day-name');
    const numEl   = document.getElementById('today-num');
    const monEl   = document.getElementById('today-month');
    const quoteEl = document.getElementById('today-quote');

    if (dayEl) dayEl.textContent = (state.lang === 'tr' ? daysFullTR : daysFullEN)[now.getDay()];
    if (numEl) numEl.textContent = now.getDate();
    if (monEl) monEl.textContent = (state.lang === 'tr' ? monthsTR : monthsEN)[now.getMonth()];
    if (quoteEl) {
        const quotes = TODAY_QUOTES[state.lang] || TODAY_QUOTES.tr;
        // Saat bazlı seçim — gün boyunca aynı kalsın
        const idx = (now.getHours() + now.getDate()) % quotes.length;
        quoteEl.textContent = quotes[idx];
    }
}
updateClock();
updateTodayWidget();
setInterval(updateClock, 30 * 1000);

/* ==========================================================
   12) İKON & DOCK
   ========================================================== */
const icons = document.querySelectorAll('.desktop-icon');
icons.forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.stopPropagation();
        icons.forEach(i => i.classList.remove('selected'));
        icon.classList.add('selected');
        sound.click();
    });
    icon.addEventListener('dblclick', () => openApp(icon.dataset.window));
});
document.querySelector('.desktop-area')?.addEventListener('click', () => {
    icons.forEach(i => i.classList.remove('selected'));
});
document.querySelectorAll('.dock-item').forEach(item => {
    item.addEventListener('click', () => { if (item.dataset.window) openApp(item.dataset.window); });
});

function openApp(name) {
    if (!name) return;
    if (name === 'contact') return showContactPopup();
    wm.open(name);
}

/* ==========================================================
   13) İLETİŞİM POP-UP
   ========================================================== */
const contactPopup  = document.getElementById('contact-popup');
const popupClose    = document.getElementById('popup-close');
const contactReopen = document.getElementById('contact-reopen');

contactPopup?.classList.add('hidden');
popupClose?.addEventListener('click', () => {
    contactPopup.classList.add('closing');
    sound.close();
    setTimeout(() => {
        contactPopup.classList.add('hidden');
        contactPopup.classList.remove('closing');
        contactReopen.classList.remove('hidden');
    }, 400);
});
function showContactPopup() {
    contactReopen?.classList.add('hidden');
    contactPopup?.classList.remove('hidden');
    sound.open();
}
contactReopen?.addEventListener('click', showContactPopup);

/* ==========================================================
   CONTACT FORM — AJAX (Fetch API) + Client-side Validation
   ========================================================== */
const contactForm = document.getElementById('contact-form');
const contactFeedback = document.getElementById('contact-form-feedback');

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const isTR = state.lang === 'tr';

    const fd = new FormData(contactForm);
    const data = {
        name:    (fd.get('name') || '').toString().trim(),
        email:   (fd.get('email') || '').toString().trim(),
        subject: (fd.get('subject') || '').toString().trim(),
        body:    (fd.get('body') || '').toString().trim(),
    };

    // --- Client-side validation ---
    contactForm.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
    const errs = [];
    if (data.name.length < 2) {
        errs.push('name');
        contactForm.name.classList.add('invalid');
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(data.email)) {
        errs.push('email');
        contactForm.email.classList.add('invalid');
    }
    if (data.body.length < 5) {
        errs.push('body');
        contactForm.body.classList.add('invalid');
    }
    if (errs.length) {
        contactFeedback.textContent = isTR
            ? 'Lütfen formu doğru doldur (isim, e-posta, mesaj).'
            : 'Please fill the form correctly (name, email, message).';
        contactFeedback.className = 'contact-form-feedback err';
        return;
    }

    // --- AJAX gönderim ---
    const btn = contactForm.querySelector('.contact-form-btn');
    btn.disabled = true;
    contactFeedback.textContent = isTR ? 'Gönderiliyor...' : 'Sending...';
    contactFeedback.className = 'contact-form-feedback';

    try {
        const res = await fetch('api/contact.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const json = await res.json();

        if (res.ok && json.success) {
            contactFeedback.textContent = json.message || (isTR ? 'Mesajın iletildi 💌' : 'Message sent 💌');
            contactFeedback.className = 'contact-form-feedback ok';
            contactForm.reset();
            notify({
                icon: '✉️',
                title: isTR ? 'Mesaj iletildi' : 'Message sent',
                body:  isTR ? 'En kısa sürede döneceğim 💌' : "I'll get back to you soon 💌",
                duration: 3500
            });
        } else {
            const firstErr = json.errors ? Object.values(json.errors)[0] : (json.error || 'Hata.');
            contactFeedback.textContent = firstErr;
            contactFeedback.className = 'contact-form-feedback err';
            // İlgili alanları kırmızı yap
            if (json.errors) {
                Object.keys(json.errors).forEach(field => {
                    contactForm[field]?.classList.add('invalid');
                });
            }
        }
    } catch (err) {
        contactFeedback.textContent = isTR
            ? 'Sunucuya ulaşılamadı. Daha sonra tekrar dene.'
            : 'Could not reach the server. Try again later.';
        contactFeedback.className = 'contact-form-feedback err';
    } finally {
        btn.disabled = false;
    }
});

/* ==========================================================
   14) TEMA + DİL + SES TOGGLE
   ========================================================== */
document.getElementById('theme-toggle')?.addEventListener('click', () => {
    applyTheme(state.theme === 'light' ? 'dark' : 'light');
    sound.click();
});
document.getElementById('lang-toggle')?.addEventListener('click', () => {
    applyLang(state.lang === 'tr' ? 'en' : 'tr');
    updateClock();
    sound.click();
});

const muteToggle = document.getElementById('mute-toggle');
function refreshMuteIcon() { if (muteToggle) muteToggle.textContent = state.muted ? '🔇' : '🔊'; }
function toggleMute() {
    state.muted = !state.muted;
    localStorage.setItem('muted', state.muted);
    refreshMuteIcon();
    if (!state.muted) sound.click();
    notify({ icon: state.muted ? '🔇' : '🔊', title: t(state.muted ? 'notif.muted.t' : 'notif.unmuted.t'), duration: 2200 });
}
muteToggle?.addEventListener('click', toggleMute);
refreshMuteIcon();

/* ==========================================================
   15) CONTEXT MENÜ
   ========================================================== */
const ctxMenu = document.getElementById('context-menu');
document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.window, .contact-popup, .spotlight, input, textarea')) return;
    e.preventDefault();
    const x = Math.min(e.clientX, window.innerWidth  - 250);
    const y = Math.min(e.clientY, window.innerHeight - 240);
    ctxMenu.style.left = x + 'px';
    ctxMenu.style.top  = y + 'px';
    ctxMenu.classList.remove('hidden');
});
document.addEventListener('click', () => ctxMenu?.classList.add('hidden'));
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        ctxMenu?.classList.add('hidden');
        if (!spotlight.classList.contains('hidden')) closeSpotlight();
    }
});
ctxMenu?.querySelectorAll('.ctx-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = item.dataset.action;
        if (action === 'toggle-theme') applyTheme(state.theme === 'light' ? 'dark' : 'light');
        if (action === 'toggle-lang')  { applyLang(state.lang === 'tr' ? 'en' : 'tr'); updateClock(); }
        if (action === 'spotlight')    openSpotlight();
        if (action === 'refresh') {
            document.querySelectorAll('.desktop-icon').forEach((ic, i) => {
                ic.style.animation = 'none'; void ic.offsetHeight;
                ic.style.animation = `fadeIn 0.4s ${i * 0.05}s both ease`;
            });
        }
        if (action === 'about') alert(t('about.alert'));
        ctxMenu.classList.add('hidden');
        sound.click();
    });
});

/* ==========================================================
   16) YILDIZ CURSOR İZİ
   ========================================================== */
const trail = document.getElementById('cursor-trail');
const starGlyphs = ['⭐','✨','💫','🌟'];
let lastTrail = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrail < 80) return;
    lastTrail = now;
    const s = document.createElement('span');
    s.className = 'star';
    s.textContent = starGlyphs[Math.floor(Math.random() * starGlyphs.length)];
    s.style.left = e.clientX + 'px';
    s.style.top  = e.clientY + 'px';
    trail.appendChild(s);
    setTimeout(() => s.remove(), 900);
});

/* ==========================================================
   DOCK MAGNIFICATION — macOS tarzı yakınlaştırma
   ========================================================== */
const _dockEl = document.querySelector('.dock');
const _dockItems = document.querySelectorAll('.dock-item');
const DOCK_MAX_SCALE = 1.65;
const DOCK_MAX_LIFT  = 14;
const DOCK_RANGE     = 110;

function resetDock() {
    _dockItems.forEach(item => { item.style.transform = ''; });
    _dockEl?.classList.remove('mag');
}
_dockEl?.addEventListener('mousemove', (e) => {
    _dockEl.classList.add('mag');
    _dockItems.forEach(item => {
        const r = item.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const d = Math.abs(e.clientX - cx);
        if (d < DOCK_RANGE) {
            const t = 1 - d / DOCK_RANGE;
            const scale = 1 + t * (DOCK_MAX_SCALE - 1);
            const lift  = t * DOCK_MAX_LIFT;
            item.style.transform = `translateY(${-lift}px) scale(${scale})`;
        } else {
            item.style.transform = '';
        }
    });
});
_dockEl?.addEventListener('mouseleave', resetDock);

/* ==========================================================
   ORTAM YAPRAKLARI (her zaman düşen)
   ========================================================== */
(function spawnAmbientPetals() {
    const container = document.getElementById('ambient-petals');
    if (!container) return;
    const glyphs = ['🌸', '🌸', '🌸', '🌼', '🌷', '✨', '💮'];
    const N = 14;
    for (let i = 0; i < N; i++) {
        const p = document.createElement('span');
        p.className = 'ambient-petal';
        p.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
        p.style.left = (Math.random() * 100) + '%';
        p.style.fontSize = (12 + Math.random() * 14) + 'px';
        p.style.setProperty('--dur',   (18 + Math.random() * 22) + 's');
        p.style.setProperty('--drift', (Math.random() * 240 - 120) + 'px');
        p.style.setProperty('--peak',  (0.35 + Math.random() * 0.35).toFixed(2));
        p.style.setProperty('--delay', (-Math.random() * 40) + 's');
        container.appendChild(p);
    }
})();

/* ==========================================================
   17) KLAVYE KISAYOLLARI (Mac + Windows ortak)
   ========================================================== */
const isMac  = /Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent);
const modKey = isMac ? '⌘' : 'Ctrl';

// Spotlight tooltip + sticky'leri dinamik hale getir
document.getElementById('spotlight-toggle')?.setAttribute('title', `${isMac ? 'Ara (⌘K)' : 'Ara (Ctrl+K)'}`);
document.querySelectorAll('.ctx-item[data-action="spotlight"] .ctx-hint').forEach(el => {
    el.textContent = `${modKey}${isMac ? '' : '+'}K`;
});

document.addEventListener('keydown', (e) => {
    const mod = e.metaKey || e.ctrlKey;

    // Cmd/Ctrl + K → Spotlight
    if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (spotlight.classList.contains('hidden')) openSpotlight();
        else closeSpotlight();
    }
    // Cmd/Ctrl + W → aktif pencereyi kapat
    if (mod && e.key.toLowerCase() === 'w') {
        const focused = document.querySelector('.window.focused');
        if (focused) { e.preventDefault(); wm.close(focused.dataset.appId); }
    }
    // Cmd/Ctrl + Shift + T → tema toggle
    if (mod && e.shiftKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        applyTheme(state.theme === 'light' ? 'dark' : 'light');
    }
    // Cmd/Ctrl + Shift + L → dil toggle
    if (mod && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        applyLang(state.lang === 'tr' ? 'en' : 'tr');
        updateClock();
    }
});

/* ==========================================================
   18) MENÜ DROPDOWN'LARI (Görünüm + Yardım)
   ========================================================== */
const menuWraps = document.querySelectorAll('.menu-dropdown-wrap');

function closeAllMenus() {
    menuWraps.forEach(w => w.classList.remove('open'));
}

menuWraps.forEach(wrap => {
    const item = wrap.querySelector('.menu-item');
    item?.addEventListener('click', (e) => {
        e.stopPropagation();
        const wasOpen = wrap.classList.contains('open');
        closeAllMenus();
        if (!wasOpen) wrap.classList.add('open');
        sound.click();
    });
});

// Dropdown içindeki action'lar
document.querySelectorAll('.dropdown-action').forEach(act => {
    act.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = act.dataset.action;
        if (action === 'theme-light') applyTheme('light');
        if (action === 'theme-dark')  applyTheme('dark');
        if (action === 'lang-tr')     { applyLang('tr'); updateClock(); }
        if (action === 'lang-en')     { applyLang('en'); updateClock(); }
        if (action === 'size-small')  applyIconSize('small');
        if (action === 'size-normal') applyIconSize('normal');
        if (action === 'size-large')  applyIconSize('large');
        sound.click();
        closeAllMenus();
    });
});

// Yardım — kadın emoji & mail butonu
document.getElementById('help-emoji-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAllMenus();
    wm.open('mail');
    sound.open();
});
document.getElementById('help-mail-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAllMenus();
    wm.open('mail');
});

// Dışarı tıklayınca tüm dropdown'ları kapat
document.addEventListener('click', closeAllMenus);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllMenus(); });

/* ==========================================================
   19) MAIL UYGULAMASI
   ========================================================== */
function initMailApp(win) {
    const subjectInput = win.querySelector('#mail-subject');
    const bodyInput    = win.querySelector('#mail-body');
    const sendBtn      = win.querySelector('#mail-send-btn');

    setTimeout(() => subjectInput?.focus(), 100);

    sendBtn?.addEventListener('click', () => {
        const subject = subjectInput.value.trim();
        const body    = bodyInput.value.trim();

        if (!subject || !body) {
            notify({ icon: '⚠️', title: t('mail.empty'), duration: 3000 });
            (subject ? bodyInput : subjectInput).focus();
            return;
        }

        const mailto = `mailto:duru.altinok2004@gmail.com`
            + `?subject=${encodeURIComponent(subject)}`
            + `&body=${encodeURIComponent(body)}`;

        // Yeni sekme yerine doğrudan mailto: ile aç (varsayılan mail istemcisi)
        window.location.href = mailto;

        notify({
            icon: '✉️',
            title: t('mail.opened.t'),
            body:  t('mail.opened.b'),
            duration: 4500
        });
        sound.notify();

        // Kısa süre sonra pencereyi kapat
        setTimeout(() => wm.close('mail'), 800);
    });

    // Cmd/Ctrl + Enter ile de gönder
    [subjectInput, bodyInput].forEach(el => el?.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
            e.preventDefault();
            sendBtn.click();
        }
    }));
}

/* ==========================================================
   YETENEKLER KOD EDİTÖRÜ — TYPEWRITER
   ========================================================== */
let typingTimer = null;
function typeSkillsCode(win) {
    const codeBody = win.querySelector('#code-body');
    if (!codeBody) return;
    const isTR = state.lang === 'tr';

    const lines = [
        [{ c:'tok-comment', t: isTR ? '// Tanışalım — yetenek listem 👇' : '// Let me introduce — my skill set 👇' }],
        [{ c:'tok-keyword', t:'const ' }, { c:'', t:'duru' }, { c:'tok-punct', t:' = ' }, { c:'tok-bracket', t:'{' }],
        [{ c:'',t:'  '},{c:'tok-prop',t:'name'},{c:'tok-punct',t:': '},{c:'tok-string',t:'"Duru Altınok"'},{c:'tok-punct',t:','}],
        [{ c:'',t:'  '},{c:'tok-prop',t:'languages'},{c:'tok-punct',t:': '},{c:'tok-bracket',t:'{'}],
        [{ c:'',t:'    '},{c:'tok-string',t:'"HTML5"'},{c:'tok-punct',t:': '},{c:'tok-number',t:'95'},{c:'tok-punct',t:','}],
        [{ c:'',t:'    '},{c:'tok-string',t:'"CSS3"'},{c:'tok-punct',t:': '},{c:'tok-number',t:'92'},{c:'tok-punct',t:','}],
        [{ c:'',t:'    '},{c:'tok-string',t:'"JavaScript"'},{c:'tok-punct',t:': '},{c:'tok-number',t:'88'},{c:'tok-punct',t:','}],
        [{ c:'',t:'    '},{c:'tok-string',t:'"PHP"'},{c:'tok-punct',t:': '},{c:'tok-number',t:'78'},{c:'tok-punct',t:','}],
        [{ c:'',t:'    '},{c:'tok-string',t:'"MySQL"'},{c:'tok-punct',t:': '},{c:'tok-number',t:'80'},{c:'tok-punct',t:','}],
        [{ c:'',t:'    '},{c:'tok-string',t:'"Python"'},{c:'tok-punct',t:': '},{c:'tok-number',t:'72'}],
        [{ c:'',t:'  '},{c:'tok-bracket',t:'}'},{c:'tok-punct',t:','}],
        [{ c:'',t:'  '},{c:'tok-prop',t:'tools'},{c:'tok-punct',t:': '},{c:'tok-bracket',t:'['},
         {c:'tok-string',t:'"Git"'},{c:'tok-punct',t:', '},
         {c:'tok-string',t:'"VS Code"'},{c:'tok-punct',t:', '},
         {c:'tok-string',t:'"Figma"'},{c:'tok-bracket',t:']'},{c:'tok-punct',t:','}],
        [{ c:'',t:'  '},{c:'tok-prop',t:'currentlyLearning'},{c:'tok-punct',t:': '},{c:'tok-string',t:'"TypeScript & React"'}],
        [{ c:'tok-bracket',t:'}'},{c:'tok-punct',t:';'}]
    ];

    codeBody.innerHTML = '';
    let li = 0, ti = 0, ci = 0;
    const step = () => {
        if (li >= lines.length) return;
        const line = lines[li], tok = line[ti];
        let span = codeBody.querySelector(`span.cur[data-l="${li}"][data-t="${ti}"]`);
        if (!span) {
            span = document.createElement('span');
            span.className = (tok.c ? tok.c + ' ' : '') + 'cur';
            span.setAttribute('data-l', li);
            span.setAttribute('data-t', ti);
            codeBody.appendChild(span);
        }
        span.textContent += tok.t.charAt(ci);
        ci++;
        if (ci >= tok.t.length) {
            span.classList.remove('cur');
            ti++; ci = 0;
            if (ti >= line.length) {
                codeBody.appendChild(document.createTextNode('\n'));
                li++; ti = 0;
                typingTimer = setTimeout(step, 80);
                return;
            }
        }
        const delay = tok.c.includes('comment') ? 18 : tok.c.includes('string') ? 26 : 18;
        typingTimer = setTimeout(step, delay);
    };
    step();
}

/* ==========================================================
   HAKKIMDA SAYFASI — İNTERAKTİF SHOWCASE
   ========================================================== */
function activateAboutShowcase(win) {
    // 1) "Tema değişiyor, beni tanıyın!" bildirimi
    setTimeout(() => {
        notify({
            icon: '🎨',
            title: t('about.intro.t'),
            body:  t('about.intro.b'),
            duration: 4200
        });
    }, 250);

    // 2) Pencereden dışarı yıldız + kalp + emoji yağmuru
    spawnAboutSparkles(win);

    // 3) Stat çubuklarını doldur
    setTimeout(() => {
        win.querySelectorAll('.pixel-bar-fill').forEach((bar, i) => {
            const fill = bar.getAttribute('data-fill') || '0';
            setTimeout(() => { bar.style.width = fill + '%'; }, i * 120);
        });
    }, 500);

    // 4) Welcome alanına typewriter mesajları
    const typingEl = win.querySelector('#pixel-typing');
    if (typingEl) {
        const lines = [
            t('about.typing.0'),
            t('about.typing.1'),
            t('about.typing.2')
        ];
        let line = 0, ch = 0;
        const typeNext = () => {
            if (line >= lines.length) return;
            const text = lines[line];
            if (ch === 0) typingEl.textContent = '';
            if (ch < text.length) {
                typingEl.textContent = text.slice(0, ch + 1);
                ch++;
                setTimeout(typeNext, 45);
            } else {
                line++; ch = 0;
                setTimeout(typeNext, 1200);
            }
        };
        setTimeout(typeNext, 900);
    }
}

/* ==========================================================
   EĞİTİM SAYFASI — NOKTALARDAN AÇILAN TYPEWRITER TIMELINE
   ========================================================== */
function fitTimelineLine(timeline) {
    const items = timeline.querySelectorAll('.timeline-item');
    if (items.length < 2) return;
    const firstItem   = items[0];
    const lastItem    = items[items.length - 1];
    const firstMarker = firstItem.querySelector('.timeline-marker');
    const lastMarker  = lastItem.querySelector('.timeline-marker');
    if (!firstMarker || !lastMarker) return;

    // marker'ın .timeline'a göre dikey merkezi
    // (marker'ın offsetParent'ı .timeline-item, item'ın offsetParent'ı .timeline)
    const firstY = firstItem.offsetTop + firstMarker.offsetTop + firstMarker.offsetHeight / 2;
    const lastY  = lastItem.offsetTop  + lastMarker.offsetTop  + lastMarker.offsetHeight / 2;

    timeline.style.setProperty('--line-top', firstY + 'px');
    timeline.style.setProperty('--line-height', (lastY - firstY) + 'px');
}


async function activateEducationTimeline(win) {
    const board = win.querySelector('[data-edu-board]');
    if (!board) return;

    const notes = board.querySelectorAll('.edu-note');

    // i18n çeviri yaplmışsa data-text'i güncelle, sonra alanları boşalt
    notes.forEach(note => {
        note.querySelectorAll('[data-text]').forEach(el => {
            const i18nKey = el.getAttribute('data-i18n-text');
            if (i18nKey && TRANSLATIONS[state.lang][i18nKey]) {
                el.setAttribute('data-text', TRANSLATIONS[state.lang][i18nKey]);
            }
            el.textContent = '';
        });
    });

    const wait = (ms) => new Promise(r => setTimeout(r, ms));
    const type = (el, text, speed = 28) => new Promise(resolve => {
        if (!text) return resolve();
        let i = 0;
        el.classList.add('typing-cursor');
        const tick = () => {
            el.textContent = text.slice(0, ++i);
            if (i < text.length) setTimeout(tick, speed);
            else { el.classList.remove('typing-cursor'); resolve(); }
        };
        tick();
    });

    for (const note of notes) {
        const logo = note.querySelector('.edu-logo');

        // 1) Not kağıdı mantar panoya iğnelensin
        note.classList.add('pinned');
        sound.click();
        await wait(650);

        // 2) Typewriter ile alanları sırayla doldur
        const date     = note.querySelector('.edu-date');
        const title    = note.querySelector('h3');
        const subtitle = note.querySelector('.edu-note-body > p:not(.edu-detail)');
        const detail   = note.querySelector('.edu-detail');

        if (date)     { await type(date,     date.getAttribute('data-text')     || '', 36); await wait(150); }
        if (title)    { await type(title,    title.getAttribute('data-text')    || '', 32); await wait(140); }
        if (subtitle) { await type(subtitle, subtitle.getAttribute('data-text') || '', 28); await wait(120); }
        if (detail)   { await type(detail,   detail.getAttribute('data-text')   || '', 24); await wait(150); }

        // 3) Logo sağ alta iğnelensin
        if (logo) {
            await wait(180);
            logo.classList.add('pinned');
            sound.click();
        }

        await wait(700);
    }
}

/* ==========================================================
   PROJELER & BLOG — AJAX İLE DB'DEN ÇEK
   ========================================================== */
async function loadProjects(win) {
    const grid = win.querySelector('#project-grid');
    if (!grid) return;
    const isTR = state.lang === 'tr';
    try {
        const res = await fetch('api/projects.php');
        const json = await res.json();
        if (!json.success) throw new Error(json.error || 'Hata');

        if (!json.data.length) {
            grid.innerHTML = `<p class="empty-msg">${isTR ? 'Henüz proje yok.' : 'No projects yet.'}</p>`;
            return;
        }

        grid.innerHTML = json.data.map(p => `
            <article class="project-card" data-id="${p.id}">
              ${p.is_featured ? '<span class="featured-badge">⭐</span>' : ''}
              <div class="project-icon">${escapeHtml(p.icon || '💼')}</div>
              <h3>${escapeHtml(p.title)}</h3>
              <p>${escapeHtml(p.description)}</p>
              <div class="project-tags">
                ${p.tags.map(t => `<span>${escapeHtml(t)}</span>`).join('')}
              </div>
              ${p.link_url && p.link_url !== '#'
                  ? `<a href="${escapeHtml(p.link_url)}" target="_blank" rel="noopener" class="project-link">${isTR ? 'Aç →' : 'Open →'}</a>`
                  : ''}
            </article>
        `).join('');
    } catch (err) {
        grid.innerHTML = `<p class="empty-msg err">${isTR ? 'Projeler yüklenemedi. Sunucu çalışıyor mu?' : 'Could not load projects.'}</p>`;
        console.warn('Projects fetch error:', err);
    }
}

async function loadBlog(win) {
    const list = win.querySelector('#blog-list');
    if (!list) return;
    const isTR = state.lang === 'tr';
    try {
        const res = await fetch('api/blog.php');
        const json = await res.json();
        if (!json.success) throw new Error(json.error || 'Hata');

        if (!json.data.length) {
            list.innerHTML = `<li class="empty-msg">${isTR ? 'Henüz yazı yok.' : 'No posts yet.'}</li>`;
            return;
        }

        const locale = isTR ? 'tr-TR' : 'en-US';
        list.innerHTML = json.data.map(p => `
            <li class="blog-post" data-id="${p.id}">
              <span class="blog-date">${new Date(p.created_at).toLocaleDateString(locale, { day:'numeric', month:'short', year:'numeric' })}</span>
              <h3>${escapeHtml(p.title)}</h3>
              <p>${escapeHtml(p.excerpt || p.content.substring(0, 140) + '...')}</p>
            </li>
        `).join('');
    } catch (err) {
        list.innerHTML = `<li class="empty-msg err">${isTR ? 'Yazılar yüklenemedi.' : 'Could not load posts.'}</li>`;
        console.warn('Blog fetch error:', err);
    }
}

// Basit HTML kaçışı — XSS koruması
function escapeHtml(str) {
    return String(str ?? '').replace(/[&<>"']/g, m =>
        ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[m])
    );
}

/* ==========================================================
   FINDER UYGULAMASI — Dosya / uygulama gezgini
   ========================================================== */
function initFinder(win) {
    const grid     = win.querySelector('#finder-grid');
    const search   = win.querySelector('#finder-search-input');
    const sideItms = win.querySelectorAll('.finder-item');

    // Tüm "dosyalar" (uygulamalar, belgeler, bağlantılar)
    const FILES = [
        { id: 'about',     name: 'Hakkımda.app',   icon: '📁', cat: 'apps' },
        { id: 'projects',  name: 'Projeler.app',   icon: '💼', cat: 'apps' },
        { id: 'skills',    name: 'Yetenekler.app', icon: '⚙️', cat: 'apps' },
        { id: 'education', name: 'Eğitim.app',     icon: '🎓', cat: 'apps' },
        { id: 'blog',      name: 'Blog.app',       icon: '📝', cat: 'apps' },
        { id: 'terminal',  name: 'Terminal.app',   icon: '⌨️', cat: 'apps' },
        { id: 'mail',      name: 'Mail.app',       icon: '✉️', cat: 'apps' },
        { id: 'resume',    name: 'CV.pdf',         icon: '📄', cat: 'docs' },
        { id: 'github',    name: 'GitHub',         icon: '🐙', cat: 'links', url: 'https://github.com/durualt' },
        { id: 'linkedin',  name: 'LinkedIn',       icon: '🔗', cat: 'links', url: 'https://www.linkedin.com/in/duru-altinok/' },
        { id: 'contact',   name: 'İletişim',       icon: '✉️', cat: 'apps' }
    ];

    let currentCat   = 'all';
    let currentQuery = '';

    function render() {
        const q = currentQuery.trim().toLowerCase();
        const visible = FILES.filter(f => {
            const matchCat = currentCat === 'all' || f.cat === currentCat;
            const matchQ   = !q || f.name.toLowerCase().includes(q) || f.id.includes(q);
            return matchCat && matchQ;
        });

        if (!visible.length) {
            grid.innerHTML = `<div class="finder-empty">${t('finder.empty')}</div>`;
            return;
        }

        grid.innerHTML = visible.map(f => `
            <div class="finder-file" data-id="${f.id}" data-url="${f.url || ''}">
                <div class="finder-file-icon">${f.icon}</div>
                <div class="finder-file-name">${f.name}</div>
            </div>`).join('');

        grid.querySelectorAll('.finder-file').forEach(el => {
            el.addEventListener('click', () => {
                grid.querySelectorAll('.finder-file').forEach(x => x.style.background = '');
                el.style.background = 'rgba(0,122,255,0.18)';
                sound.click();
            });
            el.addEventListener('dblclick', () => {
                const id  = el.dataset.id;
                const url = el.dataset.url;
                if (url) {
                    // Harici link — yeni sekmede aç
                    window.open(url, '_blank', 'noopener,noreferrer');
                    return;
                }
                if (id === 'contact') showContactPopup();
                else wm.open(id);
            });
        });
    }

    sideItms.forEach(item => {
        item.addEventListener('click', () => {
            sideItms.forEach(x => x.classList.remove('active'));
            item.classList.add('active');
            currentCat = item.dataset.target;
            render();
        });
    });

    search?.addEventListener('input', (e) => {
        currentQuery = e.target.value;
        render();
    });

    render();
}

function spawnAboutSparkles(win) {
    const decorations = ['✨','💖','⭐','🌸','🎮','📚','🎨','💫','🦄','🌟'];
    const rect = win.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;

    for (let i = 0; i < 24; i++) {
        setTimeout(() => {
            const s = document.createElement('div');
            s.className = 'about-sparkle';
            s.textContent = decorations[Math.floor(Math.random() * decorations.length)];

            // Pencere kenarından rastgele çıkış noktası
            const side = Math.floor(Math.random() * 4);
            let x, y;
            if (side === 0)      { x = rect.left + Math.random() * rect.width;  y = rect.top; }
            else if (side === 1) { x = rect.right;  y = rect.top + Math.random() * rect.height; }
            else if (side === 2) { x = rect.left + Math.random() * rect.width;  y = rect.bottom; }
            else                 { x = rect.left;   y = rect.top + Math.random() * rect.height; }

            s.style.left = x + 'px';
            s.style.top  = y + 'px';

            // Pencereden dışa doğru uçuş yönü
            const ang  = Math.atan2(y - cy, x - cx);
            const dist = 90 + Math.random() * 110;
            s.style.setProperty('--dx', Math.cos(ang) * dist + 'px');
            s.style.setProperty('--dy', Math.sin(ang) * dist + 'px');

            document.body.appendChild(s);
            setTimeout(() => s.remove(), 1700);
        }, i * 45);
    }
}

}); // DOMContentLoaded sonu
