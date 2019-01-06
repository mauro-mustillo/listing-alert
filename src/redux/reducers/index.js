import { combineReducers } from 'redux';
import TempReducer from './TempReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
  auth: AuthReducer,
  temp: TempReducer,
});
