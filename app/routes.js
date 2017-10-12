import React from 'react';
import { Route } from 'react-router/es';
import App from './App';

export default (

	 <Route path="/" component={App} >
	 	//

	    <Route path="/list" getComponent={(nextState, cb) => {
		  cb(null, require('./components/Pages/List').default);
		}} />
		//

	 </Route>
)

