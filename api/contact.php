<?php
/**
 * ==========================================================
 * API — İLETİŞİM MESAJI KAYDET
 * ==========================================================
 * Endpoint: POST /api/contact.php
 * Body (JSON veya form-data):
 *   { name, email, subject, body }
 *
 * Yanıt (JSON):
 *   { success: true,  message: "..." }   → 201
 *   { success: false, errors: {...} }    → 422
 * ==========================================================
 */

require_once __DIR__ . '/../config/database.php';

// --- Sadece POST kabul et ---
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'error' => 'Sadece POST kabul edilir.'], 405);
}

// --- Body'yi al (JSON veya form-data) ---
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) $data = $_POST;

$name    = clean($data['name']    ?? '');
$email   = clean($data['email']   ?? '');
$subject = clean($data['subject'] ?? '');
$body    = clean($data['body']    ?? '');

// --- Sunucu tarafı validasyon ---
$errors = [];
if (mb_strlen($name) < 2 || mb_strlen($name) > 100) {
    $errors['name'] = 'İsim 2-100 karakter arası olmalı.';
}
if (!valid_email($email)) {
    $errors['email'] = 'Geçerli bir e-posta gir.';
}
if (mb_strlen($subject) > 200) {
    $errors['subject'] = 'Konu 200 karakteri aşmamalı.';
}
if (mb_strlen($body) < 5) {
    $errors['body'] = 'Mesaj en az 5 karakter olmalı.';
}
if (mb_strlen($body) > 5000) {
    $errors['body'] = 'Mesaj 5000 karakteri aşmamalı.';
}

if (!empty($errors)) {
    json_response(['success' => false, 'errors' => $errors], 422);
}

// --- Veritabanına yaz ---
try {
    $db   = db();
    $stmt = $db->prepare(
        'INSERT INTO messages (name, email, subject, body, ip_address)
         VALUES (:name, :email, :subject, :body, :ip)'
    );
    $stmt->execute([
        ':name'    => $name,
        ':email'   => $email,
        ':subject' => $subject ?: '(konu yok)',
        ':body'    => $body,
        ':ip'      => $_SERVER['REMOTE_ADDR'] ?? null,
    ]);

    json_response([
        'success' => true,
        'message' => 'Mesajın iletildi — en kısa sürede döneceğim 💌',
        'id'      => (int) $db->lastInsertId(),
    ], 201);

} catch (PDOException $e) {
    json_response([
        'success' => false,
        'error'   => 'Sunucu hatası — daha sonra tekrar dene.',
        'detail'  => $e->getMessage(), // geliştirme — canlıda kaldır
    ], 500);
}
