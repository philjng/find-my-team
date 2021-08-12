import UserInfo from "./UserInfo";
import {
  Box,
  Grid,
} from "@material-ui/core";
import UserGroups from "../Groups/UserGroups";
import { connect } from "react-redux";
import { useEffect } from "react";
import { styled } from "@material-ui/styles";
import { getHomePageData } from "../../actions/user";
import TmpComponent from "./TmpComponent";
import { useAuth } from "../../context/AuthContext";

const fromTop = "60px";

const SCBox = styled(Box)({
  display: "flex",
});

const Box2 = styled(Box)({
  display: "flex",
  margin: fromTop,
});

const Box3 = styled(Box)({
  display: "flex",
  marginTop: fromTop,
  marginLeft: "0px",
});

function Profile(props) {
  const { getHomePageData } = props;
  const { currentUser } = useAuth();

  useEffect(() => {
    getHomePageData(currentUser.uid);
  }, [getHomePageData, currentUser.uid]);

  return (
    <SCBox>
      <UserInfo />
      <Grid>
        <Box3>
          <TmpComponent
            title="Your Joined Events"
            events={props.joinedEvents}
          />
          <TmpComponent
            title="Your Created Events"
            events={props.createdEvents}
          />
        </Box3>
      </Grid>
      <Grid>
        <Box2>
          <UserGroups />
        </Box2>
      </Grid>
    </SCBox>
  );
}

const mapStateToProps = (state) => {
  return {
    createdEvents: state.user.userEvents.created,
    joinedEvents: state.user.userEvents.joined,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHomePageData: (id) => dispatch(getHomePageData(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
