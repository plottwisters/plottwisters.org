import React, {Component} from 'react';

class Leaf extends React.Component {
    constructor(props) {
      super(props);
      this.props = props;
    }

    setProps(props) {
        this.props = props;
    }

    render() {
      return(
      <label className="plot">
        <input className="plotVisibility" type="checkbox"/>
        <span className="plotName">{name}</span>
        <div className="divider"></div>
      </label>
      );
    }
}

export default Leaf;
