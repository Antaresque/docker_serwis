<?php
    session_start();
    require_once "decodeJWT.php";
    require_once "curl_helper.php";

    if(isset($_SESSION["token"])) {
        $payload = decodeJWT($_SESSION['token']);
        $role = $payload->role;
        $Uid = $payload->id;
        $dataU = CurlHelper::perform_http_request("GET", "http://api:4000/users/$Uid")->data;
        $dateCr2 = date('d.m.Y', strtotime($dataU->createdAt));
    }
    else{
        $payload = [];
        $role = "guest";
    }

    if(!isset($_GET['id'])){
        header("Location: index.php");
        exit();
    }

    $id = $_GET['id'];

    if(!is_numeric($id)){
        header('Location: index.php');
        exit();
    }

    $URI = "api:4000/users/$id";
    $req = CurlHelper::perform_http_request("GET", "$URI");
    
    
    
    if(isset($_GET["page"]))
    {
        $page = $_GET["page"];
        $req_img = CurlHelper::perform_http_request("GET", "$URI/images?count=true&page=$page");
    }
    else
    {
        $page = 1;
        $req_img = CurlHelper::perform_http_request("GET", "$URI/images?count=true");
    }
    $data = ($req->status == 200) ? $req->data : [];
    $result = ($req->status == 200) ? $req_img->data : [];
    $dateCr = date('d.m.Y', strtotime($data->createdAt));
    $count = $result->totalCount;
    $data_img = $result->data;
    $_SESSION["link"] = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
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
<nav class="navbar navek sticky-top">
        <div class="col-1">
        </div>
        <div class="col-5">
            <a href="index.php">
                <h2>ABCD</h2>
            </a>
        </div>
        <div class="col-2 pull-right">
            <?php if(isset($role) && $role == "admin"): ?>
            <a href="admin.php">
                <button type='button'  class='btn btn-lg btn-light'>
                    <i class='fa fa-wrench'></i>
                    Panel admina
                </button>
            </a>
            <?php endif; ?>
        </div> 
        <div class="col-2 pull-right">
            <?php if(!isset($_SESSION["token"])):?>
            
            <?php else: ?>
                <a href="user.php?id=<?= $Uid?>">
                <button type='button'  class='btn btn-lg btn-light'>
                    <i class='fa fa-user'></i>
                    Profil
                </button>
                </a>
            <?php endif; ?>
        </div>
        <div class="col-2 pull-right">
            <?php if(!isset($_SESSION["token"])):?>
            
            <?php else: ?>
                <a href="imgAdd.php">
                <button type='button'  class='btn btn-lg btn-light'>
                    <i class='fa fa-plus'></i>
                    <i class='fa fa-image'></i>
                    Dodaj obrazek!
                </button>
                </a>
            <?php endif; ?>
        </div>
    </nav>
    <div class="container-fluid">
        <div class="row mid-row">
            <div class="col-2 left-col">
            </div>
            <div class="col-5 main-col rounded">
                <div class="col-10">
                    <div class="row user-inf">
                        <div class="col-4 rounded-start">
                            <img class="img-fluid avatar" src="images.php?avatar=<?= $data->avatar ?>">
                        </div>
                        <div class="col-2">
                        <?php if($Uid == $id): ?>
                                <a href="avtChange.php">
                                <button type='button'  class='btn btn-lg btn-light'>
                                    <i class='fa fa-wrench'></i>
                                    Zmień avatar
                                </button>
                                </a>
                            <?php endif; ?>
                        </div>
                        <div class="col-6">
                            <div class="row" align="center">
                                <h2><?= $data->nickname ?></h2>
                            </div>
                            <div class="row" align="center">
                                <div class="col user-data rounded-end">
                                    Dołączył: <?= $dateCr ?><br>
                                    Komentarzy: <?= $data->comments ?><br>
                                    Obrazków: <?= $data->images ?><br>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-2">

                </div>
                
                <p></p>
                <?php foreach($data_img as $el): ?>
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
                            <?if(!isset($_SESSION["token"])):?>
                                <p id="<?= $el->id ?>" style="display:none">Zaloguj się aby zagłosować!</p>
                                <button type='button' onClick="pokaz(<?= $el->id ?>)" class='btn btn-lg btn-danger'>
                                        <i class='fa fa-heart'></i>
                                </button>
                                <p><?= $el->votes ?></p>
                            <?php else: ?>
                                <?php 
                                $id = $el->id;
                                $exists = CurlHelper::perform_http_request("GET", "http://api:4000/images/$id/votes/", false, $_SESSION["token"])->data;
                                ?>
                                <button id="voteBtnT-<?= $id ?>" onclick="vote(<?=$id?>, true)" type='button' class='btn btn-lg btn-success' 
                                        style="display: <?=($exists->found) ? 'inline' : 'none' ?>">
                                    <i class='fa fa-heart'></i>
                                </button>
                                <button id="voteBtnF-<?= $id ?>" onclick="vote(<?=$id?>, false)"type='button' class='btn btn-lg btn-danger'
                                        style="display: <?=($exists->found) ? 'none' : 'inline' ?>">
                                    <i class='fa fa-heart'></i>
                                </button>

                                <p id="votes-<?=$id?>"><?= $el->votes ?></p>
                            <?php endif; ?>
                            <a href="img.php?id=<?= $el->id ?>">
                                <button type='button' class='btn btn-lg btn-light'>
                                    <i class='fa fa-comments-o'></i>
                                </button>
                            </a>
                            <p><?= $el->comments ?></p>
                        </div>
                    </div><p></p>
                <?php endforeach; ?>
                
                <div class="row pagi" align="center">
                    <p></p>
                    <h4>
                        <ul class="pagination">
                        <?php
                            $prev = $page-1;
                            $next = $page+1;
                            $pageNo = 0;
                            $pageNo = ceil($count/10);
                        ?>
                            <li class="page-item">
                            <?php if($count!=0): ?>
                                <?php if($prev==0): ?>
                                <? else: ?>
                                    <a class="page-link" href="<?= $_SESSION["link"] ?>&page=<?= $prev ?>" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                <? endif; ?>
                                </li>
                                <?php for($i=1;$i<=$pageNo;$i++): ?>
                                    <?php if($page==$i): ?>
                                        <li class="page-item"><a class="page-link" style="background-color:red;" ><?= $i ?></a></li>
                                    <? else: ?>
                                        <li class="page-item"><a class="page-link" href="<?= $_SESSION["link"] ?>&page=<?= $i ?>"><?= $i ?></a></li>
                                    <? endif; ?>
                                <?php endfor; ?>
                                <li class="page-item">
                                <?php if($next==$pageNo+1): ?>
                                <? else: ?>
                                    <a class="page-link" href="<?= $_SESSION["link"] ?>&page=<?= $next ?>" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                <? endif; ?>
                            <? endif; ?>
                            </li>
                        </ul>
                    </h4>
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
                        <img class="img-fluid avatar" src="images.php?avatar=<?= $dataU->avatar ?>">
                    </div>
                    <div class="col-4 user-data rounded-end">
                        <h2><?= $dataU->nickname ?></h2>
                        Dołączył: <?= $dateCr2 ?><br>
                        Komentarzy: <?= $dataU->comments ?><br>
                        Obrazków: <?= $dataU->images ?><br>
                        <form action="logout.php" method="post">
                            <button type='submit' class='btn btn-sm btn-danger'>Wyloguj</button>
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
    <script>
        function pokazC(id){
            document.getElementById(id).style.display = "block";
        }

        let token = "<?= (isset($_SESSION["token"])) ? $_SESSION['token'] : null ?>"
    </script>
    <script src='voting.js'></script>
</body>
</html>