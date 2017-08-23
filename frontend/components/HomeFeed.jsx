// @flow

import React from 'react';
import { connect } from 'react-redux';
import 'firebase/auth';

/**
 * Entry point to the Home Feed.
 */
class HomeFeed extends React.Component {

  /**
   * Constructor for the Home Feed.
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
  };

  /**
   * @inheritDoc
   */
  render() {
    return (
      <div>
        <h1>HOME FEED</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = (dispatch: Function, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeFeed);
