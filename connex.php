<?php
session_start();
?>

<!DOCTYPE html>

<html>
    <head>
        <meta charset="utf-8">
        <script type="text/javascript" src="js/verif_connex.js"></script>
        <link rel="stylesheet" type="text/css" href="css/profil.css">
        <title>
            Connexion</title>
    </head>
    <body>
        <main>
            <h1>Connexion</h1>
            <nav><?php include("inc_menu.php") ?></nav>
            <form method="POST" action="identification.php">
                
                <input type="text" name = "pseudo" value="" placeholder="Pseudo">
                <input type="password" name ="mdp" value="" placeholder="Mot de passe">
                <input type ="button" value = "identification">
                <div id="error"></div>
            </form>
            
        </main>
    </body>
</html>
