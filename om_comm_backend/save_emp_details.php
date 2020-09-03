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
    $today = date("Y-m-d");
    
    $email_invoices = $_POST['email_invoices'];
    $mail_invoices = $_POST['mail_invoices'];
    $portal_invoices = $_POST['portal_invoices'];
    $portal_login = $_POST['portal_login'];
    $fiscal_year_end = $_POST['fiscal_year_end'];
    $encryp_emails = $_POST['encryp_emails'];
    $spl_bill_inst = $_POST['spl_bill_inst'];
    $pricing = $_POST['pricing'];
    $bankruptcy = $_POST['bankruptcy'];
    $collections = $_POST['collections'];
	
	$q1 = "select * from emp_details where emp_id = '$empl'";
	$r1 = mysqli_query($con, $q1);
	$count = mysqli_num_rows($r1);
	
	if($count > 0)
	{
		$q2 = "update emp_details set user_id = '$user_id', when_done = '$today', email_invoices = '$email_invoices', mail_invoices = '$mail_invoices', portal_invoices = '$portal_invoices', portal_login = '$portal_login', fiscal_year_end = '$fiscal_year_end', encryp_emails = '$encryp_emails', spl_bill_inst = '$spl_bill_inst', pricing = '$pricing', bankruptcy = '$bankruptcy', collections = '$collections' where emp_id = '$empl'";
	}
	else
	{
		$q2 = "insert into emp_details(emp_id, user_id, when_done, email_invoices, mail_invoices, portal_invoices, portal_login, fiscal_year_end, encryp_emails, spl_bill_inst, pricing, bankruptcy, collections) values ('$empl', '$user_id', '$today', '$email_invoices', '$mail_invoices', '$portal_invoices', '$portal_login', '$fiscal_year_end', '$encryp_emails', '$spl_bill_inst', '$pricing', '$bankruptcy', '$collections')";
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