import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { debounce, updateObject, checkValidity } from '../shared/index';

import * as actions from '../state/actions/actions';
import validationForm from '../shared/validationForm';

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
		formIsValid: false
	}

	componentDidMount () {
		this.props.loadPhoneList()
	}

	searchPost = debounce((value) => {
		const inputValue = value.trim();

		if (inputValue) {
			this.props.searchPhone(inputValue, this.props.phonesListInit)

		} else {
			this.props.viewAllPhones()
		}

	}, 300)

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

		let formIsValid = validationForm(updatedOrderForm);
		
		this.setState({inputs: updatedOrderForm, formIsValid: formIsValid});
	}

	addContact = ( event ) => {
		event.preventDefault();
		let contactData = {};

		for (let formElementIdentifier in this.state.inputs) {
			contactData[formElementIdentifier] = this.state.inputs[formElementIdentifier].value
		}
		
		contactData = {
			firstName: contactData.firstName,
			lastName: contactData.lastName,
			company: contactData.company,
			contacts: {
				email: contactData.email,
				phoneNumber: contactData.phoneNumber,
			},
			photo: contactData.photo

		}

		this.props.onAddContact(contactData)
	}


	render () {
		const { filteredPhoneList, onDeleteContact, loadingNewContact } = this.props;
		const { inputs, formIsValid } = this.state;

		let phoneList = <Spinner />
		if (this.props.loading === false) {
			phoneList = (
				<React.Fragment>
					<AddContactForm
						change={ (e, inputIdentifier) => this.changeInputHandler(e, inputIdentifier) }
						addContact={ this.addContact }

						dataOfName={ inputs.firstName }
						dataOfLastName={ inputs.lastName }
						dataOfCompany={ inputs.company }
						dataOfPhoto={ inputs.photo }
						dataOfPhoneNumber={ inputs.phoneNumber }
						dataOfEmail={ inputs.email }
						
						disablingForm={ !formIsValid }
						loading={ loadingNewContact }
					/>

					<div className="ui input fluid focus">
						<Input 
							classes="searchPhone big" 
							placeholder='Search' 
							change={ (e) => this.searchPost(e.currentTarget.value) } /
							>
					</div>

					<PhoneList 
						phoneList={ filteredPhoneList }
						deleteContact={ (contactId) => onDeleteContact(contactId) }
					/>
				</React.Fragment>
			)
		}

		let error = null;
		if (this.props.error) {
			error = <h4 className="ui red header">{ this.props.error }</h4>
		}

		return (
			<React.Fragment>
				{ phoneList }
				{ error }
			</React.Fragment>
			
		)
	}
}

Dashboard.defaultProps = {
	filteredPhoneList: [],
}

Dashboard.propTypes = {
	filteredPhoneList: PropTypes.array.isRequired,
	loading: PropTypes.bool,
	error: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	])
}


const mapStateToProps = state => {
	return {
		phonesListInit: state.phonesInit,
		filteredPhoneList: state.filteredPhones,
		loading: state.loading,
		loadingNewContact: state.loadingNewContact,
		error: state.error
	}
}

const mapDispatchToProps = dispatch => {
	return {
		loadPhoneList: () => dispatch( actions.loadPhoneList() ),
		onAddContact: (contactData) => dispatch( actions.onAddContact(contactData) ),
		onDeleteContact: (contactId) => dispatch( actions.onDeleteContact(contactId) ),
		searchPhone: (value, phoneListInit) => dispatch( actions.searchPhone(value, phoneListInit) ),
		viewAllPhones: () => dispatch( actions.viewAllPhones() )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)