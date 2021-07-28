/* eslint-disable default-case */
import { GET_USER_TICKETS, GET_TICKET_DATA, LOADING_TICKET, FAIL_TICKET, GET_ASSIGNED_TICKETS, GET_TICKETS_BY_ORG, CREATE_TICKET, UPDATE_TICKET, DELETE_TICKET, LOADING, FAIL } from '../actions/ticketAction';

const initialState = {
    userTickets: [],
    assignedTickets: [],
    organizationTickets: [],
    ticket: {},
    loading: 'idle',
    loadingTicket: 'idle',
    message: {}
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER_TICKETS:
            return {
                ...state,
                userTickets: action.payload,
                loading: 'success'
            };
        case GET_ASSIGNED_TICKETS:
            return {
                ...state,
                assignedTickets: action.payload,
                loading: 'success'
            };
        case GET_TICKET_DATA:
            return {
                ...state,
                ticket: action.payload,
                loadingTicket: 'success'
            };
        case GET_TICKETS_BY_ORG:
            return {
                ...state,
                organizationTickets: action.payload,
                loading: 'success'
            };
        case CREATE_TICKET:
            return {
                ...state,
                message: action.payload,
                loading: 'success'
            };
        case LOADING:
            return {
                ...state,
                loading: 'loading'
            };
        case LOADING_TICKET:
            return {
                ...state,
                loadingTicket: 'loading'
            };
        case FAIL:
            return {
                ...state,
                loading: 'fail',
                message: action.payload
            }
        case FAIL_TICKET:
            return {
                ...state,
                loadingTicket: 'fail',
                message: action.payload
            }
    };
    return state;
}