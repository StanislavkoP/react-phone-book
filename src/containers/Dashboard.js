import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../state/actions/actions';

import PhoneList from '../components/PhoneList/PhoneList';

class Dashboard extends Component {
	
	componentWillMount () {

			this.props.loadPhoneList()


	}

	render () {
		
		let phoneList = <p>loading</p>
		if (this.props.loading === false) {
			phoneList = <PhoneList phoneList={this.props.phoneList}/>

		}

		return (
			<React.Fragment>
				{ phoneList }
			</React.Fragment>
			
		)
	}
}

const mapStateToProps = state => {

	return {
		phoneList: state.phones,
		loading: state.loading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		loadPhoneList: () => dispatch ( actions.loadPhoneList() )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)