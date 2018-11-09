import axios from 'axios';
import * as actionTypes from './actionTypes';

const loadPhoneListStart = () => {
	return {
		type: actionTypes.LOAD_PHONE_LIST_START
	}
}

const loadPhoneListSuccess = phoneList => {
	return {
		type: actionTypes.LOAD_PHONE_LIST_SUCCESS,
		phoneList : phoneList
	}
}

const loadPhoneListFailed = (error) => {
	return {
		type: actionTypes.LOAD_PHONE_LIST_FAILED,
		error: error
	}
}

export const loadPhoneList = () => {
	return dispatch => {
		dispatch( loadPhoneListStart() );

		axios.get('https://phone-book-cc717.firebaseio.com/peoples.json')
			.then(response => {
				const contactsData = response.data
				const phoneList = Object.keys(contactsData).map(item => contactsData[item]);

				dispatch( loadPhoneListSuccess(phoneList) )

			})
			.catch(error => {
				const errorResponse = error.response;
				console.log(error);

				dispatch( loadPhoneListFailed(errorResponse.statusText) )
			})
	}
}

export const searchPhone = (valueInput, phonesList) => {
	const searchedValue = valueInput.toLowerCase();

	const filteredPhones = phonesList.filter(item => {
		let firstName;
		let lastName;
		let company;
		let phoneNumber;
		let email;

		if (item.contacts) {
			if (item.contacts.email) {
				email =  item.contacts.email.toLowerCase().includes(searchedValue);
			}

			if (item.contacts.phoneNumber) {
				phoneNumber = item.contacts.phoneNumber.toString().toLowerCase().includes(searchedValue);
			}
		}

		if (item.firstName) {
			firstName = item.firstName.toLowerCase().includes(searchedValue);
		}

		if (item.lastName) {
			lastName = item.lastName.toLowerCase().includes(searchedValue);
		}

		if (item.company) {
			company = item.company.toLowerCase().includes(searchedValue);
		}

		return firstName || lastName || company || phoneNumber || email
	})

	return {
		type: actionTypes.SEARCH_PHONE,
		filteredPhonesList: filteredPhones
	}
}

export const viewAllPhones = () => {
	return {
		type: actionTypes.VIEW_ALL_PHONES
	}
}

const onAddContactStart = () => {
	return {
		type: actionTypes.ADD_CONTACT_START
	}
}

const onAddContactSuccess = (contactData) => {
	return {
		type: actionTypes.ADD_CONTACT_SUCCESS,
		newContact: contactData
	}
}

const onAddContactFailed = (error) => {
	return {
		type: actionTypes.ADD_CONTACT_FAILED,
		error: error
	}
}

export const onAddContact = (contactData) => {


	return dispatch => {
		dispatch( onAddContactStart() );

		axios.post('https://phone-book-cc717.firebaseio.com/peoples.json', contactData)
			.then(response => {
				dispatch( onAddContactSuccess(contactData) )

			})
			.catch(error => {
				const errorResponse = error.response;
				console.log(errorResponse);

				dispatch( onAddContactFailed(errorResponse.statusText) )
			})
	}
}