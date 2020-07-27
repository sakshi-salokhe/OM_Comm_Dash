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
	
	$sql1 = "select * from emp_notes where emp_id = '$empl'";
	$res1 = mysqli_query($con, $sql1);
	$row1 = mysqli_fetch_assoc($res1);
	
	$emp['emp_notes'] = $row1['notes'];

	$sql2 = "select * from emp_details where emp_id = '$empl'";
	$res2 = mysqli_query($con, $sql2);
	$row2 = mysqli_fetch_assoc($res2);
	
	//0: no 1:yes 2:blank
	$emp['email_invoices'] = isset($row2['email_invoices']) ? $row2['email_invoices'] : '0';
	$emp['mail_invoices'] = isset($row2['mail_invoices']) ? $row2['mail_invoices'] : '1';
	$emp['portal_invoices'] = isset($row2['portal_invoices']) ? $row2['portal_invoices'] : '0';
	$emp['portal_login'] = $row2['portal_login'];
	$emp['fiscal_year_end'] = isset($row2['fiscal_year_end']) ? $row2['fiscal_year_end'] : '12';
	$emp['encryp_emails'] = isset($row2['encryp_emails']) ? $row2['encryp_emails'] : '2';
	$emp['spl_bill_inst'] = $row2['spl_bill_inst'];
	$emp['pricing'] = isset($row2['pricing']) ? $row2['pricing'] : '1';
	$emp['bankruptcy'] = isset($row2['bankruptcy']) ? $row2['bankruptcy'] : '0';
	$emp['collections'] = isset($row2['collections']) ? $row2['collections'] : '0';
	
	echo json_encode($emp);
}
else
{
	http_response_code(404);
}


?>