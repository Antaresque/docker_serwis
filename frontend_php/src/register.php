<?php
    require_once 'curl_helper.php';
    
    $sus = $_POST["username"];
    $pus = $_POST["password"];
    $pus2 = $_POST["passwordR"];
    $emus = $_POST["email"];

    if($pus == $pus2){
        $arr = array("user" => $sus, 
                    "pass" => $pus,
                    "email" => $emus);
        echo http_build_query($arr) . "\n";
        $data = CurlHelper::perform_http_request("POST", "http://api:4000/login/", $arr);
        echo $data;
    }
    
?>