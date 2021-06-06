<?php
    session_start();
    require_once 'curl_helper.php';
    $title = $_POST["title"];
    $desc = $_POST["desc"];
    //$file = $_POST["filename"];
    $filename = $_FILES['filename']['name'];
    $filetype = $_FILES['filename']['type'];
    $file = curl_file_create($filename, $filetype, 'tmp_name');
    $arr = array("title" => $title, 
                "description" => $desc, 
                "file" => $file);
    $string = $_SESSION['link'];
    $data = CurlHelper::perform_http_request("POST", "http://api:4000/images/", $arr, $_SESSION["token"]);
    print_r($arr);
    print_r($data->status);
    print_r($data->message);
    print_r($data->data);
    //header("Location: ".$string);
?>