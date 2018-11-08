import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { debounce } from '../shared/index';

import * as actions from '../state/actions/actions';

import PhoneList from '../components/PhoneList/PhoneList';
import Spinner from '../components/Spinner/Spinner';
import Input from '../components/Input/Input';

class Dashboard extends Component {

	componentDidMount () {
		this.props.loadPhoneList()
	}

	searchPost = debounce(value => {
		const inputValue = value.trim();

		if (inputValue) {
			this.props.searchPhone(inputValue)

		} else {
			this.props.viewAllPhones()
		}

	}, 300)


	render () {

		let phoneList = <Spinner />
		if (this.props.loading === false) {
			phoneList = <PhoneList phoneList={ this.props.filteredPhoneList }/>
		}

		let error = null;
		if (this.props.error) {
			error = <h4 className="ui red header">{ this.props.error }</h4>
		}

		return (
			<React.Fragment>
				<Input classes="searchPhone" placeholder='Search' change={(e) => this.searchPost(e.currentTarget.value)} />
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
	return {
		filteredPhoneList: state.filteredPhones,
		loading: state.loading,
		error: state.error
	}
}

const mapDispatchToProps = dispatch => {
	return {
		loadPhoneList: () => dispatch( actions.loadPhoneList() ),
		searchPhone: (value) => dispatch( actions.searchPhone(value) ),
		viewAllPhones: () => dispatch( actions.viewAllPhones() )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)