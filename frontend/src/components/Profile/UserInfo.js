import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  profile: {
    "margin-top": "50px",
    "margin-left": "50px",
    display: "inline-block",
  },
  profile_pic: {
    width: "350px",
    height: "350px",
  },
  name: {
    "margin-left": "50px",
    "font-style": "Calibri",
    "margin-bottom": "1px",
    "padding-bottom": "1px",
  },
  email: {
    "margin-left": "50px",
    "font-style": "Calibri",
    "margin-top": "1px",
    "padding-top": "1px",
    opacity: 0.75,
    color: "grey",
  },
}));

function UserInfo() {
  const classes = useStyles();
  const PLACEHOLDER_IMAGE = "/images/evil_lebron.jpg";
  return (
    <div className={classes.profile}>
      <Avatar
        alt="Profile Picture"
        src={PLACEHOLDER_IMAGE}
        className={classes.profile_pic}
      />
      <h1 className={classes.name}>John Doe</h1>
      <h3 className={classes.email}>john.doe@gmail.com</h3>
    </div>
  );
}

export default UserInfo;
