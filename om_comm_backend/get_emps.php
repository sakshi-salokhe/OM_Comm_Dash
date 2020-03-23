<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
require "connect.php";
session_start();

$emp = [];

$sql = "select emp_id, emp_name from employers";

if($res = mysqli_query($con, $sql))
{
	$c = 0;
	while($row = mysqli_fetch_assoc($res))
	{
		$emp[$c]['emp_id'] = $row['emp_id'];
		$emp[$c]['emp_name'] = $row['emp_name'];
		
		$c++;
	}
	echo json_encode($emp);
}
else
{
	http_response_code(404);
}
?>