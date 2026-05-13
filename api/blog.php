<?php
/**
 * ==========================================================
 * API — BLOG YAZILARINI LİSTELE
 * ==========================================================
 * Endpoint: GET /api/blog.php
 * Yanıt: { success: true, data: [...] }
 * ==========================================================
 */

require_once __DIR__ . '/../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_response(['success' => false, 'error' => 'Sadece GET kabul edilir.'], 405);
}

try {
    $db   = db();
    $rows = $db->query(
        'SELECT id, title, slug, excerpt, content, published, created_at
         FROM blog_posts
         WHERE published = 1
         ORDER BY created_at DESC, id DESC'
    )->fetchAll();

    json_response(['success' => true, 'data' => $rows]);

} catch (PDOException $e) {
    json_response([
        'success' => false,
        'error'   => 'Veriler alınamadı.',
        'detail'  => $e->getMessage(),
    ], 500);
}
