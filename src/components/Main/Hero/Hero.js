import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './Hero.scss';

const HeroComponent = () => (
  <div>
    <Container fluid className="hero-container">
      <div className="wavy-bottom" />
      <Row className="h-100">
        <Col sm="12" md="6" className="d-flex justify-content-center align-items-center white-color">
          <div className="d-flex flex-column align-items-center w-75">
            <h1 className="text-upper title-text lato">AWESOME APP LANDING PAGE</h1>
            <p className="catamaran sub-title-text">Find properties before they land on the big sites and help your clients get a jump on the market.</p>
            <div className="d-flex justify-content-center">
              <div className="app-store" />
              <div className="google-play" />
            </div>
          </div>
        </Col>
        <Col md="6" className="d-flex justify-content-center align-items-center">
          <div className="hero-right-image" />
        </Col>
      </Row>
    </Container>
  </div>
);


export default HeroComponent;
