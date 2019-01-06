import React, { Component } from 'react';
import { Button } from 'reactstrap';
import SearchForm from '../../common/SearchForm/SearchForm';
import LogOut from '../../Logout/Logout';
import '../Administrator.scss';

class AdminHeader extends Component {
  state = {
    logout: false,
  }

  render() {
    const { companyName, submit } = this.props;
    const { logout } = this.state;
    return (
      <div className="admin-header-bar d-flex justify-content-between w-100 lato align-items-center pl-2 pr-2">
        <SearchForm onSubmit={(formData) => { submit(formData); }} />
        <div className="d-flex align-items-center">
          <p className="mr-2 mb-0 white-color">Welcome</p>
          <p className="mb-0 white-color">{companyName}</p>
          <Button
            className="lato ml-4"
            color="primary"
            onClick={() => this.setState({ logout: true })}
          >
            LOGOUT
          </Button>
        </div>
        {logout ? <LogOut /> : null}
      </div>
    );
  }
}

export default AdminHeader;
