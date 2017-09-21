/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as Cookies from 'js-cookie';

/**
 * Keeps the ID token in sync in a cookie. While this is active, the current ID Token of the
 * signed-in Firebase user is synced in a cookie of the given name.
 *
 * You can call the returned Function to stop the sync.
 *
 * @param {Object} firebaseApp - The Firebase instance that will be used.
 * @param {string} [cookieName] - The name of the cookie that will hold the ID Token. This defaults
 *     to '__session'.
 * @return {Function} - The unsubscribe function. Call this function to stop the process.
 */
export function keepIdTokenInCookie(firebaseApp, cookieName = '__session') {
  if (document instanceof Object) {
    // Make sure the Firebase ID Token is always passed as a cookie.
    return firebaseApp.auth().onIdTokenChanged(user => {
      if (user) {
        user.getIdToken().then(idToken => {
          console.log('User signed-in or new ID Token for user!');
          const existingCookieValue = Cookies.get(cookieName);
          // If the token is not in the cookies yet we add it.
          if (existingCookieValue !== idToken) {
            console.log('Saving new ID Token in', cookieName, 'cookie.');
            // Set a Cookie valid for 1h.
            Cookies.set(cookieName, idToken, {expires: 0.04166});
          }
        });
      } else {
        console.log('User signed-out!');
        Cookies.set(cookieName, '', {expires: 0});
      }
    });
  } else {
    console.warn('You can only use cookies in a DOM environment. This is a NoOp');
    return () => {};
  }
}

/**
 * Returns a promise that completes when Firebase Auth is ready in the given store using
 * react-redux-firebase.
 *
 * @param {Object} store - The Redux store on which we want to detect if Firebase auth is ready.
 * @param {string} [firebaseReducerAttributeName] - The attribute name of the react-redux-firebase
 *     reducer. 'firebaseState' by default.
 * @return {Promise} - A promise that completes when Firebase auth is ready in the store.
 */
export function whenAuthReady(store, firebaseReducerAttributeName = 'firebaseState') {
  const isAuthReady = store => {
    const state = store.getState();
    const firebaseState = firebaseReducerAttributeName ?
        state[firebaseReducerAttributeName] : state;
    return firebaseState && firebaseState.auth && firebaseState.auth.isLoaded;
  };

  return new Promise(accept => {
    if (isAuthReady(store)) {
      console.log('Redux store Firebase auth state is ready!');
      return accept();
    }
    let unsubscribe = store.subscribe(() => {
      if (isAuthReady(store)) {
        console.log('Redux store Firebase auth state is ready!');
        unsubscribe();
        accept();
      }
    });
  });
}
