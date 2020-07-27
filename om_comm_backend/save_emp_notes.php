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
	$notes = $_POST['notes'];
	$today = date("Y-m-d");
	
	$q1 = "select * from emp_notes where emp_id = '$empl'";
	$r1 = mysqli_query($con, $q1);
	$count = mysqli_num_rows($r1);
	
	if($count > 0)
	{
		$q2 = "update emp_notes set user_id = '$user_id', when_done = '$today', notes = '$notes' where emp_id = '$empl'";
	}
	else
	{
		$q2 = "insert into emp_notes(emp_id, user_id, when_done, notes) values ('$empl', '$user_id', '$today', '$notes')";
	}
	
	if(mysqli_query($con, $q2))
	{
		$emp['stat'] = 'success';
		echo json_encode($emp);
	}
	else
	{
		http_response_code(404);
	}
}
else
{
	http_response_code(404);
}

?>