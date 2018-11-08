import * as actionTypes from '../actions/actionTypes';


const initialState = {
	phonesInit: [],
	filteredPhones: [],
	loading: false,
	error: null
}

const loadPhoneListStart = (state, action) => {
	return {
		...state,
		loading: true
	}
}

const loadPhoneListSucces = (state, action) => {
	return {
		...state,
		phonesInit: [
			...action.phoneList
		],
		filteredPhones: [
			...action.phoneList
		],
		loading: false
	}
}

const loadPhoneListFailed = (state, action) => {
	return {
		...state,
		loading: false,
		error: action.error
	}
}

const searchPhone = (state, action) => {
	const searchedValue = action.valueInput.toLowerCase();
	
	const filteredPhones = state.phonesInit.filter(item => {
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
		...state,
		filteredPhones : filteredPhones,
		loading: false
	}
}

const viewAllPhones = (state,action) => {
	return {
		...state,
		filteredPhones : [...state.phonesInit]
	}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_PHONE_LIST_START : return loadPhoneListStart(state, action);
		case actionTypes.LOAD_PHONE_LIST_SUCCESS : return loadPhoneListSucces(state, action);
		case actionTypes.LOAD_PHONE_LIST_FAILED : return loadPhoneListFailed(state, action);
		case actionTypes.SEARCH_PHONE : return searchPhone(state, action);
		case actionTypes.VIEW_ALL_PHONES : return viewAllPhones(state, action);
		default: return state;
	}
}

export default reducer