<?php
    // 1. 连接数据库
    include('./conn.php');

    // 业务逻辑
    // 1. 连接数据库
    // 2. 接收数据
    // 3. 验证数据
    // 4. 根据验证结果进行操作 插入/提示

    // 2. 接收数据
    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];
    $email = $_REQUEST['email'];
    $phone = $_REQUEST['phone'];

    // echo "$username  $password  $email  $phone";

    // 3. 验证数据  判断用户名是否存在
    $sql = "select * from user where user_name='$username'";
    $result = $mysqli->query($sql); //执行查询语句

    if($result->num_rows>0){
        // 数据库中有数据
        echo '{"msg":"用户名已存在"}';
        $mysqli->close();
        die;
    }

    $insertSql = "insert into user(user_name,user_pass,user_email,user_phone) values('$username','$password','$email','$phone')";

    // 当使用query函数执行插入操作的时候  返回的是插入的行数
    $res = $mysqli->query($insertSql);

    if($res){
        echo '{"msg":"注册成功"}';
    }

    $mysqli->close();
    // echo $insertSql;
?>