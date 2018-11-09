import React from 'react';
import './Input.css';

const Input = props => {

	let propsClasses;
	if (props.classes !== 'undefined') {
		propsClasses = props.classes;
	} 

	return (
		<input className={ propsClasses } type="text" placeholder={props.placeholder} onChange={props.change}/>
	)
}

export default Input
