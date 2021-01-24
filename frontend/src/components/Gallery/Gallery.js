import React, {useEffect, useState} from 'react';
import { Grid, Button, Typography } from '@material-ui/core';

import {API_URL} from '../../constants'
import {axiosApiInstance,refreshAccessToken} from "../../axiosTokenHandle"
import { useDispatch  } from 'react-redux'
import { LogOut, OpenLoginDialog} from "../../redux/actions"
import AddImageModal from "./AddImageModal"
import GalleryCard from "./GalleryCard"
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import {getImages} from "../../requests/getImages"

const useStyles = makeStyles((theme) => ({
    mainGalleryCards: {
        display:"flex",
        justifyContent: "center",
        marginTop: "3rem",
        width:"100%"
    },
    galleryCards:{
        width:"80%",
    }
    }));

function Gallery(props) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [images,setImages] = useState([])

    useEffect(async() => {
        const result = await getImages()

        if (result === false) {
            dispatch(OpenLoginDialog())
            dispatch(LogOut())
        }
        else{
            setImages(result)
        }
        
        },[]);

    return (
        <div style={{display:"flex",flexDirection:"column",marginTop:"2rem", marginBottom:"1rem",alignItems:"center"}}>
             <AddImageModal setImages={setImages} images={images}/>
             <Typography color="primary" variant="h6" style={{marginTop:"0.5rem"}}>
                A maximum of 10 images is allowed
             </Typography>
            <div className={classes.mainGalleryCards}>
                <Box className={classes.galleryCards}>
                <Grid container direction="row" justify="center" alignItems="flex-start" spacing={3}>
                    {images.map((item,i) => <GalleryCard data={item} setImages={setImages} images={images}/>)}
                </Grid>
                </Box>
            </div>
        </div>
   
            

        
    );
}

export default Gallery;