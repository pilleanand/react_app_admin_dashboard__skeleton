
import { all, takeLatest } from 'redux-saga/effects';

export default function* () {
  yield all([
    takeLatest('LANDING_STATS_FETCH', sagaFunName)
  ]);
}

function* sagaFunName(action) {
  console.log('yes coming to saga fun:', action);
  yield action;
  // return action;
}