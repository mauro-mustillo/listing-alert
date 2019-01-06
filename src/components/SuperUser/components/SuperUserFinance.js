import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import './SuperUserFinance.scss';

class SuperUserFinance extends Component {
  componentDidMount() {
    // TODO: Data calculations go here
  }

  render() {
    return (
      <div>
        <h1>Finance</h1>
        <Row>
          <Col md="6" className="p-5">
            <div className="p-3 superuser-finance-top-earners">
              <h1 className="text-uppercase mb-4">Top total earners</h1>
              <div className="d-flex justify-content-between align-items-center catamaran">
                <h2>Fake Company A</h2>
                <p className="super-user-finance-money-tag lato">$999</p>
              </div>
              <div className="d-flex justify-content-between align-items-center catamaran">
                <h2>Fake Company B</h2>
                <p className="super-user-finance-money-tag lato">$800</p>
              </div>
              <div className="d-flex justify-content-between align-items-center catamaran">
                <h2>Fake Company C</h2>
                <p className="super-user-finance-money-tag lato">$777</p>
              </div>
              <div className="d-flex justify-content-between align-items-center catamaran">
                <h2>Fake Company D</h2>
                <p className="super-user-finance-money-tag lato">$625</p>
              </div>
            </div>
          </Col>
          <Col md="6" className="p-5">
            <div className="p-3 superuser-finance-top-earners">
              <h1 className="text-uppercase mb-4">next month top</h1>
              <div className="d-flex justify-content-between align-items-center catamaran">
                <h2>Fake Company B</h2>
                <p className="super-user-finance-money-tag lato">$133</p>
              </div>
              <div className="d-flex justify-content-between align-items-center catamaran">
                <h2>Fake Company A</h2>
                <p className="super-user-finance-money-tag lato">$126</p>
              </div>
              <div className="d-flex justify-content-between align-items-center catamaran">
                <h2>Fake Company C</h2>
                <p className="super-user-finance-money-tag lato">$77</p>
              </div>
              <div className="d-flex justify-content-between align-items-center catamaran">
                <h2>Fake Company D</h2>
                <p className="super-user-finance-money-tag lato">$70</p>
              </div>
            </div>
          </Col>
        </Row>
        <h2>Upcoming Payments</h2>
        <Row className="p-4">
          <Col sm="12" md="3">
            <div className="p-3 super-user-finance-upcoming">
              <h3 className="text-uppercase">Fake Company D</h3>
              <div className="d-flex justify-content-around align-items-center">
                <h4 className="text-center">1/27: </h4>
                <p>$70</p>
              </div>
            </div>
          </Col>
          <Col sm="12" md="3">
            <div className="p-3 super-user-finance-upcoming">
              <h3 className="text-uppercase">Fake Company B</h3>
              <div className="d-flex justify-content-around align-items-center">
                <h4 className="text-center">1/30: </h4>
                <p>$133</p>
              </div>
            </div>
          </Col>
          <Col sm="12" md="3">
            <div className="p-3 super-user-finance-upcoming">
              <h3 className="text-uppercase">Fake Company A</h3>
              <div className="d-flex justify-content-around align-items-center">
                <h4 className="text-center">2/3: </h4>
                <p>$126</p>
              </div>
            </div>
          </Col>
          <Col sm="12" md="3">
            <div className="p-3 super-user-finance-upcoming">
              <h3 className="text-uppercase">Fake Company C</h3>
              <div className="d-flex justify-content-around align-items-center">
                <h4 className="text-center">2/9: </h4>
                <p>$77</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SuperUserFinance;
