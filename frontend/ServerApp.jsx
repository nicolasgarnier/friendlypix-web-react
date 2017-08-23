// @flow

import React from 'react';
import { Provider } from 'react-redux';
import Routes from './Routes';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import createHistory from 'history/createMemoryHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import * as  reducers from './reducers';
import { firebaseReducer, firebaseMiddleware } from './firebase/firebaseRedux';
import firebase from 'firebase/app';

// Loads Firebase.
export const firebaseApp = firebase.initializeApp(require('./firebase-config.json').result);
const firebaseAppMiddleware = firebaseMiddleware(firebaseApp);

// Create the history.
export const history = createHistory();
const historyMiddleware = routerMiddleware(history);

export const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
    firebase: firebaseReducer
  }),
  compose(
    applyMiddleware(thunk),
    applyMiddleware(historyMiddleware),
    applyMiddleware(firebaseAppMiddleware)
  )
);

/**
 * Loads the App in a server context.
 */
export class ServerApp extends React.Component {

  /**
   * @inheritDoc
   */
  constructor(props) {
    super(props);
  }

  /**
   * Properties types.
   */
  props: {
  };

  /**
   * @inheritDoc
   */
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes/>
        </ConnectedRouter>
      </Provider>
    );
  }
}
