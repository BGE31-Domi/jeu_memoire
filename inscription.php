<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" href="css/style.css">
		<title>Formulaire d'inscription</title>

	</head>

	<body>
		<main>


		<form action="traitement.php" method="post">

			<h1>Inscription</h1>



			Pseudo :<input type='text' name='prenom' value='' placeholder=''>
			Mot de passe :<input type='mdp' name='mdp' value='' placeholder=''>
			Confirmation du mot de passe :<input type='mdp' name='mdp' value='' placeholder=''>
			Adresse mail :<input type='text' name='email' value='' placeholder=''>
			<div>
				<label></label>
					<input type="radio" name="genre_frm"
												 value="Femme"/> femme
					<input type ="radio" name="genre_frm"
												value="Homme"/> homme

			</div>

			<input type='button' value='Confirmation'>


			<?php


			 ?>
		 </form>
	</main>


	</body>

</html>
