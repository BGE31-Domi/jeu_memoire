//Fichier avec le code du timer.

//fonction de rebours de timer_gene :
function tictac(){

// ciblage de l'emplacement où le timer va s'afficher :
  




  timer_gene--;

  //préparation des minutes et secondes pour l'affichage :
  var minutes = Math.floor(timer_gene/60);
  var secondes = Math.floor(timer_gene % 60);


  //affichage dans la page web
   empl_timer.innerHTML = "Temps restant : " + minutes + " min " + secondes + " s<br>Niveau : " + level;




  if (timer_gene === 0){

    // On met toutes les cartes en non cliquable :
    for (i = 0; i < nb_cartes; i++) {
        //pointer la carte à modifier par l'id :
        let div_carte = document.getElementById("card" + i);

        // lui enlever l'attribut onclick :
        div_carte.removeAttribute("onclick");
      }

    clearInterval(timer_id);

    empl_timer.textContent = "Niveau : " + level;

    document.querySelector(".defeat").style.display="inline-block";

  }

  return timer_gene;
}
