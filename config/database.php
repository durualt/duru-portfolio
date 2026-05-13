<?php
/**
 * ==========================================================
 * DURU OS — VERİTABANI BAĞLANTISI (PDO)
 * ==========================================================
 * Tüm PHP dosyaları bu helper'ı dahil edecek:
 *     require_once __DIR__ . '/../config/database.php';
 *     $db = db();
 *     $stmt = $db->prepare("SELECT ...");
 * ==========================================================
 */

// --- Bağlantı bilgileri (Homebrew MySQL varsayılanı) ---
// Homebrew: port 3306, kullanıcı root, şifre boş
// MAMP kullanırsan: port 8889, şifre 'root' yap
const DB_HOST = '127.0.0.1';
const DB_PORT = 3306;
const DB_NAME = 'duru_portfolio';
const DB_USER = 'root';
const DB_PASS = '';
const DB_CHARSET = 'utf8mb4';

/**
 * Singleton PDO bağlantısı döner.
 * Her çağrıda yeni bağlantı kurmaz, tek instance kullanır.
 */
function db(): PDO {
    static $pdo = null;
    if ($pdo !== null) return $pdo;

    $dsn = sprintf(
        'mysql:host=%s;port=%d;dbname=%s;charset=%s',
        DB_HOST, DB_PORT, DB_NAME, DB_CHARSET
    );

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
        PDO::ATTR_TIMEOUT            => 3,
    ];

    // PDOException'ı çağırana fırlat — her dosya kendi UI'ı ile hata gösterir
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    return $pdo;
}

/**
 * Veritabanı yoksa bağlanmadan bağlantı kurar (setup amaçlı).
 */
function db_no_database(): PDO {
    $dsn = sprintf(
        'mysql:host=%s;port=%d;charset=%s',
        DB_HOST, DB_PORT, DB_CHARSET
    );
    return new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_TIMEOUT => 3,
    ]);
}

/**
 * JSON yanıt yardımcı fonksiyonu.
 */
function json_response(array $data, int $status = 200): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store, no-cache, must-revalidate');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

/**
 * Basit input temizleme — XSS koruması için.
 */
function clean(?string $v): string {
    return trim(filter_var($v ?? '', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
}

/**
 * Email doğrulama.
 */
function valid_email(string $email): bool {
    return (bool) filter_var($email, FILTER_VALIDATE_EMAIL);
}
