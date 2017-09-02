
<?php

$erreur = "";
$message ="";
if (isset($_POST['pseudo']) && $_POST['pseudo'] != "") {

    $pseudo = $_POST['pseudo'];
} else {

    $erreur = "Veuillez saisir un pseudo valide.<br>";
}

if (isset($_POST['mdp']) && $_POST['mdp'] != "" && preg_match("/[A-Za-z0-9]+/", $_POST['mdp']) && strlen($_POST['mdp']) >= 8) {
    $mdp = $_POST['mdp'];
} else {

    $erreur .= "Veuillez saisir un mot de passe valide.<br>";
}


if (isset($_POST['mdpc']) && $_POST['mdpc'] === $_POST['mdp'] && $_POST['mdpc'] !== 0) {
    $mdpc = $_POST['mdpc'];
} else {

    $erreur .= "Le champ 'confirmation' doit être identique au précédent.<br>";
}



if (isset($_POST['email']) && ($_POST['email']) && (filter_var($_POST['email'], FILTER_VALIDATE_EMAIL))) {
    $email = $_POST['email'];
} else {
    $erreur .= "Veuillez saisir une adresse électronique valide.<br>";
}


if (!$erreur) {
    define('DSN', 'mysql:host=127.0.0.1;dbname=memo_graph');
    define('USER', 'root');
    define('MDP', 'root');

// Création d'un objet PDO et connexion
    $connDB = new PDO(DSN, USER, MDP);

//Préparation des requete
    $requete = "SELECT user_pseudo FROM users WHERE user_pseudo='" . $pseudo . "'";

// Test d'existence de l'email
    $resultat = $connDB->query($requete);
    $donnees = $resultat->fetchAll(PDO ::FETCH_ASSOC);
    
    $requete2 = "SELECT user_email FROM users WHERE user_email='" . $email . "'";

// Test d'existence de l'email
    $resultat2 = $connDB->query($requete2);
    $donnees2 = $resultat2->fetchAll(PDO ::FETCH_ASSOC);

    
    if (count($donnees) == 0 && count($donnees2) == 0) {

        $requete = "INSERT INTO users (user_pseudo, user_mdp, user_email) VALUES ('" . $pseudo . "', '" . $mdp . "', '" . $email . "')";

        echo $requete;

        $resultat = $connDB->exec($requete);

        echo "Inscription réussie. Vous pouvez vous connecter <a href='connex.php'>ici/a>.";
        
       
    }
    else{
        if(count($donnees) == 0){
            $message = "L'adresse éléectronique que vous avez saisie est déjà enregistrée.";
        }
        if(count($donnees) == 1){
            $message .= "Le pseudo que vous avez saisi est déjà enregistré.";
        }
        $message .= "Vous pouvez vous connecter <a href='connex.php'>ici</a> ou revenir à la page <a href='form_insc.php'>'inscription'</a>.";
        echo $message;
    }
}else{
    echo $erreur;
}



