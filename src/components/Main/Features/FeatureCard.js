import React from 'react';

const FeatureCard = (props) => {
  const { icon, title } = props;
  return (
    <div className="feature-card d-flex flex-column align-items-center">
      <img src={icon} height="64" width="64" alt="icon" />
      <h3 className="secondary-color mt-2 text-center">{title}</h3>
      <p>Lorem ipsum dolor sit amet, eam ex probo tation tractatos. Ut vel hinc solet tincidunt.</p>
    </div>
  );
};

export default FeatureCard;
