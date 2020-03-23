<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
require "connect.php";

session_start();

$postdata = file_get_contents("php://input");
$dets = [];

if(isset($postdata) && !empty($postdata))
{
	
	$email = $_POST['email'];
	$name = $_POST['name'];
	$pass = md5($_POST['pass']);
	$isAdmin = 0;
	
	$val_query = "SELECT * from users where email='$email'";
	$res = mysqli_query($con, $val_query);
	$count = mysqli_num_rows($res);
	
	if($count>0) 
	{
		
		$dets['registered'] = "false";
		$dets['email'] = $email;
		
		echo json_encode($dets);	
	}
	else
	{
		$sql = "insert into users(email, name, password, isAdmin) values ('$email', '$name', '$pass', '$isAdmin')";
		
		if(mysqli_query($con, $sql))
		{
			$dets['registered'] = "true";
			$dets['email'] = $email;
		}
		else
		{
			$dets['registered'] = "false";
			$dets['email'] = $email;
			
			echo json_encode($dets);
		}
	}

}

?>