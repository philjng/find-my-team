import UserInfo from "./UserInfo";
import {
  Box,
  Grid,
} from "@material-ui/core";
import UserGroups from "../Groups/UserGroups";
import { connect } from "react-redux";
import { useEffect } from "react";
import { styled } from "@material-ui/styles";
import TmpComponent from "./TmpComponent";
import { getUserProfilePageData } from "../../actions/profile";
import { useParams } from "react-router-dom";

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
  const { user, userGroups, getUserProfilePageData } = props;
  const { id } = useParams();

  useEffect(() => {
    getUserProfilePageData(id);
  }, [getUserProfilePageData, id]);

  return (
    <SCBox>
      <UserInfo />
      <Grid>
        <Box3>
          <TmpComponent
            title={`${user.displayName}'s Joined Events`}
            events={props.joinedEvents}
          />
          <TmpComponent
            title={`${user.displayName}'s Created Events`}
            events={props.createdEvents}
          />
        </Box3>
      </Grid>
      <Grid>
        <Box2>
          <UserGroups
            title={`${user.displayName}'s Groups`}
            userGroups={userGroups}
          />
        </Box2>
      </Grid>
    </SCBox>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.profile,
    createdEvents: state.profile.userEvents.created,
    joinedEvents: state.profile.userEvents.joined,
    userGroups: state.profile.userGroups,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProfilePageData: (id) => dispatch(getUserProfilePageData(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
