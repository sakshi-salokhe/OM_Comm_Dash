import React, {Component} from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Redirect} from "react-router"

import AdminLogin from '../AdminLogin'

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
					<Redirect to='ViewDataTableAllEmps' data = {this.props.obj}/>
				</Route>
			</Router>)
		}
		
		const condition = this.props.obj.collections === 1 || this.props.obj.collections === '1';
		
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
						{this.props.obj.creason_name}
					</td>
					<td>
						{this.props.obj.comm_notes}
					</td>
					<td>
						<a target = '_blank' href={this.props.obj.comm_file} > {this.props.obj.file_name} </a>
					</td>
					<td>
						<button type="button" className="btn btn-danger" onClick = {this.flag}> &nbsp; Flag communication &nbsp; </button>
					</td>
						
				</tr>

		);
	}
}

export default ViewTableRowsAllEmps