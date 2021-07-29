import {Container, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import {styled} from "@material-ui/styles";
import UserEvents from "./Events/UserEvents";
import UserGroups from "./Groups/UserGroups";

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

export default connect(mapStateToProps)(Home);
