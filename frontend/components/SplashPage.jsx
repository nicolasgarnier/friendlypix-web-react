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
// @flow

import React from 'react';
import { connect } from 'react-redux';
import PhotoIcon from 'material-ui-icons/Photo';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import FirebaseAuth from './FirebaseAuth';
import { firebaseConnect } from 'react-redux-firebase';
import styles from './splash-page.css';
import { push } from 'react-router-redux';
import { compose } from 'redux'
import './firebaseui-overrides.global.css'; // Import globally.


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
        <div className={styles.logo}><PhotoIcon className={styles.logoIcon}/> Friendly Pix</div>
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
