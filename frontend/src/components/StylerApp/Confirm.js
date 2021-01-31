import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import plusImg from '../../images/static/plus.png'



const useStyles = makeStyles((theme) => ({
    confirmLayout: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "539px",
        justifyContent: "center",
        alignItems: "center",
        marginTop:"2rem",
        "& img": {
            marginBottom:"2rem",
        },
        '@media (max-height: 790px)': {
            height: "400px"
        },
    },
    imageStyle:{
        maxWidth: "300px",
        maxHeight: "180px",
        borderRadius: "4%",
        '@media (max-height: 790px)': {
            height: "130px"
        },
    },
  }));


function Confirm(props) {
    const classes = useStyles();
    return (
        <div className={classes.confirmLayout}>
            <img className={classes.imageStyle} src={props.file.url}/>
            <img src={plusImg}/>
            <img className={classes.imageStyle} src={props.fileStyle.url}/>
        </div>
    );
}

export default Confirm;