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

const cookieParser = require('cookie-parser')();
const admin = require('firebase-admin');

// Configure Firebase Admin.
const serviceAccount = require('./service-account-credentials.json');
let firebaseAdminApp;
try {
  firebaseAdminApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${process.env.GCLOUD_PROJECT}.firebaseio.com`
  }, '__service_account');
} catch(e) {
  if (e.code !== 'app/duplicate-app') {
    console.error('There was an error initializing Firebase Admin', e);
    throw e;
  }
  // An app for that UID was already created so we re-use it.
  console.log('Re-using existing app.');
  firebaseAdminApp = admin.app('__service_account');
}


// Express middleware that checks if a Firebase ID Tokens is passed in the `Authorization` HTTP
// header or the `__session` cookie and decodes it.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// When decoded successfully, the ID Token content will be added as `req.user`.
exports.authentifyFirebaseUser = config => {
  if (!config) {
    config = {
      checkcookie: true,
      checkheader: true,
      cookiename: '__session',
      generatecustomtoken: true,
      serviceaccountcredentials: './service-account-credentials.json'
    };
  }

  return (req, res, next) => {
    console.log('Check if request is authorized with Firebase ID token');

    getIdTokenFromRequest(req, res).then(idToken => {
      if (idToken) {
        addDecodedIdTokenToRequest(idToken, req).then(() => {
          if (req.user) {
            addCustomTokenToRequest(req.user.uid, req).then(() => {
              next();
            });
          } else {
            next();
          }
        });
      } else {
        next();
      }
    });
  };
};

/**
 * Returns a Promise with the Firebase ID Token if found in the Authorization or the __session cookie.
 */
function getIdTokenFromRequest(req, res) {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    console.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    return Promise.resolve(req.headers.authorization.split('Bearer ')[1]);
  }
  return new Promise(resolve => {
    cookieParser(req, res, () => {
      if (req.cookies && req.cookies['__session']) {
        console.log('Found "__session" cookie');
        // Read the ID Token from cookie.
        resolve(req.cookies['__session']);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Returns a Promise with the Decoded ID Token and adds it to req.user.
 */
function addDecodedIdTokenToRequest(idToken, req) {
  return firebaseAdminApp.auth().verifyIdToken(idToken).then(decodedIdToken => {
    console.log('ID Token correctly decoded');
    req.user = decodedIdToken;
  }).catch(error => {
    console.error('Error while verifying Firebase ID token:', error);
  });
}

/**
 * Adds a Custom Auth token to the request.
 */
function addCustomTokenToRequest(uid, req) {
  return firebaseAdminApp.auth().createCustomToken(uid).then((token) => {
    console.log('Created Custom token for UID "', uid, '" Token:', token);
    req.user.token = token;
  });
}
