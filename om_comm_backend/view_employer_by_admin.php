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
    $email_invoices = $_POST['email_invoices'];
    $mail_invoices = $_POST['mail_invoices'];
    $portal_invoices = $_POST['portal_invoices'];
    $fiscal_year_end = $_POST['fiscal_year_end'];
    $encryp_emails = $_POST['encryp_emails'];
    $pricing = $_POST['pricing'];
    $bankruptcy = $_POST['bankruptcy'];
    $collections = $_POST['collections'];
    
    if($email_invoices != "-1")
    {
        $q1 = mysqli_query($con,"CREATE OR REPLACE VIEW email_invoices_view AS SELECT * FROM emp_details WHERE email_invoices = '$email_invoices'");    
    }
    else
    {
        $q1 = mysqli_query($con, "CREATE OR REPLACE VIEW email_invoices_view AS SELECT * FROM emp_details");
    }

    if($mail_invoices != "-1")
    {
        $q2 = mysqli_query($con,"CREATE OR REPLACE VIEW mail_invoices_view AS SELECT * FROM email_invoices_view WHERE mail_invoices = '$mail_invoices'");    
    }
    else
    {
        $q2 = mysqli_query($con, "CREATE OR REPLACE VIEW mail_invoices_view AS SELECT * FROM email_invoices_view");
    }

    if($portal_invoices != "-1")
    {
        $q3 = mysqli_query($con,"CREATE OR REPLACE VIEW portal_invoices_view AS SELECT * FROM mail_invoices_view WHERE portal_invoices = '$portal_invoices'");    
    }
    else
    {
        $q3 = mysqli_query($con, "CREATE OR REPLACE VIEW portal_invoices_view AS SELECT * FROM mail_invoices_view");
    }

    if($fiscal_year_end != "-1")
    {
        $q4 = mysqli_query($con,"CREATE OR REPLACE VIEW fiscal_year_end_view AS SELECT * FROM portal_invoices_view WHERE fiscal_year_end = '$fiscal_year_end'");    
    }
    else
    {
        $q4 = mysqli_query($con, "CREATE OR REPLACE VIEW fiscal_year_end_view AS SELECT * FROM portal_invoices_view");
    }

    if($encryp_emails != "-1")
    {
        $q5 = mysqli_query($con,"CREATE OR REPLACE VIEW encryp_emails_view AS SELECT * FROM fiscal_year_end_view WHERE encryp_emails = '$encryp_emails'");    
    }
    else
    {
        $q5 = mysqli_query($con, "CREATE OR REPLACE VIEW encryp_emails_view AS SELECT * FROM fiscal_year_end_view");
    }

    if($pricing != "-1")
    {
        $q6 = mysqli_query($con,"CREATE OR REPLACE VIEW pricing_view AS SELECT * FROM encryp_emails_view WHERE pricing = '$pricing'");    
    }
    else
    {
        $q6 = mysqli_query($con, "CREATE OR REPLACE VIEW pricing_view AS SELECT * FROM encryp_emails_view");
    }

    if($bankruptcy != "-1")
    {
        $q7 = mysqli_query($con,"CREATE OR REPLACE VIEW bankruptcy_view AS SELECT * FROM pricing_view WHERE bankruptcy = '$bankruptcy'");    
    }
    else
    {
        $q7 = mysqli_query($con, "CREATE OR REPLACE VIEW bankruptcy_view AS SELECT * FROM pricing_view");
    }

    if($collections != "-1")
    {
        $q8 = mysqli_query($con,"CREATE OR REPLACE VIEW collections_view AS SELECT * FROM bankruptcy_view WHERE collections = '$collections'");    
    }
    else
    {
        $q8 = mysqli_query($con, "CREATE OR REPLACE VIEW collections_view AS SELECT * FROM bankruptcy_view");
    }

    $sql1= "select * from collections_view";

    if($res = mysqli_query($con, $sql1))
	{
		$c = 0;
		$count = mysqli_num_rows($res);
		while($row = mysqli_fetch_assoc($res))
		{
            $emp[$c]['id'] = $row['emp_detail_id'];
            
            $emp_id = $row['emp_id'];
            $emp[$c]['emp_id'] = $row['emp_id'];

            $emp[$c]['email_invoices'] = $row['email_invoices'];
            $emp[$c]['mail_invoices'] = $row['mail_invoices'];
            $emp[$c]['portal_invoices'] = $row['portal_invoices'];
            $emp[$c]['portal_login'] = $row['portal_login'];
            $emp[$c]['fiscal_year_end'] = $row['fiscal_year_end'];
            $emp[$c]['encryp_emails'] = $row['encryp_emails'];
            $emp[$c]['spl_bill_inst'] = $row['spl_bill_inst'];
            $emp[$c]['pricing'] = $row['pricing'];
            $emp[$c]['bankruptcy'] = $row['bankruptcy'];
            $emp[$c]['collections'] = $row['collections'];
            
            $sql2 = "select * from employers where emp_id = '$emp_id'";
            $res2 = mysqli_query($con, $sql2);
            $row2 = mysqli_fetch_assoc($res2);

            $emp[$c]['employer_ID'] = $row2['employer_ID'];
            $emp[$c]['emp_name'] = $row2['emp_name'];
            $emp[$c]['emp_dept'] = $row2['emp_dept'];
            $emp[$c]['emp_add1'] = $row2['emp_add1'];
            $emp[$c]['emp_add2'] = $row2['emp_add2'];
            $emp[$c]['emp_suite'] = $row2['emp_suite'];
            $emp[$c]['emp_city'] = $row2['emp_city'];
            $emp[$c]['emp_state'] = $row2['emp_state'];
            $emp[$c]['emp_zip'] = $row2['emp_zip'];
            $emp[$c]['emp_country'] = $row2['emp_country'];
            $emp[$c]['emp_phone'] = $row2['emp_phone'];
            $emp[$c]['emp_ext'] = $row2['emp_ext'];
            $emp[$c]['emp_fax'] = $row2['emp_fax'];
            $emp[$c]['emp_primary_contact'] = $row2['emp_primary_contact'];
            $emp[$c]['emp_email'] = $row2['emp_email'];
            
            $c++;
		}
		if($c >= 1)
		{
			echo json_encode($emp);
		}
		else
		{
			$emp[$c]['id'] = 0;
			$emp[$c]['emp_id'] = "";
            
            $emp[$c]['email_invoices'] = "";
            $emp[$c]['mail_invoices'] = "";
            $emp[$c]['portal_invoices'] = "";
            $emp[$c]['portal_login'] = "";
            $emp[$c]['fiscal_year_end'] = "";
            $emp[$c]['encryp_emails'] = "";
            $emp[$c]['spl_bill_inst'] = "";
            $emp[$c]['pricing'] = "";
            $emp[$c]['bankruptcy'] = "";
            $emp[$c]['collections'] = "";

            $emp[$c]['employer_ID'] = "";
            $emp[$c]['emp_name'] = "";
            $emp[$c]['emp_dept'] = "";
            $emp[$c]['emp_add1'] = "";
            $emp[$c]['emp_add2'] = "";
            $emp[$c]['emp_suite'] = "";
            $emp[$c]['emp_city'] = "";
            $emp[$c]['emp_state'] = "";
            $emp[$c]['emp_zip'] = "";
            $emp[$c]['emp_country'] = "";
            $emp[$c]['emp_phone'] = "";
            $emp[$c]['emp_ext'] = "";
            $emp[$c]['emp_fax'] = "";
            $emp[$c]['emp_primary_contact'] = "";
            $emp[$c]['emp_email'] = "";

			echo json_encode($emp);
		}
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