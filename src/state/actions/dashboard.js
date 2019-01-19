import axios from 'axios';
import * as actionTypes from './actionTypes';

import { updateObject } from '../../shared/index';

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
				const idsEachContact = Object.keys(contactsData);
				const phoneList = idsEachContact.map(item => ({...contactsData[item], id: item}) );
				
				dispatch( loadPhoneListSuccess(phoneList) )

			})
			.catch(error => {
				const errorResponse = error.response;
				console.log(error);

				dispatch( loadPhoneListFailed(errorResponse.statusText) )
			})
	}
}

export const searchPhone = (valueInput) => ({
	type: actionTypes.SEARCH_PHONE,
	searchedText: valueInput,
});

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

export const onAddContact = (contactData) => dispatch => {

	dispatch( onAddContactStart() );

	axios.post('https://phone-book-cc717.firebaseio.com/peoples.json', contactData)
		.then(response => {
			const newIdContact = response.data.name;
			const newContact = {
				id: newIdContact,
				...contactData,
			};

			dispatch( onAddContactSuccess(newContact) )

		})
		.catch(error => {
			const errorResponse = error.response;
			console.log(errorResponse);

			dispatch( onAddContactFailed(errorResponse.statusText) )
		})
};

const onDeleteContactInit = () => ({
	type: actionTypes.LOAD_PHONE_LIST_START
});

const onDeleteContactSuccess = (deletedContactId, oldPhoneList) => {
	const newPhoneList = oldPhoneList.filter(contact => contact.id !== deletedContactId);

	return {
		type: actionTypes.DELETE_CONTACT_SUCCESS,
		newPhoneList,
	}
}

const onDeleteContactFailed = error => ({
	type: actionTypes.DELETE_CONTACT_FAILED,
	error
});

export const onDeleteContact = contactId => (dispatch, getState) => {
	dispatch( onDeleteContactInit() )

	axios
		.delete(`https://phone-book-cc717.firebaseio.com/peoples/${contactId}.json`)
		.then(response => {
			const oldPhoneList = getState().phonesInit;

			dispatch( onDeleteContactSuccess(contactId, oldPhoneList) )

		})
		.catch(error => {
			const errorResponsed = error.response;
			console.log(errorResponsed);
			dispatch( onDeleteContactFailed(errorResponsed) )
		})

};

const onUpdateContactSuccess = (updatedPhoneList) => ({
	type: actionTypes.UPDATE_CONTACT_SUCCESS,
	updatedPhoneList,
});

const onUpdateContactFailed = (error) => ({
	type: actionTypes.UPDATE_CONTACT_FAILED,
	error,
});

export const onUpdateContact = (contactData, contactId) => (dispatch, getState) => {
	
	axios
		.put(`https://phone-book-cc717.firebaseio.com/peoples/${contactId}.json`, contactData)
		.then(response => {
			const oldPhoneList = getState().phonesInit;
			const indexContactInArray = oldPhoneList.findIndex(contact => contact.id === contactId);
			
			const updatedContact = updateObject(oldPhoneList[indexContactInArray], contactData);			
			let updatedPhoneList = oldPhoneList.concat([]);
			updatedPhoneList[indexContactInArray] = updatedContact;

			dispatch( onUpdateContactSuccess(updatedPhoneList) )

		})
		.catch(error => {
			const errorResponse = error.response;
			console.log(error);

			dispatch( onUpdateContactFailed(errorResponse.statusText) )
		})
};