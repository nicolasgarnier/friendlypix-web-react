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

// This will allow to require the .jsx files directly since babel will automatically compile them on the fly.
// We only using during development for performance reasons.
if (!process.env.FUNCTION_NAME || process.env.NODE_ENV === 'devserver') {
  require('babel-register');
}

/**
 * Triggers when a user gets a new follower and sends notifications if the user has enabled them.
 * Also avoids sending multiple notifications for the same user by keeping a timestamp of sent notifications.
 */
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'sendFollowerNotification') {
  exports.sendFollowerNotification = require('./microservices/sendFollowerNotification');
}

/**
 * When an image is uploaded we check if it is flagged as Adult or Violence by the Cloud Vision
 * API and if it is we blur it using ImageMagick.
 */
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'blurOffensiveImages') {
  exports.blurOffensiveImages = require('./microservices/blurOffensiveImages');
}

/**
 * Helper function to get the markup from React, inject the initial state, and
 * send the server-side markup to the client
 */
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'renderTemplate') {
  exports.renderTemplate = require('./microservices/renderTemplate');
}
