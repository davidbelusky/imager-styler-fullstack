import React from 'react';
import Button from '@material-ui/core/Button';
import img1 from "../../images/static/style_transfer_example.png"
import { makeStyles } from '@material-ui/core/styles';
import plusImg from '../../images/static/plus.png'



const useStyles = makeStyles((theme) => ({
    confirmLayout: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        "& img": {
            marginBottom:"2rem",

        }
    },
  }));


function Confirm(props) {
    const classes = useStyles();

    return (
        <div className={classes.confirmLayout}>
            <img style={{maxWidth: "300px", maxHeight: "180px" ,borderRadius: "4%"}} src={props.file.url}/>
            <img src={plusImg}/>
            <img style={{maxWidth: "300px", maxHeight: "180px",borderRadius: "4%"}} src={props.fileStyle.url}/>



            
        </div>
    );
}

export default Confirm;