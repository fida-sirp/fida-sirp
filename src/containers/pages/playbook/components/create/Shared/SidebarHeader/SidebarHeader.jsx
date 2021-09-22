
/* eslint-disable */
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';


 

const SidebarHeader = (props) => {

    return (
        <div>
            <AppBar position="static" style={{backgroundColor:"#21212B"}}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <img alt="action" src="/images/action.svg"></img>
                    </IconButton>
                    <Typography variant="h6">
                        {props.title}
                </Typography >
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default SidebarHeader;