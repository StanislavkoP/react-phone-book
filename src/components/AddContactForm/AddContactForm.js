import React from 'react';

import AddContactField from './AddContactField/AddContactField';

function AddContactForm (props) {
	const { 
		dataOfName,
		dataOfLastName,
		dataOfCompany,
		dataOfPhoto,
		dataOfPhoneNumber,
		dataOfEmail,
		change,
		refForm,
		formIsEditing,
		disablingForm,
		loading,
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
						isRequired={ dataOfName.validation.isRequired }
						errorMessage={ dataOfName.valid.errorMessage }
						label="First Name" 
						placeholder="First Name"
						isValid={ dataOfName.valid.isValid }
						touched={ dataOfName.touched }
						inputValue={ dataOfName.value }
						change={ (e) => change(e, dataOfName.inputIdentifier) }
					/>
					
					<AddContactField
						isRequired={ dataOfLastName.validation.isRequired }
						errorMessage={ dataOfLastName.valid.errorMessage }
						label="Last Name" 
						placeholder="Last Name"
						isValid={ dataOfLastName.valid.isValid }
						touched={ dataOfLastName.touched }
						inputValue={ dataOfLastName.value }
						change={ (e) => change(e, dataOfLastName.inputIdentifier) }
					/>
				</div>
	
				<div className="two fields">
					<AddContactField
						isRequired={ dataOfCompany.validation.isRequired }
						errorMessage={ dataOfCompany.valid.errorMessage }
						label="Company" 
						placeholder="Company"
						isValid={ dataOfCompany.valid.isValid }
						touched={ dataOfCompany.touched }
						inputValue={ dataOfCompany.value }
						change={ (e) => change(e, dataOfCompany.inputIdentifier) }
					/>
	
					<AddContactField
						isRequired={ dataOfPhoto.validation.isRequired }
						errorMessage={ dataOfPhoto.valid.errorMessage }
						label="Link to a photo" 
						placeholder="Link to a photo"
						isValid={ dataOfPhoto.valid.isValid }
						touched={ dataOfPhoto.touched }
						inputValue={ dataOfPhoto.value }
						change={ (e) => change(e, dataOfPhoto.inputIdentifier) }
					/>
				</div>
	
				<div className="two fields">
					<AddContactField
						isRequired={ dataOfPhoneNumber.validation.isRequired }
						errorMessage={ dataOfPhoneNumber.valid.errorMessage }
						label="Phone number" 
						placeholder="Phone number"
						isValid={ dataOfPhoneNumber.valid.isValid }
						touched={ dataOfPhoneNumber.touched }
						inputValue={ dataOfPhoneNumber.value }
						change={ (e) => change(e, dataOfPhoneNumber.inputIdentifier) }
					/>
		
					<AddContactField
						isRequired={ dataOfEmail.validation.isRequired }
						errorMessage={ dataOfEmail.valid.errorMessage }
						label="Email" 
						placeholder="Email"
						isValid={ dataOfEmail.valid.isValid }
						touched={ dataOfEmail.touched }
						inputValue={ dataOfEmail.value }
						change={ (e) => change(e, dataOfEmail.inputIdentifier) }
					/>
				</div>
	
			{
				formIsEditing
				? (
					<div>
						<button 
							className={`ui positive button ${ loading ? 'loading' : ''}` }
							disabled={ disablingForm }
							type="submit"
							onClick={ updateContact }
						>
							Update
						</button>
						<button 
							className='ui negative button'
							type="button"
							onClick={ cancelEditing }
						>
							Cancel
						</button>
					</div>
				)
				: (
					<button 
						className={`ui primary button ${ loading ? 'loading' : ''}` }
						disabled={ disablingForm }
						type="submit"
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
