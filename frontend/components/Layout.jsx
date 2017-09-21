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
 * See the License for t`he specific language governing permissions and
 * limitations under the License.
 */
// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import HomeIcon from 'material-ui-icons/Home';
import PhotoIcon from 'material-ui-icons/Photo';
import TrendingUpIcon from 'material-ui-icons/TrendingUp';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Tabs, { Tab } from 'material-ui/Tabs';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import SearchBar from './SearchBar';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import DropdownMenu from './MoreMenu';
import UserStatus from './UserStatus'
import './app.global.css';
import { lightBlue, common } from 'material-ui/colors';


const styles = {
  appBar: {
    backgroundColor: lightBlue['700']
  },
  sideBarButton: {
    color: common.white
  },
  spacer: {
    flexGrow: '1'
  },
  toolBar: {
    margin: 'auto',
    maxWidth: '1024px',
    padding: '10px 20px',
    width: '100%',
    justifyContent: 'space-between',
    minHeight: '100px'
  },
  subToolBar: {
    padding: '0',
    minHeight: '48px'
  },
  subAppBar: {
    backgroundColor: lightBlue['600']
  },
  logo: {
    display: 'flex',
    color: common.white,
    textDecoration: 'none',
    fontSize: '34px',
    fontFamily: '"Amaranth", sans-serif'
  },
  logoIcon: {
    margin: '5px 7px 0 0',
    width: '32px',
    height: '32px'
  },
  takePicButton: {
    position: 'fixed',
    bottom: '10px',
    right: '10px'
  },
  uploadPicButton: {
    position: 'absolute',
    right: '20px',
    bottom: '-25px'
  },
  mediaCapture: {
    display: 'none'
  },
  tabWrapper: {
    flexDirection: 'row',
    color: common.white
  },
  tabLabel: {
    padding: '0 8px'
  },
  tabRoot: {
    height: '48px'
  }
};

/**
 * Entry point to the FriendlyPix app.
 */
class FriendlyPixLayout extends React.Component {

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
    },
    classes: Object
  };

  state = {
    navigationIndex: 0
  };

  /**
   * @inheritDoc
   */
  render() {
    const classes = this.props.classes;
    return (
      <div>
        {/* Header section containing logo, menus... */}
        <AppBar position="static" className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            {/* SideBar button */}
            <IconButton
              aria-label="Menu"
              className={classes.sideBarButton}
              onClick={() => this.setState({drawerOpen: true})}>
              <MenuIcon/>
            </IconButton>

            {/* Logo */}
            <Link to="/recent" className={classes.logo}>
              <PhotoIcon className={classes.logoIcon}/> Friendly Pix
            </Link>

            <div className={classes.spacer}/>

            {/* Search bar */}
            <SearchBar/>

            {/* Signed-in User Info */}
            <UserStatus/>

            {/* Drop Down Menu */}
            <DropdownMenu/>
          </Toolbar>

          {/* Navigation bar - TODO: Make this redux-Router-aware */}
          <div className={classes.subAppBar}>
            <Toolbar className={classes.toolBar + ' ' + classes.subToolBar}>
              <Tabs
                value={this.state.navigationIndex}
                onChange={(event, value) => this.setState({navigationIndex: value})}>
                <Tab icon={<HomeIcon/>} label="HOME" classes={{root: classes.tabRoot, wrapper: classes.tabWrapper, labelContainer: classes.tabLabel}}/>
                <Tab icon={<TrendingUpIcon/>} label="RECENT" classes={{root: classes.tabRoot, wrapper: classes.tabWrapper, labelContainer: classes.tabLabel}}/>
              </Tabs>

              {/* Floating Take Picture Button */}
              <input type="file" accept="image/*;capture=camera" className={classes.mediaCapture}/>
              <Button fab color="accent" aria-label="upload-file" className={classes.uploadPicButton}>
                <i className="material-icons">file_upload</i>
              </Button>

              {/* Floating Take Picture Button */}
              <Button fab color="accent" aria-label="take-picture" className={classes.takePicButton}>
                <i className="material-icons">photo_camera</i>
              </Button>
            </Toolbar>
          </div>
        </AppBar>

        {/* Drawer menu */}
        <Drawer open={this.state.drawerOpen} onRequestClose={() => this.setState({drawerOpen: false})}>
          <List>
            <Link to="/about">
              <ListItem button>
                <Avatar>
                  <i className="material-icons">perm_contact_calendar</i>
                </Avatar>
                <ListItemText primary="About - Help - Contact"/>
              </ListItem>
            </Link>
            <Divider inset />
            <ListItem button>
              <Avatar>
                <i className="material-icons">exit_to_app</i>
              </Avatar>
              <ListItemText primary="Sign Out"/>
            </ListItem>
          </List>
        </Drawer>

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

export default compose(withStyles(styles), firebaseConnect(), connect(mapStateToProps, mapDispatchToProps))(FriendlyPixLayout);
