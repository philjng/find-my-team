import { Button, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { logoutAction } from "../actions/user.action";

function Home(props) {
  return (
    <div>
      <Typography>
        Hi user {props.userId}
      </Typography>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.user_id,
  };
};


export default connect(mapStateToProps)(Home);
