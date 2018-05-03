<?php

    $name = $_GET["name"];
    $address = $_GET["address"];
    $street = $_GET["street"];
    $contact = $_GET["contact"];
    $phonenumber = $_GET["phonenumber"];
    $func = $_GET["cb"];
//第一种方法:
	$mysql = new mysqli("127.0.0.1", "root", "wanghui", "yihelife");
	if($mysql->connect_error){
        exit("failed:error:$mysql->connect_error");
    }
    $mysql->set_charset("utf8");


    //insert into 表名 (字段1, 字段2, ..., 字段n) values (值1, 值2, ..., 值3)
    $sqlStr1 = "insert into address(name, address, street, contact, phonenumber) values ('{$name}', '{$address}', '{$street}', '{$contact}', '{$phonenumber}')";
    $result = $mysql->query($sqlStr1);
    if($result){
        $json = json_encode("insert success!");
        echo "{$func}({$json})";
    }else{
        $json = json_encode("insert failed!");
        echo "{$func}({$json})";
    }

    $mysql->close();
?>