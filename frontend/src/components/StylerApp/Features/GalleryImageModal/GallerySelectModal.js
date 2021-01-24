import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import GalleryImagesModal from "./GalleryImagesModal"

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor:"#050505",
    borderColor:"white"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function GallerySelectModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}  style={{marginBottom:"1rem",width:"250px",fontSize:"1rem",textTransform:'none'}}>
        Choose image from gallery
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="primary" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} color="primary">
              Please select image from your gallery
            </Typography>
            <Button autoFocus onClick={handleClose} color="primary" style={{fontSize:"1.2rem"}}>
              SAVE
            </Button>
          </Toolbar>
        </AppBar>

        <GalleryImagesModal setFile={props.setFile}/>
        
      </Dialog>
    </div>
  );
}