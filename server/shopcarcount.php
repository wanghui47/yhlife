<?php
    $id = $_GET["id"];
    $flag = $_GET["flag"];
    $func = $_GET["cb"];

    header("Content-Type: text/html; charset=UTF-8");
//第一种方法:
	$mysql = new mysqli("127.0.0.1", "root", "wanghui", "yihelife");
	if($mysql->connect_error){
        exit("failed:error:$mysql->connect_error");
    }
    $mysql->set_charset("utf8");

    //查询
    $select ="select * from shopcar where id ='{$id}'";
    //执行查询操作
    $res = $mysql->query($select);
     //查询到的所有数据,都存储在$res对象里,数据的总条数,存储在对象的num_rows属性值里
    if($res->num_rows!=0){
         $arr = mysqli_fetch_all($res,MYSQLI_ASSOC);
        //有该商店的物品
        if($flag=="sub"){
          $count = --$arr[0]["count"];
           $update =  "update shopcar set count = $count where id ='{$id}'";
        }else if($flag=="add"){
         $count = ++$arr[0]["count"];
          $update =  "update shopcar set count = $count where id ='{$id}'";
        }else if($flag=="del"){
          $update =  "delete from shopcar where id ='{$id}'";
         }else if($flag=="checked"){
          $update =  "update shopcar set checked = 1 where id ='{$id}'";
         }
         $res = $mysql->query($update);
    }
    if($res){
       $arr2 = "success";
       $json = json_encode($arr2);
        echo "{$func}({$json})";
    }

	$mysql->close();
?>
