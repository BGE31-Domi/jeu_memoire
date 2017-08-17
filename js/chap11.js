/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//card : carte sur laquelle on clique.
var card;
//cartes:nb de cartes du niveau.
var nb_cartes = 8;
var tab_init = [];
var card_val = [];
var card_div = [];
var cpt = 0;
var value;
var cpt_fin = 0;

function flip2() {
    for (i = 0; i < card_div.length; i++) {
        card = card_div[i];
        card.classList.toggle("flipped");
        card.setAttribute("onclick", "flip(this.id,this.value);");
    }
}

function return_card_init() {
    for (i = 0; i < nb_cartes; i++) {
        card = document.getElementById("card" + i);
        card.classList = "flipped";

    }
}
function remove_card_init() {
    for (i = 0; i < nb_cartes; i++) {
        card = document.getElementById("card" + i);
        card.classList.remove("flipped");

    }
}
function popup() {
    document.querySelector(".victoire").style.display="block";
    
}

function flip(card, value) {


    card = document.getElementById(card);
    card_div[cpt] = card;


    value = card.value;
    card_val[cpt] = value;
    
    card.className = "flipped";
    card.removeAttribute("onclick");



    cpt++;
    if (cpt === 2) {
        if (card_val[0] === card_val[1]) {

            cpt_fin++;
            if (cpt_fin === nb_cartes / 2) {
                setTimeout(popup, 2000);
            }

        } else {



            setTimeout(flip2,1000);


        }
        cpt = 0;
    }

}



for (var k = 1, j = 0; j < nb_cartes; j++) {

    tab_init[j] = k;
    tab_init[j + 1] = k;
    j++;
    k++;

}
//melange du tableau
for (var j, k, i = tab_init.length; i > 0; ) {
    j = Math.floor(Math.random() * i);
    k = tab_init[--i];
    tab_init[i] = tab_init[j];
    tab_init[j] = k;


}

console.log(tab_init);

for (i = 0; i < nb_cartes; i++) {
    var ctnr = document.querySelector(".container");
    var newDiv = document.createElement("div");
    var fig = document.createElement("figure");
    var fig2 = document.createElement("figure");
//    var img = new Image(1,1); // width, height values are optional params 



    ctnr.appendChild(newDiv);

    newDiv.appendChild(fig);
    newDiv.appendChild(fig2);
//    Ajout du Backgroundimage : 
    var source = "url(motif" + tab_init[i] + ".png)";
    fig2.style.backgroundImage = source;

    newDiv.id = "card" + i;
    card = newDiv.id;
    fig.className = "front";
    fig2.className = "back";
    newDiv.value = tab_init[i];

    newDiv.setAttribute("onclick", "flip(this.id,this.value);");

}
return_card_init();
setTimeout(remove_card_init, 1000);

document.addEventListener('DOMContentLoaded', function () {
    cible=document.querySelector("input[name='nxt']");
    cible.addEventListener("click",function(){
        alert("next");
    });
    cible2=document.querySelector("input[name='reset']");
    cible2.addEventListener("click",function(){
        alert("restart");
    });

});






