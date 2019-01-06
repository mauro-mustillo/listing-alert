import React, { Component } from 'react';
import { Button } from 'reactstrap';
import SearchForm from '../../common/SearchForm/SearchForm';
import LogOut from '../../Logout/Logout';
import '../SuperUser.scss';

class SuperUserHeader extends Component {
  state = {
    logout: false,
  }

  handleLogout() {
    this.setState({ logout: false });
  }

  render() {
    const { companyName, submit } = this.props;
    const { logout } = this.state;
    return (
      <div className="superuser-header-bar d-flex justify-content-between w-100 lato align-items-center pl-2 pr-2">
        <SearchForm onSubmit={(formData) => { submit(formData); }} />
        <div className="d-flex">
          <h3 className="mb-0">{companyName}</h3>
          <Button
            className="lato ml-4"
            color="primary"
            onClick={() => this.setState({ logout: true })}
          >
            LOGOUT
          </Button>
        </div>
        {logout ? <LogOut onFinish={() => this.handleLogout()} /> : null}
      </div>
    );
  }
}

export default SuperUserHeader;
