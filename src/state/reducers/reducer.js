import * as actionTypes from '../actions/actionTypes';


const initialState = {
	phonesInit: [],
	filteredPhones: [],
	loading: false,
	loadingNewContact: false,
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

const onAddContactStart = (state, action) => {
	return {
		...state,
		loadingNewContact: true
	}
}

const onAddContactSucces = (state, action) => {
	return {
		...state,
		phonesInit: [
			...state.phonesInit,
			action.newContact
		],
		filteredPhones: [
			...state.filteredPhones,
			action.newContact
		],
		loadingNewContact: false
	}
}

const onAddContactFailed = (state, action) => {
	return {
		...state,
		loadingNewContact: false,
		error: action.error
	}
}

const onUpdateContactSuccess = (state, action) => ({
	...state,
	phonesInit: action.updatedPhoneList,
});

const onUpdateContactFailed = (state, action) => ({
	...state,
	error: action.error,
});

const onDeleteContactSuccess = (state, action) => ({
	...state,
	phonesInit: [
		...action.newPhoneList
	],
	filteredPhones: [
		...action.newPhoneList
	],
	loading: false
});

const onDeleteContactFailed = (state, action) => ({
	...state,
	error: action.error,
	loading: false
});

const searchPhone = (state, action) => {
	return {
		...state,
		filteredPhones : action.filteredPhonesList,
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
		
		case actionTypes.ADD_CONTACT_START : return onAddContactStart(state, action);
		case actionTypes.ADD_CONTACT_SUCCESS : return onAddContactSucces(state, action);
		case actionTypes.ADD_CONTACT_FAILED : return onAddContactFailed(state, action);
		
		case actionTypes.UPDATE_CONTACT_SUCCESS : return onUpdateContactSuccess(state, action);
		case actionTypes.UPDATE_CONTACT_FAILED : return onUpdateContactFailed(state, action);
		
		case actionTypes.DELETE_CONTACT_SUCCESS : return onDeleteContactSuccess(state, action);
		case actionTypes.DELETE_CONTACT_FAILED : return onDeleteContactFailed(state, action);
		
		case actionTypes.SEARCH_PHONE : return searchPhone(state, action);
		case actionTypes.VIEW_ALL_PHONES : return viewAllPhones(state, action);
		default: return state;
	}
}

export default reducer