import { actionTypes } from '../actionTypes';
const initialState = { status: 'pending' };

export default function user(state = initialState, action) {
	switch (action.type) {
		case `${actionTypes.USER_CHECK}_LOADING`: {
			return {
				...state,
				status: 'loading',
			};
		}
		case `${actionTypes.USER_CHECK}_SUCCESS`: {
			return {
				...state,
				...action.payload,
				status: 'success',
			};
		}
		case `${actionTypes.USER_CHECK}_ERROR`: {
			return {
				...state,
				...action.payload,
				status: 'error',
			};
		}

		default:
			return state;
	}
}