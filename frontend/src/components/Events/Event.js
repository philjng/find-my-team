import { connect } from "react-redux";
import { viewEventDetails } from "../../actions/events";
import { Link } from "react-router-dom";
import { Container, Typography, Button } from "@material-ui/core";
import { styled } from "@material-ui/styles";

export const Typography1 = styled(Typography)({
  padding: "0.25rem",
});

export const Button2 = styled(Button)({
  background: "#d3d3d3",
  margin: "0.5rem",
});

export const SCLink = styled(Link)({
  textDecoration: "none",
});

function Event(props) {
  console.log(props);
  return (
    <Container disableGutters={true} className="event_container">
      <Typography1 variant="h5" className="event_name">
        {props.info.title}
      </Typography1>
      <Typography1 variant="body1" className="event_location">
        Location: {props.info.location}
      </Typography1>
      <Typography1 variant="body2" className="event_date">
        Date: {props.info.startTime}
      </Typography1>
      <Button2 disableElevation size="small" variant="contained">
        <SCLink
          to="/eventdetails"
          onClick={() => props.viewEventDetails(props.info)}
        >
          Details
        </SCLink>
      </Button2>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return { event: state.viewableEvent };
};
export default connect(mapStateToProps, { viewEventDetails })(Event);
