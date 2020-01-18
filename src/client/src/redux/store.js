import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './modules';

export default preloadedState => createStore(
    reducer,
    preloadedState,
    applyMiddleware(thunk)
);