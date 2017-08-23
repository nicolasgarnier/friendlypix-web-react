// @flow

import React from 'react';
import { connect } from 'react-redux';

/**
 * Entry point to the FriendlyPix app.
 */
class NewPost extends React.Component {

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
  };

  /**
   * @inheritDoc
   */
  render() {
    return (
      <div>
        <h1>NEW POST</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = (dispatch: Function, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
