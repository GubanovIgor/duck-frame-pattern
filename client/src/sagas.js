import { fork } from 'redux-saga/effects';
import { checkWatcher, loginWatcher, registrateWatcher, logoutWatcher } from './features/Auth/duck/sagas'

export default function* sagas() {
  yield fork(checkWatcher)
  yield fork(loginWatcher)
  yield fork(registrateWatcher)
  yield fork(logoutWatcher)
}