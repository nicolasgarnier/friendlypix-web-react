import React from 'react';
import { Route } from 'react-router';
import App from './components/App';

import SplashPage from './components/SplashPage';
import HomeFeed from './components/HomeFeed';
import RecentPostsFeed from './components/RecentPostsFeed';
import SinglePost from './components/SinglePost';
import About from './components/About';
import NewPost from './components/NewPost';
import UserProfile from './components/UserProfile';

/**
 * All the routes.
 */
export default class Routes extends React.Component {
  /**
   * @inheritDoc
   */
  render() {
    return (
      <App>
        <Route exact path="/" component={SplashPage}/>
        <Route path="/home" component={HomeFeed}/>
        <Route path="/recent" component={RecentPostsFeed}/>
        <Route path="/user/:id" component={UserProfile}/>
        <Route path="/post/:id" component={SinglePost}/>
        <Route path="/about" component={About}/>
        <Route path="/new" component={NewPost}/>
      </App>
    )
  }
}
