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
'use strict';

const cookie = require('cookie');
const admin = require('firebase-admin');

/**
 * Creates a Firebase admin instance using the app default credentials.
 * This is only possible in a Google Cloud environment.
 *
 * @return {admin.app.App} - A Firebase Admin App instance.
 */
function getDefaultFirebaseAdminApp() {
  let firebaseAdminApp;
  let appName;
  try {
    // Configure Firebase Admin.
    appName = `__service_account_${process.env.GCLOUD_PROJECT}`;
    firebaseAdminApp = admin.initializeApp({credential: admin.credential.applicationDefault()}, appName);
  } catch (e) {
    if (e.code !== 'app/duplicate-app') {
      console.error('There was an error initializing Firebase Admin with default credentials', e);
      return;
    }
    // An app for that UID was already created so we re-use it.
    console.log('Re-using existing app.');
    firebaseAdminApp = admin.app(appName);
  }
  return firebaseAdminApp;
}

// The default configuration values. They can be overridden individually when calling `auth`.
const DEFAULT_CONFIG = {
  checkHeader: true,
  checkCookie: false,
  cookieName: '__session',
  generateCustomToken: false,
  firebaseAdminApp: null
};

/**
 * Express middleware that checks if a Firebase ID Token is passed in the `Authorization` HTTP
 * header or a cookie and decodes it.
 *
 * The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header
 * like this: `Authorization: Bearer <Firebase ID Token>`.
 *
 * You can also pass the ID Token in an HTTP cookie. To do this you need to configure the
 * middleware with `config.checkCookie` as `true` and pass the name of the cookie to check in
 * `config.cookieName`.
 *
 * By default the middleware will try to use a Firebase Admin instance using default app
 * credentials which is only possible when running in a Google Cloud environment.
 *
 * When decoded successfully, the ID Token content will be added as `req.user`.
 *
 * Typical usage is:
 *
 * ```js
 * const express = require('express');
 * const router = new express.Router();
 * const firebaseMiddleware = require('express-firebase-middleware');
 *
 * // Create a Firebase Admin app
 * const admin = require('firebase-admin');
 * const serviceAccount = require('./service-account-credentials.json');
 * const firebaseAdminApp = admin.initializeApp({
 *   credential: admin.credential.cert(serviceAccount)
 * });
 *
 * // Add the Firebase auth middleware.
 * router.use(firebaseMiddleware.auth({
 *   firebaseAdminApp: firebaseAdminApp
 * }));
 *
 * router.get('*', (req, res) => {
 *   if (req.user) {
 *     // Firebase User is authorized.
 *     console.log('Request is authorized for Firebase user with UID:', req.uid);
 *   }
 * });
 * ```
 *
 * @param {Object} [config] - The configuration object for the middleware.
 * @param {boolean} [config.checkHeader] - If `true` the middleware will check if an ID Token is
 *     passed in the `Authorization` HTTP header as Bearer token. This defaults as `true`.
 * @param {boolean} [config.checkCookie] - If `true` the middleware will check if an ID Token is
 *     passed in the a cookie. The name of the cookie to check can be configured using
 *     `config.cookieName`. This defaults as `false`.
 * @param {boolean} [config.cookieName] - The name of the cookie to check if `config.checkCookie`
 *     is `true`. This defaults as `"__session"`.
 * @param {boolean} [config.generateCustomToken] - If `true` the middleware will generate a
 *     Firebase Custom Auth token in `req.user.token` if a valid ID token is found. This defaults
 *     as `false`.
 * @param {boolean} [config.firebaseAdminApp] - A Firebase Admin app instance that will be used to
 *     decode the ID token and generate the Custom Auth token if `config.generateCustomToken` is
 *     `true`. If none is provided a Firebae Admin app will be instanciated wuing the app default
 *     credentials which his only possible in a Google Cloud environment (Google App Engine, Google
 *     Compute Engine, Firebase Functions...) and does not allow generating Custom auth tokens.
 * @return {Object} - The configured Firebase Auth Express Middleware.
 */
exports.auth = config => {
  if (!config) {
    config = {};
  }
  // Merge provided config with the default config.
  config = Object.assign(Object.assign({}, DEFAULT_CONFIG), config);

  return (req, res, next) => {
    console.log('Check if request is authorized with Firebase ID token');

    let idToken;

    // Check auth header for an ID Token.
    if (config.checkHeader) {
      idToken = getIdTokenFromRequestHeader(req);
    }

    // Check cookies for an ID Token. The ID Token from a request header has priority if both exist.
    if (!idToken && config.checkCookie) {
      idToken = getIdTokenFromCookie(req, config.cookieName);
    }

    if (idToken) {
      // If no Firebase Admin app was provided in the config we use one with default credentials.
      const firebaseAdminApp = config.firebaseAdminApp || getDefaultFirebaseAdminApp();

      // Make sure we have a usable Firebase Admin app instance.
      if (!firebaseAdminApp instanceof Object && firebaseAdminApp.auth instanceof Function) {
        console.error('We could not create a Firebase Admin app with default credentials.',
            'You can pass a Firebase Admin app instance to the Firebase express middleware using',
            '`config.firebaseAdminApp`.');
        next();
        return;
      }
      // We found an ID token, let's try to decode it.
      decodeIdToken(idToken, firebaseAdminApp).then(user => {
        req.user = user;
        if (req.user && config.generateCustomToken) {
          // We successfully decoded the ID token and we want to generate a custom ID token.
          return generateCustomAuthToken(req.user.uid, firebaseAdminApp)
              .then(customAuthToken => req.user.token = customAuthToken);
        }
      }).then(() => next());
    } else {
      console.log('Found no Firebase ID token in request.');
      next();
    }
  };
}

/**
 * Returns a Promise with the Firebase ID Token if found in the Authorization header.
 *
 * @param {Object} req - The request object.
 * @return {String} - The encoded ID token.
 */
function getIdTokenFromRequestHeader(req) {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    console.log('Found Bearer token in "Authorization" header.');
    // Return the ID Token from the Authorization header.
    return req.headers.authorization.split('Bearer ')[1];
  }
}

/**
 * Returns a Promise with the Firebase ID Token if found in a cookie of the given name.
 *
 * @param {Object} req - The request object.
 * @param {String} cookieName - The name of the cookie to check.
 * @return {Promise<String>} - The encoded ID token.
 */
function getIdTokenFromCookie(req, cookieName) {
  if (req.headers.cookie) {
    const cookies = cookie.parse(req.headers.cookie);
    if (cookies && cookies[cookieName]) {
      console.log('Found "', cookieName, '" cookie.');
      // Read the ID Token from cookie.
      return cookies[cookieName];
    }
  }
}

/**
 * Returns a Promise with the Decoded ID Token.
 *
 * @param {String} idToken - The encoded ID token to decode.
 * @param {admin.app.App} firebaseAdminApp - A Firebase Admin App instance.
 * @return {Object} - The decoded ID token.
 */
function decodeIdToken(idToken, firebaseAdminApp) {
  return firebaseAdminApp.auth().verifyIdToken(idToken).then(decodedIdToken => {
    console.log('Firebase ID Token correctly decoded.');
    return decodedIdToken;
  }).catch(error => {
    console.error('Error while verifying Firebase ID token:', error);
  });
}

/**
 * Adds a Custom Auth token to the request.
 *
 * @param {String} uid - The UID the generate a custom auth token for.
 * @param {admin.app.App} firebaseAdminApp - A Firebase Admin App instance.
 * @return {String} - The custom auth token for he provided UID.
 */
function generateCustomAuthToken(uid, firebaseAdminApp) {
  return firebaseAdminApp.auth().createCustomToken(uid).then(token => {
    console.log('Created Custom token for UID:', uid);
    return token;
  }).catch(error => {
    console.error('Error while generating a Custom Auth token for UID:', uid,
        'Make sure you have passed a Firebase Admin app instance authorized with appropriate '
        + 'Service Accounts credentials.', error);
  });
}
