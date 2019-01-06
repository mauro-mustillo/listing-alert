import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PricingCard from './PricingCard';
import './PricingPlans.scss';

const PricingPlansComponent = () => (
  <div id="navPricing">
    <h2 className="text-center primary-color lato pricing-title-text">Pricing Plans</h2>
    <p className="catamaran text-center pricing-sub-text">We believe in making simple and fair pricing plans. Choose your next successful plan and get started today!</p>
    <Container>
      <Row>
        <Col md="6" sm="12" className="pricing-card-left catamaran">
          <PricingCard title="Monthly Fee">
            <div className="text-center pricing-description-text">
              <p className="mb-0">Basic description here,</p>
              <p className="mb-0">Let&#39;s keep 2 lines</p>
            </div>
            <div className="money-row d-flex primary-color justify-content-center align-items-center">
              <span className="pricing-middle-number mr-2">$</span>
              <span className="pricing-big-number mr-2">7</span>
              <span className="pricing-middle-number mb-4">00</span>
            </div>
            <p className="text-center text-uppercase primary-color pricing-middle-number">Per Agent</p>
          </PricingCard>
        </Col>
        <Col md="6" sm="12" className="pricing-card-right">
          <PricingCard title="Initial Setup Fee">
            <div className="pricing-description-text lato text-center">
              <p className="mb-2">1-24 Agents = $1,000</p>
              <p className="mb-2">25-49 Agents = $3,000</p>
              <p className="mb-2">50-149 = $5,000</p>
              <p className="mb-2">150+ = $10,000</p>
            </div>
          </PricingCard>
        </Col>
      </Row>
    </Container>
  </div>
);


export default PricingPlansComponent;
