import React, { useEffect } from 'react';

import Loading from '../loading/loading';

import { useDispatch, useSelector } from 'react-redux';
import * as organizationAction from '../../redux/actions/organizationAction';
import { useHistory } from 'react-router-dom';

export default function OrganizationVerification({ match }) {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const token = window.localStorage.getItem('token')
        if (!token) {
            history.push(`/login/organizations/${match.params.id}/auth/${match.params.key}`);
            return;
        };

        dispatch(organizationAction.organizationAuth({
            id: match.params.id,
            userId: window.localStorage.getItem('userid'),
            key: match.params.key
        }))
            .then(result => {
                if (result.success) {
                    window.location.href = `/organizations/${match.params.id}`
                }
            })
    }, [history, dispatch, match.params.id, match.params.key])

    const { message } = useSelector(state => state.organization);

    var content;
    if (!message) {
        content = <Loading />
    } else {
        content = (
            <div className='oneOrganizationPage'>
                <h1>{message}</h1>
            </div>
        )
    }
    return <React.Fragment>{content}</React.Fragment>
}
