import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Logout from '../MainPage/Logout'
import ChangePass from '../MainPage/ChangePass'

import Enter_Comm from './Enter_Comm'
import View_DateRange from './view/View_DateRange'

class UserLogin extends Component
{
	
	constructor(props)
	{
		super(props)
		this.changepass = this.changepass.bind(this)
		this.enter_comm = this.enter_comm.bind(this)
		this.view_comm = this.view_comm.bind(this)
	}
	
	changepass()
	{
		ReactDOM.render(<ChangePass user_id = {this.props.user_id} />, document.getElementById("root"));
	}

	logout()
	{
		ReactDOM.render(<Logout />, document.getElementById("root"));
	}
	
	
	enter_comm()
	{
		ReactDOM.render(<Enter_Comm user_id = {this.props.user_id} />, document.getElementById("root"));
	}
	
	view_comm()
	{
		ReactDOM.render(<View_DateRange user_id = {this.props.user_id} />, document.getElementById("root"));
	}
	
	render()
	{
		//user_id = this.props.user_id;
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
					<div className = "col-lg-7 col-md-7 col-sm-7 col-xs-7"> </div>
					<div className = "col-lg-5 col-md-5 col-sm-5 col-xs-5"> 
						<button type="button" className="btn btn-success" onClick = {this.changepass}> &nbsp;&nbsp;&nbsp; Change Password &nbsp;&nbsp;&nbsp;</button>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<button type="button" className="btn btn-primary" onClick = {this.logout}> &nbsp;&nbsp; Logout &nbsp;&nbsp; </button>
					</div>
					
				</div>
				
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<div className = "row">
					<div className = "col-lg-3 col-md-3 col-sm-3 col-xs-3">
						<button type="button" className="btn btn-warning btn-lg" onClick = {this.enter_comm}> &nbsp;&nbsp;&nbsp; Enter New Communication &nbsp;&nbsp;&nbsp;</button>
					</div>
					
					<div className = "col-lg-2 col-md-2 col-sm-2 col-xs-2"> </div>
					
					<div className = "col-lg-3 col-md-3 col-sm-3 col-xs-3">
						<button type="button" className="btn btn-info btn-lg" onClick = {this.view_comm}> &nbsp;&nbsp;&nbsp; View Old Communications &nbsp;&nbsp;&nbsp;</button>
					</div>
					
					<div className = "col-lg-6 col-md-6 col-sm-6 col-xs-6"></div>
				</div>
				
			</div>
		)
	}
}

export default UserLogin