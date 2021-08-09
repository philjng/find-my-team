import UserInfo from "./UserInfo";
import {
  Container,
  Card,
  Box,
  CardContent,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import UserGroups from "../Groups/UserGroups";
import { connect } from "react-redux";
import { useEffect } from "react";
import { styled } from "@material-ui/styles";
import Event from "../Events/Event";
import { getEvents } from "../../actions/events";

const SCBox = styled(Box)({
  display: "flex",
});

const Box2 = styled(Box)({
  display: "flex",
  margin: "64px",
});

const Box3 = styled(Box)({
  display: "flex",
  margin: "80px",
});

function Profile(props) {
  const { getEvents } = props;

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return (
    <SCBox>
      <UserInfo />
      <Box3>
        <Card>
          <CardContent>
            <Typography variant="h6">Your Events</Typography>
            <List>
              {props.events.map((event) => (
                <ListItem key={JSON.stringify(event)}>
                  <Container>
                    <Event info={event} />
                  </Container>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box3>
      <Box2>
        <UserGroups />
      </Box2>
    </SCBox>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
