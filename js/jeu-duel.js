/* Projet jeu de mémoire.
 Partie Javascript
 Equipe :
 - Thomas
 - Victoria
 - Dominique
 - Zohal
 - Tabitha
 
 créé en août 2017.
 */



//card : carte sur laquelle on clique.
var card;
//cartes:nb de cartes du niveau.
var nb_cartes = 8;
//Tableau des valeurs initiales de toutes les cartes.
var tab_init = [];
//Tableau qui enregistre les valeurs des cartes sur lesquelles on clique :
var card_val = [];
//Tableau qui enregistre les pointages des div des cartes sur lesquelles on clique :
var card_div = [];
//Compteur de comparaison des cartes :
var cpt = 0;
//Valeur de la carte sur laquelle on clique :
var value;
//Compteur de paires :
var cpt_fin = 0;
//Timer de jeu :
//temps de chaque manche :
var temps_manche = 10;
//temps qui varie
var timer_gene = temps_manche;
var timer_id;
//Numéro de niveau :
var level = 1;
//Va récupèrer le pointage de la div fin
var fin = document.querySelector(".fin");
//nom de la série des fichiers des images des cartes :
var motif = "";
//Emplacement du timer :
var empl_timer = document.querySelector('.timer');
//Récupère la valeur du bouton radio de la variante de jeu : 
var game;
//Cible la div qui contient toutes les cartes : 
var ctnr = document.querySelector(".container");
//Récupère la valeur de la liste déroulante de numéro du niveau.
var chx_niv;
//Tableau des nombres de cartes selon les niveaux :
var tab_niv = [8, 10, 12, 14, 16, 18, 20];
//Cible le formulaire du choix de niveau : 
var form_choice = document.querySelector(".choix_niv");


//Cible la div de la popup de fin de tour.
var nxt_player;
//Numéro de joueur qui joue ou doit jouer.
var player = 1;
//Temps du compte à rebours affiché en secondes.
var secondes;
//Score du joueur 1 :
var score1 = 0;
//Score du joueur 2
var score2 = 0;
//Compteur de paires et déclenche la fin du jeu si la somme des cores des deux joueurs est égale à nb_cartes/2
var cpt_fin = score1 + score2;
//Booléen. Redevient false lorsque les cartes ont été comparées ou si le timer est égale à 0.

var div_end=[];

//Lance la partie. Activée par le bouton "commencer !"
function begin() {

    cpt = 0;
    tab_init = [];
    nb_cartes = 8;
    cpt_fin = 0;
    timer_gene = temps_manche;

    ctnr.innerHTML = "";
    clearInterval(timer_id);


    //on récupère la valeur du niveau sélectionné :
    chx_niv = document.querySelector('select[name="niveaux"]').value;
   
    
    // on définit le nombre de cartes à afficher suivant le niveau sélectionné :
    nb_cartes = tab_niv[chx_niv - 1];
    level = 1 * chx_niv;



    //choix du motif
    //ciblage :
    game = document.querySelector("input[name='variante']:checked");

    game_variant(game.value);
    cardsCreation();


    form_choice.style.display = "none";
}

//Change le nom de la série des fichiers image des cartes en fonction de la valeur du bouton radio sélectionné.
function game_variant(x) {


    switch (x) {
        case "0":
            motif = "motif";
            break;
        case "1":
            motif = "champi";
            break;
        case "2" :
            motif="couleurs";
        default:
            motif="motif";
            

    }

}

//Crée les cartes au début de chaque niveau ou partie. 
function cardsCreation() {

//Tableau initial générant les paires de valeurs pour les cartes
    for (var k = 1, j = 0; j < nb_cartes; j++) {

        tab_init[j] = k;
        tab_init[j + 1] = k;
        j++;
        k++;

    }

//melange du tableau initial
    for (var j, k, i = tab_init.length; i > 0; ) {
        j = Math.floor(Math.random() * i);
        k = tab_init[--i];
        tab_init[i] = tab_init[j];
        tab_init[j] = k;
    }

    //Génération des cartes dans la page HTML :
    for (i = 0; i < nb_cartes; i++) {


        //Création de la carte
        var newDiv = document.createElement("div");
        //Création des 2 faces de la carte
        var fig = document.createElement("figure");
        var fig2 = document.createElement("figure");

        //Les cartes sont placées dans la zone de jeu
        ctnr.appendChild(newDiv);
        //Les faces sont placées sur les cartes
        newDiv.appendChild(fig);
        newDiv.appendChild(fig2);

        //Ajout des visuels des cartes :

       
        var source = "url(img/" + motif + tab_init[i] + ".png)";
        var source2 = "url(img/dos.png)";
        fig2.style.backgroundImage = source;
        fig.style.backgroundImage = source2;
        newDiv.id = "card" + i;
        card = newDiv.id;
        fig.className = "front";
        fig2.className = "back";
        newDiv.value = tab_init[i];
    }
    empl_timer.innerHTML = "Temps restant :  -  min - s <br>Niveau : " + level;
    //Révélation des cartes en début de partie
    for (i = 0; i < nb_cartes; i++) {
        //Retourner les cartes :
        card = document.getElementById("card" + i);
        card.classList.remove("flipped");

        //attribution de la fonctionnalité clic :
        card.setAttribute("onclick", "flip(this.id,this.value);");

    }
   

    timer_id = setInterval(game_time, 1000);


}

function game_time() {

    
        timer_gene--;
        
        //préparation des minutes et secondes pour l'affichage :
        
        secondes = Math.floor(timer_gene % 60);
        
        //affichage dans la page web
        empl_timer.innerHTML = "Temps restant : " + secondes + " s<br>Niveau : " + level + "<br> Joueur : " + player + "<br>Score 1 : " + score1 + "<br>Score 2 : " + score2;
    




    if (timer_gene === 0) {
        clearInterval(timer_id);
        
//        Boucle qui récupère toutes les div des cartes dans un tableau.
        for (i = 0; i < nb_cartes; i++) {
            //pointer la carte à modifier par l'id :
            div_end[i] = document.getElementById("card" + i);

            
        }
        

//       Lance la fonction qui affiche la popup de fin de tour.
            popup_next_player();
        }
        // On met toutes les cartes en non cliquable :

    return timer_gene;

}

//Affiche la div next_player et indique quel joueur doit jouer.
function popup_next_player() {

//Si une seule carte à été retournée par le joueur précédent, elle est automatiquement retournée.
    if (cpt === 1) {
        card_div[0].classList.remove("flipped");
//        Réinitialisation des deux tableaux qui comparent les valeurs et les pointages des div de la carte cliquée.
        card_div=[];
        card_val=[];
        
    }
//    Vidage du contenair des cartes.
    ctnr.innerHTML="";
//    Change le numéro du joueur pour qu'il s'affiche par la suite.
    if (player === 1) {
        player = 2;
    } else {
        player = 1;
    }
//    Récupère la div avec la class nxt player
    nxt_player = document.querySelector(".nxt_player");
//    Affiche la div ci-dessus.
    nxt_player.style.display = "inline-block";
//    Texte qui indique le  numéro du joueur qui doit jouer.
    empl_timer.innerHTML = "Niveau : " + level + "<br>C'est au joueur " + player + " de jouer son tour.";

}


function popup_end() {
    fin = document.querySelector(".fin");
    fin.style.display = "inline-block";

    if (score1 === score2) {
        empl_timer.innerHTML = "Le niveau est terminé. Le jeu se termine sur une égalité.";
    } else {
        if (score1 > score2) {
            player = 1;
            empl_timer.innerHTML = "Le niveau est terminé. Le joueur " + player + " a gagné !<br>Score 1 : " + score1 + "<br>Score 2 : " + score2;
        } else {
            player = 2;
            empl_timer.innerHTML = "Le niveau est terminé. Le joueur " + player + " a gagné !<br>Score 1 : " + score1 + "<br>Score 2 : " + score2;
        }
    }


}

//Retourne la carte sur laquelle on clique et fait les tests de comparaison des deux dernières cartes cliquées.
function flip(card, value) {

    // Récup de la carte

    card = document.getElementById(card);
    card_div[cpt] = card;

    // Récup de la valeur de la carte.

    value = card.value;

    card_val[cpt] = value;
    //On change la class css de la carte pointée:

    card.className = "flipped";
   
   
    //on incrémente le compteur de carte cliquées :
    cpt++;

    //vérification si on clique sur la 1ère ou la 2ème carte

    //cas où 1 seule carte est cliquée :
    if (cpt === 1) {
        //On enlève l'attribut cliquable de la carte :
        card.removeAttribute("onclick");

        //Cas où 2 cartes sont retournées : on vérifie si elles sont les mêmes ou non
    } else if (cpt === 2) {

        // On met toutes les cartes en non cliquable :
        for (i = 0; i < nb_cartes; i++) {
            //pointer la carte à modifier par l'id :
            let div_carte = document.getElementById("card" + i);

            // lui enlever l'attribut onclick :
            div_carte.removeAttribute("onclick");
        }

        //On compare les deux cartes :

        //Les 2 cartes sont les mêmes :
        if (card_val[0] === card_val[1]) {
            //Le compteur de paires augmente de 1 :
            cpt_fin++;

            for (i = 0; i < nb_cartes; i++) {

                //pointer la carte à modifier par l'id :
                let div_carte = document.getElementById("card" + i);
                if (div_carte.className !== "flipped") {
                    // lui attribuer un attribut
                    div_carte.setAttribute("onclick", "flip(this.id,this.value);");
                }

            }
            if (player === 1) {
                score1++;
            } else {
                score2++;
            }
            //Si toutes les paires sont faites :
            if (cpt_fin === nb_cartes / 2) {
                //On met le compteur en pause :
                clearInterval(timer_id);
                popup_end();

            }


        } else {

            //On retourne les 2 cartes :
            setTimeout(flip2, 1000);

        }

        // Remise à zéro du compteur :
        cpt = 0;
  
    }

}

//Retourne les deux dernières cartes qui ont été cliquées :
function flip2() {
    //Retourner les 2 cartes qui ont été cliquées :
    for (i = 0; i < card_div.length; i++) {
        card = card_div[i];
        card.classList.remove("flipped");
        card.setAttribute("onclick", "flip(this.id,this.value);");
    }

    
    //re-attribution de la fonctionnalité clic :
    for (i = 0; i < nb_cartes; i++) {

        //pointer la carte à modifier par l'id :
        let div_carte = document.getElementById("card" + i);

        // lui attribuer un attribut
        div_carte.setAttribute("onclick", "flip(this.id,this.value);");

    }

}
//Activée par le bouton "continuer" dans la popup de fin de tour.
function next() {
    clearInterval(timer_id);
        cpt = 0;
        timer_gene = temps_manche;
        nxt_player.style.display = "none";
//        Boucle qui régénère les cartes telles qu'étaient à la fin du tour précédent.'
        for (i = 0; i < nb_cartes; i++) {
            //pointer la carte à modifier par l'id :
            ctnr.appendChild(div_end[i]);

            
        }
        
        for (i = 0; i < nb_cartes; i++) {

            //pointer la carte à modifier par l'id :
            let div_carte = document.getElementById("card" + i);

            // lui attribuer un attribut
            div_carte.setAttribute("onclick", "flip(this.id,this.value);");

        }
        timer_id = setInterval(game_time, 1000);
}

//Activée par le bouton "recommencer" dans la div fin
function recommencer() {
    clearInterval(timer_id);
        cpt = 0;
        tab_init = [];
        cpt_fin = 0;
        timer_gene = temps_manche;
        ctnr.innerHTML = "";
        fin.style.display = "none";
        score1=0;
        score2=0;
        div_end=[];
        fin.style.display="none";
        
        form_choice.style.display = "inline-block";
        
}










