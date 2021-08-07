import React, { useEffect, useState } from 'react';
import './assignedPage.css';

import TicketCardList from '../../features/ticketCardList/ticketCardList';

import { useDispatch, useSelector } from 'react-redux';
import * as ticketAction from '../../redux/actions/ticketAction';

import { useHistory } from 'react-router-dom';
import SearchFilter from '../../features/searchFilter/searchFilter';
import Loading from '../loading/loading';

export default function AssignedPage() {

    const history = useHistory();
    const dispatch = useDispatch();

    const [priorityActive, setPriorityActive] = useState('All');

    const clickPriority = input => {
        setPriorityActive(input);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        
        // Add active class to the current button (highlight it)
        if (document.getElementById("myDIV")) {
            var header = document.getElementById("myDIV");
            var btns = header.getElementsByClassName("bttn");
            for (var i = 0; i < btns.length; i++) {
                btns[i].addEventListener("click", function () {
                    var current = document.getElementsByClassName("activePriority");
                    current[0].className = current[0].className.replace(" activePriority", "");
                    this.className += " activePriority";
                });
            }
            // end
        }

        const token = window.localStorage.getItem('token')
        if (!token) {
            history.push('/login');
            return;
        };

        try {
            const email = window.localStorage.getItem('useremail');
            dispatch(ticketAction.getAssignedTickets(email));
            history.push('/assigned');
        } catch (error) {
            console.log(error);
            window.location.href = '/login'
        }
    }, [dispatch, history]);

    const { assignedTickets } = useSelector(state => state.ticket);

    var content;
    if (!assignedTickets.result) {
        content = <Loading />
    } else {
        content = (
            <div className="assignedPage">
                <h1 style={{ marginBottom: '20px' }}>Tickets Assigned To Me</h1>
                <SearchFilter />
                <div className='dashboardCard purple'>
                    <div className="priority-navigator-container" id="myDIV">
                        <div className="bttn activePriority" onClick={() => clickPriority('All')}>
                            <h4>All</h4>
                        </div>
                        <div className="bttn" onClick={() => clickPriority('High')}>
                            <h4>High</h4>
                        </div>
                        <div className="bttn" onClick={() => clickPriority('Medium')}>
                            <h4>Medium</h4>
                        </div>
                        <div className="bttn" onClick={() => clickPriority('Low')}>
                            <h4>Low</h4>
                        </div>
                        <div className="bttn" onClick={() => clickPriority('No-Priority')}>
                            <h4>No Priority</h4>
                        </div>
                        <div className="bttn" onClick={() => clickPriority('Done')}>
                            <h4>Done</h4>
                        </div>
                    </div>
                </div>
                <TicketCardList tickets={assignedTickets} priorityActive={priorityActive} />
            </div>
        )
    }

    return <React.Fragment>{content}</React.Fragment>
}
