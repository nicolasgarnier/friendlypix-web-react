// @flow

import React from 'react';
import { Route } from 'react-router';
import { push } from 'react-router-redux'
import Layout from './components/Layout';
import { connect } from 'react-redux';
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
  componentWillReceiveProps(nextProps) {
    this.onRouting(nextProps.router.location.pathname, nextProps);
  }

  /**
   * @inheritDoc
   */
  componentWillMount() {
    this.onRouting(this.props.router.location.pathname, this.props);
  }

  /**
   * @inheritDoc
   */
  onRouting(destinationPath, props) {
    if (destinationPath === '/'
        && !props.firebaseState.auth.isEmpty) {
      props.redirectHome();
    }
  }

  /**
   * @inheritDoc
   */
  render() {
    // Let's wait for the Firebase auth to be ready before rendering the UI.
    return (
      <Layout>
        <Route exact path="/" component={SplashPage}/>
        <Route path="/home" component={HomeFeed}/>
        <Route path="/recent" component={RecentPostsFeed}/>
        <Route path="/user/:id" component={UserProfile}/>
        <Route path="/post/:id" component={SinglePost}/>
        <Route path="/about" component={About}/>
        <Route path="/new" component={NewPost}/>
      </Layout>
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

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
