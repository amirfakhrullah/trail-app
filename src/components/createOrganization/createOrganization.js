import React, { useEffect } from 'react';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useDispatch, useSelector } from 'react-redux';
import * as organizationAction from '../../redux/actions/organizationAction';

import Loading from '../loading/loading';

import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

const formSchema = yup.object({
    name: yup.string().required("Organization name is required"),
    password: yup
        .string()
        .required()
        .min(6)
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});

export default function CreateOrganization() {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const token = window.localStorage.getItem('token')
        if (!token) {
            history.push('/login');
            return;
        };

    }, [history]);

    const { loading } = useSelector(state => state.ticket);
    const { message } = useSelector(state => state.organization);

    var content;
    if (loading === 'loading' && !message) {
        content = <Loading />
    } else {
        content = (
            <div className="createTicketPage">
                <ArrowBackIcon onClick={() => window.location.href = `/organizations`} className="backIcon" style={{ fontSize: '30px', color: '#8481E2' }} />
                <h1 style={{ margin: '0px 0px 20px 20px' }}>Create an Organization</h1>
                {
                    message && <h4 style={{
                        textAlign: 'center',
                        marginBottom: '20px'
                    }}>{message}</h4>
                }
                <div className="createTicketPage__container">
                    <Formik
                        initialValues={{
                            name: '',
                            description: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        validationSchema={formSchema}
                        onSubmit={(values) => {
                            dispatch(organizationAction.postOrganization({
                                name: values.name,
                                avatar: '',
                                description: values.description,
                                adminId: window.localStorage.getItem('userid'),
                                adminEmail: window.localStorage.getItem('useremail'),
                                password: values.password
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
                                    type="text"
                                    name="name"
                                    placeholder='Organization name *'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                />
                                <p className="form-error">{errors.name && touched.name && errors.name}</p>

                                <textarea
                                    rows="7"
                                    className="ticket-input"
                                    type="text"
                                    name="description"
                                    placeholder='Description'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                />
                                <p className="form-error">{errors.description && touched.description && errors.description}</p>

                                <input
                                    className="ticket-input"
                                    type="password"
                                    name="password"
                                    placeholder='Password *'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                <p className="form-error">{errors.password && touched.password && errors.password}</p>

                                <input
                                    className="ticket-input"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder='Confirm Password *'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confirmPassword}
                                />
                                <p className="form-error">{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</p>

                                <button className="form-button" type="submit" disabled={isSubmitting}>
                                    Create
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
