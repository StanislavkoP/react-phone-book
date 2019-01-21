import React from 'react';

import PropTypes from 'prop-types';

import AddContactField from './AddContactField/AddContactField';

AddContactForm.propTypes = {
	refForm: PropTypes.func.isRequired,
	change: PropTypes.func.isRequired,
	addContact: PropTypes.func.isRequired,
	cancelEditing: PropTypes.func.isRequired,
	updateContact: PropTypes.func.isRequired,
};

function AddContactForm (props) {
	const { 
		dataOfName,
		dataOfLastName,
		dataOfCompany,
		dataOfPhoto,
		dataOfPhoneNumber,
		dataOfEmail,
		refForm,
		formIsEditing,
		disablingForm,
		loading,
		
		change,
		addContact,
		cancelEditing,
		updateContact
	
	} = props;

	return (
		<form className="ui form" ref={ refForm }>
			<h2 className="ui dividing header">Adding contact</h2>
				<p>Field with <i className="asterisk red icon"></i> is required</p>
				<div className="two fields">
					<AddContactField
						inputValue={ dataOfName.value }
						label="First Name" 
						placeholder="First Name"
						isRequired={ dataOfName.validation.isRequired }
						isValid={ dataOfName.valid.isValid }
						touched={ dataOfName.touched }
						errorMessage={ dataOfName.valid.errorMessage }
						change={ (e) => change(e, dataOfName.inputIdentifier) }
					/>
					
					<AddContactField
						inputValue={ dataOfLastName.value }
						label="Last Name" 
						placeholder="Last Name"
						isRequired={ dataOfLastName.validation.isRequired }
						isValid={ dataOfLastName.valid.isValid }
						touched={ dataOfLastName.touched }
						errorMessage={ dataOfLastName.valid.errorMessage }
						change={ (e) => change(e, dataOfLastName.inputIdentifier) }
					/>
				</div>
	
				<div className="two fields">
					<AddContactField
						inputValue={ dataOfCompany.value }
						label="Company" 
						placeholder="Company"
						isRequired={ dataOfCompany.validation.isRequired }
						isValid={ dataOfCompany.valid.isValid }
						touched={ dataOfCompany.touched }
						errorMessage={ dataOfCompany.valid.errorMessage }
						change={ (e) => change(e, dataOfCompany.inputIdentifier) }
					/>
	
					<AddContactField
						inputValue={ dataOfPhoto.value }
						label="Link to a photo" 
						placeholder="Link to a photo"
						isRequired={ dataOfPhoto.validation.isRequired }
						isValid={ dataOfPhoto.valid.isValid }
						touched={ dataOfPhoto.touched }
						errorMessage={ dataOfPhoto.valid.errorMessage }
						change={ (e) => change(e, dataOfPhoto.inputIdentifier) }
					/>
				</div>
	
				<div className="two fields">
					<AddContactField
						inputValue={ dataOfPhoneNumber.value }
						placeholder="Phone number"
						label="Phone number" 
						isRequired={ dataOfPhoneNumber.validation.isRequired }
						isValid={ dataOfPhoneNumber.valid.isValid }
						touched={ dataOfPhoneNumber.touched }
						errorMessage={ dataOfPhoneNumber.valid.errorMessage }
						change={ (e) => change(e, dataOfPhoneNumber.inputIdentifier) }
					/>
		
					<AddContactField
						inputValue={ dataOfEmail.value }
						label="Email" 
						placeholder="Email"
						isRequired={ dataOfEmail.validation.isRequired }
						isValid={ dataOfEmail.valid.isValid }
						touched={ dataOfEmail.touched }
						errorMessage={ dataOfEmail.valid.errorMessage }
						change={ (e) => change(e, dataOfEmail.inputIdentifier) }
					/>
				</div>
	
			{
				formIsEditing
				? (
					<div>
						<button 
							className={`ui positive button ${ loading ? 'loading' : ''}` }
							type="submit"
							disabled={ disablingForm }
							onClick={ updateContact }
						>
							Update
						</button>

						<button 
							type="button"
							className='ui negative button'
							onClick={ cancelEditing }
						>
							Cancel
						</button>
					</div>
				)
				: (
					<button 
						className={`ui primary button ${ loading ? 'loading' : ''}` }
						type="submit"
						disabled={ disablingForm }
						onClick={ addContact }
					>
						Submit
					</button>
				)
			}
		</form>
	);
};

export default AddContactForm;
