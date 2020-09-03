import React, {Component} from "react";
import ReactDOM from "react-dom"
import axios from "axios"
import qs from "qs"
import ReactToExcel from 'react-html-table-to-excel'

import AdminLogin from "../AdminLogin"
import ViewEmpDetsRows from './ViewEmpDetsRows'

class ViewEmployersTable extends Component
{
	constructor(props)
	{
		super(props);
		this.state = 
		{
			dets: [],
			emp_name : "",
			username : "",
			email_invoices : "",
			mail_invoices : "",
			portal_invoices : "",
			portal_login : "",
			fiscal_year_end : "",
			encryp_emails : "",
			spl_bill_inst : "",
			pricing : "",
			bankruptcy : "",
			collections : "",
		};
		
		this.back = this.back.bind(this);

	}
	
	back(props)
	{
		ReactDOM.render(<AdminLogin user_id = {this.props.data.user_id} />, document.getElementById('root'));
	}
	
	componentDidMount()
	{
		axios.get('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/get_username.php?user_id='+this.props.data.user_id)
		.then(response => 
		{
            this.setState({
				username: response.data.name
			})
		})

		axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/view_employer_by_admin.php',qs.stringify(this.props.data))
		.then(resp => 
		{
            this.setState({
				dets: resp.data
			})
		})
	}
	
	commList()
	{
		return this.state.dets.map(function(object)
		{
			return <ViewEmpDetsRows key={object.id} obj={object} />;
		});
	}
	
	render()
	{
		
		return (
				<div className = "container-fluid">
					<br />
					<br />
					
					<div className = "row">
						<center> <h1 style = {{color : "#33a5ff"}}> <b>
							Occ Med Communication Database
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
						<div className = "col-lg-10 col-md-10 col-sm-10 col-xs-10">
							<h4> <b>
								Employers based on your search:
							</b> </h4>
						</div>
						<div className = "col-lg-2 col-md-2 col-sm-2 col-xs-2"> 
							<button type="button" className="btn btn-primary" onClick = {this.back}> &nbsp;&nbsp; Back &nbsp;&nbsp; </button>
						</div>
					</div>
					
					<ReactToExcel className = "btn btn-primary" table="table-to-xls" filename="EMployer Details" sheet="Sheet 1" buttonText="EXPORT" />
					
					<table className="table table-striped table-bordered" id="table-to-xls" style={{marginTop: 20}}>
						<thead>
							<tr>
								<th> Employer Name </th>
								<th> Employer ID </th>
								<th> Employer Dept </th>
								<th> Address Line 1 </th>
								<th> Address Line 2 </th>
								<th> Suite </th>
								<th> City </th>
								<th> State </th>
								<th> Zip </th>
								<th> Country </th>
                                <th> Phone </th>
								<th> Extension </th>
								<th> Fax </th>
								<th> Primary contact </th>
								<th> Email </th>
                                <th> Email Invoices </th>
								<th> Mail Invoices </th>
								<th> Portal Invoices </th>
								<th> Portal Login </th>
								<th> Fiscal Year End </th>
                                <th> Encrypted Emails </th>
								<th> Spl Billing Instructions </th>
								<th> Pricing </th>
								<th> Bankruptcy </th>
								<th> Collections </th>
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

export default ViewEmployersTable