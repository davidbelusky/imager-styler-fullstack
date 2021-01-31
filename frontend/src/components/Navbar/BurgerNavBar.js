import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Menu} from '@material-ui/icons';
import { Link } from 'react-router-dom'



const useStyles = makeStyles({
  list: {
      backgroundColor:"#171717"

  },
  listItems:{
    paddingLeft:"2rem",
    paddingTop:"1rem"

  },
  menuIcon:{
    color:"white",
    cursor:"pointer"
  },
  mobileMenuDivider:{
    marginTop:"1rem",
    backgroundColor:"white"
  }
});

export default function BurgerNavBar(props) {
  const classes = useStyles();
  const [menuToggle, setMenuToggle] = React.useState(false);
  /*const itemList = [{"text":"Home","icon":Home,"link":"/"},
                    {"text":"Gallery","icon":Image,"link":"/gallery"},{"text":"Shop","icon":ShoppingCart,"link":"/shop"},
                    {"text":"About","icon":Info,"link":"/about"},{"text":"Contact","icon":Mail,"link":"/contact"}]
*/


  const toggleDrawer = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMenuToggle(currentmenuToggle => !currentmenuToggle);
  };

  const list = () => (
    <div
      className={classes.list}
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <div className={classes.listItems}>
        <Typography color="primary" variant="h3">Menu</Typography>
        <Divider className={classes.mobileMenuDivider}/>
        <List>
          {props.menuItemsList.map((item, index) => (
            <ListItem button component={Link} to={item.link}>
              <ListItemIcon style={{color:"white"}}>{<item.icon />}</ListItemIcon>
              <ListItemText primary={item.name} style={{color:"white"}}/>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );

  return (
    <div>
        <React.Fragment>
          <Menu onClick={toggleDrawer()} fontSize="large" className={classes.menuIcon}/>
          <Drawer anchor='top' open={menuToggle} onClose={toggleDrawer(false)}>
            {list('toggle')}
          </Drawer>
        </React.Fragment>
      ))
    </div>
  );
}