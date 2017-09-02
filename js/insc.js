document.addEventListener('DOMContentLoaded', function () {
// ciblage de bouton
    var bouton = document.querySelector('input[type=button]');
    bouton.addEventListener('click', function () {
        //recuperation des données
        var pseudo = document.forms[0].pseudo.value;
        var mdp = document.forms[0].mdp.value;
        var mdpc = document.forms[0].mdpc.value;
        var email = document.forms[0].email.value;
        var regle = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var regle2 = /^[a-z0-9]+$/;
        var erreur="";
// verification pseudo

        if (pseudo === '') {
            erreur = "Veuillez saisir un pseudo.<br>";
            document.querySelector('input[name=pseudo]').style.backgroundColor = 'red';
            if (pseudo.length > 40) {
                erreur += "Veuillez saisir un pseudo de moins de 40 caractères.<br>";
                document.querySelector('input[name=pseudo]').style.backgroundColor = 'red';
                if (!regle2.test(pseudo)) {
                    document.querySelector('input[name=pseudo]').style.backgroundColor = 'red';
                    erreur += "Veuillez entrer un pseudo valide.<br>";
                } else {
                    document.querySelector('input[name=pseudo]').style.backgroundColor = 'white';
                }
            }
        }

        if (mdp !== "") {
            document.querySelector('input[name=mdp]').style.backgroundColor = 'white';

            if (mdp.length >= 8 || mdp.length <= 40) {
                document.querySelector('input[name=mdp]').style.backgroundColor = 'white';
                if (regle2.test(mdp)) {
                    document.querySelector('input[name=mdp]').style.backgroundColor = 'white';
                    if (mdpc !== "") {
                        document.querySelector('input[name=mdp]').style.backgroundColor = 'white';
                        if (mdp === mdpc) {
                            document.querySelector('input[name=mdp]').style.backgroundColor = 'white';
                            document.querySelector('input[name=mdpc]').style.backgroundColor = 'white';
                        } else {
                            document.querySelector('input[name=mdp]').style.backgroundColor = 'red';
                            document.querySelector('input[name=mdpc]').style.backgroundColor = 'red';
                            erreur += "Les champs [mot de passe] et [confirmation] doivent être identiques.<br>";
                        }
                    } else {
                        document.querySelector('input[name=mdp]').style.backgroundColor = 'red';
                        document.querySelector('input[name=mdpc]').style.backgroundColor = 'red';
                        erreur += "Vous devez confirmer votre mot de passe.<br>";
                    }
                } else {
                    document.querySelector('input[name=mdp]').style.backgroundColor = 'red';
                    document.querySelector('input[name=mdpc]').style.backgroundColor = 'red';
                    erreur += "Le mot de passe valide doit être composé uniquement de chiffres et de lettres.<br>";
                }

            } else {
                erreur += "La taille du mot de passe doit être comprise entre 8 et 40 caractères.<br>";
                document.querySelector('input[name=mdpc]').style.backgroundColor = 'red';
                document.querySelector('input[name=mdp]').style.backgroundColor = 'red';
            }
        } else {
            erreur += "Veuillez saisir un mot de passe.<br>";
            document.querySelector('input[name=mdpc]').style.backgroundColor = 'red';
            document.querySelector('input[name=mdp]').style.backgroundColor = 'red';
        }



//email
        if ((regle.test(email) === false) || (email === "")) {
            document.querySelector('input[name=email]').style.backgroundColor = 'red';
            erreur += "Veuillez saisir une adresse valide.";
        } else {
            document.querySelector('input[name=email]').style.backgroundColor = 'white';
        }

//consequences
        if (!erreur) {
            document.forms[0].submit();
        } else {
            document.getElementById("error").innerHTML = erreur;
        }
    });
});
