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
import DrawerContent from './DrawerContent';
import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import PhotoIcon from 'material-ui-icons/Photo';
import Drawer from 'material-ui/Drawer';
import SearchBar from './SearchBar';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import DropdownMenu from './MoreMenu';
import NavigationBar from './NavigationBar';
import UserStatus from './UserStatus';
import './app.global.css';
import { lightBlue, common } from 'material-ui/colors';


const styles = theme => ({
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
    boxSizing: 'border-box',
    minHeight: '90px',
    [theme.breakpoints.down('md')]: {
      minHeight: '60px',
      padding: '5px 0 5px 10px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0'
    }
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
    fontFamily: '"Amaranth", sans-serif',
    whiteSpace: 'nowrap',
    marginRight: '20px',
    [theme.breakpoints.down('md')]: {
      fontSize: '28px',
    }
  },
  logoIcon: {
    margin: '5px 7px 0 0',
    width: '32px',
    height: '32px',
    [theme.breakpoints.down('md')]: {
      width: '26px',
      height: '26px',
      marginTop: '4px'
    }
  },
  takePicButton: {
    position: 'fixed',
    bottom: '10px',
    right: '10px'
  },
  uploadPicButton: {
    position: 'absolute',
    right: '10px',
    bottom: '-25px'
  },
  mediaCapture: {
    display: 'none'
  }
});

/**
 * Entry point to the FriendlyPix app.
 */
class FriendlyPixLayout extends React.Component {

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
    drawerOpen: false
  };

  /**
   * Closes the Drawer.
   */
  closeDrawer() {
    this.setState({drawerOpen: false})
  }

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
            <Hidden smUp>
              <IconButton
                  aria-label="Menu"
                  className={classes.sideBarButton}
                  onClick={() => this.setState({drawerOpen: true})}>
                <MenuIcon/>
              </IconButton>
            </Hidden>

            {/* Logo */}
            <Link to="/recent" className={classes.logo}>
              <PhotoIcon className={classes.logoIcon}/> Friendly Pix
            </Link>

            <div className={classes.spacer}/>

            {/* Search bar */}
            <SearchBar/>

            {/* Signed-in User Info */}
            <Hidden xsDown>
              <UserStatus/>
            </Hidden>

            {/* Drop Down Menu */}
            <Hidden xsDown>
              <DropdownMenu/>
            </Hidden>
          </Toolbar>

          <Hidden xsDown>
            <div className={classes.subAppBar}>
              <Toolbar className={classes.toolBar + ' ' + classes.subToolBar}>
                {/* Navigation bar */}
                <NavigationBar/>

                {/* Floating Take Picture Button */}
                <input type="file" accept="image/*;capture=camera" className={classes.mediaCapture}/>
                  <Button fab color="accent" aria-label="upload-file" className={classes.uploadPicButton}>
                    <i className="material-icons">file_upload</i>
                  </Button>
              </Toolbar>
            </div>
          </Hidden>

          {/* Floating Take Picture Button */}
          <Hidden smUp>
            <Button fab color="accent" aria-label="take-picture" className={classes.takePicButton}>
              <i className="material-icons">photo_camera</i>
            </Button>
          </Hidden>
        </AppBar>



        {/* Drawer menu */}
        <Drawer open={this.state.drawerOpen} onRequestClose={() => this.closeDrawer()}>
          <div role="button" onClick={() => this.closeDrawer()}>
            <DrawerContent/>
          </div>
        </Drawer>

        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default compose(withStyles(styles), firebaseConnect(), connect(state => state))(FriendlyPixLayout);
