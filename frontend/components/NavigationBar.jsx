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
import Link from 'react-router-dom/Link';
import { withStyles } from 'material-ui/styles';
import TrendingUpIcon from 'material-ui-icons/TrendingUp';
import Tabs, { Tab } from 'material-ui/Tabs';
import HomeIcon from 'material-ui-icons/Home';
import { common } from 'material-ui/colors';

const styles = {
  tabWrapper: {
    flexDirection: 'row',
    color: common.white
  },
  tabLabel: {
    padding: '0 8px'
  },
  tabRoot: {
    height: '48px'
  },
  link: {
    textDecoration: 'none'
  }
};

/**
 * This is a Tab warped in a Link.
 */
class LinkTab extends React.Component {

  static muiName = 'Tab';

  /**
   * Properties types.
   */
  props: {
    value: String,
    classes?: Object
  };

  /**
   * @inheritDoc
   */
  render() {
    const classes = this.props.classes;
    const tabStyles = {
      root: classes.tabRoot,
      wrapper: classes.tabWrapper,
      labelContainer: classes.tabLabel
    };
    return (
      <Link to={this.props.value} className={classes.link}>
        <Tab {...this.props} classes={tabStyles}>Hello</Tab>
      </Link>
    )
  }
}
LinkTab = withStyles(styles)(LinkTab);

/**
 * A Navigation Bar implemented as a ReactRouter-aware material-ui Tabs.
 */
class NavigationBar extends React.Component {

  /**
   * Properties types.
   */
  props: {
    pathname: String
  };

  /**
   * @inheritDoc
   */
  render() {
    if (this.props.isSignedIn) {
      return (
        <Tabs className={this.props.classes.root} value={this.props.pathname} onChange={() => {}}>
          <LinkTab value="/home" icon={<HomeIcon/>} label="HOME"/>
          <LinkTab value="/recent" icon={<TrendingUpIcon/>} label="RECENT"/>
        </Tabs>
      );
    }

    return (
      <Tabs value={this.props.pathname} onChange={() => {}}>
        <LinkTab value="/recent" icon={<TrendingUpIcon/>} label="RECENT"/>
      </Tabs>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  isSignedIn: !state.firebaseState.auth.isEmpty
});

export default compose(withStyles(styles), connect(mapStateToProps))(NavigationBar);
