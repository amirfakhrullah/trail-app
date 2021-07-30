import React, { useEffect } from 'react';
import './oneTicketPage.css';

import { useDispatch, useSelector } from 'react-redux';
import * as ticketAction from '../../redux/actions/ticketAction';
import { useHistory } from 'react-router-dom';
import Loading from '../loading/loading';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function OneTicketPage({ match }, props) {
    console.log(props);

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
    const { message } = useSelector(state => state.ticket);

    var content;
    if (loadingTicket === 'loading' || loadingTicket === 'idle') {
        content = <Loading />
    } else if (loadingTicket === 'success') {
        content = (
            ticket.creator && (
                <div className="oneTicketPage">
                    <ArrowBackIcon onClick={() =>{
                        history.goBack();
                        history.goBack();
                    }} className="backIcon" style={{ fontSize: '30px', color: '#8481E2'}} />
                    <div className="ticketCard" key={match.params._id}>
                        <div className="ticketCard__left" style={{
                            borderRight: '1px solid white'
                        }}>
                            <h3 className="title-card" style={{
                                fontWeight: 'bold',
                                marginRight: '10px'
                            }}>{ticket.title}</h3>
                            <p style={{
                                margin: '20px 20px 0px 10px',
                                color: 'rgb(209, 207, 207)'
                            }}>Description: </p>
                            <p style={{
                                margin: '5px 20px 10px 10px',
                                padding: '20px 10px',
                                border: '1px solid white',
                                borderRadius: '5px'
                            }}>{ticket.description}</p>
                            <p style={{ margin: '10px 20px 10px 10px' }}><span style={{
                                color: 'rgb(209, 207, 207)'
                            }}>Opened by:</span> {ticket.creator.email}</p>
                            <p style={{ margin: '10px 20px 10px 10px' }}><span style={{
                                color: 'rgb(209, 207, 207)'
                            }}>Assigned to:</span> {ticket.assigned.email}</p>
                            <p style={{ margin: '10px 20px 10px 10px' }}><span style={{
                                color: 'rgb(209, 207, 207)'
                            }}>Status:</span> {ticket.status}</p>
                            <p style={{
                                margin: '10px 20px 10px 10px'
                            }}><span><span style={{
                                color: 'rgb(209, 207, 207)'
                            }}>Organization / Project: </span><span className="spanOrg" onClick={() => history.push(`/organizations/${ticket.organization._id}`)}>{ticket.organization.name}</span></span></p>
                            <p style={{ margin: '10px 20px 10px 10px' }}><span style={{
                                color: 'rgb(209, 207, 207)'
                            }}>Date created:</span> {ticket.date.slice(0, 10)}</p>
                        </div>
                        <div className="ticketCard__right" style={{
                            marginLeft: '2vw'
                        }}>
                            <p>{ticket.priority && ticket.priority}</p>
                            <p className="priority-circle" style={colorPriority(ticket.priority)}></p>
                        </div>
                    </div>
                    <div className="edit-bttn"> 
                        <button className="delete">
                            Delete
                        </button>
                        <button className="update">
                            Update
                        </button>
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
