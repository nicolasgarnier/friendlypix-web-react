'use strict';exports.__esModule = true;
















var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _reactRedux = require('react-redux');
var _styles = require('material-ui/styles');
var _Search = require('material-ui-icons/Search');var _Search2 = _interopRequireDefault(_Search);
var _TextField = require('material-ui/TextField');var _TextField2 = _interopRequireDefault(_TextField);
var _redux = require('redux');
var _reactReduxFirebase = require('react-redux-firebase');
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
                                                                                                                                           */const styles = { root: { display: 'block', color: _colors.common.white, backgroundColor: _colors.lightBlue['600'], borderRadius: '3px', padding: '5px 10px 5px 5px', marginRight: '20px' }, icon: { position: 'relative', top: '7px', margin: '0 5px' },

  textField: {
    color: _colors.common.white,
    '&:before': {
      display: 'none' },

    '&:after': {
      display: 'none' } } };




/**
                              * The Search Bar.
                              */
class SearchBar extends _react2.default.Component {








  /**
                                                    * @inheritDoc
                                                    */
  render() {
    const classes = this.props.classes;
    return (
      _react2.default.createElement('div', { className: classes.root },
        _react2.default.createElement(_Search2.default, {
          className: classes.icon,
          onClick: () => this.textInput.focus() }),

        _react2.default.createElement(_TextField2.default, {
          inputRef: element => this.textInput = element,
          type: 'search',
          InputClassName: classes.textField,
          margin: 'none' })));



  } /**
     * Properties types.
     */}exports.default =
(0, _redux.compose)((0, _styles.withStyles)(styles), (0, _reactReduxFirebase.firebaseConnect)(), (0, _reactRedux.connect)())(SearchBar);
//# sourceMappingURL=SearchBar.js.map