// @flow

import 'firebase/app';
import 'firebase/auth';
import { canUseDOM } from 'exenv';
import * as actions from './actions';
import { combineReducers } from 'redux';
import * as reducers from './reducers';

// ===== Middleware stuff below ======

const firebaseMiddleware = firebaseApp => {
  module.exports.firebaseApp = firebaseApp;

  return store => {
    // Save a pointer to the FirebaseApp
    store.firebaseApp = firebaseApp;
    // store.dispatch(actions.setFirebaseInstance(firebaseApp));
    // Keep a copy of the ID token in the __session cookie.
    copyIDTokenToCookie(firebaseApp);
    // Start tracking the ID token changes.
    copyIDTokenToStore(firebaseApp, store);
    // Start tracking user profile changes.
    copyUserProfileToStore(firebaseApp, store);

    return next => action => {
      return next(action);
    }
  }
};

// Copies the currently signed in User profile to the store.
const copyUserProfileToStore = (firebaseApp, store) => {
  // Make sure the Firebase ID Token is always passed as a cookie.
  firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
      store.dispatch(actions.setCurrentUser(user));
    } else {
      store.dispatch(actions.setCurrentUser(null));
    }
    store.dispatch(actions.setAuthReady(true));
    console.log('Firebase auth state is ready.');
    __isAuthReadyResolver();
  });
};

// Copies the ID token to the store.
const copyIDTokenToStore = (firebaseApp, store) => {
  // Make sure the Firebase ID Token is always passed as a cookie.
  firebaseApp.auth().onIdTokenChanged(user => {
    if (user) {
      user.getIdToken().then(idToken => {
        store.dispatch(actions.setIdToken(idToken));
      });
    } else {
      store.dispatch(actions.setIdToken(null));
    }
  });
};

// Start keeping the ID token in the __session cookie.
const copyIDTokenToCookie = firebaseApp => {
  if (canUseDOM) {
    // Make sure the Firebase ID Token is always passed as a cookie.
    firebaseApp.auth().onIdTokenChanged(user => {
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
};

// Promise that resolves when Firebase auth is ready.
let __isAuthReadyResolver;
const authReady = new Promise(resolve => {
  __isAuthReadyResolver = resolve;
});

module.exports = {
  firebaseReducer: combineReducers({
    ...reducers
  }),
  firebaseMiddleware,
  authReady
};
