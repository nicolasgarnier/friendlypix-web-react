// @flow

import { SET_FIREBASE_CUSTOM_AUTH_TOKEN, SET_PROFILE_SEARCH_TERM } from './actions';

/**
 * Sets the profile search term.
 *
 * @param {string} searchTerm - The new search term to set.
 * @return {{type, payload: string}}
 */
export function setProfileSearchTerm(searchTerm: string) {
  return { type: SET_PROFILE_SEARCH_TERM, payload: searchTerm };
}

/**
 * Add Data using the API.
 *
 * @param {String} token
 * @return {{type, payload: string}}
 */
export function setFirebaseCustomAuthToken(token: string) {
  return { type: SET_FIREBASE_CUSTOM_AUTH_TOKEN, payload: token };
}
