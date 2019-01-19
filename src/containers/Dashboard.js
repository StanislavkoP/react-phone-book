import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { debounce, updateObject, checkValidity } from '../shared/index';

import * as actions from '../state/actions/actions';
import { clearForm, checkFormValidation, getDataFromInputs } from '../shared/formHelpres.js';
import filterPhoneList from '../selects/filterPhoneList';

import PhoneList from '../components/PhoneList/PhoneList';
import AddContactForm from '../components/AddContactForm/AddContactForm';
import Spinner from '../components/Spinner/Spinner';
import Input from '../components/Input/Input';

class Dashboard extends Component {

	state = {
		inputs: {
			firstName: {
				inputIdentifier: 'firstName',
				value: '',
				validation: {
					isName: true,
					maxLength: 10,
					isRequired: true,
				},
				valid: {
					isValid: false,
					errorMessage: null
				},
				touched: false
			},
			lastName: {
				inputIdentifier: 'lastName',
				value: '',
				validation: {
					isLastName: true,
					isRequired: true,
				},
				valid: {
					isValid: false,
					errorMessage: null
				},
				touched: false
			},
			photo: {
				inputIdentifier: 'photo',
				value: '',
				validation: {
					isPhotoLink: true,
				},
				valid: {
					isValid: false,
					errorMessage: null
				},
				touched: false
			},
			company: {
				inputIdentifier: 'company',
				value: '',
				validation: {
					isCompany: true,
					isRequired: true,
				},
				valid: {
					isValid: false,
					errorMessage: null
				},
				touched: false
			},
			email: {
				inputIdentifier: 'email',
				value: '',
				validation: {
					isEmail: true,
					isRequired: true,
				},
				valid: {
					isValid: false,
					errorMessage: null
				},
				touched: false
			},
			phoneNumber: {
				inputIdentifier: 'phoneNumber',
				value: '',
				validation: {
					isPhoneNumber: true,
					isRequired: true,
				},
				valid: {
					isValid: false,
					errorMessage: null
				},
				touched: false
			},
		},
		updatingContactId: null,
		formIsEditing: false,
		formIsValid: false,
	};

	componentDidMount () {
		this.props.loadPhoneList()
	};

	searchPost = debounce((value) => {
		const inputValue = value.trim();
		
		this.props.searchPhone(inputValue)

	}, 400);

	changeInputHandler = (event, inputIdentifier) => {
		let inputValue = event.target.value;
		const maxLengthInput = this.state.inputs[inputIdentifier].validation.maxLength;

		if (inputValue.length > maxLengthInput) {
			// In the end +Number is reserve for warning if value length longer then max length validation
			inputValue = inputValue.substring(0, maxLengthInput + 2);
		
		}

		const updatedFormElement = updateObject(this.state.inputs[inputIdentifier], {
			value: inputValue,
			valid: checkValidity(inputValue, this.state.inputs[inputIdentifier].validation),
			touched: true
		});
		
		const updatedOrderForm = updateObject(this.state.inputs, {
			[inputIdentifier]: updatedFormElement
		}); 

		let formIsValid = checkFormValidation(updatedOrderForm);
		
		this.setState({inputs: updatedOrderForm, formIsValid: formIsValid});
	};

	addContact = ( event ) => {
		event.preventDefault();
		const contactData = getDataFromInputs(this.state.inputs);

		const clearedFormInputs = clearForm(this.state.inputs);
		this.setState({inputs: clearedFormInputs})

		this.props.onAddContact(contactData)
	}

	onEditContact(contactId) {
		const editedContact = this.props.phonesListInit.find(contact => contact.id === contactId);
		
		const formElemetsWithData = {};
		formElemetsWithData.firstName = editedContact.firstName;
		formElemetsWithData.lastName = editedContact.lastName;
		formElemetsWithData.photo = editedContact.photo;
		formElemetsWithData.company = editedContact.company;
		formElemetsWithData.email = editedContact.contacts.email;
		formElemetsWithData.phoneNumber = editedContact.contacts.phoneNumber;

		
		const updatedFormElements = {};
		for (let inputIdentifier in this.state.inputs){
			
			const inputValue = formElemetsWithData[inputIdentifier];
			const updatedFormElement = updateObject(this.state.inputs[inputIdentifier], {
				value: formElemetsWithData[inputIdentifier],
				valid: checkValidity(inputValue, this.state.inputs[inputIdentifier].validation),
			});
			
			updatedFormElements[inputIdentifier] = updatedFormElement;
		};

		this.setState({
			inputs: updatedFormElements,
			updatingContactId: contactId,
			formIsEditing: true, 
		});

		this.refForm.scrollIntoView();
	};

	onCancelEditing = () => {
		const clearedFormInputs = clearForm(this.state.inputs);

		this.setState({
			inputs: clearedFormInputs,
			formIsValid: false,
			formIsEditing: false,
		});
	
	};

	onUpdateContact = (event) => {
		event.preventDefault();
		
		const contactId = this.state.updatingContactId; 
		const contactData = getDataFromInputs(this.state.inputs);
		
		this.props.onUpdateContact(contactData, contactId)
	}


	render () {
		const { phonesListInit, onDeleteContact, loadingNewContact, error } = this.props;
		const { inputs, formIsEditing, formIsValid } = this.state;

		let phoneList = <Spinner />
		if (this.props.loading === false) {
			phoneList = (
				<React.Fragment>
					<AddContactForm
						refForm={(refForm) => (this.refForm = refForm)}
						
						change={ (e, inputIdentifier) => this.changeInputHandler(e, inputIdentifier) }
						addContact={ this.addContact }
						cancelEditing={ this.onCancelEditing }
						updateContact={ this.onUpdateContact }

						dataOfName={ inputs.firstName }
						dataOfLastName={ inputs.lastName }
						dataOfCompany={ inputs.company }
						dataOfPhoto={ inputs.photo }
						dataOfPhoneNumber={ inputs.phoneNumber }
						dataOfEmail={ inputs.email }
						
						disablingForm={ !formIsValid }
						formIsEditing={ formIsEditing }
						loading={ loadingNewContact }
					/>

					<div className="ui input fluid focus">
						<Input 
							classes="searchPhone big" 
							placeholder='Search' 
							change={ (e) => this.searchPost(e.currentTarget.value) } 
						/>
					</div>

					<PhoneList 
						phoneList={ phonesListInit }
						deleteContact={ (contactId) => onDeleteContact(contactId) }
						editContact={ (contactId) => this.onEditContact(contactId) }
					/>
				</React.Fragment>
			)
		}

		let errorContent = null;
		if (error) {
			errorContent = <h4 className="ui red header">{ error }</h4>
		}

		return (
			<React.Fragment>
				{ phoneList }
				{ errorContent }
			</React.Fragment>
			
		)
	}
}

Dashboard.defaultProps = {
	phonesListInit: [],
}

Dashboard.propTypes = {
	loading: PropTypes.bool,
	error: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	])
}


const mapStateToProps = state => {
	return {
		phonesListInit: filterPhoneList(state),
		loading: state.loading,
		loadingNewContact: state.loadingNewContact,
		error: state.error
	}
}

const mapDispatchToProps = dispatch => {
	return {
		loadPhoneList: () => dispatch( actions.loadPhoneList() ),
		onAddContact: (contactData) => dispatch( actions.onAddContact(contactData) ),
		onUpdateContact: (contactData, contactId) => dispatch( actions.onUpdateContact(contactData, contactId) ),
		onDeleteContact: (contactId) => dispatch( actions.onDeleteContact(contactId) ),
		searchPhone: (value, phoneListInit) => dispatch( actions.searchPhone(value, phoneListInit) ),
		viewAllPhones: () => dispatch( actions.viewAllPhones() )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)