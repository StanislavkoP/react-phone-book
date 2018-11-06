import React from 'react';

const PhoneItem = props => (
	<div className="item">
		<div className="ui card">
			<div className="image">
				<img src="/images/avatar2/large/kristy.png" />
			</div>
			<div className="content">
				<div className="header">Kristy</div>
				<div className="meta">
					<span className="date">Joined in 2013</span>
				</div>
				<div className="description">
					Kristy is an art director living in New York.
				</div>
			</div>
		</div>
	</div>
)

export default PhoneItem;