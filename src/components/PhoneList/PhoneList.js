import React from 'react';
import PhoneItem from './PhoneItem/PhoneItem';

const PhoneList = props => (
	<div className="ui centered cards">
		{
			props.phoneList.map( phone => {
				return <PhoneItem
					key={phone.id} 
					firstName={phone.firstName}
					lastName={phone.lastName}
					photo={phone.photo}
					company={phone.company}
					contacts={phone.contacts}
					/>
			})
		}
	</div>
);

export default PhoneList;
