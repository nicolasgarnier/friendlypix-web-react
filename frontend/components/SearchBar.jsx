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
import { withStyles } from 'material-ui/styles';
import SearchIcon from 'material-ui-icons/Search';
import TextField from 'material-ui/TextField';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { common, lightBlue } from 'material-ui/colors';

const styles = theme => ({
  root: {
    display: 'block',
    color: common.white,
    backgroundColor: lightBlue['600'],
    borderRadius: '3px',
    padding: '5px 10px 5px 5px',
    marginRight: '20px',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      marginRight : '6px'
    }
  },
  icon: {
    position: 'relative',
    top: '7px',
    margin: '0 5px'
  },
  textField: {
    color: common.white,
    '&:before': {
      display: 'none'
    },
    '&:after': {
      display: 'none'
    }
  }
});

/**
 * The Search Bar.
 */
class SearchBar extends React.Component {

  /**
   * Properties types.
   */
  props: {
    classes: Object
  };

  /**
   * @inheritDoc
   */
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <SearchIcon
          className={classes.icon}
          onClick={() => this.textInput.focus()}
        />
        <TextField
          inputRef={element => this.textInput = element}
          type="search"
          InputClassName={classes.textField}
          margin="none"
        />
      </div>
    )
  }
}

export default compose(withStyles(styles), firebaseConnect(), connect())(SearchBar);
