<?php
require_once __DIR__ . '/../config/session.php';
logout_admin();
header('Location: login.php');
exit;
