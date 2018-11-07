import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../state/actions/actions';

import PhoneList from '../components/PhoneList/PhoneList';
import Spinner from '../components/Spinner/Spinner';

class Dashboard extends Component {

	
	componentDidMount () {
		this.props.loadPhoneList()
	}


	searchPost = value => {
		this.props.searchPhone(value)
	}

	viewAll = () => {
		this.props.viewAll()
	}

	render () {

		let phoneList = <Spinner />
		if (this.props.loading === false) {
			phoneList = <PhoneList phoneList={this.props.phoneList2}/>

		}

		return (
			<React.Fragment>
				<div className="ui fluid icon input">
					<input type="text" placeholder="Search..." onChange={(e) => {
						if(e.currentTarget.value) this.searchPost(e.currentTarget.value);
						else this.viewAll();
					}}/>
				</div>
				{ phoneList }
			</React.Fragment>
			
		)
	}
}

const mapStateToProps = state => {
	console.log(state)
	return {
		phoneList: state.phones,
		phoneList2: state.filteredPhones,
		loading: state.loading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		loadPhoneList: () => dispatch ( actions.loadPhoneList() ),
		searchPhone: (value) => dispatch ( actions.searchPhone(value) ),
		viewAll: () => dispatch ( actions.viewAll() )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)