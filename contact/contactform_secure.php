<?php

// Show all errors (for educational purposes)
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);

// Constanten (connectie-instellingen databank)
define('DB_HOST', 'localhost');
define('DB_USER', 'co-worker1');
define('DB_PASS', '!nE08s3k1');
define('DB_NAME', 'co-working');

date_default_timezone_set('Europe/Brussels');

// Verbinding maken met de databank
try {
    $db = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4', DB_USER, DB_PASS);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Verbindingsfout: ' . $e->getMessage();
    exit;
}

$name = isset($_POST['name']) ? (string)$_POST['name'] : '';
$message = isset($_POST['message']) ? (string)$_POST['message'] : '';
$email = isset($_POST['email']) ? (string)$_POST['email'] : '';
$msgName = '';
$msgMessage = '';

// form is sent: perform formchecking!
if (isset($_POST['btnSubmit'])) {

    //FORM IN DATA STEKEN
    if(isset($_POST['findme']) && is_array($_POST['findme'])) {
        $datas = $_POST['findme'];
        $allData = implode(",", $datas);
    } else {
        $datas = array();
        $allData = '';
    }


    $allOk = true;

    // name not empty
    if (trim($name) === '') {
        $msgName = 'Gelieve een naam in te voeren';
        $allOk = false;
    }

    if (trim($message) === '') {
        $msgMessage = 'Gelieve een boodschap in te voeren';
        $allOk = false;
    }

    if (trim($email) === '') {
        $msgMessage = 'Gelieve een boodschap in te voeren';
        $allOk = false;
    }

    // end of form check. If $allOk still is true, then the form was sent in correctly
    if ($allOk) {
        // build & execute prepared statement
        $stmt = $db->prepare('INSERT INTO messages (sender, email, message, findme, added_on) VALUES (?, ?, ?, ?, ?)');
        $stmt->execute(array($name, $email, $message, $allData, (new DateTime())->format('Y-m-d H:i:s')));

        // the query succeeded, redirect to this very same page
        if ($db->lastInsertId() !== 0) {
            header('Location: formchecking_thanks.php?name=' . urlencode($name));
            exit();
        } // the query failed
        else {
            echo 'Databankfout.';
            exit;
        }

    }

}

?><!DOCTYPE html>
<html lang="nl">
<head>
    <title>Contact me!</title>
    <meta charset="UTF-8"/>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@500&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates&display=swap" rel="stylesheet">
    <link href="https://unpkg.com/@csstools/normalize.css" rel="stylesheet"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />

</head>
<body>
<header class="container">
    <a href="./"><img src="../img/logo.png" alt="Logo"></a>
    <nav>
        <ul>
            <li><a href="../">Home</a></li>
            <li><a href="../spelregels">Spelregels</a></li>
            <li><a href="./">Contact</a></li>

        </ul>
    </nav>
</header>

<main class="container-contact">
    <form class="glass" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
        <h1 class="middle-form">Contact me!</h1>
        <p class="message">You must fill in all the forms, unless quoted otherwise!</p>

        <div>
            <label for="name">Your name </label>
            <input type="text" id="name" name="name" value="<?php echo htmlentities($name); ?>" class="input-text"/>
            <span class="message error"><?php echo $msgName; ?></span>
        </div>

        <div>
            <label for="email">E-mail</label>
            <input type="email" id="email" name="email" value="<?php echo htmlentities($email); ?>" class="input-email"/>
            <span class="message error"><?php echo $msgName; ?></span>
        </div>

        <div>
            <label for="message">Your message</label>
            <textarea name="message" id="message" rows="5" cols="40"><?php echo htmlentities($message); ?></textarea>
            <span class="message error"><?php echo $msgMessage; ?></span>
        </div>

        <fieldset class="box-around-checkbox">
            <legend> How did you find me?</legend>
            <div class="next-to-eachother">
                <label for="friends">friends</label>
                <input type="checkbox" name="findme[]" id="friends" value="Friends"/>
            </div>
            <div class="next-to-eachother">
                <label for="socialMedia">Social media</label>
                <input type="checkbox" name="findme[]" id="socialMedia" value="Social media"/>
            </div>
            <div class="next-to-eachother">
                <label for="youtube">Youtube</label>
                <input type="checkbox" name="findme[]" id="youtube" value="Youtube"/>
            </div>
            <div class="next-to-eachother">
                <label for="other">Other</label>
                <input type="checkbox" name="findme[]" id="other" value="Other"/>
            </div>
        </fieldset>

        <input class="introductionlink, middle-form" type="submit" id="btnSubmit" name="btnSubmit" value="Verstuur"/>
    </form>
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
</html>
