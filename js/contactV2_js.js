// alert('page liée !');

//Le script doit se lancer quand toute la page est chargée :
document.addEventListener('DOMContentLoaded', function(){
  // alert('ça marche ! ');

  //On cible le bouton 'envoyer':
  var bouton_envoyer=document.querySelector('input[type="button"]');
  //On ajoute l'écouteur de clics sur le bouton.
  bouton_envoyer.addEventListener('click', function(){

    //1) récup des données :
    var nom = document.forms[0].nom.value;
    var prenom=document.forms[0].prenom.value;
    var mail= document.forms[0].mail.value;
    var contenu=document.forms[0].contenu.value;
    var regle=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // console.log('nom : '+nom+'  prenom : '+prenom+'  mail : '+mail+'    contenu : '+contenu);


    //2)Vérifications :
  //var erreur qui va permettre d'afficher les erreurs.

      var erreur='';
      var empl_erreur=document.getElementById('erreur');

      // nom vide ?
        if(nom == ''){
          erreur += "Nom manquant | ";
          document.querySelector('input[name="nom"]').style.border='1px solid red';
        }
        //nom trop long ?
        if (nom.length>40){
          erreur += "Le nom doit avoir moins de 40 caractères | ";
          document.querySelector('input[name="nom"]').style.border='1px solid red';
        }
        //Mail vide ?
        if(mail == ''){
          erreur += "Mail manquant | ";
          document.querySelector('input[name="mail"]').style.border='1px solid red';
        }
        // // mail correct ?
        if (regle.test(mail)==false){
          erreur+='E-mail incorrect';
        }

        //contenu vide ?
        if(contenu == ''){
          erreur += "contenu manquant | ";
          document.querySelector('textarea[name="contenu"]').style.border='1px solid red';
        }
        //Contenu trop long ?
        if (contenu.length>400){
          erreur +="Le contenu doit avoir moins de 400 caractères | ";
        }


        // si erreur est non vide, alors on n'envoi rien, on affiche le message d'erreur
      if(erreur){
        empl_erreur.textContent=erreur;
      }else{
        //Si on arrive ici, c'est que tout va bien, on peut envoyer !
        //envoie des infos à php:
        document.forms[0].submit();
      }



    //-------------------------------------------------------------------------------

    //envoie des infos à php:
  //  document.forms[0].submit();
  });

});
