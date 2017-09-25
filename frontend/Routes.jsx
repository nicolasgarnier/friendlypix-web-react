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
import { Route, Switch } from 'react-router';
import FriendlyPixLayout from './components/Layout';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
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
class AuthRedirect extends React.Component {

  /**
   * Properties types.
   */
  props: {
    isAuth?: boolean,
    from: string,
    to?: string | Object,
    push?: boolean,
    ifAuth?: boolean,
    exact?: boolean,
    redirect: Function
  };

  /**
   * @inheritDoc
   */
  componentWillReceiveProps(props) {
    this.onRouting(props);
  }

  /**
   * @inheritDoc
   */
  componentWillMount() {
    this.onRouting(this.props);
  }

  /**
   * Executing every time new routing should occur.
   *
   * @param {Object} props
   */
  onRouting(props) {
    if (props.isAuth && props.ifAuth
        || !props.isAuth && !props.ifAuth) {
      this.props.redirect(props.to);
    }
  }

  /**
   * @inheritDoc
   */
  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {isAuth: !state.firebaseState.auth.isEmpty};
};

const mapDispatchToProps = (dispatch: Function, ownProps) => ({
  redirect(to) {
    dispatch(push(to));
  }
});


AuthRedirect = connect(mapStateToProps, mapDispatchToProps)(AuthRedirect);


/**
 * All the routes.
 */
class Routes extends React.Component {

  /**
   * @inheritDoc
   */
  render() {
    return (
      <Switch>
        <AuthRedirect exact ifAuth={true} from="/" to="/home"/>
        <Route exact path="/" component={SplashPage}/>
        <Route>
          <FriendlyPixLayout>
            <Switch>
              <AuthRedirect ifAuth={false} from="/home" to="/"/>
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

export default connect()(Routes);
