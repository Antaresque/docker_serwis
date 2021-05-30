<?php
    session_start();
    require_once 'curl_helper.php';
    $id = $_GET["id"];
    $Uid = $_GET["Uid"];
    $exists = CurlHelper::perform_http_request("GET", "http://api:4000/images/$id/votes/$Uid")->data;
    
?>