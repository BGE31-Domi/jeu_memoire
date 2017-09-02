<?php

session_start();
$erreur = "";
if (!empty($_POST["pseudo"])) {
    if (!empty($_POST["mdp"])) {
        define('DSN', 'mysql:host=127.0.0.1;dbname=memo_graph');
        define('USER', 'root');
        define('MDP', 'root');

// Création d'un objet PDO et connexion
        $connDB = new PDO(DSN, USER, MDP);

        $requete = "SELECT * FROM users WHERE user_pseudo='" . $_POST["pseudo"] . "'";

// Test d'existence de l'email
        $resultat = $connDB->query($requete);
        $donnees = $resultat->fetchAll(PDO ::FETCH_ASSOC);


        if (count($donnees) > 0) {


            if ($_POST["pseudo"] == $donnees[0]['user_pseudo']) {
                if ($_POST["mdp"] == $donnees[0]['user_mdp']) {
                    $_SESSION["id"] = $donnees[0]['user_pseudo'];
                    $_SESSION["email"] = $donnees[0]['user_email'];
                    $_SESSION["number"] = $donnees[0]['user_id'];
                    header("Location:profil.php");
                } else {
                    $erreur .= "<br>Le mot de passe est incorrect.";
                }
            }
        } else {
            $erreur .= "<br>Le pseudo n'existe pas.";
        }
    } else {
        $erreur .= "Veuillez saisir un mot de passe (8 caractères maximum, chiffres et lettres).";
    }
} else {
    $erreur .= "<br>Veuillez saisir votre pseudo.";
}
if ($erreur) {
    echo $erreur;
}
?>
