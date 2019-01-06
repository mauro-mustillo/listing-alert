import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { GET_COMPANY_BY_ID } from '../../../graphql/queries';
import CompanyForm from '../../common/CompanyForm/CompanyForm';

class CompanyEditForm extends Component {
  onChange(val, key) {
    this.setState({ [key]: val });
  }

  handleSubmit(data) {
    this.props.onSubmit(data);
  }

  render() {
    const { id } = this.props;
    if (id) {
      return (
        <Query
          query={GET_COMPANY_BY_ID}
          variables={{ id }}
        >
          {({ loading, error, data }) => {
            if (loading) return <h1>Loading...</h1>;
            if (error) return <h1>Error. Bummer.</h1>;
            if (data) {
              return (
                <CompanyForm
                  data={data.getCompanyById}
                  id={id}
                  onSubmit={submitData => this.handleSubmit(submitData)}
                />
              );
            }
            return null;
          }}
        </Query>
      );
    }
    return <CompanyForm onSubmit={submitData => this.handleSubmit(submitData)} />;
  }
}

export default CompanyEditForm;
