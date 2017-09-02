/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var view1=false;
var view2=false;
var view3=false;
//Fonction appelée par le bouton "modifier" du champ pseudo.
//Fait apparaître le input pour changer le pseudo.
function modify() {
    
        var input = document.createElement("input");
        document.getElementById("pseudo").appendChild(input);
        input.setAttribute("name","pseudo_mod");
        document.querySelector("input[name='mod1']").style.display="none";
        
        
}
//Fonction appelée par le bouton "modifier" du champ pseudo.
//Fait apparaître les inputs pour changer le mot de passe.

function modify2() {
    
        document.querySelector("input[name='mod2']").style.display="none";
        document.querySelector(".mdp").style.display="table-row";
         document.querySelector(".mdp2").style.display="table-row";
         document.querySelector(".mdp3").style.display="table-row";
     
         
}

//Rend la saisie du champ "ancien mot de passe" visible qd on appuie sur le bouton "oeil" à côté.
//La recache si on reclique dessus.
function view(){
    if (view1===false){
         document.querySelector("input[name='chk_old_pwd']").setAttribute("type",'text');
         view1=true;
    }
    else{
        document.querySelector("input[name='chk_old_pwd']").setAttribute("type",'password');
        view1=false;
    }
    
}
//Rend la saisie du champ "nouveau mot de passe" visible qd on appuie sur le bouton "oeil" à côté.
//La recache si on reclique dessus.
function view_2(){
    if (view2===false){
         document.querySelector("input[name='new_pwd']").setAttribute("type",'text');
         view2=true;
    }
    else{
        document.querySelector("input[name='new_pwd']").setAttribute("type",'password');
        view2=false;
    }
    
}

//Rend la saisie du champ "confirmation nouveau mot de passe" visible qd on appuie sur le bouton "oeil" à côté.
//La recache si on reclique dessus.
function view_3(){
    if (view3===false){
         document.querySelector("input[name='chk_new_pwd']").setAttribute("type",'text');
         view3=true;
    }
    else{
        document.querySelector("input[name='chk_new_pwd']").setAttribute("type",'password');
        view3=false;
    }
    
}