import React from 'react';
import PhoneItem from './PhoneItem/PhoneItem';

const PhoneList = props => {
	const { phoneList, deleteContact } = props;
	
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
						/>
					)
				)
			}
		</div>
	);

}

export default PhoneList;
