import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if ({...rest}.isAuth) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
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

export default connect(mapStateToProps, null)(ProtectedRoute);
