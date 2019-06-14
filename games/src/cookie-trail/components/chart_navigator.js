import React, {Component} from 'react';
import Chart from 'chart.js';
import { connect } from 'react-redux';
import {TaskState} from './../global_constants';
import CheckboxTree from 'react-checkbox-tree';
class ChartNavigator extends Component {


  //react parent component
  constructor(props) {
    super(props);
    let displayTypes = tbosConstants.displayTypes;
    let display = {};
    for (var type of Object.keys(displayTypes)) {
      display[type] = "none";
    }

    let hiearchy = this.props.hiearchy;
    let active = this.props.active;
    let currentNodes = [idroot];
    let currentRoot;
    let nodesAdded = 0;
    function processCurrentName(currentName) {

      let currentRoot = hiearchy[currentName];
      let childrenNames = [];
      for(let child in currentRoot) {
          if(active[child] == TaskState.deleted) {
            continue;
          }
          childrenNames.push(child);
      }
      let newTreeNodes = {children: [], name: };
      let currentChildNode;

      if(nodesAdded != 0) {
        for(let name of childrenNames) {
          currentChildNode = processCurrentName(name);
          if(currentChildNode.children.length > 0)
            newTreeNodes.children.append(currentChildNode);
        }
        newTreeNodes
      }

      return newTreeNodes;
    }
    }
    while (currentNodes.length > 0) {
      let currentName = currentNodes.pop();
      currentRoot = hiearchy[currentName];
      nodesAdded = 0;
      for(let child in currentRoot) {
          if(active[child] == TaskState.deleted) {
            continue;
          }
          ++nodesAdded;
          currentNodes.push(child);
      }
      if(nodesAdded != 0) {
        currentRoot["children"].append()
      }
    }
    this.state = {
        checked: [],
        expanded: [],
    };
  }



  //add game container and hidden views into DOM
  render() {
    return (
      <div id="">
      </div>
    );
  }

  //instantiate phaser game after render
  componentDidMount() {


  }

  //commented out for now - this is not important as long as there is no need for the
  //immediate dom parent of the phaser game to rerender - but may be important
  //if there is a need
  // shouldComponentUpdate() {
  //   console.log(this.state.display);
  //   return true;
  // }
}

function mapStateToProps(state){
  return state;
}
export default ChartNavigator;
