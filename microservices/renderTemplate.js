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

// needed to fix "Error: The XMLHttpRequest compatibility library was not found." in Firebase client SDK.
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const functions = require('firebase-functions');
const path = require('path');
const fs = require('fs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const _ = require('lodash');
const baseTemplate = fs.readFileSync(path.resolve(__dirname, './index.html'));
const template = _.template(baseTemplate);
const app = require('../frontend/App');
const firebaseTools = require('../frontend/firebaseTools');
const express = require('express');
const router = new express.Router();
const firebaseMiddleware = require('./firebase-express-middleware');
const createMemoryHistory = require('history').createMemoryHistory;
const firebase = require('firebase');
// Get the Firebase config from the auto generated file.
const firebaseConfig = require('../frontend/firebase-config.json').result;
// Create a Firebase Admin app
const admin = require('firebase-admin');
const serviceAccount = require('./service-account-credentials.json');
const firebaseAdminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
}, '__service_account');


// This Express middleware will check ig there is a Firebase ID token and inject
router.use(firebaseMiddleware.auth({
  checkCookie: true,
  generateCustomToken: true,
  firebaseAdminApp: firebaseAdminApp
}));

router.get('*', (req, res) => {
  const user = req.user || {};
  createFirebaseAppWithSignedInUser(user.uid, user.token).then(firebaseApp => {
    // We make sure that the firebase auth state listeners are triggered again.
    // Create the redux store.
    const history = createMemoryHistory();
    // Set the new URL.
    history.replace(req.url);
    const store = app.makeStore(history, firebaseApp);
    const registry = app.makeRegistry();
    // Wait for auth to be ready.
    firebaseTools.whenAuthReady(store).then(() => {
      // Render the App.
      const body = ReactDOMServer.renderToString(
        React.createElement(app.App, {registry:registry, store: store, history: history})
      );

      // Get the state of the redux store.
      const initialState = store.getState();

      // Grab the CSS from our sheetsRegistry.
      const css = registry.toString()

      // Check if there has been a redirect.
      const lastUrl = initialState.router.location.pathname;
      if (lastUrl !== req.url) {
        // If there has been a redirect we redirect server side.
        console.log('Server side redirect to', lastUrl);
        res.redirect(lastUrl);
      } else {
        res.set('Cache-Control', 'public, max-age=60, s-maxage=180'); // TODO: make this change dependent on each URL. with a map maybe??
        // If there was no redirect we send the rendered app as well as the redux state.
        res.send(template({body, initialState, css}));
      }
    });
  }).catch(error => {
    console.log('There was an error', error);
    res.status(500).send(error);
  });
});

/**
 * Helper function to get the markup from React, inject the initial state, and
 * send the server-side markup to the client
 */
exports = module.exports = functions.https.onRequest(router);

/**
 * Returns a Firebase App instance
 *
 * @param {String} uid - The UID of the user to sign in the app.
 * @param {String} customToken - A custom token to sign the user in the app.
 * @return {Promise<Object>} - A Firebase App instance specific to the given user with the user already signed-in.
 */
function createFirebaseAppWithSignedInUser(uid = undefined, customToken) {
  // Instantiate a Firebase app.
  let firebaseApp;
  // Try to re-use cached firebase App.
  try {
    firebaseApp = firebase.app(/* uid */); // Uncomment. aka create named apps whe this bug is fixed: https://github.com/prescottprue/react-redux-firebase/issues/250
    console.log('Re-used a cached app for UID', uid);
  } catch(e) {
    firebaseApp = firebase.initializeApp(firebaseConfig/* , uid */); // Uncomment. aka create named apps when this bug is fixed: https://github.com/prescottprue/react-redux-firebase/issues/250
    console.log('Created a new Firebase App instance for UID', uid);
  }

  // Check if a Firebase user was signed in and a custom auth token was generated.
  let signInPromise;
  const firebaseAppUid = firebaseApp.auth().currentUser ? firebaseApp.auth().currentUser.uid : undefined;
  if (uid === firebaseAppUid) {
    signInPromise = Promise.resolve();
    console.log('Firebase App instance auth state is already correct.');
  } else if (uid && customToken) {
    console.log('Need to sign in user in Firebase App instance.');
    signInPromise = firebaseApp.auth().signInWithCustomToken(customToken).then(user => {
      console.log('User now signed-in! uid:', user.uid);
    });
  } else {
    console.log('Need to sign out user in Firebase App instance.');
    signInPromise = firebaseApp.auth().signOut().then(() => {
      console.log('User now signed-out!');
    });
  }

  return signInPromise.then(() => firebaseApp);
};
