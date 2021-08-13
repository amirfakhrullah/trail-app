import { BACKEND_URL } from "./authAction";


export const GET_ORGANIZATION = 'GET_ORGANIZATION';
export const INVITE_ORGANIZATION = 'INVITE_ORGANIZATION';
export const ORGANIZATION_JOINED = 'ORGANIZATION_JOINED';
export const CREATE_ORGANIZATION = 'CREATE_ORGANIZATION';
export const UPDATE_ORGANIZATION = 'UPDATE_ORGANIZATION';
export const UPDATE_ORGANIZATION_PASSWORD = 'UPDATE_ORGANIZATION_PASSWORD';
export const DELETE_ORGANIZATION = 'DELETE_ORGANIZATION';
export const LOADING = 'LOADING';
export const FAIL = 'FAIL';

const headers = {
    'auth-token': window.localStorage.getItem('token'),
    Accept: 'application/json',
    'Content-Type': 'application/json'
}

export const getOrganization = id => {

    return async dispatch => {

        dispatch({
            type: LOADING,
        });

        const result = await fetch(`${BACKEND_URL}/api/organizations/${id}`, {
            headers: {
                'auth-token': window.localStorage.getItem('token'),
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const resultJson = await result.json()

        if (resultJson) {
            dispatch({
                type: GET_ORGANIZATION,
                payload: resultJson
            });
        } else {
            dispatch({
                type: FAIL,
                payload: 'No Data Found!'
            });
        }

        return resultJson;
    }
}

export const organizationInvite = data => {
    const { id, userId } = data;

    return async dispatch => {

        dispatch({
            type: LOADING,
        });

        const result = await fetch(`${BACKEND_URL}/api/auth/organization/${id}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                userId
            })
        });
        const resultJson = await result.json();

        if (resultJson.success) {
            dispatch({
                type: INVITE_ORGANIZATION,
                payload: resultJson
            });
        } else {
            dispatch({
                type: FAIL,
                payload: resultJson
            })
        }
    }
}

export const organizationAuth = data => {
    const { id, userId, key } = data;

    return async dispatch => {

        dispatch({
            type: LOADING,
        });

        const result = await fetch(`${BACKEND_URL}/api/auth/add-organization/${id}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({
                userId,
                key
            })
        });
        const resultJson = await result.json();

        if (resultJson.success) {
            dispatch({
                type: ORGANIZATION_JOINED,
                payload: resultJson
            });
        } else {
            dispatch({
                type: FAIL,
                payload: resultJson
            })
        }

        return resultJson;
    }
}

export const postOrganization = data => {
    const { name, avatar, description, adminId, adminEmail, password } = data;

    return async dispatch => {

        dispatch({
            type: LOADING,
        });

        const result = await fetch(`${BACKEND_URL}/api/organizations/`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                name,
                avatar,
                description,
                adminId,
                adminEmail,
                password
            })
        });
        const resultJson = await result.json();

        if (resultJson.success) {
            dispatch({
                type: CREATE_ORGANIZATION,
                payload: resultJson
            });
        } else {
            dispatch({
                type: FAIL,
                payload: resultJson
            })
        }
    }
}

export const updateOrganizationPassword = data => {
    const { id, userId, password, newPassword } = data;

    return async dispatch => {

        dispatch({
            type: LOADING,
        });

        const result = await fetch(`${BACKEND_URL}/api/auth/organization/${id}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({
                userId,
                password,
                newPassword
            })
        });
        const resultJson = await result.json();

        if (resultJson.success) {
            dispatch({
                type: UPDATE_ORGANIZATION_PASSWORD,
                payload: resultJson
            });
        } else {
            dispatch({
                type: FAIL,
                payload: resultJson
            })
        }
    }
}

export const deleteOrganization = data => {

    const { id, userId } = data;

    return async dispatch => {

        dispatch({
            type: LOADING,
        });

        const result = await fetch(`${BACKEND_URL}/api/organizations/${id}`, {
            method: 'DELETE',
            headers: {
                'auth-token': window.localStorage.getItem('token'),
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId
            })
        });
        const resultJson = await result.json();
        console.log(resultJson)

        if (resultJson.success) {
            dispatch({
                type: DELETE_ORGANIZATION,
                payload: resultJson
            });
        } else {
            dispatch({
                type: FAIL,
                payload: resultJson
            });
        }
    }
}