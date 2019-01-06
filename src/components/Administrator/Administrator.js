import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { Collapse } from 'reactstrap';
import { GET_COMPANY_BY_ID } from '../../graphql/queries';
import SearchForm from '../common/SearchForm/SearchForm';
import {
  AdminUserForm,
  AdminUserList,
  AdminHeaderBar,
  AdminSearchResults,
  AdminBilling,
  AdminUserDetail,
  AdminHome,
} from './components';
import ListingAlert from '../../assets/icons/logo-header.png';
import './Administrator.scss';

const mapStateToProps = state => ({
  auth: state.auth,
});

// TODO: check to make sure the current user logged in matches the params
// OR they are a super user. if not, display an unauthorized page

class AdministratorComponent extends Component {
  state = {
    editData: null,
    searchFormResults: null,
    view: 'main',
    selectedUser: null,
    collapse: {
      users: false,
    },
  };

  companyName = null;

  handleAdd(data) {
    // TODO: If user was created, email them
    this.setState({ editData: null, view: 'list' });
  }

  handleDelete(data) {
    // TODO: If we end up not needing post-delete actions, this method can be deleted
  }

  handleSelect(user) {
    this.setState({ selectedUser: user, view: 'select' });
  }

  renderMain(data) {
    return (
      <AdminHome data={data} />
    );
  }

  renderList(data) {
    const companyId = this.props.match.params.id;
    const { users } = data.getCompanyById;
    return (
      <div className="p-5">
        <AdminUserList
          users={users}
          companyId={companyId}
          onSelect={user => this.handleSelect(user)}
          onEdit={(data) => {
            this.setState({ editData: data.editData, view: 'edit' });
          }}
        />
      </div>
    );
  }

  renderSearchForm() {
    return (
      <div className="p-5 lato">
        <div className="p-5 d-flex flex-column align-items-center admin-search-form">
          <h3 className="mb-5">Please Input a first name, last name, or license number in the form below:</h3>
          <SearchForm onSubmit={(formData) => { this.setState({ view: 'search', searchFormResults: formData.search }) }} />
        </div>
      </div>
    );
  }

  renderSearch() {
    const companyId = this.props.match.params.id;
    const { searchFormResults } = this.state;
    return (
      <div className="p-5">
        {searchFormResults ? <AdminSearchResults onSelect={user => this.handleSelect(user)} search={searchFormResults} id={companyId} /> : null}
      </div>
    );
  }

  renderBilling(data) {
    const companyId = this.props.match.params.id;
    return <AdminBilling id={companyId} data={data} />;
  }

  renderSelect() {
    const { selectedUser } = this.state;
    return <AdminUserDetail id={selectedUser} />;
  }

  renderEdit() {
    const { editData } = this.state;
    return (
      <AdminUserForm
        onCancel={() => { this.setState({ view: 'main', editData: null }); }}
        onSubmit={(data) => { this.handleAdd(data); }}
        companyId={this.props.auth.id}
        data={editData}
      />
    );
  }

  renderBody(data) {
    const { view } = this.state;
    switch (view) {
      case 'main':
        return this.renderMain(data);
      case 'list':
        return this.renderList(data);
      case 'search-form':
        return this.renderSearchForm();
      case 'search':
        return this.renderSearch();
      case 'billing':
        return this.renderBilling(data);
      case 'select':
        return this.renderSelect();
      case 'add':
      case 'edit':
        return this.renderEdit();
      default:
        return null;
    }
  }

  toggleCollapse(key) {
    this.setState((prevState) => {
      return { collapse: { [key]: !prevState.collapse[key] } };
    });
  }

  render() {
    const { id } = this.props.match.params;
    const { users } = this.state.collapse;
    const { view } = this.state;
    return (
      <div className="d-flex">
        {/* Begin Sidebar */}
        <div className="admin-side-bar d-flex flex-column align-items-center lato">
          <img src={ListingAlert} alt="listing alert icon" width="200" className="mt-5 mb-5" />
          <button type="button" className="admin-side-bar-collapse-trigger" onClick={() => this.setState({ view: 'main' })}>
            <div className="d-flex align-items-center">
              <p className="mr-4">IC</p>
              <p className={view === 'main' ? 'white-color' : null}>Home</p>
            </div>
          </button>
          <button type="button" className="admin-side-bar-collapse-trigger" onClick={() => this.toggleCollapse('users')}>
            <div className="d-flex align-items-center">
              <p className="mr-4">IC</p>
              <p className={view !== 'billing' && view !== 'main' ? 'white-color' : null}>Users</p>
            </div>
          </button>
          <Collapse isOpen={users}>
            <ul className="admin-side-bar-collapse-list">
              <li onClick={() => this.setState({ view: 'list' })} className={view === 'list' ? 'white-color' : null}>List Users</li>
              <li onClick={() => this.setState({ view: 'add', editData: null })} className={view === 'add' ? 'white-color' : null}>Add Users</li>
              <li>Delete Users</li>
              <li>Update Users</li>
              <li onClick={() => this.setState({ view: 'search-form', editData: null })}className={view === 'search' || view === 'search-form' ? 'white-color' : null}>Search Users</li>
            </ul>
          </Collapse>
          <button type="button" className="admin-side-bar-collapse-trigger" onClick={() => this.setState({ view: 'billing' })}>
            <div className="d-flex align-items-center">
              <p className="mr-4">IC</p>
              <p className={view === 'billing' ? 'white-color' : null}>Billing</p>
            </div>
          </button>
        </div>
        {/* End Sidebar */}
        <Query
          query={GET_COMPANY_BY_ID}
          variables={{
            id,
            sortUserBy: 'createdAt',
            sortUserOrder: 'DESC',
          }}
        >
          {({ loading, error, data }) => {
            if (loading) { return <h1>Loading...</h1>; }
            if (error) { return <h1>There was an error</h1>; } // TODO: Error handle
            if (data) {
              const { companyName } = data.getCompanyById;
              return (
                <div className="admin-right-side">
                  <div className="admin-header-bar d-flex">
                    <AdminHeaderBar submit={(formData) => { this.setState({ searchFormResults: formData.search, view: 'search' }); }} companyName={companyName} />
                  </div>
                  <div className="admin-main-body">
                    {this.renderBody(data)}
                  </div>
                </div>
              );
            }
            return null;
          }}
        </Query>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(AdministratorComponent);
