<?php
	/*
	 * $_GET,$_POST,$_REQUEST只存储简单的字段,复杂信息存储在$FILES全局变量里.
	 */
//	print_r($_POST);
//	echo "<hr>";
	print_r($_FILES);


	//获取图片信息数组
	$imgArr = $_FILES["icon"];
	//图片名
	$imgName = $imgArr["name"];
	//临时路径
	$tempPath = $imgArr["tmp_name"];
	//图片格式
	$imgType = $imgArr["type"];
	
	//判断
	if($imgType != "image/jpeg" && $imgType != "image/png" && $imgType != "image/gif" && $imgType != "image/bmp"){
		 exit("Picture Class Error!");
	}
	
	//通过错误类型进行判断
	
	
	//将图片从临时文件夹转移到指定文件夹里.
	$dirpath = "/phpstudy/www/yhlife/server/icon";
	if(file_exists($dirpath)){
		//如果存在,打开文件夹
		print("Test Directory already exists.\n");
		$dirHandle = opendir($dirpath);
	}else{
		//不存在,创建一个文件夹
		if(mkdir($dirpath)){
			echo "Create Successed!";
			$dirHandle = opendir($dirpath);
		}else{
			echo "Create Failed!";
		}
	}
	//移动图片
	$desPath = $dirpath."/".$imgName;
	echo $desPath;
	$res = move_uploaded_file($tempPath, $desPath);
	if($res){
		echo "Upload Succeed!";
	}else{
		echo "Upload Failed!";
	}
?>