import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Aos from 'aos'
import "aos/dist/aos.css"
import DeleteModal from "./ModalHelpers/DeleteModal"



function GalleryCard(props) {
    useEffect(() => {
        Aos.init({duration: 2000})
    }, []);

    return (
        <Grid data-aos="zoom-in" data-aos-once="true" data-aos-offset="10" data-aos-duration="1000"
         item xs={12} sm={6} md={4} xl={3}>
            <Card style={{height:"480px", width:"400px"}}>
                <CardMedia
                    component="img"
                    alt={props.data.img_name}
                    height = "400px"
                    width = "auto"
                    image={props.data.uploaded_image}
                    title={props.data.img_name}
                />
            <CardContent style={{height:"65px"}}>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <div>
                    <Typography style={{color:"black"}} gutterBottom variant="h5" component="h2">
                    {props.data.img_name}
                    </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        {props.data.img_description} asdfasfsa
                        </Typography>
                    </div>
                        <DeleteModal imageId={props.data.id} setImages={props.setImages} images={props.images}/>
                </div>
            </CardContent>

        </Card>
      </Grid>
    );
}

export default GalleryCard;