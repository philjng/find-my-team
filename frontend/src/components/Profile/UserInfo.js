import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import {
  Card,
  CardContent,
  FormControl,
  TextField,
  Fab,
  Grid,
  MenuItem,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
  Box,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useEffect, useState } from "react";
import { styled } from "@material-ui/styles";
import { useParams } from "react-router";
import { Check, Input } from "@material-ui/icons";
import { TAGS } from "../../tags";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { editUserProfile, getUser } from "../../actions/user";
import SportsList from "./SportsList";
import { useAuth } from "../../context/AuthContext";

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

const SCCard = styled(Card)({
  width: 500,
});

const SCEditIcon = styled(EditIcon)({
  marginRight: 8,
});

const SCBox = styled(Box)({
  marginTop: "80px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

function UserInfo(props) {
  const classes = useStyles();

  const [initialForm, setInitialForm] = useState({});
  const [form, setForm] = useState({ tags: [] });
  const [isEditing, setIsEditing] = useState(false);
  const { getUser, editUserProfile, user } = props;
  const { currentUser } = useAuth();
  const { id } = useParams();
  const isOwner = currentUser.uid === id

  const handleFormChange = (property) => (event) => {
    setForm({
      ...form,
      [property]: event.target.value,
    });
  };
  const handleFirstNameChange = handleFormChange("firstName");
  const handleLastNameChange = handleFormChange("lastName");
  const handleDisplayNameChange = handleFormChange("displayName");
  const handleTagsChange = handleFormChange("tags");
  

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    editUserProfile(id, form);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    getUser(id);
  }, [getUser, id]);

  useEffect(() => {
    setForm(user);
    setInitialForm(user);
  }, [user]);

  return (
    <SCBox>
      <SCCard>
        <CardContent>
          <Grid container align="center" direction="column">
            <Grid item>
              <Avatar alt="Profile Picture" className={classes.profile_pic} />
            </Grid>
            <Grid item>
              <Typography>{form.emailAddress}</Typography>
            </Grid>
          </Grid>
          {isOwner && <Grid container direction="row-reverse">
            <Grid item>
              <Fab disabled={isEditing} variant="extended" onClick={handleEdit}>
                <SCEditIcon />
                Edit
              </Fab>
            </Grid>
          </Grid>}
          <FormControl fullWidth>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoFocus
              value={isEditing ? form.firstName : initialForm.firstName || ""}
              onChange={handleFirstNameChange}
              disabled={!isEditing}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoFocus
              value={isEditing ? form.lastName : initialForm.lastName || ""}
              onChange={handleLastNameChange}
              disabled={!isEditing}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="displayName"
              label="Display Name"
              name="displayName"
              autoFocus
              value={
                isEditing ? form.displayName : initialForm.displayName || ""
              }
              onChange={handleDisplayNameChange}
              disabled={!isEditing}
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
                disabled={!isEditing}
                label="Interested Sports Tags"
                value={isEditing ? form.tags : initialForm.tags || []}
                onChange={handleTagsChange}
                inputProps={<Input />}
                renderValue={(selected) =>
                  TAGS.filter((tag) => selected.includes(tag)).join(", ")
                }
                MenuProps={{
                  getContentAnchorEl: null,
                }}
              >
                {TAGS.map((tag) => (
                  <MenuItem key={tag} value={tag}>
                    <Checkbox checked={(form?.tags?.indexOf(tag) || 0) > -1} />
                    <ListItemText primary={tag} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {isEditing && (
              <Grid container direction="row-reverse" spacing={2}>
                <Grid item>
                  <Fab onClick={handleCancel}>
                    <CloseIcon />
                  </Fab>
                </Grid>
                <Grid item>
                  <Fab onClick={handleSaveChanges}>
                    <Check />
                  </Fab>
                </Grid>
              </Grid>
            )}
          </FormControl>
        </CardContent>
      </SCCard>
      <SportsList />
    </SCBox>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => dispatch(getUser(id)),
    editUserProfile: (id, data) => dispatch(editUserProfile(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
