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
import { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { styled } from "@material-ui/styles";
import { useAuth } from "../../context/AuthContext";
import { connect } from "react-redux";
import { signUpAction } from "../../actions/user";
import { TAGS } from "../../tags";
import { showSnackbar } from "../../actions/snackbar";
import { ERROR, SUCCESS } from "../Snackbar/SnackbarSeverityConstants";

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
    displayName: "",
    password: "",
    confirmPassword: "",
  });
  const [tags, setTags] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { handleSignUp, showSnackbar } = props;

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

  async function handleSubmit(event) {
    event.preventDefault();
    // verify fields only use whitelist characters (alphanumeric?)
    if (form.password !== form.confirmPassword) {
      showSnackbar(ERROR, "Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      let response = await signup(form.emailAddress, form.password);
      handleSignUp(response.user.uid, form);
      history.push("/");
      showSnackbar(SUCCESS, "Account successfully created.");
    } catch (error) {
      showSnackbar(ERROR, error.message);
    }
    setLoading(false);
  }

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
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSignUp: (id, data) => dispatch(signUpAction(id, data)),
    showSnackbar: (severity, message) =>
      dispatch(showSnackbar(severity, message)),
  };
};

export default connect(null, mapDispatchToProps)(SignUpForm);
