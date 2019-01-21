import React from 'react';
import PropTypes from 'prop-types';

import isEmpty from '../../shared/isEmpty';

import './Input.css';

Input.propTypes = {
	classes: PropTypes.string,
	placeholder: PropTypes.string,

	change: PropTypes.func.isRequired,
}

function Input (props) {
	const { classes, placeholder, change } = props;

	let propsClasses;
	if (!isEmpty(classes)) {
		propsClasses = classes;
	} 

	return (
		<input className={ propsClasses } type="text" placeholder={ placeholder } onChange={ change }/>
	)

};

export default Input
