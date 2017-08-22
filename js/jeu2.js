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
var card;
//cartes:nb de cartes du niveau.
var nb_cartes;
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


//Numéro de niveau :
var level = 1;
//Cible l'emplacement de jeu dans la page
var ctnr = document.querySelector(".container");
//Va récupèrer le pointage de la div victoire
var victoria;
//Va récupèrer le pointage de la div defeat
var defeat;
//Va récupèrer le pointage de la div fin
var fin;

//Timer de jeu :
//temps de chaque manche :
var temps_manche = 15;
//temps qui varie
var timer_gene = temps_manche;
var timer_id;
//temps de 5 s avant que le timer commence :
var timer_delay;
// ciblage de l'emplacement où le timer va s'afficher :
var empl_timer = document.querySelector('.timer');


//var pour déterminer le motif à appliquer aux cartes:
var motif = "";




///////////////////
// Initialisation du niveau à 1
var chx_niv = 1;
///////////////////

////////////////////////////////////////////////////////////////////////////////
//Choix du niveau et du motif

//Tableau de correspondance entre le niv et le nb de cartes :
var tab_niv = [8, 10, 12, 14, 16, 18, 20];
//le ciblage de l'intput.
var game;
//ciblage de la liste déroulante :
var sub_chx_joueur = document.querySelector('input[name="sub_chx_joueur"]');

var card_flip_sound=document.getElementById("card_flip_sound");
console.log(card_flip_sound);
function popup_timeout(){
    clearInterval(timer_id);

        empl_timer.textContent = "Niveau : " + level;

        document.querySelector(".defeat").style.display = "inline-block";
}
function tictac() {

    timer_gene--;

    //préparation des minutes et secondes pour l'affichage :
    var minutes = Math.floor(timer_gene / 60);
    var secondes = Math.floor(timer_gene % 60);


    //affichage dans la page web
    empl_timer.innerHTML = "Temps restant : " + minutes + " min " + secondes + " s<br>Niveau : " + level;




    if (timer_gene === 0) {

        // On met toutes les cartes en non cliquable :
        for (i = 0; i < nb_cartes; i++) {
            //pointer la carte à modifier par l'id :
            let div_carte = document.getElementById("card" + i);

            // lui enlever l'attribut onclick :
            div_carte.removeAttribute("onclick");
        }

        let timer_end=setTimeout(popup_timeout,1001);

    }

    return timer_gene;
}


//Fonction timer : lance le setInterval qui fait découler le compte à rebours
function timer_fonc() {
    //démarrage du temps de jeu :
    timer_id = setInterval(tictac, 1000);
}

// Fonction game_variant(x) permet de choisir le motif des cartes :
function game_variant(x) {
    switch (x) {
        case "0":
            motif = "motif";
            break;
        case "1":
            motif = "champi";
            break;
    }
    return motif;
}



//////////////////////////////////////////////////////////////////////////////

//Révèle toutes les cartes en début de niveau.
function revel_card_init() {
    for (i = 0; i < nb_cartes; i++) {
        card = document.getElementById("card" + i);
        card.classList = "flipped";
        
    }
}

//Cache toutes les cartes en début de niveau, après les avoir révélées et les rends cliquables.
function hide_card_init() {

    for (i = 0; i < nb_cartes; i++) {
        //Retourner les cartes :
        card = document.getElementById("card" + i);
        card.classList.remove("flipped");

        //attribution de la fonctionnalité clic :
        card.setAttribute("onclick", "flip(this.id,this.value);");

    }



}

//Affiche la div victoire lorsque toutes les paires ont été trouvées.
function popup() {

    victoria = document.querySelector(".victoire");
    victoria.style.display = "inline-block";
    document.querySelector(".temps").innerHTML = "Bravo vous avez terminé le niveau " + level + ".<br> Vous gagnez " + (timer_gene) + " s pour le niveau suivant.";

}

//Affiche la div fin du jeu lorsque tous les niveaux ont été terminés.
function popup_end() {
    fin = document.querySelector(".fin");
    fin.style.display = "inline-block";
    document.querySelector(".temps").innerHTML = "Bravo vous avez terminé le niveau " + level + ", ultime niveau de MemoryGraf. Il vous restait : " + (timer_gene + 1) + " s. Essayez de battre votre record la prochaine fois !";
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
    console.log(card_flip_sound);
    card.className = "flipped";
    card_flip_sound.play();
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

            //Si toutes les paires sont faites :
            if (cpt_fin === nb_cartes / 2) {
                //On met le compteur en pause :
                clearInterval(timer_id);


                //On affiche un message de victoire :

                if (level === 7) {
                    setTimeout(popup_end, 1500);
                } else {
                    setTimeout(popup, 1500);
                }
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

//Crée les cartes au début de chaque niveau ou partie. Gère aussi les événements click des boutons des div de fin de niveau.
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
    revel_card_init();
    //Retournement des cartes
    setTimeout(hide_card_init, 5000);

    //Gestion des clics sur les boutons :
    ////    // document.addEventListener('DOMContentLoaded', function () {
    //Bouton "niveau suivant" dans "victoria"
    var cible = document.querySelector("input[name='nxt']");
    cible.addEventListener("click", function () {
        cpt = 0;
        cpt_fin = 0;
        timer_gene = timer_gene + temps_manche;
        level++;
        nb_cartes = nb_cartes + 2;
        ctnr.innerHTML = "";
        victoria.style.display = "none";
        cardsCreation();
    });
    //Bouton "recommencer" dans "victoria"
    var cible2 = document.querySelector("input[name='reset']");
    cible2.addEventListener("click", function () {
        clearInterval(timer_id);
        clearInterval(timer_delay);
        cpt = 0;
        tab_init = [];
        nb_cartes = 8;
        cpt_fin = 0;
        timer_gene = temps_manche;
        level = 1;
        ctnr.innerHTML = "";
        victoria.style.display = "none";
        cardsCreation();
        timer_delay = setTimeout(timer_fonc, 5000);
    });
    //Bouton "recommencer" dans "defeat"
    var cible3 = document.querySelector("input[name='reset2']");
    cible3.addEventListener("click", function () {
        clearInterval(timer_id);
        clearInterval(timer_delay);
        cpt = 0;
        tab_init = [];
        nb_cartes = 8;
        cpt_fin = 0;
        timer_gene = temps_manche;
        level = 1;
        ctnr.innerHTML = "";
        defeat = document.querySelector(".defeat");
        defeat.style.display = "none";
        cardsCreation();
        timer_delay = setTimeout(timer_fonc, 5000);
    });
    //Bouton "recommencer" dans "fin" de la partie
    var cible4 = document.querySelector("input[name='reset3']");
    cible4.addEventListener("click", function () {
        clearInterval(timer_id);
        clearInterval(timer_delay);
        cpt = 0;
        tab_init = [];
        nb_cartes = 8;
        cpt_fin = 0;
        timer_gene = temps_manche;
        level = 1;
        ctnr.innerHTML = "";
        fin.style.display = "none";
        cardsCreation();
        timer_delay = setTimeout(timer_fonc, 5000);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    //card : carte sur laquelle on clique.

    //event : on appuie sur le bouton 'commencer'
    sub_chx_joueur.addEventListener("click", function () {
//RéInitialisation des variables + arrêt du comteur.
        cpt = 0;
        tab_init = [];
        nb_cartes = 8;
        cpt_fin = 0;
        timer_gene = temps_manche;
        level = 1;
        ctnr.innerHTML = "";
        clearInterval(timer_id);
        clearInterval(timer_delay);

        //on récupère la valeur du niveau sélectionné :
        chx_niv = document.querySelector('select[name="niveaux"]').value;
        // console.log(chx_niv);
        // on définit le nombre de cartes à afficher suivant le niveau sélectionné :
        nb_cartes = tab_niv[chx_niv - 1];
        level = chx_niv;

        //choix du motif
        //ciblage :
        game = document.querySelector("input[name='variante']:checked");

        game_variant(game.value);

        cardsCreation();
        // //démarrage du temps de jeu :
        // timer_id = setInterval(tictac, 1000);
        // timer_fonc();

        timer_delay = setTimeout(timer_fonc, 5000);
        var form_choice = document.querySelector(".choix_niv");
        form_choice.style.display = "none";
    });

    //fonction de rebours de timer_gene :

    //Lance la fonction suivante au chargement de la page.
    /////// cardsCreation();

});


