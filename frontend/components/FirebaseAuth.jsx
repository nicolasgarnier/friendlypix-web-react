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

import React from 'react';
import '!style-loader!css-loader!firebaseui/dist/firebaseui.css'; // import globally without running through CSS modules

// Global ID for the element.
const ELEMENT_ID = 'firebaseui_container';

/**
 * React Component wrapper for the FirebaseUI Auth widget.
 */
export default class FirebaseAuth extends React.Component {

  /**
   * Constructor  Firebase Auth UI component
   *
   * @param {Object} props - Additional object properties.
   * @constructor
   */
  constructor(props) {
    super(props);

    this.uiConfig = props.uiConfig;
    this.firebaseAuth = props.firebaseAuth;
  }

  /**
   * @inheritDoc
   */
  componentDidMount() {
    // Firebase UI only works on the Client. So we're loading in a `componentDidMount`.
    const firebaseui = require('firebaseui');
    this.firebaseUiWidget = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(this.firebaseAuth);
    this.firebaseUiWidget.reset();
    this.firebaseUiWidget.start('#' + ELEMENT_ID, this.uiConfig);
  }

  /**
   * @inheritDoc
   */
  componentWillUnmount() {
    this.firebaseUiWidget.reset();
  }

  /**
   * Properties types.
   */
  props: {
    uiConfig: Object,
    firebaseAuth: Object
  };

  /**
   * @inheritDoc
   */
  render() {
    return (
      <div id={ELEMENT_ID}/>
    )
  }
}
