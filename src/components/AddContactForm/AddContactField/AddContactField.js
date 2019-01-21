import React from 'react';

import PropTypes from 'prop-types';

AddContactField.propTypes = {
	inputValue: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	label: PropTypes.string,
	isRequired: PropTypes.bool,
	isValid: PropTypes.bool,
	touched: PropTypes.bool,
	errorMessage: PropTypes.string,

	change: PropTypes.func.isRequired,
}

function AddContactField (props) {
	const {
		inputValue,
		placeholder,
		label,
		isRequired,
		isValid,
		touched,
		errorMessage,

		change,

	} = props

	let errorClass = ''
	if ( isValid === false && touched ) {
		errorClass = 'error';
	}

	return (
		<div className={`field ${ errorClass }`}>
			<label>
				{ label } { isRequired ? <i className="asterisk red icon"></i> : null }
			</label>
			
			<input 
				type="text"  
				placeholder={ placeholder } 
				value={ inputValue }
				onChange={ change }
			/>

			<p>{ errorMessage }</p>
		</div>
	)
};

export default AddContactField;