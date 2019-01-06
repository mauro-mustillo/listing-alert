import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import { Query } from 'react-apollo';
import SearchForm from '../common/SearchForm/SearchForm';
import {
  CompanySearchResults, CompanyList, CompanyEditForm,
  SuperUserHome, SuperUserFinance, SuperUserHeader,
} from './components';
import { GET_LIST_OF_COMPANIES } from '../../graphql/queries';
import ListingAlert from '../../assets/icons/logo-header.png';
import './SuperUser.scss';

class SuperUserComponent extends Component {
  state = {
    idToEdit: null,
    view: 'main',
    searchFormResults: null,
    collapse: {
      users: false,
      companies: false,
    },
  };

  finishEdit() {
    this.setState({ idToEdit: null, view: 'main' });
  }

  triggerEdit(id) {
    this.setState({ idToEdit: id });
  }

  toggleCollapse(key) {
    this.setState(prevState => ({ collapse: { [key]: !prevState.collapse[key] } }));
  }

  renderList() {
    return (
      <CompanyList
        onEdit={({ id }) => { this.setState({ view: 'edit', idToEdit: id }); }}
      />
    );
  }

  renderMain(data) {
    return (
      <div className="lato p-5">
        <p>Breadcrumbs</p>
        <SuperUserHome data={data} />
      </div>
    );
  }

  renderEdit() {
    const { idToEdit } = this.state;
    return (
      <div className="p-5">
        <CompanyEditForm
          id={idToEdit}
          onSubmit={() => this.finishEdit()}
        />
      </div>
    );
  }

  renderSearchForm() {
    return (
      <div className="p-5 lato">
        <div className="p-5 d-flex flex-column align-items-center admin-search-form">
          <h3 className="mb-5">Please Input a company name or email in the form below:</h3>
          <SearchForm onSubmit={(formData) => { this.setState({ view: 'search', searchFormResults: formData.search }); }} />
        </div>
      </div>
    );
  }

  renderSearchResults() {
    const { searchFormResults } = this.state;
    return (
      <div className="p-5">
        <CompanySearchResults
          search={searchFormResults}
          onEdit={({ id }) => { this.setState({ view: 'edit', idToEdit: id }); }}
        />
      </div>
    );
  }

  renderFinance(data) {
    return (
      <div className="p-5 lato">
        <SuperUserFinance data={data} />
      </div>
    );
  }

  renderBody(data) {
    const { view } = this.state;
    switch (view) {
      case 'list':
        return this.renderList();
      case 'main':
        return this.renderMain(data);
      case 'add':
      case 'edit':
        return this.renderEdit();
      case 'search':
        return this.renderSearchResults();
      case 'search-form':
        return this.renderSearchForm();
      case 'finance':
        return this.renderFinance(data);
      default:
        return null;
    }
  }

  render() {
    const { view } = this.state;
    const { companies } = this.state.collapse;
    return (
      <div className="d-flex">
        {/* Begin Sidebar */}
        <div className="superuser-side-bar d-flex flex-column align-items-center lato">
          <img src={ListingAlert} alt="listing alert icon" width="200" className="mb-5 mt-5" />
          <button type="button" className="superuser-side-bar-collapse-trigger" onClick={() => this.setState({ view: 'main' })}>
            <div className="d-flex align-items-center">
              <p className="mr-4">IC</p>
              <p className={view === 'main' ? 'white-color' : null}>Home</p>
            </div>
          </button>
          <button type="button" className="superuser-side-bar-collapse-trigger" onClick={() => this.toggleCollapse('companies')}>
            <div className="d-flex align-items-center">
              <p className="mr-4">IC</p>
              <p className={view === 'list' || view === 'edit' ? 'white-color' : null}>Companies</p>
            </div>
          </button>
          <Collapse isOpen={companies}>
            <ul className="superuser-side-bar-collapse-list">
              <li onClick={() => this.setState({ view: 'list' })} className={view === 'list' ? 'white-color' : null}>List Companies</li>
              <li onClick={() => this.setState({ view: 'add', idToEdit: null })} className={view === 'add' ? 'white-color' : null}>Add Companies</li>
              <li>Delete Companies</li>
              <li>Update Companies</li>
              <li onClick={() => this.setState({ view: 'search-form' })} className={view === 'search-form' ? 'white-color' : null}>Search Companies</li>
            </ul>
          </Collapse>
          <button type="button" className="superuser-side-bar-collapse-trigger" onClick={() => this.setState({ view: 'finance' })}>
            <div className="d-flex align-items-center">
              <p className="mr-4">IC</p>
              <p className={view === 'finance' ? 'white-color' : null}>Finances</p>
            </div>
          </button>
          <button type="button" className="superuser-side-bar-collapse-trigger" onClick={() => this.setState({ view: 'billing' })}>
            <div className="d-flex align-items-center">
              <p className="mr-4">IC</p>
              <p className={view === 'billing' ? 'white-color' : null}>Google Analytics</p>
            </div>
          </button>
        </div>
        {/* End Sidebar */}
        <div className="superuser-right-side">
          <Query
            query={GET_LIST_OF_COMPANIES}
          >
            {({ loading, error, data }) => {
              if (loading) { return <h1>Loading...</h1>; }
              if (error) { return <h1>There was an error...</h1>; }
              if (data) {
                return (
                  <div>
                    <div className="superuser-header-bar d-flex">
                      <SuperUserHeader submit={(formData) => { this.setState({ searchFormResults: formData.search, view: 'search', idToEdit: null }); }} companyName="Super User" />
                    </div>
                    <div className="superuser-main-body">
                      {this.renderBody(data)}
                    </div>
                  </div>
                );
              }
              return null;
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default SuperUserComponent;
