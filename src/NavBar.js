import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class NavBar extends Component {
  // routes example = [{text: 'About Us', url: '/about'}, {text: 'FAQ', url: '/faq'}]
  linksDisplay = (routes = []) => {
    return routes.map( route => {
      return(
        <Link to={route.url}>
          <Menu.Item name={route.text} />
        </Link>
      )
    })
  }

  rightNavs = () => {
    const { user, dispatch, history, handleLogout = (f) => f } = this.props;

    if (user.id) {
      return (
        <Menu.Menu position='right'>
          { this.linksDisplay(this.props.authRoutes) }
          <Menu.Item
            name='Logout'
            onClick={() => dispatch(handleLogout(history))}
          />
        </Menu.Menu>
      );
    }
    return (
      <Menu.Menu position='right'>
        { this.linksDisplay(this.props.generalRoutes) }
        <Link to='/register'>
          <Menu.Item name='Register' />
        </Link>
        <Link to='/login'>
          <Menu.Item name='Login' />
        </Link>
      </Menu.Menu>
    );
  }

  render() {
    return (
      <div>
        <Menu pointing secondary>
          <Link to='/'>
            <Menu.Item name='Home' />
          </Link>
          { this.rightNavs() }
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user || {} };
};

export default withRouter(connect(mapStateToProps)(NavBar));
