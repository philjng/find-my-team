import {
  Box,
  Button,
  Card, CardContent, Chip,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { CardHeader } from "./UserGroups";
import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { createGroup } from "../../actions/groups";
import { useHistory } from "react-router-dom";
import {AddTagButton, ProfileTags} from "../Profile/UserInfo";

const CreateGroupCard = styled(Card)({
  backgroundColor: `#f7fdfc`,
  margin: `2rem`,
  padding: "2rem",
});

const SCContainer = styled(Container)({
  maxWidth: "750px",
});

const ButtonGroup = styled(Box)({
  display: `flex`,
  float: `right`,
  columnGap: `1rem`,
});

const CreateGroupPage = (props) => {
  const { user } = props;
  const history = useHistory();

  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([])

  const addTag = (newTag) => {
    newTag.trim() !== "" && setTags(tags.concat([newTag.trim()]))
    setTag("");
  }

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete))
  }

  const handleSubmit = () => {
    if (groupName.trim() === "") {
      window.alert("Group name is required.");
      return;
    }
    props.createGroup({
      creatorId: user.user_id,
      creator: user.displayName,
      name: groupName,
      description: description.trim() === "" ? "No description." : description,
      tags: tags,
      createdAt: new Date(),
      lastModified: new Date(),
      memberIds: [user.user_id],
      groupSize: 1,
    });
    setDescription("");
    history.push("/groups");
  };

  return (
    <SCContainer>
      <CreateGroupCard>
        <Grid container direction="column" spacing="2">
          <Grid item>
            <CardHeader align="center" variant="h5">
              Create Group
            </CardHeader>
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
                <Typography variant="h6">Tags</Typography>
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
                      onClick={() => {addTag(tag)}}
                    >
                      Add
                    </AddTagButton>
                    <Box>
                      {tags.map((item) => (
                          <ProfileTags label={item} onDelete={() => handleDeleteTag(item)} />
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
                  history.push("/groups");
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

export default connect(mapStateToProps, { createGroup })(CreateGroupPage);
