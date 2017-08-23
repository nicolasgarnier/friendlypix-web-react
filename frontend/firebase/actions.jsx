// @flow

export const actionsPrefix = '@@firebase';

export const SET_CURRENT_USER = `${actionsPrefix}/SET_CURRENT_USER`;
export const SET_AUTH_READY = `${actionsPrefix}/SET_AUTH_READY`;
export const SET_ID_TOKEN = `${actionsPrefix}/SET_ID_TOKEN`;
export const SET_FIREBASE_INSTANCE = `${actionsPrefix}/SET_FIREBASE_INSTANCE`;

/**
 * Sets the Firebase ID Token
 *
 * @param {string} idToken - The Firebase ID Token.
 * @return {{type, payload: string}}
 */
export function setIdToken(idToken: string) {
  return { type: SET_ID_TOKEN, payload: idToken };
}

/**
 * Sets the Auth Ready flag.
 *
 * @param {boolean} isAuthReady - The Firebase ID Token.
 * @return {{type, payload: boolean}}
 */
export function setAuthReady(isAuthReady) {
  return { type: SET_AUTH_READY, payload: isAuthReady };
}

/**
 * Sets the currently signed-in user.
 *
 * @param {string} user - The currently Signed-in user.
 * @return {{type, payload: Object}}
 */
export function setCurrentUser(user: Object) {
  return { type: SET_CURRENT_USER, payload: user };
}

/**
 * Sets the Firebase instance used in the app.
 *
 * @param {string} firebaseApp - The Firebase instance used in the app.
 * @return {{type, payload: Object}}
 */
export function setFirebaseInstance(firebaseApp: Object) {
  return { type: SET_FIREBASE_INSTANCE, payload: firebaseApp };
}
