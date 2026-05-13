<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/session.php';

// Zaten giriş yapılmışsa dashboard'a yönlendir
if (!empty($_SESSION['admin_id'])) {
    header('Location: dashboard.php');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = clean($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';
    $remember = !empty($_POST['remember']);

    if (!csrf_verify($_POST['csrf'] ?? '')) {
        $error = 'Güvenlik token\'ı geçersiz. Sayfayı yenileyip tekrar dene.';
    } elseif (empty($username) || empty($password)) {
        $error = 'Kullanıcı adı ve şifre zorunlu.';
    } else {
        try {
            $db = db();
            $stmt = $db->prepare('SELECT id, username, password_hash FROM admin_users WHERE username = ?');
            $stmt->execute([$username]);
            $user = $stmt->fetch();

            if ($user && password_verify($password, $user['password_hash'])) {
                login_admin((int)$user['id'], $user['username'], $remember);
                // last_login güncelle
                $db->prepare('UPDATE admin_users SET last_login = NOW() WHERE id = ?')
                   ->execute([$user['id']]);
                header('Location: dashboard.php');
                exit;
            } else {
                $error = 'Kullanıcı adı veya şifre yanlış.';
                sleep(1); // brute force yavaşlatma
            }
        } catch (PDOException $e) {
            $error = 'Sunucu hatası. Daha sonra tekrar dene.';
        }
    }
}

$token = csrf_token();
?>
<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin Giriş — Duru OS</title>
<link rel="icon" type="image/svg+xml" href="../assets/favicon.svg">
<link rel="stylesheet" href="admin.css">
</head>
<body class="login-body">
    <main class="login-card">
        <div class="login-logo">🌸</div>
        <h1>Duru OS · Admin</h1>
        <p class="login-sub">Yönetici Girişi</p>

        <?php if ($error): ?>
            <div class="alert alert-error"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>

        <form method="POST" action="login.php" id="login-form" novalidate>
            <input type="hidden" name="csrf" value="<?= htmlspecialchars($token) ?>">

            <label class="field">
                <span>Kullanıcı adı</span>
                <input type="text" name="username" required autocomplete="username"
                       value="<?= htmlspecialchars($_POST['username'] ?? '') ?>"
                       autofocus minlength="2" maxlength="50">
            </label>

            <label class="field">
                <span>Şifre</span>
                <input type="password" name="password" required autocomplete="current-password"
                       minlength="6">
            </label>

            <label class="check-row">
                <input type="checkbox" name="remember" value="1">
                <span>14 gün beni hatırla</span>
            </label>

            <button type="submit" class="btn-primary">Giriş yap</button>
        </form>

        <p class="login-back"><a href="../index.html">← Ana siteye dön</a></p>
    </main>

    <script>
        // Client-side validation
        document.getElementById('login-form').addEventListener('submit', (e) => {
            const username = e.target.username.value.trim();
            const password = e.target.password.value;
            if (username.length < 2) {
                e.preventDefault();
                alert('Kullanıcı adı en az 2 karakter olmalı.');
                return;
            }
            if (password.length < 6) {
                e.preventDefault();
                alert('Şifre en az 6 karakter olmalı.');
                return;
            }
        });
    </script>
</body>
</html>
