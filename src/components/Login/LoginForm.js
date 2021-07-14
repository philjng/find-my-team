import {
  TextField,
  Button,
  Container,
  Box,
  InputAdornment,
  IconButton,
  Typography,
  FormControl,
  Link,
  Snackbar,
  Slide,
} from "@material-ui/core";

import LockOpenIcon from "@material-ui/icons/LockOpen";

import { makeStyles } from "@material-ui/core/styles";
import { Email, Visibility, VisibilityOff } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";

import { useState } from "react";
import { loginAction } from "../../actions/user";
import { connect } from "react-redux";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  margin: {
    margin: theme.spacing(2, 0),
  },
}));

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  function SlideTransition(props) {
    return <Slide {...props} direction="down" />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setError("");
      setOpen(false);
      let response = await login(email, password);
      props.handleLogin(response.user.uid);
      history.push("/home");
    } catch (error) {
      setError(error.message);
      setOpen(true);
    }
  }

  const classes = useStyles();

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={error}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={SlideTransition}
        action={
          <IconButton aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        }
      />
      <Container maxWidth="xs">
        <Box className={classes.box}>
          <LockOpenIcon fontSize="large" color="primary" />
          <Typography className={classes.margin} color="primary">
            Welcome back!
          </Typography>
          <FormControl fullWidth>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton disabled>
                      <Email color="primary" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? (
                        <Visibility color="primary" />
                      ) : (
                        <VisibilityOff color="primary" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              className={classes.margin}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Login
            </Button>
            <Link component={RouterLink} to="/signup" variant="body2">
              Sign Up
            </Link>
          </FormControl>
        </Box>
      </Container>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: (uid) => {
      dispatch(loginAction(uid));
    },
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
