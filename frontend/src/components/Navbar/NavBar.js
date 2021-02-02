import React, {useEffect} from 'react';
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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Home, SettingsApplicationsOutlined, ImageOutlined, BrokenImageOutlined, FolderSharedOutlined } from '@material-ui/icons';
import BurgerNavBar from "./BurgerNavBar"



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
    const hideNavText = useMediaQuery('(min-width:735px)');
    const hideBasicMenu = useMediaQuery('(min-width:1050px)');
    const dispatch = useDispatch()


    useEffect(() => {
            async function getData(){
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
                try{
                    const result = await axiosApiInstance.post(`${API_URL}/api/auth/jwt/verify`,data)
                    if (result === false) {
                        dispatch(LogOut())
                    }
                    else if (result.status === 200){
                        dispatch(LogIn())
                    }
                }
                catch (e){
                    console.log(e)
                }
            }
            getData()
        },[dispatch]);
    
    
    const isLogged = useSelector(state => state.isLogged)
    const urlLocation = useLocation().pathname
    const classes = useStyles();

    const menuItemsList = [{'name':'Home',"link":"/","icon":Home},{'name':'Styler App',"link":"/styler_app","icon":SettingsApplicationsOutlined},
    {'name':'Gallery',"link":"/gallery","icon":ImageOutlined},
    {'name':'Styled Gallery',"link":"/styled_gallery","icon":BrokenImageOutlined},
    {'name':'Shared gallery',"link":"/shared_gallery","icon":FolderSharedOutlined}]


     function logoutUser(){
         localStorage.clear()
         dispatch(LogOut())
     }
    // If URL location is styler hide navbar
    if (urlLocation === "/styler_app"){
        return null
    }

    const navText = hideNavText && "Log in to see more features"

    return (
        <div>
            <AppBar className={classes.appBar} position="static">
                <Toolbar className={classes.toolBar}>
                    {
                    (!isLogged || hideBasicMenu)&&
                    <Typography color="primary" variant="h5">
                        Image styler
                    </Typography>
                    }
                    { isLogged 
                    ?
                    <div className={classes.itemsLayout}>
                       {hideBasicMenu ?
                        <MenuList className={classes.menuList}>
                            {menuItemsList.map((item,i) => <NavBarItem key={i} menuName={item.name} menuLink = {item.link}/>)}
                        </MenuList>
                        :
                        <BurgerNavBar menuItemsList={menuItemsList}/>
                       }
                    </div>
                    : 
                    <Typography color="primary" variant="h5">{navText}</Typography>
                    }
                    {(isLogged && !hideBasicMenu) && <Typography color="primary" variant="h5">Image styler</Typography>
                    
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