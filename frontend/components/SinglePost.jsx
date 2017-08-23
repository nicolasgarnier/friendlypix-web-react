// @flow

import React from 'react';
import { connect } from 'react-redux';

/**
 * Entry point to the FriendlyPix app.
 */
class SinglePost extends React.Component {

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
        <h1>SINGLE POST</h1>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // const apiData = state.apiData[ownProps.show.imdbID] ? state.apiData[ownProps.show.imdbID] : {};
  return state;
};

const mapDispatchToProps = (dispatch: Function, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
