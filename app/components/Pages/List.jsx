import React, { Component, PropTypes } from 'react'
import * as ListActions from '../../actions/listAction'
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

class List extends Component {

	render() {
		return(
			<div style={{marginTop:"50px"}}>
				<ul>
					<li>第一行阿萨德</li>
					
				</ul>
			</div>
		)
	}

}

export default connect(
	(state)=>{
		return {
			
		}
	},
	(dispatch) =>{

	 	return bindActionCreators(ListActions, dispatch)

	})(List)