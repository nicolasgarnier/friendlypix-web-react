// @flow

import { SET_PROFILE_SEARCH_TERM, SET_FIREBASE_CUSTOM_AUTH_TOKEN } from './actions';

export const profileSearchTerm = (state = '', action: Action) => {
  if (action.type === SET_PROFILE_SEARCH_TERM) {
    return action.payload;
  }
  return state;
};

export const firebaseCustomAuthToken = (state = {}, action: Action) => {
  if (action.type === SET_FIREBASE_CUSTOM_AUTH_TOKEN) {
    return action.payload;
  }
  return state;
};
