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
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';
import { compose } from 'redux';
import { common } from 'material-ui/colors';


const styles = {
  root: {
    display: 'flex',
    textDecoration: 'none'
  },
  avatar: {
    marginRight: '-20px',
    borderRadius: '20px',
    border: '2px white solid',
    zIndex: 3
  },
  button: {
    paddingLeft: '35px',
    zIndex: 2
  },
  label: {
    color: common.white,
  }
};

/**
 * Widget showing the user status.
 */
class UserStatus extends React.Component {

  /**
   * Properties types.
   */
  props: {
    auth: {
      isEmpty: boolean,
      uid: String,
      displayName: String,
      photoURL: String
    },
    classes: Object
  };

  state = {
    anchorEl: null,
    open: false,
  };

  /**
   * @inheritDoc
   */
  render() {
    const isUserSignedIn = !this.props.auth.isEmpty;
    const classes = this.props.classes;

    if (isUserSignedIn) {
      return (
        <Link to={`/user/${this.props.auth.uid}`} className={classes.root}>
          <Avatar alt={this.props.auth.displayName}
                  src={this.props.auth.photoURL}
                  className={classes.avatar}/>
          <Button className={classes.button + ' ' + classes.label}>{this.props.auth.displayName}</Button>
        </Link>
      );
    }
    return (
      <Link to="/" className={classes.root}>
        <Button className={classes.label}>Sign in</Button>
      </Link>
    );
  }
}

const mapStateToProps = state => {
  return {auth: state.firebaseState.auth};
};

export default compose(withStyles(styles), connect(mapStateToProps))(UserStatus);
