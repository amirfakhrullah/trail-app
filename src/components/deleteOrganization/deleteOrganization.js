import React, { useEffect } from 'react';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useDispatch, useSelector } from 'react-redux';
import * as organizationAction from '../../redux/actions/organizationAction';

import Loading from '../loading/loading';

export default function DeleteOrganization({ match }) {

    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.organization);
    const { message } = useSelector(state => state.organization);

    var content;
    if (loading === 'loading' && message === '') {
        content = <Loading />
    } else {
        (message === '') ? (
            content = (
                <div className="deleteTicket">
                    <ArrowBackIcon onClick={() => window.location.href = `/organizations/${match.params.id}`} className="backIcon" style={{ fontSize: '30px', color: '#8481E2' }} />
                    <h2 style={{
                        textAlign: 'center'
                    }}>Are you sure you want to delete this organization?</h2>
                    <p style={{
                        textAlign: 'center'
                    }}>All the data and organization's tickets will be permanently deleted.</p>
                    <button className="form-button" type="submit" onClick={() => {
                        dispatch(organizationAction.deleteOrganization({
                            id: match.params.id,
                            userId: window.localStorage.getItem('userid')
                        }))
                    }}>
                        Delete Organization
                    </button>
                </div>
            )
        ) : (
            content = (
                <div className="deleteTicket">
                    {
                        message && <h2 style={{
                            textAlign: 'center',
                            marginBottom: '20px'
                        }}>{message}</h2>
                    }
                    <button className="form-button" type="submit" onClick={() => window.location.href = `/`}>
                        Back to Dashboard
                    </button>
                </div>
            )
        )
    }

    return <React.Fragment>{content}</React.Fragment>
}
