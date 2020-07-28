import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import qs from "qs"
import axios from "axios"

import Login from './Login'

class Register extends Component
{
	constructor(props)
	{
		super(props)
		this.state = 
		{
			email : "",
			name : "",
			pass : "",
			confirm_password : ""
		}
		
		this.onchange = this.onchange.bind(this)
		this.resetform = this.resetform.bind(this)
		
		this.register = this.register.bind(this)
		this.login = this.login.bind(this);
	}
	
	onchange(e)
	{
		this.setState({
			[e.target.name] : e.target.value
		})
	}
	
	login()
	{
		ReactDOM.render(<Login />, document.getElementById("root"))
	}
	
	resetform()
	{
		this.setState({
			email : "",
			name : "",
			pass : "",
			confirm_password : ""
		});
	}
	
	register(e)
	{
		e.preventDefault();
		
		const obj = {
			email : this.state.email,
			name : this.state.name,
			pass : this.state.pass,
			confirm_password : this.state.confirm_password
		}
		
		var domain = obj.email.substring(obj.email.lastIndexOf("@") +1);
		
		if(obj.email.length === 0 || obj.pass.length === 0 || obj.name.length === 0 || obj.confirm_password.length === 0)
		{
			alert("Fields cannot be empty. Please fill out both the fields.");
		}
		else if(domain.toLowerCase() !== "wellnow.com")
		{
			alert("Only WellNow Emails Allowed!")
		}
		else
		{
			const confpassmatch = obj.confirm_password === obj.pass
			if(confpassmatch === false)
			{
				alert("Passwords dont match. try again.")
			}
			else
			{
				axios.post('http://localhost:81/OM_Comm_Dash/om_comm_backend/register.php', qs.stringify(obj))
				.then(res => 
					{
						console.log("After registration:",res.data);
						if(res.data.registered === "false")
						{
							alert("The email id you entered, already exists. Please try logging in or contact Sakshi.");
							this.resetform();
						}
						else
						{
							alert("Registration Successful. Please log in to your account.");
							this.login();
						}
					})
			}
		}
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
						Registration Form
					</b> </h4>
				</div>
				
				<br/>
				<div className = "row">
					<div className = "col-lg-6 col-md-6 col-sm-6 col-xs-6">
						<form className="form-horizontal">
							<div className="form-group">
								<label><b> Name </b></label>
								<div>
									<input className = "form-control" type = "text"  name = "name" placeholder = "Full Name" value = {this.state.name} onChange = {this.onchange} />
								</div>
							</div>
							
							<div className="form-group">
								<label><b> Email </b></label>
								<div>
									<input className = "form-control" type = "email"  name = "email" placeholder = "username@wellnow.com" value = {this.state.email} onChange = {this.onchange} />
								</div>
							</div>
							
							<div className="form-group">
								<label><b> Password </b></label>
								<div>
									<input className = "form-control" type = "password"  name = "pass" placeholder = "Password" value = {this.state.pass} onChange = {this.onchange} />
								</div>
							</div>
							
							<div className="form-group">
								<label><b> Confirm Password </b></label>
								<div>
									<input className = "form-control" type = "password"  name = "confirm_password" placeholder = "Retype Password" value = {this.state.confirm_password} onChange = {this.onchange} />
								</div>
							</div>
							
							<div className="form-group">
								<button type="button" className="btn btn-success" onClick = {this.register}> &nbsp;&nbsp;&nbsp; Submit &nbsp;&nbsp;&nbsp;</button>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<button type="button" className="btn btn-primary" onClick = {this.login}> &nbsp;&nbsp; Login &nbsp;&nbsp; </button>
							</div>
							
						</form>
					</div>
					
					<div className = "col-lg-6 col-md-6 col-sm-6 col-xs-6"></div>
				</div>
				
			</div>
		)
	}
}

export default Register