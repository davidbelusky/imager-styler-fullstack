import React, {useEffect,useState} from 'react'
import Grid from '@material-ui/core/Grid';
import GalleryImageModal from "./GalleryImageModal"
import {getImages} from "../../../../requests/getImages"
import { useDispatch  } from 'react-redux'
import { LogOut, OpenLoginDialog} from "../../../../redux/actions"



function GalleryImagesModal(props) {
    const dispatch = useDispatch()
    const [images,setImages] = useState([])

    useEffect(() => {
        async function getImagesFunc(){
            const result = await getImages()
            if (result === false) {
                dispatch(OpenLoginDialog())
                dispatch(LogOut())
            }
            else{
                setImages(result)
            }
        }
        getImagesFunc()
        },[dispatch]);
    
    return (
        <div style={{height:"100%",width:"100%"}}>
            <Grid container direction="row" justify="center" alignItems="flex-start" spacing={3} style={{width:"75%", margin:"auto"}}>
                {images.map((item,i) => <GalleryImageModal data={item} setFile={props.setFile} setOpen={props.setOpen}/>)}
            </Grid>
            
        </div>
    )
}

export default GalleryImagesModal;
