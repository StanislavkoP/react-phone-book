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
	let formIsValid = true;
	for (let inputIdentifier in inputs) {
		
		const currentInput = inputs[inputIdentifier];
		const inputIsRequired = currentInput.validation.isRequired;
		const inputValueLength = currentInput.value.trim().length;
		
		if (inputIsRequired) {
			formIsValid = currentInput.valid.isValid && formIsValid;
			console.log(currentInput)
		}

		if (!inputIsRequired) {
			formIsValid = true
		}

		if (inputValueLength > 0 && !inputIsRequired) {
			formIsValid = currentInput.valid.isValid && formIsValid;
		}

	};

	return formIsValid;
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