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
	$pass = md5($_POST['pass']);
	
	
	$sql = "select * from users where email='$email' and password='$pass'";
	$result = mysqli_query($con,$sql);
    $row = mysqli_fetch_array($result);
	
	
	$admin = $row['isAdmin'];
	$user_id = $row['user_id'];
	
	$count = mysqli_num_rows($result);
	
	if($count == 1) 
	{
        $dets['logged'] = true;
		$dets['user_id'] = $user_id;
		$dets['isAdmin'] = $admin;
		
		echo json_encode($dets);
	}
	
	else
	{
        $dets['logged'] = false;
		$dets['user_id'] = "-1";
		$dets['isAdmin'] = "-1";
		
		echo json_encode($dets);
	}

}

?>