import {Typography, List, ListItem, Box} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import {connect} from "react-redux";
import {getEventParticipants} from "../../actions/events";
import {useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import CloudinaryAvatar from "../shared-components/CloudinaryAvatar";

const _ = require("lodash");

const Participant = styled(ListItem)({
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#f7fdfc"
  },
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  border: "1px solid grey",
  marginRight: "1rem",
  backgroundColor: "white",
  width: "100px",
  height: "100px",
});

const List1 = styled(List)({
  display: "flex",
  flexWrap: "wrap",
  margin: "0.25rem",
});

function EventParticipants(props) {
  const {getEventParticipants, participants} = props;
  const {id} = useParams();
  const history = useHistory();

  useEffect(() => {
    getEventParticipants(id);
  }, [id, getEventParticipants]);

  const handleClick = (participant) => {
    history.push(`/profile/${participant._id}`)
  }

  return (
    <Box>
      <Typography variant="h5">{"Participants (" + participants.length + ")"}</Typography>
      <List1>
        {_.isEmpty(participants) ? (
          // <CircularProgress color="primary" size={100}/> // once we have LOADING state set up
          <></>
        ) : (
          participants.map((participant) => (
            <Participant key={participant._id} onClick={() => {handleClick(participant)}}>
              <CloudinaryAvatar
                publicId={participant.image}
                size={40}
              />
              <Typography>{participant.displayName}</Typography>
            </Participant>
          ))
        )}
      </List1>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    participants: state.events.eventParticipants,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEventParticipants: (eventId) => dispatch(getEventParticipants(eventId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventParticipants);
