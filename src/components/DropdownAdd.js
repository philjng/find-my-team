import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Add} from "@material-ui/icons";
import {styled as styledMUI} from "@material-ui/styles";
import {Link} from "react-router-dom";

export const DropButton = styledMUI(Button)({
    color: '#fff'
});

export const DropdownAdd = () => {
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
                <Add/>
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
                <MenuItem onClick={handleClose}><Link to = "/create" >Create event</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to = "/create-group" >Create group</Link></MenuItem>
            </Menu>
        </div>
    );
}