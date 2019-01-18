export const debounce = (func, wait, immediate) => {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export const updateObject = (oldObject, updatedProperties) => {
	return {
		...oldObject,
		...updatedProperties
	};
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

	if (value.trim().length <= 0) {
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
		const pattern = /^(\([0-9]{0,3}\)\s{1}|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$/;
		isValid = pattern.test(value) && isValid;
		errorMessage = isValid === false ? 'This must be like (xxx) xxx-xxxx' : null;
		
	}

	return {
		isValid: isValid,
		errorMessage:  errorMessage
	};
}

