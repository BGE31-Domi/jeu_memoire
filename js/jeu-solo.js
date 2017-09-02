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
var temps_manche = 30;
//temps qui varie
var timer_gene = temps_manche;
var timer_id;
//Numéro de niveau :
var level = 1;
//Va récupèrer le pointage de la div victoire
var victoria = document.querySelector(".victoire");
//Va récupèrer le pointage de la div defeat
var defeat = document.querySelector(".defeat");
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
//Cible la div pause
var pause = document.querySelector(".pause");
//Récupère les cartes avant de vider le conteneur à la pause afin de pouvoir les regénérer après.
var div_pause = [];
//Devient true lorsque le jeu commence. Devient false lorsque la partie s'arrête.'
var play = false;
//Devient true lorsque la div pause est affichée.
var pause_bool = false;


//Lance la partie. Activée par le bouton "commencer !"
function begin() {

    cpt = 0;
    tab_init = [];
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
        case "1" :
            motif = "dauphin";
            break;
        case "2" :
            motif = "chafouin";
            break;
        default:
            motif = "motif";

    }

}

//Crée les cartes au début de chaque niveau ou partie.
function cardsCreation() {
//    Mets une bordure ruge pour indiquer au joueur que le jeu n'a pas commncé.'
    ctnr.style.borderColor = "#D50105";
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

}

//Révèle toutes les cartes en début de partie.
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
    ctnr.style.borderColor = "#4CAF50";
    //démarrage du temps de jeu :
    timer_id = setInterval(game_time, 1000);

}

//Timer de la partie.
function game_time() {
    play = true;


    ctnr.style.borderColor = "#4CAF50";
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
        //arret de la musique :
        musique_zen.pause();
        musique_zen.currentTime=0;


        popup_timeout();

    }

    return timer_gene;
}

//Retourne la carte qui est cliquée et fait les tests de comparaison.
function flip(card, value) {

    // Récup de la carte

    card = document.getElementById(card);
    card_div[cpt] = card;

    // Récup de la valeur de la carte.

    value = card.value;
    card_val[cpt] = value;
    //On change la class css de la carte pointée:
    card.className = "flipped";
    son1.play();
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
                    setTimeout(popup_end, 1000);
                } else {
                    setTimeout(popup, 1000);
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

        card.classList.toggle("flipped");
        son2.play();
    }

    //re-attribution de la fonctionnalité clic :
    for (i = 0; i < nb_cartes; i++) {

        //pointer la carte à modifier par l'id :
        let div_carte = document.getElementById("card" + i);

        // lui attribuer un attribut
        div_carte.setAttribute("onclick", "flip(this.id,this.value);");

    }

}

//Affiche la div qd le temps de jeu est écoulé :
function popup_timeout() {
    clearInterval(timer_id);
    play=false;
    ctnr.innerHTML = "";
    empl_timer.textContent = "Niveau : " + level;

    document.querySelector(".defeat").style.display = "inline-block";
}

//Affiche la div victoire lorsque toutes les paires ont été trouvées.
function popup() {
    play = false;
    ctnr.innerHTML = "";
    victoria.style.display = "inline-block";
    document.querySelector(".temps").innerHTML = "Bravo vous avez terminé le niveau " + level + ".<br> Vous gagnez " + (timer_gene) + " s pour le niveau suivant.";

}

//Affiche la div fin du jeu lorsque tous les niveaux ont été terminés.
function popup_end() {
    play = false;
    ctnr.innerHTML = "";
    fin.style.display = "inline-block";
    document.querySelector(".temps").innerHTML = "Bravo vous avez terminé le niveau " + level + ", ultime niveau de MemoryGraf. Il vous restait : " + (timer_gene + 1) + " s. Essayez de battre votre record la prochaine fois !";
}


//Activée par le bouton "niveau suivant" dans "victoria"
function next() {

    clearInterval(timer_id);
    tab_init = [];
    cpt=0;
    cpt_fin = 0;
    timer_gene = timer_gene + temps_manche;
    level++;
    nb_cartes = nb_cartes + 2;

    victoria.style.display = "none";
    cardsCreation();
}

//Activée par le bouton "recommencer" dans "victoria"
function recommencer() {

    clearInterval(timer_id);
    cpt = 0;
    tab_init = [];
    nb_cartes = 8;
    cpt_fin = 0;
    card_div = [];
    card_value = [];
    timer_gene = temps_manche;
    defeat.style.display = "none";
    victoria.style.display = "none";
    fin.style.display = "none";
    form_choice.style.display = "inline-block";

}

function reprendre() {
    pause_bool = false;

    //Musique - reprise :
    musique_zen.play();


    pause.style.display = "none";
//        Boucle qui régénère les cartes telles qu'étaient à la fin du tour précédent.'
    for (i = 0; i < nb_cartes; i++) {
        //pointer la carte à modifier par l'id :
        ctnr.appendChild(div_pause[i]);


    }

    for (i = 0; i < nb_cartes; i++) {

        //pointer la carte à modifier par l'id :
        let div_carte = document.getElementById("card" + i);

        // lui attribuer un attribut
        div_carte.setAttribute("onclick", "flip(this.id,this.value);");

    }
    timer_id = setInterval(game_time, 1000);
}

//Fonctionnalité "pause". Se déclenche lorsque le jeu a commencé et que le joueur appuie sur "espace".
document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keydown", function (event) {

        if (event.keyCode === 32) {
            if (play === true) {
                clearInterval(timer_id);
                play = false;
                pause_bool = true;
                div_pause = [];
                for (i = 0; i < nb_cartes; i++) {

                    div_pause[i] = document.getElementById("card" + i);


                }

                ctnr.innerHTML = "";


                pause.style.display = "inline-block";

                //Musique en pause :
                musique_zen.pause();

            } else {
                if (pause_bool === true) {
                    reprendre();
                }
            }

        }

    });
});
