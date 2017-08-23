// @flow

import { SET_PROFILE_SEARCH_TERM } from './actions';

export const profileSearchTerm = (state = '', action: Action) => {
  if (action.type === SET_PROFILE_SEARCH_TERM) {
    return action.payload;
  }
  return state;
};
