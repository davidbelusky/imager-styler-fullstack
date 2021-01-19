import React, {useEffect} from 'react';
import { Grid, Button } from '@material-ui/core';

import {API_URL} from '../../constants'
import {axiosApiInstance,refreshAccessToken} from "../../axiosTokenHandle"
import { useDispatch  } from 'react-redux'
import { LogOut, OpenLoginDialog} from "../../redux/actions"
import AddImageModal from "./AddImageModal"

function Gallery(props) {
    const dispatch = useDispatch()
    let result

    useEffect(async() => {
        try {
        result = await axiosApiInstance.get(`${API_URL}/api/images/`)
            if (!result){
                dispatch(OpenLoginDialog())
                dispatch(LogOut())
        }}
        catch (e) {
            console.log(e)
        }
        },[]);

    return (
        <Grid style={{height:"100%",width:"100%",marginTop:"2rem"}} container direction="column" justify="center" alignItems="center">
            <Grid item style={{marginBottom:"3rem"}} >
                <AddImageModal/>
            </Grid>
            <Grid item xs style={{backgroundColor:"blue", height:"500px",width:"80%"}}>

            </Grid>

        </Grid>
        
    );
}

export default Gallery;