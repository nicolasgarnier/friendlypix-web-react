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
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import UserStatus from './UserStatus';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import TrendingUpIcon from 'material-ui-icons/TrendingUp';
import HomeIcon from 'material-ui-icons/Home';
import PermContactCalendarIcon from 'material-ui-icons/PermContactCalendar';
import ExitToAppIcon from 'material-ui-icons/ExitToApp';
import { lightBlue, common } from 'material-ui/colors';

const styles = {
  signInContainer: {
    backgroundColor: lightBlue['700'],
    color: common.black,
    marginTop: '-10px'
  },
  noStyleLink: {
    textDecoration: 'none',
  },
  button: {
    color: common.white
  },
  avatar: {
    marginRight: '-20px',
    borderRadius: '20px',
    border: '2px white solid',
    zIndex: 3,
    width: '38px',
    height: '38px'
  },
  label: {
    color: common.white,
    textTransform: 'none',
    fontSize: '16px'
  }
};

/**
 * The Dropdown Menu.
 */
class DrawerContent extends React.Component {

  /**
   * Properties types.
   */
  props: {
    firebase: {
      logout: Function
    },
    isSignedIn: boolean,
    classes: Object
  };

  /**
   * Logs out the user from Firebase.
   */
  logout() {
    this.props.firebase.logout();
  }

  /**
   * @inheritDoc
   */
  render() {
    const classes = this.props.classes;

    return (
      <List>
        <ListItem className={classes.signInContainer}>
          <UserStatus classes={{avatar: classes.avatar, label: classes.label}}/>
        </ListItem>
        <Divider/>
        {this.props.isSignedIn &&
          <Link to="/home" className={classes.noStyleLink}>
            <ListItem button>
              <Avatar>
                <HomeIcon/>
              </Avatar>
              <ListItemText primary="Home"/>
            </ListItem>
          </Link>
        }
        <Link to="/recent" className={classes.noStyleLink}>
          <ListItem button>
            <Avatar>
              <TrendingUpIcon/>
            </Avatar>
            <ListItemText primary="Recent"/>
          </ListItem>
        </Link>
        <Divider inset/>
        <Link to="/about" className={classes.noStyleLink}>
          <ListItem button>
            <Avatar>
              <PermContactCalendarIcon/>
            </Avatar>
            <ListItemText primary="About - Help - Contact"/>
          </ListItem>
        </Link>
        <Divider inset/>
        <ListItem button onClick={() => this.logout()}>
          <Avatar>
            <ExitToAppIcon/>
          </Avatar>
          <ListItemText primary="Sign Out"/>
        </ListItem>
      </List>
    );
  }
}
const mapStateToProps = state => ({
  isSignedIn: !state.firebaseState.auth.isEmpty
});


export default compose(withStyles(styles), firebaseConnect(), connect(mapStateToProps))(DrawerContent);
