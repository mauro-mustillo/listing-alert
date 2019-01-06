import gql from 'graphql-tag';

export const LOGIN = gql`
mutation ($email: String!, $password: String!) {
  login (
    email: $email
    password: $password
  ) {
    token
    result
    id
    role
  }
}
`;

export const ADD_COMPANY = gql`
mutation ($email: String!, $companyName: String!, $password: String!, $streetAddr: String, $city: String
  $state: String, $zip: String, $phone: String, $packageType: Int!
) {
  addCompany (
    email: $email,
    companyName: $companyName,
    password: $password,
    streetAddr: $streetAddr,
    city: $city,
    state: $state,
    zip: $zip,
    phone: $phone,
    packageType: $packageType,
    role: 2
  ) {
    insertedId
  }
}
`;

export const UPDATE_COMPANY = gql`
  mutation ($email: String!, $companyName: String!, $streetAddr: String, $city: String,
    $state: String, $zip: String, $phone: String, $id: String!
  ) {
    updateCompany (
      id: $id,
      email: $email,
      companyName: $companyName,
      streetAddr: $streetAddr,
      city: $city,
      state: $state,
      zip: $zip,
      phone: $phone
    ) {
      n
      nModified
      ok
    }
  } 
`;

export const GET_LIST_OF_COMPANIES = gql`
  query {
    getCompanies {
      _id
      email
      companyName
      streetAddr
      city
      state
      zip
      phone
      createdAt
      users {
        _id
        createdAt
        listings {
          _id
          streetAddr
          city
          state
          zip
          contactNo
          beds
          baths
          sqFt
          createdAt
        }
      }
      
    }
  }
`;

export const GET_COMPANY_BY_ID = gql`
  query ($id: String, $sortUserBy: String, $sortUserOrder: String) {
    getCompanyById ( id: $id, sortUserBy: $sortUserBy, sortUserOrder: $sortUserOrder ) {
      companyName
      email
      phone
      streetAddr
      city
      state
      zip
      packageType
      users {
        firstName
        lastName
        email
        phone
        licenseNo
        companyId
        _id
        listings {
          _id
          streetAddr
          city
          state
          zip
          contactNo
          beds
          baths
          sqFt
          createdAt
        }
      }
    }
  }
`;

export const SEARCH_COMPANIES = gql`
  query ($search: String) {
    searchCompanies (search: $search) {
      companyName
      email
      streetAddr
      city
      state
      zip
      _id
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query ($userId: String) {
    getUserById (userId: $userId) {
      firstName
      lastName
      phone
      email
      licenseNo
      companyId
      listings {
        streetAddr
        city
        zip
      }
    }
  }
`;

export const ADD_USER_TO_COMPANY = gql`
  mutation ($companyId: String, $firstName: String, $lastName: String, $phone: String, $email: String, $password: String, $licenseNo: String) {
    addUser (
      companyId: $companyId,
      firstName: $firstName,
      lastName: $lastName,
      phone: $phone,
      email: $email,
      password: $password,
      licenseNo: $licenseNo
    ) {
      insertedId
    }
  }
`;

export const DELETE_USER_FROM_COMPANY = gql`
  mutation ($companyId: String, $userId: String) {
    deleteUser(
      companyId: $companyId,
      userId: $userId
    ) {
      n
      ok
    }
  }
`;

export const UPDATE_USER_FROM_COMPANY = gql`
  mutation ($userId: String, $firstName: String, $lastName: String, $phone: String, $email: String, $licenseNo: String) {
    updateUser (
      userId: $userId,
      firstName: $firstName,
      lastName: $lastName,
      phone: $phone,
      email: $email,
      licenseNo: $licenseNo
    ) {
      n
      ok
      error
    }
  }
`;

export const SEARCH_USERS_IN_COMPANY = gql`
  query ($search: String, $id: String) {
    searchUser(
      search: $search,
      id: $id
    ) {
      firstName
      lastName
      email
      phone
      licenseNo
      _id
    }
  }
`;
