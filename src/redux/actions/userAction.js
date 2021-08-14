import { BACKEND_URL } from "./authAction";


export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_USER_DATA = 'GET_USER_DATA';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const LOADING = 'LOADING';
export const FAIL = 'FAIL';

export const getAllUsers = () => {

    return async dispatch => {

        dispatch({
            type: LOADING,
        });

        const result = await fetch(`${BACKEND_URL}/api/users/`, {
            headers: {
                'auth-token': window.localStorage.getItem('token'),
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const resultJson = await result.json();

        if (resultJson) {
            dispatch({
                type: GET_ALL_USERS,
                payload: resultJson
            });
        } else {
            dispatch({
                type: FAIL,
                payload: 'No Data Found!'
            });
        }
    }
}

export const getUserData = id => {

    return async dispatch => {

        dispatch({
            type: LOADING,
        });

        const result = await fetch(`${BACKEND_URL}/api/users/${id}`, {
            headers: {
                'auth-token': window.localStorage.getItem('token'),
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const resultJson = await result.json();

        if (resultJson) {
            dispatch({
                type: GET_USER_DATA,
                payload: resultJson
            });
        } else {
            dispatch({
                type: FAIL,
                payload: 'No Data Found!'
            });
        }
    }
}

export const updateUserData = data => {

    const { id, name, avatar, description, position } = data;

    return async dispatch => {

        dispatch({
            type: LOADING,
        });

        const result = await fetch(`${BACKEND_URL}/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'auth-token': window.localStorage.getItem('token'),
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                avatar, 
                description,
                position
            })
        });
        const resultJson = await result.json();

        if (resultJson.success) {
            dispatch({
                type: UPDATE_USER,
                payload: resultJson.message
            });
        } else {
            dispatch({
                type: FAIL,
                payload: resultJson.message
            });
        }

        return resultJson;
    }
}