import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { PRICE_PER_USER, PACKAGE_USER_LIMIT } from '../../../private';
import './AdminBilling.scss';

const mapStateToProps = state => ({
  auth: state.auth,
});


const AdminBilling = (props) => {
  const { packageType, users } = props.data.getCompanyById;
  return (
    <div className="lato p-5">
      <h1 className="text-uppercase">Billing</h1>
      <Container className="mt-5">
        <Row>
          <Col md="4">
            <div className="admin-billing-info-box admin-billing-top-row d-flex flex-column justify-content-center align-items-center">
              <h1>{users.length}</h1>
              <h4>ACTIVE USERS</h4>
            </div>
          </Col>
          <Col md="4">
            <div className="admin-billing-info-box admin-billing-top-row d-flex flex-column justify-content-center align-items-center">
              <h1>{PACKAGE_USER_LIMIT[packageType]}</h1>
              <h4>USER LIMIT</h4>
            </div>
          </Col>
          <Col md="4">
            <div className="admin-billing-info-box admin-billing-top-row d-flex flex-column justify-content-center align-items-center">
              <h1>
                $
                {PRICE_PER_USER}
              </h1>
              <h4>PER USER</h4>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md="6">
            <div className="admin-billing-info-box admin-billing-top-row d-flex align-items-center">
              <div className="w-50 d-flex justify-content-center">
                <h1>
                  $
                  {PRICE_PER_USER * users.length}
                </h1>
              </div>
              <div className="w-50 pr-4 pl-4">
                <h4>NEXT PAYMENT AMOUNT</h4>
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="admin-billing-info-box admin-billing-top-row d-flex justify-content-around align-items-center">
              <div className="w-75 d-flex justify-content-center">
                <h1>1/31/2019</h1>
              </div>
              <div className="w-25">
                <h4>PAYMENT DATE</h4>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default connect(mapStateToProps, null)(AdminBilling);
