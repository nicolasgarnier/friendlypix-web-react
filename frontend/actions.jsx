// @flow

export const SET_PROFILE_SEARCH_TERM = 'SET_PROFILE_SEARCH_TERM';


/**
 * Sets the profile search term.
 *
 * @param {string} searchTerm - The new search term to set.
 * @return {{type, payload: string}}
 */
export function setProfileSearchTerm(searchTerm: string) {
  return { type: SET_PROFILE_SEARCH_TERM, payload: searchTerm };
}
