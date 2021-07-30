import React, { useState, useEffect } from 'react';
import './createTicketPage.css';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import * as organizationAction from '../../redux/actions/organizationAction';

import Loading from '../loading/loading';

import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';

const formSchema = yup.object({
    title: yup.string().required('Issue title is required'),
    description: yup.string().required('Issue description is required').max(300),
});

export default function CreateTicketPage({ match }) {

    const dispatch = useDispatch();

    const [members, setMembers] = useState([]);

    const findMemberIdByEmail = (members, email) => {
        const member = members.find(mem => mem.email === email);
        if (!member) return '';
        return member._id;
    }

    useEffect(() => {
        dispatch(organizationAction.getOrganization(match.params.id))
            .then(result => {
                setMembers(result.members);
            })
    }, [dispatch, match.params.id]);

    const { loading } = useSelector(state => state.organization);

    var content;
    if (loading === 'idle' || loading === 'loading') {
        content = <Loading />
    } else {
        content = (
            <div className="createTicketPage">
                <ArrowBackIcon onClick={() => window.location.href = `/organizations/${match.params.id}`} className="backIcon" style={{ fontSize: '30px', color: '#8481E2' }} />
                <h1 style={{ margin: '0px 0px 20px 20px' }}>Open an issue / ticket</h1>
                <div className="createTicketPage__container">
                    <Formik
                        initialValues={{
                            title: '',
                            reference: '',
                            description: '',
                            assigned: '',
                            status: '',
                            priority: ''
                        }}
                        validationSchema={formSchema}
                        onSubmit={(values) => {
                            console.log({
                                title: values.title,
                                reference: values.reference,
                                description: values.description,
                                creator: {
                                    email: localStorage.getItem('useremail'),
                                    _id: localStorage.getItem('userid')
                                },
                                assigned: {
                                    email: values.assigned,
                                    _id: findMemberIdByEmail(members, values.assigned)
                                },
                                status: values.status,
                                priority: values.priority
                            });
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                            <form className="login-form" onSubmit={handleSubmit}>

                                <input
                                    className="ticket-input"
                                    type="text"
                                    name="title"
                                    placeholder='Issue Title *'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title}
                                />
                                <p className="form-error">{errors.title && touched.title && errors.title}</p>

                                <input
                                    className="ticket-input"
                                    type="text"
                                    name="reference"
                                    placeholder='Issue Reference'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.reference}
                                />
                                <p className="form-error"></p>

                                <textarea
                                    rows="7"
                                    className="ticket-input"
                                    type="text"
                                    name="description"
                                    placeholder='Description *'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                />
                                <p className="form-error">{errors.description && touched.description && errors.description}</p>

                                <Form>
                                    <label htmlFor="assigned">Assigned to :</label>
                                    <Field as="select" style={{
                                        padding: '5px 10px',
                                        margin: '10px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.6)'
                                    }} name="assigned">
                                        <option value=''>None</option>
                                        {
                                            members && members.map(member => (
                                                <option key={member._id} value={member.email}>{member.email}</option>
                                            ))
                                        }
                                    </Field>

                                    <div id="my-radio-group" style={{
                                        margin: '15px 0px 5px 0px'
                                    }}>Status * :</div>
                                    <div role="group" aria-labelledby="my-radio-group" style={{
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}>
                                        <label>
                                            <Field type="radio" name="status" value="Not yet started" />
                                            Not yet started
                                        </label>
                                        <label>
                                            <Field type="radio" name="status" value="Ongoing" />
                                            Ongoing
                                        </label>
                                        <label>
                                            <Field type="radio" name="status" value="Stuck" />
                                            Stuck
                                        </label>
                                        <label>
                                            <Field type="radio" name="status" value="Done" />
                                            Done
                                        </label>
                                    </div>

                                    <div id="my-radio-group2" style={{
                                        margin: '20px 0px 5px 0px'
                                    }}>Priority * :</div>
                                    <div role="group" aria-labelledby="my-radio-group" style={{
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}>
                                        <label>
                                            <Field type="radio" name="priority" value="No-Priority" />
                                            No-Priority
                                        </label>
                                        <label>
                                            <Field type="radio" name="priority" value="Low" />
                                            Low
                                        </label>
                                        <label>
                                            <Field type="radio" name="priority" value="Medium" />
                                            Medium
                                        </label>
                                        <label>
                                            <Field type="radio" name="priority" value="High" />
                                            High
                                        </label>
                                    </div>
                                </Form>

                                <button className="form-button" type="submit" disabled={isSubmitting}>
                                    Create Ticket
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        )
    }

    return <React.Fragment>{content}</React.Fragment>
}
