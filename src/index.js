import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore,  applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './state/reducers/reducer';

const rootReducer = reducer;

const configurateStore = (initialState = {}) => {
	const middleWares = [
		thunk
	];

	const enchansers = [
		applyMiddleware(...middleWares)
	];

	const store = createStore(
		rootReducer,
		initialState,
		composeWithDevTools( ...enchansers )
	)

	return store
}


const store = configurateStore({});


ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	, 
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();