import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './sideBar.css';

import Logo from '../logo/logo';

import { decodeToken } from '../../components/dashboard/dashboard';

import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import GroupIcon from '@material-ui/icons/Group';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PersonIcon from '@material-ui/icons/Person';
import Dropdown from 'react-bootstrap/Dropdown';

import { useDispatch, useSelector } from 'react-redux';
import * as ticketAction from '../../redux/actions/ticketAction';

export default function SideBar() {

    const history = useHistory();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');

    const { assignedTickets } = useSelector(state => state.ticket);

    const Logout = () => {
        try {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('username');
            window.localStorage.removeItem('useremail');
            window.localStorage.removeItem('userid');
            window.location.href = '/login';
        } catch (error) {
            console.log(error)
        }
    }

    const findUndoneTickets = tickets => {
        return tickets.filter(ticks => ticks.status !== "Done");
    }

    const redCircleSize = count => {
        var size = 25;
        if (count >= 100) {
            size  = 30;
        } else if (count >= 1000) {
            size = 40
        }
        return {
            height: `${size}px`,
            width: `${size}px`,
            borderRadius: '50%',
            backgroundColor: 'red',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '5px'
        };
    }

    useEffect(() => {
        const token = window.localStorage.getItem('token')
        if (!token) {
            history.push('/login');
            return;
        };

        const decoded = decodeToken(token);
        if (decoded.exp < (Date.now() / 1000)) {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('username');
            window.localStorage.removeItem('userid');
            window.localStorage.removeItem('useremail');
            window.location.href = '/login'
        }
        setUsername(decoded.name);

        if (!assignedTickets.result) {
            dispatch(ticketAction.getAssignedTickets(decoded.email))
        }
    }, [history, dispatch, assignedTickets])

    const navLinkSideBar = text => {

        var icon;

        switch (text) {
            case 'Dashboard':
                icon = <DashboardIcon style={{ paddingRight: '10px' }} />;
                break;
            case 'My Tickets':
                icon = <AssignmentIcon style={{ paddingRight: '10px' }} />;
                break;
            case 'Assigned':
                icon = <AssignmentIndIcon style={{ paddingRight: '10px' }} />;
                break;
            case 'Organizations':
                icon = <GroupIcon style={{ paddingRight: '10px' }} />;
                break;
            default:
                break;
        };

        return (
            <div className="sidebarContainer">
                {icon}
                <h4>{text}</h4>
                {
                    text === "Assigned" && (
                        <div style={assignedTickets.result && redCircleSize(findUndoneTickets(assignedTickets.result).length)}>
                            <p>{assignedTickets.result && findUndoneTickets(assignedTickets.result).length}</p>
                        </div>
                    )
                }
            </div>
        )
    };

    return (
        <>
            <div className="sideBarLeftFixed">
                <Logo />
                <div className="sideBarFeature">
                    <NavLink exact to="/" className="unselected" activeClassName="selected">
                        {navLinkSideBar('Dashboard')}
                    </NavLink>

                    <NavLink to="/organizations" className="unselected" activeClassName="selected">
                        {navLinkSideBar(`Organizations`)}
                    </NavLink>

                    <NavLink to="/my-tickets" className="unselected" activeClassName="selected">
                        {navLinkSideBar(`My Tickets`)}
                    </NavLink>

                    <NavLink to="/assigned" className="unselected" activeClassName="selected">
                        {navLinkSideBar(`Assigned`)}
                    </NavLink>

                </div >
            </div>
            <div className="sideBarRightFixed">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" style={{
                        backgroundColor: '#171717',
                        padding: '10px 15px',
                        borderRadius: '5px',
                        border: '1px solid white',
                        cursor: 'pointer',
                        margin: '20px'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <PersonIcon style={{ color: 'white' }} />
                            <p className="userNav" style={{
                                color: 'white',
                                marginLeft: '10px',
                                marginRight: '10px'
                            }}>{username.length > 16 ? `${username.slice(0, 16)}..` : username}</p>
                            <ArrowDropDownIcon style={{ color: 'white' }} />
                        </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{
                        backgroundColor: '#171717',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <Dropdown.Item className="dropdown-menu-user" onClick={() => window.location.href=`/user/${window.localStorage.getItem('userid')}/edit`}>Edit Info</Dropdown.Item>
                        <Dropdown.Item className="dropdown-menu-user" onClick={() => window.location.href=`/user/${window.localStorage.getItem('userid')}/update-password`}>Change Password</Dropdown.Item>
                        <Dropdown.Item className="dropdown-menu-user" onClick={() => Logout()}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </>
    )
}
