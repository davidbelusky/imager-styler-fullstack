import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {API_URL} from '../../constants'
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom'



function activateUser(uid,token,setMessage,setMessageColor){
    const activateApiUrl = `${API_URL}/api/auth/users/confirm/activation/${uid}/${token}/`
    axios.post(activateApiUrl)
    .then(response => { 
        if (response.status === 204){
            setMessageColor("#00e400")
            setMessage("Account was successfully activated!")
        }
    })
    .catch(error => {
        console.log(error.response)
        setMessageColor("red")
        if (error.response.status === 400){
            setMessage("Wrong activation link or user is already activated")
        }
        else {
            setMessage("Wrong URL")
        }
    })
    }

function UserActivation(props) {
    const [message,setMessage] = useState("")
    const [messageColor,setMessageColor] = useState("")

    useEffect(() => {
        const activationUrl = window.location.href.split("/")
        const UID = activationUrl[activationUrl.length - 2]
        const Token = activationUrl[activationUrl.length - 1]
        activateUser(UID,Token,setMessage,setMessageColor)
    },[])

    return (
        <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
          <Typography style={{fontSize:"2rem",color:messageColor}} variant="h5">{message}</Typography>
          <Button style={{fontSize:"1rem" ,marginTop:"1.5rem",width:"10rem",textTransform: "none"}} variant="contained" color="secondary" component={Link} to="/">
                Go to main
            </Button>
        </div>
    );
}

export default UserActivation;