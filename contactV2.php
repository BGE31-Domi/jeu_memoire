<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Nous contacter</title>
    <link rel="stylesheet" href="css/contactV2_css.css">
    <link rel="stylesheet" href="css/liens_retour_css.css">
    <script type="text/javascript" src="js/contactV2_js.js">

    </script>
  </head>
  <body>

    <form action="traitement_contactV2.php" method="post">
        <h1>Ecrivez-nous ! </h1>


        <input type='text' name= "nom" placeholder="Nom/Pseudo - obligatoire -" value="<?php
        if(isset($_post['nom'])){
          echo $_post['nom'];
        }else{ echo ""} ?>">

        <input type='text' name= "prenom" placeholder="Prénom" value="<?php if(isset($_post['prenom'])){
          echo $_post['prenom'];
        } ?>">

        <input type='email' name= "mail" placeholder="Email - obligatoire -" value="<?php if(isset($_post['mail'])){
          echo $_post['mail'];
        } ?>">

        <textarea name="contenu" placeholder="Entrez ici votre message. - obligatoire - (500 caractère maxi)"><?php if(isset($_post['message'])){echo $_post['message'];} ?></textarea>
        <input type="button" value="ENVOYER">
        <p id=erreur></p>

        <a href="solo.html">Retour vers page solo</a>
    </form>

  </body>
</html>
