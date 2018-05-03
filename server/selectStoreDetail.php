<?php
    header("Content-Type: text/html; charset=UTF-8");
    $searchWord = $_GET["searchWord"];
    $func = $_GET["cb"];


    if($searchWord == ""){
        $arr1 = "sreach word is null";
        $json = json_encode($arr1);
        echo "{$func}({$json})";
    }else{
        $mysql = new mysqli("127.0.0.1", "root", "wanghui", "yihelife");
        if($mysql->connect_error){
            exit("failed:error:$mysql->connect_error");
        }
        $mysql->set_charset("utf8");


        //select * from student where 字段 like '%张%'(模糊查询)
        $sqlStr1 = "select * from store where name like '%{$searchWord}%'";
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
    }



?>