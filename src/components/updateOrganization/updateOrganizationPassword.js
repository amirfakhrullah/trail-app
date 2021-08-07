import React, { useEffect } from 'react';
import './updateOrganizationPassword.css';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useDispatch, useSelector } from 'react-redux';
import * as organizationAction from '../../redux/actions/organizationAction';

import Loading from '../loading/loading';

import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

const formSchema = yup.object({
    newPassword: yup
        .string()
        .required('New Password is required')
        .min(6, 'New Password must be at least 6 characters')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "8 Characters, One Uppercase, One Lowercase, One Number and one special case"
        ),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});

export default function UpdateOrganizationPassword({ match }) {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const token = window.localStorage.getItem('token')
        if (!token) {
            history.push('/login');
            return;
        };

    }, [history]);

    const { loading } = useSelector(state => state.organization);
    const { message } = useSelector(state => state.organization);

    var content;
    if (loading === 'loading' && !message) {
        content = <Loading />
    } else {
        content = (
            <div className="createTicketPage">
                <ArrowBackIcon onClick={() => window.location.href = `/organizations/${match.params.id}`} className="backIcon" style={{ fontSize: '30px', color: '#8481E2' }} />
                <h1 style={{ margin: '0px 0px 20px 20px' }}>Change Organization's Password</h1>
                {
                    message && <h4 style={{
                        textAlign: 'center',
                        marginBottom: '20px'
                    }}>{message}</h4>
                }
                <div className="createTicketPage__container">
                    <Formik
                        initialValues={{
                            password: '',
                            newPassword: '',
                            confirmPassword: '',
                        }}
                        validationSchema={formSchema}
                        onSubmit={(values) => {
                            dispatch(organizationAction.updateOrganizationPassword({
                                id: match.params.id,
                                userId: window.localStorage.getItem('userid'),
                                password: values.password,
                                newPassword: values.newPassword
                            }));
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
                                    type="password"
                                    name="password"
                                    placeholder='Current password *'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                <p className="form-error">{errors.password && touched.password && errors.password}</p>

                                <input
                                    className="ticket-input"
                                    type="password"
                                    name="newPassword"
                                    placeholder='New Password *'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.newPassword}
                                />
                                <p className="form-error">{errors.newPassword && touched.newPassword && errors.newPassword}</p>

                                <input
                                    className="ticket-input"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder='Confirm New Password *'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confirmPassword}
                                />
                                <p className="form-error">{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</p>

                                <button className="form-button" type="submit" disabled={isSubmitting}>
                                    Update Password
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
