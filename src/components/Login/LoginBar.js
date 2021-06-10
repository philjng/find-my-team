import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { SportsKabaddi } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0, 2),
  },
}));

function LoginBar() {
  const classes = useStyles();

  return (
    <AppBar position="relative">
      <Toolbar>
        <SportsKabaddi />
        <Typography className={classes.margin} variant="h6">
          FindMyTeam
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
export default LoginBar;