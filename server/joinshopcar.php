<?php
    $phonenumber = $_GET["phonenumber"];
    $shop = $_GET["shop"];
    $name = $_GET["name"];
    $size = $_GET["size"];
    $color = $_GET["color"];
    $count = $_GET["count"];
    $src = $_GET["src"];
    $price = $_GET["price"];
    $func = $_GET["cb"];
    header("Content-Type: text/html; charset=UTF-8");
//第一种方法:
	$mysql = new mysqli("127.0.0.1", "root", "wanghui", "yihelife");
	if($mysql->connect_error){
        exit("failed:error:$mysql->connect_error");
    }
    $mysql->set_charset("utf8");

    //查询
    $select ="select * from shopcar where phonenumber ='{$phonenumber}' and shop='{$shop}' and name='{$name}' and size='{$size}' and color='{$color}'";
    //执行查询操作
    $res = $mysql->query($select);
     //查询到的所有数据,都存储在$res对象里,数据的总条数,存储在对象的num_rows属性值里
    if($res->num_rows!=0){
         $arr = mysqli_fetch_all($res,MYSQLI_ASSOC);
        //有该商店的物品
            $count = $arr[0]["count"]+$count;
            //插入操作
             $update =  "update shopcar set count = $count where phonenumber='{$phonenumber}' and shop='{$shop}' and name='{$name}' and size='{$size}' and color='{$color}'";
            $res = $mysql->query($update);
    }else{
        //没有就直接插入
         //添加商品
          $insert = "insert into shopcar (phonenumber, shop, name, size, color, src, price, count) values ('{$phonenumber}', '{$shop}', '{$name}', '{$size}','{$color}', '{$src}', '{$price}','{$count}')";
           $res = $mysql->query($insert);
    }
    if($res){
       $arr2 = "success";
       $json = json_encode($arr2);
        echo "{$func}({$json})";
    }

	$mysql->close();
?>
