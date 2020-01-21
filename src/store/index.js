import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './rootReducer';
import sagas from './rootSaga';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (hydrateState = {}) => {
  const middleware = [sagaMiddleware];

  // mount it on the Store
  const store = createStore(
    reducer,
    hydrateState,
    composeEnhancers(applyMiddleware(...middleware)),
  );

// then run the saga
  sagaMiddleware.run(sagas);

  return store;
};
