import { Component } from 'react';
import { connect } from 'react-redux';

class FetchUser extends Component {
  state = { loaded: false };

  componentDidMount() {
    const { isAuthenticated, dispatch, validateToken = f => f } = this.props;
    if (isAuthenticated) this.loaded();
    else dispatch(validateToken(this.loaded));
  }

  componentWillReceiveProps() {
    if (!this.state.loaded) this.loaded();
  }

  loaded = () => {
    this.setState({ loaded: true });
  }

  render() {
    return this.state.loaded ? this.props.children : null;
  }
}

const mapStateToProps = state => {
  let user = state.user || {}
  return { isAuthenticated: user.id };
};

export default connect(mapStateToProps)(FetchUser);
