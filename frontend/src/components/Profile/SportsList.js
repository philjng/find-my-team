import { List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SportListItem from "./SportListItem";

const useStyles = makeStyles((theme) => ({
  sports_list: {
    "margin-top": "50px",
    "margin-left": "50px",
    display: "inline-block",
    "vertical-align": "top",
  },
}));

function SportsList(props) {
  const classes = useStyles();
  return (
    <div className={classes.sports_list}>
      <h2>Favourite Sports</h2>
      <List>
        <SportListItem sportType="Basketball" />
        <SportListItem sportType="Football" />
        <SportListItem sportType="Hockey" />
        <SportListItem sportType="Rugby" />
        <SportListItem sportType="Tennis" />
        <SportListItem sportType="Volleyball" />
        <SportListItem sportType="Soccer" />
      </List>
    </div>
  );
}

export default SportsList;
