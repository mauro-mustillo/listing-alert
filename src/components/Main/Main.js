import React, { Component } from 'react';
import NavbarMain from '../common/Navbar/Navbar';
import Hero from './Hero/Hero';
import Features from './Features/Features';
import Description from './Description/Description';
import PricingPlans from './PricingPlans/PricingPlans';
import GetNow from './GetNow/GetNow';
import Faq from './Faq/Faq';
import Contact from './Contact/Contact';
import FooterCommon from '../common/Footer/Footer';

class MainComponent extends Component {
  render() {
    return (
      <div>
        <NavbarMain />
        <Hero />
        <Features />
        <Description />
        <PricingPlans />
        <GetNow />
        <Faq />
        <Contact />
        <FooterCommon />
      </div>
    );
  }
}

export default MainComponent;
