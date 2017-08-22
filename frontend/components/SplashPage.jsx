// @flow

import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import { Link } from 'react-router-dom';
import 'firebase/auth';
import styles from './splash-page.css';
import '!style-loader!css-loader!firebaseui/dist/firebaseui.css'; // import globally without running through CSS modules
import '!style-loader!css-loader!./firebaseui-overrides.css'; // import globally without running through CSS modules


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
      signInSuccessUrl: '/home',
      signInFlow: 'popup',
      signInOptions: [
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
      <div className={styles.container}>
        <div className={styles.logo}><i className={styles.logoIcon + " material-icons"}>photo</i> Friendly Pix</div>
        <div className={styles.caption}>The friendliest way to share your pics</div>
          <div>
          <div className={styles.firebaseui} id="firebaseui-auth-container"/>
          <Link className={styles.skip} to="/recent">skip sign in</Link>
        </div>
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
