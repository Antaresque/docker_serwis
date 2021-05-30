<?php
    session_start();
    require_once 'curl_helper.php';
    $id = $_GET["id"];
    $Uid = $_GET["Uid"];
    $data = CurlHelper::perform_http_request("GET", "http://api:4000/comments/$id/votes/$Uid")->data;
    
?>