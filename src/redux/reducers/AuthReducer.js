import { LOGIN, LOGOUT } from '../actions/types';

const INITIAL_STATE = { id: '', role: 0, token: null };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, id: action.payload.id, role: action.payload.role, token: action.payload.token };
    case LOGOUT:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
