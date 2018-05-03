<?php

    $phonenumber = $_GET["phonenumber"];
    $func = $_GET["cb"];
//第一种方法:
	$mysql = new mysqli("127.0.0.1", "root", "wanghui", "yihelife");
	if($mysql->connect_error){
        exit("failed:error:$mysql->connect_error");
    }
    $mysql->set_charset("utf8");
    
    //插入(正常)
    //insert into 表名 (字段1, 字段2, ..., 字段n) values (值1, 值2, ..., 值3)
	//例如: insert into student (name, gender, age) values (‘keke’, '女', 38)
//	$sqlStr = "insert into users (id, name) values ('8', 'hello')";
//	$res = $mysql->query($sqlStr);
//	if($res){
//		echo "insert success!";
//	}else{
//		echo "insert failed!";
//	}	
	
	
	

	//删除()
//	$sqlStr1 = "delete from users where id=1";
//	$res = $mysql->query($sqlStr1);
//	if($res){
//		echo "delete success!";
//	}else{
//		echo "delete failed!";
//	}
	
	//修改()
//	$sqlStr1 = "update users set name = '你妹' where id = 7";
//	$res = $mysql->query($sqlStr1);
//	if($res){
//		echo "update success!";
//	}else{
//		echo "update failed!";
//	}

	//查询(正常)
	//	$selectStr = "select * from users";
	//	$result = $mysql->query($selectStr);
	//	$arr = mysqli_fetch_all($result, MYSQLI_ASSOC);
	//	echo json_encode($arr);

	$sqlStr1 = "select * from userdata where phonenumber = '{$phonenumber}'";
	$result = $mysql->query($sqlStr1);
	if($result->num_rows == 0){
		exit("select failed!");
	}
	$arr = mysqli_fetch_all($result, MYSQLI_ASSOC);
//	print_r json_encode($arr);
    $json = json_encode($arr);
    echo "{$func}({$json})";

	$mysql->close();
?>
 