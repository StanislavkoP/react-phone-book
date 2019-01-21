import React from 'react';
import PropTypes from 'prop-types';

import PhoneItem from './PhoneItem/PhoneItem';

PhoneList.propTypes = {
	phoneList : PropTypes.array.isRequired,
	deleteContact: PropTypes.func.isRequired,
	editContact: PropTypes.func.isRequired,
};

function PhoneList (props) {
	const { phoneList, deleteContact, editContact } = props;
	
	return ( 
		<div className="ui cards">
			{
				phoneList.map( phone => (
						<PhoneItem
							key={phone.id} 
							firstName={phone.firstName}
							lastName={phone.lastName}
							photo={phone.photo}
							company={phone.company}
							contacts={phone.contacts}

							deleteContact={ () => deleteContact(phone.id) }
							editContact={ () => editContact(phone.id) }
						/>
					)
				)
			}
		</div>
	);

};



export default PhoneList;
