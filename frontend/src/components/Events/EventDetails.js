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
  CircularProgress, Card, CardContent, Select, MenuItem, FormControl, InputLabel,
} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import {participantJoin, participantLeave, getEvent} from "../../actions/events.js";
import "firebase/auth";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import React from "react";
import EditModal, {ButtonMR} from "../shared-components/EditModal";
import {setModalOpen} from "../../actions/modal";

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

function EventDetails(props) {
  const {event, getEvent, participantJoin, participantLeave, user, setModalOpen} = props;
  const {id} = useParams();

  const isCreator = event.creatorId === user.user_id;
  const [isParticipant, setIsParticipant] = useState(false);

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

  return _.isEmpty(event) ? (
    <CircularProgress/>
  ) : (
    <Container>
      <EditModal isEvent={true}/>
      <EventCard>
        <CardContent>
          <Typography variant="h4">{event.title}</Typography>
          <Typography component={"span"}>
            <Box fontWeight="fontWeightLight">
              {"Created by " + (isCreator ? "You" : event.creator)}
            </Box>
          </Typography>
          <Buttons>
            {isCreator && (
              <ButtonMR
                disableElevation
                size="small"
                variant="contained"
                onClick={() => {setModalOpen(true)}}
              >
                Edit Event
              </ButtonMR>
            )}
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
            <DisplayMap
              location={event.location}
              latitude={event.latitude}
              longitude={event.longitude}
              useCoordinates={event.useCoordinates}
            />
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
    setModalOpen: (isOpen) => dispatch(setModalOpen(isOpen))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
