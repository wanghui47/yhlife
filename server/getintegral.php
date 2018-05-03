<?php
 $phonenumber = $_GET["phonenumber"];
$func=$_GET["cb"];
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
    if($res->num_rows!=0){
         //有数据
         $arr = mysqli_fetch_all($res, MYSQLI_ASSOC);
          $a=(string)$arr[0]["Integral"];
          $json = json_encode($a);
           echo "{$func}({$json})";
     }
        $mysql->close();
?>