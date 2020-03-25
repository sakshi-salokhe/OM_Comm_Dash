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
	$notes = $_POST['notes'];
	$today = date("Y-m-d");
	
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
		$ctype = 0;
	}
	else
	{
		$ctype = $_POST['ctype'];
	}
	
	if(empty($_POST['order']) == True or $_POST['order'] == null)
	{
		$order = 'desc';
	}
	else
	{
		$order = $_POST['order'];
	}
	
	$q1 = "select * from emp_notes where emp_id = '$empl'";
	$r1 = mysqli_query($con, $q1);
	$count = mysqli_num_rows($r1);
	
	if($count > 0)
	{
		$q2 = "update emp_notes set user_id = '$user_id', when_done = '$today', notes = '$notes' where emp_id = '$empl'";
	}
	else
	{
		$q2 = "insert into emp_notes(emp_id, user_id, when_done, notes) values ('$empl', '$user_id', '$today', '$notes')";
	}
	
	if(mysqli_query($con, $q2))
	{
		if($start == 0 and $end == 0 and $user == 0 and $ctype == 0 and $order == 'asc')
		{
			$sql = "select * from communications where emp_id = '$empl' order by comm_date asc";
		}
		else if($start == 0 and $end == 0 and $user == 0 and $ctype == 0 and $order == 'desc')
		{
			$sql = "select * from communications where emp_id = '$empl' order by comm_date desc";
		}
		else if($start == 0 and $end == 0 and $user == 0 and $ctype != 0 and $order == 'asc')
		{
			$sql = "select * from communications where emp_id = '$empl' and comm_type_id = '$ctype' order by comm_date asc";
		}
		else if($start == 0 and $end == 0 and $user == 0 and $ctype != 0 and $order == 'desc')
		{
			$sql = "select * from communications where emp_id = '$empl' and comm_type_id = '$ctype' order by comm_date desc";
		}
		else if($start == 0 and $end == 0 and $user != 0 and $ctype == 0 and $order == 'asc')
		{
			$sql = "select * from communications where emp_id = '$empl' and user_id = '$user' order by comm_date asc";
		}
		else if($start == 0 and $end == 0 and $user != 0 and $ctype == 0 and $order == 'desc')
		{
			$sql = "select * from communications where emp_id = '$empl' and user_id = '$user' order by comm_date desc";
		}
		else if($start == 0 and $end == 0 and $user != 0 and $ctype != 0 and $order == 'asc')
		{
			$sql = "select * from communications where emp_id = '$empl' and comm_type_id = '$ctype' and user_id = '$user' order by comm_date asc";
		}
		else if($start == 0 and $end == 0 and $user != 0 and $ctype != 0 and $order == 'desc')
		{
			$sql = "select * from communications where emp_id = '$empl' and comm_type_id = '$ctype' and user_id = '$user' order by comm_date desc";
		}
		else if($start == 0 and $end != 0 and $user == 0 and $ctype == 0 and $order == 'asc')
		{
			$sql = "select * from communications where emp_id = '$empl' and comm_date <= '$end' order by comm_date asc";
		}
		else if($start == 0 and $end != 0 and $user == 0 and $ctype == 0 and $order == 'desc')
		{
			$sql = "select * from communications where emp_id = '$empl' and comm_date <= '$end' order by comm_date desc";
		}
		else if($start == 0 and $end != 0 and $user == 0 and $ctype != 0 and $order == 'asc')
		{
			$sql = "select * from communications where emp_id = '$empl' and comm_date <= '$end' and comm_type_id = '$ctype' order by comm_date asc";
		}
		else if($start == 0 and $end != 0 and $user == 0 and $ctype != 0 and $order == 'desc')
		{
			$sql = "select * from communications where emp_id = '$empl' and comm_date <= '$end' and comm_type_id = '$ctype' order by comm_date desc";
		}
		else if($start == 0 and $end != 0 and $user != 0 and $ctype == 0 and $order == 'asc')
		{
			$sql = "select * from communications where emp_id = '$empl' and comm_date <= '$end' and user_id = '$user' order by comm_date asc";
		}
		else if($start == 0 and $end != 0 and $user != 0 and $ctype == 0 and $order == 'desc')
		{
			$sql = "select * from communications where emp_id = '$empl' and comm_date <= '$end' and user_id = '$user' order by comm_date desc";
		}
		else if($start == 0 and $end != 0 and $user != 0 and $ctype != 0 and $order == 'asc')
		{
			$sql = "select * from communications where emp_id = '$empl' and comm_date <= '$end' and user_id = '$user' and comm_type_id = '$ctype' order by comm_date asc";
		}
		else if($start == 0 and $end != 0 and $user != 0 and $ctype != 0 and $order == 'desc')
		{
			$sql = "select * from communications where emp_id = '$empl' and comm_date <= '$end' and user_id = '$user' and comm_type_id = '$ctype' order by comm_date desc";
		}
		else if($start != 0 and $end == 0 and $user == 0 and $ctype == 0 and $order == 'asc')
		{
			$sql = "select * from communications where emp_id = '$empl' and comm_date >= '$start' order by comm_date asc";
		}
		else if($start != 0 and $end == 0 and $user == 0 and $ctype == 0 and $order == 'desc')
		{
			$sql = "select * from communications where emp_id = '$empl' and comm_date >= '$start' order by comm_date desc";
		}
		else if($start != 0 and $end == 0 and $user == 0 and $ctype != 0 and $order == 'asc')
		{
			$sql = "select * from communications where emp_id = '$empl' and comm_date >= '$start' and comm_type_id = '$ctype' order by comm_date asc";
		}
		else if($start != 0 and $end == 0 and $user == 0 and $ctype != 0 and $order == 'desc')
		{
			$sql = "select * from communications where emp_id = '$empl' and comm_date >= '$start' and comm_type_id = '$ctype' order by comm_date desc";
		}
		else if($start != 0 and $end == 0 and $user != 0 and $ctype == 0 and $order == 'asc')
		{
			$sql = "select * from communications where emp_id = '$empl' and comm_date >= '$start' and user_id = '$user' order by comm_date asc";
		}
		else if($start != 0 and $end == 0 and $user != 0 and $ctype == 0 and $order == 'desc')
		{
			$sql = "select * from communications where emp_id = '$empl' and comm_date >= '$start' and user_id = '$user' order by comm_date desc";
		}
		else if($start != 0 and $end == 0 and $user != 0 and $ctype != 0 and $order == 'asc')
		{
			$sql = "select * from communications where emp_id = '$empl' and comm_date >= '$start' and user_id = '$user' and comm_type_id = '$ctype' order by comm_date asc";
		}
		else if($start != 0 and $end == 0 and $user != 0 and $ctype != 0 and $order == 'desc')
		{
			$sql = "select * from communications where emp_id = '$empl' and comm_date >= '$start' and user_id = '$user' and comm_type_id = '$ctype' order by comm_date desc";
		}
		else if($start != 0 and $end != 0 and $user == 0 and $ctype == 0 and $order == 'asc')
		{
			$sql = "select * from communications where emp_id = '$empl' and comm_date between '$start' and '$end' order by comm_date asc";
		}
		else if($start != 0 and $end != 0 and $user == 0 and $ctype == 0 and $order == 'desc')
		{
			$sql = "select * from communications where emp_id = '$empl' and comm_date between '$start' and '$end' order by comm_date desc";
		}
		else if($start != 0 and $end != 0 and $user == 0 and $ctype != 0 and $order == 'asc')
		{
			$sql = "select * from communications where emp_id = '$empl' and comm_type_id = '$ctype' and comm_date between '$start' and '$end' order by comm_date asc";
		}
		else if($start != 0 and $end != 0 and $user == 0 and $ctype != 0 and $order == 'desc')
		{
			$sql = "select * from communications where emp_id = '$empl' and comm_type_id = '$ctype' and comm_date between '$start' and '$end' order by comm_date desc";
		}
		else if($start != 0 and $end != 0 and $user != 0 and $ctype == 0 and $order == 'asc')
		{
			$sql = "select * from communications where emp_id = '$empl' and user_id = '$user' and comm_date between '$start' and '$end' order by comm_date asc";
		}
		else if($start != 0 and $end != 0 and $user != 0 and $ctype == 0 and $order == 'desc')
		{
			$sql = "select * from communications where emp_id = '$empl' and user_id = '$user' and comm_date between '$start' and '$end' order by comm_date desc";
		}
		else if($start != 0 and $end != 0 and $user != 0 and $ctype != 0 and $order == 'asc')
		{
			$sql = "select * from communications where emp_id = '$empl' and user_id = '$user' and comm_type_id = '$ctype' and comm_date between '$start' and '$end' order by comm_date asc";
		}
		else if($start != 0 and $end != 0 and $user != 0 and $ctype != 0 and $order == 'desc')
		{
			$sql = "select * from communications where emp_id = '$empl' and user_id = '$user' and comm_type_id = '$ctype' and comm_date between '$start' and '$end' order by comm_date desc";
		}
		
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
				
				$emp[$c]['comm_date'] = $row['comm_date'];
				$emp[$c]['comm_notes'] = $row['comm_notes'];
				
				$emp[$c]['file_name'] = $row['file_name'];
				$emp[$c]['file_type'] = $row['file_type'];
				$emp[$c]['comm_file'] = $row['comm_file'];
				
				$emp[$c]['comm_flag'] = $row['comm_flag'];
				
			
				$emp_q = "select emp_name from employers where emp_id = '$empid1'";
				$ctype_q = "select comm_type_name from comm_type where comm_type_id = '$ctypeid1'";
				$user11 = "select name from users where user_id = '$user'";
				
				$res1 = mysqli_query($con, $emp_q);
				$res2 = mysqli_query($con, $ctype_q);
				$res3 = mysqli_query($con, $user11);
				
				$row1 = mysqli_fetch_assoc($res1);
				$row2 = mysqli_fetch_assoc($res2);
				$row3 = mysqli_fetch_assoc($res3);
				
				
				$emp[$c]['emp_name'] = $row1['emp_name'];
				$emp[$c]['ctype_name'] = $row2['comm_type_name'];
				
				$emp[$c]['ctype'] = $ctype;
				$emp[$c]['order'] = $order;
				$emp[$c]['user'] = $row3['name'];
				
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
				$emp[$c]['ctype'] = $ctype;
				$emp[$c]['order'] = $order;
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
	
	}
	else
	{
		http_response_code(404);
	}

?>