import React, { Component } from 'react';
import {
  Form, InputGroup, InputGroupAddon, Input, Button, Row, Col, Container,
} from 'reactstrap';
import { Mutation } from 'react-apollo';
import {
  ADD_COMPANY, UPDATE_COMPANY, GET_LIST_OF_COMPANIES, GET_COMPANY_BY_ID,
} from '../../../graphql/queries';
import StripeForm from '../../Stripe/StripeForm';
import {
  nameIcon, emailIcon, passwordIcon, addressIcon,
  cityIcon, stateIcon, zipIcon,
} from './icons';
import './CompanyForm.scss';

const licenseBoxStyle = {
  border: '5px solid #B598BB',
  color: '#FFFFFF',
};

class CompanyFormComponent extends Component {
  state = {
    companyName: '',
    email: '',
    emailConfirm: '',
    password: '',
    passwordConfirm: '',
    streetAddr: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    packageType: 1,
    editType: 'CREATE',
    page: 1,
    alert: '',
  };

  componentDidMount() {
    if (this.props.data) {
      const {
        companyName, email, streetAddr, city, state, zip, phone, packageType,
      } = this.props.data;
      this.setState({
        companyName,
        email,
        streetAddr: streetAddr || '',
        city: city || '',
        state: state || '',
        zip: zip || '',
        phone: phone || '',
        packageType,
        editType: 'UPDATE',
        alert: '',
      });
    }
  }

  onChange(val, key) {
    this.setState({ [key]: val });
  }

  handleSubmit(data) {
    // TODO: STRIPE CHARGING
    this.props.onSubmit(data);
  }

  headerContent() {
    const { page } = this.state;
    let header = '';
    let desc = '';
    switch (page) {
      case 1:
        header = 'ACCOUNT INFO';
        desc = 'Please input your Company name as well as the email and password you\'d like to use.';
        break;
      case 2:
        header = 'COMPANY LOCATION';
        desc = 'Let us know where you are.';
        break;
      case 3:
        header = 'COMPANY SIZE';
        desc = 'Please let us know your company size for initial setup paymemnt';
        break;
      case 4:
        header = 'PAYMENT INFO';
        desc = 'Please input your credit card information';
        break;
      default:
        break;
    }
    return (
      <div className="p-2">
        <h1 className="mt-5 lato mb-2 text-center company-form-header-text">{header}</h1>
        <p className="catamaran company-form-sub-text">{desc}</p>
      </div>
    );
  }

  leftButton() {
    const { page } = this.state;
    switch (page) {
      case 1:
        return <div />;

      default:
        return (
          <Button color="primary-light" outline size="lg" onClick={() => { this.setState((prevState) => { return { page: prevState.page - 1 }; }); }} className="w-20">
            &#60; GO BACK
          </Button>
        );
    }
  }

  alerts() {
    const { alert } = this.state;
    switch (alert ? alert.toLowerCase() : alert) {
      case 'missing field':
        return (
          <h2 className="company-form-header-text lato mr-4">You are missing a required field.</h2>
        );
      case 'non-match-email':
        return (
          <h2 className="company-form-header-text lato mr-4">Email fields do not match.</h2>
        );
      case 'non-match-password':
        return (
          <h2 className="company-form-header-text lato mr-4">Password fields do not match.</h2>
        );
      default:
        return null;
    }
  }

  rightButton() {
    const {
      page, editType, companyName, email, password,
      phone, streetAddr, city, state, zip, packageType,
    } = this.state;
    switch (page) {
      case 1:
        return (
          <Button color="primary-light" outline size="lg" onClick={() => this.pageValidation(1)} className="ml-3 w-20">
            NEXT &#62;
          </Button>
        );
      case 2:
        return editType === 'CREATE' ? (
          <Button color="primary-light" outline size="lg" onClick={() => this.pageValidation(2)} className="ml-3 w-20">
            NEXT &#62;
          </Button>
        ) : (
          <Mutation
            mutation={UPDATE_COMPANY}
            variables={{
              companyName,
              email,
              phone,
              streetAddr,
              city,
              state,
              zip,
              id: this.props.id,
            }}
            refetchQueries={[{ query: GET_LIST_OF_COMPANIES }, { query: GET_COMPANY_BY_ID, variables: { id: this.props.id } }]}
            onCompleted={data => this.handleSubmit({ ...data, email, password })}
          >
            {(trigger, { loading }) => {
              return (
                <Button color="primary-light" className="ml-3 w-20" size="lg" outline onClick={trigger} disabled={loading}>
                  {loading ? 'Updating company...' : 'UPDATE'}
                </Button>
              );
            }}
          </Mutation>
        );
      case 3:
        return (
          <Button color="primary-light" outline size="lg" onClick={() => this.pageValidation(3)} className="ml-3 w-20">
            NEXT &#62;
          </Button>
        );
      case 4:
        return (
          <Mutation
            mutation={ADD_COMPANY}
            variables={{
              companyName,
              email,
              password,
              phone,
              streetAddr,
              city,
              state,
              zip,
              packageType,
            }}
            refetchQueries={[{ query: GET_LIST_OF_COMPANIES }, { query: GET_COMPANY_BY_ID, variables: { id: this.props.id } }]}
            onCompleted={data => this.handleSubmit({ ...data, email, password })}
          >
            {(trigger, { loading }) => {
              return (
                <Button color="primary-light" className="ml-3 w-20" size="lg" outline onClick={trigger} disabled={loading}>
                  {loading ? 'Creating company...' : 'CREATE'}
                </Button>
              );
            }}
          </Mutation>
        );
      default:
        return null;
    }
  }

  pageValidation(page) {
    const {
      companyName, email, emailConfirm, password, passwordConfirm, editType,
    } = this.state;
    switch (page) {
      case 1:
        if (!companyName || !email || !emailConfirm || (!password && editType === 'CREATE') || (!passwordConfirm && editType === 'CREATE')) {
          this.setState({ alert: 'missing field' });
          return;
        }

        if (email !== emailConfirm) {
          this.setState({ alert: 'non-match-email' });
          return;
        }
        
        if (password !== passwordConfirm) {
          this.setState({ alert: 'non-match-password' });
          return;
        }
        // TODO: PASSWORD STRENGTH VALIDATION
        this.setState({ alert: null, page: 2 });
        break;
      case 2:
        // TODO: Check if personal info is required
        this.setState({ alert: null, page: 3 });
        break;
      case 3:
        // TODO: Validate package info?
        this.setState({ alert: null, page: 4 });
        break;
      default:
        break;
    }
  }

  progressBar() {
    const { page, editType } = this.state;
    const PAGES = editType === 'CREATE' ? 4 : 2; // TODO: When adding stripe elemnts and a finish, this will need adjusting
    let progressbar = [];
    for (let i = 0; i < PAGES; i++) {
      progressbar = progressbar.concat(<div key={i} className={page === i + 1 ? 'company-form-progress-bar company-form-progress-bar-active mr-2' : 'company-form-progress-bar mr-2'} />);
    }
    return progressbar;
  }

  render() {
    const {
      companyName, email, emailConfirm, password, passwordConfirm,
      phone, streetAddr, city, state, zip, packageType, editType, page,
    } = this.state;

    return (
      <div>
        <Container className="register-form-container">
          <Row>
            <Col md="6" sm="12" className="company-form-left-side d-flex flex-column justify-content-center align-items-center">
              {/* TODO: Change text on update mode */}
              <div className="company-form-icon" />
              {this.headerContent()}
              <div className="d-flex">
                {this.progressBar()}
              </div>
            </Col>
            {/* end left hand side, begin right */}
            <Col md="6" sm="12">
              <Form className="company-form-inputs h-100 d-flex flex-column justify-content-between" onSubmit={event => this.handleSubmit(event)}>
                {page === 1 ? (
                  <div className="h-100 d-flex flex-column justify-content-between">
                    <InputGroup size="lg">
                      <InputGroupAddon addonType="prepend">
                        <div className="login-icon-background d-flex justify-content-center align-items-center">
                          <img src={nameIcon} height="27" width="27" alt="company name" />
                        </div>
                      </InputGroupAddon>
                      <Input type="companyName" name="CompanyName" id="companyName" placeholder="Company Name" className="lato" required value={companyName} onChange={(e) => { this.onChange(e.target.value, 'companyName'); }} />
                    </InputGroup>
                    <InputGroup size="lg">
                      <InputGroupAddon addonType="prepend">
                        <div className="login-icon-background d-flex justify-content-center align-items-center">
                          <img src={emailIcon} height="20" width="27" alt="email" />
                        </div>
                      </InputGroupAddon>
                      <Input type="email" name="email" id="exampleEmail" placeholder="E-mail" className="lato" required value={email} onChange={(e) => { this.onChange(e.target.value, 'email'); }} />
                    </InputGroup>
                    <InputGroup size="lg">
                      <InputGroupAddon addonType="prepend">
                        <div className="login-icon-background d-flex justify-content-center align-items-center">
                          <img src={emailIcon} height="20" width="27" alt="email confirm" />
                        </div>
                      </InputGroupAddon>
                      <Input type="email" name="email" id="exampleEmailConfirm" placeholder="Confirm Your E-mail" className="lato" required value={emailConfirm} onChange={(e) => { this.onChange(e.target.value, 'emailConfirm'); }} />
                    </InputGroup>
                    {editType === 'CREATE' ? (
                      <InputGroup size="lg">
                        <InputGroupAddon addonType="prepend">
                          <div className="login-icon-background d-flex justify-content-center align-items-center">
                            <img src={passwordIcon} height="24" width="24" alt="password" />
                          </div>
                        </InputGroupAddon>
                        <Input type="password" name="password" id="examplePassword" placeholder="Password" className="lato" required value={password} onChange={(e) => { this.onChange(e.target.value, 'password'); }} />
                      </InputGroup>
                    ) : null}
                    {editType === 'CREATE' ? (
                      <InputGroup size="lg">
                        <InputGroupAddon addonType="prepend">
                          <div className="login-icon-background d-flex justify-content-center align-items-center">
                            <img src={passwordIcon} height="24" width="24" alt="passwordConfirm" />
                          </div>
                        </InputGroupAddon>
                        <Input type="password" name="password" id="examplePasswordConfirm" placeholder="Confirm Your Password" className="lato" required value={passwordConfirm} onChange={(e) => { this.onChange(e.target.value, 'passwordConfirm'); }} />
                      </InputGroup>
                    ) : null}
                  </div>
                ) : null}
                {page === 2 ? (
                  <div className="h-100 d-flex flex-column justify-content-between">
                    <InputGroup size="lg">
                      <InputGroupAddon addonType="prepend">#</InputGroupAddon>
                      <Input type="phone" name="phone" id="phone" placeholder="Phone Number" required value={phone} onChange={(e) => { this.onChange(e.target.value, 'phone'); }} />
                    </InputGroup>
                    <InputGroup size="lg">
                      <InputGroupAddon addonType="prepend">
                        <div className="login-icon-background d-flex justify-content-center align-items-center">
                          <img src={addressIcon} height="24" width="25" alt="address" />
                        </div>
                      </InputGroupAddon>
                      <Input type="text" name="address" id="exampleAddress" placeholder="Address" required value={streetAddr} onChange={(e) => { this.onChange(e.target.value, 'streetAddr'); }} />
                    </InputGroup>
                    <InputGroup size="lg">
                      <InputGroupAddon addonType="prepend">
                        <div className="login-icon-background d-flex justify-content-center align-items-center">
                          <img src={cityIcon} height="24" width="27" alt="city" />
                        </div>
                      </InputGroupAddon>
                      <Input type="text" name="city" id="exampleCity" placeholder="City" required value={city} onChange={(e) => { this.onChange(e.target.value, 'city'); }} />
                    </InputGroup>
                    <InputGroup size="lg">
                      <InputGroupAddon addonType="prepend">
                        <div className="login-icon-background d-flex justify-content-center align-items-center">
                          <img src={stateIcon} height="24" width="23" alt="state" />
                        </div>
                      </InputGroupAddon>
                      <Input type="text" name="state" id="exampleState" placeholder="State" required value={state} onChange={(e) => { this.onChange(e.target.value, 'state'); }} />
                    </InputGroup>
                    <InputGroup size="lg">
                      <InputGroupAddon addonType="prepend">
                        <div className="login-icon-background d-flex justify-content-center align-items-center">
                          <img src={zipIcon} height="24" width="24" alt="zip" />
                        </div>
                      </InputGroupAddon>
                      <Input type="text" name="zip" id="exampleZip" placeholder="ZIP" required value={zip} onChange={(e) => { this.onChange(e.target.value, 'zip'); }} />
                    </InputGroup>
                  </div>
                ) : null}
                {page === 3 ? (
                  <div>
                    <h4 className="lato company-form-check-text">LET US KNOW HOW MANY LICENSES YOU NEED</h4>
                    <div>
                      <div className="d-flex mt-3 mb-2 lato">
                        <div role="button" className="company-form-license-box mr-2" style={packageType === 1 ? licenseBoxStyle : null} onClick={() => { this.setState({ packageType: 1 }); }}>
                          <h2>1-24</h2>
                          <p>Agents</p>
                        </div>
                        <div role="button" className="company-form-license-box" style={packageType === 2 ? licenseBoxStyle : null} onClick={() => { this.setState({ packageType: 2 }); }}>
                          <h2>25-49</h2>
                          <p>Agents</p>
                        </div>
                      </div>
                      <div className="d-flex lato">
                        <div role="button" className="company-form-license-box mr-2" style={packageType === 3 ? licenseBoxStyle : null} onClick={() => { this.setState({ packageType: 3 }); }}>
                          <h2>50-149</h2>
                          <p>Agents</p>
                        </div>
                        <div role="button" className="company-form-license-box" style={packageType === 4 ? licenseBoxStyle : null} onClick={() => { this.setState({ packageType: 4 }); }}>
                          <h2>150+</h2>
                          <p>Agents</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                
              </Form>
              {page === 4 ? (<StripeForm />) : null}
            </Col>
            {/* end right hand side */}
          </Row>
        </Container>
        <div className="company-form-button-row d-flex justify-content-end mt-5">
          {this.alerts()}
          {this.leftButton()}
          {this.rightButton()}
        </div>
      </div>
    );
  }
}

export default CompanyFormComponent;
