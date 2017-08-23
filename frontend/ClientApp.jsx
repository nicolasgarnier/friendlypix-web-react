import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './Routes';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import * as reducers from './reducers';
import { firebaseReducer, firebaseMiddleware, authReady } from './firebase/firebaseRedux';
import firebase from 'firebase/app';

/**
 * Loading the App in a client context.
 */

const firebaseApp = firebase.initializeApp(require('./firebase-config.json').result);
const firebaseAppMiddleware = firebaseMiddleware(firebaseApp);

const history = createHistory();
const historyMiddleware = routerMiddleware(history);

const initialState = window.__REDUX_STATE__;

export const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
    firebase: firebaseReducer
  }),
  initialState,
  compose(
    applyMiddleware(thunk),
    applyMiddleware(historyMiddleware),
    applyMiddleware(firebaseAppMiddleware),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )
);

// Once Firebase auth is ready, display the app.
authReady.then(() => {
  // Render the app.
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes/>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
  );
});
