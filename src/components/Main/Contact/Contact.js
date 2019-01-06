import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ContactForm from './ContactForm';
import './Contact.scss';

const ContactComponent = () => (
  <div id="navContact">
    <Container fluid className="contact-pic-bg">
      <div className="contact-gradient" />
      <Row className="h-100">
        <Col md="6" className="d-flex flex-column lato contact-info justify-content-between">
          <h2>Contact Us</h2>
          <p className="catamaran">It&#39;s very easy to get in touch with us. Just use the contact form or pay us a visit for a coffee at the office. Dynamically innovate competitive technology after an expanded array of leadership.</p>
          <h3>559-500-9928</h3>
          <h4>info@lionrealtors.com</h4>
          <p className="contact-text">
            Villagio Shopping Center
            <br />
            7945 N Blackstone Ave
            <br />
            Fresno, CA 93720
          </p>
          <p className="contact-text">CalBRE #02032563</p>
        </Col>
        <Col md="6">
          <ContactForm />
        </Col>
      </Row>
    </Container>
  </div>
);


export default ContactComponent;
