import React, {useEffect, useState} from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch  } from 'react-redux'
import { LogOut, OpenLoginDialog} from "../../redux/actions"
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import {getStyledImages} from "../../requests/getStyledImages"
import GalleryCard from "../Gallery/GalleryCard"

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

function StyledGallery(props) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [styledImages,setStyledImages] = useState([])

    useEffect(async() => {
        const result = await getStyledImages()

        if (result === false) {
            dispatch(OpenLoginDialog())
            dispatch(LogOut())
        }
        else{
            setStyledImages(result)
        }
        },[]);
    console.log(styledImages)

    return (
        <div style={{display:"flex",flexDirection:"column",marginTop:"2rem", marginBottom:"1rem",alignItems:"center"}}>
            <div className={classes.mainGalleryCards}>
                <Box className={classes.galleryCards}>
                <Grid container direction="row" justify="center" alignItems="flex-start" spacing={3}>
                    {styledImages.map((item,i) => <GalleryCard data={item} setImages={setStyledImages} images={styledImages} styledComponent={true}/>)}
                </Grid>
                </Box>
            </div>
        </div>
    );
}

export default StyledGallery;