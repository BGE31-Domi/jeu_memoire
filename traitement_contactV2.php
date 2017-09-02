<!-- //ouverture de la session -->
<?php
  session_start();
 ?>
<!-- //Vérification des éléments envoyés  -->
<?php
//affichage de la variable $_POST :
  // print_r($_POST);

//var $erreurs qui va permettre d'afficher les erreurs.
  $erreur='';

//------------------------------------------------------------------------------
  //vérif que le nom/pseudo existe :
  if(isset($_POST['nom'])){
    //Vérif que l'identité n'est pas vide :
    if ($_POST['nom'] != ''){
      //Vérif que l'identité a un bon format :
      if (preg_match('/^[A-Za-z0-9]{2,40}$/',$_POST['nom'])){

        // dernière vérif (les "", <>, sont traduit par l'équivalent html ):
        $nom = htmlentities($_POST['nom']);

      }else{
        $erreur .= '/!\ format de l\'identifiant incorrect /!\ <br>';}

    }else{
      $erreur.= '/!\ Identifiant vide <br>'."\n";}

  }else{$erreur .= 'Piratage sur l\'identifiant<br>'."\n";}
//------------------------------------------------------------------------------
  //vérif que le prenom existe :
  if(isset($_POST['prenom'])){
    //Vérif que le prenom n'est pas vide :
    if ($_POST['prenom'] != ''){
      //Vérif que l'identité a un bon format :
      if (preg_match('/^[A-Za-z0-9]{2,40}$/',$_POST['prenom'])){

        // dernière vérif (les "", <>, sont traduit par l'équivalent html ):
        $prenom = htmlentities($_POST['prenom']);

      }else{$erreur .= '/!\ format du prénom incorrect /!\ <br>';}

    }else{
      //Le prénom est vide, il n'est pas obligatoire => $prenom = 'inconnu'
      $prenom='inconnu';
    }

  }else{$erreur .= 'Piratage sur le prénom<br>'."\n";}
//------------------------------------------------------------------------------
  //vérif que le mail existe :
  if(isset($_POST['mail'])){
    //Vérif que le prenom n'est pas vide :
    if ($_POST['mail'] != ''){
      //Vérif que l'identité a un bon format :
      var_dump($_POST['mail']);
      if (filter_var($_POST['mail'], FILTER_VALIDATE_EMAIL)){

        // dernière vérif (les "", <>, sont traduit par l'équivalent html ):
        $mail = $_POST['mail'];


      }else{$erreur .= '/!\ format du mail incorrect /!\ <br>';}

    }else{$erreur.= '/!\ Mail vide <br>'."\n";}

  }else{$erreur .= 'Piratage sur le mail<br>'."\n";}
//------------------------------------------------------------------------------
//vérif que le message (contenu) existe :
if(isset($_POST['contenu'])){
  //Vérif que le prenom n'est pas vide :
  if ($_POST['contenu'] != ''){
    //Vérif que l'identité a un bon format :
    // if (preg_match('/^[A-Za-z0-9]{2,40}$/',$_POST['contenu'])){

      // dernière vérif (les "", <>, sont traduit par l'équivalent html ):
      $contenu = htmlentities($_POST['contenu']);

    // }else{$erreur .= '/!\ format du message incorrect /!\ <br>';}

  }else{$erreur.= '/!\ message vide <br>'."\n";}

}else{$erreur .= 'Piratage sur le message<br>'."\n";}

//------------------------------------------------------------------------------


if($erreur !== ''){
  //S'il y a des erreurs, on les affiches :
  echo($erreur);


}else{
//S'il n'y a pas d'erreur, alors on se connecte à la BDD et on ajoute les données.
  // echo("<br>".$nom."<br>".$prenom."<br>".$mail."<br>".$contenu);
  //connexion à la BDD :
  $connexion = mysqli_connect('127.0.0.1','root','root','memo_graph');

  // var_dump($connexion); test ok

  //TEST de la connexion
  if (mysqli_connect_errno()){
    //ECHEC :
    echo 'Echec de connexion MySql : '.mysqli_connect_errno();
  }else{
    //prepa de la requete pour créer une nouvelle entrée .
    $requete = "INSERT INTO messages (mess_nom, mess_prenom, mess_email, mess_contenu) VALUES ('".$nom."','".$prenom."','".$mail."','".$contenu."')";
    // $requete = "SELECT * FROM `messages`";

    $resultat = mysqli_query($connexion, $requete);

    var_dump($resultat);
  }


}


// //connexion à la BDD :
// define('DSN','mysql:host=127.0.0.1;dbname=memo_graph');
// define('USER','root');
// define('MDP','');
//
// //Création d'un objet PDO et connexion :
// $connexion = new PDO(DSN, USER, MDP);
//
// //insertion dans la BDD
// $requete = 'INSERT INTO messages (mess_nom, mess_prenom, mess_email, mess_contenu) VALUES ('.$nom.','.$prenom.','.$mail.','.$contenu.')';
//
// $resultat = $connexion->exec($requete);
//
// if ($resultat==1) {
//   echo "message envoyé";
// } else if ($resultat===0) {
//   echo "envoi échoué";
// } else {
//   echo "Problème, veuillez recommencer...";
// }







 ?>
