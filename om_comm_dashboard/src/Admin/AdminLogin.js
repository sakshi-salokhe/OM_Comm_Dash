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
import ViewEmployersTable from './view/ViewEmployersTable'

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
			username : "",
			danger_alert : false,
			email_invoices : -1,
			mail_invoices : -1,
			portal_invoices : -1,
			fiscal_year_end : -1,
			encryp_emails : -1,
			pricing : -1,
			bankruptcy : -1,
			collections : -1,
			comm_reason_list : [],
			ctype : "1",
			creason : "1"
		}
		
		this.changepass = this.changepass.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.flagged_comms = this.flagged_comms.bind(this)
		this.onchange = this.onchange.bind(this)
		this.viewEmployers = this.viewEmployers.bind(this)
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
			end: this.state.end,
			ctype : this.state.ctype,
			creason : this.state.creason
		}
		
		if(obj.empl <= 1)
		{
			this.setState({
				danger_alert: true
			})
		}
		else
		{
			axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/get_emp_name.php',qs.stringify(obj))
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
			end: this.state.end,
			ctype : this.state.ctype,
			order : "desc",
			creason : this.state.creason
		}
		
		if(obj.empl <= 1)
		{
			ReactDOM.render(<ViewDataTableAllEmps data = {obj} />, document.getElementById('root'));
		}
		else
		{
			axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/get_emp_name.php',qs.stringify(obj))
			.then(response => 
			{
				ReactDOM.render(<ViewDataTable data = {obj} emp_name = {response.data.emp_name} />, document.getElementById('root'));
			})
		}
	}
	
	viewEmployers(e)
	{
		e.preventDefault();

		const obj = {
			user_id : this.props.user_id,
			email_invoices : this.state.email_invoices,
			mail_invoices : this.state.mail_invoices,
			portal_invoices : this.state.portal_invoices,
			fiscal_year_end : this.state.fiscal_year_end,
			encryp_emails : this.state.encryp_emails,
			pricing : this.state.pricing,
			bankruptcy : this.state.bankruptcy,
			collections : this.state.collections,
		}
		
		ReactDOM.render(<ViewEmployersTable data = {obj} />, document.getElementById('root'));
		axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/view_employer_by_admin.php',qs.stringify(obj))
		.then(response => 
		{
			console.log(response.data)
			// ReactDOM.render(<ViewDataTable data = {obj} emp_name = {response.data.emp_name} />, document.getElementById('root'));
		})

	}

	componentDidMount()
	{
		axios.get('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/get_emps.php')
		.then(response => 
		{
            this.setState({
				emps: response.data
			})
		})
		
		axios.get('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/get_users.php')
		.then(response => 
		{
            this.setState({
				users: response.data
			})
		})
		
		axios.get('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/get_username.php?user_id='+this.props.user_id)
		.then(response => 
		{
            this.setState({
				username: response.data.name
			})
		})

		axios.get('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/get_com_type.php')
		.then(resp => 
		{
            this.setState({
				c_type: resp.data
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
			
		let optionItems_ctype = this.state.c_type.map((c_type1) =>
			<option key={c_type1.comm_type_id} value = {c_type1.comm_type_id}>{c_type1.comm_type_name}</option>
		);
		
		let optionItems_reason = this.state.comm_reason_list.map((comm_reason1) =>
			<option key={comm_reason1.comm_reason_id} value = {comm_reason1.comm_reason_id}>{comm_reason1.comm_reason_name}</option>
		);
			
		return(
			<div className = "container">
				<br />
				<br />

				{this.state.danger_alert && <div class="alert alert-danger">
					<strong>Error! Please enter the Employer.</strong>
				</div>}

				<div className = "row">
					<center> <h1 style = {{color : "#33a5ff"}}> <b>
						Occ Med Communication Database
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
					<div className = "col-lg-5 col-md-5 col-sm-5 col-xs-5">
						<h4>View Communications</h4>
						<hr/>
						<form className="form-horizontal">
							
							<div className="form-group">
								<label><b> Choose Employer *</b> <br /></label>
								<select className = "form-control" onChange = {this.onchange} name = "empl" value = {optionItems.emp_id} >
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
								<label><b> Choose Communication Type </b> (optional) <br /></label>
								<select className = "form-control" onChange = {this.onchange} name = "ctype" value = {this.state.ctype}>
									{optionItems_ctype}
								</select>
							</div>

							<div className="form-group">
								<label><b> Choose Communication Reason </b> (optional) <br /></label>
								<select className = "form-control" onChange = {this.onchange} name = "creason" value = {this.state.creason}>
									{optionItems_reason}
								</select>
							</div>
							
							<div className="form-group">
								<button type="button" className="btn btn-success" onClick = {this.handleSubmit}> &nbsp;&nbsp;&nbsp; Submit &nbsp;&nbsp;&nbsp;</button>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<button type="button" className="btn btn-danger" onClick = {this.flagged_comms}> &nbsp;&nbsp; View Flagged Communications &nbsp;&nbsp; </button>
							</div>
							
						</form>
					</div>

					<div className = "col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>

					<div className = "col-lg-5 col-md-5 col-sm-5 col-xs-5">
					<h4>View Employers </h4><p>(If no value selected below, it will show the Employer details for which any of the values were changed in the past)</p>
						<hr/>
						<form className="form-horizontal">
							
							<div className="form-group">
								<label><b> Email Invoices </b> (optional)<br /></label>
								<select className = "form-control" value = {this.state.email_invoices} name = "email_invoices" onChange = {this.onchange} placeholder = {this.state.email_invoices}>
									<option value="-1"> Select a value </option>
									<option value="1"> Yes </option>
									<option value="0"> No </option>
								</select>
							</div>
							
							<div className="form-group">
								<label><b> Mail Invoices </b> (optional) <br /></label>
								<select className = "form-control" value = {this.state.mail_invoices} name = "mail_invoices" onChange = {this.onchange} placeholder = {this.state.mail_invoices}>
									<option value="-1"> Select a value </option>
									<option value="1"> Yes </option>
									<option value="0"> No </option>
								</select> 
							</div>
							
							<div className="form-group">
								<label><b> Portal Invoices </b> (optional) <br /></label>
								<select className = "form-control" value = {this.state.portal_invoices} name = "portal_invoices" onChange = {this.onchange} placeholder = {this.state.portal_invoices}>
									<option value="-1"> Select a value </option>
									<option value="1"> Yes </option>
									<option value="0"> No </option>
								</select> 
							</div>
							
							<div className="form-group">
								<label><b> Fiscal Year End </b> (optional) <br /></label>
								<select className = "form-control" value = {this.state.fiscal_year_end} name = "fiscal_year_end" onChange = {this.onchange} placeholder = {this.state.fiscal_year_end}>
									<option value="-1"> Select a value </option>
									<option value="1"> Jan </option>
									<option value="2"> Feb </option>
									<option value="3"> Mar </option>
									<option value="4"> Apr </option>
									<option value="5"> May </option>
									<option value="6"> Jun </option>
									<option value="7"> Jul </option>
									<option value="8"> Aug </option>
									<option value="9"> Sep </option>
									<option value="10"> Oct </option>
									<option value="11"> Nov </option>
									<option value="12"> Dec </option>
								</select>
							</div>

							<div className="form-group">
								<label><b> Pricing </b> (optional) <br /></label>
								<select className = "form-control" value = {this.state.pricing} name = "pricing" onChange = {this.onchange} placeholder = {this.state.pricing}>
									<option value="-1"> Select a value </option>
									<option value="1"> Region I </option>
									<option value="2"> Region II </option>
									<option value="3"> Region III </option>
									<option value="4"> Region IV </option>
									<option value="5"> Special </option>
								</select>
							</div>

							<div className="form-group">
								<label><b> Bankruptcy </b> (optional) <br /></label>
								<select className = "form-control" value = {this.state.bankruptcy} name = "bankruptcy" onChange = {this.onchange} placeholder = {this.state.bankruptcy}>
									<option value="-1"> Select a value </option>
									<option value="1"> Yes </option>
									<option value="0"> No </option>
								</select>
							</div>

							<div className="form-group">
								<label><b> Collections </b> (optional) <br /></label>
								<select className = "form-control" value = {this.state.collections} name = "collections" onChange = {this.onchange} placeholder = {this.state.collections}>
									<option value="-1"> Select a value </option>
									<option value="1"> Yes </option>
									<option value="0"> No </option>
								</select>
							</div>

							<div className="form-group">
								<label><b> Can receive encrypt emails? </b> (optional) <br /></label>
								<select className = "form-control" value = {this.state.encryp_emails} name = "encryp_emails" onChange = {this.onchange} placeholder = {this.state.encryp_emails}>
									<option value="-1"> Select a value </option>
									<option value="2">  </option>
									<option value="1"> Yes </option>
									<option value="0"> No </option>
								</select>
							</div>
							
							<div className="form-group">
								<button type="button" className="btn btn-success" onClick = {this.viewEmployers}> &nbsp;&nbsp;&nbsp; View Employers &nbsp;&nbsp;&nbsp;</button>
							</div>
							
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default AdminLogin