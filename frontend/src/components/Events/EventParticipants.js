import {Typography, List, Box} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import {connect} from "react-redux";
import {getEventParticipants} from "../../actions/events";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import UserSquare from "../Profile/UserSquare";

const _ = require("lodash");

const List1 = styled(List)({
  display: "flex",
  flexWrap: "wrap",
  margin: "0.25rem",
});

function EventParticipants(props) {
  const {getEventParticipants, participants} = props;
  const {id} = useParams();

  useEffect(() => {
    getEventParticipants(id);
  }, [id, getEventParticipants]);

  return (
    <Box>
      <Typography variant="h5">{"Participants (" + participants.length + ")"}</Typography>
      <List1>
        {_.isEmpty(participants) ? (
          <></>
        ) : (
          participants.map((participant) => (
            <UserSquare user={participant } key={participant._id}/>
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
