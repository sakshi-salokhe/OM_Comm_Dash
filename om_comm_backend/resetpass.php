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
	$unique_code = $_POST['unique_code'];
	
	$q1 = "select * from users where email = '$email' limit 1";
	$res = mysqli_query($con, $q1);
	$row = mysqli_fetch_assoc($res);
	
	if($unique_code == $row['resetPassCode'])
	{
		$q2 = "update users set password = '$pass' where email = '$email' limit 1";
		$res2 = mysqli_query($con, $q2);
		
		$dets['result'] = 'success';
		echo json_encode($dets);
	}
	else
	{
		$dets['result'] = 'failure';
		echo json_encode($dets);
	}
	
}
?>