import * as actionTypes from '../actions/actionTypes';


const initialState = {
	phones: [],
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
		phones: [
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
		loading: false
	}
}

const searchPhone = (state, action) => {
	const filteredPhones = state.phones.filter(item => {
		return item.firstName.toLowerCase().includes(action.valueInput.toLowerCase()) || item.lastName.toLowerCase().includes(action.valueInput.toLowerCase())
	})
	console.log(filteredPhones);
	return {
		...state,
		filteredPhones : filteredPhones
	}
}

const viewAll = (state,action) => {
	return {
		...state,
		filteredPhones : [...state.phones]
	}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_PHONE_LIST_START : return loadPhoneListStart(state, action);
		case actionTypes.LOAD_PHONE_LIST_SUCCESS : return loadPhoneListSucces(state, action);
		case actionTypes.LOAD_PHONE_LIST_FAILED : return loadPhoneListFailed(state, action);
		case actionTypes.SEARCH_PHONE : return searchPhone(state, action);
		case actionTypes.VIEW_ALL : return viewAll(state, action);
		default: return state;
	}
}

export default reducer