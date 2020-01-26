import { actionTypes } from './actionTypes';
import * as api from '../api';
import { success, load, error } from './actions';
import { put, call, takeEvery } from 'redux-saga/effects';
import { loadingAT, successAT, errorAT } from '../../../utils/AsyncActionType';

function* userCheck(action) {
  yield put(load(loadingAT(action.type)));
  const res = yield call(() => api.ApiCheck(action.payload));
  if(res.status !== 'error') {
    yield put(success(successAT(action.type), res));
  } else {
    yield put(error(errorAT(action.type)));
  }
}

function* userLogin(action) {
  yield put(load(loadingAT(action.type)));
  const res = yield call(() => api.ApiLogin(action.payload));
  if(res.status !== 'error') {
    yield put(success(successAT(action.type), res));
  } else {
    yield put(error(errorAT(action.type)));
  }
}

function* userRegistrate(action) {
  yield put(load(loadingAT(action.type)));
  const res = yield call(() => api.ApiSingup(action.payload));
  if(res.status !== 'error') {
    yield put(success(successAT(action.type), res));
  } else {
    yield put(error(errorAT(action.type)));
  }
}

function* userLogout(action) {
  yield put(load(loadingAT(action.type)));
  const res = yield call(() => api.ApiLogout(action.payload));
  if(res.status !== 'error') {
    yield put(success(successAT(action.type), res));
  } else {
    yield put(error(errorAT(action.type)));
  }
}

export const checkWatcher = function*() {
	yield takeEvery(actionTypes.USER_CHECK, userCheck);
};
export const loginWatcher = function*() {
	yield takeEvery(actionTypes.USER_LOGIN, userLogin);
};
export const registrateWatcher = function*() {
	yield takeEvery(actionTypes.USER_REGISTRATE, userRegistrate);
};
export const logoutWatcher = function*() {
	yield takeEvery(actionTypes.USER_LOGOUT, userLogout);
};
