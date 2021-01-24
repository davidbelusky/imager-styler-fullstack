import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Aos from 'aos'
import "aos/dist/aos.css"

export default function GalleryImageModal(props) {
    useEffect(() => {
        Aos.init({duration: 2000})
    }, []);
    
    function selectImage(){
        props.setFile({"file":props.data.uploaded_image,"url":props.data.uploaded_image})
    }

    return (
        <Grid data-aos="zoom-in" data-aos-once="true" data-aos-offset="10" data-aos-duration="1000"
        item xs={12} sm={6} md={4} lg={3} xl={3}>
           <Card onClick={selectImage} style={{height:"250px", width:"250px"}}>
               <CardMedia
                   component="img"
                   alt={props.data.img_name}
                   height = "250px"
                   width = "auto"
                   image={props.data.uploaded_image}
                   title={props.data.img_name}
               />
       </Card>
     </Grid>
    )
}
