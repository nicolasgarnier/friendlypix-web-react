'use strict';exports.__esModule = true;
















var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _reactRedux = require('react-redux');
var _reactRouterDom = require('react-router-dom');
var _IconButton = require('material-ui/IconButton');var _IconButton2 = _interopRequireDefault(_IconButton);
var _Avatar = require('material-ui/Avatar');var _Avatar2 = _interopRequireDefault(_Avatar);
var _styles = require('material-ui/styles');
var _MoreVert = require('material-ui-icons/MoreVert');var _MoreVert2 = _interopRequireDefault(_MoreVert);
var _List = require('material-ui/List');var _List2 = _interopRequireDefault(_List);
var _Divider = require('material-ui/Divider');var _Divider2 = _interopRequireDefault(_Divider);
var _Popover = require('material-ui/Popover');var _Popover2 = _interopRequireDefault(_Popover);
var _redux = require('redux');
var _reactReduxFirebase = require('react-redux-firebase');
var _colors = require('material-ui/colors');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const styles = {
  noStyleLink: {
    textDecoration: 'none' },

  button: {
    color: _colors.common.white } };



/**
                                      * The Dropdown Menu.
                                      */ /**
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
                                          */class DropdownMenu extends _react2.default.Component {constructor(...args) {var _temp;return _temp = super(...args), this.state = { anchorEl: null,
      open: false }, _temp;} /**
                              * Properties types.
                              */
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
      _react2.default.createElement('div', null,
        _react2.default.createElement(_IconButton2.default, {
            className: classes.button,
            'aria-label': 'More',
            'aria-owns': this.state.open ? 'long-menu' : null,
            'aria-haspopup': 'true',
            onClick: e => this.openMenu(e.currentTarget) },
          _react2.default.createElement(_MoreVert2.default, null)),

        _react2.default.createElement(_Popover2.default, {
            id: 'long-menu',
            open: this.state.open,
            anchorEl: this.state.anchorEl,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right' },

            transformOrigin: {
              vertical: 'top',
              horizontal: 'right' },

            onRequestClose: () => this.closeMenu() },
          _react2.default.createElement(_List2.default, { onClick: () => this.closeMenu() },
            _react2.default.createElement(_reactRouterDom.Link, { to: '/about', className: classes.noStyleLink },
              _react2.default.createElement(_List.ListItem, { button: true },
                _react2.default.createElement(_Avatar2.default, null,
                  _react2.default.createElement('i', { className: 'material-icons' }, 'perm_contact_calendar')),

                _react2.default.createElement(_List.ListItemText, { primary: 'About - Help - Contact' }))),


            _react2.default.createElement(_Divider2.default, { inset: true }),
            _react2.default.createElement(_List.ListItem, { button: true, onClick: () => this.logout() },
              _react2.default.createElement(_Avatar2.default, null,
                _react2.default.createElement('i', { className: 'material-icons' }, 'exit_to_app')),

              _react2.default.createElement(_List.ListItemText, { primary: 'Sign Out' }))))));





  }}exports.default =


(0, _redux.compose)((0, _styles.withStyles)(styles), (0, _reactReduxFirebase.firebaseConnect)(), (0, _reactRedux.connect)())(DropdownMenu);
//# sourceMappingURL=MoreMenu.js.map