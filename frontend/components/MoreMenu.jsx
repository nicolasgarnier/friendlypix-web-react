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
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Popover from 'material-ui/Popover';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { common } from 'material-ui/colors';
import PermContactCalendarIcon from 'material-ui-icons/PermContactCalendar';
import ExitToAppIcon from 'material-ui-icons/ExitToApp';

const styles = {
  noStyleLink: {
    textDecoration: 'none',
  },
  button: {
    color: common.white
  }
};

/**
 * The Dropdown Menu.
 */
class DropdownMenu extends React.Component {

  /**
   * Properties types.
   */
  props: {
    firebase: {
      logout: Function
    },
    classes: Object
  };

  state = {
    anchorEl: null,
    open: false,
  };

  /**
   * Opens the menu next to the given element.
   *
   * @param {Object} element - The element which to anchor the menu.
   */
  openMenu(element) {
    this.setState({ open: true, anchorEl: element });
  }

  /**
   * Closes the menu.
   */
  closeMenu() {
    this.setState({ open: false });
  }

  /**
   * Log sout the user from Firebase.
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
      <div>
        <IconButton
          className={classes.button}
          aria-label="More"
          aria-owns={this.state.open ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={e => this.openMenu(e.currentTarget)}>
          <MoreVertIcon />
        </IconButton>
        <Popover
          id="long-menu"
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          onRequestClose={() => this.closeMenu()}>
          <List onClick={() => this.closeMenu()}>
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
        </Popover>
      </div>
    )
  }
}

export default compose(withStyles(styles), firebaseConnect())(DropdownMenu);
