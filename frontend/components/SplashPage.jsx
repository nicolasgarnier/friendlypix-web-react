// @flow

import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import FirebaseAuth from '../firebase/FirebaseAuth';
import { firebaseConnect } from 'react-redux-firebase';
import styles from './splash-page.css';
import { push } from 'react-router-redux';
import { compose } from 'redux'
import '!style-loader!css-loader!./firebaseui-overrides.css'; // import globally without running through CSS modules


/**
 * The Splash Page containing the login UI.
 */
class SplashPage extends React.Component {

  /**
   * Constructor for the Splash Page.
   *
   * @param {Object} props - Additional object properties.
   * @constructor
   */
  constructor(props) {
    super(props);

    this.uiConfig = {
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccess: () => {
          this.props.redirectHome();
          return false;
        }
      }
    };
  }

  /**
   * Properties types.
   */
  props: {
    redirectHome: Function,
    firebase: {
      auth: Function
    }
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
          <FirebaseAuth className={styles.firebaseUi} uiConfig={this.uiConfig} firebaseAuth={this.props.firebase.auth()}/>
          <Link className={styles.skip} to="/recent">skip sign in</Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = (dispatch: Function, ownProps) => ({
  redirectHome() {
    dispatch(push('/home'));
  }
});

export default compose(firebaseConnect(), connect(mapStateToProps, mapDispatchToProps))(SplashPage);
