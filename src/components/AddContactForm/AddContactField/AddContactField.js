import React from 'react';

const AddContactField = props => {
	let errorClass = ''
	if ( props.isValid === false && props.touched ) {
		errorClass = 'error';
	}

	return(
		<div className={`field ${ errorClass }`}>
			<label>{ props.label } {props.isRequired ? <i className="asterisk red icon"></i> : null}</label>
			<input type="text"  
				placeholder={ props.placeholder } 
				value={ props.inputValue }
				onChange={ props.change }
			/>
			<p>{ props.errorMessage }</p>
		</div>
	)
}
export default AddContactField;