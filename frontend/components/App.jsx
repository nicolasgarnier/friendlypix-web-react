// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import './app.css';
import canUseDOM from 'exenv';


/**
 * Entry point to the FriendlyPix app.
 */
class App extends React.Component {

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

    if (!canUseDOM) {
      if (props.firebaseCustomAuthToken) {
        firebase.auth().signInWithCustomToken(props.firebaseCustomAuthToken).then(user => {
          console.log('USER SIGNED-IN with custom token!', user.uid);
        });
      } else {
        firebase.auth().signOut().then(() => {
          console.log('USER SIGNED-OUT!');
        });
      }
    }
  }

  /**
   * Properties types.
   */
  props: {
    children: any,
    firebaseCustomAuthToken: string | void
  };

  /**
   * @inheritDoc
   */
  componentDidMount() {
    // Make sure the Firebase ID Token is always passed as a cookie.
    firebase.auth().onIdTokenChanged(user => {
      if (user) {
        user.getIdToken().then(idToken => {
          console.log('User signed-in! ID Token:', idToken);
          document.cookie = '__session=' + idToken + ';max-age=' + (idToken ? 3600 : 0);
        });
      } else {
        document.cookie = '__session=;expires=Thu, 01 Jan 1970 00:00:01 GMT';
      }
    });
  }

  /**
   * @inheritDoc
   */
  render() {
    return (
      <div>
        <h1>TITLE</h1>
        <div>
          <Link to="/">Splash</Link> - <Link to="/recent">Recent Posts Feed</Link> - <Link to="/home">Home</Link>
          - <Link to="/user/1">View User 1</Link> - <Link to="/post/1">View Post 1</Link> - <Link to="/about">About</Link>
          - <Link to="/new">Create New</Link>
        </div>
        <div>
          {this.props.children}
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
