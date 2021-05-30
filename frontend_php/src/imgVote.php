<?php
    session_start();
    require_once 'curl_helper.php';
    $id = $_GET["id"];
    $Uid = $_GET["Uid"];
    $ex = $_GET["exists"];
    
    if($ex){
        $data = CurlHelper::perform_http_request("DELETE", "http://api:4000/images/$id/votes/", false, $_SESSION["token"])->data;
    }
    else{
        $data = CurlHelper::perform_http_request("POST", "http://api:4000/images/$id/votes/", false, $_SESSION["token"])->data;
    }
?>