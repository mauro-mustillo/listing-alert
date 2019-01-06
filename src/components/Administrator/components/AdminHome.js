import React from 'react';
import { Row, Col } from 'reactstrap';
import './AdminHome.scss';
import { PACKAGE_USER_LIMIT } from '../../../private';

const renderUsers = (users) => {
  return users.map((user, index) => {
    const { firstName, lastName, email, phone, _id } = user;
    if (index < 6) {
      return (
        <Col lg="6" className="mb-2" key={_id}>
          <div>
            <h5 className="text-uppercase">
              {firstName} {lastName}
            </h5>
            <h6>
              {email}
            </h6>
            <h6>
              {phone}
            </h6>
          </div>
        </Col>
      );
    }
    return null;
  });
};

const renderListings = (listings) => {
  return listings.map((listing, index) => {
    const { streetAddr, city, state, zip, contactNo, beds, baths, sqFt, _id } = listing;
    if (index < 6) {
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
    }
    return null;
  });
};

const AdminHome = (props) => {
  const { users, packageType, companyName } = props.data.getCompanyById;
  let totalListings = 0;
  let allListings = [];
  users.forEach((user) => {
    const { listings } = user;
    totalListings += user.listings.length;
    listings.forEach(listing => allListings.push(listing));
  });
  allListings.sort((a, b) => a.createdAt > b.createdAt);
  return (
    <div className="p-4 lato">
      <div className="admin-home-text">
        <p>Bread crumbs</p>
        <h1>
          WELCOME&nbsp;
          <span className="text-uppercase">{companyName}</span>
        </h1>
        <div className="mt-4 p-4 admin-home-data-container">
          <div className="d-flex">
            <div className="mr-4 admin-home-info-box admin-box-background-1 d-flex flex-column align-items-center justify-content-center">
              <h1>{users ? users.length : '0'}</h1>
              <h2>ACTIVE USERS</h2>
            </div>
            <div className="mr-4 admin-home-info-box admin-box-background-1 d-flex flex-column align-items-center justify-content-center">
              <h1>{PACKAGE_USER_LIMIT[packageType]}</h1>
              <h2>USER LIMIT</h2>
            </div>
            <div className="admin-home-info-box admin-box-background-2 d-flex flex-column align-items-center justify-content-center">
              <h1>{totalListings}</h1>
              <h2>TOTAL LISTINGS</h2>
            </div>
          </div>
          <Row className="w-100 mt-4">
            <Col lg="6">
              <div>
                <div className="p-4 admin-home-info-box-recent">
                  <div className="d-flex">
                    <div className="w-50 h-68 d-flex align-items-center">
                      <div>
                        <h3 className="text-uppercase">Latest</h3>
                        <h3 className="text-uppercase">Users</h3>
                      </div>
                    </div>
                    <div className="w-50 h-68 d-flex align-items-center">
                      <h4 className="text-center w-100">
                        View All Users
                      </h4>
                    </div>
                  </div>
                  <Row className="mt-4">
                    {renderUsers(users)}
                  </Row>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div>
                <div className="p-4 admin-home-info-box-recent">
                  <div className="d-flex">
                    <div className="w-50 h-68 d-flex align-items-center">
                      <div>
                        <h3 className="text-uppercase">Latest</h3>
                        <h3 className="text-uppercase">Listings</h3>
                      </div>
                    </div>
                    <div className="w-50 h-68 d-flex align-items-center">
                    </div>
                  </div>
                  <Row className="mt-4">
                    {renderListings(allListings)}
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
