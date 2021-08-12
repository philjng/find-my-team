import LoginForm from "./LoginForm";
import {Container, Grid, Typography} from "@material-ui/core";
import {styled} from "@material-ui/styles";

const SCContainer = styled(Container)({
  maxWidth: "75%",
  display: "flex",
});

const LeftGrid = styled(Grid)({
  display: "flex",
  alignItems: "center",
});

const RightGrid = styled(Grid)({
});

function LoginPage() {
  return (
    <SCContainer>
        <LeftGrid container>
          <Grid item>
            <Typography variant="h1" color="primary">
              FindMyTeam
            </Typography>
            <Typography variant="h6" color="primary">
              Find events. Find groups.
            </Typography>
            <Typography variant="h6" color="primary">
              Meet new people.
            </Typography>
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
