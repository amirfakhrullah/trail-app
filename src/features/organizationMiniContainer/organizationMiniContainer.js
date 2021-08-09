import React, { useEffect, useState } from 'react';
import './organizationMiniContainer.css';

import * as  organizationAction from '../../redux/actions/organizationAction';
import { useDispatch } from 'react-redux';

import GroupIcon from '@material-ui/icons/Group';

export default function OrganizationMiniContainer(props) {

    const dispatch = useDispatch();

    const [organization, setOrganization] = useState('');

    useEffect(() => {
        dispatch(organizationAction.getOrganization(props.org._id))
            .then(result => {
                setOrganization(result);
            });
    }, [dispatch, props.org._id]);

    return (
        <div className="organizationCard" onClick={() => window.location.href=`/organizations/${props.org._id}`}>
            <div className="organizationCardContent">
                <GroupIcon />
                <h2>{props.org.name}</h2>
                <p>{organization.admin ? `Admin: ${organization.admin.email}` : 'Loading ...'}</p>
                <p>{organization.members ? `Members: ${organization.members.length}` : ''}</p>
            </div>
        </div>
    )
}

