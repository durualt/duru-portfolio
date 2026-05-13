<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/session.php';
require_admin();

$db = db();
$msg = '';

// --- POST: Ekle veya Güncelle ---
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!csrf_verify($_POST['csrf'] ?? '')) {
        $msg = 'Güvenlik token\'ı geçersiz.';
    } else {
        $id            = (int)($_POST['id'] ?? 0);
        $title         = clean($_POST['title'] ?? '');
        $description   = clean($_POST['description'] ?? '');
        $icon          = clean($_POST['icon'] ?? '💼');
        $tags          = clean($_POST['tags'] ?? '');
        $link_url      = clean($_POST['link_url'] ?? '');
        $is_featured   = !empty($_POST['is_featured']) ? 1 : 0;
        $display_order = (int)($_POST['display_order'] ?? 0);

        // Server-side validation
        if (mb_strlen($title) < 2 || mb_strlen($title) > 150) {
            $msg = 'Başlık 2-150 karakter olmalı.';
        } elseif (mb_strlen($description) < 5) {
            $msg = 'Açıklama en az 5 karakter olmalı.';
        } else {
            if ($id > 0) {
                $stmt = $db->prepare(
                    'UPDATE projects
                     SET title=?, description=?, icon=?, tags=?, link_url=?, is_featured=?, display_order=?
                     WHERE id=?'
                );
                $stmt->execute([$title, $description, $icon, $tags, $link_url, $is_featured, $display_order, $id]);
                $msg = 'Proje güncellendi.';
            } else {
                $stmt = $db->prepare(
                    'INSERT INTO projects (title, description, icon, tags, link_url, is_featured, display_order)
                     VALUES (?, ?, ?, ?, ?, ?, ?)'
                );
                $stmt->execute([$title, $description, $icon, $tags, $link_url, $is_featured, $display_order]);
                $msg = 'Yeni proje eklendi.';
            }
        }
    }
}

// --- GET: Sil ---
if (isset($_GET['delete']) && csrf_verify($_GET['csrf'] ?? '')) {
    $db->prepare('DELETE FROM projects WHERE id = ?')->execute([(int)$_GET['delete']]);
    header('Location: projects.php?msg=deleted');
    exit;
}

// --- Düzenleme için tek proje çek ---
$editing = null;
if (isset($_GET['edit'])) {
    $stmt = $db->prepare('SELECT * FROM projects WHERE id = ?');
    $stmt->execute([(int)$_GET['edit']]);
    $editing = $stmt->fetch();
}
$isNew = isset($_GET['action']) && $_GET['action'] === 'new';

// Tüm projeleri çek
$projects = $db->query(
    'SELECT * FROM projects ORDER BY is_featured DESC, display_order ASC, id ASC'
)->fetchAll();

$token = csrf_token();
?>
<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Projeler — Duru OS Admin</title>
<link rel="icon" type="image/svg+xml" href="../assets/favicon.svg">
<link rel="stylesheet" href="admin.css">
</head>
<body class="admin-body">
    <header class="admin-header">
        <h1>🌸 Duru OS · Admin</h1>
        <nav class="admin-nav">
            <a href="dashboard.php">Dashboard</a>
            <a href="projects.php" class="active">Projeler</a>
            <a href="messages.php">Mesajlar</a>
            <span class="admin-user">👤 <?= htmlspecialchars($_SESSION['admin_username']) ?></span>
            <a href="logout.php" class="logout">Çıkış</a>
        </nav>
    </header>

    <main class="admin-main">
        <?php if ($msg): ?>
            <div class="alert alert-info"><?= htmlspecialchars($msg) ?></div>
        <?php endif; ?>

        <?php if ($editing || $isNew): ?>
            <section class="panel">
                <div class="panel-head">
                    <h2><?= $editing ? 'Projeyi Düzenle' : 'Yeni Proje' ?></h2>
                    <a href="projects.php" class="link">← İptal</a>
                </div>
                <form method="POST" action="projects.php" id="proj-form" novalidate>
                    <input type="hidden" name="csrf" value="<?= htmlspecialchars($token) ?>">
                    <?php if ($editing): ?>
                        <input type="hidden" name="id" value="<?= (int)$editing['id'] ?>">
                    <?php endif; ?>

                    <div class="form-row">
                        <label class="field">
                            <span>Başlık *</span>
                            <input type="text" name="title" required minlength="2" maxlength="150"
                                   value="<?= htmlspecialchars($editing['title'] ?? '') ?>">
                        </label>
                        <label class="field icon-field">
                            <span>İkon (emoji)</span>
                            <input type="text" name="icon" maxlength="10"
                                   value="<?= htmlspecialchars($editing['icon'] ?? '💼') ?>">
                        </label>
                    </div>

                    <label class="field">
                        <span>Açıklama *</span>
                        <textarea name="description" required minlength="5" rows="4"><?= htmlspecialchars($editing['description'] ?? '') ?></textarea>
                    </label>

                    <label class="field">
                        <span>Etiketler (virgülle ayır)</span>
                        <input type="text" name="tags"
                               placeholder="HTML, CSS, PHP"
                               value="<?= htmlspecialchars($editing['tags'] ?? '') ?>">
                    </label>

                    <div class="form-row">
                        <label class="field">
                            <span>Link URL</span>
                            <input type="url" name="link_url"
                                   placeholder="https://..."
                                   value="<?= htmlspecialchars($editing['link_url'] ?? '') ?>">
                        </label>
                        <label class="field order-field">
                            <span>Sıra</span>
                            <input type="number" name="display_order"
                                   value="<?= (int)($editing['display_order'] ?? 0) ?>">
                        </label>
                    </div>

                    <label class="check-row">
                        <input type="checkbox" name="is_featured" value="1"
                               <?= !empty($editing['is_featured']) ? 'checked' : '' ?>>
                        <span>⭐ Öne çıkan proje</span>
                    </label>

                    <div class="form-actions">
                        <button type="submit" class="btn-primary"><?= $editing ? '💾 Güncelle' : '➕ Ekle' ?></button>
                        <a href="projects.php" class="btn-secondary">İptal</a>
                    </div>
                </form>
            </section>
        <?php else: ?>
            <div class="page-actions">
                <h2>Projeler (<?= count($projects) ?>)</h2>
                <a href="projects.php?action=new" class="btn-primary">➕ Yeni Proje</a>
            </div>

            <section class="panel">
                <?php if (empty($projects)): ?>
                    <p class="empty">Henüz proje yok.</p>
                <?php else: ?>
                    <!-- HTML TABLE — gereksinim -->
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>İkon</th>
                                <th>Başlık</th>
                                <th>Etiketler</th>
                                <th>Öne Çıkan</th>
                                <th>Sıra</th>
                                <th>İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                        <?php foreach ($projects as $p): ?>
                            <tr>
                                <td style="font-size:24px"><?= htmlspecialchars($p['icon']) ?></td>
                                <td><strong><?= htmlspecialchars($p['title']) ?></strong></td>
                                <td><?= htmlspecialchars($p['tags']) ?></td>
                                <td><?= $p['is_featured'] ? '⭐' : '' ?></td>
                                <td><?= (int)$p['display_order'] ?></td>
                                <td>
                                    <a href="projects.php?edit=<?= $p['id'] ?>">Düzenle</a> ·
                                    <a href="projects.php?delete=<?= $p['id'] ?>&csrf=<?= $token ?>"
                                       class="link-danger"
                                       onclick="return confirm('Bu projeyi silmek istediğine emin misin?')">Sil</a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                        </tbody>
                    </table>
                <?php endif; ?>
            </section>
        <?php endif; ?>
    </main>

    <script>
        // Client-side validation
        const f = document.getElementById('proj-form');
        f?.addEventListener('submit', (e) => {
            const t = f.title.value.trim();
            const d = f.description.value.trim();
            if (t.length < 2) { e.preventDefault(); alert('Başlık en az 2 karakter olmalı.'); return; }
            if (d.length < 5) { e.preventDefault(); alert('Açıklama en az 5 karakter olmalı.'); return; }
        });
    </script>
</body>
</html>
