import { BACKEND_URL } from "./authAction";

export const GET_USER_TICKETS = 'GET_USER_TICKETS';
export const GET_TICKET_DATA = 'GET_TICKET_DATA';
export const GET_ASSIGNED_TICKETS = 'GET_ASSIGNED_TICKETS';
export const CREATE_TICKET = 'CREATE_TICKET';
export const UPDATE_TICKET = 'UPDATE_TICKET';
export const DELETE_TICKET = 'DELETE_TICKET';
export const LOADING = 'LOADING';
export const LOADING_TICKET = 'LOADING_TICKET';
export const FAIL = 'FAIL';
export const FAIL_TICKET = 'FAIL_TICKET';


export const getAssignedTickets = async (email) => {

    return async dispatch => {

        dispatch({
            type: LOADING,
        });

        const result = await fetch(`${BACKEND_URL}/api/tickets/assigned/${email}`, {
            headers: {
                'auth-token': window.localStorage.getItem('token'),
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const resultJson = await result.json();

        if (resultJson) {
            dispatch({
                type: GET_ASSIGNED_TICKETS,
                payload: resultJson
            });
        } else {
            dispatch({
                type: FAIL,
                payload: 'No Data Found!'
            });
        }
    }
};

export const getUserTickets = async (email) => {

    return async dispatch => {

        dispatch({
            type: LOADING,
        });

        const result = await fetch(`${BACKEND_URL}/api/tickets/creator/${email}`, {
            headers: {
                'auth-token': window.localStorage.getItem('token'),
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const resultJson = await result.json();

        if (resultJson) {
            dispatch({
                type: GET_USER_TICKETS,
                payload: resultJson
            });
        } else {
            dispatch({
                type: FAIL,
                payload: 'No Data Found!'
            });
        }
    }
};

export const getTicketById = async (id) => {

    return async dispatch => {

        dispatch({
            type: LOADING_TICKET,
        });

        const result = await fetch(`${BACKEND_URL}/api/tickets/${id}`, {
            headers: {
                'auth-token': window.localStorage.getItem('token'),
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const resultJson = await result.json();
        console.log(resultJson)

        if (resultJson) {
            dispatch({
                type: GET_TICKET_DATA,
                payload: resultJson
            });
        } else {
            dispatch({
                type: FAIL_TICKET,
                payload: 'No Data Found!'
            });
        }

    }
};

export const postTicket = async (data) => {
    const { title, reference, description, creatorId, creatorEmail, assignedId, assignedEmail, status, priority, organizationId, organizationName } = data;

    return async dispatch => {

        dispatch({
            type: LOADING,
        });

        const result = await fetch(`${BACKEND_URL}/api/tickets/`, {
            method: 'POST',
            headers: {
                'auth-token': window.localStorage.getItem('token'),
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                reference,
                description,
                creatorId,
                creatorEmail,
                assignedId,
                assignedEmail,
                status,
                priority,
                organizationId,
                organizationName
            })
        });
        const resultJson = await result.json();

        if (resultJson.success) {
            dispatch({
                type: CREATE_TICKET,
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