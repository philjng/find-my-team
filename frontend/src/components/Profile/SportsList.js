import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import SportsBasketballTwoToneIcon from "@material-ui/icons/SportsBasketballTwoTone";
import SportsFootballTwoToneIcon from "@material-ui/icons/SportsFootballTwoTone";
import SportsHockeyTwoToneIcon from "@material-ui/icons/SportsHockeyTwoTone";
import SportsRugbyTwoToneIcon from "@material-ui/icons/SportsRugbyTwoTone";
import SportsSoccerTwoToneIcon from "@material-ui/icons/SportsSoccerTwoTone";
import SportsTennisTwoToneIcon from "@material-ui/icons/SportsTennisTwoTone";
import SportsVolleyballTwoToneIcon from "@material-ui/icons/SportsVolleyballTwoTone";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  sports_list: {
    "margin-top": "50px",
    "margin-left": "50px",
    display: "inline-block",
    "vertical-align": "top",
  },
}));

function SportsList() {
  const classes = useStyles();
  return (
    <div className={classes.sports_list}>
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
  );
}

export default SportsList;
