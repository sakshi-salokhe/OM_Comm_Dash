import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import qs from 'qs'
import moment from 'moment'

import Logout from '../MainPage/Logout'
import ChangePass from '../MainPage/ChangePass'
import ViewDataTable from './view/ViewDataTable'
import FlaggedComms from './view/FlaggedComms'
import ViewDataTableAllEmps from './view/ViewDataTableAllEmps'

class AdminLogin extends Component
{
	
	constructor(props)
	{
		super(props)
		this.state = 
		{
			emps: [],
			users: [],
			c_type : [],
			empl: "",
			user: "",
			start: "",
			end: "",
			username : ""
		}
		
		this.changepass = this.changepass.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.flagged_comms = this.flagged_comms.bind(this)
		this.onchange = this.onchange.bind(this)
		
	}
	
	onchange(e)
	{
		this.setState({
			[e.target.name] : e.target.value
		})
	}
	
	flagged_comms(e)
	{
		e.preventDefault();
		
		const obj = {
			user_id : this.props.user_id,
			empl : this.state.empl,
			user : this.state.user,
			start : this.state.start,
			end: this.state.end
		}
		
		if(obj.empl.length === 0)
		{
			alert("Please choose an employer.");
		}
		else
		{
			axios.post('http://localhost:81/OM_Comm_Dash/om_comm_backend/get_emp_name.php',qs.stringify(obj))
			.then(response => 
			{
				ReactDOM.render(<FlaggedComms data = {obj} emp_name = {response.data.emp_name} />, document.getElementById('root'));
			})
		}
	}
	
	handleSubmit(e)
	{
		e.preventDefault();
		
		const obj = {
			user_id : this.props.user_id,
			empl : this.state.empl,
			user : this.state.user,
			start : this.state.start,
			end: this.state.end
		}
		//console.log("check: ", obj);
		if(obj.empl.length === 0)
		{
			ReactDOM.render(<ViewDataTableAllEmps data = {obj} />, document.getElementById('root'));
		}
		else
		{
			axios.post('http://localhost:81/OM_Comm_Dash/om_comm_backend/get_emp_name.php',qs.stringify(obj))
			.then(response => 
			{
				ReactDOM.render(<ViewDataTable data = {obj} emp_name = {response.data.emp_name} />, document.getElementById('root'));
			})
		}
	}
	
	componentDidMount()
	{
		axios.get('http://localhost:81/OM_Comm_Dash/om_comm_backend/get_emps.php')
		.then(response => 
		{
            this.setState({
				emps: response.data
			})
		})
		
		axios.get('http://localhost:81/OM_Comm_Dash/om_comm_backend/get_users.php')
		.then(response => 
		{
            this.setState({
				users: response.data
			})
		})
		
		axios.get('http://localhost:81/OM_Comm_Dash/om_comm_backend/get_username.php?user_id='+this.props.user_id)
		.then(response => 
		{
            this.setState({
				username: response.data.name
			})
		})
	}
	
	changepass()
	{
		ReactDOM.render(<ChangePass user_id = {this.props.user_id} />, document.getElementById("root"));
	}

	logout()
	{
		ReactDOM.render(<Logout />, document.getElementById("root"));
	}
	
	render()
	{
		let optionItems = this.state.emps.map((emps1) =>
                <option key={emps1.emp_id} value = {emps1.emp_id}>{emps1.emp_name}</option>
            );
			
		let optionItems2 = this.state.users.map((users1) =>
                <option key={users1.user_id} value = {users1.user_id}>{users1.name}</option>
            );
			
		return(
			<div className = "container">
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
						<h4> <b> Welcome {this.state.username} </b> </h4>
					</div>
					<div className = "col-lg-5 col-md-5 col-sm-5 col-xs-5"> 
						<button type="button" className="btn btn-success" onClick = {this.changepass}> &nbsp;&nbsp;&nbsp; Change Password &nbsp;&nbsp;&nbsp;</button>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<button type="button" className="btn btn-primary" onClick = {this.logout}> &nbsp;&nbsp; Logout &nbsp;&nbsp; </button>
					</div>
					
				</div>
				
				<br/>
				<br/>
				<div className = "row">
					<div className = "col-lg-6 col-md-6 col-sm-6 col-xs-6">
						<form className="form-horizontal">
							
							<div className="form-group">
								<label><b> Choose Employer </b> <br /></label>
								<select className = "form-control" onChange = {this.onchange} name = "empl" value = {optionItems.emp_id}>
									{optionItems}
								</select>
							</div>
							
							<div className="form-group">
								<label><b> Start Date </b> (optional) <br /></label>
								<input className = "form-control" type = "date" max={moment().format("YYYY-MM-DD")} value = {this.state.start} name = "start" onChange = {this.onchange} /> 
							</div>
							
							<div className="form-group">
								<label><b> End Date </b> (optional) <br /></label>
								<input className = "form-control" type = "date" min={this.state.start} max={moment().format("YYYY-MM-DD")} value = {this.state.end} name = "end" onChange = {this.onchange} /> 
							</div>
							
							<div className="form-group">
								<label><b> Choose Users </b> (optional) <br /></label>
								<select className = "form-control" onChange = {this.onchange} name = "user" value = {optionItems2.user_id}>
									{optionItems2}
								</select>
							</div>
							
							<div className="form-group">
								<button type="button" className="btn btn-success" onClick = {this.handleSubmit}> &nbsp;&nbsp;&nbsp; Submit &nbsp;&nbsp;&nbsp;</button>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<button type="button" className="btn btn-danger" onClick = {this.flagged_comms}> &nbsp;&nbsp; View Flagged Communications &nbsp;&nbsp; </button>
							</div>
							
						</form>
					</div>
					
					<div className = "col-lg-6 col-md-6 col-sm-6 col-xs-6"></div>
				</div>
			</div>
		)
	}
}

export default AdminLogin