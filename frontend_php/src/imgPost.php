<?php
    session_start();
    require_once 'curl_helper.php';
    $title = $_POST["title"];
    $desc = $_POST["desc"];
    //$file = $_POST["filename"];
    $filename = $_FILES['filename']['tmp_name'];
    $filetype = $_FILES['filename']['type'];
    $file = curl_file_create($filename, $filetype, 'tmp_name');
    $arr = array("title" => $title, 
                "description" => $desc, 
                "file" => $file);
    $string = $_SESSION['link'];
    $data = CurlHelper::perform_multipart_request("POST", "http://api:4000/images/", $arr, $_SESSION["token"]);
    $status = $data->status;
    if($status==200){
        header("Location: ".$string);
    }
    else{
        header("Location: imgAdd.php?fail=true");
    }
?>