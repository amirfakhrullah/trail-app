export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';
export const LOADING = 'LOADING';


export const BACKEND_URL = 'https://limitless-falls-19200.herokuapp.com'; //Wifi 2.4


export const registerUser = authData => {
    const { name, email, position, password } = authData;

    return async dispatch => {

        dispatch({
            type: LOADING,
        });

        const result = await fetch(`${BACKEND_URL}/api/auth/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                position,
                password
            })
        });
        const resultJson = await result.json();
        
        if (resultJson.success) {
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: 1
            });
        } else {
            dispatch({
                type: REGISTER_USER_FAIL,
                payload: resultJson
            })
        }
        return resultJson;
    };
};

export const loginUser = authData => {
    const { email, password } = authData;

    return async dispatch => {

        dispatch({
            type: LOADING,
        });

        const result = await fetch(`${BACKEND_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const resultJson = await result.json();

        if (resultJson.success) {
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: resultJson
            })
        } else {
            dispatch({
                type: LOGIN_USER_FAIL,
                payload: resultJson
            })
        }
        return resultJson;
    };
};