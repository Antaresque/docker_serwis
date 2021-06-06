<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <title>Jbzdy2</title>
</head>
<body>
    <?php
        require_once 'curl_helper.php';
        $id = $_GET["id"];
        $data = CurlHelper::perform_http_request("GET", "http://api:4000/images/".$id)->data;
        $comms = CurlHelper::perform_http_request("GET", "http://api:4000/images/".$id."/comments")->data;
        if(isset($_SESSION["token"]))
        {
            $Uid = (json_decode(base64_decode(str_replace('_', '/', str_replace('-','+',explode('.', $_SESSION["token"])[1])))))->id;
            $dataU = CurlHelper::perform_http_request("GET", "http://api:4000/users/$Uid")->data;
            $dateCr = date('d.m.Y', strtotime($dataU->createdAt));
            $exists = CurlHelper::perform_http_request("GET", "http://api:4000/images/$id/votes/", false, $_SESSION["token"])->data;
        }
        $_SESSION["link"] = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    ?>  
    <nav class="navbar navek sticky-top">
            <a href="index.php">
                <h2>ABCD</h2>
            </a>
        </nav>
    <div class="container-fluid">
        <div class="row mid-row">
            <div class="col-2 left-col">
            </div>
            <div class="col-5 main-col rounded">
                <div class='row'>
                    <div class='col-10 img-main rounded'>
                        <div class='row img-title'>
                            <h2><?= $data->title ?></h2>
                        </div>
                        <div class='row img-main'>
                            <img class='img-fluid' src='images.php?obrazek=<?= $data->address ?>'></img>
                        </div>
                    </div>
    
                    <div class='col-2 img-buttons mt-auto text-center'>
                        <?if(!isset($_SESSION["token"])):?>
                            <p id="tekst" style="display:none">Zaloguj się aby zagłosować!</p>
                            <button type='button' onClick="pokaz()" class='btn btn-lg btn-danger'>
                                    <i class='fa fa-heart'></i>
                            </button>
                            <p><?= $data->votes ?></p>
                            <script>
                                function pokaz(){
                                    document.getElementById("tekst").style.display = "block";
                                }
                            </script>
                        <?php else: ?>
                            <button id="voteBtnT-<?= $id ?>" onclick="vote(<?=$id?>, true)" type='button' class='btn btn-lg btn-success' 
                                    style="display: <?=($exists->found) ? 'inline' : 'none' ?>">
                                <i class='fa fa-heart'></i>
                            </button>
                            <button id="voteBtnF-<?= $id ?>" onclick="vote(<?=$id?>, false)"type='button' class='btn btn-lg btn-danger'
                                    style="display: <?=($exists->found) ? 'none' : 'inline' ?>">
                                <i class='fa fa-heart'></i>
                            </button>
                            <p><?= $data->votes ?></p>
                        <?php endif; ?>
                    </div>
                </div>
                <div class='row'>
                    <?php
                    if(!isset($_SESSION["token"])):?>
                        <p></p>
                        <p>Musisz się zalogować aby dodawać komentarze!</p>
                    <?php else: ?>
                        <div class="col-12 comment-input">
                        <p></p>
                        <p>Dodaj komentarz:</p>
                        <form action="commentAdd.php" method="post">
                            <textarea name="content" style="min-width: 100%" rows="3" placeholder="Wpisz komentarz tutaj"></textarea>
                            <p></p>
                            <button type='submit' class='btn btn-danger'>Dodaj</button>
                            <input type="hidden" name="id" value="<?= $id ?>"></input>
                            <p></p>
                        </form>
                        <p></p>
                        </div>
                    <?php endif; ?>
                    <h3>Komentarze (<?= $data->comments ?>):</h3>
                    <p></p>
                    <div class='col comments rounded'>
                        <?php 
                        if($comms==null){
                            echo "<h3>Brak Komentarzy</h3>";
                        }
                        else{
                            foreach($comms as $el): ?>
                                <div class='row comment rounded'>
                                    <div class='col-10'>
                                        <h3><?= $el->user->nickname ?></h3>
                                        <p><?= $el->comment ?></p>
                                    </div>
                                    <div class='col-2 comment-buttons'>
                                    <?if(!isset($_SESSION["token"])):?>
                                        <button type='button' onClick="pokazC(<?= $el->id ?>)" class='btn btn-danger'>
                                                <i class='fa fa-heart'></i>
                                        </button>
                                        <p><?= $el->votes ?></p>
                                        <p id="<?= $el->id ?>" style="display:none">Zaloguj się!</p>
                                    <?php else: ?>
                                        <?php
                                        $id = $el->id;
                                        $existsC = CurlHelper::perform_http_request("GET", "http://api:4000/comments/$id/votes/", false, $_SESSION["token"])->data;
                                        if($existsC->found) :?>
                                            <a href="commVote.php?id=<?= $id ?>&exists=true">
                                                <button type='button' class='btn btn-success'>
                                                    <i class='fa fa-heart'></i>
                                                </button>
                                            </a>
                                        <?php else: ?>
                                            <a href="commVote.php?id=<?= $id ?>&exists=false">
                                                <button type='button' class='btn btn-danger'>
                                                    <i class='fa fa-heart'></i>
                                                </button>
                                            </a>
                                        <?php endif; ?>
                                        <p><?= $el->votes ?></p>
                                    <?php endif; ?>
                                    </div>
                                </div>
                                <p></p>
                            <?php endforeach; 
                        }
                        ?>
                    </div>
                </div>
            </div>
            <div class="col-5 right-col">
                <?php
                if(!isset($_SESSION["token"])):?>
                <div class="row user sticky-top">
                    <div class="col-4 user-data rounded-end" align="center">
                        <h3>Nie jesteś zalogowany!</h3>
                        <form action="login.php">
                            <button type='submit' class='btn btn-light'>Logowanie/Rejestracja</button>
                        </form>
                        <p></p>
                    </div>
                </div>
                <?php else: ?>
                <div class="row user sticky-top">
                    <div class="col-3 user-pfp rounded-start">
                        <img class="img-fluid" src="ral-min.png">
                    </div>
                    <div class="col-4 user-data rounded-end">
                        <h2><?= $dataU->nickname ?></h2>
                        <p>Dołączył: <?= $dateCr ?></p>
                        <p>Komentarzy: <?= $dataU->comments ?></p>
                        <p>Obrazków: <?= $dataU->images ?></p>
                        <form action="logout.php" method="post">
                            <button type='submit' class='btn btn-danger'>Wyloguj</button>
                        </form>
                    </div>
                </div>
                <?php endif; ?>
            </div>
        </div>
        <div class="row foot-row">
            <p>Made by: Aleksander Ferens & Adam Bytniewski, 2021</p>
        </div>
    </div>
    <script src="voting.js"></script>
    <script>
        function pokazC(id){
            document.getElementById(id).style.display = "block";
        }
    </script>
</body>
</html>