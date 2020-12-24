import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


function Result(props) {
    return (
        <div>
            {props.resultImage ? (
                <img style={{maxWidth: "500px", maxHeight: "380px",borderRadius: "4%"}} src={props.resultImage}/>)
            :(
                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <CircularProgress color="primary" size="6rem" />
                    <h1 style={{color:"white", marginTop:"5rem"}}>Styling . . .</h1>
                </div>
            )}

        </div>
    );
}

export default Result;