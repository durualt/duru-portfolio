<?php
/**
 * ==========================================================
 * SESSION + COOKIE YARDIMCILARI
 * ==========================================================
 * Admin alanındaki tüm sayfalar bu dosyayı dahil eder.
 * - Güvenli session başlatır
 * - Admin oturumunu kontrol eder
 * - "Beni hatırla" cookie'sini yönetir
 * ==========================================================
 */

// Güvenli session ayarları (session_start'tan ÖNCE)
if (session_status() === PHP_SESSION_NONE) {
    ini_set('session.cookie_httponly', '1');
    ini_set('session.use_only_cookies', '1');
    ini_set('session.cookie_samesite', 'Lax');
    session_name('DURU_OS_SESSION');
    session_start();
}

const REMEMBER_COOKIE = 'duru_remember';
const REMEMBER_DAYS   = 14;

/**
 * Aktif admin var mı kontrol et.
 * Yoksa login sayfasına yönlendir.
 */
function require_admin(): void {
    if (empty($_SESSION['admin_id'])) {
        // "Beni hatırla" cookie'si var mı, kontrol et
        if (!empty($_COOKIE[REMEMBER_COOKIE])) {
            $token = $_COOKIE[REMEMBER_COOKIE];
            // Token formatı: "username:hash" — basit doğrulama
            // (Üretim için ayrı remember_tokens tablosu daha güvenli olurdu)
            $parts = explode(':', $token, 2);
            if (count($parts) === 2) {
                require_once __DIR__ . '/database.php';
                $db = db();
                $stmt = $db->prepare(
                    'SELECT id, username, password_hash FROM admin_users WHERE username = ?'
                );
                $stmt->execute([$parts[0]]);
                $user = $stmt->fetch();
                if ($user && hash_equals(substr($user['password_hash'], 0, 16), $parts[1])) {
                    // Cookie geçerli — oturumu yeniden kur
                    $_SESSION['admin_id']       = $user['id'];
                    $_SESSION['admin_username'] = $user['username'];
                    return;
                }
            }
        }
        // Yetkisi yok — login'e yönlendir
        header('Location: login.php');
        exit;
    }
}

/**
 * Admin oturumu açar.
 */
function login_admin(int $id, string $username, bool $remember = false): void {
    // Session sabitlemesini önle
    session_regenerate_id(true);
    $_SESSION['admin_id']       = $id;
    $_SESSION['admin_username'] = $username;
    $_SESSION['login_time']     = time();

    if ($remember) {
        require_once __DIR__ . '/database.php';
        $db = db();
        $stmt = $db->prepare('SELECT password_hash FROM admin_users WHERE id = ?');
        $stmt->execute([$id]);
        $hash = $stmt->fetchColumn();
        $token = $username . ':' . substr($hash, 0, 16);
        setcookie(REMEMBER_COOKIE, $token, [
            'expires'  => time() + (REMEMBER_DAYS * 86400),
            'path'     => '/',
            'httponly' => true,
            'samesite' => 'Lax',
        ]);
    }
}

/**
 * Admin oturumunu kapatır.
 */
function logout_admin(): void {
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'], $p['secure'], $p['httponly']);
    }
    setcookie(REMEMBER_COOKIE, '', time() - 42000, '/');
    session_destroy();
}

/**
 * CSRF token üretir/getirir.
 */
function csrf_token(): string {
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf'];
}

function csrf_verify(?string $token): bool {
    return !empty($_SESSION['csrf']) && hash_equals($_SESSION['csrf'], (string)$token);
}
