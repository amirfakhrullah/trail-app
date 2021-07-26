import React from 'react';
import { NavLink } from 'react-router-dom';
import './sideBar.css';

import Logo from '../logo/logo';

import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import GroupIcon from '@material-ui/icons/Group';


export default function SideBar() {

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

                    <NavLink to="/tickets" className="unselected" activeClassName="selected">
                        {navLinkSideBar(`My Tickets`)}
                    </NavLink>

                    <NavLink to="/assigned" className="unselected" activeClassName="selected">
                        {navLinkSideBar(`Assigned`)}
                    </NavLink>

                </div >
            </div>
            <div className="sideBarRightFixed">
                <button className="sign-out-btn" onClick={() => Logout()}>Sign Out</button>
            </div>
        </>
    )
}
