# Shapular
Shape arranging game called Shapular.

In order to get the game working, database must be set up (info on that in the info directory) and a file called sqlconf.php containing the following needs to be added to the project directory:

    <?php
        define("DB_ADDRESS", "address");
        define("DB_USER", "username");
        define("DB_PASS", "password");
        define("DB_NAME", "database");
    ?>
