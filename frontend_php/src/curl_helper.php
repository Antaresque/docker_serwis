<?php

class CurlHelper {

    // This method will perform an action/method thru HTTP/API calls
    // Parameter description:
    // Method = POST, PUT, GET etc
    // Data = array("param" => "value") ==> index.php?param=value

    public static function perform_http_request($method, $url, $data = false, $token = null)
    {
        $curl = curl_init();

        switch ($method)
        {
            case "POST":
                curl_setopt($curl, CURLOPT_POST, 1);

                if ($data)
                    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
                break;
            case "PUT":
                curl_setopt($curl, CURLOPT_PUT, 1);
                break; 
            default:
                if ($data)
                    $url = sprintf("%s?%s", $url, http_build_query($data));
        }

        // Optional Authentication:
        if($token != null){
            $auth = "Authorization: Bearer $token";
            curl_setopt($curl, CURLOPT_HTTPHEADER, array($auth));
        }

        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        $result = curl_exec($curl);
        $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        
        curl_close($curl);

        return (object) array("status" => $httpcode, "data" => @json_decode($result), "message" => $result);
    }

}