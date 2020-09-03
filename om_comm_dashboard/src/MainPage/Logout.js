import React, {Component} from "react";
import axios from "axios"

import Login from "./Login"

class Logout extends Component
{
	componentDidMount()
	{
		axios.get("http://10.226.5.98:81/OM_Comm_Dash/om_comm_backend/logout.php")
		.then(res => console.log(res.data));
	}
	
	render()
	{
		return (
			<Login />
		)
	}
}

export default Logout