// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'material-ui';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import './app.css';

/**
 * Entry point to the FriendlyPix app.
 */
class Layout extends React.Component {

  /**
   * Constructor for the FriendlyPix app.
   *
   * @param {Object} props - Additional object properties.
   * @constructor
   */
  constructor(props) {
    super(props);
  }

  /**
   * Properties types.
   */
  props: {
    children: any,
    firebaseCustomAuthToken: string | void,
    firebase: {
      logout: Function
    }
  };

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
          <Button raised color="accent" onClick={this.props.firebase.logout}>Logout</Button>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = (dispatch: Function, ownProps) => ({
});

export default compose(firebaseConnect(), connect(mapStateToProps, mapDispatchToProps))(Layout);
