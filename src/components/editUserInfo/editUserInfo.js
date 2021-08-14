import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as userAction from '../../redux/actions/userAction';

import Loading from '../loading/loading';

import { Formik } from 'formik';
import * as yup from 'yup';

const formSchema = yup.object({
    name: yup.string().required('Name is required'),
    position: yup.string().required('Role is required')
});

export default function EditUserInfo() {

    const dispatch = useDispatch();
    const [ messageType, setMessageType ] = useState(null);

    useEffect(() => {
        dispatch(userAction.getUserData(window.localStorage.getItem('userid')));
    }, [dispatch])

    const { userData } = useSelector(state => state.user);
    const { loading } = useSelector(state => state.user);
    const { message } = useSelector(state => state.user);

    var content;
    if (loading === 'loading') {
        content = <Loading />
    } else {
        content = (
            <div className="createTicketPage">
                <h1 style={{ margin: '40px 0px 20px 20px' }}>Update User Info</h1>
                {
                    message && <h4 style={{
                        textAlign: 'center',
                        marginBottom: '5px'
                    }}>{message}</h4>
                }
                {
                    messageType === true && <p style={{
                        textAlign: 'center',
                        marginBottom: '20px'
                    }}>Please reload to see the updated changes.</p>
                }
                <div className="createTicketPage__container">
                    <Formik
                        initialValues={{
                            name: userData.name,
                            description: userData.description ? userData.description : '',
                            email: userData.email,
                            position: userData.position
                        }}
                        validationSchema={formSchema}
                        onSubmit={(values) => {
                            dispatch(userAction.updateUserData({
                                id: window.localStorage.getItem('userid'),
                                name: values.name,
                                avatar: userData.avatar,
                                description: values.description,
                                position: values.position
                            })).then(result => {
                                if (result.success) {
                                    setMessageType(true);
                                }
                            })
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

                                <p>Email (fixed)</p>
                                <input
                                    style={{
                                        marginTop: '5px',
                                        color: 'black'
                                    }}
                                    className="ticket-input"
                                    type="email"
                                    name="Email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    disabled
                                />
                                <p className="form-error"></p>

                                <p style={{
                                    marginTop: '10px'
                                }}>Name *</p>
                                <input
                                    style={{
                                        marginTop: '5px'
                                    }}
                                    className="ticket-input"
                                    type="text"
                                    name="name"
                                    placeholder='Name *'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                />
                                <p className="form-error">{errors.name && touched.name && errors.name}</p>

                                <p style={{
                                    marginTop: '10px'
                                }}>Role *</p>
                                <input
                                    style={{
                                        marginTop: '5px'
                                    }}
                                    className="ticket-input"
                                    type="text"
                                    name="position"
                                    placeholder='Role *'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.position}
                                />
                                <p className="form-error">{errors.position && touched.position && errors.position}</p>

                                <p style={{
                                    marginTop: '10px'
                                }}>Description</p>
                                <textarea
                                    style={{
                                        marginTop: '5px'
                                    }}
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

                                

                                <button className="form-button" type="submit" disabled={isSubmitting}>
                                    Update Info
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
