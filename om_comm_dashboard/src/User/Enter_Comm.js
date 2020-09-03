import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios'
import qs from 'qs'

import UserLogin from './UserLogin'

class Enter_Comm extends Component
{
	constructor(props)
	{
		super(props);
		
		this.state = 
		{
			emps: [],
			c_type : [],
			comm_reason_list : [],
			empl: "",
			ctype: "1",
			notes: "",
			file: "",
			file11 : "",
			username : "",
			comm_response : "",
			comm_reason : "",
			danger_alert : false,
			somethingwrong_alert : false
		};
		
		this.back = this.back.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onchange = this.onchange.bind(this);
		
	}
	
	handleUpload(e)
	{
		let files = e.target.files
		let reader = new FileReader();
		reader.readAsDataURL(files[0]);
		
		reader.onload=(e)=>{
			console.log("file data : ", e.target.result)
			this.setState({file: e.target.result});
		}
		
		
		let file11 = e.target.files[0]
		this.setState({file11: file11})
	}
	
	back()
	{
		ReactDOM.render(<UserLogin user_id = {this.props.user_id} />, document.getElementById("root"));
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
		
		axios.get('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/get_username.php?user_id='+this.props.user_id)
		.then(response => 
		{
            this.setState({
				username: response.data.name
			})
		})
	}
	
	onchange(e)
	{
		this.setState({
			[e.target.name]: e.target.value
		});
	}	
	
	handleSubmit(e)
	{
		e.preventDefault();
		
		const obj = {
			user_id : this.props.user_id,
			empl : this.state.empl,
			ctype : this.state.ctype,
			notes : this.state.notes,
			comm_response : this.state.comm_response,
			comm_reason : this.state.comm_reason
		}
		
		if(obj.empl <= 1 || obj.ctype <= 1 || obj.notes.length === 0 || obj.comm_reason <= 1)
		{
			this.setState({
				danger_alert : true
			})
		}
		else if(obj.ctype === 6 && obj.comm_response.length === 0)
		{
			this.setState({
				danger_alert : true
			})
		}
		else if(obj.ctype === 8 && obj.comm_response.length === 0)
		{
			this.setState({
				danger_alert : true
			})
		}
		else
		{
			axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/enter_new_comm.php', qs.stringify(obj))
			.then(res => 
			{
				
				if(res.data.entry === true || res.data.entry === 'true')
				{
					const obj1 = {
						file_name : this.state.file11.name,
						file_type : this.state.file11.type,
						file_size : this.state.file11.size,
						file1 : this.state.file,
						comm_id : res.data.comm_id
					}
					
					if(obj1.file_name != null)
					{
						axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/update_new_comm.php', qs.stringify(obj1))
						.then(resp=>
						{
							if(resp.data.stat === "yes")
							{
								alert("Success! File was uploaded successfully.")
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
					else
					{
						alert("Success! Communication was entered successfully.");
						this.back();
					}
					
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
	
	
	render()
	{
		let optionItems = this.state.emps.map((emps1) =>
                <option key={emps1.emp_id} value = {emps1.emp_id}>{emps1.emp_name}</option>
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
					<strong>Error! Please fill out all the required fields.</strong>
				</div>}

				{this.state.somethingwrong_alert && <div class="alert alert-warning">
					<strong>Warning! Something went wrong. Please try again in a few moments.</strong>
				</div>}

				<div className = "row">
					<center> <h1 style = {{color : "#33a5ff"}}> <b>
						Occ Med Communication Database
					</b> </h1> </center>
				</div>
				<br />
				
				<div className = "row">
					<div className = "col-lg-7 col-md-7 col-sm-7 col-xs-7">
						<p> You are logged in as <b>{this.state.username}</b></p>
					</div>
					<div className = "col-lg-5 col-md-5 col-sm-5 col-xs-5"> 
					</div>
					
				</div>
				<br />
				
				<div className = "row">
					<div className = "col-lg-7 col-md-7 col-sm-7 col-xs-7">
						<h4> <b> Enter New Communication</b> </h4>
					</div>
					<div className = "col-lg-5 col-md-5 col-sm-5 col-xs-5"> 
						<button type="button" className="btn btn-success" onClick = {this.back}> &nbsp;&nbsp;&nbsp; Back &nbsp;&nbsp;&nbsp;</button>
					</div>
					
				</div>
				
				<br/>
				<br/>
				<div className = "row">
					<div className = "col-lg-6 col-md-6 col-sm-6 col-xs-6">
						<form className="form-horizontal">
							
							<div className="form-group">
								<label><b> Employer *</b></label>
								<select className = "form-control" onChange = {this.onchange} name = "empl" value = {optionItems.emp_id} style={{ borderColor: this.state.empl <=1 ? "#DC143C" : "#79CDCD" }}>
									{optionItems}
								</select>
							</div>
							
							<div className="form-group">
								<label><b> Communication Type *</b></label>
								<select className = "form-control" onChange = {this.onchange} name = "ctype" value = {optionItems_ctype.comm_type_id} style={{ borderColor: this.state.ctype <=1 ? "#DC143C" : "#79CDCD" }}>
									{optionItems_ctype}
								</select>
							</div>

							<div>
								{this.state.ctype === "6" && <div className="form-group">
									<label><b> Communication Response *</b></label>
									<div>
										<textarea className = "form-control" rows = "5"  name = "comm_response" value = {this.state.comm_response} placeholder = "Enter your Communication Reason here" onChange = {this.onchange}  style={{ borderColor: this.state.comm_response.length === 0 ? "#DC143C" : "#79CDCD" }}/>
									</div>
								</div>}
							</div>

							<div>
								{this.state.ctype === "8" && <div className="form-group">
									<label><b> Communication Response *</b></label>
									<div>
										<textarea className = "form-control" rows = "5"  name = "comm_response" value = {this.state.comm_response} placeholder = "Enter your Communication Reason here" onChange = {this.onchange}  style={{ borderColor: this.state.comm_response.length === 0 ? "#DC143C" : "#79CDCD" }}/>
									</div>
								</div>}
							</div>	

							<div className="form-group">
								<label><b> Communication Reason *</b></label>
								<select className = "form-control" onChange = {this.onchange} name = "comm_reason" value = {optionItems_reason.comm_reason_id} style={{ borderColor: this.state.comm_reason <=1 ? "#DC143C" : "#79CDCD" }}>
									{optionItems_reason}
								</select>
							</div>
							
							<div className="form-group">
								<label><b> Notes *</b></label>
								<div>
									<textarea className = "form-control" rows = "5"  name = "notes" value = {this.state.notes} placeholder = "Enter your communication notes here" onChange = {this.onchange}  style={{ borderColor: this.state.notes.length === 0 ? "#DC143C" : "#79CDCD" }}/>
								</div>
							</div>
							
							<div className="form-group">
								<label><b> Upload File (PDF/TXT Only) </b>(optional)</label>
								<div>
									<input className = "form-control" type = "file" name = "file" onChange = {(e)=>this.handleUpload(e)} />
								</div>
							</div>
							
							<div className="form-group">
								<button type="button" className="btn btn-success" onClick = {this.handleSubmit}> &nbsp;&nbsp;&nbsp; Submit &nbsp;&nbsp;&nbsp;</button>
							</div>
							
						</form>
					</div>
					
					<div className = "col-lg-6 col-md-6 col-sm-6 col-xs-6"></div>
				</div>
				
			</div>
		)
	}
}

export default Enter_Comm