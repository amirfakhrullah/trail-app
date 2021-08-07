import React, { useEffect } from 'react';
import './organizationsPage.css';

import { useDispatch, useSelector } from 'react-redux';
import * as userAction from '../../redux/actions/userAction';

import { useHistory } from 'react-router-dom';

import OrganizationList from '../../features/organizationList/organizationList';
import Loading from '../loading/loading';

import AddIcon from '@material-ui/icons/Add';

export default function OrganizationsPage() {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const token = window.localStorage.getItem('token')
        if (!token) {
            history.push('/login');
            return;
        };

        try {
            const id = window.localStorage.getItem('userid');
            dispatch(userAction.getUserData(id));
            history.push('/organizations');
        } catch (error) {
            console.log(error);
            window.location.href = '/login'
        }
    }, [dispatch, history]);

    const { userData } = useSelector(state => state.user);

    var content;
    if (!userData.organizations) {
        content = <Loading />
    } else {
        content = (
            <div className="organizationsPage">
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <h1>My Organizations / Projects</h1>
                    <div className="addOrgBttn" onClick={() => window.location.href="/create-organization"}>
                        <AddIcon style={{ color: 'white', fontSize: '20px' }} />
                    </div>
                </div>
                <OrganizationList organizations={userData.organizations} />
            </div>
        )
    }

    return <React.Fragment>{content}</React.Fragment>
}
