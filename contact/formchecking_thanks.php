<?php

$name = isset($_GET['name']) ? $_GET['name'] : false;
$age = isset($_GET['age']) ? $_GET['age'] : false;

?><!DOCTYPE html>
<html lang="en">
<head>
    <title>Thanks!</title>
    <meta charset="UTF-8" />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@500&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates&display=swap" rel="stylesheet">
    <link href="https://unpkg.com/@csstools/normalize.css" rel="stylesheet"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="../css/common.css" />
    <link rel="stylesheet" href="../css/contact_thanks.css" />
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
<div class="thanks-form">
    <?php

    // Name sent in
    if ($name) {
        echo '<p>Thank you ' . htmlentities($name).  ' for filling in this contact form, we will get back to you as soon as 
                 possible</p>';
    }

    /*
    // Age sent in
    else if ($age) {
        echo '<p>Thank you, ' . htmlentities($age). ' year old stranger</p>';
    }

    // Nothing sent in
    else {
        echo '<p>Thank you, stranger</p>';
    }
    */

    ?>
    <i class="fa-regular fa-thumbs-up"></i>

    <!-- <div id="debug">

        <?php

    /**
     * Helper Functions
     * ========================
     */

    /**
     * Dumps a variable
     * @param mixed $var
     * @return void
     */
    /*
    function dump($var) {
        echo '<pre>';
        var_dump($var);
        echo '</pre>';
    }
    */

    /**
     * Main Program Code
     * ========================
     */
    /*
    // dump $_GET
    dump($_GET);
    */
    ?>
</div>-->


</div>
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
