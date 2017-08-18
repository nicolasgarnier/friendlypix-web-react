// @flow

import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';


/**
 * Entry point to the FriendlyPix app.
 */
class SplashPage extends React.Component {

  /**
   * Constructor for the FriendlyPix app.
   *
   * @param {Object} props - Additional object properties.
   * @constructor
   */
  constructor(props) {
    super(props);

    // Load firebase.
    try {
      firebase.initializeApp(require('../firebase-config.json').result);
    } catch(e) {}
  }

  /**
   * @inheritDoc
   */
  componentDidMount() {
    // Firebase UI only works on the Client. So we're loading in a `componentDidMount`.
    const firebaseui = require('firebaseui');

    // Configure Firebase UI
    const uiConfig = {
      'signInFlow': 'popup',
      'signInOptions': [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ]
    };
    const firebaseUi = new firebaseui.auth.AuthUI(firebase.auth());
    firebaseUi.start('#firebaseui-auth-container', uiConfig);
  }

  /**
   * Properties types.
   */
  props: {
  };

  /**
   * @inheritDoc
   */
  render() {
    return (
      <div>
        <h1>Friendly Pix</h1>
        <div>
          The friendliest way to share your pics
        </div>
        <div id="firebaseui-auth-container"/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return state;
};

const mapDispatchToProps = (dispatch: Function, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashPage);
