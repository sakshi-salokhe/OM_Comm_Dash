<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
require "connect.php";
session_start();

$emp = [];

$c = 0;
$emp[$c]['user_id'] = '0';
$emp[$c]['name'] = 'Select Users';

$c++;

$sql = "select user_id, name from users";

if($res = mysqli_query($con, $sql))
{
	while($row = mysqli_fetch_assoc($res))
	{
		$emp[$c]['user_id'] = $row['user_id'];
		$emp[$c]['name'] = $row['name'];
		
		$c++;
	}
	echo json_encode($emp);
}
else
{
	http_response_code(404);
}
?>