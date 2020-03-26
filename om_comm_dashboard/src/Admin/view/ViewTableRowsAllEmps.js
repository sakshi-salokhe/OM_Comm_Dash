import React, {Component} from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import qs from "qs"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Redirect} from "react-router"

import AdminLogin from '../AdminLogin'
import ViewDataTableAllEmps from './ViewDataTableAllEmps'


class ViewTableRowsAllEmps extends Component
{
	constructor(props)
	{
		super(props)
		this.state = 
		{
			redirect: false
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
		axios.get('http://localhost:81/OM_Comm_Dash/om_comm_backend/flag.php?comm_id='+this.props.obj.id)
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
					<Redirect to='ViewDataTableAllEmps' data = {this.props.obj}/>
				</Route>
			</Router>)
		}
		console.log(this.props.obj);
		const condition = this.props.obj.comm_flag === 1 || this.props.obj.comm_flag === '1';
		const condition2 = this.props.obj.id === null;
		
		return (
				<tr style={{ backgroundColor: condition ? "#FED2D2" : "white" }}>
					<td>
						{this.props.obj.comm_date}
					</td>
					<td>
						{this.props.obj.user}
					</td>
					<td>
						{this.props.obj.emp_name}
					</td>
					<td>
						{this.props.obj.ctype_name}
					</td>
					<td>
						{this.props.obj.comm_notes}
					</td>
					<td>
						<a target = '_blank' href={this.props.obj.comm_file} > {this.props.obj.file_name} </a>
					</td>
					<td>
						<button type="button" disabled = {condition2 || condition} className="btn btn-danger" onClick = {this.flag}> &nbsp; Mark Wrong &nbsp; </button>
					</td>
						
				</tr>

		);
	}
}

export default ViewTableRowsAllEmps