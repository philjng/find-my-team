import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {AccountCircle} from "@material-ui/icons";
import {DropButton} from "./DropdownAdd";
import {Link} from "react-router-dom";
import {logoutAction} from "../actions/user";
import {connect} from "react-redux";
import {useAuth} from "../context/AuthContext";

const mapStateToProps = (state) => {
  return {
    userId: state.user.user_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogout: () => dispatch(logoutAction()),
  };
};

const DropdownProfile = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {logout} = useAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (e) => {
    setAnchorEl(null);
    if (e.target.innerText === "Logout") {
      try {
        await logout();
        props.handleLogout();
      } catch {
      }
    }
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
        onClose={(e) => handleClose(e)}
        getContentAnchorEl={null}
        anchorOrigin={{vertical: "bottom", horizontal: "right"}}
        transformOrigin={{vertical: "top", horizontal: "right"}}
      >
        <MenuItem onClick={(e) => handleClose(e)}><Link to="/profile">My Profile</Link></MenuItem>
        <MenuItem onClick={(e) => handleClose(e)}><Link to="/settings">Settings</Link></MenuItem>
        <MenuItem onClick={(e) => handleClose(e)}><Link to="/">Logout</Link></MenuItem>
      </Menu>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DropdownProfile);
