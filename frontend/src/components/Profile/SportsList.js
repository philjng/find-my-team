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

const sports = [
  "Basketball",
  "Football",
  "Hockey",
  "Rugby",
  "Soccer",
  "Tennis",
  "Volleyball",
];

function SportsList() {
  const classes = useStyles();

  return (
    <div className={classes.sports_list}>
      <h2>Favourite Sports</h2>
      <List>
        {sports.map((sport, index) => (
          <SportListItem sportType={sport} key={index} />
        ))}
      </List>
    </div>
  );
}

export default SportsList;
