import { combineReducers } from 'redux';

import user from './user';
import check from './check';
import logout from './logout';

export default combineReducers({
	user,
	check,
	logout
});