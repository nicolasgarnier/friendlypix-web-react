// @flow

import React from 'react';
import '!style-loader!css-loader!firebaseui/dist/firebaseui.css'; // import globally without running through CSS modules

// Global ID counter.
let idCounter = 0;

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
    this.componentId = idCounter++;
    this.firebaseAuth = props.firebaseAuth;
  }

  /**
   * @inheritDoc
   */
  componentDidMount() {
    // Firebase UI only works on the Client. So we're loading in a `componentDidMount`.
    const firebaseui = require('firebaseui');
    this.firebaseUiWidget = new firebaseui.auth.AuthUI(this.firebaseAuth);
    this.firebaseUiWidget.reset();
    this.firebaseUiWidget.start('#firebaseui_' + this.componentId, this.uiConfig);
  }

  /**
   * @inheritDoc
   */
  componentWillUnmount() {
    this.firebaseUiWidget.delete();
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
      <div id={`firebaseui_${this.componentId}`}/>
    )
  }
}
