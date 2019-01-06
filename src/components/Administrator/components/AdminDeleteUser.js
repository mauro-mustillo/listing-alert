import React from 'react';
import { Mutation } from 'react-apollo';
import { Button } from 'reactstrap';
import { DELETE_USER_FROM_COMPANY, GET_COMPANY_BY_ID } from '../../../graphql/queries';

const AdminDeleteUser = (props) => {
  const { companyId, userId, onDelete } = props;
  return (
    <Mutation
      mutation={DELETE_USER_FROM_COMPANY}
      variables={{
        companyId,
        userId,
      }}
      onCompleted={data => onDelete(data)}
      refetchQueries={[{ query: GET_COMPANY_BY_ID, variables: { id: companyId } }]}
    >
      {(deleteUser) => {
        return (
          <Button color="secondary" outline onClick={deleteUser}>Delete User</Button>
        );
      }}
    </Mutation>
  );
};

export default AdminDeleteUser;
