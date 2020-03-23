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
	$file_name = $_POST['file_name'];
	$file_type = $_POST['file_type'];
	$file_size = $_POST['file_size'];
	$file = $_POST['file1'];
	
	
	$comm_id = $_POST['comm_id'];

	$sql = "update communications set comm_file = '$file', file_name = '$file_name', file_type = '$file_type' where comm_id = '$comm_id'";
	
	if(mysqli_query($con, $sql))
	{
		$dets['stat'] = "yes";
		echo json_encode($dets);
	}
	else
	{
		$dets['stat'] = "no";
		echo json_encode($dets);
	}

}

?>