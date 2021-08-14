import React, { useEffect, useState } from 'react';
import './dashboard.css';

// import Loading from '../loading/loading';
import DashboardCard from '../../features/dashboardCard/dashboardCard';
import Loading from '../loading/loading';

import { useHistory } from 'react-router-dom';

import * as ticketAction from '../../redux/actions/ticketAction';
import * as userAction from '../../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

// const jwt_decode = require('jwt-decode');
var Buffer = require('buffer/').Buffer;


// Code for decoding JWT token without library
export const decodeToken = token => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const buff = new Buffer(base64, 'base64');
    const payloadinit = buff.toString('ascii');
    const payload = JSON.parse(payloadinit);
    return payload;
}

export default function Dashboard() {

    const history = useHistory();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const token = window.localStorage.getItem('token')
        if (!token) {
            history.push('/login');
            return;
        };

        const decoded = decodeToken(token);
        setName(decoded.name);
        setEmail(decoded.email);
        setId(decoded._id);
        try {
            window.localStorage.setItem('username', name);
            window.localStorage.setItem('useremail', email);
            window.localStorage.setItem('userid', id);
        } catch (error) {
            console.log(error)
        };
        dispatch(ticketAction.getAssignedTickets(email));
        dispatch(ticketAction.getUserTickets(email));
        dispatch(userAction.getUserData(id));
    }, [dispatch, email, history, id, name]);

    const { assignedTickets } = useSelector(state => state.ticket);
    const { userTickets } = useSelector(state => state.ticket);
    const { userData } = useSelector(state => state.user);

    var content;
    if (!assignedTickets.result) {
        content = <Loading />
    } else {
        content = (
            <div className="dashboardPage">
                <div>
                    <h4>Hello, {name} !</h4>
                    <h1 style={{ marginBottom: '0px' }}>You've got {assignedTickets.result ? <span>{assignedTickets.result.filter(ticks => ticks.priority !== "Done").length} tasks</span> : <span>0 task</span>} remaining.</h1>
                </div>
                <DashboardCard assignedTickets={assignedTickets} userTickets={userTickets} userData={userData} />
            </div>
        )
    }

    return <React.Fragment>{content}</React.Fragment>
}
