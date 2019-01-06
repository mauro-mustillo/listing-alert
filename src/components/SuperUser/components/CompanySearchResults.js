import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import { SEARCH_COMPANIES } from '../../../graphql/queries';
import Paginator from '../../common/Paginator/Paginator';
import './CompanyList.scss';

class CompanySearchResults extends Component {
  state = {
    redirect: null,
  };

  redirectToAdmin(id) {
    return (<Redirect to={`../../administrator/${id}/`} push />);
  }

  renderCompanyItem(data) {
    const {
      companyName, streetAddr, city, state, zip, email, _id,
    } = data;
    const { onEdit } = this.props;
    return (
      <div className="d-flex mb-4 p-2 superuser-list-item" key={_id}>
        <div className="w-50 superuser-list-left lato">
          <h1 className="text-uppercase">{companyName}</h1>
          <p>{email}</p>
          <p>{streetAddr}</p>
          <p>{city}, {state} {zip}</p>
        </div>
        <div className="w-50 d-flex justify-content-end align-items-center">
          <Button className="superuser-list-button" onClick={() => this.setState({ redirect: _id })} color="primary-light" outline>Select</Button>
          <Button
            className="superuser-list-button"
            onClick={() => {
              onEdit({
                id: _id,
              });
            }}
            color="primary-light mr-4 ml-4"
            outline
          >
            Edit
          </Button>
          <Button color="secondary" outline>Delete</Button>
        </div>
      </div>
    );
  }

  render() {
    const { search } = this.props;
    const { redirect } = this.state;
    return (
      <div>
        <Query
          query={SEARCH_COMPANIES}
          variables={{ search }}
        >
          {({ loading, error, data }) => {
            if (loading) return <h2>Fetching search results</h2>;
            if (error) return <h2>There was an error in the search</h2>;
            if (data) {
              if (!data.searchCompanies || data.searchCompanies.length === 0) {
                return (
                  <div className="lato text-center">
                    <h3>The search came back empty. Try entering something else?</h3>
                  </div>
                );
              }
              return (
                <div>
                  <Paginator
                    data={data.searchCompanies}
                    onRender={searchData => this.renderCompanyItem(searchData)}
                  />
                </div>
              );
            }
            return null;
          }}
        </Query>
        {redirect ? this.redirectToAdmin(redirect) : null}
      </div>
    );
  }
}

export default CompanySearchResults;
