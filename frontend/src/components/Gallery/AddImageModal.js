import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddImageForm from "./AddImageForm"
import {API_URL} from "../../constants"
import {axiosApiInstance} from "../../axiosTokenHandle"
import { useDispatch  } from 'react-redux'
import { LogOut, OpenLoginDialog} from "../../redux/actions"
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  modalAddImage: {
    backgroundColor:"white" ,
    width:"450px",
    height:"700px",
    '@media (max-width: 540px)': {
        width: "300px"
    }
  }
  }));



function SimpleDialog(props) {
  const { onClose, open } = props;
  const classes = useStyles();


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
      <Grid container direction="column" justify="center" alignItems="center" className={classes.modalAddImage}>
        <Grid item>
          <Typography style={{marginTop:"0rem",color:"#2d2d2d"}} variant="h4">Add Image</Typography>
        </Grid>
        <Grid item>
            <AddImageForm userList={props.userList} setImages={props.setImages} handleClose={handleClose}/>
        </Grid>
      </Grid>
    </Dialog>
  );
}


export default function LoginModal(props) {
  const dispatch = useDispatch()
  const [userList,setUserList] = useState([])
  

  useEffect(async() => {
    try{
      const result = await axiosApiInstance.get(`${API_URL}/api/active_users/`)
      if (!result){
          dispatch(OpenLoginDialog())
          dispatch(LogOut())
      }
      else {
        setUserList(result.data)
    }}
    catch (e) {
      console.log(e)
    }

},[]);

 
  const [dialogOpen,setDialogOpen] = useState(false)
  const handleClickOpen = () => {
    if (props.images.length >= 10){
      alert("You already have 10 images. Please delete any image to add a new one")
      return
    }
    setDialogOpen(true)
    
  };

  const handleClose = (value) => {
    setDialogOpen(false)
  };

  return (
    <div>
      <Button variant="contained" color="primary" style={{fontSize:"1.1rem"}} onClick={handleClickOpen}>Add Image</Button> 
      <SimpleDialog open={dialogOpen} onClose={handleClose} userList={userList} setImages={props.setImages}/>
    </div>
  );
}