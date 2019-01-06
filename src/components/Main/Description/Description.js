import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './Description.scss';

const DescriptionComponent = () => (
  <div>
    <Container fluid className="description-container">
      <div className="description-gradient" />
      <div className="description-wavy-bottom" />
      <Row className="h-100">
        <Col sm="6" className="d-flex justify-content-center align-items-center white-color">
          <div className="description-phones" />
        </Col>
        <Col sm="6" className="d-flex justify-content-center align-items-center catamaran">
          <div className="d-flex flex-column align-items-start white-color">
            <h1 className="text-upper description-title-text lato">MORE AWESOME APP DESCRIPTION</h1>
            <p className="catamaran description-sub-title-text">Our top-rated Real Estate app simplifies your home search. Instantly see nearby homes for sale, apartments for rent, or open houses.</p>
            <Button className="description-button" outline size="lg" color="light">SIGN UP</Button>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);


export default DescriptionComponent;
