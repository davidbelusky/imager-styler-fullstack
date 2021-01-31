import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Aos from 'aos'
import "aos/dist/aos.css"
import DeleteModal from "./ModalHelpers/DeleteModal"
import ShareModal from "./ModalHelpers/ShareModal"
import FavoriteModal from "./ModalHelpers/FavoriteModal"



function GalleryCard(props) {
    useEffect(() => {
        Aos.init({duration: 2000})
    }, []);

    let imageUrl = props.styledComponent ? props.data.styled_image : props.data.uploaded_image
    const imageName = props.shareComponent ? props.data.owner: props.data.img_name

    return (
        <Grid data-aos="zoom-in" data-aos-once="true" data-aos-offset="10" data-aos-duration="1000"
         item xs={12} sm={12} md={6} lg={4} xl={3}>
            <Card style={{maxHeight:"480px", maxWidth:"400px", margin:"auto"}}>
                <CardMedia
                    component="img"
                    alt={props.data.img_name}
                    height = "400px"
                    width = "auto"
                    image={imageUrl}
                    title={imageName}
                />
            <CardContent style={{height:"65px"}}>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <div>
                    {props.shareComponent ?
                    <Typography style={{color:"black",fontSize:"1.1rem"}} gutterBottom variant="h6" component="h6">
                        Shared by - {imageName}
                    </Typography>
                    :
                    <Typography style={{color:"black"}} gutterBottom variant="h5" component="h5">
                        {imageName}
                    </Typography>
                    }
                        <Typography variant="body2" color="textSecondary" component="p">
                        {props.data.img_description}
                        </Typography>
                    </div>
                        { !props.shareComponent &&
                        
                        <div style={{display:"flex",marginTop:"1rem"}}>
                            <FavoriteModal data={props.data} setImages={props.setImages} images={props.images} styledComponent={props.styledComponent}/>
                            <ShareModal data={props.data} setImages={props.setImages} images={props.images} styledComponent={props.styledComponent}/>
                            <DeleteModal imageId={props.data.id} setImages={props.setImages} images={props.images} styledComponent={props.styledComponent}/>
                        </div>
                        }
                </div>
            </CardContent>

        </Card>
      </Grid>
    );
}

export default GalleryCard;