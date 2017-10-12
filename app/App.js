import { bindActionCreators } from 'redux'; 
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import Index from './components/Pages/Index'
import * as AppActions from './actions/appAction'
import Header from './components/Common/Header'
class App extends React.Component{

	render(){
		const { children } = this.props;
		return(
			<div>
				{children || <Index/>} 
			</div>
		)
	}
}



App.propTypes = {
	children:PropTypes.node
}
export default connect(
	(state)=>{
		return {
			counter: state.counter
		}
	}, 
	(dispatch) => {
		 return bindActionCreators(AppActions, dispatch)
})(App)


