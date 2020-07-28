import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import qs from 'qs'
import axios from 'axios'

import Login from './Login'
import ForgotPass_Form from './ForgotPass_Form'

class ForgotPass extends Component
{
	constructor(props) 
	{
		super(props)
		
		this.state = 
		{
			email : ""
		}
		this.onchange = this.onchange.bind(this)
		this.resetform = this.resetform.bind(this)
		
		this.login = this.login.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	
	onchange(e)
	{
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	
	login()
	{
		ReactDOM.render(<Login />, document.getElementById("root"))
	}
	
	handleSubmit(e)
	{
		e.preventDefault();
		
		const obj = {
			email : this.state.email
		}
		
		if(obj.email.length === 0)
		{
			alert("Please enter you registered email address.");
		}
		else
		{
			axios.post('http://localhost:81/OM_Comm_Dash/om_comm_backend/forgotpass.php', qs.stringify(obj))
			.then(res => 
				{
					if(res.data.status1 === "error")
					{
						alert("Enter your correct registered wellnow email address.");
						this.resetform();
					}
					else if(res.data.status1 === "success")
					{
						ReactDOM.render(<ForgotPass_Form />, document.getElementById("root"));
					}
				})
		}
	}
	
	resetform()
	{
		this.setState({
			email : "",
		});
	}
	
	
	render()
	{
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
				<div>
					<h4> <b>
						Forgot Password
					</b> </h4>
				</div>
				
				<br/>
				<div className = "row">
					<div className = "col-lg-6 col-md-6 col-sm-6 col-xs-6">
						<form className="form-horizontal">
							<div className="form-group">
								<label><b> Enter you registered Email Address </b></label>
								<div>
									<input className = "form-control" type = "email"  name = "email" value = {this.state.email} placeholder = "username@wellnow.com" onChange = {this.onchange} />
								</div>
							</div>
							
							<div className="form-group">
								<button type="button" className="btn btn-success" onClick = {this.handleSubmit}> &nbsp;&nbsp;&nbsp; Submit &nbsp;&nbsp;&nbsp;</button>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<button type="button" className="btn btn-primary" onClick = {this.login}> &nbsp;&nbsp; Back &nbsp;&nbsp; </button>
							</div>
							
						</form>
					</div>
					
					<div className = "col-lg-6 col-md-6 col-sm-6 col-xs-6"></div>
				</div>
				
			</div>
		)
	}
}

export default ForgotPass