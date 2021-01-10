import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


function SimpleDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };


  return (
    <Dialog style={{opacity:0.97}} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <div style={{position:"absolute",right:5}}>
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <Grid container direction="column" justify="center" alignItems="center" style={{backgroundColor:"white" ,width:"350px",height:"425px"}}>
        <Grid item>
          <Typography style={{marginTop:"0rem",color:"#2d2d2d"}} variant="h4">Sign In</Typography>
        </Grid>
        <Grid item>
            <h1 style={{color:"red"}}>Form</h1>
        </Grid>
      </Grid>
    </Dialog>
  );
}


export default function LoginModal(props) {
  const [dialogOpen,setDialogOpen] = useState(false)

  const handleClickOpen = () => {
    setDialogOpen(true)
    
  };

  const handleClose = (value) => {
    setDialogOpen(false)
  };

  return (
    <div>
      <Button variant="contained" color="primary" style={{fontSize:"1.1rem"}} onClick={handleClickOpen}>Add Image</Button> 
      <SimpleDialog open={dialogOpen} onClose={handleClose} />
    </div>
  );
}