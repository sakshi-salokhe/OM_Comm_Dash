<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
require "connect.php";
session_start();

$sessData = [];

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
	$email = $_POST['email'];
	
	$val_query = "SELECT * from users where email='$email'";
	$res = mysqli_query($con, $val_query);
	$count = mysqli_num_rows($res);
	$row = mysqli_fetch_assoc($res);
	$userid = $row['user_id'];
	
	
	if($count>0) 
	{
		$uniqidStr = uniqid(mt_rand());
		
		$q1 = "update users set resetPassCode = '$uniqidStr' where user_id = '$userid'";
		$r1 = mysqli_query($con, $q1);
		
		$resetPassLink = 'http://localhost:81/om_comm_backend/resetpass.php?fp_code='.$uniqidStr;
		
		
		//send reset password email
		
		$to = $email;

		$from = 'donotreplywellnowuc@gmail.com';
		
		$subject = "Code for Resetting Password.</h5>";
		
		$message = "Hi,

Please use this code ".$uniqidStr." while resetting the password.
	
For any issues with the details entered, please contact Admin at admin@wellnow.com.
	
For any technical issues, please contact Sakshi Salokhe - Reporting Specialist (Automation and Back end Developmer), at sakshisanjay.salokhe@wellnow.com.
	
	
	
Thank you,

WellNow UrgentCare
Back End Development Team";

		//set content-type header for sending HTML email
		$headers = array("From: melissa.cortes@wellnow.com",
			"Reply-To: sakshisanjay.salokhe@wellnow.com",
			"X-Mailer: PHP/" . PHP_VERSION
		);
		$headers = implode("\r\n", $headers);
		
		mail($to, $subject, $message, $headers);
		
		$sessData['status1'] = 'success';
		$sessData['msg'] = 'done.'; 
		echo json_encode($sessData);
    }
	else
	{
		$sessData['status1'] = 'error';
		$sessData['msg'] = 'Email does not exist.'; 
		
		echo json_encode($sessData);
	}
	
}

?>