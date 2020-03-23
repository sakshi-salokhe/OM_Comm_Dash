import React, {Component} from "react";
import ReactDOM from "react-dom"
import axios from "axios"
import qs from "qs"

import AdminLogin from "../AdminLogin"
import ViewTableRows from "./ViewTableRows"
import ViewDataTable from "./ViewDataTable"

var FA = require('react-fontawesome')

class ViewDataTable1 extends Component
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
			ctype :"",
			emp_name : ""
		};
		
		this.onChange = this.onChange.bind(this);
		this.onclickCommType = this.onclickCommType.bind(this);
		
		this.sort_date_asc = this.sort_date_asc.bind(this);
		this.sort_date_desc = this.sort_date_desc.bind(this);
		
		this.view_emp_details = this.view_emp_details.bind(this);
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
			order: 'asc'
		}
		console.log("obj:", obj);
		axios.post('http://localhost:81/OM_Comm_Dash/om_comm_backend/get_emp_name.php',qs.stringify(obj))
		.then(response => 
		{
			this.setState({
				emp_name : response.data.emp_name
			})
		})
		
		axios.post('http://localhost:81/OM_Comm_Dash/om_comm_backend/view_date_range_user.php',qs.stringify(obj))
		.then(response => 
		{
			ReactDOM.render(<ViewDataTable data = {obj} emp_name = {this.state.emp_name} />, document.getElementById('root'));
		})
		
	}
	
	sort_date_desc(props)
	{
		const obj = {
			user_id : this.props.data.user_id,
			empl : this.props.data.empl,
			ctype : this.props.data.ctype,
			order: 'desc'
		}
		
		axios.post('http://localhost:81/OM_Comm_Dash/om_comm_backend/get_emp_name.php',qs.stringify(obj))
		.then(response => 
		{
			this.setState({
				emp_name : response.data.emp_name
			})
		})
		
		axios.post('http://localhost:81/OM_Comm_Dash/om_comm_backend/view_date_range_user.php',qs.stringify(obj))
		.then(response => 
		{
			ReactDOM.render(<ViewDataTable data = {obj} emp_name = {this.state.emp_name} />, document.getElementById('root'));
		})
		
	}
	
	onclickCommType(props)
	{
		
		const obj = {
			user_id : this.props.data.user_id,
			empl : this.props.data.empl,
			ctype : this.state.ctype
		}
		axios.post('http://localhost:81/OM_Comm_Dash/om_comm_backend/get_emp_name.php',qs.stringify(obj))
		.then(response => 
		{
			this.setState({
				emp_name : response.data.emp_name
			})
		})
			
		axios.post('http://localhost:81/OM_Comm_Dash/om_comm_backend/view_date_range_user.php',qs.stringify(obj))
		.then(response => 
		{
			ReactDOM.render(<ViewDataTable data = {obj} emp_name = {this.state.emp_name} />, document.getElementById('root'));
		})
		
	}
	
	view_emp_details(props)
	{
		axios.get('http://localhost:81/OM_Comm_Dash/om_comm_backend/view_emp_details.php?empl='+this.props.data.empl+'&user_id='+this.props.data.user_id)
		.then(response => 
		{
			const {show} = this.state;
			
            this.setState({
				obj: response.data,
				show : !show
			});

		})
	}
	
	back(props)
	{
		ReactDOM.render(<AdminLogin user_id = {this.props.data.user_id} />, document.getElementById('root'));
	}
	
	componentDidMount()
	{
		axios.post('http://localhost:81/OM_Comm_Dash/om_comm_backend/view_date_range_user.php', qs.stringify(this.props.data))
		.then(res => 
			{
				this.setState({ comms: res.data });
			})
			
		axios.get('http://localhost:81/OM_Comm_Dash/om_comm_backend/get_com_type.php')
		.then(resp => 
		{
            this.setState({
				c_type: resp.data
			})
		})
	}
	
	commList()
	{
		return this.state.comms.map(function(object)
		{
			return <ViewTableRows key={object.userid} obj={object} />;
		});
	}
	
	render()
	{
		let optionItems_ctype = this.state.c_type.map((c_type1) =>
                <option key={c_type1.comm_type_id} value = {c_type1.comm_type_id}>{c_type1.comm_type_name}</option>
            );
		
		return (
				<div className = "container-fluid">
					<br />
					<br />
					
					<div className = "row">
						<center> <h1 style = {{color : "#33a5ff"}}> <b>
							Occ Med Communication Dashboard
						</b> </h1> </center>
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
					
					<hr />
					<br />
					<div className = "row">
						<div className = "col-lg-6 col-md-6 col-sm-6 col-xs-6"></div>
						<div className = "col-lg-4 col-md-4 col-sm-4 col-xs-4">
							<div className="form-group">
								<select className = "form-control" onChange = {this.onChange} name = "ctype" value = {optionItems_ctype.comm_type_id}>
									{optionItems_ctype}
								</select>
							</div>
						</div>
						<div className = "col-lg-2 col-md-2 col-sm-2 col-xs-2"> 
							<button type="button" className="btn btn-warning" onClick = {this.onclickCommType} > Apply </button>
						</div>
					</div>
					
					<table className="table table-striped table-bordered" style={{marginTop: 20}}>
						<thead>
							<tr>
								<th colSpan="3"> Employer Name: {this.props.emp_name} </th>
								<th></th>
								<th> 
									<button type="button" className="btn btn-info" onClick = {this.view_emp_details}> View Employer Details </button>
								</th>
							</tr>
							<tr>
								{this.state.show && <EmpDetails data = {this.state.obj}/>}
							</tr>
							<tr>
								<th> Date  <button type="button" className="btn btn-info" onClick = {this.sort_date_asc}> <FA name="arrow-up" /></button> &nbsp;<button type="button" className="btn btn-success" onClick = {this.sort_date_desc}> <FA name="arrow-down" /> </button> </th>
								<th> Communication Type </th>
								<th> Notes </th>
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

class EmpDetails extends Component
{
	constructor(props)
	{
		super(props);
	}
	
	render()
	{
		return (
		
			<div className = "container">

				<table className="table table-striped table-bordered" style={{marginLeft: '50%'}}>
					<tbody>
						<tr>
							<td>
								<h5> Employer ID </h5>
							</td>
							<td>
								{this.props.data.employer_ID}
							</td>
						
							<td>
								<h5> Employer Name </h5>
							</td>
							<td>
								{this.props.data.emp_name}
							</td>
						</tr>
						
						<tr>
							<td>
								<h5> Employer Department </h5>
							</td>
							<td>
								{this.props.data.emp_dept}
							</td>
							
							<td>
								<h5> Primary Contact </h5>
							</td>
							<td>
								{this.props.data.emp_primary_contact}
							</td>
						</tr>
						
						<tr>
							<td>
								<h5> Phone </h5>
							</td>
							<td>
								{this.props.data.emp_phone}
							</td>
							
							<td>
								<h5> Extension </h5>
							</td>
							<td>
								{this.props.data.emp_ext}
							</td>
						</tr>
						
						<tr>
							<td>
								<h5> Fax number </h5>
							</td>
							<td>
								{this.props.data.emp_fax}
							</td>
							
							<td>
								<h5> Email Address </h5>
							</td>
							<td>
								{this.props.data.emp_email}
							</td>
						</tr>		

						<tr>
							<td>
								<h5> Address 1 </h5>
							</td>
							<td>
								{this.props.data.emp_add1}
							</td>
							
							<td>
								<h5> Address 2 </h5>
							</td>
							<td>
								{this.props.data.emp_add2}
							</td>
						</tr>
						
						<tr>
							<td>
								<h5> Suite </h5>
							</td>
							<td>
								{this.props.data.emp_suite}
							</td>
							
							<td>
								<h5> City </h5>
							</td>
							<td>
								{this.props.data.emp_city}
							</td>
						</tr>
						
						<tr>
							<td>
								<h5> State </h5>
							</td>
							<td>
								{this.props.data.emp_state}
							</td>
							
							<td>
								<h5> Zip Code </h5>
							</td>
							<td>
								{this.props.data.emp_zip}
							</td>
						</tr>
						
						<tr>
							<td>
								<h5> Country : </h5>
							</td>
							<td>
								{this.props.data.emp_country}
							</td>
							<td colspan = '2'></td>
						</tr>
					</tbody>
				</table>
				<br />
			</div>
		)
		
	}
}

export default ViewDataTable1