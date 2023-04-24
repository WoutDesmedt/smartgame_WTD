<?php

// Constanten (connectie-instellingen databank)
define('DB_HOST', 'localhost');
define('DB_USER', 'co-worker1');
define('DB_PASS', '!nE08s3k1');
define('DB_NAME', 'co-working');


date_default_timezone_set('Europe/Brussels');

// Verbinding maken met de databank
try {
    $db = new PDO('mysql:host=' . DB_HOST .';dbname=' . DB_NAME . ';charset=utf8mb4', DB_USER, DB_PASS);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Verbindingsfout: ' .  $e->getMessage();
    exit;
}

// Opvragen van alle taken uit de tabel tasks
$stmt = $db->prepare('SELECT * FROM messages ORDER BY added_on DESC');
$stmt->execute();
$items = $stmt->fetchAll(PDO::FETCH_ASSOC);


?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@500&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates&display=swap" rel="stylesheet">
    <link href="https://unpkg.com/@csstools/normalize.css" rel="stylesheet"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <title>My Message</title>
</head>
<body>
<header class="container">
    <a href="./"><img src="../img/logo.png" alt="Logo"></a>
    <nav>
        <ul>
            <li><a href="../">Home</a></li>
            <li><a href="../social">Social</a></li>
            <li><a href="../#continents">Continents</a></li>
            <li><a href="#bottom">Translate page</a></li>
            <li><a href="../contact/contactform_secure.php">Contact</a></li>
        </ul>
    </nav>
</header>
<main class="center listofmessages">
    <?php if (sizeof($items) > 0) { ?>
        <ul class="glass">
            <?php foreach ($items as $item) { ?>
                <li class="tabel">Name: <?php htmlentities($item['sender']); ?> , E-Mail: <?php echo htmlentities($item['email']); ?> , Message: <?php echo htmlentities($item['message']); ?> , How did you find me: <?php echo htmlentities($item['findme']); ?> Time: (<?php echo (new Datetime($item['added_on']))->format('d-m-Y H:i:s'); ?>)</li> <?php } ?>
        </ul>
        <?php
    } else {
        echo '<p>No messages yet.</p>' . PHP_EOL;
    }
    ?>
</main>
<footer class="footer">
    <div class="social">
        <a href="https://instagram.com/" aria-label="instagram-link"><i class="fa-brands fa-instagram"></i></a>
        <a href="https://linkedin.com/" aria-label="linkedin-link"><i class="fab fa-linkedin-in"></i></a>
        <a href="https://twitter.com/" aria-label="twitter-link"><i class="fab fa-twitter"></i></a>
        <a href="https://facebook.com/" aria-label="facebook-link"><i class="fab fa-facebook-f"></i></a>
    </div>
    <nav>
        <ul class="list">
            <li><a href="./" title="Goes to homepage">Home</a></li>
            <li><a href="./#continents" title="continents">Continents</a></li>
            <li><a href="./social" title="social">Social</a></li>
            <li><a href="./template-blogpagina" title="Blog">Blog</a></li>
            <li><a href="./contact/contactform_secure.php" title="Contact">Contact</a></li>
        </ul>
    </nav>
    <p class="copyright">The Devs @ 2022</p>

    <div id="bottom"></div>
    <div id="google_translate_element"></div>
    <script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit">
    </script>
    <script>
        function googleTranslateElementInit() {
            new google.translate.TranslateElement(
                { pageLanguage: 'en' },
                'google_translate_element'
            );
        }
    </script>
</footer>
</body>