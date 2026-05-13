<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/session.php';
require_admin();  // Giriş yapılmamışsa login'e yönlendirir

$db = db();
$stats = [
    'projects' => (int) $db->query("SELECT COUNT(*) FROM projects")->fetchColumn(),
    'blogs'    => (int) $db->query("SELECT COUNT(*) FROM blog_posts")->fetchColumn(),
    'messages' => (int) $db->query("SELECT COUNT(*) FROM messages")->fetchColumn(),
    'unread'   => (int) $db->query("SELECT COUNT(*) FROM messages WHERE read_status = 0")->fetchColumn(),
];

// Son 5 mesajı listele
$recent = $db->query(
    'SELECT id, name, email, subject, read_status, created_at
     FROM messages
     ORDER BY created_at DESC
     LIMIT 5'
)->fetchAll();
?>
<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dashboard — Duru OS Admin</title>
<link rel="icon" type="image/svg+xml" href="../assets/favicon.svg">
<link rel="stylesheet" href="admin.css">
</head>
<body class="admin-body">
    <header class="admin-header">
        <h1>🌸 Duru OS · Admin</h1>
        <nav class="admin-nav">
            <a href="dashboard.php" class="active">Dashboard</a>
            <a href="projects.php">Projeler</a>
            <a href="messages.php">Mesajlar
                <?php if ($stats['unread'] > 0): ?>
                    <span class="badge"><?= $stats['unread'] ?></span>
                <?php endif; ?>
            </a>
            <span class="admin-user">👤 <?= htmlspecialchars($_SESSION['admin_username']) ?></span>
            <a href="logout.php" class="logout">Çıkış</a>
        </nav>
    </header>

    <main class="admin-main">
        <section class="stat-grid">
            <div class="stat-card">
                <div class="stat-icon">💼</div>
                <div class="stat-num"><?= $stats['projects'] ?></div>
                <div class="stat-label">Proje</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">📝</div>
                <div class="stat-num"><?= $stats['blogs'] ?></div>
                <div class="stat-label">Blog yazısı</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">✉️</div>
                <div class="stat-num"><?= $stats['messages'] ?></div>
                <div class="stat-label">Toplam mesaj</div>
            </div>
            <div class="stat-card highlight">
                <div class="stat-icon">🔔</div>
                <div class="stat-num"><?= $stats['unread'] ?></div>
                <div class="stat-label">Okunmamış</div>
            </div>
        </section>

        <section class="panel">
            <div class="panel-head">
                <h2>Son Mesajlar</h2>
                <a href="messages.php" class="link">Tümünü gör →</a>
            </div>

            <?php if (empty($recent)): ?>
                <p class="empty">Henüz mesaj yok.</p>
            <?php else: ?>
                <!-- HTML TABLE — proje gereksinimi -->
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Durum</th>
                            <th>İsim</th>
                            <th>E-posta</th>
                            <th>Konu</th>
                            <th>Tarih</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($recent as $m): ?>
                        <tr class="<?= $m['read_status'] ? '' : 'unread' ?>">
                            <td><?= $m['read_status'] ? '✓' : '🔵' ?></td>
                            <td><?= htmlspecialchars($m['name']) ?></td>
                            <td><?= htmlspecialchars($m['email']) ?></td>
                            <td><?= htmlspecialchars($m['subject']) ?></td>
                            <td><?= date('d.m.Y H:i', strtotime($m['created_at'])) ?></td>
                            <td><a href="messages.php?id=<?= $m['id'] ?>">Aç</a></td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </section>

        <section class="panel">
            <div class="panel-head">
                <h2>Hızlı İşlemler</h2>
            </div>
            <div class="quick-actions">
                <a href="projects.php?action=new" class="action-btn">➕ Yeni proje ekle</a>
                <a href="../index.html" class="action-btn">🌐 Siteyi görüntüle</a>
            </div>
        </section>
    </main>
</body>
</html>
