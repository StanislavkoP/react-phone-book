import * as actionTypes from '../actions/actionTypes';


const initialState = {
	phones: [],
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
		loading: false
	}
}

const loadPhoneListFailed = (state, action) => {
	return {
		...state,
		loading: false
	}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_PHONE_LIST_START : return loadPhoneListStart(state, action);
		case actionTypes.LOAD_PHONE_LIST_SUCCESS : return loadPhoneListSucces(state, action);
		case actionTypes.LOAD_PHONE_LIST_FAILED : return loadPhoneListFailed(state, action);
		default: return state;
	}
}

export default reducer