import React, {useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import ShareIcon from '@material-ui/icons/Share';
import {axiosApiInstance} from "../../../axiosTokenHandle"
import {API_URL} from "../../../constants"
import { useDispatch  } from 'react-redux'
import { LogOut, OpenLoginDialog} from "../../../redux/actions"
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {getActiveUsers} from "../../../requests/getActiveUsers"



export default function ShareModal(props) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()
  const [userShares,setUserShares] = useState([])
  const [userList,setUserList] = useState([])

  useEffect(() => {
    async function getUsers(){
      const result = await getActiveUsers()
      if (!result){
          dispatch(OpenLoginDialog())
          dispatch(LogOut())
      }
      else {
        setUserList(result)
    }
      
      setUserShares(getAlreadySharedUsers(result))
    }
    getUsers()
},[dispatch]);

function getAlreadySharedUsers(result){
  // Get and set User shares which are already set for image
  const shareUsersIdArray = props.data.share_user
  const sharedUserEmails = result.filter(function(item){
    if (shareUsersIdArray.includes(item.id)){
      return true
    }
    return false
  }).map(function(item) {return item})
  return sharedUserEmails
}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const shareImage = async () => {
    const imageUrl = props.styledComponent ? "styled_images" : "images"
    const formData = new FormData();
    // Input all share user IDs to form data
    userShares.forEach((item) => {
        formData.append("share_user",item.id)
    })
    formData.append("img_name",props.data.img_name)
    
    try {
      const result = await axiosApiInstance.put(`${API_URL}/api/${imageUrl}/${props.data.id}`,formData)
          if (!result){
              dispatch(OpenLoginDialog())
              dispatch(LogOut())
          }
     }
      catch (e) {
          console.log(e)
      }

    handleClose()
    }

  return (
    <div style={{marginRight:"0.8rem"}}>
      <ShareIcon onClick={handleClickOpen} style={{paddingTop:"0.5rem",cursor: "pointer",fontSize:"1.8rem"}}/>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{marginTop:"1rem", maxWidth:"300px"}}>
          <DialogContentText id="alert-dialog-description">
                Enter the active users you want to share this picture with or you can delete already shared users. Filled users are already shared.
          </DialogContentText>
        </DialogContent>

        <Autocomplete
                style={{width: "217px",maxHeight:"120px",margin:"auto"}}
                multiple
                limitTags={1}
                options={userList}
                getOptionLabel={(option) => option.email}
                onChange={(event, value) => setUserShares(value.slice(-2))}
                value = {userShares}
                renderInput={(params) => (
                <TextField 
                {...params}
                name="userShare"
                rowsMax={2}
                size="small"
                label="User shares (Max 2 users)"
                helperText="Share image with other users"
                 />
                 
        )}/>

        <DialogActions style={{justifyContent:"center",marginTop:"0.5rem",marginBottom:"1rem"}}>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Cancel
          </Button>
          <Button onClick={shareImage} variant="contained" color="secondary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}