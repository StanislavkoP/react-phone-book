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
				const phoneList = response.data;
				dispatch( loadPhoneListSuccess(phoneList) )

			})
			.catch(error => {
				const errorResponse = error.response;
				console.log(errorResponse);

				dispatch( loadPhoneListFailed(errorResponse.statusText) )
			})
	}
}

export const searchPhone = (value) => {
	return {
		type: actionTypes.SEARCH_PHONE,
		valueInput: value
	}
}

export const viewAllPhones = () => {
	return {
		type: actionTypes.VIEW_ALL_PHONES
	}
}