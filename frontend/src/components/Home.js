import { Container, Typography, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { styled } from "@material-ui/styles";
import UserEvents from "./Events/UserEvents";
import UserGroups from "./Groups/UserGroups";
import { getHomePageData } from "../actions/user";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const HomePageContainer = styled(Container)({
  marginBottom: "3rem",
});

const WelcomeText = styled(Typography)({
  padding: "1rem",
  textAlign: "center",
});

const UserEventsGrid = styled(Grid)({
  flexGrow: "1",
});

const UserGroupsGrid = styled(Grid)({});

function Home(props) {
  const { user, userGroups, getHomePageData } = props;
  const { currentUser } = useAuth();

  useEffect(() => {
    getHomePageData(currentUser.uid);
  }, [getHomePageData, currentUser.uid]);

  return (
    <HomePageContainer>
      <WelcomeText variant="h5">Welcome back, {user.displayName}</WelcomeText>
      <Grid direction="row" container spacing="2">
        <UserEventsGrid item>
          <UserEvents />
        </UserEventsGrid>
        <UserGroupsGrid item>
          <UserGroups userGroups={userGroups} />
        </UserGroupsGrid>
      </Grid>
    </HomePageContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    userGroups: state.user.userGroups,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHomePageData: (id) => dispatch(getHomePageData(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
