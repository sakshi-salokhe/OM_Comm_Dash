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
	
	$user_id = $_POST['user_id'];
	$empl = $_POST['empl'];
	$ctype = $_POST['ctype'];
	$notes = $_POST['notes'];
	$comm_response = $_POST['comm_response'];
	$comm_reason = $_POST['comm_reason'];
	//$file = $_POST['file'];
	$flag = 0;
	$date = date("Y-m-d");
	
	
	$sql = "insert into communications(user_id, emp_id, comm_type_id, comm_reason_id, comm_date, comm_response, comm_notes, comm_flag) values ('$user_id', '$empl', '$ctype', '$comm_reason', '$date', '$comm_response', '$notes', '$flag')";
	
	if(mysqli_query($con, $sql))
	{
		$sql1 = "select * from communications order by comm_id desc limit 1";
		$res = mysqli_query($con, $sql1);
		$row = mysqli_fetch_assoc($res);
		
		$dets['entry'] = "true";
		$dets['comm_id'] = $row['comm_id'];
		echo json_encode($dets);
	}
	else
	{
		$dets['entry'] = "false";
		echo json_encode($dets);
	}

}

?>