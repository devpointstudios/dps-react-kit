import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      !isAuthenticated
        ? (<Component {...props} />)
        : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />)
    )}
  />
);

const mapStateToProps = state => {
  let user = state.user || {}
  return { isAuthenticated: user.id };
};

export default connect(mapStateToProps)(AuthRoute);
