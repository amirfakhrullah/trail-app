import React from 'react';

import Loading from '../loading/loading';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import * as userAction from '../../redux/actions/userAction';

import { Formik } from 'formik';
import * as yup from 'yup';

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
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
});

export default function ResetPassword({ match }) {
    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.user);
    const { message } = useSelector(state => state.user);

    var content;
    if (loading === 'loading' && !message) {
        content = <Loading />
    } else {
        content = (
            <div className="createTicketPage">
                <h1 style={{ margin: '15vh 0px 20px 20px' }}>Reset Password</h1>
                {
                    message && <h4 style={{
                        textAlign: 'center',
                        marginBottom: '20px'
                    }}>{message}</h4>
                }
                <div className="createTicketPage__container">
                    <Formik
                        initialValues={{
                            newPassword: '',
                            confirmPassword: '',
                        }}
                        validationSchema={formSchema}
                        onSubmit={(values) => {
                            dispatch(userAction.resetPassword({
                                key: match.params.key,
                                id: match.params.id,
                                newPassword: values.newPassword
                            }))
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
                    <p className="navigateRegister"><span className="navigateRegisterClick" onClick={() => {
                        window.location.href = '/login'
                    }}>Login here.</span></p>
                </div>
            </div>
        )
    }

    return <React.Fragment>{content}</React.Fragment>
}
