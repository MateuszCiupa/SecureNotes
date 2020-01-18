import * as apiUtil from 'util/session';
import { receiveErrors } from './error';

export const RECEIVE_CURRENT_USER = 'odas-app/session/RECEIVE_CURRENT_USER';
const LOGOUT_CURRENT_USER = 'odas-app/session/LOGOUT_CURRENT_USER';

const receiveCurrentUser = user => ({ 
    type: RECEIVE_CURRENT_USER, 
    user 
});

const logoutCurrentUser = () => ({ 
    type: LOGOUT_CURRENT_USER 
});

export const login = user => async dispatch => {
    const response = await apiUtil.login(user);
    const data = await response.json();

    if (response.ok) return dispatch(receiveCurrentUser(data));

    return dispatch(receiveErrors(data));
};

export const register = user => async dispatch => {
    const response = await apiUtil.register(user);
    const data = await response.json();

    if (response.ok) return dispatch(receiveCurrentUser(data));

    return dispatch(receiveErrors(data));
};

export const logout = () => async dispatch => {
    const response = await apiUtil.logout();
    const data = await response.json();

    if (response.ok) return dispatch(logoutCurrentUser());

    return dispatch(receiveErrors(data));
};

const initSession = { userId: null, firstname: null, accessToken: null, refreshToken: null }

export default (state = initSession, { type, user }) => {
    Object.freeze(state);
    switch (type) {
        case RECEIVE_CURRENT_USER:
            return user;
        case LOGOUT_CURRENT_USER:
            return initSession;
        default:
            return state;
    }
};