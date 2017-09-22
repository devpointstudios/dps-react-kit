import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated
        ? (<Component {...props} />)
        : (
          <Redirect
            to={{
              pathname: '/login',
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

export default connect(mapStateToProps)(ProtectedRoute);
