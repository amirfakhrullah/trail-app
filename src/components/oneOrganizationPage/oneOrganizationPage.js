import React, { useEffect, useState } from 'react';
import './oneOrganizationPage.css';

import DonutChart from '../donutChart/donutChart';
import TicketCardList from '../../features/ticketCardList/ticketCardList';
import Loading from '../loading/loading';
import SearchFilter from '../../features/searchFilter/searchFilter';

import { useHistory } from 'react-router-dom';

import * as ticketAction from '../../redux/actions/ticketAction';
import * as organizationAction from '../../redux/actions/organizationAction';
import { useDispatch, useSelector } from 'react-redux';


export default function OneOrganizationPage({ match }) {

    const { loading } = useSelector(state => state.organization);
    const { organizationData } = useSelector(state => state.organization);

    const loadingTickets = useSelector(state => state.ticket.loading);
    const { organizationTickets } = useSelector(state => state.ticket);

    const history = useHistory();
    const dispatch = useDispatch();

    const [priorityActive, setPriorityActive] = useState('All');

    const clickPriority = input => {
        setPriorityActive(input);
    }

    useEffect(() => {
        const token = window.localStorage.getItem('token')
        if (!token) {
            history.push('/login');
            return;
        };

        dispatch(organizationAction.getOrganization(match.params.id));
        dispatch(ticketAction.getTicketsByOrganizationId(match.params.id));

    }, [dispatch, match.params.id, history]);

    useEffect(() => {
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
        }
    })

    var content;
    if (priorityActive === 'All') {
        content = (
            <>
                <h2 style={{ marginTop: '20px', marginLeft: '20px' }}>Tasks Overview :</h2>
                <DonutChart assignedTickets={organizationTickets} />
            </>
        )
    } else {
        content = null;
    }


    var allContent;
    if (loadingTickets === 'loading' || loading === 'loading') {
        allContent = <Loading />
    } else if (loading === 'success' && loadingTickets === 'success') {
        allContent = (
            <div className='oneOrganizationPage'>
                <div>
                    <h1>{organizationData.name}</h1>
                    <h3>Admin : {organizationData.admin.email} | Members : {organizationData.members.length}</h3>
                    <h4>Current Tasks: <b>{organizationTickets.result ? <span>{organizationTickets.result.filter(ticks => ticks.priority !== "Done").length} tasks</span> : <span>0 task</span>}</b></h4>
                </div>
                <div className='dashboardCard'>
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
                    <React.Fragment>{content}</React.Fragment>
                </div>
                <SearchFilter />
                <TicketCardList tickets={organizationTickets} priorityActive={priorityActive} />
            </div>
        )
    }

    return <React.Fragment>{allContent}</React.Fragment>
}
