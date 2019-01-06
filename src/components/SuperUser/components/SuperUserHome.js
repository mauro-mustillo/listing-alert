import React from 'react';
import './SuperUserHome.scss';
import { Container, Row, Col } from 'reactstrap';

const renderCompanies = (companies) => {
  companies.sort((a, b) => a < b);
  return companies.map((company) => {
    const {
      companyName, city, state, zip, streetAddr, phone, _id,
    } = company;
    return (
      <Col lg="6" key={_id}>
        <div>
          <h5 className="text-uppercase">
            {companyName}
          </h5>
          <h6>
            {streetAddr}
          </h6>
          <h6>
            {city}, {state} {zip}
          </h6>
          {phone}
        </div>
      </Col>
    );
  });
};

const renderListings = (listings) => {
  listings.sort((a, b) => a < b);
  return listings.map((listing) => {
    const {
      streetAddr, city, state, zip, contactNo, beds, baths, sqFt, _id,
    } = listing;
    return (
      <Col lg="6" key={_id}>
        <div>
          <h5>{streetAddr}</h5>
          <h6>
            {city}, {state}, {zip}
          </h6>
          <h6>
            {contactNo}
          </h6>
          <h6>
            {beds} bed | {baths} baths | {sqFt} sqFt
          </h6>
        </div>
      </Col>
    );
  });
};

const SuperUserHome = (props) => {
  let totalUsers = 0;
  let totalListings = 0;
  let totalCompanies = 0;
  const allListings = [];
  const companies = props.data.getCompanies;
  totalCompanies = companies.length;
  companies.forEach((company) => {
    totalUsers += company.users.length;
    company.users.forEach((user) => {
      totalListings += user.listings.length;
      user.listings.forEach((listing) => {
        allListings.push(listing);
      });
    });
  });
  return (
    <div>
      <h1 className="super-user-title">DASHBOARD</h1>
      <div>
        <Container>
          <Row className="mb-2">
            <Col lg="3" md="6">
              <div className="p-2">
                <div className="superuser-main-top-row superuser-home-info-box d-flex flex-column align-items-center justify-content-center">
                  <h1>{totalUsers}</h1>
                  <h3 className="text-uppercase">Active Users</h3>
                </div>
              </div>
            </Col>
            <Col lg="3" md="6">
              <div className="p-2">
                <div className="superuser-main-top-row superuser-home-info-box d-flex flex-column align-items-center justify-content-center">
                  <h1>{totalListings}</h1>
                  <h3 className="text-uppercase">Total Listings</h3>
                </div>
              </div>
            </Col>
            <Col lg="3" md="6">
              <div className="p-2">
                <div className="superuser-main-top-row superuser-home-info-box d-flex flex-column align-items-center justify-content-center">
                  <h1>{totalCompanies}</h1>
                  <h3 className="text-uppercase">Companies</h3>
                </div>
              </div>
            </Col>
            <Col lg="3" md="6">
              <div className="p-2">
                <div className="superuser-main-top-row superuser-home-info-box d-flex flex-column align-items-center justify-content-center">
                  <h1>${parseInt(totalUsers, 10) * 7}</h1>
                  <h3 className="text-uppercase">This Month</h3>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col lg="6">
              {/* TODO: Pull in Google Analytics Info */}
              <div className="p-2">
                <div className="super-user-main-second-row superuser-home-info-box d-flex">
                  <div className="p-2 w-50 d-flex flex-column justify-content-center align-items-center">
                    <h3 className="text-uppercase mb-0">VISITORS</h3>
                    <h3 className="text-uppercase mb-2">TODAY</h3>
                    <p className="mb-0">View on Google Analytics</p>
                  </div>
                  <div className="w-50 d-flex justify-content-center align-items-center">
                    <h1>50</h1>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="p-2">
                <div className="super-user-main-second-row superuser-home-info-box d-flex">
                  <div className="p-2 w-50 d-flex flex-column justify-content-center align-items-center">
                    <h3 className="text-uppercase mb-0">Last Week</h3>
                    <h3 className="text-uppercase mb-2">Visitors</h3>
                    <p className="mb-0">View on Google Analytics</p>
                  </div>
                  <div className="w-50 d-flex justify-content-center align-items-center">
                    <h1>1,000</h1>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <div className="p-2">
                <div className="superuser-main-info-box-large p-4">
                  <div className="d-flex">
                    <div className="w-50 h-68 d-flex align-items-center">
                      <div>
                        <h3 className="text-uppercase">Latest</h3>
                        <h3 className="text-uppercase">Companies</h3>
                      </div>
                    </div>
                    <div className="w-50 h-68 d-flex align-items-center">
                      <h4 className="text-center w-100">
                        View All Companies
                      </h4>
                    </div>
                  </div>
                  <Row className="mt-4">
                    {renderCompanies(companies)}
                  </Row>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="p-2">
                <div className="superuser-main-info-box-large p-4">
                  <div className="d-flex">
                    <div className="w-50 h-68 d-flex align-items-center">
                      <div>
                        <h3 className="text-uppercase">Latest</h3>
                        <h3 className="text-uppercase">Properties</h3>
                      </div>
                    </div>
                    <div className="w-50 h-68 d-flex align-items-center">
                      <h4 className="text-center w-100">
                        View All Properties
                      </h4>
                    </div>
                  </div>
                  <Row className="mt-4">
                    {renderListings(allListings)}
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default SuperUserHome;
