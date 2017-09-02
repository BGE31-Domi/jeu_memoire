<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="css/insc.css">
        <script src="js/insc.js"charset="utf-8"></script>
        <title>Formulaire d'inscription</title>

    </head>

    <body>
        <main>

            <form action="traitement.php" method="post">

                <h1>Inscription</h1>

                <input type='text' name='pseudo' value='' placeholder='Pseudo'>
                <input type='password' name='mdp' value='' placeholder='Mot de passe'>
                <input type='password' name='mdpc' value='' placeholder='Confirmation du mot de passe'>
                <input type='email' name='email' value='' placeholder='Adresse mail'>

                <input type='button' value='Confirmation'>
                <label id="error"></label>
            </form>
        </main>


    </body>

</html>

