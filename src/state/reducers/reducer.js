import * as actionTypes from '../actions/actionTypes';


const initialState = {
	phoneList: [],
	editedContactId: null,
	searchedText: '',
	loadingPhoneList: false,
	loadingForm: false,
	error: null
}

const loadPhoneListInit = (state, action) => {
	return {
		...state,
		loadingPhoneList: true
	}
}

const loadPhoneListSucces = (state, action) => {
	return {
		...state,
		phoneList: [
			...action.phoneList
		],
		loadingPhoneList: false
	}
}

const loadPhoneListFailed = (state, action) => {
	return {
		...state,
		loadingPhoneList: false,
		error: action.error
	}
}

const onAddContactInit = (state, action) => {
	return {
		...state,
		loadingForm: true
	}
}

const onAddContactSucces = (state, action) => {
	return {
		...state,
		phoneList: [
			...state.phoneList,
			action.newContact
		],
		loadingForm: false
	}
}

const onAddContactFailed = (state, action) => {
	return {
		...state,
		loadingForm: false,
		error: action.error
	}
}

const onUpdateContactSuccess = (state, action) => ({
	...state,
	phoneList: action.updatedPhoneList,
	loadingForm: false,
});

const onUpdateContactFailed = (state, action) => ({
	...state,
	loadingForm: false,
	error: action.error,
});

const onEditContact = (state, action) => ({
	...state,
	editedContactId: action.contactId
});

const onDeleteContactInit = (state, action) => ({
	...state,
	loadingPhoneList: true
});

const onDeleteContactSuccess = (state, action) => ({
	...state,
	phoneList: [
		...action.newPhoneList
	],
	loadingPhoneList: false
});

const onDeleteContactFailed = (state, action) => ({
	...state,
	loadingPhoneList: false,
	error: action.error,
});

const searchPhone = (state, action) => {
	return {
		...state,
		searchedText: action.searchedText,
	}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_PHONE_LIST_INIT : return loadPhoneListInit(state, action);
		case actionTypes.LOAD_PHONE_LIST_SUCCESS : return loadPhoneListSucces(state, action);
		case actionTypes.LOAD_PHONE_LIST_FAILED : return loadPhoneListFailed(state, action);
		
		case actionTypes.ADD_CONTACT_INIT : return onAddContactInit(state, action);
		case actionTypes.ADD_CONTACT_SUCCESS : return onAddContactSucces(state, action);
		case actionTypes.ADD_CONTACT_FAILED : return onAddContactFailed(state, action);
		
		case actionTypes.EDIT_CONTACT : return onEditContact(state, action);
		
		case actionTypes.UPDATE_CONTACT_INIT : return onUpdateContactSuccess(state, action);
		case actionTypes.UPDATE_CONTACT_SUCCESS : return onUpdateContactSuccess(state, action);
		case actionTypes.UPDATE_CONTACT_FAILED : return onUpdateContactFailed(state, action);
		
		case actionTypes.DELETE_CONTACT_INIT : return onDeleteContactInit(state, action);
		case actionTypes.DELETE_CONTACT_SUCCESS : return onDeleteContactSuccess(state, action);
		case actionTypes.DELETE_CONTACT_FAILED : return onDeleteContactFailed(state, action);
		
		case actionTypes.SEARCH_PHONE : return searchPhone(state, action);
		default: return state;
	}
}

export default reducer