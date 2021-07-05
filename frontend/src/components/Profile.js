import Avatar from "@material-ui/core/Avatar";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import SportsBasketballTwoToneIcon from "@material-ui/icons/SportsBasketballTwoTone";
import SportsFootballTwoToneIcon from "@material-ui/icons/SportsFootballTwoTone";
import SportsHockeyTwoToneIcon from "@material-ui/icons/SportsHockeyTwoTone";
import SportsRugbyTwoToneIcon from "@material-ui/icons/SportsRugbyTwoTone";
import SportsSoccerTwoToneIcon from "@material-ui/icons/SportsSoccerTwoTone";
import SportsTennisTwoToneIcon from "@material-ui/icons/SportsTennisTwoTone";
import SportsVolleyballTwoToneIcon from "@material-ui/icons/SportsVolleyballTwoTone";
import "../styling/Profile.css";
import { makeStyles } from "@material-ui/core/styles";

function Profile() {
  const img_style = {
    width: "350px",
    height: "350px",
  };

  const outer_div_style = {
    "margin-top": "50px",
    "margin-left": "50px",
    display: "inline-block",
  };
  const sports_div_style = {
    "margin-top": "50px",
    "margin-left": "50px",
    display: "inline-block",
    "vertical-align": "top",
  };

  const h1_style = {
    "margin-left": "50px",
    "font-style": "Calibri",
    "margin-bottom": "1px",
    "padding-bottom": "1px",
  };
  const h2_style = {
    "margin-left": "50px",
    "font-style": "Calibri",
    "margin-top": "1px",
    "padding-top": "1px",
    opacity: 0.75,
    color: "grey",
  };
  const icon_style = {
    width: "50px",
    height: "50px",
  };
  const list_text_style = {
    "vertical-align": "top",
  };

  return (
    <div className="profile">
      <div className="profile-info" style={outer_div_style}>
        <Avatar
          alt="Profile Picture"
          src="/images/evil_lebron.jpg"
          style={img_style}
        />
        <h1 style={h1_style}>John Doe</h1>
        <h3 style={h2_style}>john.doe@gmail.com</h3>
      </div>
      <div className="sports" style={sports_div_style}>
        <h2>Favourite Sports</h2>
        <List>
          <ListItem>
            <ListItemIcon>
              <SportsBasketballTwoToneIcon fontSize="large"></SportsBasketballTwoToneIcon>
            </ListItemIcon>
            <ListItemText primary="Basketball" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SportsSoccerTwoToneIcon fontSize="large"></SportsSoccerTwoToneIcon>
            </ListItemIcon>
            <ListItemText primary="Soccer" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SportsRugbyTwoToneIcon fontSize="large"></SportsRugbyTwoToneIcon>
            </ListItemIcon>
            <ListItemText primary="Rugby" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SportsTennisTwoToneIcon fontSize="large"></SportsTennisTwoToneIcon>
            </ListItemIcon>
            <ListItemText primary="Tennis" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SportsVolleyballTwoToneIcon fontSize="large"></SportsVolleyballTwoToneIcon>
            </ListItemIcon>
            <ListItemText primary="Volleyball" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SportsHockeyTwoToneIcon fontSize="large"></SportsHockeyTwoToneIcon>
            </ListItemIcon>
            <ListItemText primary="Hockey" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SportsFootballTwoToneIcon fontSize="large"></SportsFootballTwoToneIcon>
            </ListItemIcon>
            <ListItemText primary="Football" />
          </ListItem>
        </List>
      </div>
    </div>
  );
}
export default Profile;
