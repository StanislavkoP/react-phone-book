import React from 'react';

const PhoneItem = props => (
	<div className="item">
		<div className="ui card">
			<div className="image">
				<img src={props.photo} />
			</div>
			<div className="content">
				<div className="header">{`${props.firstName} ${props.lastName}`}</div>
				<div className="meta">
					<span className="date">{props.company}</span>
				</div>
				<div className="description">
					{props.contacts.email}
				</div>
			</div>
		</div>
	</div>
)

export default PhoneItem;