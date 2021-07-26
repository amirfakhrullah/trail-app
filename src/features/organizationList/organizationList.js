import React from 'react';
import './organizationList.css';

import OrganizationMiniContainer from '../organizationMiniContainer/organizationMiniContainer';

export default function OrganizationList(props) {

    return (
        <div className="organizationList">
            {
                props.organizations && props.organizations.map(org => (
                    <OrganizationMiniContainer key={org._id} org={org} />
                ))
            }
        </div>
    )
}
