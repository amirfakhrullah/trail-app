import React from 'react';
import './organizationList.css';

import GroupIcon from '@material-ui/icons/Group';


export default function OrganizationList(props) {

    return (
        <div className="organizationList">
            {
                props.organizations && props.organizations.map(org => (
                    <div className="organizationCard" key={org._id} onClick={() => window.location.href = `/organizations/${org._id}`}>
                        <div className="organizationCardContent">
                            <GroupIcon />
                            <h2>{org.name}</h2>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
