import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import SportsBasketballTwoToneIcon from "@material-ui/icons/SportsBasketballTwoTone";
import SportsFootballTwoToneIcon from "@material-ui/icons/SportsFootballTwoTone";
import SportsHockeyTwoToneIcon from "@material-ui/icons/SportsHockeyTwoTone";
import SportsRugbyTwoToneIcon from "@material-ui/icons/SportsRugbyTwoTone";
import SportsSoccerTwoToneIcon from "@material-ui/icons/SportsSoccerTwoTone";
import SportsTennisTwoToneIcon from "@material-ui/icons/SportsTennisTwoTone";
import SportsVolleyballTwoToneIcon from "@material-ui/icons/SportsVolleyballTwoTone";

// since we're making use of specific icons from materialUI,
// but we only know at runtime which icons we'll use, we need
// to make a dynamic component to pick the right icon
// refer to here for instructions on dynamic components:
// https://reactjs.org/docs/jsx-in-depth.html#choosing-the-type-at-runtime

const components = {
  Basketball: SportsBasketballTwoToneIcon,
  Football: SportsFootballTwoToneIcon,
  Hockey: SportsHockeyTwoToneIcon,
  Rugby: SportsRugbyTwoToneIcon,
  Soccer: SportsSoccerTwoToneIcon,
  Tennis: SportsTennisTwoToneIcon,
  Volleyball: SportsVolleyballTwoToneIcon,
};

function SportListItem(props) {
  const SpecificSport = components[props.sportType];

  return (
    <ListItem>
      <ListItemIcon>
        <SpecificSport fontSize="large" />
      </ListItemIcon>
      <ListItemText primary={props.sportType} />
    </ListItem>
  );
}

export default SportListItem;
