import React, {useState} from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import {axiosApiInstance} from "../../../axiosTokenHandle"
import {API_URL} from "../../../constants"
import { useDispatch  } from 'react-redux'
import { LogOut, OpenLoginDialog} from "../../../redux/actions"
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  iconStyle: {
    paddingTop:"0.5rem",
    cursor: "pointer",
    fontSize:"1.8rem"
  }
  }));

export default function FavoriteModal(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [favorite,setFavorite] = useState(props.data.favourite)

  const favouriteImageChange = async () => {
    setFavorite(currentFavorite => !currentFavorite)
    const imageUrl = props.styledComponent ? "styled_images" : "images"
    const formData = new FormData();
    // Input all share user IDs to form data
    formData.append("img_name",props.data.img_name)
    formData.append("favourite",!favorite)
    
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
    }

  
    function handleClick(){
      favouriteImageChange()
    }

  return (
    <div style={{marginRight:"0.8rem"}}>
      {
        favorite ?
        <FavoriteIcon onClick={handleClick} className={classes.iconStyle}/>
        :
        <FavoriteBorder onClick={handleClick} className={classes.iconStyle}/>
      }
    </div>
  );

}