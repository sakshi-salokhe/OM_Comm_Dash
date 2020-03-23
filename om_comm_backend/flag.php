<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
require "connect.php";

session_start();

$emp = [];
	
$comm_id = $_GET['comm_id'];

$sql = "update communications set comm_flag = 1 where comm_id = '$comm_id'";

if($res = mysqli_query($con, $sql))
{
	$row = mysqli_fetch_assoc($res);
	
	$emp['stat'] = "yes";
	echo json_encode($emp);
}
else
{
	http_response_code(404);
}


?>
?>