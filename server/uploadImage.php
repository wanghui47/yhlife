<?php
	/*
	 * $_GET,$_POST,$_REQUEST只存储简单的字段,复杂信息存储在$FILES全局变量里.
	 */
//	print_r($_POST);
//	echo "<hr>";
//	print_r($_FILES);

    //获取用户手机号(用户名)方便往数据库存储用户新提交的头像在服务器的src
    $phonenumber = $_POST["phone"];
    $nickname = $_POST["nickname"];
    $sex = $_POST["sex"];
    $year = $_POST["year1"];
    $month = $_POST["month1"];
    $day = $_POST["day1"];


	//获取图片信息数组
	$imgArr = $_FILES["icon"];
	//图片名
	$imgName = $imgArr["name"];

	//临时路径
	$tempPath = $imgArr["tmp_name"];
	//图片格式
	$imgType = $imgArr["type"];


    if($imgName != ""){
        //判断
        if($imgType != "image/jpeg" && $imgType != "image/png" && $imgType != "image/gif" && $imgType != "image/bmp" && $imgType != "image/jpg"){
             exit("image class error!");
        }

        //通过错误类型进行判断


        //将图片从临时文件夹转移到指定文件夹里.
        $dirpath = "icon";
        if(file_exists($dirpath)){
            //如果存在,打开文件夹
            $dirHandle = opendir($dirpath);
        }else{
            //不存在,创建一个文件夹
            if(mkdir($dirpath,0777,true)){
                chmod($dirpath, 0777);
                echo "create success";
                $dirHandle = opendir($dirpath);
            }else{
                echo "create failed";
            }
        }


        //移动图片
        $desPath = $dirpath."/".$imgName;
        $res = move_uploaded_file($tempPath, $desPath);
        if($res){
            chmod($dirpath, 0777);

            $picsrc = "http://101.132.96.6/yhlife/server/".$desPath;
            //当上传图片成功之后往数据库存储用户上传的图片的src
            $mysql = new mysqli("127.0.0.1", "root", "wanghui", "yihelife");
            if($mysql->connect_error){
                exit("failed:error:$mysql->connect_error");
            }
            $mysql->set_charset("utf8");


            $sqlStr1 = "update userdata set picsrc = '{$picsrc}',nickname = '{$nickname}',sex = '{$sex}',year = '{$year}',month = '{$month}',day = '{$day}' where phonenumber = '{$phonenumber}'";
            $result = $mysql->query($sqlStr1);

            if($result){
    //            echo "".$picsrc;
                echo "<script>alert('update data success');</script>";
    //              header("Location: http://101.132.96.6/yhlife/index.html#/person");

            }else{
    //            echo "update data failed";
                echo "<script>alert('update data failed')</script>";
            }

        }else{
            chmod($dirpath, 0777);
    //		echo "upload failed";
            echo "<script>alert('upload failed')</script>";
        }
    }else{
        $mysql = new mysqli("127.0.0.1", "root", "wanghui", "yihelife");
        if($mysql->connect_error){
            exit("failed:error:$mysql->connect_error");
        }
        $mysql->set_charset("utf8");


        $sqlStr1 = "update userdata set nickname = '{$nickname}',sex = '{$sex}',year = '{$year}',month = '{$month}',day = '{$day}' where phonenumber = '{$phonenumber}'";
        $result = $mysql->query($sqlStr1);

        if($result){
//            echo "".$picsrc;
            echo "<script>alert('update data success and pic keep still');</script>";
//              header("Location: http://101.132.96.6/yhlife/index.html#/person");

        }else{
//            echo "update data failed";
            echo "<script>alert('update data failed')</script>";
        }
    }

?>