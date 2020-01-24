import { combineReducers } from 'redux';
import session from './session';
import error from './error';
import posts from './posts';

export default combineReducers({
    session,
    error,
    posts
});