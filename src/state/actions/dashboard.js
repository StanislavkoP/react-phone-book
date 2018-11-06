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

const loadPhoneListFailed = () => {
	return {
		type: actionTypes.LOAD_PHONE_LIST_FAILED
	}
}

export const loadPhoneList = () => {
	return dispatch => {
		dispatch( loadPhoneListStart() );

		axios.get('https://phone-book-cc717.firebaseio.com/peoples.json')
			.then(response => {
				
				const phoneList = response.data;
				console.log(phoneList);
				dispatch( loadPhoneListSuccess(phoneList) )
			})
			.catch(error => {
				console.log(error);
				dispatch( loadPhoneListFailed() )
			})
	}
}