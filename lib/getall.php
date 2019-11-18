<?php
header('Access-Control-Allow-Origin:*'); // CORS
    include('./conn.php');

    $sql = "select * from product" ;

    
    $res = $mysqli->query($sql);

    // echo '1';
    // die;
    $arr = array();

    while($row = $res->fetch_assoc()){
        array_push($arr,$row);
    }

    $json = json_encode($arr);

    echo $json;

    $mysqli->close();
?>