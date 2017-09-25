import React from 'react';
import { connect } from 'react-redux';
import { Message, Container, Header } from 'semantic-ui-react';

const fadeFlash = dispatch => {
  setTimeout(() => {
    dispatch(this.props.clearFlash());
  }, 15000);
};

const Flash = ({ flash, dispatch }) => {
  if (flash.message) {
    return (
      <Container>
        <Message
          onDismiss={() => dispatch(this.props.clearFlash())}
          color={flash.color}
        >
          <Header as='h5' textAlign='center'>{flash.message}</Header>
          {fadeFlash(dispatch)}
        </Message>
      </Container>
    );
  }
  return null;
};

const mapStateToProps = state => {
  const { flash } = state;
  return { flash };
};

export default connect(mapStateToProps)(Flash);
