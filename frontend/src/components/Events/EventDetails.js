import {connect} from "react-redux";
import TagChips from "./TagChips.js";
import EventDescription from "./EventDescription.js";
import EventParticipants from "./EventParticipants.js";
import EventComments from "./EventComments";
import DisplayMap from "./DisplayMap";
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress, Card, CardContent, Select, MenuItem, FormControl, InputLabel,
} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import {participantJoin, participantLeave, deleteEvent, getEvent} from "../../actions/events.js";
import "firebase/auth";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import React from "react";

const _ = require("lodash");

const EventCard = styled(Card)({
  backgroundColor: "#f7fcfc",
  margin: `2rem 0`,
});

const DateBox = styled(Box)({
  marginBottom: `0.5rem`,
});

const EventItems = styled(Box)({
  "& > *": {
    marginBottom: "1rem"
  }
});

const Buttons = styled(Box)({
  float: "right",
  marginLeft: "0.5rem",
  display: "flex"
})

const Button1 = styled(Button)({
  marginRight: "1rem"
});

function EventDetails(props) {
  const {event, getEvent, participantJoin, participantLeave, deleteEvent, user} = props;
  const {id} = useParams();
  const history = useHistory();

  const isCreator = event.creatorId === user.user_id;
  const [isParticipant, setIsParticipant] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const date = new Date(event.startTime).toUTCString();

  useEffect(() => {
    getEvent(id)
  }, [getEvent, id]);

  useEffect(() => {
    !_.isEmpty(event) && setIsParticipant(event.participantIds.includes(user.user_id))
  }, [event, user.user_id])

  const addParticipant = () => {
    participantJoin(id, user.user_id)
      .then(() => {
        setIsParticipant(true)
      })
  };

  const removeParticipant = () => {
    participantLeave(id, user.user_id)
      .then(() => {
        setIsParticipant(false)
      })
  }

  const handleChange = (e) => {
    const willParticipate = e.target.value;
    if (e.target.value !== isParticipant) {
      willParticipate ? addParticipant() : removeParticipant()
    }
  }

  const removeEvent = () => {
    window.confirm(
      "Are you sure you want to delete this event? This action cannot be undone."
    ) && deleteEvent(id)
    && history.push("/events")
  }

  //TODO: Make displayNames appear
  //TODO: Add ternary operator to display "No location set" when there is no location
  return _.isEmpty(event) ? (
    <CircularProgress/>
  ) : (
    <Container>
      <EventCard>
        <CardContent>
          <Typography variant="h4">{event.title}</Typography>
          <Typography component={"span"}>
            <Box fontWeight="fontWeightLight">
              {"Created by " + (isCreator ? "You" : event.creator)}
            </Box>
          </Typography>
          <Buttons>
            {isCreator && !isEditing && (
              <Button1
                disableElevation
                size="small"
                variant="contained"
                onClick={() => setIsEditing(true)}
              >
                Edit Event
              </Button1>
            )}
            {isEditing && (
              <Box>
                <Button1
                  disableElevation
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => removeEvent()}
                >
                  Delete event
                </Button1>
                <Button1
                  disableElevation
                  size="small"
                  variant="contained"
                  color="primary"
                >
                  Update
                </Button1>
                <Button1
                  disableElevation
                  size="small"
                  variant="contained"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button1>
              </Box>)}
            <FormControl variant="outlined" style={{minWidth: 120}} color="primary">
              <InputLabel id="outlined-participation-label">Attendance</InputLabel>
              <Select
                labelId="participation-label"
                id="participation"
                value={isParticipant}
                onChange={handleChange}
                label="participation"
              >
                <MenuItem value={true}>Going</MenuItem>
                <MenuItem value={false}> Not Going</MenuItem>
              </Select>
            </FormControl>
          </Buttons>
          <Typography component={'span'}>
            <Box fontWeight="fontWeightMedium">{event.location}</Box>
            <DateBox fontWeight="fontWeightMedium>">{date}</DateBox>
          </Typography>
          <EventItems>
            <TagChips tags={event.tags}/>
            <EventDescription description={event.description}/>
            <EventParticipants/>
            <EventComments eventId={id} comments={event.comments}/>
            {event.location !== "" && (<DisplayMap
              location={event.location}
              latitude={event.latitude}
              longitude={event.longitude}
              useCoordinates={event.useCoordinates}
            />)}
          </EventItems>
        </CardContent>
      </EventCard>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    event: state.events.event,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEvent: (id) => dispatch(getEvent(id)),
    participantJoin: (eventId, userId) => participantJoin(dispatch, eventId, userId),
    participantLeave: (eventId, userId) => participantLeave(dispatch, eventId, userId),
    deleteEvent: (eventId) => deleteEvent(dispatch, eventId)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
