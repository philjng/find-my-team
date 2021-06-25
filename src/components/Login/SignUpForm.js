import {
  Container,
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
  Link,
  Box,
  Typography,
  Button,
} from "@material-ui/core";
import {
  AccountCircle,
  Visibility,
  VisibilityOff,
  PersonAdd,
  Email
} from "@material-ui/icons";
import { useState } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import { styled } from "@material-ui/styles";

const SCBox = styled(Box)({
  marginTop: "80px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const SCButton = styled(Button)({
  margin: "16px 0px",
});

function SignUpForm(props) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleFirstNameChange = (event) => {
    setForm({
      ...form,
      firstName: event.target.value,
    });
  };

  const handleLastNameChange = (event) => {
    setForm({
      ...form,
      lastName: event.target.value,
    });
  };

  const handleEmailAddressChange = (event) => {
    setForm({
      ...form,
      emailAddress: event.target.value,
    });
  };

  const handleUsernameChange = (event) => {
    setForm({
      ...form,
      username: event.target.value,
    });
  };

  const handlePasswordChange = (event) => {
    setForm({
      ...form,
      password: event.target.value,
    });
  };

  const handleConfirmPasswordChange = (event) => {
    setForm({
      ...form,
      confirmPassword: event.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const signUpAccount = () => {};

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);
    // verify email format
    // verify email not taken already
    // verify username is not taken
    // verify password is confirmed
    // verify fields only use whitelist characters (alphanumeric?)
    try {
      // try to create account if successful redirect
      signUpAccount()
      props.history.push("/")
    } catch {
      // if unsuccessful update error state on form page
    }
  };

  return (
    <Container maxWidth="xs">
      <SCBox>
        <PersonAdd fontSize="large" color="primary" />
        <Typography color="primary">Sign Up</Typography>
      </SCBox>
      <FormControl fullWidth>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="first-name"
          label="First Name"
          name="first-name"
          autoFocus
          value={form.firstName}
          onChange={handleFirstNameChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="last-name"
          label="Last Name"
          name="last-name"
          value={form.lastName}
          onChange={handleLastNameChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email-address"
          label="Email Address"
          name="email-address"
          value={form.emailAddress}
          onChange={handleEmailAddressChange}
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
          id="username"
          label="Username"
          name="username"
          value={form.username}
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
          value={form.password}
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
        <TextField
          variant="outlined"
          margin="none"
          required
          fullWidth
          name="confirm-password"
          label="Confirm"
          type={showPassword ? "text" : "password"}
          id="confirm-password"
          value={form.confirmPassword}
          onChange={handleConfirmPasswordChange}
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
        <SCButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Sign Up
        </SCButton>
        <Box pt={0.25}>
          <Link component={RouterLink} to="/" variant="body2">
            Login instead
          </Link>
        </Box>
      </FormControl>
    </Container>
  );
}
export default withRouter(SignUpForm);
