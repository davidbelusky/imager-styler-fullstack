import React from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import style_transfer_image from "../../images/static/style_transfer_example.png"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    infoLayout: {
        width: "100%",
        marginTop: "6rem",
        '@media (max-width: 595px)': {
            marginTop: "3rem"
        },
    },
    '@media (max-width: 590px)': {
        width:"80%"
    },
    exampleLayout:{
        width: "100%",
        marginTop: "12rem",
        '@media (max-width: 945px)': {
            marginTop: "3rem"
        },
        '@media (max-width: 590px)': {
            display:"flex",
            flexDirection:"column",
        }

    },
    infoText: {
        paddingLeft: "7rem",
        maxWidth: "30rem",
        '@media (max-width: 1350px)': {
            paddingLeft: "2rem"
        },
        '@media (max-width: 913px)': {
            display: "flex",
            flexDirection:"column",
            //alignItems:"center"
        },
        '@media (max-width: 720px)': {
            paddingLeft: "0.5rem"
        },
        '@media (max-width: 670px)': {
            margin: "auto"
        },
    },
    secondInfoText: {
        marginTop:"1rem",
        '@media (max-width: 926px)': {
            width: "80%",
        },
    },
    tryItButton: {
        fontSize: "1.4rem",
        width:"18rem",
        marginTop:"2rem",
        '@media (max-width: 926px)': {
            width: "80%"
        }
    },
    secondStylerText: {
        maxWidth: "40rem",
        marginBottom: "2rem",
        paddingLeft:"0.5rem",
        paddingRight:"0.5rem",
        '@media (max-width: 1147px)': {
            maxWidth: "435px"
        }

    },
    imageStyleExample: {
        maxWidth:"670px",
        '@media (max-width: 1350px)': {
            maxWidth: "435px"
        },
        '@media (max-width: 440px)': {
            maxWidth: "100%"
        }
    }

  }));


export default function BodyMain() {
    const classes = useStyles();
    const isLogged = useSelector(state => state.isLogged)
    let infoText
    if (!isLogged){
        infoText = "Try demo styler now without registration. Just pick image and style image from your PC."
    }
    else{
        infoText = "Choose image from your gallery then select style image from PC and run stylizing. Result will be saved into your Styled images gallery"
    }


    return (
        <div>
            <Grid container justify="center">
                    <Grid item xs={12} sm={6} m={6}>
                        <div className={classes.infoLayout}>
                            <div className={classes.infoText}>
                                <Typography color="primary" variant="h3"> {isLogged ? "Styler App": "Demo styler"}</Typography>
                                <Typography className={classes.secondInfoText} color="primary" variant="h6">
                                    {infoText}
                                </Typography>
                                <Button variant="contained" color="primary" className={classes.tryItButton} component={Link} to="/styler_app">
                                    {isLogged ? "Run app" : "Try it"}
                                </Button>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} m={6}>
                        <div className={classes.exampleLayout}>
                            <Typography color="primary" variant="h3">Image styler</Typography>
                            <Typography className={classes.secondStylerText} color="primary" variant="h6">
                                Style transfer is a computer vision technique that allows us to recompose the content of an image in the style of another. If you’ve ever imagined what a photo might look like if it were painted by a famous artist, then style transfer is the computer vision technique that turns this into a reality. 
                            </Typography>
                            <img src={style_transfer_image} alt="style transfer example" className={classes.imageStyleExample}/>

                        </div>
                    </Grid>
                </Grid>
            
        </div>
    )
}
