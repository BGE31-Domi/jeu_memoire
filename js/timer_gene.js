//Fichier avec le code du timer.

//timer de 2 minutes = 120 secondes
var timer_gene = 60;
var timer_id;

//fonction de rebours de timer_gene :
function tictac(){

// ciblage de l'emplacement où le timer va s'afficher :
  var empl_timer = document.querySelector('.timer');

  //préparation des minutes et secondes pour l'affichage :
  var minutes = Math.floor(timer_gene/60);
  var secondes = Math.floor(timer_gene % 60);

  //affichage dans la page web
  empl_timer.textContent = minutes + " : " + secondes;

  timer_gene--;
  if (timer_gene === 0){
    clearInterval(timer_id);
    document.querySelector(".defeat").style.display="inline-block";
    

  }

  return timer_gene;
}


