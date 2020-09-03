import React, {Component} from "react";
import ReactDOM from "react-dom"
import axios from "axios"
import qs from "qs"
import ReactToExcel from 'react-html-table-to-excel'

import AdminLogin from "../AdminLogin"
import ViewTableRows from "./ViewTableRows"
import ViewDataTable1 from "./ViewDataTable1"

var FA = require('react-fontawesome')

class ViewDataTable extends Component
{
	constructor(props)
	{
		super(props);
		this.state = 
		{
			comms: [],
			show : false,
			obj: [],
			c_type : [],
			ctype :this.props.data.ctype,
			creason : this.props.data.creason,
			comm_reason_list : [],
			emp_name : "",
			username : "",
			notes: "",
			count : "",
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
			collections_alert : false,
			bankruptcy_alert : false
		};
		
		this.onChange = this.onChange.bind(this);
		this.onclickCommType = this.onclickCommType.bind(this);
		this.onclickCommReason = this.onclickCommReason.bind(this);
		
		this.sort_date_asc = this.sort_date_asc.bind(this);
		this.sort_date_desc = this.sort_date_desc.bind(this);
		
		this.back = this.back.bind(this);
		this.save = this.save.bind(this);
		this.saveempdetails = this.saveempdetails.bind(this);
	}
	
	onChange(e)
	{
		this.setState({
			[e.target.name] : e.target.value
		})
		
	}

	saveempdetails()
	{
		const obj = {
			user_id : this.props.data.user_id,
			empl : this.props.data.empl,
			ctype : this.props.data.ctype,
			order: 'desc',
			user : this.props.data.user,
			start : this.props.data.start,
			end: this.props.data.end,
			email_invoices : this.state.email_invoices,
			mail_invoices : this.state.mail_invoices,
			portal_invoices : this.state.portal_invoices,
			portal_login : this.state.portal_login,
			fiscal_year_end : this.state.fiscal_year_end,
			encryp_emails : this.state.encryp_emails,
			spl_bill_inst : this.state.spl_bill_inst,
			pricing : this.state.pricing,
			bankruptcy : this.state.bankruptcy,
			collections : this.state.collections,
			creason : this.props.data.creason
		}

		axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/get_emp_name.php',qs.stringify(obj))
		.then(response => 
		{
			this.setState({
				emp_name : response.data.emp_name
			})
		})

		axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/save_emp_details.php',qs.stringify(obj))
		.then(response => 
		{
			ReactDOM.render(<ViewDataTable1 data = {obj} emp_name = {this.state.emp_name} />, document.getElementById('root'));
		})
	}
	
	save()
	{
		const obj = {
			user_id : this.props.data.user_id,
			empl : this.props.data.empl,
			ctype : this.props.data.ctype,
			order: 'desc',
			user : this.props.data.user,
			start : this.props.data.start,
			end: this.props.data.end,
			notes: this.state.notes,
			creason : this.props.data.creason
		}
		
		axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/get_emp_name.php',qs.stringify(obj))
		.then(response => 
		{
			this.setState({
				emp_name : response.data.emp_name
			})
		})
		
		axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/save_emp_notes.php',qs.stringify(obj))
		.then(response => 
		{
			ReactDOM.render(<ViewDataTable1 data = {obj} emp_name = {this.state.emp_name} />, document.getElementById('root'));
		})
	}
	
	sort_date_asc(props)
	{
		const obj = {
			user_id : this.props.data.user_id,
			empl : this.props.data.empl,
			ctype : this.props.data.ctype,
			order: 'asc',
			user : this.props.data.user,
			start : this.props.data.start,
			end: this.props.data.end,
			creason : this.props.data.creason
		}
		
		axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/get_emp_name.php',qs.stringify(obj))
		.then(response => 
		{
			this.setState({
				emp_name : response.data.emp_name
			})
		})
		
		axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/view_date_range_user.php',qs.stringify(obj))
		.then(response => 
		{
			ReactDOM.render(<ViewDataTable1 data = {obj} emp_name = {this.state.emp_name} />, document.getElementById('root'));
		})
		
	}
	
	sort_date_desc(props)
	{
		const obj = {
			user_id : this.props.data.user_id,
			empl : this.props.data.empl,
			ctype : this.props.data.ctype,
			order: 'desc',
			user : this.props.data.user,
			start : this.props.data.start,
			end: this.props.data.end,
			creason : this.props.data.creason
		}
		
		axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/get_emp_name.php',qs.stringify(obj))
		.then(response => 
		{
			this.setState({
				emp_name : response.data.emp_name
			})
		})
		
		axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/view_date_range_user.php',qs.stringify(obj))
		.then(response => 
		{
			ReactDOM.render(<ViewDataTable1 data = {obj} emp_name = {this.state.emp_name} />, document.getElementById('root'));
		})
		
	}
	
	onclickCommType(props)
	{
		
		const obj = {
			user_id : this.props.data.user_id,
			empl : this.props.data.empl,
			ctype : this.state.ctype,
			user : this.props.data.user,
			start : this.props.data.start,
			end: this.props.data.end,
			creason : this.props.data.creason
		}
		axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/get_emp_name.php',qs.stringify(obj))
		.then(response => 
		{
			this.setState({
				emp_name : response.data.emp_name
			})
		})
			
		axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/view_date_range_user.php',qs.stringify(obj))
		.then(response => 
		{
			ReactDOM.render(<ViewDataTable1 data = {obj} emp_name = {this.state.emp_name} />, document.getElementById('root'));
		})
		
	}

	onclickCommReason(props)
	{
		const obj = {
			user_id : this.props.data.user_id,
			empl : this.props.data.empl,
			ctype : this.props.data.ctype,
			user : this.props.data.user,
			start : this.props.data.start,
			end: this.props.data.end,
			creason : this.state.creason
		}
		axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/get_emp_name.php',qs.stringify(obj))
		.then(response => 
		{
			this.setState({
				emp_name : response.data.emp_name
			})
		})
		
		axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/view_date_range_user.php',qs.stringify(obj))
		.then(response => 
		{
			ReactDOM.render(<ViewDataTable1 data = {obj} emp_name = {this.state.emp_name} />, document.getElementById('root'));
		})
		
	}
	
	back(props)
	{
		ReactDOM.render(<AdminLogin user_id = {this.props.data.user_id} />, document.getElementById('root'));
	}
	
	componentDidMount()
	{
		axios.post('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/view_date_range_user.php', qs.stringify(this.props.data))
		.then(res => 
			{
				this.setState({ 
					comms: res.data,
					count: res.data[0].count 
					});
			})
			
		axios.get('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/get_com_type.php')
		.then(resp => 
		{
            this.setState({
				c_type: resp.data
			})
		})

		axios.get('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/view_emp_details.php?empl='+this.props.data.empl+'&user_id='+this.props.data.user_id)
		.then(response => 
		{
			this.setState({
				obj: response.data,
				notes: response.data.emp_notes,
				email_invoices : response.data.email_invoices,
				mail_invoices : response.data.mail_invoices,
				portal_invoices : response.data.portal_invoices,
				portal_login : response.data.portal_login,
				fiscal_year_end : response.data.fiscal_year_end,
				encryp_emails : response.data.encryp_emails,
				spl_bill_inst : response.data.spl_bill_inst,
				pricing : response.data.pricing,
				bankruptcy : response.data.bankruptcy,
				collections : response.data.collections,
			});
			if(this.state.collections === '1')
			{
				this.setState({
					collections_alert: true
				})
			}
			else
			{
				this.setState({
					collections_alert: false
				})
			}

			if(this.state.bankruptcy === '1')
			{
				this.setState({
					bankruptcy_alert: true
				})
			}
			else
			{
				this.setState({
					bankruptcy_alert: false
				})
			}
		})
		
		axios.get('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/get_username.php?user_id='+this.props.data.user_id)
		.then(response => 
		{
            this.setState({
				username: response.data.name
			})
		})

		axios.get('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/get_comm_reason.php')
		.then(resp => 
		{
            this.setState({
				comm_reason_list: resp.data
			})
		})
	}
	
	commList()
	{
		return this.state.comms.map(function(object)
		{
			return <ViewTableRows key={object.comm_id} obj={object} />;
		});
	}
	
	render()
	{
		let optionItems_ctype = this.state.c_type.map((c_type1) =>
                <option key={c_type1.comm_type_id} value = {c_type1.comm_type_id}>{c_type1.comm_type_name}</option>
			);
			
		let optionItems_reason = this.state.comm_reason_list.map((comm_reason1) =>
			<option key={comm_reason1.comm_reason_id} value = {comm_reason1.comm_reason_id}>{comm_reason1.comm_reason_name}</option>
		);
		
		return (
				<div className = "container-fluid">
					<br />
					<br />
					
					{this.state.collections_alert && <div class="alert alert-danger">
					<h3><center>This Employer Account is in collection.</center></h3>
					</div>}

					{this.state.bankruptcy_alert && <div class="alert alert-danger">
					<h3><center>This Employer Account is in Bankruptcy.</center></h3>
					</div>}

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
								All communications:
							</b> </h4>
						</div>
						<div className = "col-lg-2 col-md-2 col-sm-2 col-xs-2"> 
							<button type="button" className="btn btn-primary" onClick = {this.back}> &nbsp;&nbsp; Back &nbsp;&nbsp; </button>
						</div>
					</div>
					
					<ReactToExcel className = "btn btn-primary" table="table-to-xls" filename="OM Communicatons" sheet="Sheet 1" buttonText="EXPORT" />
					
					<table className="table table-striped table-bordered" id="table-to-xls" style={{marginTop: 20}}>
						<thead>
							<tr>
								<th colSpan="5">
									<center style = {{padding: "30px"}}><h3>Employer Name: {this.props.emp_name}</h3></center>
								</th>
								<th>
									<select className = "form-control" onChange = {this.onChange} name = "ctype" value = {this.state.ctype}>
										{optionItems_ctype}
									</select>
									<br/>	
									<button type="button" className="btn btn-warning" onClick = {this.onclickCommType} > Change Communication Type </button>
								</th>
								<th>
									<select className = "form-control" onChange = {this.onChange} name = "creason" value = {this.state.creason}>
										{optionItems_reason}
									</select>
									<br/>	
									<button type="button" className="btn btn-warning" onClick = {this.onclickCommReason} > Change Communication Reason </button>
								</th>
							</tr>
							<tr>
								<td colSpan="7">
									{<EmpDetails data = {this.state.obj}/>}
								</td>
							</tr>
							<tr>
								<td colSpan="7">
									<table className="table table-striped table-bordered">
										<tbody>
											<tr>
												<td> 
													<b> Email Invoices: </b>
													<select className = "form-control" value = {this.state.email_invoices} name = "email_invoices" onChange = {this.onChange} placeholder = {this.state.email_invoices}>
														<option value="1"> Yes </option>
														<option value="0"> No </option>
													</select>
												 </td>
												<td> 
													<b> Mail Invoices: </b>
													<select className = "form-control" value = {this.state.mail_invoices} name = "mail_invoices" onChange = {this.onChange} placeholder = {this.state.mail_invoices}>
														<option value="1"> Yes </option>
														<option value="0"> No </option>
													</select>
												</td>
												<td> 
													<b> Portal Invoices: </b>
													<select className = "form-control" value = {this.state.portal_invoices} name = "portal_invoices" onChange = {this.onChange} placeholder = {this.state.portal_invoices}>
														<option value="1"> Yes </option>
														<option value="0"> No </option>
													</select>
												</td>
												<td> 
													<b> Fiscal Year End: </b>
													<select className = "form-control" value = {this.state.fiscal_year_end} name = "fiscal_year_end" onChange = {this.onChange} placeholder = {this.state.fiscal_year_end}>
														<option value="1"> Jan </option>
														<option value="2"> Feb </option>
														<option value="3"> Mar </option>
														<option value="4"> Apr </option>
														<option value="5"> May </option>
														<option value="6"> Jun </option>
														<option value="7"> Jul </option>
														<option value="8"> Aug </option>
														<option value="9"> Sep </option>
														<option value="10"> Oct </option>
														<option value="11"> Nov </option>
														<option value="12"> Dec </option>
													</select>
												</td>
												<td> 
													<b> Portal Login: </b>
													<textarea className = "form-control" rows = "2" name = "portal_login" value = {this.state.portal_login} onChange = {this.onChange} placeholder = {this.state.portal_login} />
												</td>	
											</tr>
											
											<tr>
												<td> 
													<b> Can receive Encypted Emails: </b>
													<select className = "form-control" value = {this.state.encryp_emails} name = "encryp_emails" onChange = {this.onChange} placeholder = {this.state.encryp_emails}>
														<option value="2">  </option>
														<option value="1"> Yes </option>
														<option value="0"> No </option>
													</select>
												</td>
												<td> 
													<b> Pricing: </b> 
													<select className = "form-control" value = {this.state.pricing} name = "pricing" onChange = {this.onChange} placeholder = {this.state.pricing}>
														<option value="1"> Region I </option>
														<option value="2"> Region II </option>
														<option value="3"> Region III </option>
														<option value="4"> Region IV </option>
														<option value="5"> Special </option>
													</select>
												</td>
												<td style={{ backgroundColor: this.state.bankruptcy === '1' ? "#F08080" : "white" }}> 
													<b> Bankruptcy: </b>
													<select className = "form-control" value = {this.state.bankruptcy} name = "bankruptcy" onChange = {this.onChange} placeholder = {this.state.bankruptcy}>
														<option value="1"> Yes </option>
														<option value="0"> No </option>
													</select>
												</td>
												<td style={{ backgroundColor: this.state.collections === '1' ? "#F08080" : "white" }}> 
													<b> Collections: </b>
													<select className = "form-control" value = {this.state.collections} name = "collections" onChange = {this.onChange} placeholder = {this.state.collections}>
														<option value="1"> Yes </option>
														<option value="0"> No </option>
													</select>
												</td>
												<td> 
													<b> Special Billing Instructions: </b>
													<textarea className = "form-control" rows = "2" name = "spl_bill_inst" value = {this.state.spl_bill_inst} onChange = {this.onChange} placeholder = {this.state.spl_bill_inst} />
												</td>
											</tr>
											<tr>
												<td colSpan = "7">
													<center>
														<button className="btn btn-warning" onClick = {this.saveempdetails}> Save Employer Details</button>
													</center>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
							<tr>
								<td colSpan = "7">
									<div className="form-group">
										<label><b> Employer Notes </b></label>
										<div className = "row">
											<div className = "col-lg-12 col-md-12 col-sm-12 col-xs-12">
												<textarea className = "form-control" rows = "3" name = "notes" value = {this.state.notes} onChange = {this.onChange} />
											</div>
										</div>
										<div className = "row">
											<div className = "col-lg-5 col-md-5 col-sm-5 col-xs-5">
											</div>
											<div className = "col-lg-2 col-md-2 col-sm-2 col-xs-2">
												<button className="btn btn-warning" onClick = {this.save}> Save Notes</button>
											</div>
											<div className = "col-lg-5 col-md-5 col-sm-5 col-xs-5">
											</div>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td colSpan = "7">
									<div className="form-group">
										<label><b> Total number of communications: </b> &nbsp;{this.state.count} </label>
									</div>
								</td>
							</tr>
							<tr>
							</tr>
							<tr>
								<th> Date  <button type="button" className="btn btn-info" onClick = {this.sort_date_asc}> <FA name="arrow-up" /></button> &nbsp;<button type="button" className="btn btn-success" onClick = {this.sort_date_desc}> <FA name="arrow-down" /> </button> </th>
								<th> User </th>
								<th> Communication Type </th>
								<th> Communication Reason </th>
								<th> Communication Notes </th>
								<th> File Attached </th>
								<th> Actions </th>
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

class EmpDetails extends Component
{
	
	render()
	{
		return (
		
			<div className = "container-fluid">
			<br />
				<table className="table table-striped table-bordered">
					<tbody>
						<tr>
							<td> <b> Employer ID: </b> &nbsp;{this.props.data.employer_ID} </td>
							<td> <b> Employer Department: </b> &nbsp;{this.props.data.emp_dept}</td>
							<td> <b> Primary Contact: </b> &nbsp;{this.props.data.emp_primary_contact}</td>
							<td> <b> Phone: </b> &nbsp;{this.props.data.emp_phone}</td>
							<td> <b> Extension: </b> &nbsp;{this.props.data.emp_ext}</td>
							<td> <b> Fax number: </b> &nbsp;{this.props.data.emp_fax}</td>
							<td> <b> Email Address: </b> <a href={"mailto:"+this.props.data.emp_email}> <button className = "btn btn-link"> {this.props.data.emp_email}</button> </a> </td>
						</tr>
						
						<tr>
							<td> <b> Address 1: </b> &nbsp;{this.props.data.emp_add1}</td>
							<td> <b> Address 2: </b> &nbsp;{this.props.data.emp_add2}</td>
							<td> <b> Suite: </b> &nbsp;{this.props.data.emp_suite}</td>
							<td> <b> City: </b> &nbsp;{this.props.data.emp_city}</td>
							<td> <b> State: </b> &nbsp;{this.props.data.emp_state}</td>
							<td> <b> Zip Code: </b> &nbsp;{this.props.data.emp_zip}</td>
							<td> <b> Country: </b> &nbsp;{this.props.data.emp_country}</td>
						</tr>	
					</tbody>
				</table>
			</div>
		)
		
	}
}

export default ViewDataTable