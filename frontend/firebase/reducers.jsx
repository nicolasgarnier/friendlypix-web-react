// @flow

import * as actions from './actions';


export const currentUser = (state = null, action: FirebaseAction) => {
  if (action.type === actions.SET_CURRENT_USER) {
    return JSON.parse(JSON.stringify(action.payload));
  }
  return state;
};

export const idToken = (state = null, action: FirebaseAction) => {
  if (action.type === actions.SET_ID_TOKEN) {
    return action.payload;
  }
  return state;
};

export const isAuthReady = (state = false, action: FirebaseAction) => {
  if (action.type === actions.SET_AUTH_READY) {
    return action.payload;
  }
  return state;
};
