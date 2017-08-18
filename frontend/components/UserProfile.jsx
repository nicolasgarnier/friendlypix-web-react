// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
// import getAPIDetails from './asyncActions';
import firebase from 'firebase/app';
import 'firebase/auth';


const Home = () => (
  <span>Home Sweet Home</span>
);

const Hello = () => (
  <span>Hello WORLD!!</span>
);

/**
 * Entry point to the FriendlyPix app.
 */
class UserProfile extends React.Component {

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
        <h1>TITLE</h1>
        <div>
          <Link to="/">Home</Link> - <Link to="/hello">Hello</Link>
        </div>
        <div>
          <Route exact path="/hello" component={Hello}/>
          <Route exact path="/" component={Home}/>
        </div>
        <div id="firebaseui-auth-container"/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // const apiData = state.apiData[ownProps.show.imdbID] ? state.apiData[ownProps.show.imdbID] : {};
  return state;
};

const mapDispatchToProps = (dispatch: Function, ownProps) => ({
  // getAPIData() {
  //   dispatch(getAPIDetails(ownProps.show.imdbID));
  // }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
