<?php
// 连接数据库
$conn=@mysql_connect("127.0.0.1","root","wanghui")  or die(mysql_error());
@mysql_select_db('yihelife',$conn) or die(mysql_error());

// 判断action
$action = isset($_REQUEST['action'])? $_REQUEST['action'] : '';


// 上传图片
if($action=='add'){

    $image = mysql_escape_string(file_get_contents($_FILES['photo']['tmp_name']));
    $type = $_FILES['photo']['type'];
    $sqlstr = "insert into userdata(type,binarydata) values('".$type."','".$image."')";

    @mysql_query($sqlstr) or die(mysql_error());

    header('location:uploadPicture.php');
    exit();

// 显示图片
}elseif($action=='show'){

    $id = isset($_GET['id'])? intval($_GET['id']) : 0;
    $sqlstr = "select * from userdata where id=$id";
    $query = mysql_query($sqlstr) or die(mysql_error());

    $thread = mysql_fetch_assoc($query);

    if($thread){
        header('content-type:'.$thread['type']);
        echo $thread['binarydata'];
        exit();
    }

}else{
// 显示图片列表及上传表单
?>
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <title> upload image to db demo </title>
 </head>

 <body>
  <form name="form1" method="post" action="uploadPicture.php" enctype="multipart/form-data">
  <p>图片：<input type="file" name="photo"></p>
  <p><input type="hidden" name="action" value="add"><input type="submit" name="b1" value="提交"></p>
  </form>

<?php
    $sqlstr = "select * from userdata order by id desc";
    $query = mysql_query($sqlstr) or die(mysql_error());
    $result = array();
    while($thread=mysql_fetch_assoc($query)){
        $result[] = $thread;
    }
    foreach($result as $val){
        echo '<p><img src=uploadPicture.php?action=show&id='.$val['id'].'&t='.time().'" width="150"></p>';
    }
?>

 </body>
</html>
<?php
}
?>