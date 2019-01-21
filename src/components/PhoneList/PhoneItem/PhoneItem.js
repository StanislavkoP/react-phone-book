import React from 'react';
import PropTypes from 'prop-types';

import isEmpty from '../../../shared/isEmpty';

import './PhoneItem.css';

const DEFAULT_PHOTO = 'https://image.flaticon.com/icons/svg/1077/1077063.svg'

PhoneItem.propTypes = {
	firstName: PropTypes.string,
	lastName: PropTypes.string,
	photo: PropTypes.string,
	company: PropTypes.string,
	contacts: PropTypes.object,

	editContact: PropTypes.func.isRequired,
	deleteContact: PropTypes.func.isRequired,
}

function PhoneItem (props) {
	const {
		firstName,
		lastName,
		photo,
		company,
		contacts,

		editContact,
		deleteContact
	
	} = props;

	const userName = !isEmpty(firstName) ? firstName : 'Noname'; 
	const userLastName = !isEmpty(lastName) ? lastName : ''; 
	const userPhoto = !isEmpty(photo) ? photo : DEFAULT_PHOTO; 
	const userCompany = !isEmpty(company) ? company : ''; 
	const userPhoneNumber = !isEmpty(contacts.phoneNumber) ? contacts.phoneNumber : '';
	const userEmail = !isEmpty(contacts.email) ? contacts.email : '';

	return (
		<div className="ui card phoneCard">
			<div className="image">
				<img src={ userPhoto } alt={ `${ userName } ${ userLastName }` }/>
			</div>

			<div className="content">
				<div className="header">{ `${ userName } ${ userLastName }` }</div>
				
				<div className="meta">
					<span className="date">{ userCompany }</span>
				</div>

				<div className="description">
					<p>{ userPhoneNumber }</p>
					<p>{ userEmail }</p>
				</div>

				<div className="phoneCard__buttons-container">
					<button 
						className="ui primary button"
						onClick={ editContact } 
					>
						Edit
					</button>

					<button 
						className='ui negative button'
						onClick={ deleteContact } 
					>
						Delete
					</button>

				</div>
			</div>
		</div>
	);
};

export default PhoneItem;