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
import { push } from 'react-router-redux';

/**
 * A react-router-redux compatible Redirect with additional conditional.
 */
class ConditionalRedirect extends React.Component {

  /**
   * Properties types.
   */
  props: {
    from: string,
    to?: string | Object,
    exact?: boolean,
    redirect?: Function
  };

  /**
   * @inheritDoc
   */
  componentWillReceiveProps(props) {
    this.onRouting(props);
  }

  /**
   * @inheritDoc
   */
  componentWillMount() {
    this.onRouting(this.props);
  }

  /**
   * Executing every time new routing should occur.
   *
   * @param {Object} props
   */
  onRouting(props) {
    if (props.if) {
      this.props.redirect(props.to);
    }
  }

  /**
   * @inheritDoc
   */
  render() {
    return null;
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  redirect(to) {
    dispatch(push(to));
  }
});

export default connect(state => state, mapDispatchToProps)(ConditionalRedirect);
