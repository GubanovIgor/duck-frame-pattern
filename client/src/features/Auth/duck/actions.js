import { actionTypes } from './actionTypes';

export function success(type, payload) {
	return {
		type,
		payload,
	};
}

export function load(type) {
	return {
    type
	};
}

export function error(type) {
	return {
    type
	};
}

export function loginAction(payload) {
	return {
		type: actionTypes.USER_LOGIN,
		payload,
	};
}

export function registrateAction(payload) {
	return {
		type: actionTypes.USER_REGISTRATE,
		payload,
	};
}

export function checkAction(payload) {
	return {
		type: actionTypes.USER_CHECK,
		payload,
	};
}

export function logoutAction(payload) {
	return {
		type: actionTypes.USER_LOGOUT,
		payload,
	};
}