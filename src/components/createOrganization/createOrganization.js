import React, { useEffect } from 'react';
import './createOrganization.css';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useDispatch, useSelector } from 'react-redux';
import * as organizationAction from '../../redux/actions/organizationAction';

import Loading from '../loading/loading';

import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

const formSchema = yup.object({
    name: yup.string().required('Organization name is required'),
    description: yup.string().required('Issue description is required').max(300),
});

export default function CreateOrganization() {
    return (
        <div>
            <h1>Create Organization</h1>
        </div>
    )
}
