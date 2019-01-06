import React from 'react';
import { Query } from 'react-apollo';
import { Button } from 'reactstrap';
import AdminDeleteUser from './AdminDeleteUser';
import Paginator from '../../common/Paginator/Paginator';
import { SEARCH_USERS_IN_COMPANY } from '../../../graphql/queries';

const renderListItem = (data, props) => {
  const { firstName, lastName, phone, email, licenseNo, _id } = data;
  const { onSelect, onEdit, companyId } = props;
  return (
    <div className="d-flex mb-4 p-2 admin-user-list-item" key={_id}>
      <div className="w-50 admin-user-list-left lato">
        <h1 className="text-uppercase">{firstName} {lastName}</h1>
        <p>{phone}</p>
        <p>License Number: {licenseNo}</p>

      </div>
      <div className="w-50 d-flex justify-content-end align-items-center">
        <Button className="admin-user-list-button" onClick={() => onSelect(_id)} color="primary-light" outline>Select</Button>
        <Button
          className="admin-user-list-button"
          onClick={() => {
            onEdit({
              editData: {
                firstName,
                lastName,
                email,
                phone,
                licenseNo,
                id: _id,
              },
            });
          }}
          color="primary-light mr-4 ml-4"
          outline
        >
          Edit
        </Button>
        <AdminDeleteUser
          className="ml-3"
          companyId={companyId}
          userId={_id}
        />
      </div>
    </div>
  );
};

const AdminSearchFormResults = (props) => {
  const { search, id } = props;
  return (
    <Query
      query={SEARCH_USERS_IN_COMPANY}
      variables={{ search, id }}
    >
      {({ loading, error, data }) => {
        if (loading) return (<h2>Loading search results...</h2>);
        if (error) {
          return (
            <div>
              <h2>There was an error in the search</h2>
            </div>
          );
        }
        if (data) {
          const { searchUser } = data;
          return (!searchUser || searchUser.length < 1)
            ? <h1 className="text-center lato">There are no search results to display. Try entering something else!</h1>
            : <Paginator data={searchUser} onRender={(data) => renderListItem(data, props)} />;
        }
        return null;
      }}
    </Query>
  );
};

export default AdminSearchFormResults;
