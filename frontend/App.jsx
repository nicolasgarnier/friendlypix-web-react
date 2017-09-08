// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './Routes';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { canUseDOM } from 'exenv';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import * as reducers from './reducers';
import firebase from 'firebase/app';
import 'firebase/auth';
import { reactReduxFirebase, getFirebase, firebaseStateReducer } from 'react-redux-firebase';
import firebaseTools from './firebase/firebaseTools';

/**
 * Loads the App in a server context.
 */
export class App extends React.Component {
  /**
   * Properties types.
   */
  props: {
    store: Object,
    history: Object
  };

  /**
   * @inheritDoc
   */
  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <Routes/>
        </ConnectedRouter>
      </Provider>
    );
  }
}
/**
 * Create the redux store given a history manager.
 *
 * @param {Object} history - The History manager to use.
 * @param {Object} firebaseApp - The Firebase App instance to use.
 * @param {Object} initialState - The initial state of the Redux store.
 * @return {Object} - The store.
 */
export function makeStore(history, firebaseApp, initialState = {}) {
  const historyMiddleware = routerMiddleware(history);
  return createStore(
    combineReducers({
      ...reducers,
      router: routerReducer,
      firebaseState: firebaseStateReducer
    }),
    initialState,
    compose(
      applyMiddleware(thunk.withExtraArgument(getFirebase)),
      applyMiddleware(historyMiddleware),
      reactReduxFirebase(firebaseApp, {enableRedirectHandling: false})
    )
  );
}

// On the client, display the app.
if (canUseDOM) {
  // Get the Firebase config from the auto generated file.
  const firebaseConfig = require('./firebase-config.json').result;

  // Instantiate a Firebase app.
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  // Make sure we copy the ID Token to the __session cookie.
  firebaseTools(firebaseApp).copyIdTokenToCookie('__session');

  const history = createBrowserHistory();
  const store = makeStore(history, firebaseApp, window.__REDUX_STATE__);
  // Render the app.
  ReactDOM.render(<App store={store} history={history}/>, document.getElementById('app'));
}
