<?php
    session_start();
    require_once 'curl_helper.php';

    $sus = $_POST["username"];
    $pus = $_POST["password"];
    $arr = array("user" => $sus, 
                "pass" => $pus);

    $data = CurlHelper::perform_http_request("POST", "http://api:4000/login/", http_build_query($arr));
    $status = $data->status;
    if($status == 200){
        $_SESSION["token"] = $data->data->token;
        header('Location: index.php');
    }
    else{
        header('Location: login.php?fail=true');
    }
?>