<?php

session_start();
$erreur = "";
$modify = "";

define('DSN', 'mysql:host=127.0.0.1;dbname=memo_graph');
define('USER', 'root');
define('MDP', 'root');

// Création d'un objet PDO et connexion
$connDB = new PDO(DSN, USER, MDP);


if (!empty($_POST["pseudo_mod"])) {

    if (strlen($_POST['pseudo_mod']) <= 40) {

        if (preg_match("/[A-Za-z0-9]+/", $_POST['pseudo_mod'])) {
            $requete = "SELECT user_pseudo FROM users WHERE user_pseudo='" . $_POST["pseudo_mod"] . "'";
            $resultat = $connDB->query($requete);
            $donnees = $resultat->fetchAll(PDO ::FETCH_ASSOC);
            if (count($donnees) === 0) {
                $requete = "UPDATE users SET user_pseudo = '" . $_POST["pseudo_mod"] . "' WHERE user_email='" . $_SESSION['email'] . "'";
                $resultat = $connDB->query($requete);
                $modify = "Votre pseudo a été modifié.";
            } else {
                $erreur .= "Ce pseudo existe déjà. Veuillez en saisir un autre.";
            }
        } else {
            $erreur .= "Le pseudo ne doit contenir que des lettress et des chiffres";
        }
    } else {
        $erreur .= "Le pseudo ne doit pas dépasser 40 caractères.";
    }
} else {
    $modify .= "<br>Vous n'avez pas modifié votre pseudo.";
}




if ($_FILES['fichier']!==Null) {
    // TEST de téléchargement
    if ($_FILES['fichier']['error'] == 0) {
        // TEST de poids
        if ($_FILES['fichier']['size'] < 500000) {
            // TEST de l'extension
            if (($_FILES['fichier']['type'] == 'image/jpg') || ($_FILES['fichier']['type'] == 'image/jpeg')) {
                // On déplace l'image du dossier temporaire vers le dossier final de notre choix
                move_uploaded_file($_FILES['fichier']['tmp_name'], 'img/photo' . $_SESSION["number"] . '.jpg');
                $modify .= "<br>Votre photo de profil a bien été modifiée.";
                unset($_FILES['fichier]']);
            } else {
                $erreur .= "<br>Mauvais type de fichier";
            }
        } else {
            $erreur .= "<br>Fichier trop gros";
        }
    }
} else {
    $modify .= "<br>Vous n'avez pas modifié votre photo de profil.";
}




if (!empty($_POST["new_pwd"]) && !empty($_POST["chk_new_pwd"])) {
    if (preg_match("/[A-Za-z0-9]+/", $_POST['new_pwd'])) {
        if (strlen($_POST['new_pwd']) <= 40) {
            if ($_POST["chk_new_pwd"] === $_POST["new_pwd"]) {
//                $erreur .= "Le champ 'confirmation' doit être identique au précédent.<br>";
                if (!empty($_POST["chk_old_pwd"])) {
                    $requete = "SELECT * FROM users WHERE user_id='" . $_SESSION["number"] . "'";
                    $resultat = $connDB->query($requete);
                    $donnees = $resultat->fetchAll(PDO ::FETCH_ASSOC);
                    if ($_POST["chk_old_pwd"] === $donnees[0]['user_mdp']) {

                        $modify .= "<br>Votre nouveau mot de passe a été enregistré.";
                        $requete2 = "UPDATE users SET user_mdp = '" . $_POST["new_pwd"] . "' WHERE user_email='" . $_SESSION['email'] . "'";
                        $resultat2 = $connDB->query($requete2);
                    } else {
                        $erreur = "Votre ancien mot de passe est incorrect.";
                    }
                } else {
                    $erreur .= "<br>Vous devez entrer votre ancien mot de passe.";
                }
            } else {
                $erreur .= "<br>Le champ [confirmation] doit être identique au précédent.";
            }
        }
    } else {
        $erreur .= "<br>Le mot de passe ne doit contenir que des lettres et des choffres.";
    }
} else {
    $modify .= "<br>Vous n'avez pas modifié votre mot de passe.";
}




if ($erreur) {
    echo $erreur;
    echo "<p>Revenir au <a href='profil.php'>profil</a></p>";
} else {
    echo $modify;
    echo "<p>Revenir au <a href='profil.php'>profil</a></p>";
}
?>