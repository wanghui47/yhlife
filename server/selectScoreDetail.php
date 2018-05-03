<?php

    $phonenumber = $_GET["phonenumber"];
    $func = $_GET["cb"];

//第一种方法:
	$mysql = new mysqli("127.0.0.1", "root", "wanghui", "yihelife");
	if($mysql->connect_error){
        exit("failed:error:$mysql->connect_error");
    }
    $mysql->set_charset("utf8");


    $sqlStr1 = "select * from score where phonenumber = '{$phonenumber}' order by date asc,time asc";
    $result = $mysql->query($sqlStr1);
    if($result->num_rows == 0){
        $arr1 = "select failed";
        $json = json_encode($arr1);
        echo "{$func}({$json})";
    }else{
        $arr = mysqli_fetch_all($result, MYSQLI_ASSOC);
        //	print_r json_encode($arr);
        $json = json_encode($arr);
        echo "{$func}({$json})";
    }
    $mysql->close();
?>