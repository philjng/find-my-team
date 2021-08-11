import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { CardHeader } from "./UserGroups";
import React, { useState } from "react";
import {
  BASKETBALL,
  BIKING,
  FRISBEE,
  RUNNING,
  SOCCER,
  TENNIS,
  VOLLEYBALL,
} from "../../tags";
import { connect } from "react-redux";
import { createGroup } from "../../actions/groups";
import { useHistory } from "react-router-dom";

const leftGridWidth = 75;
const CreateGroupCard = styled(Card)({
  backgroundColor: `#f7fdfc`,
  margin: `2rem`,
  padding: "2rem",
});

const SCContainer = styled(Container)({
  maxWidth: "750px",
});

const LeftGrid = styled(Grid)({
  maxWidth: leftGridWidth + "%",
});

const RightGrid = styled(Grid)({
  maxWidth: 1 - leftGridWidth + "%",
});

const ButtonGroup = styled(Box)({
  display: `flex`,
  float: `right`,
  columnGap: `1rem`,
});

const CreateGroupPage = (props) => {
  const { user } = props;

  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [checkbox, setCheckbox] = useState({
    Basketball: false,
    Biking: false,
    Frisbee: false,
    Running: false,
    Soccer: false,
    Tennis: false,
    Volleyball: false,
  });

  const history = useHistory();

  const handleSubmit = () => {
    if (groupName.trim() === "") {
      window.alert("Group name is required.");
      return;
    }
    const keys = Object.keys(checkbox);
    const filtered = keys.filter((key) => checkbox[key]);
    props.createGroup({
      creatorId: user.user_id,
      creator: user.displayName,
      name: groupName,
      description: description.trim() === "" ? "No description." : description,
      tags: filtered,
      createdAt: new Date(),
      lastModified: new Date(),
      memberIds: [user.user_id],
      groupSize: 1,
    });
    setDescription("");
    history.push("/groups");
  };

  const handleCheckboxChange = (event) => {
    setCheckbox({ ...checkbox, [event.target.name]: event.target.checked });
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
          <Grid item container direction="row" spacing="3">
            <LeftGrid item container direction="column" spacing="2">
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
            </LeftGrid>
            <RightGrid item>
              <FormGroup>
                <Typography>Group tags:</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkbox.Basketball}
                      onChange={handleCheckboxChange}
                      name="Basketball"
                    />
                  }
                  label={BASKETBALL}
                  color="primary"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkbox.Biking}
                      onChange={handleCheckboxChange}
                      name="Biking"
                    />
                  }
                  label={TENNIS}
                  color="primary"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkbox.Frisbee}
                      onChange={handleCheckboxChange}
                      name="Frisbee"
                    />
                  }
                  label={SOCCER}
                  color="primary"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkbox.Running}
                      onChange={handleCheckboxChange}
                      name="Running"
                    />
                  }
                  label={FRISBEE}
                  color="primary"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkbox.Soccer}
                      onChange={handleCheckboxChange}
                      name="Soccer"
                    />
                  }
                  label={VOLLEYBALL}
                  color="primary"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkbox.Tennis}
                      onChange={handleCheckboxChange}
                      name="Tennis"
                    />
                  }
                  label={BIKING}
                  color="primary"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkbox.Volleyball}
                      onChange={handleCheckboxChange}
                      name="Volleyball"
                    />
                  }
                  label={RUNNING}
                  color="primary"
                />
              </FormGroup>
            </RightGrid>
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
