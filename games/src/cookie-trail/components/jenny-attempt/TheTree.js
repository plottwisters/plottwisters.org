import React, {Component} from 'react';
import Leaf from './Leaf';
// import TreeNode from './TreeNode';

class TheTree extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div id="plots">
        <div className="bar"></div>

          <Leaf />

      </div>
     );
  }
}

export default TheTree;
