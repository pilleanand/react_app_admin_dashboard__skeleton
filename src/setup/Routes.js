import React from "react";
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import LandingComponent from "../pages/landing/components/LandingComponent";
import LoginComponent from "../pages/login/LoginComponent";
import { useUserState } from "../common/context/UserContext";
import Layout from "../common/components/Layout";

const Routes = (props) => {
  const { isAuthenticated } = useUserState();

  return (
    <Switch>
      <Route
        exact
        path="/app"
        render={() => <Redirect to="/app/dashboard" />}
      />
      <PublicRoute exact path="/" component={LandingComponent} />
      <PrivateRoute path="/app" component={Layout} />
      <Route
        path="/login"
        render={() => isAuthenticated ? <Redirect to="/app/dashboard" />
          : React.createElement(LoginComponent, props)}
      />
      <Route component={Error} />
    </Switch>
  );

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: {
                    from: props.location,
                  },
                }}
              />
            )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        component={component}
      // render={props =>
      //   isAuthenticated ? (
      //     <Redirect
      //       to={{
      //         pathname: rest.path,
      //       }}
      //     />
      //   ) : (
      //       React.createElement(component, props)
      //     )
      // }
      />
    );
  }
}

export default Routes;