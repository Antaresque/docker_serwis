<?php
    session_start();
    require_once "decodeJWT.php";

    if(!isset($_SESSION["token"]) && decodeJWT($_SESSION['token'])->role != 'admin') {
        header('Location: index.php');
        exit();
    }
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
        if(isset($_SESSION["token"]))
        {
            $Uid = (json_decode(base64_decode(str_replace('_', '/', str_replace('-','+',explode('.', $_SESSION["token"])[1])))))->id;
            $dataU = CurlHelper::perform_http_request("GET", "http://api:4000/users/$Uid")->data;
            $dateCr = date('d.m.Y', strtotime($dataU->createdAt));
            
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
            <div class="col-2 left-col admin-left-col">
                test
            </div>
            <div class="col-10 main-col rounded">
                
            </div>
        <div class="row foot-row">
            <p>Made by: Aleksander Ferens & Adam Bytniewski, 2021</p>
        </div>
    </div>
</body>
</html>