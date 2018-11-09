import React from 'react';

const AddContactField = props => {
	let errorClass = ''
	if ( props.isValid === false && props.touched ) {
		errorClass = 'error';
	}

	console.log(props.isValid);

	return(
		<div className={`field ${ errorClass }`}>
			<label>{ props.label }</label>
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