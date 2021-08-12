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
import { useHistory, useParams } from "react-router-dom";
import { createEvent, updateEvent } from "../../actions/events";
import { getCreatedGroups, getJoinedGroups } from "../../actions/user";
import { AddTagButton, ProfileTags } from "../Profile/UserInfo";
import { setModalOpen } from "../../actions/modal";

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
  const {
    user,
    createEvent,
    getCreatedGroups,
    getJoinedGroups,
    isEditMode,
    setModalOpen,
    updateEvent,
    event,
  } = props;
  const [eventTitle, setEventTitle] = useState(event ? event.title : "");
  const [eventLocation, setEventLocation] = useState(
    event ? event.location : ""
  );
  const [eventDescription, setEventDescription] = useState(
    event ? event.description : ""
  );
  const [eventStart, setEventStart] = useState(
    event ? event.startTime.split(".")[0] : ""
  );
  const [eventEnd, setEventEnd] = useState(
    event ? event.endTime.split(".")[0] : ""
  );
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState(event ? event.tags : []);
  const [eventGroup, setEventGroup] = useState(event ? event.group : "");
  const [isCoordinate, setIsCoordinate] = useState(
    event ? event.useCoordinates : false
  );
  const [eventLatitude, setEventLatitude] = useState(
    event ? event.latitude : 0
  );
  const [eventLongitude, setEventLongitude] = useState(
    event ? event.longitude : 0
  );
  const [viewCoordinates, setViewCoordinates] = useState(false);

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getCreatedGroups(user.user_id);
    getJoinedGroups(user.user_id);
  }, [getCreatedGroups, getJoinedGroups, user.user_id]);

  const addTag = (newTag) => {
    newTag.trim() !== "" && setTags(tags.concat([newTag.trim()]));
    setTag("");
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

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

    if (isNaN(eventLatitude) || isNaN(parseFloat(eventLatitude)) || eventLatitude > 90 || eventLatitude < -90) {
      window.alert("Invalid coordinates. Latitude must be between -90 and 90 and longitude must be between -180 and 180");
      return;
    }

    if (isNaN(eventLongitude) || isNaN(parseFloat(eventLongitude)) || eventLongitude > 180 || eventLongitude < -180) {
      window.alert("Invalid coordinates. Latitude must be between -90 and 90 and longitude must be between -180 and 180");
      return;
    }

    isEditMode
      ? updateEvent(id, {
          creatorId: user.user_id,
          creator: user.displayName,
          title: eventTitle,
          location: eventLocation.trim() === "" ? "No location" : eventLocation,
          latitude: eventLatitude,
          longitude: eventLongitude,
          useCoordinates: isCoordinate,
          description:
            eventDescription.trim() === ""
              ? "No description"
              : eventDescription,
          startTime: new Date(eventStart),
          endTime: new Date(eventEnd),
          participantSize: event.participantSize,
          participantIds: event.participantIds,
          group: eventGroup,
          tags: tags,
          status: "status",
          createdAt: event.createdAt,
          lastModified: event.lastModified,
          comments: event.comments,
        }).then(() => setModalOpen(false))
      : createEvent({
          creatorId: user.user_id,
          creator: user.displayName,
          title: eventTitle,
          location: eventLocation.trim() === "" ? "No location" : eventLocation,
          latitude: eventLatitude,
          longitude: eventLongitude,
          useCoordinates: isCoordinate,
          description:
            eventDescription.trim() === ""
              ? "No description"
              : eventDescription,
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
        }).then(() => {
          history.push("/events");
        });
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
  };

  return (
    <CreateEventCard>
      <Grid container direction="column" spacing="2">
        <Grid item>
          <CardHeader align="center" variant="h5">
            {isEditMode ? "Edit Event" : "Create Event"}
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
              </SCGrid>
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
                isEditMode ? setModalOpen(false) : history.goBack();
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
    setModalOpen: (isOpen) => dispatch(setModalOpen(isOpen)),
    updateEvent: (id, eventData) => dispatch(updateEvent(id, eventData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
