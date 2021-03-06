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
	
	if($ctype == 0 and $order == 'asc')
	{
		$sql = "select * from communications where emp_id = '$empl'";
	}
	else if($ctype == 0 and $order == 'desc')
	{
		$sql = "select * from communications where emp_id = '$empl' order by comm_date DESC";
	}
	else if($ctype != 0 and $order == 'asc')
	{
		$sql = "select * from communications where emp_id = '$empl'";
	}
	else
	{
		$sql = "select * from communications where emp_id = '$empl' and comm_type_id = '$ctype' order by comm_date DESC";
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
			$emp[$c]['comm_file'] = $row['comm_file'];
			$emp[$c]['comm_flag'] = $row['comm_flag'];
			
		
			$emp_q = "select emp_name from employers where emp_id = '$empid1'";
			$ctype_q = "select comm_type_name from comm_type where comm_type_id = '$ctypeid1'";
			
			$res1 = mysqli_query($con, $emp_q);
			$res2 = mysqli_query($con, $ctype_q);
			
			$row1 = mysqli_fetch_assoc($res1);
			$row2 = mysqli_fetch_assoc($res2);
			
			
			$emp[$c]['emp_name'] = $row1['emp_name'];
			$emp[$c]['ctype_name'] = $row2['comm_type_name'];
			
			$emp[$c]['ctype'] = $ctype;
			$emp[$c]['order'] = $order;
			
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
			$emp[$c]['comm_file'] = "";
			$emp[$c]['comm_flag'] = "";
			$emp[$c]['emp_name'] = "";
			$emp[$c]['ctype_name'] = "";
			$emp[$c]['ctype'] = $ctype;
			$emp[$c]['order'] = $order;
			
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