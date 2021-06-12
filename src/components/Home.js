import {Container, Typography} from "@material-ui/core";
import { connect } from "react-redux";
import {styled} from "@material-ui/styles";
import {UserEvents} from "./Events/UserEvents";
import {UserGroups} from "./UserGroups";

const PageContainer = styled(Container)({
})

const WelcomeText = styled(Typography)({
    margin: '1rem',
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
            Welcome back, {props.userId}
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
    userId: state.user.user_id,
  };
};


export default connect(mapStateToProps)(Home);
