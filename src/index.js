import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore,  applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './state/reducers/reducer';

const rootReducer = reducer;

const composeEnhancers = process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose

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
		composeEnhancers( ...enchansers )
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
