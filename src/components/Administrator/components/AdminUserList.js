import React from 'react';
import { Button } from 'reactstrap';
import AdminDeleteUser from './AdminDeleteUser';
import Paginator from '../../common/Paginator/Paginator';
import './AdminUserList.scss';

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

const AdminList = (props) => {
  const { users } = props;
  return (
    <div>
      <h4>{users.length === 0 ? 'You have no users at this time.' : null}</h4>
      <Paginator data={users} onRender={(data) => renderListItem(data, props)} />
    </div>
  );
};

export default AdminList;