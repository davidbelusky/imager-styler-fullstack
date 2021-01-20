import React, {useEffect, useState} from 'react';
import { Grid, Button } from '@material-ui/core';

import {API_URL} from '../../constants'
import {axiosApiInstance,refreshAccessToken} from "../../axiosTokenHandle"
import { useDispatch  } from 'react-redux'
import { LogOut, OpenLoginDialog} from "../../redux/actions"
import AddImageModal from "./AddImageModal"
import GalleryCard from "./GalleryCard"
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    mainGalleryCards: {
        display:"flex",
        justifyContent: "center",
        marginTop: "3rem"
    },
    galleryCards:{
        width:"80%",
    }
    }));

 

export async function getImages(){
    try {
        const result = await axiosApiInstance.get(`${API_URL}/api/images/`)
            if (!result){
                return false
                }
            else {
                return result.data
            }
        }
        catch (e) {
            console.log(e)
            return false
        }}
       

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
             <AddImageModal setImages={setImages}/>
            <div className={classes.mainGalleryCards}>
                <Box className={classes.galleryCards}>
                <Grid container direction="row" justify="center" alignItems="flex-start" spacing={3}>
                    {images.map((item,i) => <GalleryCard data={item}/>)}
                </Grid>
                </Box>
            </div>
        </div>
   
            

        
    );
}

export default Gallery;