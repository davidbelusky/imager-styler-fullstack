import React from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import style_transfer_image from "../../images/static/style_transfer_example.png"
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    infoLayout: {
        width: "100%",
        marginTop: "6rem"
    },
    exampleLayout:{
        width: "100%",
        marginTop: "12rem"

    },
    infoText: {
        marginLeft: "7rem",
        maxWidth: "30rem"
    },
    secondInfoText: {
        marginTop:"1rem"
    },
    tryItButton: {
        fontSize: "1.4rem",
        width:"18rem",
        marginTop:"2rem"
    },
    secondStylerText: {
        maxWidth: "40rem",
        marginBottom: "2rem"
    }

  }));


export default function BodyMain() {
    const classes = useStyles();
    return (
        <div>
            <Grid container justify="center" spacing={5}>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.infoLayout}>
                            <div className={classes.infoText}>
                                <Typography color="primary" variant="h3">Everything you need to grow online.</Typography>
                                <Typography className={classes.secondInfoText} color="primary" variant="h6">
                                    Simple tools for your big ideas.Start your free website trial today, no credit card required.
                                </Typography>
                                <Button variant="contained" color="primary" className={classes.tryItButton} component={Link} to="/styler">
                                    Try it
                                </Button>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.exampleLayout}>
                            <Typography color="primary" variant="h3">Image styler</Typography>
                            <Typography className={classes.secondStylerText} color="primary" variant="h6">
                                Style transfer is a computer vision technique that allows us to recompose the content of an image in the style of another. If you’ve ever imagined what a photo might look like if it were painted by a famous artist, then style transfer is the computer vision technique that turns this into a reality. 
                            </Typography>
                            <img src={style_transfer_image} alt="style transfer example" height="270"/>

                        </div>
                    </Grid>
                </Grid>
            
        </div>
    )
}
