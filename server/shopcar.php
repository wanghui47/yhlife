<?php
    $phonenumber = $_GET["phonenumber"];
    $flag=$_GET["flag"];
    $func = $_GET["cb"];

    header("Content-Type: text/html; charset=UTF-8");
//第一种方法:
	$mysql = new mysqli("127.0.0.1", "root", "wanghui", "yihelife");
	if($mysql->connect_error){
        exit("failed:error:$mysql->connect_error");
    }
    $mysql->set_charset("utf8");
    //查询
    if($flag=="shopcar"){
         $select ="select * from shopcar where phonenumber ='{$phonenumber}'";
    }else if($flag=="addr"){
        $select ="select * from address where phonenumber ='{$phonenumber}'";
    }

    //执行查询操作
    $res = $mysql->query($select);
    //查询到的所有数据,都存储在$res对象里,数据的总条数,存储在对象的num_rows属性值里


    $arr = mysqli_fetch_all($res, MYSQLI_ASSOC);
    $json = json_encode($arr);
    echo "{$func}({$json})";

	$mysql->close();
?>