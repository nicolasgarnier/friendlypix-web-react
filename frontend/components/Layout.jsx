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
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Avatar from 'material-ui/Avatar';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Menu, { MenuItem } from 'material-ui/Menu';
import SearchIcon from 'material-ui-icons/Search';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import './app.global.css';

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
    }
  };

  state = {
    anchorEl: null,
    open: false,
  };

  handleClick(event) {
    this.setState({ open: true, anchorEl: event.currentTarget });
  }

  handleRequestClose() {
    this.setState({ open: false });
  }

  /**
   * @inheritDoc
   */
  render() {
    return (
      <div>
        {/* Header section containing logo and menu */}
        <AppBar position="static">
          <Toolbar>
            <IconButton color="contrast" aria-label="Menu">
              <MenuIcon/>
            </IconButton>

            {/* Logo */}
            <Link to="/feed">
              <i className="material-icons">photo</i>
              <Typography type="title" color="inherit">Friendly Pix</Typography>
            </Link>


            <div >
              <div >
                <SearchIcon />
              </div>
              <input id="docsearch-input" />
            </div>


            <Button color="contrast">Sign out</Button>
            <Avatar alt="Nicola Garnier" src="https://lh3.googleusercontent.com/-jgzSIY9hRSw/AAAAAAAAAAI/AAAAAAAAImQ/pT-EciMF54I/photo.jpg"/>
            <Button color="contrast">Nicolas Garnier</Button>

            <div>
              <IconButton
                aria-label="More"
                aria-owns={this.state.open ? 'long-menu' : null}
                aria-haspopup="true"
                onClick={e => this.handleClick(e)}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                onRequestClose={() => this.handleRequestClose()}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                    width: 200
                  },
                  }}>
                <MenuItem key='XX' selected={true}>
                  Cool
                </MenuItem>
                <MenuItem key='XXX'>
                  Cool2
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>


        <header className="fp-header mdl-layout__header mdl-color-text--white mdl-color--light-blue-700">
          <div className="mdl-layout__header-row fp-titlebar">


            {/* Search bar */}
            <div className="fp-searchcontainer mdl-textfield mdl-js-textfield mdl-textfield--expandable">
              <button><i className="material-icons">search</i></button>
              <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="searchQuery">

              </label>
              <div className="mdl-textfield__expandable-holder">
                <input className="mdl-textfield__input" type="text" id="searchQuery">
                </input>
                  <label className="mdl-textfield__label" htmlFor="searchQuery">Enter your query...</label>
              </div>
              <div id="fp-searchResults" className="mdl-card mdl-shadow--2dp"></div>
            </div>

            {/* Signed-in User Info */}
            <div className="mdl-cell--hide-phone">
              <Link to="/"><button className="fp-sign-in-button fp-signed-out-only mdl-button mdl-js-button mdl-js-ripple-effect"><i className="material-icons">account_circle</i> Sign in</button></Link>
              <div className="fp-signed-in-user-container mdl-cell--hide-phone fp-signed-in-only">
                <a className="fp-usernamelink mdl-button mdl-js-button">
                  <div className="fp-avatar"></div>
                  <div className="fp-username mdl-color-text--white"></div>
                </a>
              </div>
            </div>

            {/* Drop Down Menu */}
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon mdl-cell--hide-phone" id="fp-menu">
              <i className="material-icons">more_vert</i>
            </button>
            <ul className="fp-menu-list mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" htmlFor="fp-menu">
              <Link to="/about">
                <li className="mdl-menu__item"><i className="material-icons">perm_contact_calendar</i> About - Help - Contact</li>
              </Link>
              <li className="fp-sign-out mdl-menu__item fp-signed-in-only"><i className="material-icons">exit_to_app</i> Sign out</li>
            </ul>
          </div>

          {/* Navigation Bar */}
          <div className="fp-tab mdl-layout__header-row mdl-cell--hide-phone mdl-color--light-blue-600">
            <div className="mdl-tab">
              <Link to="/" id="fp-menu-home" className="mdl-layout__tab fp-signed-in-only is-active mdl-button mdl-js-button mdl-js-ripple-effect"><i className="material-icons">home</i> Home</Link>
              <Link to="/feed" id="fp-menu-feed" className="mdl-layout__tab mdl-button mdl-js-button mdl-js-ripple-effect"><i className="material-icons">trending_up</i> Feed</Link>
              <input id="fp-mediacapture" type="file" accept="image/*;capture=camera"/>
              <button className="fp-signed-in-only mdl-button mdl-js-button mdl-button--fab mdl-cell--hide-tablet mdl-color--amber-400 mdl-shadow--4dp mdl-js-ripple-effect" id="add">
                <i className="material-icons">file_upload</i>
              </button>
            </div>
          </div>
          <button className="fp-signed-in-only mdl-cell--hide-desktop mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-color--amber-400 mdl-shadow--4dp" id="add-floating">
            <i className="material-icons">photo_camera</i>
          </button>
        </header>

        {/* Drawer menu */}
        <div className="mdl-cell--hide-desktop mdl-cell--hide-tablet mdl-layout__drawer">
          <Link to="/" className="fp-signed-out-only"><button className="fp-sign-in-button mdl-button mdl-js-button mdl-js-ripple-effect"><i className="material-icons">account_circle</i> Sign in</button></Link>
          <div className="fp-signed-in-user-container mdl-color--light-blue-700 fp-signed-in-only">
            <a className="fp-usernamelink">
              <div className="fp-avatar"></div>
              <div className="fp-username mdl-color-text--white"></div>
            </a>
          </div>
          <nav className="mdl-navigation">
            <a className="mdl-navigation__link is-active fp-signed-in-only" href="/"><i className="material-icons">home</i> Home</a>
            <a className="mdl-navigation__link" href="/feed"><i className="material-icons">trending_up</i> Feed</a>
            <hr />
            <a className="mdl-navigation__link" href="/about"><i className="material-icons">perm_contact_calendar</i> About - Help - Contact</a>
            <hr className="fp-signed-in-only"/>
            <a className="fp-sign-out mdl-navigation__link fp-signed-in-only"><i className="material-icons">exit_to_app</i> Sign Out</a>
          </nav>
        </div>

        <main className="mdl-layout__content mdl-color--grey-100">
          {this.props.children}
        </main>
      </div>
    )
  }
}



const mapStateToProps = state => {
  return state;


    // <div>
    // <h1>TITLE</h1>
    // <div>
    // <Link to="/">Splash</Link> - <Link to="/recent">Recent Posts Feed</Link> - <Link to="/home">Home</Link>
    // - <Link to="/user/1">View User 1</Link> - <Link to="/post/1">View Post 1</Link> - <Link to="/about">About</Link>
    // - <Link to="/new">Create New</Link>
    // <Button raised color="accent" onClick={this.props.firebase.logout}>Logout</Button>
    // </div>
    // <div>
    // {this.props.children}
    // </div>
    // </div>

};

const mapDispatchToProps = (dispatch: Function, ownProps) => ({
});

export default compose(firebaseConnect(), connect(mapStateToProps, mapDispatchToProps))(FriendlyPixLayout);
