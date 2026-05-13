# Duru OS — Full-Stack Web Portfolyo

> Bilgisayar masaüstü temalı, tek sayfalık dinamik portfolyo uygulaması.
> Tüm dersi (HTML5, CSS3, JavaScript, PHP, MySQL) birleştiren bir proje.

**👤 Geliştirici:** Duru Altınok
**🎓 Eğitim:** Haliç Üniversitesi — Software Engineering
**📧 İletişim:** duru.altinok2004@gmail.com
**🔗 Sosyal:** [LinkedIn](https://www.linkedin.com/in/duru-altinok/) · [GitHub](https://github.com/durualt)

---

## 🎬 Konsept

Portfolyo, kullanıcı siteye girdiğinde bir bilgisayar açılıyormuş hissi verir:
1. **Boot ekranı**: Çiçek büyüme animasyonu
2. **Masaüstü**: Sticky note iğnelemesi, dock magnification,dağınık görüntülü uygulama iconları.
3. **Uygulamalar**: Hakkımda, Eğitim, Projeler, Yetenekler, CV, Blog, Terminal, Mail, Finder, İletişim
4. **Admin paneli**: Session-tabanlı login, proje CRUD ve mesaj yönetimi

## ⚡ Öne Çıkan Özellikler

- 🌗 Aydınlık / karanlık tema 
- 🌐 TR / EN dil desteği (i18n)
- 📐 Sağ tık context menüsü
- 🔍 Spotlight arama (⌘K / Ctrl+K)
- ⌨️ Mini terminal (komut satırı simülasyonu)
- 🗂️ Finder dosya gezgini
- 🌸 Eğitim sayfasında mantar panoya iğnelenen okul notları + typewriter
- 🎨 Pixel-art temalı Hakkımda sayfası
- 📋 Erişilebilirlik için ikon boyutu seçici
- ⌨️ Klavye kısayolları (⌘K, ⌘W, ⌘+Shift+T/L)

## 🛠️ Kullanılan Teknolojiler

| Katman      | Teknolojiler                               
| Frontend    | HTML5, CSS3 (Flexbox + Grid), Vanilla JS (ES6+) 
| Backend     | PHP 8.x (PDO)                                 
| Veritabanı  | MySQL 8.x                                     
| Mimari      | RESTful JSON API + AJAX (Fetch API)           
| Güvenlik    | Prepared statements, password_hash (bcrypt), CSRF token, session güvenlik flag'leri 
| Fontlar     | Press Start 2P, VT323, Times New Roman, SF Pro 

## 📋 Gereksinim Uyumu

| Proje Gereksinimi               | Karşılandığı Yer                                                       |
| ------------------------------- | ---------------------------------------------------------------------- |
| **Semantic HTML5 tags**         | `header`, `main`, `aside`, `article`, `footer`, `nav` (`index.html`)   |
| **HTML tables**                 | `admin/dashboard.php`, `admin/messages.php`, `admin/projects.php`      |
| **HTML forms**                  | Contact form, admin login, project edit                                |
| **CSS Box Model + Flexbox + Grid** | `css/styles.css` boyunca                                            |
| **External stylesheet**         | `css/styles.css`, `admin/admin.css`                                    |
| **Consistent branding**         | CSS custom properties ile tema sistemi (pastel pembe-lila)             |
| **Responsive design**           | `@media` query'leri (`< 900px`, `< 768px`, `< 480px`)                  |
| **Dynamic UI**                  | Tema toggle, dropdown menüler, dock mag, language switcher             |
| **JS form validation**          | Contact form (`js/script.js`), admin login (`admin/login.php`)         |
| **DOM manipulation**            | Window manager, sticky note pinning, theme indicator                   |
| **Contact → MySQL**             | `api/contact.php` → `messages` tablosu                                 |
| **Dynamic projects/blog**       | `api/projects.php`, `api/blog.php` (DB'den fetch)                      |
| **AJAX (Fetch API)**            | Contact form submit, projects/blog yükleme                             |
| **Sessions**                    | `config/session.php` + tüm `admin/*.php`                               |
| **Cookies**                     | "Beni hatırla" cookie (14 gün) — `login.php`                          |
| **Secure login**                | `password_hash` bcrypt, CSRF token, prepared statements                |

## 📁 Dosya Yapısı

```
Web Programming/
├── index.html             
├── css/styles.css          
├── js/script.js           
├── assets/                 
│
├── config/
│   ├── database.php        
│   └── session.php         
│
├── api/                    
│   ├── contact.php         
│   ├── projects.php        
│   └── blog.php            
│
├── admin/                  
│   ├── login.php
│   ├── dashboard.php       
│   ├── projects.php       
│   ├── messages.php        
│   ├── logout.php
│   └── admin.css
│
├── db/
│   └── schema.sql          
│
├── setup.php               
├── SETUP.md                
└── README.md              
```
## 🎓 Veritabanı Şeması

```
projects (id, title, description, icon, tags, link_url, is_featured, display_order, created_at)
blog_posts (id, title, slug, excerpt, content, published, created_at)
messages (id, name, email, subject, body, read_status, ip_address, created_at)
admin_users (id, username, password_hash, created_at, last_login)
```

## 🔐 Güvenlik Notları

- Tüm SQL sorguları **prepared statement** kullanır (SQL injection koruması)
- Admin şifreleri **bcrypt** ile hashlenmiştir (cost: 10)
- Admin formlarında **CSRF token** doğrulaması var
- Session cookie'leri `HttpOnly` ve `SameSite=Lax` ile korunmuş
- Tüm kullanıcı girdileri `filter_var` ile sanitize edilir

Eğitim amaçlı geliştirilmiş öğrenci projesidir.
