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

import Dropdown from 'react-bootstrap/Dropdown';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

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
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px'
                    }}>
                        <h1 style={{
                            margin: '0px'
                        }}>{organizationData.name}</h1>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                                padding: '6px 5px 2px 5px',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer',
                                marginLeft: '10px'
                            }}>
                                <SettingsIcon style={{ color: 'white' }} />
                                <ArrowDropDownIcon style={{ color: 'white' }} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{
                                backgroundColor: 'grey',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <Dropdown.Item className="dropdown-menu">Edit Organization's Info</Dropdown.Item>
                                <Dropdown.Item className="dropdown-menu">Change Organization's Password</Dropdown.Item>
                                <Dropdown.Item className="dropdown-menu">Delete Organization</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <p>{organizationData.description !== '' && organizationData.description}</p>
                    <p style={{ color: 'rgb(209, 207, 207)' }}>Admin : <span style={{color: 'white'}}>{organizationData.admin.email}</span> | Members : <span style={{color: 'white'}}>{organizationData.members.length}</span></p>
                    <p style={{ color: 'rgb(209, 207, 207)' }}>Current Tasks: <b style={{color: 'white'}}>{organizationTickets.result ? <span>{organizationTickets.result.filter(ticks => ticks.priority !== "Done").length} tasks</span> : <span>0 task</span>}</b></p>
                </div>
                <div className="edit-bttnOrg" style={{ justifyContent: 'flex-end' }}>
                    <button className="add-member">
                        <PersonAddIcon style={{color: 'white', fontSize: '20px'}} />
                    </button>

                    <button className="add-ticket" onClick={() => window.location.href=`/organizations/${match.params.id}/create-ticket`}>
                        Open an issue / ticket
                    </button>
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
