import React, {Component} from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Redirect} from "react-router"

import AdminLogin from '../AdminLogin'

class ViewEmpDetsRows extends Component
{
	constructor(props)
	{
		super(props)
		this.state = 
		{
			redirect: false,
			url1 : ""
		};
		
		this.flag = this.flag.bind(this)
		
		this.back = this.back.bind(this)
	}
	
	back()
	{
		ReactDOM.render(<AdminLogin user_id = {this.props.obj.user_id} />, document.getElementById("root"));
	}
	
	flag()
	{
		axios.get('http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/flag.php?comm_id='+this.props.obj.id)
		.then(
			this.setState({ redirect: true })
		)
		.catch(err => console.log(err))
	}

	render()
	{
		const { redirect } = this.state;
		
		if(redirect)
		{
			return (
			<Router>
			
				<Route>
					<Redirect to='ViewDataTable' data = {this.props.obj}/>
				</Route>
			</Router>)
		}
		
		
		const condition = this.props.obj.bankruptcy === 1 || this.props.obj.bankruptcy === '1' || this.props.obj.collections === 1 || this.props.obj.collections === '1';
		
		return (
				<tr style={{ backgroundColor: condition ? "#FED2D2" : "white" }}>
					<td>
						{this.props.obj.emp_name}
					</td>
					<td>
						{this.props.obj.employer_ID}
					</td>
					<td>
						{this.props.obj.emp_dept}
					</td>
					<td>
						{this.props.obj.emp_add1}
					</td>
					<td>
						{this.props.obj.emp_add2}
					</td>
					<td>
						{this.props.obj.emp_suite}
					</td>
					<td>
						{this.props.obj.emp_city}
					</td>
					<td>
						{this.props.obj.emp_state}
					</td>
					<td>
						{this.props.obj.emp_zip}
					</td>
					<td>
						{this.props.obj.emp_country}
					</td>
                    <td>
						{this.props.obj.emp_phone}
					</td>
					<td>
						{this.props.obj.emp_ext}
					</td>
					<td>
						{this.props.obj.emp_fax}
					</td>
					<td>
						{this.props.obj.emp_primary_contact}
					</td>
					<td>
                        <a href={"mailto:"+this.props.obj.emp_email}> <button className = "btn btn-link"> {this.props.obj.emp_email} </button> </a> 
					</td>
                    <td>
						{this.props.obj.email_invoices}
					</td>
					<td>
						{this.props.obj.mail_invoices}
					</td>
					<td>
						{this.props.obj.portal_invoices}
					</td>
					<td>
						{this.props.obj.portal_login}
					</td>
					<td>
						{this.props.obj.fiscal_year_end}
					</td>
                    <td>
						{this.props.obj.encryp_emails}
					</td>
					<td>
						{this.props.obj.spl_bill_inst}
					</td>
					<td>
						{this.props.obj.pricing}
					</td>
					<td>
						{this.props.obj.bankruptcy}
					</td>
					<td>
						{this.props.obj.collections}
					</td>
				</tr>

		);
	}
}

export default ViewEmpDetsRows