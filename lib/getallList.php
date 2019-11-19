<?php
header('content-type:text/html;charset=utf-8');
    include('./conn.php');

    $currentPage = $_REQUEST['page']; //当前的页数
    $pagesize = 10; //每一次查询的数据数量
    $startRow = ($currentPage-1)*$pagesize;

    $sql = "select * from product limit $startRow,$pagesize";

    $res = $mysqli->query($sql);

    $arr = array();

    while($row = $res->fetch_assoc()){
        array_push($arr,$row);
    }

    $json = json_encode($arr);

    echo $json;

    $mysqli->close();
?>