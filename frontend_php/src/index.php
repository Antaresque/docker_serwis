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

        $data = CurlHelper::perform_http_request("GET", "http://api:4000/images")->data;
        $dataIm = CurlHelper::perform_http_request("GET", "http://api:4000/images")->data;

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
                <?php foreach($data as $el): ?>
                    <div class='row'>
                        <div class='col-10 img-main rounded'>
                            <div class='row img-title'>
                                <a href="img.php?id=<?= $el->id ?>">
                                    <h2 class="title"><?= $el->title ?></h2>
                                </a>
                            </div>
                            <div class='row img-main'>
                                <img class='img-fluid' src='images.php?obrazek=<?= $el->address ?>'></img>
                            </div>
                        </div>
        
                        <div class='col-2 img-buttons mt-auto text-center'>
                            <button type='button' class='btn btn-lg btn-danger'>
                                <i class='fa fa-heart'></i>
                            </button>
                            <p><?= $el->votes ?></p>
                            <button type='button' class='btn btn-lg btn-light'>
                                <i class='fa fa-comments-o'></i>
                            </button>
                            <p><?= $el->comments ?></p>
                        </div>
                    </div><p></p>
                <?php endforeach; ?>
            </div>
            <div class="col-5 right-col">
                <?php
                if($_SESSION["token"]):?>
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
                        <h2>user</h2>
                        <p>Dołączył: 21.03.07</p>
                        <p>Komentarzy: 2137</p>
                        <p>Obrazków: 69</p>
                        <button type='button' class='btn btn-danger'>Wyloguj</button>
                    </div>
                </div>
                <?php endif; ?>
            </div>
        </div>
        <div class="row foot-row">
            <p>Made by: Aleksander Ferens & Adam Bytniewski, 2021</p>
        </div>
    </div>
</body>
</html>