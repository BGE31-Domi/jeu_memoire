//on cible le bouton 'commencer'
var commencer=document.querySelector('input[name="commencer"]');
//on cible le lecteur de musique :
var musique_zen = document.getElementById('zen');

//on cible l'icone son
var son_on_off = document.querySelector('img[alt="son_on_off"]');

//booleen : son on ou son off :
var son_on=true;

//boutons checkbox :
var checked_musique_zen;

//On cible les sticks du son :
var stick1=document.getElementById('stick1');
var stick2=document.getElementById('stick2');
var stick3=document.getElementById('stick3');
var stick4=document.getElementById('stick4');
var stick5=document.getElementById('stick5');

/////////////////////// FONCTIONS /////////////////////////////////////////////

//CSS des sticks du volume de son pour volume = 0.5.
function stick3_css(){
  stick1.style.backgroundColor="navy";
  stick2.style.backgroundColor="navy";
  stick3.style.backgroundColor="navy";
  stick4.style.backgroundColor="#ebebeb";
  stick5.style.backgroundColor="#ebebeb";
}


///////////////////////EVENEMENTS ///////////////////////////////////////////

//Lancer la musique quand on appuie sur le bouton commencer :
commencer.addEventListener('click', function(){
  console.log('pop');
  //On récupére l'etat checked ou non des boutons radio :
  checked_musique_zen=document.querySelector('input[name="chx_musique"]').checked;

  if(checked_musique_zen){
    musique_zen.volume=0.5;
    stick3_css();
    musique_zen.play();
  }
});

//Couper et remettre le son :
son_on_off.addEventListener('click', function(){

  if (son_on){
    musique_zen.pause();
    son_on_off.src="img/son_coupe.png";
    son_on=!son_on;
  }else{
    musique_zen.play();
    son_on_off.src="img/son.png";
    son_on=!son_on;
  }

});

//modifier les couleurs des sticks suivant le niveau de son sélectionné :
stick1.addEventListener('click', function(){
  stick1.style.backgroundColor="navy";
  stick2.style.backgroundColor="#ebebeb";
  stick3.style.backgroundColor="#ebebeb";
  stick4.style.backgroundColor="#ebebeb";
  stick5.style.backgroundColor="#ebebeb";
  musique_zen.volume=0.1;

});
stick2.addEventListener('click', function(){
  stick1.style.backgroundColor="navy";
  stick2.style.backgroundColor="navy";
  stick3.style.backgroundColor="#ebebeb";
  stick4.style.backgroundColor="#ebebeb";
  stick5.style.backgroundColor="#ebebeb";
  musique_zen.volume=0.3;

});
stick3.addEventListener('click', function(){
  stick3_css();
  musique_zen.volume=0.5;

});
stick4.addEventListener('click', function(){
  stick1.style.backgroundColor="navy";
  stick2.style.backgroundColor="navy";
  stick3.style.backgroundColor="navy";
  stick4.style.backgroundColor="navy";
  stick5.style.backgroundColor="#ebebeb";
  musique_zen.volume=0.7;

});
stick5.addEventListener('click', function(){
  stick1.style.backgroundColor="navy";
  stick2.style.backgroundColor="navy";
  stick3.style.backgroundColor="navy";
  stick4.style.backgroundColor="navy";
  stick5.style.backgroundColor="navy";
  musique_zen.volume=1;

});
