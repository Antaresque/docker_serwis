<?php
    session_start();
    require_once 'curl_helper.php';
    //$file = $_POST["filename"];
    $filename = $_FILES['filename']['tmp_name'];
    $filetype = $_FILES['filename']['type'];
    $file = curl_file_create($filename, $filetype, 'tmp_name');
    $arr = array("file" => $file);
    $string = $_SESSION['link'];
    $data = CurlHelper::perform_multipart_request("POST", "http://api:4000/users/upload", $arr, $_SESSION["token"]);
    print_r($arr);
    print_r($data->status);
    print_r($data->message);
    print_r($data->data);
    header("Location: ".$string);
?>