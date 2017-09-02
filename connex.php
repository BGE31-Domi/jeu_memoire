<?php
session_start();
?>

<!DOCTYPE html>

<html>
    <head>
        <meta charset="utf-8">
        <script type="text/javascript" src="js/verif_connex.js"></script>
        <link rel="stylesheet" type="text/css" href="css/profil.css">
        <link rel="stylesheet" href="css/liens_retour_css.css">
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

           <a href="form_insc.php">Pas encore inscrit ?</a>
           <a href="solo.html">Retour à l'acceuil (mène à la page solo pour l'instant)</a>

        </main>
    </body>
</html>
