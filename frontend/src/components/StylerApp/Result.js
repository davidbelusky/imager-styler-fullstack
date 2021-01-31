import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import useMediaQuery from '@material-ui/core/useMediaQuery';



const useStyles = makeStyles((theme) => ({
    resultLayout:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        height:"100%",
        justifyContent:"center"
    },
    imageStyle:{
        maxWidth: "400px",
        maxHeight: "380px",
        borderRadius: "4%",
        '@media (max-width: 450px)': {
            maxWidth: "95%",
            maxHeight:"80%"
        },
        '@media (max-height: 790px)': {
            maxWidth: "95%",
            maxHeight:"80%"
    },
    
    },
  }));

function Result(props) {
    const classes = useStyles();
    const heightCheck = useMediaQuery('(min-height:790px)');
    const heightSet = heightCheck ? "539px": "400px"


    return (
        <div style={{height: heightSet}}>
            {props.resultImage ? (
                <div className={classes.resultLayout}>
                    <img className={classes.imageStyle} src={props.resultImage}/>
                    <Typography style={{marginTop:"2rem"}} variant="h4" component="h4" color="primary">
                    <Link href={props.resultImage}>
                        Link
                    </Link>
                    </Typography>
                    
                </div>
                )
            :(
                <div className={classes.resultLayout}>
                    <CircularProgress color="primary" size="6rem" />
                    <Typography style={{marginTop:"5rem"}} variant="h4" component="h4" color="primary">
                        Styling
                    </Typography>
                </div>
            )}

        </div>
    );
}

export default Result;