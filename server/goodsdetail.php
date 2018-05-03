<?php
    $func = $_GET["cb"];
    $mysql = new mysqli("127.0.0.1", "root", "wanghui", "yihelife");
    if($mysql->connect_error){
            exit("failed:error:$mysql->connect_error");
        }
        $mysql->set_charset("utf8");
     //查询
    $select ="select * from goodsdetail";
     //执行查询操作
    $res = $mysql->query($select);

    if($res->num_rows!=0){
     //获取数据
        $arr = mysqli_fetch_all($res, MYSQLI_ASSOC);
           $json = json_encode($arr);
           echo "{$func}({$json})";
    }
    	$mysql->close();
?>