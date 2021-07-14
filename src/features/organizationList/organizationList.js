import React from 'react';
import './organizationList.css';

import { useHistory } from 'react-router';

import GroupIcon from '@material-ui/icons/Group';

export default function OrganizationList(props) {

    const history = useHistory();

    return (
        <div className="organizationList">
            {
                props.organizations && props.organizations.map(org => (
                    <div className="organizationCard" onClick={() => history.push(`/organizations/${org._id}`)}>
                        <div className="organizationCardContent">
                            <GroupIcon />
                            <h2>{org.name}</h2>
                            <p>{org._id}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
