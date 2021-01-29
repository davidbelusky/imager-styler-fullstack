import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles((theme) => ({
      input: {
        color: "white"
      },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
      color:"white"
    },
  
    cssLabel: {
      color: "white",
      "&$cssFocused": {
          color:"white"
      }
    },
    // Do not delete this parameter
    cssFocused: {
    },
  }));

function StylerForm(props) {
    const classes = useStyles();

    return (
        <div style={{marginBottom:"15px"}}>
                <TextField
                label="Image name" variant="outlined"
                style={{marginBottom:"1rem",backgroundColor:"#404040",borderRadius:"5px"}}
                value={props.imageName}
                InputProps={{
                    className: classes.input,
                    }}
                InputLabelProps={{
                    classes: {
                        root: classes.cssLabel,
                        focused: classes.cssFocused
                    }
                    }}
                onChange={(e) => props.setImageName(e.target.value)}
                />
        </div>
    );
}

export default StylerForm;