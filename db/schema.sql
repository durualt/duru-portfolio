-- ==========================================================
-- DURU OS — VERİTABANI ŞEMASI
-- ==========================================================
-- Bu dosyayı phpMyAdmin'de aç ve "İçe Aktar" sekmesinden çalıştır.
-- Veya MySQL CLI'da: mysql -u root -p < schema.sql
-- ==========================================================

CREATE DATABASE IF NOT EXISTS duru_portfolio
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE duru_portfolio;

-- ----------------------------------------------------------
-- 1) PROJECTS — Portfolyo projelerin
-- ----------------------------------------------------------
DROP TABLE IF EXISTS projects;
CREATE TABLE projects (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    title         VARCHAR(150) NOT NULL,
    description   TEXT NOT NULL,
    icon          VARCHAR(20)  DEFAULT '💼',
    tags          VARCHAR(255),
    link_url      VARCHAR(500),
    is_featured   BOOLEAN DEFAULT 0,
    display_order INT DEFAULT 0,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO projects (title, description, icon, tags, link_url, is_featured, display_order) VALUES
('Duru OS Portfolyo',  'Bilgisayar masaüstü temalı dinamik portfolyo uygulaması. Sticky note iğnelemeden mantar panosuna, pixel temalı Hakkımda sayfasına kadar her detay düşünüldü.', '🖥️', 'HTML,CSS,JavaScript,PHP', 'https://github.com/duru/portfolio', 1, 1),
('QR Sipariş Sistemi', 'Restoranlar için QR kodla masa sipariş uygulaması. Müşteri telefonundan menüyü görür, sipariş verir; mutfak gerçek zamanlı alır.', '🍔', 'PHP,MySQL,AJAX', '#', 0, 2),
('Veri Görselleştirici', 'CSV verilerinden interaktif grafikler üreten araç. D3.js ile dinamik bar/line/pie chart çıktıları.', '📊', 'D3.js,React,JavaScript', '#', 0, 3);

-- ----------------------------------------------------------
-- 2) BLOG_POSTS — Blog yazıları
-- ----------------------------------------------------------
DROP TABLE IF EXISTS blog_posts;
CREATE TABLE blog_posts (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    title      VARCHAR(200) NOT NULL,
    slug       VARCHAR(200) UNIQUE NOT NULL,
    excerpt    VARCHAR(500),
    content    TEXT NOT NULL,
    published  BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO blog_posts (title, slug, excerpt, content, published) VALUES
('Bu portfolyoyu nasıl yaptım',
 'portfolyo-yapim-hikayesi',
 'Vanilla JS ile bir masaüstü simülasyonu kurmak — sıfırdan üretmenin keyfi.',
 'Uzun bir yazı buraya gelecek...',
 1),
('PHP & MySQL ile veri akışı',
 'php-mysql-veri-akisi',
 'Backend tarafındaki ilk öğrenimlerim — PDO, prepared statements, JSON API.',
 'Backend öğrenirken neyi nasıl öğrendiğim...',
 1);

-- ----------------------------------------------------------
-- 3) MESSAGES — İletişim formundan gelen mesajlar
-- ----------------------------------------------------------
DROP TABLE IF EXISTS messages;
CREATE TABLE messages (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(150) NOT NULL,
    subject     VARCHAR(200),
    body        TEXT NOT NULL,
    read_status BOOLEAN DEFAULT 0,
    ip_address  VARCHAR(45),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------
-- 4) ADMIN_USERS — Yönetici hesapları
-- ----------------------------------------------------------
DROP TABLE IF EXISTS admin_users;
CREATE TABLE admin_users (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    username      VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login    TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Admin kullanıcısı setup.php tarafından oluşturulacak.
-- (Şifre hash'i PHP'nin password_hash() fonksiyonu ile üretilir.)
