<?php
    session_start();
    require_once "decodeJWT.php";
    require_once "curl_helper.php";

    if(!isset($_SESSION["token"]) && decodeJWT($_SESSION['token'])->role != 'admin') {
        header('Location: index.php');
        exit();
    }

    $token = $_SESSION['token'];
    $tab = isset($_GET['tab']) ? $_GET['tab'] : "users";
    $page = isset($_GET['page']) ? $_GET['page'] : 1;
    $data = "";
    
    if($tab != "users" && $tab != "images" && $tab != "comments"){
        header('Location: index.php');
        exit();
    }

    if(!is_numeric($page) || $page < 1){
        header('Location: index.php');
        exit();
    }

    $URI = "api:4000/$tab";
    $req = CurlHelper::perform_http_request("GET", "$URI?limit=50&page=$page", false, $token);
    $status = $req->status;
    
    if($req->status == 200)
        $data = $req->message;
    
    
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="styleadmin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="generateTable.js"></script>
    <title>Jbzdy2</title>
</head>
<body>
    <nav class="navbar navek sticky-top">
        <a href="index.php">
            <h2>ABCD</h2>
        </a>
    </nav>
    <div class="container-fluid">
        <div class="row mid-row">
            <div class="col-2 left-col admin-left-col">
                <div><a href="admin.php?tab=users">użytkownicy</a></div>
                <div><a href="admin.php?tab=images">obrazki</a></div>
                <div><a href="admin.php?tab=comments">komentarze</a></div>
                <div></div>
            </div>
            <div class="col-10 main-col rounded">
               <div id="table"></div> 
               <div id="buttons">
                    <div id="btn-left">
                        <a href="admin.php?tab=<?=$tab?>&page=<?=$page-1?>">
                            <i class="fa fa-arrow-left fa-4x"></i>
                        </a>
                    </div>
                    <div id="page">
                        <h2><?=$page?></h2>
                    </div>
                    <div id="btn-right">
                        <a href="admin.php?tab=<?=$tab?>&page=<?=$page+1?>">
                            <i class="fa fa-arrow-right fa-4x"></i>
                        </a>
                    </div>
               </div>
            </div>
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