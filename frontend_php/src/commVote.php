<?php
    session_start();
    require_once 'curl_helper.php';
    $id = $_GET["id"];
    $Uid = $_GET["Uid"];
    $ex = $_GET["exists"];
    $string = $_SESSION['link'];
    
    if($ex == "false"){
        $data = CurlHelper::perform_http_request("POST", "http://api:4000/comments/$id/votes/", false, $_SESSION["token"])->data;
        header("Location: ".$string);
    }
    else if($ex == "true"){
        $data = CurlHelper::perform_http_request("DELETE", "http://api:4000/comments/$id/votes/", false, $_SESSION["token"])->data;
        header("Location: ".$string);
    }
    else{
        echo "ups";
    }
?>