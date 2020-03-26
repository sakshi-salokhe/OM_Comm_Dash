import React, {Component} from "react";
import ReactDOM from "react-dom"
import axios from "axios"
import qs from "qs"

import View_DateRange from "./View_DateRange"
import ViewTableRows from "./ViewTableRows"
import ViewDataTable1 from "./ViewDataTable1"

var FA = require('react-fontawesome')

class ViewDataTable extends Component
{
	constructor(props)
	{
		super(props);
		this.state = 
		{
			comms: [],
			obj: [],
			c_type : [],
			ctype :"",
			emp_name : "",
			username : "",
			notes: ""
		};
		
		this.onChange = this.onChange.bind(this);
		this.onclickCommType = this.onclickCommType.bind(this);
		
		this.sort_date_asc = this.sort_date_asc.bind(this);
		this.sort_date_desc = this.sort_date_desc.bind(this);
		
		this.back = this.back.bind(this);
		this.save = this.save.bind(this);
	}
	
	onChange(e)
	{
		this.setState({
			[e.target.name] : e.target.value
		})
		
	}
	
	save()
	{
		const obj = {
			user_id : this.props.data.user_id,
			empl : this.props.data.empl,
			ctype : this.props.data.ctype,
			order: 'desc',
			user : this.props.data.user,
			start : this.props.data.start,
			end: this.props.data.end,
			notes: this.state.notes
		}
		
		axios.post('http://localhost:81/OM_Comm_Dash/om_comm_backend/get_emp_name.php',qs.stringify(obj))
		.then(response => 
		{
			this.setState({
				emp_name : response.data.emp_name
			})
		})
		
		axios.post('http://localhost:81/OM_Comm_Dash/om_comm_backend/save_emp_notes.php',qs.stringify(obj))
		.then(response => 
		{
			ReactDOM.render(<ViewDataTable1 data = {obj} emp_name = {this.state.emp_name} />, document.getElementById('root'));
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
			ReactDOM.render(<ViewDataTable1 data = {obj} emp_name = {this.state.emp_name} />, document.getElementById('root'));
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
			ReactDOM.render(<ViewDataTable1 data = {obj} emp_name = {this.state.emp_name} />, document.getElementById('root'));
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
			ReactDOM.render(<ViewDataTable1 data = {obj} emp_name = {this.state.emp_name} />, document.getElementById('root'));
		})
		
	}
	
	back(props)
	{
		ReactDOM.render(<View_DateRange user_id = {this.props.data.user_id} />, document.getElementById('root'));
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
		
		axios.get('http://localhost:81/OM_Comm_Dash/om_comm_backend/view_emp_details.php?empl='+this.props.data.empl+'&user_id='+this.props.data.user_id)
		.then(response => 
		{
			const {show} = this.state;
			
            this.setState({
				obj: response.data,
				notes: response.data.emp_notes
			});
		})
		
		axios.get('http://localhost:81/OM_Comm_Dash/om_comm_backend/get_username.php?user_id='+this.props.data.user_id)
		.then(response => 
		{
            this.setState({
				username: response.data.name
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
					
					<table className="table table-striped table-bordered" style={{marginTop: 20}}>
						<thead>
							<tr>
								<th colSpan="3"> Employer Name: {this.props.emp_name} </th>
								<th colSpan="2">
									<select className = "form-control" onChange = {this.onChange} name = "ctype" value = {optionItems_ctype.comm_type_id}>
										{optionItems_ctype}
									</select>
								</th>
								<th>
									<button type="button" className="btn btn-warning" onClick = {this.onclickCommType} > Apply </button>
								</th>
							</tr>
							<tr>
								<td colSpan="6">
									{<EmpDetails data = {this.state.obj}/>}
								</td>
							</tr>
							<tr>
								<td colSpan = "6">
									<div className="form-group">
										<label><b> Employer Notes </b></label>
										<div className = "row">
											<div className = "col-lg-11 col-md-11 col-sm-11 col-xs-11">
												<textarea className = "form-control" rows = "3" name = "notes" value = {this.state.notes} onChange = {this.onChange} />
											</div>
											<div className = "col-lg-1 col-md-1 col-sm-1 col-xs-1">
												<button className="btn btn-warning" onClick = {this.save}> Save Notes</button>	
											</div>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th> Date  <button type="button" className="btn btn-info" onClick = {this.sort_date_asc}> <FA name="arrow-up" /></button> &nbsp;<button type="button" className="btn btn-success" onClick = {this.sort_date_desc}> <FA name="arrow-down" /> </button> </th>
								<th> User </th>
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
	render()
	{
		return (
		
			<div className = "container-fluid">
			<br />
				<table className="table table-striped table-bordered">
					<tbody>
						<tr>
							<td> <b> Employer ID: </b> &nbsp;{this.props.data.employer_ID} </td>
							<td> <b> Employer Department: </b> &nbsp;{this.props.data.emp_dept}</td>
							<td> <b> Primary Contact: </b> &nbsp;{this.props.data.emp_primary_contact}</td>
							<td> <b> Phone: </b> &nbsp;{this.props.data.emp_phone}</td>
							<td> <b> Extension: </b> &nbsp;{this.props.data.emp_ext}</td>
							<td> <b> Fax number: </b> &nbsp;{this.props.data.emp_fax}</td>
							<td> <b> Email Address: </b> &nbsp;{this.props.data.emp_email}</td>
						</tr>
						
						<tr>
							<td> <b> Address 1: </b> &nbsp;{this.props.data.emp_add1}</td>
							<td> <b> Address 2: </b> &nbsp;{this.props.data.emp_add2}</td>
							<td> <b> Suite: </b> &nbsp;{this.props.data.emp_suite}</td>
							<td> <b> City: </b> &nbsp;{this.props.data.emp_city}</td>
							<td> <b> State: </b> &nbsp;{this.props.data.emp_state}</td>
							<td> <b> Zip Code: </b> &nbsp;{this.props.data.emp_zip}</td>
							<td> <b> Country: </b> &nbsp;{this.props.data.emp_country}</td>
						</tr>
					</tbody>
				</table>
			<br />
			</div>
		)
		
	}
}

export default ViewDataTable