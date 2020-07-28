import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import qs from 'qs'
import axios from 'axios'

import Register from './Register'
import ForgotPass from './ForgotPass'

import UserLogin from '../User/UserLogin'
import AdminLogin from '../Admin/AdminLogin'

class Login extends Component
{
	constructor(props) 
	{
		super(props)
		
		this.state = 
		{
			email : "",
			pass : "",
		}
		this.onchange = this.onchange.bind(this)
		this.resetform = this.resetform.bind(this)
		
		this.login = this.login.bind(this)
		this.register = this.register.bind(this)
		this.forgotpass = this.forgotpass.bind(this)
	}
	
	onchange(e)
	{
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	
	forgotpass()
	{
		ReactDOM.render(<ForgotPass />, document.getElementById("root"));
	}
	
	login(e)
	{
		e.preventDefault();
		
		const obj = {
			email : this.state.email,
			pass : this.state.pass
		}
		
		if(obj.email.length === 0 || obj.pass.length === 0)
		{
			alert("Email and Password cannot be empty. Please fill out both the fields.");
		}
		else
		{
			axios.post('http://localhost:81/OM_Comm_Dash/om_comm_backend/login.php', qs.stringify(obj))
			.then(res => 
				{
					if(res.data.user_id === "-1")
					{
						alert("Something went wrong. If you are a new user, please register. If problem persists, contact Sakshi.");
						this.resetform();
					}
					else if(res.data.isAdmin === "1")
					{
						ReactDOM.render(<AdminLogin user_id = {res.data.user_id}/>, document.getElementById("root"));
					}
					else
					{
						ReactDOM.render(<UserLogin user_id = {res.data.user_id}/>, document.getElementById("root"));
					}
				})
		}
	}
	
	resetform()
	{
		this.setState({
			email : "",
			pass : ""
		});
	}
	
	register()
	{
		ReactDOM.render(<Register />, document.getElementById("root"))
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
						Login Form
					</b> </h4>
				</div>
				
				<br/>
				<div className = "row">
					<div className = "col-lg-6 col-md-6 col-sm-6 col-xs-6">
						<form className="form-horizontal">
							<div className="form-group">
								<label><b> Email </b></label>
								<div>
									<input className = "form-control" type = "email"  name = "email" value = {this.state.email} placeholder = "username@wellnow.com" onChange = {this.onchange} />
								</div>
							</div>
							
							<div className="form-group">
								<label><b> Password </b></label>
								<div>
									<input className = "form-control" type = "password"  name = "pass" value = {this.state.pass} placeholder = "Password" onChange = {this.onchange} />
								</div>
							</div>
							
							<div className="form-group">
								<button type="button" className="btn btn-link" onClick = {this.forgotpass}> Forgot Password ?</button>
							</div>
							
							<div className="form-group">
								<button type="button" className="btn btn-success" onClick = {this.login}> &nbsp;&nbsp;&nbsp; Login &nbsp;&nbsp;&nbsp;</button>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<button type="button" className="btn btn-primary" onClick = {this.register}> &nbsp;&nbsp; Register &nbsp;&nbsp; </button>
							</div>
							
						</form>
					</div>
					
					<div className = "col-lg-6 col-md-6 col-sm-6 col-xs-6"></div>
				</div>
				
			</div>
		)
	}
}

export default Login