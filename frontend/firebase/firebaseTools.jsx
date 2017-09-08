import { canUseDOM } from 'exenv';

/**
 * Set of Firebase tools.
 *
 * @param {Object} firebaseApp - The Firebae instance that will be used.
 * @return {{authReadyPromise: Promise, copyIdTokenToCookie: (function(*=))}} - The set of tools.
 */
export default function(firebaseApp) {

  // Auth state promise resolver.
  let authReadyPromiseResolver;
  const authReadyPromise = new Promise(resolve => {
    authReadyPromiseResolver = resolve
  });

  const unsubscribe = firebaseApp.auth().onAuthStateChanged(() => {
    authReadyPromiseResolver();
    unsubscribe();
  });

  // Start keeping the ID token in the __session cookie.
  const copyIdTokenToCookie = (cookieName) => {
    if (canUseDOM) {
      // Make sure the Firebase ID Token is always passed as a cookie.
      firebaseApp.auth().onIdTokenChanged(user => {
        if (user) {
          user.getIdToken().then(idToken => {
            console.log('User signed-in! ID Token:', idToken);
            document.cookie = cookieName + '=' + idToken + ';max-age=' + (idToken ? 3600 : 0);
          });
        } else {
          console.log('User signed-out!');
          document.cookie = cookieName + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT';
        }
      });
    }
  };

  return {
    authReadyPromise : authReadyPromise,
    copyIdTokenToCookie: copyIdTokenToCookie
  };
};
