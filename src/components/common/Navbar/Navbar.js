import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const mapStateToProps = state => ({
  auth: state.auth,
});

class NavbarComponent extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  renderUserButton() {
    const { id } = this.props.auth;
    return (id ? (
      <NavItem>
        <NavLink tag={Link} to="/logout" className="text-uppercase">Sign Out</NavLink>
      </NavItem>
    ) : (
      <NavItem>
        <NavLink tag={Link} to="/login" className="text-uppercase">Sign In</NavLink>
      </NavItem>
    ));
  }

  render() {
    const { isOpen } = this.state;
    return (
      <div className="lato" id="#navTop">
        <Navbar className="nav-background" light expand="md">
          <NavbarBrand tag={Link} to="/" />
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar>
              <NavLink href="#navFeatures" className="text-uppercase mr-3">Features</NavLink>
              <NavLink href="#navPricing" className="text-uppercase mr-3">Pricing</NavLink>
              <NavLink href="#navFaq" className="text-uppercase mr-3">FAQ</NavLink>
              <NavLink href="#navContact" className="text-uppercase mr-3">Contact</NavLink>
            </Nav>
            <Nav className="ml-auto" navbar>
              {this.renderUserButton()}
              <NavItem>
                <Button tag={Link} to="/register" outline color="primary-light" className="ml-3">SIGN UP</Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}


// NavbarComponent.propTypes = {}

export default connect(mapStateToProps, null)(NavbarComponent);
