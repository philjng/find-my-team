import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  TextField,
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { CardHeader } from "./UserGroups";
import React, { useState } from "react";
import { connect } from "react-redux";
import { createGroup, updateGroup } from "../../actions/groups";
import { useHistory, useParams } from "react-router-dom";
import { AddTagButton, ProfileTags } from "../Profile/UserInfo";
import { setModalOpen } from "../../actions/modal";
import { PanoramaOutlined } from "@material-ui/icons";

const CreateGroupCard = styled(Card)({
  backgroundColor: `#f7fdfc`,
  margin: `2rem`,
  padding: "2rem",
});

const SCContainer = styled(Container)({
  maxWidth: "750px",
});

const ImageGrid = styled(Grid)({
  maxWidth: "100%",
  height: "300px",
  border: "1px solid rgb(190 194 194)",
  borderRadius: "5px",
  backgroundColor: "#ebfaf7",
});

const SCPanoramaOutlined = styled(PanoramaOutlined)({
  transform: "scale(6)",
});

const ButtonGroup = styled(Box)({
  display: `flex`,
  float: `right`,
  columnGap: `1rem`,
});

const CreateGroupPage = (props) => {
  const { user, isEditMode, createGroup, setModalOpen, updateGroup } = props;
  const history = useHistory();
  const { id } = useParams();

  const [groupName, setGroupName] = useState(
    props.group ? props.group.name : ""
  );
  const [description, setDescription] = useState(
    props.group ? props.group.description : ""
  );
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState(props.group ? props.group.tags : []);

  const [previewSource, setPreviewSource] = useState("");

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
    };
  };

  const addTag = (newTag) => {
    newTag.trim() !== "" && setTags(tags.concat([newTag.trim()]));
    setTag("");
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleSubmit = () => {
    if (groupName.trim() === "") {
      window.alert("Group name is required.");
      return;
    }
    isEditMode
      ? updateGroup(
          id,
          {
            creatorId: user.user_id,
            creator: user.displayName,
            name: groupName,
            description:
              description.trim() === "" ? "No description." : description,
            tags: tags,
            createdAt: props.group.createdAt,
            lastModified: props.group.lastModified,
            memberIds: props.group.memberIds,
            groupSize: props.group.groupSize,
          },
          previewSource
        ).then(() => setModalOpen(false))
      : createGroup(
          {
            creatorId: user.user_id,
            creator: user.displayName,
            name: groupName,
            description:
              description.trim() === "" ? "No description." : description,
            tags: tags,
            createdAt: new Date(),
            lastModified: new Date(),
            memberIds: [user.user_id],
            groupSize: 1,
          },
          previewSource
        ).then(() => history.push("/groups"));
    setDescription("");
  };

  return (
    <SCContainer>
      <CreateGroupCard>
        <Grid container direction="column" spacing="2">
          <Grid item>
            <CardHeader align="center" variant="h5">
              {isEditMode ? "Edit Group" : "Create Group"}
            </CardHeader>
          </Grid>
          <Grid item>
            <ImageGrid container justify="center" alignContent="center">
              <Grid item>
                {previewSource === "" ? (
                  <SCPanoramaOutlined />
                ) : (
                  <Box width="574px" height="300px">
                    <img
                      src={previewSource}
                      alt="Preview"
                      style={{
                        "object-fit": "contain",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </Box>
                )}
              </Grid>
            </ImageGrid>
          </Grid>
          <Grid item>
            <input
              accept="image/*"
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
          <Grid item container direction="column" spacing="2">
            <Grid item>
              <TextField
                variant="outlined"
                label="Group Name"
                value={groupName}
                required
                fullWidth
                onChange={(e) => setGroupName(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                label="Group Description"
                value={description}
                multiline
                fullWidth
                rows={5}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Grid
                container
                direction="column"
                justifyContent="left"
                alignItems="left"
              >
                <Grid item>
                  <TextField
                    onChange={(e) => setTag(e.target.value)}
                    id="outlined-basic"
                    label="Tag"
                    size="small"
                    value={tag}
                  />
                  <AddTagButton
                    variant="contained"
                    onClick={() => {
                      addTag(tag);
                    }}
                  >
                    Add
                  </AddTagButton>
                  <Box>
                    {tags.map((item) => (
                      <ProfileTags
                        label={item}
                        onDelete={() => handleDeleteTag(item)}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <ButtonGroup>
              <Button
                type="submit"
                onClick={handleSubmit}
                color="primary"
                variant="contained"
              >
                Submit
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  isEditMode ? setModalOpen(false) : history.goBack();
                }}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </CreateGroupCard>
    </SCContainer>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateGroup: (id, groupData, base64Image) =>
      dispatch(updateGroup(id, groupData, base64Image)),
    createGroup: (groupData, base64Image) =>
      dispatch(createGroup(groupData, base64Image)),
    setModalOpen: (isOpen) => dispatch(setModalOpen(isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupPage);
