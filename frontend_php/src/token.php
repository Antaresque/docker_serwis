<?php


    @session_start();

    if(isset($_SESSION['token']))
        echo $_SESSION['token'];
