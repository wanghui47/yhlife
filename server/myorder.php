<?php
$phonenumber=$_GET["phonenumber"];

$flag=$_GET["flag"];
$func=$__GET["cb"];
//
$bianhao=$_GET["bianhao"];
     $addr=$_GET["addrid"];

//$phonenumber=15537881196;
//$flag="insert";
////$bianhao=1253;
// $addr=9999;
 header("Content-Type: text/html; charset=UTF-8");
//
//
$mysql = new mysqli("127.0.0.1", "root", "wanghui", "yihelife");
//	if($mysql->connect_error){
//        exit("failed:error:$mysql->connect_error");
//    }
    $mysql->set_charset("utf8");
//
//
    if($flag=="insert"){
     //查询
      $select ="select * from shopcar where phonenumber ='{$phonenumber}' and checked=1";
       //执行查询操作
       $res = $mysql->query($select);
     if($res->num_rows!=0){
          $arr = mysqli_fetch_all($res,MYSQLI_ASSOC);
          for($i=0;$i<count($arr);$i++){
            //做插入操作
            $select ="insert into myorder (phonenumber,shop,name,size,color,price,count,serialnumber) values ('{$phonenumber}', '{$arr[$i]['shop']}','{$arr[$i]['name']}','{$arr[$i]['size']}','{$arr[$i]['color']}','{$arr[$i]['price']}','{$arr[$i]['count']}','{$bianhao}')";
//                   //执行查询操作
                   $res = $mysql->query($select);
////echo $arr[$i]["count"];
          }
        $select1 = "update myorder set addressid = '{$addr}' where serialnumber = '{$bianhao}' and phonenumber  = '{$phonenumber}'";
        $res1 = $mysql->query($select1);
        if($res1){
                 $str="success";
                 $json = json_encode($str);
                 echo "{$func}({$json})";
        }

      }

    }

 $mysql->close();
?>