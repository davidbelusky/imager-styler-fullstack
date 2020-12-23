import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion'



const useStyles = makeStyles((theme) => ({
    menuItem: {
        marginRight: 30,
        color: "white",
        fontSize: "1.2rem",
    },
  }));


function NavBarItem(props) {
    const classes = useStyles();

    return (
        <motion.div
        whileHover={{
            scale: 1.2,
            transition: { duration: 0.2 },
          }}>
            <MenuItem className={classes.menuItem} to={props.menuLink}>
                {props.menuName}
            </MenuItem >
        </motion.div>
    );
}

export default NavBarItem;