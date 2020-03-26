import React, {Component} from "react";
import ReactDOM from "react-dom"
import axios from "axios"
import qs from "qs"

import View_DateRange from "./View_DateRange"
import ViewFlaggedRows from "./ViewFlaggedRows"

class FlaggedComms extends Component
{
	constructor(props)
	{
		super(props);
		this.state = 
		{
			comms: [],
			username : ""
		};
		
		this.back = this.back.bind(this);
	}
	
	
	back(props)
	{
		ReactDOM.render(<View_DateRange user_id = {this.props.data.user_id} />, document.getElementById('root'));
	}
	
	componentDidMount()
	{
		axios.post('http://localhost:81/OM_Comm_Dash/om_comm_backend/view_flagged_comms_user.php', qs.stringify(this.props.data))
		.then(res => 
			{
				this.setState({ comms: res.data });
			})
			
		axios.get('http://localhost:81/OM_Comm_Dash/om_comm_backend/get_username.php?user_id='+this.props.data.user_id)
		.then(response => 
		{
            this.setState({
				username: response.data.name
			})
		})
	}
	
	commList()
	{
		return this.state.comms.map(function(object)
		{
			return <ViewFlaggedRows key={object.userid} obj={object} />;
		});
	}
	
	render()
	{
		return (
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
						</div>
						
					</div>
					<br />
				
					<div className = "row">
						<div className = "col-lg-7 col-md-7 col-sm-7 col-xs-7">
							<h4> <b>
								View Flagged Communications:
							</b> </h4>
						</div>
						<div className = "col-lg-5 col-md-5 col-sm-5 col-xs-5"> 
							<button type="button" className="btn btn-primary" onClick = {this.back}> &nbsp;&nbsp; Back &nbsp;&nbsp; </button>
						</div>
						
					</div>
					<br />
					
					<br/>
						<table className="table table-striped table-bordered" style={{marginTop: 20}}>
							<thead>
								<tr>
									<th colSpan="4"> Employer Name: {this.props.emp_name} </th>
								</tr>
								<tr>
									<th> User</th>
									<th> Communication Date</th>
									<th> Communication Type </th>
									<th> Attached File </th>
									<th> Notes </th>
								</tr>
							</thead>
							<tbody>
								{this.commList()}
							</tbody>
						</table>
					
				</div>
		)
		
	}
}

export default FlaggedComms