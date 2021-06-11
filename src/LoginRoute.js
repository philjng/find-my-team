import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

function LoginRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if ({...rest}.isAuth) {
          return (
            <Redirect
              to={{ pathname: "/home", state: { from: props.location } }}
            />
          );
        } else {
          return <Component />;
        }
      }}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.user.isAuth
  }
};

export default connect(mapStateToProps, null)(LoginRoute);
