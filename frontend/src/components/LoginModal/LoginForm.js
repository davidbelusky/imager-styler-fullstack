import React, {useState} from 'react';
import { TextField } from 'formik-material-ui';
import { Button, Typography } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import {API_URL} from '../../constants'
import axios from 'axios'
import { useDispatch  } from 'react-redux'
import {LogIn, LogOut} from "../../redux/actions"




function checkIfUserIsActive(handleClose,email,setInfoMessage,values,dispatch){
    const data = {"email":email}
    axios.post(`${API_URL}/api/activation_check/`,data)
    .then(response => {   
        if (response.data.user_is_active === false){
            setInfoMessage("User is not active, Please check your emails and activate user by click on activate link")
        }
        else{
            // User is active 
            LogInUser(handleClose,values,setInfoMessage,dispatch)
        }
    })
.catch(error => {
    console.log(error.response)
    if (error.response.status === 404){
        setInfoMessage("Email does not exist.")
    }
    else {
        console.log(error.response)
        setInfoMessage("Error try it again after a few minutes")
    }
})
}

async function LogInUser(handleClose,values,setInfoMessage,dispatch){

    await axios.post(`${API_URL}/api/auth/jwt/create`, values)
    .then(response => {  
        handleClose()
        localStorage.clear()
        localStorage.setItem('token',response.data.access)
        localStorage.setItem('refresh_token',response.data.refresh)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
        dispatch(LogIn())
    })
    .catch(error => {
    console.log(error)
    if (error.response.status >= 400 && error.response.status < 500){
            setInfoMessage("Wrong credentials")
    }
    else {
        setInfoMessage("Error try it again after a few minutes")
    }
    });
    
}


function LoginForm(props) {
    const [infoMessage, setInfoMessage] = useState("");
    const dispatch = useDispatch()
    console.log(dispatch)

    return (
            <Formik
            initialValues={{
                email: '',
                password: '',
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

            return errors;
            }}
            
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                checkIfUserIsActive(props.handleClose,values.email,setInfoMessage,values,dispatch)
              }}
            >
            {({ submitForm, isSubmitting }) => (
            <form onSubmit={e => { e.preventDefault(); submitForm(e) }} autoComplete="off" style={{display:"flex", flexDirection:"column", marginTop:"2rem"}}>
                <Field
                component={TextField}
                name="email"
                type="email"
                label="Email"
                style={{marginBottom:"0.2rem"}}
                />
                <Field
                component={TextField}
                type="password"
                label="Password"
                name="password"
                style={{marginBottom:"0.2rem"}}
                />

                <div style={{maxWidth:"210px"}}>
                <Typography style={{marginTop:"2rem",color:"red", marginTop:"1rem"}} variant="p" component="p">
                    {infoMessage}
                </Typography>
                </div>

                <Button type="submit" variant="contained" color="secondary"  style={{marginTop:"1.2rem", marginBottom:"0.2rem"}}>
                    Sign in
                </Button>
            </form>
            )}
            </Formik>
    );
}

export default LoginForm;