<?php
    session_start();
    require_once 'curl_helper.php';
    $id = $_POST["id"];
    $content = $_POST["content"];
    $arr = array("comment" => $content);
    $string = $_SESSION['link'];
    $data = CurlHelper::perform_http_request("POST", "http://api:4000/images/$id/comments/", http_build_query($arr), $_SESSION["token"])->data;
    //echo $data;
    header("Location: ".$string);
?>