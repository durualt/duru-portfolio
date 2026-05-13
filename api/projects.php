<?php
/**
 * ==========================================================
 * API — PROJELERİ LİSTELE
 * ==========================================================
 * Endpoint: GET /api/projects.php
 * Yanıt: { success: true, data: [...] }
 * ==========================================================
 */

require_once __DIR__ . '/../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_response(['success' => false, 'error' => 'Sadece GET kabul edilir.'], 405);
}

try {
    $db = db();
} catch (PDOException $e) {
    json_response([
        'success' => false,
        'error'   => 'Veritabanına bağlanılamadı.',
        'detail'  => $e->getMessage()
    ], 500);
}

try {
    $rows = $db->query(
        'SELECT id, title, description, icon, tags, link_url, is_featured, display_order, created_at
         FROM projects
         ORDER BY is_featured DESC, display_order ASC, id ASC'
    )->fetchAll();

    // Tag string'ini diziye çevir
    foreach ($rows as &$r) {
        $r['tags'] = $r['tags']
            ? array_map('trim', explode(',', $r['tags']))
            : [];
        $r['is_featured'] = (bool) $r['is_featured'];
    }

    json_response(['success' => true, 'data' => $rows]);

} catch (PDOException $e) {
    json_response([
        'success' => false,
        'error'   => 'Veriler alınamadı.',
        'detail'  => $e->getMessage(),
    ], 500);
}
