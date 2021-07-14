/* eslint-disable default-case */
import { GET_USER_DATA, UPDATE_USER, DELETE_USER, LOADING, FAIL } from '../actions/userAction';

const initialState = {
    userData: {},
    loading: 'idle',
    message: {}
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER_DATA:
            return {
                ...state,
                userData: action.payload,
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