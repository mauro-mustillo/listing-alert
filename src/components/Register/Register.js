import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import { Alert } from 'reactstrap';
import CompanyForm from '../common/CompanyForm/CompanyForm';
import { loginUser } from '../../redux/actions';
import { LOGIN } from '../../graphql/queries';
import CallLogin from './CallLogin';
import Navbar from '../common/Navbar/Navbar';
import './Register.scss';


class RegisterComponent extends Component {

  state = {
    alert: '',
    login: null,
    toAdmin: null,
  }

  handleSubmit(data) {
    if (!data || !data.addCompany || !data.addCompany.insertedId) {
      this.setState({ alert: 'failed add' });
    } else {
      this.setState({ login: data });
    }
  }

  login() {
    const { login } = this.state;
    if (login) {
      const { email, password } = login;
      return (
        <Mutation
          mutation={LOGIN}
          variables={{
            email,
            password,
          }}
          onCompleted={(data) => {
            const { id, token } = data.login;
            if (!token) {
              this.setState({ login: null, alert: 'login error' });
            } else {
              this.props.loginUser({ id, role: 2, token });
              this.setState({ toAdmin: id });
            }
          }}
        >
          {(passedmutation, { loading, error }) => {
            if (loading) { return <p>Logging in...</p>; }
            if (error) { this.setState({ alert: 'login error' }); }
            return <CallLogin login={passedmutation} />;
          }}
        </Mutation>
      );
    }
    return null;
  }

  redirects() {
    const { toAdmin } = this.state;
    if (toAdmin) {
      return (
        <Redirect to={`/administrator/${toAdmin}`} />
      );
    }
    return null;
  }

  alerts() {
    const { alert } = this.state;
    switch (alert) {
      case ('failed add'):
        return <Alert color="danger">There was an error adding you to the database. Please contact an admin.</Alert>;
      case ('login error'):
        return <Alert color="danger">There was an error attempting to log you in after the account was created. Please contact an admin.</Alert>
      default:
        return null;
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="register-bg d-flex justify-content-center align-items-center">
          <div>
            <CompanyForm
              onSubmit={data => this.handleSubmit(data)}
            />
            {this.alerts()}
          </div>
          
          {this.redirects()}
          {this.login()}
        </div>
        
      </div>
    );
  }
}

export default connect(null, { loginUser })(RegisterComponent);
