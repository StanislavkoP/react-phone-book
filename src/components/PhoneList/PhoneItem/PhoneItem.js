import React from 'react';
import PropTypes from 'prop-types';
import './PhoneItem.css';

const DEFAULT_PHOTO = 'https://image.flaticon.com/icons/svg/1077/1077063.svg'

const PhoneItem = props => (
		<div className="ui card phoneCard">
			<div className="image">
				<img src={ props.photo ? props.photo : DEFAULT_PHOTO } alt={ `${ props.firstName } ${ props.lastName }` }/>
			</div>
			<div className="content">
				<div className="header">{ `${ props.firstName } ${ props.lastName }` }</div>
				<div className="meta">
					<span className="date">{ props.company }</span>
				</div>
				<div className="description">
					<p>{ props.contacts.phoneNumber }</p>
					<p>{ props.contacts.email }</p>
				</div>
			</div>
		</div>
);

PhoneItem.defaultProps = {
	firstName: '',
	lastName: '',
	company: '',
	photo: DEFAULT_PHOTO,
	contacts: {}
}

PhoneItem.propTypes = {
	firstName: PropTypes.string,
	lastName: PropTypes.string,
	photo: PropTypes.string,
	company: PropTypes.string,
	contacts: PropTypes.object
}



export default PhoneItem;