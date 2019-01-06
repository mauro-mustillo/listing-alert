import React, { Component } from 'react';
import { Form, InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import { Mutation } from 'react-apollo';
import { ADD_USER_TO_COMPANY, UPDATE_USER_FROM_COMPANY, GET_COMPANY_BY_ID } from '../../../graphql/queries';
import './AdminUserForm.scss';
import {
  nameIcon, emailIcon, passwordIcon,
} from '../../common/CompanyForm/icons';

class RegisterUserFormComponent extends Component {
  state = {
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    licenseNo: '',
    password: '',
    formType: 'CREATE',
  };

  componentDidMount() {
    const { data } = this.props;
    if (data) {
      const { email, phone, firstName, lastName, licenseNo } = data;
      this.setState({
        email,
        phone,
        firstName,
        lastName,
        licenseNo,
        formType: 'UPDATE',
      });
    }
  }

  onChange(val, key) {
    this.setState({ [key]: val });
  }

  handleSubmit(data) {
    this.props.onSubmit(data);
  }

  render() {
    const { email, phone, firstName, lastName, licenseNo, password, formType } = this.state;
    const { companyId } = this.props;

    return (
      <div className="p-5 lato">
        <div className="d-flex admin-user-form-wrapper admin-user-form">
          <div className="w-50 h-100 d-flex flex-column align-items-center justify-content-center">
            <h1>{formType !== 'UPDATE' ? 'CREATE USER' : 'UPDATE USER'}</h1>
            <p>Please input the relevant information to add a user.</p>
          </div>
          <div className="w-50 h-100">
            <Form className="p-5">
              <InputGroup className="mb-4" size="lg">
                <InputGroupAddon addonType="prepend">
                  <div className="login-icon-background d-flex justify-content-center align-items-center">
                    <img src={emailIcon} height="20" width="27" alt="email" />
                  </div>
                </InputGroupAddon>
                <Input type="email" name="userEmail" id="userEmail" placeholder="E-mail" value={email} onChange={(e) => { this.onChange(e.target.value, 'email'); }} />
              </InputGroup>
              <InputGroup className="mb-4" size="lg">
                <InputGroupAddon addonType="prepend">
                  <div className="login-icon-background d-flex d-flex justify-content-center align-items-center">
                    #
                  </div>
                </InputGroupAddon>
                <Input type="text" name="userPhone" id="userPhone" placeholder="Phone Number" value={phone} onChange={(e) => { this.onChange(e.target.value, 'phone'); }} />
              </InputGroup>
              <InputGroup className="mb-4" size="lg">
                <InputGroupAddon addonType="prepend">
                  <div className="login-icon-background d-flex justify-content-center align-items-center">
                    <img src={nameIcon} height="27" width="27" alt="company name" />
                  </div>
                </InputGroupAddon>
                <Input type="text" name="userFirstName" id="userFirstName" placeholder="First Name" value={firstName} onChange={(e) => { this.onChange(e.target.value, 'firstName'); }} />
              </InputGroup>
              <InputGroup className="mb-4" size="lg">
                <InputGroupAddon addonType="prepend">
                  <div className="login-icon-background d-flex justify-content-center align-items-center">
                    <img src={nameIcon} height="27" width="27" alt="company name" />
                  </div>
                </InputGroupAddon>
                <Input type="text" name="userLastName" id="userLastName" placeholder="Last Name" value={lastName} onChange={(e) => { this.onChange(e.target.value, 'lastName'); }} />
              </InputGroup>
              <InputGroup className="mb-4" size="lg">
                <InputGroupAddon addonType="prepend">
                  <div className="login-icon-background d-flex d-flex justify-content-center align-items-center">
                    #
                  </div>
                </InputGroupAddon>
                <Input type="text" name="userLicenseNo" id="userLicenseNo" placeholder="License No." value={licenseNo} onChange={(e) => { this.onChange(e.target.value, 'licenseNo'); }} />
              </InputGroup>
              {formType !== 'UPDATE'
                ? (
                  <InputGroup className="mb-4" size="lg">
                    <InputGroupAddon addonType="prepend">
                      <div className="login-icon-background d-flex justify-content-center align-items-center">
                        <img src={passwordIcon} height="24" width="24" alt="passwordConfirm" />
                      </div>
                    </InputGroupAddon>
                    <Input type="password" name="userPassword" id="userPassword" placeholder="Password" value={password} onChange={(e) => { this.onChange(e.target.value, 'password'); }} />
                  </InputGroup>
                ) : null}
              <Mutation
                mutation={formType !== 'UPDATE' ? ADD_USER_TO_COMPANY : UPDATE_USER_FROM_COMPANY}
                variables={formType !== 'UPDATE' ? {
                  companyId,
                  email,
                  phone,
                  firstName,
                  lastName,
                  licenseNo,
                  password,
                } : {
                  userId: this.props.data.id,
                  email,
                  phone,
                  firstName,
                  lastName,
                  licenseNo,
                }}
                refetchQueries={[{ query: GET_COMPANY_BY_ID, variables: { id: companyId } }]}
                onCompleted={data => this.handleSubmit(data)}
              >
                {(addUser, { loading }) => {
                  return (
                    <Button color="primary-light" size="lg" outline block onClick={addUser}>
                      {loading ? 'Adding....' : 'Submit'}
                    </Button>
                  );
                }}
              </Mutation>
            </Form>
          </div>
          
        </div>
      </div>
    );
  }
}

export default RegisterUserFormComponent;
