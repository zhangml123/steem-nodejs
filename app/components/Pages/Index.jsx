import React, { Component, PropTypes } from 'react'
import * as IndexActions from '../../actions/indexAction'
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import {Link} from "react-router/es";

class Index extends Component {
	constructor(props) {
		super(props)
		this.state = {
			url : '',
			hash:'',
			fileName:''
		};
		this.getURL = this.getURL.bind(this);
		this.hash = this.hash.bind(this);
	}

	getURL(){
		fetch("/api/getfile",{
			method: "post",
			mode: 'no-cors',
			credentials: 'same-origin',
			headers: {
				 Accept: 'application/json',
                'Content-type': 'application/json'
			},
			body: JSON.stringify({url:""}),
		}).then(r =>r.json()).then(res=> {
			this.setState({url:res.url,fileName:res.fileName})
		}).catch(e=>{
			console.log(e)
		})
		
	};
	hash(){
		//console.log(event)
		const url = this.state.url;

		fetch("/api/hash",{
			method: "post",
			mode: 'no-cors',
			credentials: 'same-origin',
			headers: {
				 Accept: 'application/json',
                'Content-type': 'application/json'
			},
			body: JSON.stringify({url:url}),
		}).then(r =>r.json()).then(res=> {
			this.setState({hash:res.hash})
		}).catch(e=>{
			console.log(e)
		})

	};

	render() {
		const url = this.state.url;
		const hash = this.state.hash;
		const fileName = this.state.fileName;
		if(url == ''){this.getURL()}
		return(
			<div>{/*Inde<br/><Link to={`/list`} >list</Link><br/>*/}
				<div className = "index_div">
					<span className="index_span">文件名</span> <input type="text" value={fileName} /> <br/>
					<span className="index_span">文件地址</span> <input type="text" value={url} /> <br/>
					<span className="index_span">哈希值</span><input type="text" value={hash} /><input type="button" className="btn" value = "加密" onClick = {this.hash}/>
				</div>
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
	 	return bindActionCreators(IndexActions, dispatch)
})(Index)