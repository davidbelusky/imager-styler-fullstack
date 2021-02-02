import React, {useEffect, useState} from 'react';
import { Grid, Typography, Button} from '@material-ui/core';
import { useDispatch  } from 'react-redux'
import { LogOut, OpenLoginDialog} from "../../redux/actions"
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import {getSharedImages} from "../../requests/getSharedImages"
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
    },
    root: {
        '&$disabled': {
          backgroundColor: '#b8b8b8',
        },
      },
      disabled: {},
    }));

function SharedGallery(props) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [sharedImages,setSharedImages] = useState({})
    const [showSharedImages, setShowSharedImages] = useState([])
    const [styledImagesShowing,setStyledImagesShowing] = useState(false)

    useEffect(() => {
        async function getSharedImagesList(){
            const result = await getSharedImages()
            if (result === false) {
                dispatch(OpenLoginDialog())
                dispatch(LogOut())
            }
            else{
                // get object with two keys images (basic images) and styled_images
                setSharedImages(result)
                // set basic images as default to show
                setShowSharedImages(result.images)
            }
        }
        getSharedImagesList()
        },[dispatch]);
    
    function handleClickBasic(){
        setShowSharedImages(sharedImages.images)
        setStyledImagesShowing(false)

    }
    function handleClickStyled(){
        setShowSharedImages(sharedImages.styled_images)
        setStyledImagesShowing(true)
        console.log(sharedImages.styled_images)
    }

    return (
        <div style={{display:"flex",flexDirection:"column",marginTop:"2rem", marginBottom:"1rem",alignItems:"center"}}>
            <Typography color="primary" variant="h6" style={{marginTop:"0.5rem"}}>
                Images shared with you by other users
             </Typography>
            <div style={{display:"flex",marginTop:"1rem"}}>
                <Button 
                classes={{
                    root: classes.root,
                    disabled: classes.disabled,
                  }}
                disabled={!styledImagesShowing}
                variant="contained" color="secondary" style={{fontSize:"1.1rem",marginRight:"0.5rem",width:"100px"}} onClick={handleClickBasic}>Basic</Button> 
                <Button 
                classes={{
                    root: classes.root,
                    disabled: classes.disabled,
                  }}
                  disabled={styledImagesShowing}
                variant="contained" color="secondary" style={{fontSize:"1.1rem",width:"100px"}} onClick={handleClickStyled}>Styled</Button> 
            </div>
            <div className={classes.mainGalleryCards}>
                <Box className={classes.galleryCards}>
                <Grid container direction="row" justify="center" alignItems="flex-start" spacing={3}>
                    {showSharedImages.map((item,i) => <GalleryCard data={item} setImages={setShowSharedImages} images={showSharedImages}
                    styledComponent={styledImagesShowing} shareComponent={true}/>)}
                </Grid>
                </Box>
            </div>
        </div>
    );
}

export default SharedGallery;