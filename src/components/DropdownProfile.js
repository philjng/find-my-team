import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {AccountCircle} from "@material-ui/icons";
import {DropButton} from "./DropdownAdd";
import {Link} from "react-router-dom";

export const DropdownProfile = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <DropButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <AccountCircle/>
            </DropButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ horizontal: "right" }}
            >
                <MenuItem onClick={handleClose}><Link to = "/profile" >My profile</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to = "/settings" >Settings</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to = "/" >Logout</Link></MenuItem>
            </Menu>
        </div>
    );
}