<?php

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
?>