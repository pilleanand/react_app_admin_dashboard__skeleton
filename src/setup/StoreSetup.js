import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from '../sagas';
import reducers from '../reducers';

const configureStore = () => {
  const initialState = window.INITIAL_STATE;
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducers, initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__())
      : applyMiddleware(sagaMiddleware),
  );
  sagaMiddleware.run(sagas);
  return store;
};

export default configureStore;
