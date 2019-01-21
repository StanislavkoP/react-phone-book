import { updateObject } from './index';
import isEmpty from './isEmpty';

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

export const checkValidity = (value, rules) => {
	let isValid = true;
	let errorMessage = null;


	if (!rules) {
		return {
			isValid: true,
			errorMessage:  null
		};
	}

	if (isEmpty(value) && rules.isRequired) {
		return {
			isValid: false,
			errorMessage:  'Fill in the field'
		};
	}

	if (isEmpty(value) && !rules.isRequired) {
		return {
			isValid: true,
			errorMessage:  null
		};
	}
	

	if (rules.isCompany) {
		const pattern = /^(?!\s)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '-~?!]{2,}$/;
		isValid = pattern.test(value) && isValid;
		errorMessage = isValid === false ? 'This must be like Cube-x' : null;
	}

	if (rules.isName) {
		const pattern = /^\s*[A-Za-z]{1,}([-'`])?[A-Za-z]{1,}\s*$/;
		isValid = pattern.test(value) && isValid;
		errorMessage = isValid === false ? 'This must contain one English word' : null;
	}

	if (rules.isLastName) {
		const pattern = /^\s*[A-Za-z]{1,}([-'`])?[A-Za-z]{1,}\s*$/;
		isValid = pattern.test(value) && isValid;
		errorMessage = isValid === false ? 'This must contain one English word' : null;
	}

	if (rules.isEmail) {
		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		isValid = pattern.test(value) && isValid;
		errorMessage = isValid === false ? 'This must be like user@gmail.com' : null;
	}

	if (rules.isPhotoLink) {
		const pattern = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/;
		isValid = pattern.test(value) && isValid;
		errorMessage = isValid === false ? 'This must be like http(s)://... .[png|jpg|jpeg|gif|png|svg]' : null;
	}

	if (rules.isPhoneNumber) {
		const pattern = /^(\([0-9]{0,3}\)\s{1}|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
		isValid = pattern.test(value) && isValid;
		errorMessage = isValid === false ? 'This must be like (xxx) xxx-xxxx' : null;
		
	}

	return {
		isValid: isValid,
		errorMessage:  errorMessage
	};
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