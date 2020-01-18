import { RECEIVE_CURRENT_USER } from './session';

export const RECEIVE_ERRORS = 'odas-app/error/RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'odas-app/error/CLEAR_ERRORS';

export const receiveErrors = ({ message }) => ({
    type: RECEIVE_ERRORS,
    message
});

export const clearErrors = () => ({
    type: CLEAR_ERRORS
});

export default (state = '', { type, message }) => {
    Object.freeze(state);
    switch (type) {
        case RECEIVE_ERRORS:
            return message;
        case RECEIVE_CURRENT_USER:
        case CLEAR_ERRORS:
            return '';
        default:
            return state;
    }
};