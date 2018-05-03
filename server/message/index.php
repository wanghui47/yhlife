<?php
/**
 * 发送模板短信
 * @author  chensheng
***/
//发验证码的手机号
$number = $_REQUEST['mobile'];

//修改数据库时候的手机号(用户名)
$phonenumber = $_REQUEST['phonenumber'];

//用户输入的密码
$password = $_REQUEST['password'];

$fn = $_REQUEST["callback"];
$action = $_REQUEST["action"];


//使用示例
if($action == "message"){
    require('./ServerAPI.php');
    //网易云信分配的账号，请替换你在管理后台应用下申请的Appkey
    $AppKey = '559176fdc75f4d28d9072a5273f02c03';
    //网易云信分配的账号，请替换你在管理后台应用下申请的appSecret
    $AppSecret = 'fd6d67a7c2cb';
    $p = new ServerAPI($AppKey,$AppSecret,'fsockopen');     //fsockopen伪造请求

    //发送模板短信
    //print_r($p->sendSMSTemplate(15649366192));
     $json = json_encode($p->sendSMSTemplate($number));
     echo "{$fn}($json)";
}else if($action == "database"){

    $mysql = new mysqli("127.0.0.1", "root", "wanghui", "yihelife");
    if($mysql->connect_error){
        exit("failed:error:$mysql->connect_error");
    }
    $mysql->set_charset("utf8");

    $sqlStr0 = "select phonenumber from userdata where phonenumber = '{$number}'";
    $res0 = $mysql->query($sqlStr0);

    if($res0->num_rows != 0){
        //要修改的手机号已经被注册
        $json0 = json_encode("user exist!");
        echo "{$fn}({$json0})";
    }else{

        //要修改的手机号没有被注册,那么就查询密码
        $sqlStr1 = "select password from userdata where phonenumber = '{$phonenumber}'";
        $res = $mysql->query($sqlStr1);
        $arr = mysqli_fetch_all($res, MYSQLI_ASSOC);

        //查询结果(比对开始)
        if($arr[0]["password"] == $password){
            $sqlStr2 = "update userdata set phonenumber = '{$number}' where phonenumber = '{$phonenumber}'";
            $res1 = $mysql->query($sqlStr2);

            $sqlStr3 = "update address set phonenumber = '{$number}' where phonenumber = '{$phonenumber}'";
            $res2 = $mysql->query($sqlStr3);

            $sqlStr4 = "update score set phonenumber = '{$number}' where phonenumber = '{$phonenumber}'";
            $res3 = $mysql->query($sqlStr4);

            $sqlStr5 = "update shopcar set phonenumber = '{$number}' where phonenumber = '{$phonenumber}'";
            $res4 = $mysql->query($sqlStr5);

            if($res1 && $res2 && $res3 && $res4){
                $json1 = json_encode("update success!");
                echo "{$fn}({$json1})";
            }else{
                $json2 = json_encode("update failed!");
                echo "{$fn}({$json2})";
            }
        }else{
            $json3 = json_encode("password error!");
            echo "{$fn}({$json3})";
        }
        //查询结果(比对结束)
    }
    $mysql->close();
}

?>