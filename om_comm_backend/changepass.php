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
	$uid = $_POST['user_id'];
	$email = $_POST['email'];
	
	$oldpass = md5($_POST['oldpass']);
	$newpass = md5($_POST['pass']);
	$conf_newpass = $_POST['confirm_password'];
	
	$sql = "select * from users where email='$email' and password='$oldpass'";
	$result = mysqli_query($con,$sql);
    $row = mysqli_fetch_array($result);
	
	$count = mysqli_num_rows($result);
	
	if($uid != $row['user_id'])
	{
		
		$dets['changed'] = "error";
		echo json_encode($dets);
		
	}
	else
	{
		if($count == 1)
		{
			$q = "UPDATE users SET password='$newpass' WHERE email='$email'";
			if (mysqli_query($con, $q))
			{
				$dets['changed'] = "success";
				
				echo json_encode($dets);
				http_response_code(200);
			}
			else
			{
				$dets['changed'] = "error";
				
				echo json_encode($dets);
				http_response_code(422);
			}
		}
		else
		{
			$dets['changed'] = "error";
			
			echo json_encode($dets);
			http_response_code(422);
		}
	}
}
?>