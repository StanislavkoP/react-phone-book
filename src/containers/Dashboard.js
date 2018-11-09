import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { debounce, updateObject, checkValidity } from '../shared/index';

import * as actions from '../state/actions/actions';

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
					isName: true
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
					isLastName: true
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
					isPhotoLink: true
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
					isCompany: true
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
					isEmail: true
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
					isPhoneNumber: true
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

		const updatedFormElement = updateObject(this.state.inputs[inputIdentifier], {
			value: event.target.value,
			valid: checkValidity(event.target.value, this.state.inputs[inputIdentifier].validation),
			touched: true
		});
		
			const updatedOrderForm = updateObject(this.state.inputs, {
			[inputIdentifier]: updatedFormElement
		}); 
		
		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid.isValid && formIsValid;
		}
		
		this.setState({inputs: updatedOrderForm, formIsValid: formIsValid});
	}

	addContact = ( event ) => {
		event.preventDefault();
		let contactData = {};

		for (let formElementIdentifier in this.state.inputs) {
			contactData[formElementIdentifier] = this.state.inputs[formElementIdentifier].value
		}
		
		contactData = {
			id: new Date().getTime(),
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
		console.log(this.props.newContactLoading);
		let phoneList = <Spinner />
		if (this.props.loading === false) {
			phoneList = (
				<React.Fragment>
					<AddContactForm
						change={ (e, inputIdentifier) => this.changeInputHandler(e, inputIdentifier) }
						addContact={ this.addContact }

						dataOfName={ this.state.inputs.firstName }
						dataOfLastName={ this.state.inputs.lastName }
						dataOfCompany={ this.state.inputs.company }
						dataOfPhoto={ this.state.inputs.photo }
						dataOfPhoneNumber={ this.state.inputs.phoneNumber }
						dataOfEmail={ this.state.inputs.email }
						
						disablingForm={ !this.state.formIsValid }
						loading={this.props.loadingNewContact}
					/>

					<div className="ui input fluid focus">
						<Input classes="searchPhone big" placeholder='Search' change={(e) => this.searchPost(e.currentTarget.value)} />
					</div>

					<PhoneList phoneList={ this.props.filteredPhoneList }/>
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
	console.log(state)
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
		searchPhone: (value, phoneListInit) => dispatch( actions.searchPhone(value, phoneListInit) ),
		viewAllPhones: () => dispatch( actions.viewAllPhones() )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)