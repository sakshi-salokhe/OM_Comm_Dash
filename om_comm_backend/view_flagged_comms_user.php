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
	
	if(empty($_POST['start']) == True or $_POST['start'] == null)
	{
		$start = 0;
	}
	else
	{
		$start = $_POST['start'];
	}
	
	if(empty($_POST['end']) == True or $_POST['end'] == null)
	{
		$end = 0;
	}
	else
	{
		$end = $_POST['end'];
	}
	
	if(empty($_POST['user']) == True or $_POST['user'] == null)
	{
		$user = 0;
	}
	else
	{
		$user = $_POST['user'];
	}
	
	if(empty($_POST['ctype']) == True or $_POST['ctype'] == null)
	{
		$ctype = 1;
	}
	else
	{
		$ctype = $_POST['ctype'];
	}

	if(empty($_POST['creason']) == True or $_POST['creason'] == null or $_POST['creason'] == 0)
	{
		$creason = 1;
	}
	else
	{
		$creason = $_POST['creason'];
	}
	
	if(empty($_POST['order']) == True or $_POST['order'] == null)
	{
		$order = 'desc';
	}
	else
	{
		$order = $_POST['order'];
	}

	if($start == 0)
	{
		$q1 = mysqli_query($con, "CREATE OR REPLACE VIEW start_view AS SELECT * FROM communications where emp_id = '$empl' and comm_flag = 1");
	}
	else
	{
		$q1 = mysqli_query($con, "CREATE OR REPLACE VIEW start_view AS SELECT * FROM communications where emp_id = '$empl' and comm_date > '$start' and comm_flag = 1");
	}

	if($end == 0)
	{
		$q2 = mysqli_query($con, "CREATE OR REPLACE VIEW end_view AS SELECT * FROM start_view");
	}
	else
	{
		$q2 = mysqli_query($con, "CREATE OR REPLACE VIEW end_view AS SELECT * FROM start_view where comm_date < '$end'");
	}

	if($user == 0)
	{
		$q3 = mysqli_query($con, "CREATE OR REPLACE VIEW user_view AS SELECT * FROM end_view");
	}
	else
	{
		$q3 = mysqli_query($con, "CREATE OR REPLACE VIEW user_view AS SELECT * FROM end_view where user_id = '$user'");
	}

	if($ctype == 1)
	{
		$q4 = mysqli_query($con, "CREATE OR REPLACE VIEW ctype_view AS SELECT * FROM user_view");
	}
	else
	{
		$q4 = mysqli_query($con, "CREATE OR REPLACE VIEW ctype_view AS SELECT * FROM user_view where comm_type_id = '$ctype'");
	}

	if($creason == 1)
	{
		$q5 = mysqli_query($con, "CREATE OR REPLACE VIEW creason_view AS SELECT * FROM ctype_view");
	}
	else
	{
		$q5 = mysqli_query($con, "CREATE OR REPLACE VIEW creason_view AS SELECT * FROM ctype_view where comm_reason_id = '$creason'");
	}

	if($order == 'desc')
	{
		$q6 = mysqli_query($con, "CREATE OR REPLACE VIEW order_view AS SELECT * FROM creason_view order by comm_date desc");
	}
	else
	{
		$q6 = mysqli_query($con, "CREATE OR REPLACE VIEW order_view AS SELECT * FROM creason_view order by comm_date asc");
	}
	
	$sql = "select * from order_view";
	
	if($res = mysqli_query($con, $sql))
	{
		$c = 0;
		while($row = mysqli_fetch_assoc($res))
		{
			$emp[$c]['id'] = $row['comm_id'];
			$emp[$c]['user_id'] = $user_id;
			$emp[$c]['empl'] = $empl;
			$empid1 = $row['emp_id'];
			$ctypeid1 = $row['comm_type_id'];
			$creasonid1 = $row['comm_reason_id'];
			
			$emp[$c]['comm_date'] = $row['comm_date'];
			$emp[$c]['comm_notes'] = $row['comm_notes'];
			
			$emp[$c]['file_name'] = $row['file_name'];
			$emp[$c]['file_type'] = $row['file_type'];
			$emp[$c]['comm_file'] = $row['comm_file'];
			$emp[$c]['comm_flag'] = $row['comm_flag'];
			$userX = $row['user_id'];
		
			$emp_q = "select emp_name from employers where emp_id = '$empid1'";
			$ctype_q = "select comm_type_name from comm_type where comm_type_id = '$ctypeid1'";
			$user11 = "select name from users where user_id = '$userX'";
			$creason_q = "select comm_reason_name from communication_reason where comm_reason_id = '$creasonid1'";
			
			$res1 = mysqli_query($con, $emp_q);
			$res2 = mysqli_query($con, $ctype_q);
			$res3 = mysqli_query($con, $user11);
			$res4 = mysqli_query($con, $creason_q);
			
			$row1 = mysqli_fetch_assoc($res1);
			$row2 = mysqli_fetch_assoc($res2);
			$row3 = mysqli_fetch_assoc($res3);
			$row4 = mysqli_fetch_assoc($res4);
			
			$emp[$c]['emp_name'] = $row1['emp_name'];
			$emp[$c]['ctype_name'] = $row2['comm_type_name'];
			$emp[$c]['user'] = $row3['name'];
			$emp[$c]['creason_name'] = $row4['comm_reason_name'];
			
			$c++;
		}
		if($c >= 1)
		{
			echo json_encode($emp);
		}
		else
		{
			$emp[$c]['id'] = $row['comm_id'];
			$emp[$c]['user_id'] = $user_id;
			$emp[$c]['empl'] = $empl;
			$emp[$c]['comm_date'] = "";
			$emp[$c]['comm_notes'] = "";
			$emp[$c]['file_name'] = "";
			$emp[$c]['file_type'] = "";
			$emp[$c]['comm_file'] = "";
			$emp[$c]['comm_flag'] = "";
			$emp[$c]['emp_name'] = "";
			$emp[$c]['ctype_name'] = "";
			$emp[$c]['creason_name'] = "";
			$emp[$c]['user'] = $user;
			
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