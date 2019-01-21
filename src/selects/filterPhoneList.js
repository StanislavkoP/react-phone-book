import { createSelector } from 'reselect';
import filterPhoneList from '../shared/filterPhoneList';

const selectPhoneList = (state) => state.phoneList || [];
const selectSearchedText = (state) => state.searchedText || '';

const selectFilterPhoneList = createSelector(
	selectPhoneList,
	selectSearchedText,
	(phoneList, searchedText) => filterPhoneList(phoneList, searchedText)
);

export default selectFilterPhoneList;