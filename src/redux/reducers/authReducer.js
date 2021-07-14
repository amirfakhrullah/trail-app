/* eslint-disable default-case */
import { REGISTER_USER_SUCCESS, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, REGISTER_USER_FAIL, LOADING } from '../actions/authAction';

const initialState = {
    user: {},
    error: {},
    loading: 'idle',
    errorMessage: ''
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state=initialState, action) {
    switch (action.type) {
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: 'success'
            };
        case REGISTER_USER_FAIL:
            return {
                ...state,
                errors: true,
                loading: 'fail',
                errorMessage: action.payload
            };
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: 'success'
            };
        case LOGIN_USER_FAIL:
            return {
                ...state,
                errors: true,
                loading: 'fail',
                errorMessage: action.payload
            }
        case LOADING:
            return {
                ...state,
                loading: 'loading'
            }
    };
    return state;
}