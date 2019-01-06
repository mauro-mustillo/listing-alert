import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import Paginator from '../../common/Paginator/Paginator';
import { GET_LIST_OF_COMPANIES } from '../../../graphql/queries';
import './CompanyList.scss';


class CompanyList extends Component {
  state = {
    redirect: null,
  }

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
    const { redirect } = this.state;
    return (
      <div className="p-5">
        <Query
          query={GET_LIST_OF_COMPANIES}
        >
          {({ loading, error, data }) => {
            if (loading) return <h1>Loading list...</h1>;
            if (error) return <h1>Error getting list :(</h1>;
            if (data) {
              return (
                <div>
                  <Paginator
                    data={data.getCompanies}
                    onRender={renderData => this.renderCompanyItem(renderData)}
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

export default CompanyList;
