// @flow

import React from 'react';
import { connect } from 'react-redux';
import 'firebase/auth';


/**
 * Entry point to the Recent Posts Feed.
 */
class RecentPostsFeed extends React.Component {

  /**
   * Constructor for the Recent Posts Feed.
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
        <h1>RECENT POSTS FEED</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch: Function, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(RecentPostsFeed);
