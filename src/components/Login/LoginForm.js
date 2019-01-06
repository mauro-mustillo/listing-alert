import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Button, Form, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { LOGIN } from '../../graphql/queries';
import emailIcon from '../../assets/icons/icons-email.png';
import passwordIcon from '../../assets/icons/icons-password.png';

export default class LoginForm extends Component {
  state = {
    email: '',
    password: '',
  };


  onChange(val, key) {
    this.setState({ [key]: val });
  }

  handleSubmit(data) {
    this.props.onSubmit(data);
  }

  render() {
    const { email, password } = this.state;
    return (
      <Form className="w-100">
        <InputGroup className="mt-5" size="lg">
          <InputGroupAddon addonType="prepend">
            <div className="login-icon-background d-flex justify-content-center align-items-center">
              <img src={emailIcon} height="20" width="27" alt="email" />
            </div>
          </InputGroupAddon>
          <Input className="lato" required type="email" name="email" id="exampleEmail" placeholder="Email" value={this.state.email} onChange={e => this.onChange(e.target.value, 'email')} />
        </InputGroup>
        <InputGroup className="mt-3" size="lg">
          <InputGroupAddon addonType="prepend">
            <div className="login-icon-background d-flex justify-content-center align-items-center">
              <img src={passwordIcon} height="24" width="24" alt="email" />
            </div>
          </InputGroupAddon>
          <Input className="lato" required type="password" name="password" id="examplePassword" placeholder="Password" value={this.state.password} onChange={e => this.onChange(e.target.value, 'password')} />
        </InputGroup>
        <Mutation
          mutation={LOGIN}
          variables={{
            email,
            password,
          }}
          onCompleted={data => this.handleSubmit(data)}
        >
          {(passedmutation, { loading }) => {
            return (
              <Button outline size="lg" color="primary-light" className="mt-4 w-75 login-button" disabled={loading} onClick={passedmutation}>
                {loading ? <p className="catamaran m-0">Logging in...</p> : <p className="catamaran m-0">LOG IN</p>}
              </Button>
            );
          }}
        </Mutation>
      </Form>
    );
  }
}
