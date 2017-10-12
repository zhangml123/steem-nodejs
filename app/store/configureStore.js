import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/index.js';
import getIndexStore from './indexStore';

const createStoreWithMiddleware = compose(
	applyMiddleware(
		thunk
	),
	 window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)
export default function configureStore(initialState) {
  var initialState = {
      index : getIndexStore(),
  }
	 const store = createStoreWithMiddleware(reducer, initialState)
	 //热替换选项
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }
   return store
}