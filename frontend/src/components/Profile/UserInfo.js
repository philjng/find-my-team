import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import {
  Card,
  CardContent,
  FormControl,
  TextField,
  Fab,
  Grid,
  Box,
  Typography,
  Button,
  Chip,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useEffect, useState } from "react";
import { styled } from "@material-ui/styles";
import { useParams } from "react-router";
import { Check } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { editUserProfile, getUserProfile } from "../../actions/profile";
import { useAuth } from "../../context/AuthContext";
import CloudinaryAvatar from "../shared-components/CloudinaryAvatar";

const useStyles = makeStyles((theme) => ({
  profile: {
    "margin-top": "50px",
    "margin-left": "50px",
    display: "inline-block",
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

export const ProfileTags = styled(Chip)({
  marginRight: "0.5rem",
  marginTop: "1rem",
  backgroundColor: "#339999",
  color: "white"
});

export const AddTagButton = styled(Button)({
  marginTop: "0.5rem",
  marginLeft: "0.5rem",
});

const SCCard = styled(Card)({
  width: 500,
});

const SCEditIcon = styled(EditIcon)({
  marginRight: 8,
});

const SCBox = styled(Box)({
  margin: "60px",
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
});

const SCAvatar = styled(Avatar)({
  height: "100px",
  width: "100px",
});

const SCText = styled(Typography)({
  marginRight: "10px",
  marginTop: "10px",
});

const AVATAR_SIZE = 300;

function UserInfo(props) {
  const classes = useStyles();

  const [initialForm, setInitialForm] = useState({});
  const [form, setForm] = useState({ tags: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [previewSource, setPreviewSource] = useState("");
  const [imageEdited, setImageEdited] = useState(false);
  const { getUserProfile, editUserProfile, user } = props;
  const { currentUser } = useAuth();
  const { id } = useParams();
  const isOwner = currentUser.uid === id;


  const handleFormChange = (property) => (event) => {
    setForm({
      ...form,
      [property]: event.target.value,
    });
  };

  const addTag = (newTag) => {
    const newTags = form.tags.concat(newTag);
    setForm({
      ...form,
      tags: newTags,
    });
  };

  const handleFirstNameChange = handleFormChange("firstName");
  const handleLastNameChange = handleFormChange("lastName");
  const handleDisplayNameChange = handleFormChange("displayName");
  const handleTagsInputTextChange = handleFormChange("tagsInputText");

  const handleDeleteTag = (tag) => {
    const newTags = form.tags.filter((item) => item !== tag);
    setForm({
      ...form,
      tags: newTags,
    });
  };

  const handleEnableEdit = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    if (imageEdited) {
      editUserProfile(id, form, previewSource);
    } else {
      editUserProfile(id, form, null);
    }
    setIsEditing(false);
    setPreviewSource("");
    setImageEdited(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setForm(initialForm);
  };

  useEffect(() => {
    getUserProfile(id);
  }, [getUserProfile, id]);

  useEffect(() => {
    setForm(user);
    setInitialForm(user);
  }, [user]);

  const handleImageInput = (event) => {
    var file = event.target.files[0];
    // Check file is image
    // Also prevents error when cancelling image upload
    if (file?.type.match("image.*")) {
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setImageEdited(true);
    };
  };

  return (
    <SCBox>
      <SCCard>
        <CardContent>
          {isOwner && (
            <Grid container direction="row-reverse">
              <Grid item>
                <Fab
                  disabled={isEditing}
                  variant="extended"
                  onClick={handleEnableEdit}
                >
                  <SCEditIcon />
                  Edit
                </Fab>
              </Grid>
            </Grid>
          )}
          <Grid container align="center" direction="column">
            <Grid item>
              {imageEdited ? (
                isEditing ? (
                  <SCAvatar src={previewSource} />
                ) : (
                  <CloudinaryAvatar publicId={user.image} size={AVATAR_SIZE} />
                )
              ) : (
                <CloudinaryAvatar publicId={user.image} size={AVATAR_SIZE} />
              )}
            </Grid>
            <Grid item>
              <Typography>{form.emailAddress}</Typography>
            </Grid>
            {isEditing && (
              <Grid item>
                <input
                  accept="image/*"
                  className={classes.input}
                  style={{ display: "none" }}
                  id="upload-button"
                  multiple
                  type="file"
                  onChange={handleImageInput}
                />
                <label htmlFor="upload-button">
                  <Button variant="outlined" component="span">
                    Upload
                  </Button>
                </label>
              </Grid>
            )}
          </Grid>
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
          </FormControl>
          <SCText variant="h6">Interested Sports Tags</SCText>
          {isEditing && (
            <Grid
              container
              direction="column"
              justifyContent="left"
              alignItems="left"
            >
              <Grid item>
                <TextField
                  onChange={handleTagsInputTextChange}
                  id="outlined-basic"
                  label="Tag"
                  size="small"
                  value={form.tagsInputText}
                />
                <AddTagButton
                  variant="contained"
                  onClick={() => addTag(form.tagsInputText)}
                >
                  Add
                </AddTagButton>
              </Grid>
            </Grid>
          )}
          <Box>
            {form.tags.map((item) => {
              return isEditing ? (
                <ProfileTags onDelete={() => handleDeleteTag(item)} label={item} />
              ) : (
                <ProfileTags
                  onDelete={() => handleDeleteTag(item)}
                  disabled
                  label={item}
                />
              );
            })}
          </Box>
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
        </CardContent>
      </SCCard>
    </SCBox>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProfile: (id) => dispatch(getUserProfile(id)),
    editUserProfile: (id, data, base64Image) =>
      dispatch(editUserProfile(id, data, base64Image)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
