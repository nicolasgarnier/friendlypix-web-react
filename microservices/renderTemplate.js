/**
 * Copyright 2016 Google Inc. All Rights Reserved.
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
const express = require('express');
const router = new express.Router();
const firebaseUser = require('./firebaseUser');

// This Express middleware will check ig there is a Firebase ID token and inject
router.use(firebaseUser.authentifyFirebaseUser);

router.get('*', (req, res) => {

  // If a Firebase user was signed in and a custom auth token was generated.
  let signInPromise;
  if (req.user && req.user.token) {
    signInPromise = app.firebaseApp.auth().signInWithCustomToken(req.user.token).then(user => {
      console.log('USER SIGNED-IN! ID:', user.uid);
    });
  } else {
    signInPromise = app.firebaseApp.auth().signOut().then(() => {
      console.log('USER SIGNED-OUT!');
    });
  }

  signInPromise.then(() => {
    // Sets the URL
    app.history.push(req.url);

    const body = ReactDOMServer.renderToString(
      React.createElement(app.App)
    );
    const initialState = app.store.getState();
    const lastUrl = initialState.router.location.pathname;
    if (lastUrl !== req.url) {
      console.log('Server side redirect to', lastUrl);
      res.redirect(lastUrl);
    } else {
      res.send(template({body, initialState}));
    }
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
