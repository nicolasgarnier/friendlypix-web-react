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
 * See the License for t`he specific language governing permissions and
 * limitations under the License.
 */
// @flow

import { canUseDOM } from 'exenv';

/**
 * Keeps the ID token in sync in the __session cookie.
 *
 * @param {Object} firebaseApp - The Firebase instance that will be used.
 * @param {string} cookieName - The Firebase instance that will be used.
 * @return {Function} - The unsubscribe function.
 */
export function copyIdTokenToCookie(firebaseApp, cookieName) {
  if (canUseDOM) {
    // Make sure the Firebase ID Token is always passed as a cookie.
    return firebaseApp.auth().onIdTokenChanged(user => {
      if (user) {
        user.getIdToken().then(idToken => {
          console.log('User signed-in! ID Token:', idToken);
          document.cookie = cookieName + '=' + idToken + ';max-age=' + (idToken ? 3600 : 0);
        });
      } else {
        console.log('User signed-out!');
        document.cookie = cookieName + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT';
      }
    });
  } else {
    console.warn('You can only use cookies in a DOM environment.');
    return () => {};
  }
}
