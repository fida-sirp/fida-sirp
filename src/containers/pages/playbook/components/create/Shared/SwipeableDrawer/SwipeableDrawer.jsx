/* eslint-disable */
import React from 'react';
import { makeStyles, SwipeableDrawer } from '@material-ui/core';

const useStyles = makeStyles({
    MuiDrawer: {
      backgroundColor: "#2c2c38"
    }
  });
const Drawer = (props) => {
    const classes = useStyles(useStyles);
    return (
        <SwipeableDrawer
            anchor="right"
            classes={{paper: classes.MuiDrawer}}
            open={props.visible}
            onOpen={props.onOpen}
            onClose={props.onClose}
        >
            {props.childComponent}
        </SwipeableDrawer>
    )
}

export default Drawer;