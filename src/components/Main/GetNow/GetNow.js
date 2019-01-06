import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './GetNow.scss';

const GetNowComponent = () => (
  <div className="getnow-hide-blur">
    <Container fluid className="getnow-bg-house">
      <div className="getnow-gradient" />
      <Row className="h-100">
        <Col sm="6" className="d-flex justify-content-center align-items-center getnow-half">
          <div className="d-flex flex-column justify-content-center w-75 h-75">
            <h1 className="lato">Get The App Now!</h1>
            <p className="catamaran">
              Our top-rated Real Estate app simplifies your home search.
              Instantly see nearby homes for sale, apartments for rent, or open houses.
            </p>
            <div className="d-flex justify-content-center">
              <div className="app-store" />
              <div className="google-play" />
            </div>
          </div>
        </Col>
        <Col sm="6" className="get-now-half d-flex justify-content-center">
          <div className="getnow-image" />
        </Col>
      </Row>
    </Container>
  </div>
);


export default GetNowComponent;
