import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { MenuList } from '@material-ui/core';
import NavBarItem from "./NavBarItem"
import RegisterModal from "../RegisterModal/RegisterModal"
import LoginModal from "../LoginModal/LoginModal"

import {API_URL} from '../../constants'
import { useLocation } from 'react-router-dom'
import {axiosApiInstance,refreshAccessToken} from "../../axiosTokenHandle"
import { useSelector, useDispatch  } from 'react-redux'
import {LogIn, LogOut, OpenLoginDialog} from "../../redux/actions"


const useStyles = makeStyles((theme) => ({

  appBar: {
    background:"transparent",
    marginTop:20
  },
  toolBar:{
      display: "flex",
      justifyContent: "space-between"
  },
  itemsLayout:{
      display: "flex",
  },
  menuList:{
    display: "flex",
    flex:1,
  },


}));


function NavBar(props) {
    useEffect(async() => {
            // Verify refresh and access token. If refresh is valid update new access token and set isLogged = true
            let token = localStorage.getItem('token')
            if (token === null || token === undefined) {
                const updatedAccessToken = refreshAccessToken()
                if (updatedAccessToken === false){
                    dispatch(LogOut())

                }
                else{
                    token = localStorage.getItem('token')
                }
                return
            }
            const data = {"token": token}
            const result = await axiosApiInstance.post(`${API_URL}/api/auth/jwt/verify`,data)
            if (result === false) {
                dispatch(LogOut())
            }
            else if (result.status === 200){
                dispatch(LogIn())
            }

        },[]);
    
    
    const isLogged = useSelector(state => state.isLogged)
    const dispatch = useDispatch()
    const urlLocation = useLocation().pathname
    const classes = useStyles();

    const menuItemsList = [{'name':'Home',"link":"/"},{'name':'Styler App',"link":"/styler_app"}, {'name':'Gallery',"link":"/gallery"}, {'name':'Styled Gallery',"link":"/styled_gallery"},
     {'name':'Shared images',"link":"/shared_images"}, {'name':'Styles',"link":"/styles"}]

     async function images(){
        const result = await axiosApiInstance.get(`${API_URL}/api/images/`)
        console.log(result)
        if (result === false){
            dispatch(OpenLoginDialog())
            dispatch(LogOut())
        }
     }

     function logoutUser(){
         localStorage.clear()
         dispatch(LogOut())
     }
    // If URL location is styler hide navbar
    if (urlLocation === "/styler"){
        return null
    }

    return (
        <div>
            <AppBar className={classes.appBar} position="static">
                <Toolbar className={classes.toolBar}>
                    <Typography color="primary" variant="h5">
                        Image styler
                    </Typography>

                    { isLogged 
                    ?
                    <div className={classes.itemsLayout}> 
                        <MenuList className={classes.menuList}>
                            {menuItemsList.map((item,i) => <NavBarItem key={i} menuName={item.name} menuLink = {item.link}/>)}
                        </MenuList>
                    <Button onClick={images} color="primary"> daa</Button>
                    </div>
                    : <Typography color="primary" variant="h5">Log in to see more features</Typography>
                    }
                    
                    <div style={{display:"flex"}}>
                    { isLogged
                    ? <Button color="primary" variant="outlined" style={{fontSize:"1rem"}} onClick={logoutUser}>Logout</Button>
                    : 
                    <div style={{display:"flex"}}>
                        <LoginModal/>     
                        <RegisterModal />
                    </div>
                    }
                    
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;