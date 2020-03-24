import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import qs from "qs"
import axios from "axios"
import moment from "moment"

import UserLogin from '../UserLogin'
import ViewDataTable from './ViewDataTable'
import FlaggedComms from './FlaggedComms'

class View_DateRange extends Component
{
	constructor(props)
	{
		super(props)
		this.state = 
		{
			emps: [],
			c_type : [],
			empl: "",
			username : ""
		}
		
		this.onchange = this.onchange.bind(this)
		this.resetform = this.resetform.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.back = this.back.bind(this);
		this.flagged_comms = this.flagged_comms.bind(this)
	}
	
	onchange(e)
	{
		this.setState({
			[e.target.name] : e.target.value
		})
	}
	
	back()
	{
		ReactDOM.render(<UserLogin user_id = {this.props.user_id} />, document.getElementById("root"))
	}
	
	resetform()
	{
		this.setState({
			emps: [],
			empl: "",
		});
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
		
		axios.get('http://localhost:81/OM_Comm_Dash/om_comm_backend/get_username.php?user_id='+this.props.user_id)
		.then(response => 
		{
            this.setState({
				username: response.data.name
			})
		})
	}
	
	flagged_comms(e)
	{
		e.preventDefault();
		
		const obj = {
			user_id : this.props.user_id,
			empl : this.state.empl,
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
				ReactDOM.render(<ViewDataTable data = {obj} emp_name = {response.data.emp_name} />, document.getElementById('root'));
			})
		}
	}
	
	render()
	{
		let optionItems = this.state.emps.map((emps1) =>
                <option key={emps1.emp_id} value = {emps1.emp_id}>{emps1.emp_name}</option>
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
						<h4>
							You are logged in as {this.state.username}
						</h4>
					</div>
					<div className = "col-lg-5 col-md-5 col-sm-5 col-xs-5"> 
						<button type="button" className="btn btn-primary" onClick = {this.back}> &nbsp;&nbsp; Back &nbsp;&nbsp; </button>
					</div>
					
				</div>
				
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

export default View_DateRange