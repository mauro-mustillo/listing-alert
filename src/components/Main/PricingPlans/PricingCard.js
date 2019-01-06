import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './PricingCard.scss';

const PricingCard = (props) => {
  const { title, children } = props;
  return (
    <div className="pricing-card">
      <h3 className="primary-color text-center text-uppercase lato">{title}</h3>
      {children}
      <Button tag={Link} to="/register" block color="secondary">SUBSCRIBE</Button>
    </div>
  );
};

export default PricingCard;
