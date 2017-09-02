document.addEventListener("DOMContentLoaded", function () {
    var cible = document.querySelector("input[type='button']");
    cible.addEventListener("click", function () {



        var id = document.querySelector("input[name='pseudo']").value;
        var pwd = document.querySelector("input[name='mdp']").value;

        var erreur = "";

        var valid = "border: 1px solid #080;" + "background-image:url(check.png);" + "background-position: right;" + "background-repeat: no-repeat;";
        var invalid = "border: 1px solid #800;" + "background-image:url(cross.png);" + "background-position: right;" + "background-repeat: no-repeat;";
     

        if ((id == "") || (id.length > 45)) {
            erreur = "Le champ [nom] est vide ou trop long.\n";
            
            document.querySelector("input[name='pseudo']").style = invalid;
        } else {
            
            document.querySelector("input[name='pseudo']").style = valid;
        }

        if ((pwd == "") || (pwd.length < 8)) {
            erreur += "Le mot de passe doit faire plus de 8 caractères.\n";
            
            document.querySelector("input[name='mdp']").style = invalid;
        } else {
            
            document.querySelector("input[name='mdp']").style = valid;
        }

        if (!erreur) {
            document.forms[0].submit();
        } else {
            error.innerHTML=erreur;
        }
    });

});
