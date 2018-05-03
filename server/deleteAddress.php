<?php

    $number = $_GET["number"];
    $func = $_GET["cb"];
//第一种方法:
	$mysql = new mysqli("127.0.0.1", "root", "wanghui", "yihelife");
	if($mysql->connect_error){
        exit("failed:error:$mysql->connect_error");
    }
    $mysql->set_charset("utf8");


    $sqlStr1 = "delete from address where number = '{$number}'";
    $result = $mysql->query($sqlStr1);
    if($result){
        $json = json_encode("delete success!");
        echo "{$func}({$json})";
    }else{
        $json = json_encode("delete failed!");
        echo "{$func}({$json})";
    }

    $mysql->close();
?>