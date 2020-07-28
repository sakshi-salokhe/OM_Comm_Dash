<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
require "connect.php";
session_start();

$emp = [];

$sql = "select 	comm_reason_id, comm_reason_name from communication_reason";

if($res = mysqli_query($con, $sql))
{
	$c = 0;
	while($row = mysqli_fetch_assoc($res))
	{
		$emp[$c]['comm_reason_id'] = $row['comm_reason_id'];
		$emp[$c]['comm_reason_name'] = $row['comm_reason_name'];
		
		$c++;
	}
	echo json_encode($emp);
}
else
{
	http_response_code(404);
}
?>