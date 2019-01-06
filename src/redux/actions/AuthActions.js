import { LOGIN, LOGOUT } from './types';

export const loginUser = ({ id, role, token }) => {
  return {
    type: LOGIN,
    payload: { id, role, token },
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
    payload: null,
  };
};
