import {Container, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import {styled} from "@material-ui/styles";
import UserEvents from "./Events/UserEvents";
import UserGroups from "./Groups/UserGroups";
import {useEffect} from "react";
import {getUser} from "../actions/user";
import {useAuth} from "../context/AuthContext";

const PageContainer = styled(Container)({
  backgroundColor: `#f7fdfc`,
  padding: 0,
})

const WelcomeText = styled(Typography)({
  padding: '1rem',
  textAlign: 'center',
})

const HomeInfo = styled(Container)({
  display: `flex`,
  justifyContent: `space-around`
})


function Home(props) {
  const { currentUser } = useAuth()

  useEffect(() => {
    props.getUser(currentUser.uid)
  }, [])

  return (
    <PageContainer>
      <WelcomeText variant="h5">
        Welcome back, {props.user.displayName}
      </WelcomeText>
      <HomeInfo>
        <UserEvents/>
        <UserGroups/>
      </HomeInfo>
    </PageContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (data) => getUser(dispatch, data)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
