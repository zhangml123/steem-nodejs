
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './app/store/configureStore';
import routes from './app/routes';

import { Router, browserHistory, hashHistory } from "react-router/es";

require("./app/assets/loader")

const store = configureStore();

const history = browserHistory;
render(
    <Provider store = {store}>
		<Router history={history} routes={routes} />
	</Provider>,
	document.getElementById('root')
);



