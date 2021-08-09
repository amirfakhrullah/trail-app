import React, { useEffect } from 'react';
import './signUp.css';

import Loading from '../loading/loading';

import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import * as authAction from '../../redux/actions/authAction';

import { Formik } from 'formik';
import * as yup from 'yup';

import trail from '../login/t.png';


const formSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    position: yup.string().required(),
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


export default function SignUp() {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = window.localStorage.getItem('token')
        if (token) {
            history.push('/');
            return;
        };
    })

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
                    <h1 style={{fontSize: "50px"}}>Trail App</h1>
                </div>
                { 
                    loading === 'fail' && <h2>Registration failed!</h2>
                }
                {
                    errorMessage && <h3>{errorMessage.message}</h3>
                }
                <div className="login-container">
                    <h1 style={{marginBottom: '10px'}}>Register Now.</h1>
                    <h4>Welcome to Trail App!</h4>
                    <h4 style={{marginBottom: '10px'}}>Create an account to get started.</h4>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            position: '',
                            password: '',
                            confirmPassword: ''
                        }}
                        validationSchema={formSchema}
                        onSubmit={(values) => {
                            dispatch(authAction.registerUser({
                                name: values.name,
                                email: values.email,
                                position: values.position,
                                password: values.password
                            }))
                                .then(async result => {
                                    if (result.success) {
                                        try {
                                            history.push('/');
                                            // window.location.href= '/';
                                        } catch (err) {
                                            console.log(err);
                                        }
                                    } else {
                                        history.push('/signup');
                                        console.log('Registration failed. Try again.')
                                    }
                                })
                                .catch(err => console.log(err));
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
                            <form className="login-form" style={{paddingTop: '0px'}} onSubmit={handleSubmit}>

                                <input
                                    className="form-input"
                                    type="name"
                                    name="name"
                                    placeholder='Name'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                />
                                <p className="form-error">{errors.name && touched.name && errors.name}</p>

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
                                    type="position"
                                    name="position"
                                    placeholder='Position'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.position}
                                />
                                <p className="form-error">{errors.position && touched.position && errors.position}</p>

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

                                <input
                                    className="form-input"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder='Confirm Password'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confirmPassword}
                                />
                                <p className="form-error">{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</p>

                                <button className="form-button" type="submit" disabled={isSubmitting}>
                                    Register
                                </button>
                            </form>
                        )}
                    </Formik>
                    <p className="navigateRegister">Already have an account? <span className="navigateRegisterClick" onClick={() => {
                        window.location.href = '/login'
                    }}>Sign in here.</span></p>
                </div>
            </div>
        )
    }

    return <React.Fragment>{content}</React.Fragment>
}


// return (
//     <div className="login-page">
//         <div className="login-container">
//             <h1>Register Now.</h1>
//             <Formik
//                 initialValues={{
//                     name: '',
//                     email: '',
//                     position: '',
//                     password: '',
//                     confirmPassword: ''
//                 }}
//                 validationSchema={formSchema}
//                 onSubmit={(values) => {
//                     dispatch(authAction.registerUser({
//                         name: values.name,
//                         email: values.email,
//                         position: values.position,
//                         password: values.password
//                     }))
//                         .then(async result => {
//                             if (result.success) {
//                                 try {
//                                     await AsyncStorage.setItem('token', result.token);
//                                     history.push('/');
//                                 } catch (err) {
//                                     console.log(err);
//                                 }
//                             } else {
//                                 history.push('/login');
//                                 console.log('Registration failed. Try again.')
//                             }
//                         })
//                         .catch(err => console.log(err));
//                 }}
//             >
//                 {({
//                     values,
//                     errors,
//                     touched,
//                     handleChange,
//                     handleBlur,
//                     handleSubmit,
//                     isSubmitting,
//                     /* and other goodies */
//                 }) => (
//                     <form className="login-form" onSubmit={handleSubmit}>

//                         <input
//                             className="form-input"
//                             type="name"
//                             name="name"
//                             placeholder='Name'
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             value={values.name}
//                         />
//                         <p className="form-error">{errors.name && touched.name && errors.name}</p>

//                         <input
//                             className="form-input"
//                             type="email"
//                             name="email"
//                             placeholder='Email'
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             value={values.email}
//                         />
//                         <p className="form-error">{errors.email && touched.email && errors.email}</p>

//                         <input
//                             className="form-input"
//                             type="position"
//                             name="position"
//                             placeholder='Position'
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             value={values.position}
//                         />
//                         <p className="form-error">{errors.position && touched.position && errors.position}</p>

//                         <input
//                             className="form-input"
//                             type="password"
//                             name="password"
//                             placeholder='Password'
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             value={values.password}
//                         />
//                         <p className="form-error">{errors.password && touched.password && errors.password}</p>

//                         <input
//                             className="form-input"
//                             type="password"
//                             name="confirmPassword"
//                             placeholder='Repeat Password'
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             value={values.confirmPassword}
//                         />
//                         <p className="form-error">{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</p>

//                         <button className="form-button" type="submit" disabled={isSubmitting}>
//                             Register
//                         </button>
//                     </form>
//                 )}
//             </Formik>
//             <p className="navigateRegister">Already have an account? <span className="navigateRegisterClick" onClick={() => {
//                 history.push('/login')
//             }}>Sign in here.</span></p>
//         </div>
//     </div>