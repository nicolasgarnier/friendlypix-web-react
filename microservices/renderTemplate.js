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

const functions = require('firebase-functions');
const path = require('path');
const fs = require('fs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const _ = require('lodash');
const baseTemplate = fs.readFileSync(path.resolve(__dirname, './index.html'));
const template = _.template(baseTemplate);
const serverApp = require('../frontend/ServerApp');
const express = require('express');
const app = express();
const firebaseUser = require('./firebaseUser');
const actionCreators = require('../frontend/actionCreators');
// needed to fix "Error: The XMLHttpRequest compatibility library was not found." in Firebase client SDK.
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

app.use(firebaseUser.authentifyFirebaseUser);

app.get('*', (req, res) => {
  const context = {};

  // If a Firebase user was signed in and a custom auth token was generated.
  serverApp.store.dispatch(actionCreators.setFirebaseCustomAuthToken(req.user ? req.user.token : null));

  const body = ReactDOMServer.renderToString(
    React.createElement(serverApp.ServerApp, {url: req.url, context})
  );

  if (context.url) {
    res.redirect(context.url);
    res.end();
  } else {
    const initialState = serverApp.store.getState();
    res.send(template({body, initialState}));
  }
});

/**
 * Helper function to get the markup from React, inject the initial state, and
 * send the server-side markup to the client
 */
exports = module.exports = functions.https.onRequest(app);
