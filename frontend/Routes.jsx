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
import { Route, Redirect, Switch } from 'react-router';
import FriendlyPixLayout from './components/Layout';
import { connect } from 'react-redux';
import SplashPage from './components/SplashPage';
import HomeFeed from './components/HomeFeed';
import RecentPostsFeed from './components/RecentPostsFeed';
import SinglePost from './components/SinglePost';
import About from './components/About';
import NewPost from './components/NewPost';
import UserProfile from './components/UserProfile';
import FourOhFour from './components/FourOhFour';

/**
 * All the routes.
 */
class Routes extends React.Component {

  /**
   * Properties types.
   */
  props: {
    firebaseState: {
      auth: {
        isEmpty: boolean
      }
    },
    router: {
      location: {
        pathname: string
      }
    },
    redirectHome: Function
  };

  /**
   * @inheritDoc
   */
  render() {

    if (this.props.router.location.pathname === '/'
        && !this.props.firebaseState.auth.isEmpty) {
      return (<Redirect from="/" to="/home"/>);
    }

    // Let's wait for the Firebase auth to be ready before rendering the UI.
    return (
      <Switch>
        <Route exact path="/" component={SplashPage}/>
        <Route>
          <FriendlyPixLayout>
            <Switch>
              <Route path="/home" component={HomeFeed}/>
              <Route path="/recent" component={RecentPostsFeed}/>
              <Route path="/user/:id" component={UserProfile}/>
              <Route path="/post/:id" component={SinglePost}/>
              <Route path="/about" component={About}/>
              <Route path="/new" component={NewPost}/>
              <Route component={FourOhFour}/>
            </Switch>
          </FriendlyPixLayout>
        </Route>
      </Switch>
    )
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Routes);
