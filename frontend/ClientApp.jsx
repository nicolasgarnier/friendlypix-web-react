import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './Routes';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import * as reducers from './reducers';

/**
 * Loading the App in a client context.
 */

const history = createHistory();
const historyMiddlware = routerMiddleware(history);

const initialState = window.__REDUX_STATE__;

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  initialState,
  compose(
    applyMiddleware(thunk),
    applyMiddleware(historyMiddlware),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )
);

// Render the app.
ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes/>
    </ConnectedRouter>
  </Provider>
  ), document.getElementById('app')
);
