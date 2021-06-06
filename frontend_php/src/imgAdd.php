<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <title>Jbzdy2</title>
</head>
<body>
    <?php
        require_once 'curl_helper.php';

        $data = CurlHelper::perform_http_request("GET", "http://api:4000/images");
        $dataIm = CurlHelper::perform_http_request("GET", "http://api:4000/images");
    ?>  
    <nav class="navbar navek sticky-top">
        <a href="index.php">
            <h2>ABCD</h2>
        </a>
    </nav>
    <div class="container-fluid">
        <div class="row mid-row">
            <div class="col-3 left-col">
            </div>
            <div class="col-6 main-col rounded" align="center">
                    <div class="row">
                        <div class="col-3"></div>
                        <div class="col-6 img-main rounded">
                            <p></p>
                            <form action="imgPost.php" method="post">
                                <h1>Dodaj obrazek!</h1><p></p>
                                <h3><input type="text" name="title" style="min-width: 80%" value="" placeholder="Tytuł obrazka"></h3>
                                <p></p>
                                <textarea name="content" style="min-width: 80%" rows="5" placeholder="Opis obrazka"></textarea>
                                <p></p>
                                <p></p>
                                <input type="file" id="myFile" name="filename">
                                <p></p>
                                <button type='submit' class='btn btn-lg btn-light'>Dodaj</button>
                                <p></p>
                            </form>
                        </div>
                        <div class="col-3"></div>
                    </div>
                    <p></p>
            </div>
            <div class="col-3 right-col">
            </div>
        </div>
        <div class="row foot-row">
            <p>Made by: Aleksander Ferens & Adam Bytniewski, 2021</p>
        </div>
    </div>
</body>
</html>