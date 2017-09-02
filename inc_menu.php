<?php
//Il ne faut pas mettre de session_start dans les fichiers include. En revanche, il faut le mettre sur la page index.
?>
        <ul>
          <li><a href="index.php">Accueil</a></li>
          <li><a href ="profil.php">Profil</a></li>
          <li><?php if (isset($_SESSION["id"])){echo $_SESSION["id"] . " est connecté(e)";}else{echo "Vous êtes déconnecté(e)";}?></li>
          <li><a href="dec.php">Déconnexion</a></li>
        </ul>
