'use strict';exports.__esModule = true;
















var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _reactRedux = require('react-redux');
var _reactRouterDom = require('react-router-dom');
var _Button = require('material-ui/Button');var _Button2 = _interopRequireDefault(_Button);
var _Avatar = require('material-ui/Avatar');var _Avatar2 = _interopRequireDefault(_Avatar);
var _styles = require('material-ui/styles');
var _redux = require('redux');
var _colors = require('material-ui/colors');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
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
                                                                                                                                           */const styles = { root: { display: 'flex', textDecoration: 'none' }, avatar: { marginRight: '-20px', borderRadius: '20px', border: '2px white solid', zIndex: 3 }, button: {
    paddingLeft: '35px',
    zIndex: 2 },

  label: {
    color: _colors.common.white } };



/**
                                      * Widget showing the user status.
                                      */
class UserStatus extends _react2.default.Component {constructor(...args) {var _temp;return _temp = super(...args), this.














    state = {
      anchorEl: null,
      open: false }, _temp;} /**
                              * Properties types.
                              */
  /**
                                  * @inheritDoc
                                  */
  render() {
    const isUserSignedIn = !this.props.auth.isEmpty;
    const classes = this.props.classes;

    if (isUserSignedIn) {
      return (
        _react2.default.createElement(_reactRouterDom.Link, { to: `/user/${this.props.auth.uid}`, className: classes.root },
          _react2.default.createElement(_Avatar2.default, { alt: this.props.auth.displayName,
            src: this.props.auth.photoURL,
            className: classes.avatar }),
          _react2.default.createElement(_Button2.default, { className: classes.button + ' ' + classes.label }, this.props.auth.displayName)));


    }
    return (
      _react2.default.createElement(_reactRouterDom.Link, { to: '/', className: classes.root },
        _react2.default.createElement(_Button2.default, { className: classes.label }, 'Sign in')));


  }}


const mapStateToProps = state => {
  return { auth: state.firebaseState.auth };
};exports.default =

(0, _redux.compose)((0, _styles.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps))(UserStatus);
//# sourceMappingURL=UserStatus.js.map