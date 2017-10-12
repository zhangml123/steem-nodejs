import React, { Component, PropTypes } from 'react'
import * as IndexActions from '../../actions/indexAction'
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import {Link} from "react-router/es";


class Header extends Component {


	render() {
		const { showNavList, navList, hideNavList} = this.props;
		const nav_list = ()=>{
			return(<div>
				<ul className="navlist" id = "navlist">
					<li>互联s网</li>
					<li>国际</li>
					<li>时尚</li>
				</ul></div>)
		}


		const nav_menu =<div>
						<li className = "active">首页</li>
						<li onMouseEnter = {showNavList} onMouseLeave = {hideNavList}>新闻中心
							{navList && nav_list()}
						</li>
						<li >产品中心</li>
					</div>


		return(
			<div className="header">
				<img  className="logo" src={"images/logo.png"}/>
				<ul className="nav">
					{nav_menu}
				</ul>
			</div>
		
		)
	}

}

Header.propTypes = {
	showNavList: PropTypes.func.isRequired,
	navList : PropTypes.bool.isRequired,
};


export default connect(
	(state)=>{
		return {
			navList: state.index.navList,
		}

	},
	(dispatch) =>{
	 	return bindActionCreators(IndexActions, dispatch)
})(Header)