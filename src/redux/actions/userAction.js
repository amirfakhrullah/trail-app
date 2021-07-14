import { BACKEND_URL } from "./authAction";

export const GET_USER_DATA = 'GET_USER_DATA';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const LOADING = 'LOADING';
export const FAIL = 'FAIL';

export const getUserData = async (id) => {

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