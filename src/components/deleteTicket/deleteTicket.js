import React, { useEffect } from 'react';
import './deleteTicket.css';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useDispatch, useSelector } from 'react-redux';
import * as ticketAction from '../../redux/actions/ticketAction';
import * as organizationAction from '../../redux/actions/organizationAction';

import { useHistory } from 'react-router-dom';

import Loading from '../loading/loading';

export default function DeleteTicket({ match }) {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const token = window.localStorage.getItem('token')
        if (!token) {
            history.push('/login');
            return;
        };

        dispatch(ticketAction.getTicketById(match.params.id))
            .then(result => {
                dispatch(organizationAction.getOrganization(result.organization._id));
            })
    }, [history, dispatch, match.params.id]);

    const { loadingTicket } = useSelector(state => state.ticket);
    const { ticket } = useSelector(state => state.ticket);

    const { organizationData } = useSelector(state => state.organization);
    const { message } = useSelector(state => state.ticket);

    var content;
    if ((loadingTicket === 'idle' || loadingTicket === 'loading') && message === '') {
        content = <Loading />
    } else {
        (message === '') ? (
            content = (
                <div className="deleteTicket">
                    <ArrowBackIcon onClick={() => window.location.href = `/organizations/${organizationData.id}`} className="backIcon" style={{ fontSize: '30px', color: '#8481E2' }} />
                    <h2 style={{
                        textAlign: 'center'
                    }}>Are you sure you want to delete Ticket ID {match.params.id}?</h2>
                    <div style={{
                        margin: '0 auto',
                        maxWidth: '400px',
                        padding: '20px',
                        border: '1px solid white',
                        marginTop: '20px'
                    }}>
                        <p>Title: {ticket.title}</p>
                        <p>Created By: {ticket.creator.email}</p>
                    </div>
                    <button className="form-button" type="submit" onClick={() => {
                        dispatch(ticketAction.deleteTicket(match.params.id))
                    }}>
                        Delete Ticket
                    </button>
                </div>
            )
        ) : (
            content = (
                <div className="deleteTicket">
                    {
                        message && <h2 style={{
                            textAlign: 'center',
                            marginBottom: '20px'
                        }}>{message}</h2>
                    }
                    <button className="form-button" type="submit" onClick={() => window.location.href = `/organizations/${organizationData.id}`}>
                        Back
                    </button>
                </div>
            )
        )
    }

    return <React.Fragment>{content}</React.Fragment>
}
