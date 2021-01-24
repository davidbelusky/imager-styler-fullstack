import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
    resultLayout:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        height:"100%",
        justifyContent:"center"
    },
  }));

function Result(props) {
    const classes = useStyles();

    return (
        <div style={{height: "496px"}}>
            {props.resultImage ? (
                <div className={classes.resultLayout}>
                    <img style={{maxWidth: "500px", maxHeight: "380px",borderRadius: "4%"}} src={props.resultImage}/>
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