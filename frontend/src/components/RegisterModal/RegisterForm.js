import React, {useState} from 'react';
import { TextField } from 'formik-material-ui';
import { Button, Typography } from '@material-ui/core';
import { Formik, Field } from 'formik';
import {API_URL} from '../../constants'
import axios from 'axios'



function RegisterForm(props) {
    const [infoMessage, setInfoMessage] = useState({"color":"","message":""});

    return (
            <Formik
            initialValues={{
                email: '',
                password: '',
                re_password: '',
              }}
            validate={values => {
            const errors = {}
            if (!values.email) {
                errors.email = 'Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 6){
                errors.password = 'Must be at least 6 characters'
            }
            if (!values.re_password){
                errors.re_password = 'Required';
            } else if (values.re_password.length < 6){
                errors.re_password = 'Must be at least 6 characters'
            }
            else if (values.password !== values.re_password){
                errors.re_password = 'Re-password didnt match'
            }

            return errors;
            }}
            
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                
                axios.post(`${API_URL}/api/auth/users/`, values)
                    .then(response => {   
                        setInfoMessage({"color":"green","message":"An email has been sent to your email address containing an activation link. Please click on the link to activate your account."})
                    })
                .catch(error => {
                    try {
                        if (error.response.data.email[0] === "user with this email address already exists.")
                        {
                            setInfoMessage({"color":"red","message":"User with this email address already exist."})
                        }
                    }
                    catch (e) {
                        console.log(error.response)
                        console.log(error.response.status)
                        if (error.response.status === 500){
                        setInfoMessage({"color":"red","message":"API is down please try again after few minutes"})
                        }
                }
                });
              }}
            >
            {({ submitForm, isSubmitting }) => (
            <form onSubmit={e => { e.preventDefault(); submitForm(e) }} autoComplete="off" style={{display:"flex", flexDirection:"column", marginTop:"2rem"}}>
                <Field
                component={TextField}
                name="email"
                type="email"
                label="Email"
                required
                style={{marginBottom:"0.2rem"}}
                />
                <Field
                component={TextField}
                type="password"
                label="Password"
                name="password"
                required
                style={{marginBottom:"0.2rem"}}
                />
                <Field
                component={TextField}
                type="password"
                label="Re-password"
                name="re_password"
                required
                />
                <div style={{maxWidth:"210px"}}>
                <Typography style={{color:infoMessage.color, marginTop:"1rem"}} variant="p" component="p">
                    {infoMessage.message}
                </Typography>
                </div>

                <Button type="submit" variant="contained" color="secondary" style={{marginTop:"1.2rem", marginBottom:"0.2rem"}}>
                    Register
                </Button>
            </form>
            )}
            </Formik>
    );
}

export default RegisterForm;