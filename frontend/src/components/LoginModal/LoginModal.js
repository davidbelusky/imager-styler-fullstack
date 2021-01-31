import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LoginForm from "./LoginForm"
import { useSelector,useDispatch  } from 'react-redux'
import {OpenLoginDialog, CloseLoginDialog} from "../../redux/actions"


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
      <Grid container direction="column" justify="center" alignItems="center" style={{backgroundColor:"white" ,width:"300px",height:"425px"}}>
        <Grid item>
          <Typography style={{marginTop:"0rem",color:"#2d2d2d"}} variant="h4">Sign In</Typography>
        </Grid>
        <Grid item>
            <LoginForm handleClose={handleClose}/>
        </Grid>
      </Grid>
    </Dialog>
  );
}


export default function LoginModal(props) {
  const dispatch = useDispatch()
  const isLoginDialogOpen = useSelector(state => state.isLoginDialogOpen)

  const handleClickOpen = () => {
    dispatch(OpenLoginDialog())
    
  };

  const handleClose = (value) => {
    dispatch(CloseLoginDialog())
  };

  return (
    <div>
      <Button color="primary" variant="outlined" style={{fontSize:"0.9rem"}} onClick={handleClickOpen}>Login</Button> 
      <SimpleDialog open={isLoginDialogOpen} onClose={handleClose} />
    </div>
  );
}