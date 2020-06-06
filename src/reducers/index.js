import { combineReducers } from 'redux';
import CommonReducer from "./CommonReducer";
import LandingpageReducers from '../pages/landing/reducers/LandingpageReducers';

export default combineReducers({
  common: CommonReducer,
  landing: LandingpageReducers
});