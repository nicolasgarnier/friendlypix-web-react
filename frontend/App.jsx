import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './Routes';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { canUseDOM } from 'exenv';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import * as reducers from './reducers';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { reactReduxFirebase, getFirebase, firebaseStateReducer } from 'react-redux-firebase';
import firebaseTools from  './firebase/firebaseTools';

/**
 * Loading the App in a client context.
 */

// Get the Firebase config from the auto generated file.
const firebaseConfig = require('./firebase-config.json').result;

// Instantiate a Firebase app.
export const firebaseApp = firebase.initializeApp(firebaseConfig);

// Make sure we copy the ID Token to the __session cookie.
firebaseTools(firebaseApp).copyIdTokenToCookie('__session');

// Create the history middleware for the right environment.
export const history = canUseDOM ? createBrowserHistory() : createMemoryHistory();
const historyMiddleware = routerMiddleware(history);

// Getting the Redux initial state from the isomorphic server on the client.
const initialState = canUseDOM ? window.__REDUX_STATE__ : {};

export const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
    firebaseState: firebaseStateReducer
  }),
  initialState,
  compose(
    applyMiddleware(thunk.withExtraArgument(getFirebase)),
    applyMiddleware(historyMiddleware),
    reactReduxFirebase(firebase, {enableRedirectHandling: false})
  )
);

/**
 * Loads the App in a server context.
 */
export class App extends React.Component {
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

// On the client, display the app.
if (canUseDOM) {
  // Render the app.
  ReactDOM.render(
    <App/>,
    document.getElementById('app')
  );
}
