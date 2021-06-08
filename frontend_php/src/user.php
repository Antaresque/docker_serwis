<?php
    session_start();
    require_once "decodeJWT.php";
    require_once "curl_helper.php";

    if(isset($_SESSION["token"])) {
        $payload = decodeJWT($_SESSION['token']);
        $role = $payload->role;
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
    $req_img = CurlHelper::perform_http_request("GET", "$URI/images");
 
    $data = ($req->status == 200) ? $req->data : [];
    $data_img = ($req->status == 200) ? $req_img->data : [];
 
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
        <a href="index.php">
            <h2>ABCD</h2>
        </a>
    </nav>
    <div class="container-fluid">
        <div class="row">
            <div>
                dane o uzytkowniku
            </div>
        </div>

        <div class="row">
            <?php foreach($data_img as $img): ?>
            <div>
                obrazki <?= $img->title ?>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
    <div class="row foot-row">
            Made by: Aleksander Ferens & Adam Bytniewski, 2021
    </div>
    <script>
        var dane = '<?=$data?>';
        
        if(dane != "") 
            document.getElementById("table").appendChild(buildHtmlTable(JSON.parse(dane)));
        else
            document.getElementById("table").innerHTML = "Brak rekordów";
    </script>
</body>
</html>