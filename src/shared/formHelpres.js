import { updateObject } from './index';

export const clearForm = (inputs) => {
	const clearFormElements = {};

	for (let inputIdentifier in inputs){
		const updatedFormElements = updateObject(inputs[inputIdentifier], {
			value: '',
		});

		clearFormElements[inputIdentifier] = updatedFormElements;
	}

	return clearFormElements;
};



export const checkFormValidation = (inputs) => {
	let allIsValid = [];
	
	for (let inputIdentifier in inputs) {
		let formIsValid = true;
		const currentInput = inputs[inputIdentifier];
		const inputIsRequired = currentInput.validation.isRequired;
		const inputValueLength = currentInput.value.trim().length;
		
		if (inputIsRequired) {
			formIsValid = currentInput.valid.isValid;
		}

		if (!inputIsRequired) {
			formIsValid = true
		}

		if (inputValueLength > 0 && !inputIsRequired) {
			formIsValid = currentInput.valid.isValid;
		}

		allIsValid.push(formIsValid);
	};
	
	return !allIsValid.some(item => item === false);
};

export const getDataFromInputs = (inputs) => {
	let contactData = {};

	for (let formElementIdentifier in inputs) {
		contactData[formElementIdentifier] = inputs[formElementIdentifier].value;
	
	};

	contactData = {
		firstName: contactData.firstName,
		lastName: contactData.lastName,
		company: contactData.company,
		contacts: {
			email: contactData.email,
			phoneNumber: contactData.phoneNumber,
		},
		photo: contactData.photo

	};

	return contactData;
};