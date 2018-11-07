import React from 'react';
import './Input.css';

const Input = props => {
	let classes = 'ui fluid icon input';
	let propsClasses;

	if (props.classes !== 'undefined') {
		propsClasses = props.classes;
	} 



	return (
		<div className="ui fluid icon input">
			<input className={classes + ' ' + propsClasses } type="text" placeholder={props.placeholder} onChange={props.change}/>
		</div>
	)
}

export default Input
