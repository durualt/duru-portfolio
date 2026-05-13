<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/session.php';
require_admin();

$db = db();

// Sil
if (isset($_GET['delete']) && csrf_verify($_GET['csrf'] ?? '')) {
    $db->prepare('DELETE FROM messages WHERE id = ?')->execute([(int)$_GET['delete']]);
    header('Location: messages.php');
    exit;
}

// Okundu olarak işaretle (tek mesaj görüntülenirken)
$selected = null;
if (isset($_GET['id'])) {
    $stmt = $db->prepare('SELECT * FROM messages WHERE id = ?');
    $stmt->execute([(int)$_GET['id']]);
    $selected = $stmt->fetch();
    if ($selected && !$selected['read_status']) {
        $db->prepare('UPDATE messages SET read_status = 1 WHERE id = ?')
           ->execute([(int)$_GET['id']]);
        $selected['read_status'] = 1;
    }
}

// Tüm mesajları çek
$messages = $db->query(
    'SELECT id, name, email, subject, read_status, created_at
     FROM messages
     ORDER BY created_at DESC'
)->fetchAll();

$token = csrf_token();
?>
<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mesajlar — Duru OS Admin</title>
<link rel="icon" type="image/svg+xml" href="../assets/favicon.svg">
<link rel="stylesheet" href="admin.css">
</head>
<body class="admin-body">
    <header class="admin-header">
        <h1>🌸 Duru OS · Admin</h1>
        <nav class="admin-nav">
            <a href="dashboard.php">Dashboard</a>
            <a href="projects.php">Projeler</a>
            <a href="messages.php" class="active">Mesajlar</a>
            <span class="admin-user">👤 <?= htmlspecialchars($_SESSION['admin_username']) ?></span>
            <a href="logout.php" class="logout">Çıkış</a>
        </nav>
    </header>

    <main class="admin-main">
        <h2>Gelen Mesajlar (<?= count($messages) ?>)</h2>

        <?php if ($selected): ?>
            <section class="panel message-view">
                <div class="panel-head">
                    <h3><?= htmlspecialchars($selected['subject']) ?></h3>
                    <a href="messages.php" class="link">← Listeye dön</a>
                </div>
                <div class="message-meta">
                    <strong><?= htmlspecialchars($selected['name']) ?></strong>
                    &lt;<?= htmlspecialchars($selected['email']) ?>&gt; ·
                    <?= date('d.m.Y H:i', strtotime($selected['created_at'])) ?>
                </div>
                <div class="message-body">
                    <?= nl2br(htmlspecialchars($selected['body'])) ?>
                </div>
                <div class="message-actions">
                    <a href="mailto:<?= htmlspecialchars($selected['email']) ?>?subject=Re: <?= rawurlencode($selected['subject']) ?>"
                       class="btn-secondary">↩ Yanıtla</a>
                    <a href="messages.php?delete=<?= $selected['id'] ?>&csrf=<?= $token ?>"
                       class="btn-danger"
                       onclick="return confirm('Bu mesajı silmek istediğine emin misin?')">🗑 Sil</a>
                </div>
            </section>
        <?php endif; ?>

        <section class="panel">
            <?php if (empty($messages)): ?>
                <p class="empty">Henüz mesaj yok.</p>
            <?php else: ?>
                <!-- HTML TABLE — gereksinim -->
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Durum</th>
                            <th>İsim</th>
                            <th>E-posta</th>
                            <th>Konu</th>
                            <th>Tarih</th>
                            <th>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($messages as $m): ?>
                        <tr class="<?= $m['read_status'] ? '' : 'unread' ?>">
                            <td><?= $m['read_status'] ? '✓' : '🔵' ?></td>
                            <td><?= htmlspecialchars($m['name']) ?></td>
                            <td><?= htmlspecialchars($m['email']) ?></td>
                            <td><?= htmlspecialchars($m['subject']) ?></td>
                            <td><?= date('d.m.Y H:i', strtotime($m['created_at'])) ?></td>
                            <td>
                                <a href="messages.php?id=<?= $m['id'] ?>">Aç</a> ·
                                <a href="messages.php?delete=<?= $m['id'] ?>&csrf=<?= $token ?>"
                                   class="link-danger"
                                   onclick="return confirm('Silinsin mi?')">Sil</a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </section>
    </main>
</body>
</html>
