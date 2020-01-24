import * as apiUtils from 'util/posts';
import { receiveErrors } from './error';
import { LOGOUT_CURRENT_USER } from './session';

export const GET_POSTS = 'odas-app/posts/GET_POSTS'
export const ADD_POST = 'odas-app/posts/ADD_POST'

const _getPosts = posts => ({
    type: GET_POSTS,
    posts
});

const _addPost = post => ({
    type: ADD_POST,
    post
});

export const getPosts = () => async dispatch => {
    const response = await apiUtils.getPosts();
    const data = await response.json();

    if (response.ok) return dispatch(_getPosts(data));

    return dispatch(receiveErrors(data));
};

export const addPost = post => async dispatch => {
    const response = await apiUtils.addPost(post);
    const data = await response.json();

    if (response.ok) return dispatch(_addPost(data));

    return dispatch(receiveErrors(data));
};

export default (state = [], { type, post, posts }) => {
    switch (type) {
        case ADD_POST:
            return [post, ...state];
        case GET_POSTS:
            return posts;
        case LOGOUT_CURRENT_USER:
            return [];
        default:
            return state;
    }
};