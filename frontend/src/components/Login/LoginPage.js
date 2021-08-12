import LoginForm from "./LoginForm";
import {Container, Grid, Typography} from "@material-ui/core";
import {styled} from "@material-ui/styles";

const leftGridWidth = 75;

const SCContainer = styled(Container)({
  maxWidth: "75%",
  display: "flex",
  justifyContent: "space-between"
});

const LeftGrid = styled(Grid)({
  maxWidth: leftGridWidth + "%",
  display: "flex",
  alignItems: "center"
});

const RightGrid = styled(Grid)({
  maxWidth: 1 - leftGridWidth + "%",
});

function LoginPage() {
  return (
    <SCContainer>
        <LeftGrid container>
          <Grid item>
            <Typography>FindMyTeam</Typography>
            <Typography>Find events. Find groups.</Typography>
            <Typography>Meet new people.</Typography>
          </Grid>
        </LeftGrid>
        <RightGrid container>
          <Grid item>
            <LoginForm/>
          </Grid>
        </RightGrid>
    </SCContainer>
  )
}

export default LoginPage;
