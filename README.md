# Friendly Pix Web - React edition

Friendly Pix Web is a sample app demonstrating how to build a isomorphic React Web app with the Firebase Platform.

Friendly Pix is a place where you can share photos, follow friends, comment on photos...

The following React techs are being used:
 - Isomorphism with `ReactDOMServer` hosted on Cloud Functions
 - React Router v4
 - CSS Modules
 - Redux
 - Firebase UI
 - react-redux-firebase v2


## Initial setup, build tools and dependencies

Friendly Pix is built using Javascript, [Firebase](https://firebase.google.com/docs/web/setup) and [React](https://facebook.github.io/react/). The Auth flow is built using [Firebase-UI](https://github.com/firebase/firebaseui-web).

FriendlyPix is an Isomorphic app, the first render of the app is generated server side using [Cloud Functions for Firebase](https://firebase.google.com/docs/functions).

Additionally server-side micro-services are built on [Cloud Functions for Firebase](https://firebase.google.com/docs/functions) such as an automatic image moderation and notifications sending.

Install all JavaScript/Build/Deploy tools dependencies by running:

```bash
$ npm install
```


## Create and configure your Firebase Project

1. Create a Firebase project using the [Firebase Console](https://firebase.google.com/console).
2. Generate a Service accounts file from **⚙ > Project Settings > Service Accounts > GENERATE NEW PRIVATE KEY > GENERATE KEY** and save it as `./microservices/service-account-credentials.json`
2. Enable **Google** as a Sign in provider in **Firebase Console > Authentication > Sign in Method** tab.
3. Enable **Facebook** as a Sign in provider in **Firebase Console > Authentication > Sign in Method** tab. You'll need to provide your Facebook app's credentials. If you haven't yet you'll need to have created a Facebook app on [Facebook for Developers](https://developers.facebook.com)
4. At the root of the site run `firebase use --add`. When prompted select the Firebase Project you have just created. This will make sure the Firebase CLI is configured to use your particular project.


## Start a local development server

You can start a local development server by running:

```bash
npm run serve
```

This will start `firebase serve` and make sure your Javascript files are transpiled and packed automatically.

Then open [http://localhost:5000](http://localhost:5000) in your browser.


## Deploy the app

Before deploying your code you need to build it for production. Run:

```bash
npm run build
```

This will install all runtime dependencies and transpile and pack Javascript code to ES5, install Cloud Functions dependencies.
Then run:

```bash
firebase deploy
```

Then this deploys a new version of your code that will be served from `https://<PROJECT_ID>.firebaseapp.com`


## Contributing

We'd love that you contribute to the project. Before doing so please read our [Contributor guide](CONTRIBUTING.md).


## License

© Google, 2011. Licensed under an [Apache-2](LICENSE) license.
