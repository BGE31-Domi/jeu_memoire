<!DOCTYPE html>

<html>
    <head>
        <title>Memo Graph</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="fontPage.css" rel="stylesheet" type="text/css"/>
        <link href="memory.css" rel="stylesheet" type="text/css"/>
    </head>
    <body>
        <main>

<?php include("header.php"); ?>

<!--///////////////////////CENTRE////////////////////////////////////////////-->
            <section class='centre'>

                <div class="solo">
                    <h3>Mode Solo</h3>
                    <p >Description mode solo<br><a href="#">En savoir +</a></p>
                    <button onclick="debut();">Play</button>
                    <div class="scoreSolo">
                        Best/New
                    </div>
                </div>

<?php include("container.php"); ?>

                <div class="duel">
                    <h3>Mode Duel</h3>
                    <p class="duel">Description mode duel<br><a href="#">En savoir +</a></p>
                    <button onclick="debut();">Play</button>
                    <div class="scoreDuel">
                        Best/New
                    </div>                   
                </div>
            </section>
<?php include("footer.php"); ?>
        </main>
    </body>
</html>
