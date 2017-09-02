<!-- Il n'est pas nécessaire de créer un fichier pour se déconnecter. On peut utiliser la méthode GET. On crée un SV $GET_["logout"] et on teste son existence sur la page d'accueil. Si c'est le cas, elle détruit la session et renvoie sur la page d'accueil lorsqu'on clique sur le lien logout généré. -->


<?php
session_start();

session_destroy();
 header('Location: connex.php');

 ?>
