import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {axiosApiInstance} from "../../../axiosTokenHandle"
import {API_URL} from "../../../constants"
import { useDispatch  } from 'react-redux'
import { LogOut, OpenLoginDialog} from "../../../redux/actions"



export default function FavoriteModal(props) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteImage = async () => {
    const imageUrl = props.styledComponent ? "styled_images" : "images"

    try {
      const result = await axiosApiInstance.delete(`${API_URL}/api/${imageUrl}/${props.imageId}`)
          if (!result){
              dispatch(OpenLoginDialog())
              dispatch(LogOut())
          }
     }
      catch (e) {
          console.log(e)
      }

    // Successfully deleted image
    const newListImages = props.images.filter((item) => item.id !== props.imageId);
    props.setImages(newListImages)
    handleClose()
    }

  return (
    <div style={{marginRight:"0.8rem"}}>
      <FavoriteIcon onClick={handleClickOpen} style={{paddingTop:"0.5rem",cursor: "pointer",fontSize:"1.8rem"}}/>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{marginTop:"1rem"}}>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this image?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{justifyContent:"center",marginTop:"0.5rem",marginBottom:"1rem"}}>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Cancel
          </Button>
          <Button onClick={deleteImage} variant="contained" color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}