<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
require "connect.php";
session_start();

$emp = [];

$sql = "select comm_type_id, comm_type_name from comm_type";

if($res = mysqli_query($con, $sql))
{
	$c = 0;
	while($row = mysqli_fetch_assoc($res))
	{
		$emp[$c]['comm_type_id'] = $row['comm_type_id'];
		$emp[$c]['comm_type_name'] = $row['comm_type_name'];
		
		$c++;
	}
	echo json_encode($emp);
}
else
{
	http_response_code(404);
}
?>