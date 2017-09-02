
<?php
session_start();


if (!empty($_SESSION["id"])) {


    define('DSN', 'mysql:host=127.0.0.1;dbname=memo_graph');
    define('USER', 'root');
    define('MDP', 'root');

// Création d'un objet PDO et connexion
    $connDB = new PDO(DSN, USER, MDP);
    
//Préparation des requêtes :
    $requete = "SELECT user_pseudo, user_email, user_mdp, user_id FROM users WHERE user_email='" . $_SESSION['email'] . "'";
    $resultat = $connDB->query($requete);
    $donnees = $resultat->fetchAll(PDO ::FETCH_ASSOC);
   
} else {
    header('Location: connex.php');
}
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Profil utilisateur</title>
        <link href="css/profil.css" rel="stylesheet" type="text/css"/>

    </head>
    <body>
         <nav><?php include("inc_menu.php") ?></nav>
        <form action="traitement_profil.php" method="post" enctype="multipart/form-data">

            <table>
                <tr>
                    <td></td>
                    <td><img id="profil" <?php echo " src='img/photo" . $donnees[0]['user_id'] . ".jpg'" ?>></td> 
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td><label>
                            <div class='bouton'>Votre fichier</div>
                            <input type='file' name='fichier' value=''>
                        </label></td> 
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <label>Pseudo</label></td>
                    <td><label name="pseudo"><?php echo $donnees[0]['user_pseudo']; ?></label>
                    </td>
                    <td id="pseudo">
                        <input type="button" name="mod1" value="Modifier" onclick="modify();">
                    </td>

                </tr>
                <tr>
                    <td>
                        <label>Adresse-mail</label></td>
                    <td><label name="mail" ><?php echo $donnees[0]['user_email']; ?></label>

                    </td>
                    <td>
                        <label>Vous ne pouvez pas modifier votre adresse électronique.</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Mot de passe</label></td>
                    <td><label>Secret</label>
                    </td>
                    <td>
                        <input type="button" value="modifier" name= "mod2" onclick="modify2()">
                    </td>

                </tr>
                <tr class="mdp">
                    <td>
                        <label>Ancien mot de passe</label></td>
                    <td>
                        <input type="password" name="chk_old_pwd">
                        <a role="button" onclick="view();"><img class="eye" src="img/eye.png" alt=""/></a>
                    </td>
                    <td>
                    </td>

                </tr>
                <tr class="mdp2">
                    <td>
                        <label>Nouveau mot de passe</label></td>
                    <td>
                        <input type="password" name="new_pwd">
                        <a role="button" onclick="view_2();"><img class="eye" src="img/eye.png" alt=""/></a>
                    </td>
                    <td>
                    </td>

                </tr>
                <tr class="mdp3">
                    <td>
                        <label>Confirmer nouveau mot de passe</label></td>
                    <td>
                        <input type="password" name="chk_new_pwd">
                        <a role="button" onclick="view_3();"><img class="eye" src="img/eye.png" alt=""/></a>
                    </td>
                    <td>
                    </td>

                </tr>
                <tr>
                    <td></td>

                    <td><input class="valid" type="submit" ></td>
                    <td></td>
                </tr>

            </table>
        </form>
        <script src="js/modif_prof.js" type="text/javascript"></script>
    </body>
</html>
