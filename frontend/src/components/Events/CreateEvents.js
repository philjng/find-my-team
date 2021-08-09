import {
  Card,
  CardContent,
  TextField,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  Checkbox,
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import React, { useState } from "react";
import { CardHeader } from "../Groups/UserGroups";
import "firebase/auth";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { genericApi } from "../../api/genericApi";
import {createEvent} from "../../actions/events";

const CreateEventCard = styled(Card)({
  backgroundColor: `#f7fdfc`,
  margin: `2rem auto`,
  width: `75%`,
});

const Input = styled(TextField)({
  marginBottom: `1rem`,
  width: "75%"
});

const Input2 = styled(TextField)({
  width: `40%`,
  margin: `1rem`,
  marginBottom: `1rem`,
});

const Form = styled(Box)({
  display: `flex`,
  justifyContent: `space-around`,
});

const ButtonBox = styled(Box)({
  margin: "auto",
});

const AddButton = styled(Button)({
  marginTop: "0.4rem",
  marginLeft: "1rem",
});

const Button1 = styled(Button)({
  marginTop: "1.5rem",
  float: "right"
});

const SubmitButton = styled(Button)({
  marginRight: `0.5rem`,
});

const Dropdown = styled(Select)({
  width: "80%",
});

const Typography1 = styled(Typography)({
  marginLeft: "1rem"
})

const CoordinateCard = styled(Card)({
  width: "80%",
})

const InputBox = styled(Box)({
  width: "80%",
  marginBottom: "1rem"

})

function Create(props) {
  const { user, createEvent } = props;
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
      description: eventDescription.trim() === "" ? "No description" : eventDescription,
      startTime: new Date(eventStart),
      endTime: new Date(eventEnd),
      participantSize: 1,
      participantIds: [user.user_id],
      group: eventGroup,
      tags: tags,
      status: "status",
      createdAt: new Date(),
      lastModified: new Date(),
      comments: []
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
      <CardContent>
        <CardHeader align="center" variant="h5">
          Create Event
        </CardHeader>
        <Form>
          <InputBox>
            <InputBox>
              <Typography>Event Title</Typography>
              <Input
                variant="filled"
                size="small"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
            </InputBox>
            {viewCoordinates ? (
              <CoordinateCard>
              <InputBox>
                <Typography>Coordinates</Typography>
                <Input2
                  variant="filled"
                  size="small"
                  value={eventLatitude}
                  onChange={(e) => setEventLatitude(e.target.value)}
                />
                <Input2
                  variant="filled"
                  size="small"
                  value={eventLongitude}
                  onChange={(e) => setEventLongitude(e.target.value)}
                />
                <InputBox>
                  <Typography1 display="inline">Use Coordinates</Typography1>
                <Checkbox
                  value={isCoordinate}
                  onClick={(e) => setIsCoordinate(!isCoordinate)}
                />
                <Button1
                  onClick={(e) => setViewCoordinates(!viewCoordinates)}
                >Set Location</Button1>
                </InputBox>
              </InputBox>
              </CoordinateCard>
            ) : (
              <InputBox>
                <Typography>Location</Typography>
                <Input
                  variant="filled"
                  size="small"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                />
               <Button
                  onClick={(e) => setViewCoordinates(!viewCoordinates)}
                >Set Coordinates</Button>
              </InputBox>
            )}
            <InputBox>
              <Typography>Description</Typography>
              <Input
                variant="filled"
                multiline
                rows={3}
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              />
            </InputBox>
          </InputBox>
          <InputBox>
            <InputBox>
              <Typography>Start Time</Typography>
              <Input
                type="datetime-local"
                variant="filled"
                size="small"
                value={eventStart}
                onChange={(e) => setEventStart(e.target.value)}
              />
            </InputBox>
            <InputBox>
              <Typography>End Time</Typography>
              <Input
                type="datetime-local"
                variant="filled"
                size="small"
                value={eventEnd}
                onChange={(e) => setEventEnd(e.target.value)}
              />
            </InputBox>
            <InputBox>
              <Typography>Group</Typography>
              <Dropdown
                value={eventGroup}
                onChange={(e) => setEventGroup(e.target.value)}
              >
                <MenuItem value={"000000000000000000000000"}>Public</MenuItem>
                {props.user.userGroups.created.map((group) => (
                  <MenuItem value={group._id}>{group.name}</MenuItem>
                ))}
                {props.user.userGroups.joined.map((group) => (
                  <MenuItem value={group._id}>{group.name}</MenuItem>
                ))}
              </Dropdown>
            </InputBox>
            <InputBox>
              <Typography>Tags</Typography>
              <Input
                variant="filled"
                size="small"
                value={tagText}
                onChange={(e) => setTagText(e.target.value)}
              />
              <AddButton variant="contained" onClick={addTag}>
                Add
              </AddButton>
            </InputBox>
            <ButtonBox>
              <SubmitButton
                type="submit"
                color="primary"
                variant="contained"
                onClick={handleSubmit}
              >
                Submit
              </SubmitButton>
              <Button
                variant="contained"
                onClick={() => {
                  history.goBack();
                }}
              >
                Cancel
              </Button>
            </ButtonBox>
          </InputBox>
        </Form>
      </CardContent>
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
    createEvent: (eventData) => dispatch(createEvent(eventData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
