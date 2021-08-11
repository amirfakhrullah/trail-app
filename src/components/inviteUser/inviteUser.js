import React, { useEffect, useState } from 'react';
import './inviteUser.css';

import Loading from '../loading/loading';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useDispatch, useSelector } from 'react-redux';
import * as userAction from '../../redux/actions/userAction';
import * as organizationAction from '../../redux/actions/organizationAction';

import { Input } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export default function InviteUser({ match }) {

    const dispatch = useDispatch();
    const history = useHistory();

    //logic to filter the non-members of the organization, organizationId='', users=[]
    const findNonMembers = (organizationId, users) => {
        const nonMembers = [];
        users.forEach(user => {
            var check = false
            user.organizations.forEach(userOrg => {
                if (userOrg._id === organizationId) {
                    check = true;
                }
            })
            if (check === false) {
                nonMembers.push(user)
            }
        })
        return nonMembers;
    }

    // search filter
    function filterSearch(event) {
        var input, filter, ul, li, a, i, txtValue;
        if (event.target.type === "text") {
            input = document.getElementById("userNameSearch");
        } else if (event.target.type === "email") {
            input = document.getElementById("userEmailSearch");
        }
        filter = input.value.toUpperCase();
        ul = document.getElementById("userLists");
        li = ul.getElementsByClassName("myRow");
        for (i = 0; i < li.length; i++) {
            if (event.target.type === 'text') {
                a = li[i].getElementsByTagName("td")[1];
            } else if (event.target.type === "email") {
                a = li[i].getElementsByTagName("td")[3];
            }
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                // li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }

    useEffect(() => {
        dispatch(userAction.getAllUsers());
        dispatch(organizationAction.getOrganization(match.params.id))
    }, [dispatch, match.params.id]);

    const { loading } = useSelector(state => state.user);
    const { allUsers } = useSelector(state => state.user);

    const { message } = useSelector(state => state.organization);

    const nonMemberList = findNonMembers(match.params.id, allUsers);

    var content;
    if ((loading === 'loading' || loading === "idle") && !message) {
        content = <Loading />
    } else {
        content = (
            <div className='oneOrganizationPage'>
                <ArrowBackIcon onClick={() => window.location.href = `/organizations/${match.params.id}`} className="backIcon" style={{ fontSize: '30px', color: '#8481E2' }} />
                <h1>Invite member</h1>
                {/* <div className="userNameSearch">
                    <Input className="input-material-ui"
                        style={{ color: 'white', maxWidth: '400px', margin: '20px 0px 10px 0px' }}
                        type="text"
                        id="userNameSearch"
                        onKeyUp={filterSearch}
                        placeholder="Search for name.."
                        title="Type in a name"
                    />
                </div> */}
                <div className="userEmailSearch">
                    <Input className="input-material-ui"
                        style={{ color: 'white', maxWidth: '400px', margin: '10px 0px 20px 0px' }}
                        type="email" id="userEmailSearch"
                        onKeyUp={filterSearch}
                        placeholder="Search for email.."
                        title="Type an email"
                    />
                </div>

                {
                    message && <h4 style={{
                        textAlign: 'center',
                        marginBottom: '20px'
                    }}>{message}</h4>
                }


                <table>
                    <thead>
                        <tr>
                            <th className="indexTable">Index</th>
                            <th className="nameTable">Name</th>
                            <th className="roleTable">Role</th>
                            <th>Email</th>
                            <th>Invite</th>
                        </tr>
                    </thead>
                    <tbody id="userLists">
                        {
                            nonMemberList && nonMemberList.map(user => (
                                <tr key={user._id} className="myRow" >
                                    <td className="indexTable" style={{ textAlign: 'center' }}></td>
                                    <td className="nameTable">{user.name}</td>
                                    <td className="roleTable">{user.position}</td>
                                    <td>{user.email}</td>
                                    <td><button onClick={() => {
                                        dispatch(organizationAction.organizationInvite({
                                            id: match.params.id,
                                            userId: user._id
                                        }))
                                        history.push(`/organizations/${match.params.id}/invite`)
                                    }}>Invite</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }

    return <React.Fragment>{content}</React.Fragment>
}
