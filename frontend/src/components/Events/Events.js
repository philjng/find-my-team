import EventsContainer from "./EventsContainer.js";
import { Container } from "@material-ui/core";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getEvents } from "../../actions/events";
import { styled } from "@material-ui/styles";

const SCContainer = styled(Container)({
  marginTop: "2rem",
});
function Events(props) {
  const { getEvents } = props;

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return (
    <SCContainer>
      <EventsContainer events={props.events} />
    </SCContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    events: state.events.events,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEvents: () => getEvents(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
