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
  Snackbar,
  Slide,
  Select,
  MenuItem,
  ListItemText,
  Checkbox,
  Input,
  InputLabel,
} from "@material-ui/core";
import {
  AccountCircle,
  Visibility,
  VisibilityOff,
  PersonAdd,
  Email,
} from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { styled } from "@material-ui/styles";
import { useAuth } from "../../context/AuthContext";
import { connect } from "react-redux";
import { signUpAction } from "../../actions/user";
import { TAGS } from "../../tags";

const axios = require("axios");

const SCBox = styled(Box)({
  marginTop: "80px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const SCButton = styled(Button)({
  margin: "16px 0px",
});

function SignUpForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    displayName: "",
    password: "",
    confirmPassword: "",
  });
  const [tags, setTags] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [open, setOpen] = useState(false);

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

  const handleDisplayNameChange = (event) => {
    setForm({
      ...form,
      displayName: event.target.value,
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

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  function SlideTransition(props) {
    return <Slide {...props} direction="down" />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    // verify fields only use whitelist characters (alphanumeric?)
    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setOpen(false);
      setLoading(true);
      let response = await signup(form.emailAddress, form.password);
      await axios.post(`http://localhost:3001/users`, {
        firstName: form.firstName,
        lastName: form.lastName,
        tags: tags,
        emailAddress: form.emailAddress,
        displayName: form.displayName,
        eventsJoined: [],
        eventsCreated: [],
        groups: [],
        _id: response.user.uid,
      });
      history.push("/");
    } catch (error) {
      setError(error.message);
      setOpen(true);
    }
    setLoading(false);
  }

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
            id="displayName"
            label="Display Name"
            name="displayName"
            value={form.displayName}
            onChange={handleDisplayNameChange}
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
          <FormControl margin="normal">
            <InputLabel variant="outlined" id="tags-checkbox-label">
              Interested Sports Tags
            </InputLabel>
            <Select
              variant="outlined"
              labelId="tags-checkbox-label"
              id="tags-checkbox"
              multiple
              label="Interested Sports Tags"
              value={tags}
              onChange={handleTagsChange}
              inputProps={<Input />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={{
                getContentAnchorEl: null,
              }}
            >
              {TAGS.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  <Checkbox checked={tags.indexOf(tag) > -1} />
                  <ListItemText primary={tag} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            margin="normal"
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
            disabled={loading}
          >
            Sign Up
          </SCButton>
          <Box pt={0.25}>
            <Link component={RouterLink} to="/" variant="body2">
              Already have an account? Login instead
            </Link>
          </Box>
        </FormControl>
      </Container>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSignUp: (data) => dispatch(signUpAction(data)),
  };
};

export default connect(null, mapDispatchToProps)(SignUpForm);
