import React from 'react';
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
import axios from 'axios'
import {axiosApiInstance} from "../../axiosTokenHandle"


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
    const classes = useStyles();
    const menuItemsList = [{'name':'Home',"link":"/"}, {'name':'Gallery',"link":"/gallery"}, {'name':'Styled Gallery',"link":"/styled_gallery"},
     {'name':'Styling',"link":"/styling"}, {'name':'Contact',"link":"/contact"}]

     async function images(){
        const result = await axiosApiInstance.get(`${API_URL}/api/images/`)
        console.log(result)

     }

    return (
        <div>
            <AppBar className={classes.appBar} position="static">
                <Toolbar className={classes.toolBar}>
                    <Typography color="primary" variant="h5">
                        Image styler
                    </Typography>
                    <div className={classes.itemsLayout}> 
                        <MenuList className={classes.menuList}>
                            {menuItemsList.map((item,i) => <NavBarItem menuName={item.name} menuLink = {item.link}/>)}
                        </MenuList>
                    <Button onClick={images} color="primary"> daa</Button>
                    </div>
                    <div style={{display:"flex"}}>
                    <LoginModal />     
                    <RegisterModal />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;