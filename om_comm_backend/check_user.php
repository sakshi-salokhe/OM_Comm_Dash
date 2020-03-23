<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
require "connect.php";
session_start();

$dets = [];

$user_id = $_GET['user_id'];

$sql = "select * from users where user_id = '$user_id'";

$result = mysqli_query($con,$sql);
$row = mysqli_fetch_array($result);
$count = mysqli_num_rows($result);

if($count > 0)
{
	$isAdmin = $row['isAdmin'];
	if($isAdmin == 1 or $isAdmin == '1')
	{
		$ans = "yes";
	}
	else
	{
		$ans = "no";
	}
	$dets['ans'] = $ans;
	echo json_encode($dets);
}
else
{
	$dets['ans'] = "-1";
	echo json_encode($dets);
}
?>