<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
require "connect.php";
session_start();

$emp = [];

$user_id = $_GET['user_id'];

$sql = "select name from users where user_id = '$user_id'";

if($res = mysqli_query($con, $sql))
{
	while($row = mysqli_fetch_assoc($res))
	{
		$emp['user_id'] = $user_id;
		$emp['name'] = $row['name'];
	}
	echo json_encode($emp);
}
else
{
	http_response_code(404);
}
?>