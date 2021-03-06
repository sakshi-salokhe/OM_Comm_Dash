import React, {Component} from "react";
import ReactDOM from "react-dom"
import axios from "axios"
import qs from "qs"
import ReactToExcel from 'react-html-table-to-excel'

import AdminLogin from "../AdminLogin"
import ViewTableRowsAllEmps from "./ViewTableRowsAllEmps"
import ViewDataTableAllEmps1 from "./ViewDataTableAllEmps1"

var FA = require('react-fontawesome')

class ViewDataTableAllEmps extends Component
{
	constructor(props)
	{
		super(props);
		this.state = 
		{
			comms: [],
			show : false,
			obj: [],
			c_type : [],
			ctype : this.props.data.ctype,
			creason : this.props.data.creason,
			comm_reason_list : [],
			emp_name : "",
			username : "",
			notes: "",
			count : ""
		};
		
		this.onChange = this.onChange.bind(this);
		this.onclickCommType = this.onclickCommType.bind(this);
		this.onclickCommReason = this.onclickCommReason.bind(this);
		
		this.sort_date_asc = this.sort_date_asc.bind(this);
		this.sort_date_desc = this.sort_date_desc.bind(this);
		
		this.back = this.back.bind(this);
	}
	
	onChange(e)
	{
		this.setState({
			[e.target.name] : e.target.value
		})
		
	}
	
	sort_date_asc(props)
	{
		const obj = {
			user_id : this.props.data.user_id,
			empl : this.props.data.empl,
			ctype : this.props.data.ctype,
			order: 'asc',
			user : this.props.data.user,
			start : this.props.data.start,
			end: this.props.data.end,
			creason : this.props.data.creason
		}
		
		axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/get_emp_name.php',qs.stringify(obj))
		.then(response => 
		{
			this.setState({
				emp_name : response.data.emp_name
			})
		})
		
		axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/view_date_range_user_all_emps.php',qs.stringify(obj))
		.then(response => 
		{
			ReactDOM.render(<ViewDataTableAllEmps1 data = {obj} />, document.getElementById('root'));
		})
		
	}
	
	sort_date_desc(props)
	{
		const obj = {
			user_id : this.props.data.user_id,
			empl : this.props.data.empl,
			ctype : this.props.data.ctype,
			order: 'desc',
			user : this.props.data.user,
			start : this.props.data.start,
			end: this.props.data.end,
			creason : this.props.data.creason
		}
		
		axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/get_emp_name.php',qs.stringify(obj))
		.then(response => 
		{
			this.setState({
				emp_name : response.data.emp_name
			})
		})
		
		axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/view_date_range_user_all_emps.php',qs.stringify(obj))
		.then(response => 
		{
			ReactDOM.render(<ViewDataTableAllEmps1 data = {obj} />, document.getElementById('root'));
		})
		
	}
	
	onclickCommType(props)
	{
		const obj = {
			user_id : this.props.data.user_id,
			empl : this.props.data.empl,
			ctype : this.state.ctype,
			user : this.props.data.user,
			start : this.props.data.start,
			end: this.props.data.end,
			creason : this.props.data.creason
		}
		
		axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/view_date_range_user_all_emps.php',qs.stringify(obj))
		.then(response => 
		{
			ReactDOM.render(<ViewDataTableAllEmps1 data = {obj} />, document.getElementById('root'));
		})
		
	}

	onclickCommReason(props)
	{
		const obj = {
			user_id : this.props.data.user_id,
			empl : this.props.data.empl,
			ctype : this.props.data.ctype,
			user : this.props.data.user,
			start : this.props.data.start,
			end: this.props.data.end,
			creason : this.state.creason
		}
		
		axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/view_date_range_user_all_emps.php',qs.stringify(obj))
		.then(response => 
		{
			ReactDOM.render(<ViewDataTableAllEmps1 data = {obj} />, document.getElementById('root'));
		})
		
	}
	
	back(props)
	{
		ReactDOM.render(<AdminLogin user_id = {this.props.data.user_id} />, document.getElementById('root'));
	}
	
	componentDidMount()
	{
		axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/view_date_range_user_all_emps.php', qs.stringify(this.props.data))
		.then(res => 
			{
				this.setState({ 
				comms: res.data,
				count: res.data[0].count
				});
			})
			
		axios.get('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/get_com_type.php')
		.then(resp => 
		{
            this.setState({
				c_type: resp.data
			})
		})
		
		axios.get('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/get_username.php?user_id='+this.props.data.user_id)
		.then(response => 
		{
            this.setState({
				username: response.data.name
			})
		})

		axios.get('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/get_comm_reason.php')
		.then(resp => 
		{
            this.setState({
				comm_reason_list: resp.data
			})
		})
	}
	
	commList()
	{
		return this.state.comms.map(function(object)
		{
			return <ViewTableRowsAllEmps key={object.userid} obj={object} />;
		});
	}
	
	render()
	{
		let optionItems_ctype = this.state.c_type.map((c_type1) =>
                <option key={c_type1.comm_type_id} value = {c_type1.comm_type_id}>{c_type1.comm_type_name}</option>
			);
		
		let optionItems_reason = this.state.comm_reason_list.map((comm_reason1) =>
			<option key={comm_reason1.comm_reason_id} value = {comm_reason1.comm_reason_id}>{comm_reason1.comm_reason_name}</option>
		);
		
		return (
				<div className = "container-fluid">
					<br />
					<br />
					
					<div className = "row">
						<center> <h1 style = {{color : "#33a5ff"}}> <b>
							Occ Med Communication Database
						</b> </h1> </center>
					</div>
					
					<br />
					<div className = "row">
						<div className = "col-lg-7 col-md-7 col-sm-7 col-xs-7">
							<h4>
								 You are logged in as {this.state.username}
							</h4>
						</div>
						<div className = "col-lg-5 col-md-5 col-sm-5 col-xs-5"> 
						</div>
						
					</div>
					
					<br />
					<div className = "row">
						<div className = "col-lg-10 col-md-10 col-sm-10 col-xs-10">
							<h4> <b>
								All communications:
							</b> </h4>
						</div>
						<div className = "col-lg-2 col-md-2 col-sm-2 col-xs-2"> 
							<button type="button" className="btn btn-primary" onClick = {this.back}> &nbsp;&nbsp; Back &nbsp;&nbsp; </button>
						</div>
					</div>
					
					<ReactToExcel className = "btn btn-primary" table="table-to-xls" filename="OM Communicatons" sheet="Sheet 1" buttonText="EXPORT" />
					
					<table className="table table-striped table-bordered" id="table-to-xls" style={{marginTop: 20}}>
						<thead>
							<tr>
								<td colSpan = "8">
									<div className="form-group">
										<label><b> Total number of communications: </b> &nbsp;{this.state.count} </label>
									</div>
								</td>
							</tr>
							<tr>
								<th colSpan="4"> Employer Names (Account Details) with background color red are in collection.</th>
								<th colSpan="2">
									<select className = "form-control" onChange = {this.onChange} name = "ctype" value = {this.state.ctype}>
										{optionItems_ctype}
									</select>
									<br/>	
									<button type="button" className="btn btn-warning" onClick = {this.onclickCommType} > Change Communication Type </button>
								</th>
								<th colSpan="2">
									<select className = "form-control" onChange = {this.onChange} name = "creason" value = {this.state.creason}>
										{optionItems_reason}
									</select>
									<br/>	
									<button type="button" className="btn btn-warning" onClick = {this.onclickCommReason} > Change Communication Reason </button>
								</th>
							</tr>
							
							<tr>
								<th> Date <br/> 
									<button type="button" className="btn btn-info btn-sm" onClick = {this.sort_date_asc}> <FA name="arrow-up"/></button>&nbsp;
									<button type="button" className="btn btn-success btn-sm" onClick = {this.sort_date_desc}> <FA name="arrow-down"/></button>
								</th>
								<th> User </th>
								<th> Employer Name </th>
								<th> Communication Type </th>
								<th> Communication Reason </th>
								<th> Communication Notes </th>
								<th> File Attached </th>
								<th> Actions </th>
							</tr>
						</thead>
						<tbody>
							{this.commList()}
						</tbody>
					</table>
						
					
				</div>
		)
		
	}
}

export default ViewDataTableAllEmps