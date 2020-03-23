import React, {Component} from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import qs from "qs"

import Login from "./Login"
import UserLogin from "../User/UserLogin"

class ChangePass extends Component
{
	constructor(props)
	{
		super(props)
		this.state = 
		{
			email : "",
			oldpass: "",
			pass : "",
			confirm_password : ""
		}
		
		this.onchange = this.onchange.bind(this);
		
		this.cancel = this.cancel.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	
	onchange(e)
	{
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	
	cancel()
	{
		axios.get('http://localhost:81/OM_Comm_Dash/om_comm_backend/check_user.php?user_id='+this.props.user_id)
		.then(res => 
			 {
				if(res.data.ans === "yes")
				{
					//go to admin login page
				}
				else
				{
					ReactDOM.render(<UserLogin user_id = {res.data.user_id}/>, document.getElementById("root"));
				}
			 })
	}
	
	handleSubmit(e)
	{
		e.preventDefault();
		
		const obj = {
					user_id : this.props.user_id,
					email : this.state.email,
					oldpass : this.state.oldpass,
					pass : this.state.pass,
					confirm_password : this.state.confirm_password
				};

		var domain = obj.email.substring(obj.email.lastIndexOf("@") +1);
		
		if(obj.email.length === 0 || obj.pass.length === 0 || obj.confirm_password.length === 0 || obj.oldpass.length === 0)
		{
			alert("Fill out all the fields!")
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
				axios.post('http://localhost:81/OM_Comm_Dash/om_comm_backend/changepass.php', qs.stringify(obj))
				.then(res => 
				{
					console.log(res.data);	
					if(res.data.changed === 'success')
					{
						alert("Successfully changed the password.");
						ReactDOM.render(<Login />, document.getElementById("root"));
					}
					else
					{
						alert("Enter your own email address!");
						this.cancel();
					}
				});
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
						Change Password
					</b> </h4>
				</div>
				
				<br/>
				<div className = "row">
					<div className = "col-lg-6 col-md-6 col-sm-6 col-xs-6">
						<form className="form-horizontal">
							<div className="form-group">
								<label><b> Email </b></label>
								<div>
									<input className = "form-control" type = "email"  name = "email" placeholder = "username@wellnow.com" value = {this.state.email} onChange = {this.onchange} />
								</div>
							</div>
							
							<div className="form-group">
								<label><b> Old Password </b></label>
								<div>
									<input className = "form-control" type = "password"  name = "oldpass" placeholder = "Password" value = {this.state.oldpass} onChange = {this.onchange} />
								</div>
							</div>
							
							<div className="form-group">
								<label><b> New Password </b></label>
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
								<button type="button" className="btn btn-success" onClick = {this.handleSubmit}> &nbsp;&nbsp;&nbsp; Submit &nbsp;&nbsp;&nbsp;</button>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<button type="button" className="btn btn-primary" onClick = {this.cancel}> &nbsp;&nbsp; Cancel &nbsp;&nbsp; </button>
							</div>
							
						</form>
					</div>
					
					<div className = "col-lg-6 col-md-6 col-sm-6 col-xs-6"></div>
				</div>
				
			</div>
		)
	}
	
}

export default ChangePass