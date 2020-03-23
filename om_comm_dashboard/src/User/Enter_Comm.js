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
			empl: "",
			ctype: "",
			notes: "",
			file: "",
			file11 : ""
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
		axios.get('http://localhost:81/OM_Comm_Dash/om_comm_backend/get_emps.php')
		.then(response => 
		{
            this.setState({
				emps: response.data
			})
			//console.log(response.data);
		})
		
		axios.get('http://localhost:81/OM_Comm_Dash/om_comm_backend/get_com_type.php')
		.then(resp => 
		{
            this.setState({
				c_type: resp.data
			})
			//console.log(resp.data);
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
		}
		
		if(obj.empl.length === 0 || obj.ctype.length === 0 || obj.notes.length === 0)
		{
			alert("Fill out all the fields!")
		}
		else
		{
			axios.post('http://localhost:81/OM_Comm_Dash/om_comm_backend/enter_new_comm.php', qs.stringify(obj))
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
					console.log(obj1);
					axios.post('http://localhost:81/OM_Comm_Dash/om_comm_backend/update_new_comm.php', qs.stringify(obj1))
					.then(resp=>
					{
						if(resp.data.stat == "yes")
						{
							alert("Uploaded File successfully.");
							this.back();
						}
						else
						{
							alert("There was some error in uploading the file.");
							this.back();
						}
					});
				}
				else
				{
					alert("Something went wrong. Please try again later.");
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
								<label><b> Employer </b></label>
								<select className = "form-control" onChange = {this.onchange} name = "empl" value = {optionItems.emp_id}>
									{optionItems}
								</select>
							</div>
							
							<div className="form-group">
								<label><b> Communication Type </b></label>
								<select className = "form-control" onChange = {this.onchange} name = "ctype" value = {optionItems_ctype.comm_type_id}>
									{optionItems_ctype}
								</select>
							</div>
							
							<div className="form-group">
								<label><b> Notes </b></label>
								<div>
									<textarea className = "form-control" rows = "5"  name = "notes" value = {this.state.notes} placeholder = "Enter your communication notes here" onChange = {this.onchange} />
								</div>
							</div>
							
							<div className="form-group">
								<label><b> Upload File (PDF/TXT Only)</b></label>
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