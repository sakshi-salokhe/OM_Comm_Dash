import React, {Component} from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import qs from "qs"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Redirect} from "react-router"

import View_DateRange from './View_DateRange'
import FlaggedComms from './FlaggedComms'

class ViewFlaggedRows extends Component
{
	constructor(props)
	{
		super(props)
		this.state = 
		{
			redirect: false
		};
		this.back = this.back.bind(this)
	}
	
	back()
	{
		ReactDOM.render(<View_DateRange user_id = {this.props.obj.user_id} />, document.getElementById("root"));
	}
	
	render()
	{
		return (
				<tr>
					<td>
						{this.props.obj.user}
					</td>
					<td>
						{this.props.obj.comm_date}
					</td>
					<td>
						{this.props.obj.ctype_name}
					</td>
					<td>
						<a target = '_blank' href={this.props.obj.comm_file} > {this.props.obj.file_name} </a>
					</td>
					<td>
						{this.props.obj.comm_notes}
					</td>
				</tr>

		);
	}
}

export default ViewFlaggedRows