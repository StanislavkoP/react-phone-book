export default (inputs) => {
	let formIsValid = true;
	for (let inputIdentifier in inputs) {
		
		const currentInput = inputs[inputIdentifier];
		const inputIsRequired = currentInput.validation.isRequired;
		const inputValueLength = currentInput.value.trim().length;
		
		if (inputIsRequired) {
			formIsValid = currentInput.valid.isValid && formIsValid;
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
