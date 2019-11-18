<?php
header('Access-Control-Allow-Origin:*'); // CORS
    // 1. 连接数据库
    include('./conn.php');

    // 2. 接收数据
    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];

    // 3. 验证数据  判断用户名是否存在
    $sql = "select * from user where username='$username'";
    $result = $mysqli->query($sql); //执行查询语句

    // var_dump($username);
    // die;

    if($result->num_rows>0){
    //    echo '{"msg":"用户名已存在"}';
        $mysqli->close();
        die;
    }

    $insertSql = "insert into user(username,userpass) values($username,'$password')";


    // 当使用query函数执行插入操作的时候  返回的是插入的行数
    $res = $mysqli->query($insertSql);
    if($res){
        echo '<script>alert('注册成功');location.href(./shouye.html);</script>';
        // echo '{"msg":"注册成功！","url":"http://127.0.0.1:8080/rose-only.com/src/html/shouye.html"}';
    }
    $mysqli->close();
    // echo $insertSql;
?>
