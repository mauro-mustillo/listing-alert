import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import FeatureCard from './FeatureCard';
import './Features.css';
import icon1 from '../../../assets/icons/feature-icon-1.png';
import icon2 from '../../../assets/icons/feature-icon-2.png';
import icon3 from '../../../assets/icons/feature-icon-3.png';
import icon4 from '../../../assets/icons/feature-icon-4.png';

const FeaturesComponent = () => (
  <div className="lato mt-5" id="navFeatures">
    <h2 className="text-center primary-color features-title-text w-50">Giving Realtors the Inside Track BEFORE a Home Goes on the Market</h2>
    <Container>
      <Row>
        <Col lg="3" sm="6" className="mt-4">
          <FeatureCard icon={icon1} title="Pre-Listing Notifications" />
        </Col>
        <Col lg="3" sm="6" className="mt-4">
          <FeatureCard icon={icon2} title="Awesome Feature #2" />
        </Col>
        <Col lg="3" sm="6" className="mt-4">
          <FeatureCard icon={icon3} title="Awesome Feature #3" />
        </Col>
        <Col lg="3" sm="6" className="mt-4">
          <FeatureCard icon={icon4} title="Awesome Feature #4" />
        </Col>
      </Row>
    </Container>
  </div>
);


export default FeaturesComponent;
