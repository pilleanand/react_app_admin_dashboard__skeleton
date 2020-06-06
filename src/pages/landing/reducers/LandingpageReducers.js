import { LANDING_STATS } from '../constants/LandingActionTypes';

const INITAL_STATE = {
  page: 'landing page',
  stats: 0
}

export default (state = INITAL_STATE, action) => {
  let currentState = state;
  switch (action.type) {
    case LANDING_STATS.LANDING_STATS_FETCH:
      console.log('coming to the landing page reducser current switch case', action.payload);
      currentState = {
        stats: 10
      }
      break;
    default: break;
  }
  return currentState;
}