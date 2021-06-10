import {
  TextField,
  Button,
  Container,
  Box,
  InputAdornment,
  IconButton,
  Typography,
  FormControl,
} from "@material-ui/core";

import LockOpenIcon from "@material-ui/icons/LockOpen";

import { makeStyles } from "@material-ui/core/styles";
import { AccountCircle, Visibility, VisibilityOff } from "@material-ui/icons";

import { useState } from "react";

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

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({username, password});

    // navigate to home page

  };

  const classes = useStyles();
  return (
    <Container maxWidth="xs">
      <Box className={classes.box}>
        <LockOpenIcon
          fontSize="large"
          color="primary"
        />
        <Typography className={classes.margin} color="primary">
          Welcome back!
        </Typography>
        <FormControl onSubmit={handleSubmit} fullWidth>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="username"
            autoFocus
            value={username}
            onChange={handleUsernameChange}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton disabled>
                    <AccountCircle color="primary" />
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
        </FormControl>
      </Box>
    </Container>
  );
}
export default LoginForm;
