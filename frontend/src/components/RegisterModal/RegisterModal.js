import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import RegisterForm from "./RegisterForm"


const useStyles = makeStyles({
  
});

function SimpleDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };


  return (
    <Dialog style={{opacity:0.97}} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <Grid container direction="column" justify="center" alignItems="center" style={{backgroundColor:"white" ,width:"350px",height:"425px"}}>
        <Grid item>
          <Typography style={{marginTop:"0rem",color:"#2d2d2d"}} variant="h4">Sign Up</Typography>
        </Grid>
        <Grid item>
          <RegisterForm />
        </Grid>


      </Grid>
        
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function RegisterModal() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" variant="contained" style={{fontSize:"1rem",marginLeft:"0.5rem"}} onClick={handleClickOpen}>Get started</Button>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
}