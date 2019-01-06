import React from 'react';
import { Query } from 'react-apollo';
import { GET_USER_BY_ID } from '../../../graphql/queries';

const AdminUserDetail = (props) => {
  const { id } = props;
  return (
    <div>
      <Query
        query={GET_USER_BY_ID}
        variables={{ userId: id }}
      >
        {({ loading, error, data }) => {
          if (loading) { return <h1>Loading...</h1>; }
          if (error) { return <h1>There was an error...</h1>; }
          if (data) {
            const { firstName, lastName, email, phone, listings } = data.getUserById;
            return (
              <div className="lato">
                <p>
                  Name:
                  {firstName}
                  &nbsp;
                  {lastName}
                </p>
                <p>
                  Email:
                  {email}
                </p>
                <p>
                  Phone:
                  {phone}
                </p>
                <p>
                  Listings:
                  {listings.length}
                </p>
              </div>
            );
          }
          return null;
        }}
      </Query>
    </div>
  );
};

export default AdminUserDetail;
