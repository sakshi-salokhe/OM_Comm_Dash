<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
require "connect.php";

session_start();

$postdata = file_get_contents("php://input");
$emp = [];

if(isset($postdata) && !empty($postdata))
{
	
	$user_id = $_POST['user_id'];
	
	$empl = $_POST['empl'];
	
	$sql = "select emp_name from employers where emp_id = '$empl'";
	
	$res = mysqli_query($con, $sql);
	$row = mysqli_fetch_assoc($res);
		
	$emp['user_id'] = $user_id;
	$emp['emp_name'] = $row['emp_name'];
	
	echo json_encode($emp);
}
else
{
	http_response_code(404);
}

?>