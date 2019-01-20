import React from 'react';

import AddContactField from './AddContactField/AddContactField';

const AddContactForm = props =>  (
	<form className="ui form" ref={props.refForm}>
		<h2 className="ui dividing header">Adding contact</h2>
			<p>Field with <i className="asterisk red icon"></i> is required</p>
			<div className="two fields">
				<AddContactField
					isRequired={ props.dataOfName.validation.isRequired }
					errorMessage={ props.dataOfName.valid.errorMessage }
					label="First Name" 
					placeholder="First Name"
					isValid={ props.dataOfName.valid.isValid }
					touched={ props.dataOfName.touched }
					inputValue={ props.dataOfName.value }
					change={ (e) => props.change(e, props.dataOfName.inputIdentifier) }
				/>
				
				<AddContactField
					isRequired={ props.dataOfLastName.validation.isRequired }
					errorMessage={ props.dataOfLastName.valid.errorMessage }
					label="Last Name" 
					placeholder="Last Name"
					isValid={ props.dataOfLastName.valid.isValid }
					touched={ props.dataOfLastName.touched }
					inputValue={ props.dataOfLastName.value }
					change={ (e) => props.change(e, props.dataOfLastName.inputIdentifier) }
				/>
			</div>

			<div className="two fields">
				<AddContactField
					isRequired={ props.dataOfCompany.validation.isRequired }
					errorMessage={ props.dataOfCompany.valid.errorMessage }
					label="Company" 
					placeholder="Company"
					isValid={ props.dataOfCompany.valid.isValid }
					touched={ props.dataOfCompany.touched }
					inputValue={ props.dataOfCompany.value }
					change={ (e) => props.change(e, props.dataOfCompany.inputIdentifier) }
				/>

				<AddContactField
					isRequired={ props.dataOfPhoto.validation.isRequired }
					errorMessage={ props.dataOfPhoto.valid.errorMessage }
					label="Link to a photo" 
					placeholder="Link to a photo"
					isValid={ props.dataOfPhoto.valid.isValid }
					touched={ props.dataOfPhoto.touched }
					inputValue={ props.dataOfPhoto.value }
					change={ (e) => props.change(e, props.dataOfPhoto.inputIdentifier) }
				/>
			</div>

			<div className="two fields">
				<AddContactField
					isRequired={ props.dataOfPhoneNumber.validation.isRequired }
					errorMessage={ props.dataOfPhoneNumber.valid.errorMessage }
					label="Phone number" 
					placeholder="Phone number"
					isValid={ props.dataOfPhoneNumber.valid.isValid }
					touched={ props.dataOfPhoneNumber.touched }
					inputValue={ props.dataOfPhoneNumber.value }
					change={ (e) => props.change(e, props.dataOfPhoneNumber.inputIdentifier) }
				/>
	
				<AddContactField
					isRequired={ props.dataOfEmail.validation.isRequired }
					errorMessage={ props.dataOfEmail.valid.errorMessage }
					label="Email" 
					placeholder="Email"
					isValid={ props.dataOfEmail.valid.isValid }
					touched={ props.dataOfEmail.touched }
					inputValue={ props.dataOfEmail.value }
					change={ (e) => props.change(e, props.dataOfEmail.inputIdentifier) }
				/>
			</div>

		{
			props.formIsEditing
			? (
				<div>
					<button 
						className={`ui positive button ${props.loading ? 'loading' : ''}`}
						disabled={props.disablingForm}
						type="submit"
						onClick={ props.updateContact }
					>
						Update
					</button>
					<button 
						className={`ui negative button ${props.loading ? 'loading' : ''}`}
						type="button"
						onClick={ props.cancelEditing }
					>
						Cancel
					</button>
				</div>
			)
			: (
				<button 
				className={`ui primary button ${props.loading ? 'loading' : ''}`}
				disabled={props.disablingForm}
				type="submit"
				onClick={ props.addContact }
			>
				Submit
			</button>
			)
		}

	</form>
	);

export default AddContactForm;
