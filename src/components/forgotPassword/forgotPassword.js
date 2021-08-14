import React from 'react';

import Loading from '../loading/loading';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import * as userAction from '../../redux/actions/userAction';

import { Formik } from 'formik';
import * as yup from 'yup';

const formSchema = yup.object({
    email: yup.string().email("Must be an email").required('Email is required')
});

export default function ForgotPassword() {

    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.user);
    const { message } = useSelector(state => state.user);

    var content;
    if (loading === 'loading') {
        content = <Loading />
    } else {
        content = (
            <div className="login-page">
                {
                    message && <h3>{message}</h3>
                }
                <div className="login-container">
                    <h1>Forgot password?</h1>
                    <h4>Send your email here to reset the password.</h4>
                    <Formik
                        initialValues={{
                            email: ''
                        }}
                        validationSchema={formSchema}
                        onSubmit={(values) => {
                            dispatch(userAction.forgotPassword(values.email))
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
                                    className="form-input"
                                    type="email"
                                    name="email"
                                    placeholder='Email'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                                <p className="form-error">{errors.email && touched.email && errors.email}</p>

                                <button className="form-button" style={{
                                    marginTop: '20px'
                                }} type="submit" disabled={isSubmitting}>
                                    Send
                                </button>
                            </form>
                        )}
                    </Formik>
                    <p className="navigateRegister" style={{textAlign: 'right'}}><span className="navigateRegisterClick" onClick={() => {
                        window.location.href = '/login'
                    }}>Login here.</span></p>
                </div>
            </div>
        )
    }

    return <React.Fragment>{content}</React.Fragment>
}
