import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../redux/actions';

const mapActionsToProps = dispatch => ({
  logoutUser() {
    dispatch(logout());
  },
});

class Logout extends Component {
  componentDidMount() {
    const { onFinish } = this.props;
    this.props.logoutUser();
    if (onFinish) onFinish();
  }

  render() {
    return (
      <Redirect to="/login" />
    );
  }
}

export default connect(null, mapActionsToProps)(Logout);
