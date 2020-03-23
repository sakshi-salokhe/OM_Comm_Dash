<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
require "connect.php";

session_start();

$emp = [];
	
$user_id = $_GET['user_id'];

$empl = $_GET['empl'];
$sql = "select * from employers where emp_id = '$empl'";

if($res = mysqli_query($con, $sql))
{
	$row = mysqli_fetch_assoc($res);
	
	$emp['user_id'] = $user_id;
	$emp['empl'] = $empl;
	
	$emp['employer_ID'] = $row['employer_ID'];
	$emp['emp_name'] = $row['emp_name'];
	$emp['emp_dept'] = $row['emp_dept'];
	$emp['emp_add1'] = $row['emp_add1'];
	$emp['emp_add2'] = $row['emp_add2'];
	$emp['emp_suite'] = $row['emp_suite'];
	$emp['emp_city'] = $row['emp_city'];
	$emp['emp_state'] = $row['emp_state'];
	$emp['emp_zip'] = $row['emp_zip'];
	$emp['emp_country'] = $row['emp_country'];
	$emp['emp_phone'] = $row['emp_phone'];
	$emp['emp_ext'] = $row['emp_ext'];
	$emp['emp_fax'] = $row['emp_fax'];
	$emp['emp_primary_contact'] = $row['emp_primary_contact'];
	$emp['emp_email'] = $row['emp_email'];
	
	echo json_encode($emp);
}
else
{
	http_response_code(404);
}


?>