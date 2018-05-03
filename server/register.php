<?php
    $phonenumber = $_GET["phonenumber"];
    $password = $_GET["password"];
    $func = $_GET["cb"];

//第一种方法:
	$mysql = new mysqli("127.0.0.1", "root", "wanghui", "yihelife");
	if($mysql->connect_error){
        exit("failed:error:$mysql->connect_error");
    }
    $mysql->set_charset("utf8");

    //查询
    $select ="select * from userdata where phonenumber ='{$phonenumber}'";
    //执行查询操作
    $res = $mysql->query($select);
     //查询到的所有数据,都存储在$res对象里,数据的总条数,存储在对象的num_rows属性值里
    if($res->num_rows==0){
        $insert = "insert into userdata (phonenumber, password) values ('{$phonenumber}', '{$password}')";
        //执行插入操作
         $insert1 = $mysql->query($insert);
         if($insert1){
         //插入成功
            $arr3 = array("flag"=>"false","phonenumber"=>"注册成功,请登录!!!");
            $json = json_encode($arr3);
            echo "{$func}({$json})";
         }else{
            //插入失败

         }
    }else{
        $arr2 = array("flag"=>"true","phonenumber"=>"该手机号已存在,请换手机号,重新注册");
    	$json = json_encode($arr2);
        echo "{$func}({$json})";
    }
	$mysql->close();
?>
