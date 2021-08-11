import {
  Card,
  TextField,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  Checkbox,
  Grid,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import { CardHeader } from "../Groups/UserGroups";
import "firebase/auth";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { createEvent } from "../../actions/events";
import {
  getCreatedGroups,
  getJoinedGroups,
} from "../../actions/user";
import { useAuth } from "../../context/AuthContext";

const leftGridWidth = 50;

const CreateEventCard = styled(Card)({
  backgroundColor: `#f7fdfc`,
  margin: `2rem auto`,
  padding: "2rem",
  maxWidth: "750px",
});

const FormGrid = styled(Grid)({});

const ButtonBox = styled(Box)({
  display: "flex",
  float: "right",
  columnGap: "1rem",
});

const Dropdown = styled(Select)({});

const SCGrid = styled(Grid)({
  flexGrow: "1",
});

const LeftGrid = styled(Grid)({
  maxWidth: leftGridWidth + "%",
});

const RightGrid = styled(Grid)({
  maxWidth: 100 - leftGridWidth + "%",
});

function Create(props) {
  const { user, createEvent, getCreatedGroups, getJoinedGroups } = props;
  const [eventTitle, setEventTitle] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventStart, setEventStart] = useState("");
  const [eventEnd, setEventEnd] = useState("");
  const [tagText, setTagText] = useState("");
  const [tags, setTags] = useState([]);
  const [eventGroup, setEventGroup] = useState("");
  const [isCoordinate, setIsCoordinate] = useState(false);
  const [eventLatitude, setEventLatitude] = useState(0);
  const [eventLongitude, setEventLongitude] = useState(0);
  const [viewCoordinates, setViewCoordinates] = useState(false);

  const history = useHistory();
  const { currentUser } = useAuth();

  useEffect(() => {
    getCreatedGroups(currentUser.uid);
    getJoinedGroups(currentUser.uid);
  }, [getCreatedGroups, getJoinedGroups, currentUser]);

  const addTag = () => {
    let tags_cpy = [...tags];
    tags_cpy.push(tagText);
    setTags(tags_cpy);
    setTagText("");
  };

  //TODO: Add validation for fields and fix refresh bug
  const handleSubmit = () => {
    if (eventTitle.trim() === "") {
      window.alert("Event name is required");
      return;
    }

    if (eventStart.trim() === "") {
      window.alert("Event start time is required");
      return;
    }

    if (eventEnd.trim() === "") {
      window.alert("Event end time is required");
      return;
    }

    if (eventGroup.trim() === "") {
      window.alert("Event must belong to a group or be public");
      return;
    }
    createEvent({
      creatorId: user.user_id,
      creator: user.displayName,
      title: eventTitle,
      location: eventLocation.trim() === "" ? "No location" : eventLocation,
      latitude: eventLatitude,
      longitude: eventLongitude,
      useCoordinates: isCoordinate,
      description:
        eventDescription.trim() === "" ? "No description" : eventDescription,
      startTime: new Date(eventStart),
      endTime: new Date(eventEnd),
      participantSize: 1,
      participantIds: [user.user_id],
      group: eventGroup,
      tags: tags,
      status: "status",
      createdAt: new Date(),
      lastModified: new Date(),
      comments: [],
    })
      .then((result) => {
        setEventTitle("");
        setEventLocation("");
        setEventDescription("");
        setEventStart("");
        setEventEnd("");
        setTags([]);
        setEventGroup("");
        setIsCoordinate(false);
        setEventLatitude(0);
        setEventLongitude(0);
        history.push("/events");
      })
      .catch((err) => console.log(err));
  };

  return (
    <CreateEventCard>
      <Grid container direction="column" spacing="2">
        <Grid item>
          <CardHeader align="center" variant="h5">
            Create Event
          </CardHeader>
        </Grid>
        <FormGrid item container direction="row" spacing="3">
          <LeftGrid container item direction="column" spacing="2">
            <Grid item>
              <TextField
                variant="outlined"
                size="small"
                label="Event Title"
                fullWidth
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
            </Grid>
            {viewCoordinates ? (
              <>
                <Grid item>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Latitude"
                    fullWidth
                    value={eventLatitude}
                    onChange={(e) => setEventLatitude(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Longitude"
                    fullWidth
                    value={eventLongitude}
                    onChange={(e) => setEventLongitude(e.target.value)}
                  />
                  <Typography display="inline">Use Coordinates</Typography>
                  <Checkbox
                    value={isCoordinate}
                    onClick={(e) => setIsCoordinate(!isCoordinate)}
                  />
                  <Button onClick={(e) => setViewCoordinates(!viewCoordinates)}>
                    Set Location
                  </Button>
                </Grid>
              </>
            ) : (
              <Grid item>
                <TextField
                  variant="outlined"
                  size="small"
                  label="Location"
                  fullWidth
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                />
                <Button onClick={(e) => setViewCoordinates(!viewCoordinates)}>
                  Set Coordinates
                </Button>
              </Grid>
            )}
            <Grid item>
              <TextField
                variant="outlined"
                multiline
                label="Description"
                fullWidth
                rows={3}
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              />
            </Grid>
          </LeftGrid>
          <RightGrid container item direction="column" spacing="2">
            <Grid item>
              <TextField
                type="datetime-local"
                variant="outlined"
                size="small"
                label="Start Time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={eventStart}
                onChange={(e) => setEventStart(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                type="datetime-local"
                variant="outlined"
                size="small"
                label="End Time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={eventEnd}
                onChange={(e) => setEventEnd(e.target.value)}
              />
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel id="group-dropdown">Group</InputLabel>
                <Dropdown
                  id="group-dropdown"
                  fullWidth
                  label="Group"
                  value={eventGroup}
                  onChange={(e) => setEventGroup(e.target.value)}
                >
                  <MenuItem value={"000000000000000000000000"}>Public</MenuItem>
                  {user.userGroups.created.map((group) => (
                    <MenuItem value={group._id}>{group.name}</MenuItem>
                  ))}
                  {user.userGroups.joined.map((group) => (
                    <MenuItem value={group._id}>{group.name}</MenuItem>
                  ))}
                </Dropdown>
              </FormControl>
            </Grid>
            <Grid item container direction="row" spacing="2">
              <SCGrid item>
                <TextField
                  variant="outlined"
                  size="small"
                  label="Tags"
                  fullWidth
                  value={tagText}
                  onChange={(e) => setTagText(e.target.value)}
                />
              </SCGrid>
              <Grid item>
                <Button variant="contained" onClick={addTag}>
                  Add
                </Button>
              </Grid>
            </Grid>
          </RightGrid>
        </FormGrid>
        <Grid item>
          <ButtonBox>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                history.goBack();
              }}
            >
              Cancel
            </Button>
          </ButtonBox>
        </Grid>
      </Grid>
    </CreateEventCard>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createEvent: (eventData) => dispatch(createEvent(eventData)),
    getCreatedGroups: (id) => dispatch(getCreatedGroups(id)),
    getJoinedGroups: (id) => dispatch(getJoinedGroups(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
