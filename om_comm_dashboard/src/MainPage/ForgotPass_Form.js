import React, {Component} from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import qs from "qs"

import Login  from "./Login"

class ForgotPass_Form extends Component
{
	constructor(props)
	{
		super(props)
		this.state = 
		{
			email : "",
			pass : "",
			confirm_password : "",
			unique_code : "",
			incomplete_alert : false,
			wellnow_alert : false,
			pass_alert : false,
			somethingwrong_alert : false
		}
		
		this.onchange = this.onchange.bind(this);
		
		this.back = this.back.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	
	onchange(e)
	{
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	
	back()
	{
		ReactDOM.render(<Login />, document.getElementById('root'));
	}
	
	handleSubmit(e)
	{
		e.preventDefault();
		
		const obj = {
					email : this.state.email,
					pass : this.state.pass,
					confirm_password : this.state.confirm_password,
					unique_code: this.state.unique_code,
				};

		var domain = obj.email.substring(obj.email.lastIndexOf("@") +1);
		
		if(obj.unique_code.length === 0 || obj.email.length === 0 || obj.pass.length === 0 || obj.confirm_password.length === 0)
		{
			this.setState({
				incomplete_alert : true
			})
		}
		else if(domain.toLowerCase() !== "wellnow.com")
		{
			this.setState({
				wellnow_alert : true
			})
		}
		else
		{
			const confpassmatch = obj.confirm_password === obj.pass
			if(confpassmatch === false)
			{
				this.setState({
					pass_alert: true
				})
			}
			else
			{
				axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/resetpass.php', qs.stringify(obj))
				.then(res => 
				{
					if(res.data.result === 'success')
					{
						alert("Successfully changed the password.");
						this.back();
					}
					else
					{
						this.setState({
							somethingwrong_alert : true
						})
						this.back();
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

				{this.state.incomplete_alert && <div class="alert alert-danger">
					<strong>Error! Please fill out all the required fields.</strong>
				</div>}

				{this.state.wellnow_alert && <div class="alert alert-warning">
					<strong>Warning! Only WellNow Email IDs allowed.</strong>
				</div>}

				{this.state.pass_alert && <div class="alert alert-warning">
					<strong>Error! Passwords do not match. Please try again.</strong>
				</div>}

				{this.state.incomplete_alert && <div class="alert alert-danger">
					<strong>Error! Something went wrong. Pelase try again in sometime.</strong>
				</div>}
				
				<div className = "row">
					<center> <h1 style = {{color : "#33a5ff"}}> <b>
						Occ Med Communication Database
					</b> </h1> </center>
				</div>
				
				<br />
				<div>
					<h4> <b>
						Forgot Password Form
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
								<label><b> Unique Code from Email </b></label>
								<div>
									<input className = "form-control" type = "text"  name = "unique_code" placeholder = "Unique Code" value = {this.state.unique_code} onChange = {this.onchange} />
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
								<button type="button" className="btn btn-success" onClick = {this.handleSubmit}> &nbsp;&nbsp;&nbsp; Submit &nbsp;&nbsp;&nbsp;</button>
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

export default ForgotPass_Form