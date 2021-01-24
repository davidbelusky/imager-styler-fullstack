import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DeleteIcon from '@material-ui/icons/Delete';
import {axiosApiInstance} from "../../../axiosTokenHandle"
import {API_URL} from "../../../constants"
import { useDispatch  } from 'react-redux'
import { LogOut, OpenLoginDialog} from "../../../redux/actions"



export default function DeleteModal(props) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteImage = async () => {
    try {
      const result = await axiosApiInstance.delete(`${API_URL}/api/images/${props.imageId}`)
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
    <div>
      <DeleteIcon onClick={handleClickOpen} fontSize="large" style={{paddingTop:"1.4rem",cursor: "pointer"}}/>
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