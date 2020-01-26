import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { history, reducers, sagaMiddleware, devtools } from './index';

const configStore = (initialState) => {
	let store = createStore(
		reducers(history),
		initialState,
		devtools(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
	);
	return store;
}

export default configStore;
