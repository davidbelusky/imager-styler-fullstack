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




export default function ShareModal(props) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()
  const [userShares,setUserShares] = useState([])
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
    userShares.map((item) => {
        formData.append("share_user",item.id)
    })
    formData.append("img_name",props.imageName)
    
    try {
      const result = await axiosApiInstance.put(`${API_URL}/api/${imageUrl}/${props.imageId}`,formData)
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
        <DialogContent style={{marginTop:"1rem"}}>
          <DialogContentText id="alert-dialog-description">
                Enter the users you want to share this picture with or can delete already shared users
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
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}