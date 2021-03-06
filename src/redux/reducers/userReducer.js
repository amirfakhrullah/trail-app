/* eslint-disable default-case */
import { GET_ALL_USERS, GET_USER_DATA, UPDATE_USER, UPDATE_USER_PASSWORD, FORGOT_PASSWORD, RESET_PASSWORD, LOADING, FAIL } from '../actions/userAction';

const initialState = {
    allUsers: [],
    userData: {},
    loading: 'idle',
    message: ''
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload,
                loading: 'success'
            };
        case GET_USER_DATA:
            return {
                ...state,
                userData: action.payload,
                loading: 'success'
            };
        case UPDATE_USER:
            return {
                ...state,
                message: action.payload,
                loading: 'success'
            };
        case UPDATE_USER_PASSWORD:
            return {
                ...state,
                message: action.payload.message,
                loading: 'success'
            };
        case FORGOT_PASSWORD:
            return {
                ...state,
                message: action.payload.message,
                loading: 'success'
            };
        case RESET_PASSWORD:
            return {
                ...state,
                message: action.payload.message,
                loading: 'success'
            };
        case LOADING:
            return {
                ...state,
                loading: 'loading'
            };
        case FAIL:
            return {
                ...state,
                loading: 'fail',
                message: action.payload
            }
    };
    return state;
}