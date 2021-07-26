import React, { useEffect } from 'react';
import './oneTicketPage.css';

import { useDispatch, useSelector } from 'react-redux';
import * as ticketAction from '../../redux/actions/ticketAction';
import { useHistory } from 'react-router-dom';
import Loading from '../loading/loading';

export default function OneTicketPage({ match }) {

    const dispatch = useDispatch();
    const history = useHistory();

    const colorPriority = priority => {
        if (priority === 'High') {
            return { backgroundColor: 'rgba(214, 69, 65, 1)' }
        } else if (priority === 'Medium') {
            return { backgroundColor: '#FDDA0D' }
        } else if (priority === 'Low') {
            return { backgroundColor: '#0E26B1' }
        } else if (priority === 'No-Priority') {
            return { backgroundColor: 'green' }
        } else {
            return { backgroundColor: 'grey' }
        }
    }

    useEffect(() => {
        const token = window.localStorage.getItem('token')
        if (!token) {
            history.push('/login');
            return;
        };

        dispatch(ticketAction.getTicketById(match.params.id));
        history.push(`/tickets/${match.params.id}`)
    }, [history, dispatch, match.params.id]);

    const { loadingTicket } = useSelector(state => state.ticket);
    const { ticket } = useSelector(state => state.ticket);
    const { message } = useSelector(state =>  state.ticket);

    var content;
    if (loadingTicket === 'loading' || loadingTicket === 'idle') {
        content = <Loading />
    } else if (loadingTicket === 'success') {
        content = (
            ticket.creator && (
                <div className="oneTicketPage">
                    <div className="ticketCard" key={match.params._id}>
                        <div className="ticketCard__left">
                            <h3 className="title-card">{ticket.title}</h3>
                            <p style={{
                                margin: '10px 20px 10px 10px',
                                padding: '20px 10px',
                                border: '1px solid white',
                                borderRadius: '5px'
                            }}>{ticket.description}</p>
                            <p style={{ marginTop: '5px', color: 'rgb(209, 207, 207)' }}>Opened by {ticket.creator.email}</p>
                            <p style={{ color: 'rgb(209, 207, 207)' }}><span onClick={() => history.push(`/organizations/${ticket.organization._id}`)}>{ticket.organization.name}</span> | Status: {ticket.status} | {ticket.date.slice(0, 10)}</p>
                        </div>
                        <div className="ticketCard__right">
                            <p>{ticket.priority && ticket.priority}</p>
                            <p className="priority-circle" style={colorPriority(ticket.priority)}></p>
                        </div>
                    </div>
                    <div>
                        <button>Edit</button>
                        <button>Mark as Done</button>
                        <button>Delete</button>
                    </div>
                </div>
            )
        )
    } else if (loadingTicket === 'fail') {
        content = (
            <div className="oneTicketPage">
                <h2>{message}</h2>
            </div>
        )
    } 

    return <React.Fragment>{content}</React.Fragment>
}
