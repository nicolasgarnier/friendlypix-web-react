import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import Routes from './Routes';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as  reducers from './reducers';

export const store = createStore(
  combineReducers({...reducers}),
  applyMiddleware(thunk)
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
    url: string,
    context: Object
  };

  /**
   * @inheritDoc
   */
  render() {
    return (
      <Provider store={store}>
        <StaticRouter location={this.props.url} context={this.props.context}>
          <Routes/>
        </StaticRouter>
      </Provider>
    );
  }
}
