<?php
session_start();
if(!isset($_SESSION["token"])){
    header("Location: index.php");
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

        $data = CurlHelper::perform_http_request("GET", "http://api:4000/images");
        $dataIm = CurlHelper::perform_http_request("GET", "http://api:4000/images");
    ?>  
    <nav class="navbar navek sticky-top">
        <div class="col-1">
            
        </div>
        <div class="col-9">
            <a href="index.php">
                <h2>ABCD</h2>
            </a>
        </div>
        <div class="col-2 pull-right">
            
        </div>
    </nav>
    <div class="container-fluid">
        <div class="row mid-row">
            <div class="col-3 left-col">
            </div>
            <div class="col-6 main-col rounded" align="center">
                    <div class="row">
                        <div class="col-3"></div>
                        <div class="col-6 img-main rounded">
                            <p></p>
                            <form action="avtPost.php" method="post" enctype="multipart/form-data">
                                <h1>Zmień avatar!</h1><p></p>
                                <p></p>
                                <input type="file" accept="image/png, image/jpeg, image/gif" id="myFile" name="filename">
                                <p></p>
                                <button type='submit' class='btn btn-lg btn-light'>Zmień</button>
                                <p></p>
                            </form>
                        </div>
                        <div class="col-3"></div>
                    </div>
                    <p></p>
            </div>
            <div class="col-3 right-col">
            </div>
        </div>
        <div class="row foot-row">
            <p>Made by: Aleksander Ferens & Adam Bytniewski, 2021</p>
        </div>
    </div>
</body>
</html>