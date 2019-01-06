import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Alert, NavLink } from 'reactstrap';
import LoginForm from './LoginForm';
import { loginUser } from '../../redux/actions';
import Navbar from '../common/Navbar/Navbar';
import './Login.scss';

class LoginComponent extends Component {
  state = {
    alert: null,
    toSuperUser: null,
    toAdmin: null,
  };

  login(loginData) {
    if (loginData.login.result === 'failed') {
      this.setState({ alert: 'bad login' });
    }
    if (loginData.login.result === 'success') {
      const { id, role, token } = loginData.login;
      this.props.loginUser({ id, role, token });
      if (role === 1) this.setState({ toSuperUser: true });
      if (role === 2) this.setState({ toAdmin: id });
    }
  }

  alerts() {
    const { alert } = this.state;
    switch (alert) {
      case 'bad login':
        return (
          <Alert color="secondary mt-0">
            Login information was incorrect.
          </Alert>
        );
      default:
        return null;
    }
  }

  redirect() {
    const { toSuperUser, toAdmin } = this.state;
    if (toSuperUser) {
      return (
        <Redirect to="superuser/1/" push />
      );
    }
    if (toAdmin) {
      return (
        <Redirect to={`administrator/${toAdmin}/`} />
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="login-bg d-flex justify-content-center align-items-center">
          <div className="login-container d-flex flex-column align-items-center">
            <div className="login-logo" />
            <LoginForm
              onSubmit={content => this.login(content)}
            />
            <NavLink className="login-subtext catamaran mt-4 p-0" tag={Link} to="">Forgot your password?</NavLink>
            <NavLink className="login-subtext catamaran p-0" tag={Link} to="/register">Need to create an account?</NavLink>
            <div className="login-placeholder">
              {this.alerts()}
            </div>
          </div>
          {this.redirect()}
        </div>
      </div>
      
    );
  }
}

export default connect(null, { loginUser })(LoginComponent);
