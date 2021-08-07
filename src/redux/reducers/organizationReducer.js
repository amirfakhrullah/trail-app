/* eslint-disable default-case */
import { GET_ORGANIZATION, CREATE_ORGANIZATION, UPDATE_ORGANIZATION, UPDATE_ORGANIZATION_PASSWORD, DELETE_ORGANIZATION, LOADING, FAIL } from '../actions/organizationAction';

const initialState = {
    organizationData: {},
    loading: 'idle',
    message: ''
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ORGANIZATION:
            return {
                ...state,
                organizationData: action.payload,
                loading: 'success'
            };
        case CREATE_ORGANIZATION:
            return {
                ...state,
                message: action.payload.message,
                loading: 'success'
            };
        case UPDATE_ORGANIZATION:
            return {
                ...state,
                message: action.payload.message,
                loading: 'success'
            };
        case UPDATE_ORGANIZATION_PASSWORD:
            return {
                ...state,
                message: action.payload.message,
                loading: 'success'
            };
        case LOADING:
            return {
                ...state,
                loading: 'loading'
            }
        case FAIL: {
            return {
                ...state,
                loading: 'fail',
                message: action.payload.message
            }
        }
    };
    return state;
}