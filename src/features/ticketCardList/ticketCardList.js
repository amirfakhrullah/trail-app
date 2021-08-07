import React from 'react';
import './ticketCardList.css';

import { useHistory } from 'react-router';

export default function TicketCardList(props) {

    const history = useHistory();

    var tickets;
    if (props.priorityActive === 'All') {
        tickets = props.tickets.result
    } else {
        tickets = props.tickets.result.filter(ticks => ticks.priority === props.priorityActive);
    }

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

    const colorStatus = status => {
        if (status === 'Assigned') {
            return { backgroundColor: '#77cad9' }
        } else if (status === 'Ongoing') {
            return { backgroundColor: '#2c5f88' }
        } else if (status === 'Stuck') {
            return { backgroundColor: '#f87969' }
        } else if (status === 'Done') {
            return { backgroundColor: '#ced645' }
        }
    }

    const colorFontStatus = status => {
        if (status === 'Assigned' || status === 'Done') {
            return {color: 'black'}
        } else {
            return {color: 'white'}
        }
    }

    return (
        <div id="myUl" className="ticketCardList">
            {
                tickets && tickets.map(ticks => (
                    <div className="ticketCard" key={ticks._id}>
                        <div className="ticketCard__left">
                            <h3 onClick={() => window.location.href = `/tickets/${ticks._id}`}>{ticks.title.length > 70 ? `${ticks.title.slice(0, 70)}..` : ticks.title}</h3>
                            <p style={{ marginTop: '5px', color: 'rgb(209, 207, 207)' }}>Opened by {ticks.creator.email}</p>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <p
                                    style={{ color: 'rgb(209, 207, 207)' }}
                                ><span className="spanOrg"
                                    onClick={() => history.push(`/organizations/${ticks.organization._id}`)}
                                >{ticks.organization.name}
                                    </span> | {ticks.date.slice(0, 10)}</p>
                                <div className="status-container" style={colorStatus(ticks.status)}>
                                    <p style={colorFontStatus(ticks.status)}>{ticks.status}</p>
                                </div>
                            </div>
                        </div>
                        <div className="ticketCard__right" >
                            <p>{ticks.priority}</p>
                            <p className="priority-circle" style={colorPriority(ticks.priority)}></p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
