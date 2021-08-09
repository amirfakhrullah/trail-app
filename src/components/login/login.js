import React, { useEffect } from 'react';
import './login.css';

import Loading from '../loading/loading';

import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import * as authAction from '../../redux/actions/authAction';

import { Formik } from 'formik';
import * as yup from 'yup';

import trail from './t.png';

const formSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6)
});

export default function Login({ match }) {

    useEffect(() => {
        const token = window.localStorage.getItem('token')
        if (token) {
            history.push('/');
            return;
        };
    })

    const history = useHistory();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);
    const errorMessage = useSelector(state => state.auth.errorMessage);
    var content;
    if (loading === 'loading') {
        content = <Loading />
    } else {
        content = (
            <div className="login-page">
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{
                        padding: '20px',
                        width: '50px',
                        height: '50px',
                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                        borderRadius: '50%',
                        marginRight: '20px'
                    }}>
                        <img src={trail} alt="logo" width="50px" />
                    </div>
                    <h1 style={{ fontSize: "50px" }}>Trail App</h1>
                </div>
                {
                    loading === 'fail' && <h2>Sign in failed!</h2>
                }
                {
                    errorMessage && <h3>{errorMessage.message}</h3>
                }
                <div className="login-container">
                    <h1>Let's sign you in.</h1>
                    <h4>Welcome back.</h4>
                    <h4>You've been missed!</h4>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        validationSchema={formSchema}
                        onSubmit={(values) => {
                            dispatch(authAction.loginUser({
                                email: values.email,
                                password: values.password
                            }))
                                .then(async result => {
                                    if (result.success) {
                                        try {
                                            window.localStorage.setItem('token', result.token);
                                            if (match.params.id && match.params.key) {
                                                window.location.href = `/organizations/${match.params.id}/auth/${match.params.key}`
                                            }
                                            history.push('/');
                                            // window.location.href = '/';
                                        } catch (err) {
                                            console.log(err);
                                        }
                                    } 
                                })
                                .catch(err => console.log(err))
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

                                <input
                                    className="form-input"
                                    type="password"
                                    name="password"
                                    placeholder='Password'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                <p className="form-error">{errors.password && touched.password && errors.password}</p>

                                <p className="forgot-password" onClick={() => console.log('Forgot Password')}>Forgot Password?</p>

                                <button className="form-button" style={{
                                    marginTop: '0px'
                                }} type="submit" disabled={isSubmitting}>
                                    Sign in
                                </button>
                            </form>
                        )}
                    </Formik>
                    <p className="navigateRegister">Doesn't have an account? <span className="navigateRegisterClick" onClick={() => {
                        window.location.href = '/signup'
                    }}>Sign up here.</span></p>
                </div>
            </div>
        )
    }

    return <React.Fragment>{content}</React.Fragment>
}