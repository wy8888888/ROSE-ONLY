<?php
header('Access-Control-Allow-Origin:*'); // CORS
    include('./conn.php');

    $idList = $_REQUEST['idlist'];

    $sql = "SELECT * FROM `product` WHERE `p_id` IN ($idList)";

    $res = $mysqli->query($sql);

    $arr = array();

    while($row = $res->fetch_assoc()){
        array_push($arr,$row);
    }

    echo $mysqli->error;

    $json = json_encode($arr);

    echo $json;

    $mysqli->close();
?>