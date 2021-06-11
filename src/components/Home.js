import { Button, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { logoutAction } from "../actions/user.action";

function Home(props) {
  return (
    <div>
      <Typography>
        Hi user {props.userId}
      </Typography>
      <Button variant="contained" color="primary" onClick={props.handleLogout}>
        Logout
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.user_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogout: () => dispatch(logoutAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
