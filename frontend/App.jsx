/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for t`he specific language governing permissions and
 * limitations under the License.
 */
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
import { whenAuthReady, copyIdTokenToCookie } from './firebaseTools';

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
  copyIdTokenToCookie(firebaseApp, '__session');

  const history = createBrowserHistory();
  const store = makeStore(history, firebaseApp, window.__REDUX_STATE__);
  whenAuthReady(store).then(() => {
    // Render the app.
    ReactDOM.render(<App store={store} history={history}/>, document.getElementById('app'));
  });
}
