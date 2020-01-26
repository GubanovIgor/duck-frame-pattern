import { actionTypes } from '../actionTypes';
const initialState = { status: 'pending' };

export default function user(state = initialState, action) {
	switch (action.type) {
		case `${actionTypes.USER_LOGIN}_LOADING`: {
			return {
				...state,
				status: 'loading',
			};
		}
		case `${actionTypes.USER_LOGIN}_SUCCESS`: {
			return {
				...state,
				...action.payload,
				status: 'success',
			};
		}
		case `${actionTypes.USER_LOGIN}_ERROR`: {
			return {
				...state,
				...action.payload,
				status: 'error',
			};
    }
    case `${actionTypes.USER_REGISTRATE}_LOADING`: {
			return {
				...state,
				status: 'loading',
			};
		}
		case `${actionTypes.USER_REGISTRATE}_SUCCESS`: {
			return {
				...state,
				...action.payload,
				status: 'success',
			};
		}
		case `${actionTypes.USER_REGISTRATE}_ERROR`: {
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