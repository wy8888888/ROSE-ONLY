<?php
header('Access-Control-Allow-Origin:*'); // CORS
    include('./lib/conn.php');

    // 接收前端发送的数据
    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];

    $sql = "select * from user where username='$username' and userpass='$password'";
  

    $res = $mysqli->query($sql);

    if($res->num_rows>0){
        echo '{"msg":"登陆成功！"}';
    }else{
        echo '{"msg":"用户名或密码错误,请重新输入!"}';
    }

    $mysqli->close();
?>