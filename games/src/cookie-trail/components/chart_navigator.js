import React, {Component} from 'react';
import Chart from 'chart.js';
import { connect } from 'react-redux';
import {TaskState} from './../../global_constants';
// import CheckboxTree from 'react-checkbox-tree';
import Leaf from './jenny-attempt/Leaf';
import CheckboxTree from './checkboxes/CheckboxTree';
import 'react-checkbox-tree/src/scss/react-checkbox-tree.scss';

class ChartNavigator extends Component {


  //react parent component
  constructor(props) {
    super(props);





    let checked = {};
    for(let trail of this.props.checkedCookieTrails) {
      checked[trail] = trail;
    }
    this.state = {
        checked,
        expanded: {}
    };

  }
  toggleVisibility = item => {
      let checked = Object.assign({}, this.state["checked"]);
      if(checked[item] != undefined) {
        delete checked[item];
      } else {
        checked[item] = item;
      }
      this.setState({checked});
      this.props.toggleCookieTrail(Object.keys(checked));
  };
  toggleExpansion = item => {

      let expanded = Object.assign({}, this.state["expanded"]);
      if(expanded[item] != undefined) {
        delete expanded[item];
      } else {
        expanded[item] = item;
      }
      this.setState({expanded});
  };

  componentDidUpdate(newProps) {
  const oldProps = this.props;

  if(this.props.checkedCookieTrails !== newProps.checkedCookieTrails) {

    let checked = {};
    for(let trail of this.props.checkedCookieTrails) {
      checked[trail] = trail;
    }
    this.setState({   checked })
  }
}


  //add game container and hidden views into DOM
  render() {
    let hiearchy = this.props.hiearchy;
    let active = this.props.active;
    let name = this.props.name;
    let cookieTrail = this.props.tbosCookieTrail;
    console.log(cookieTrail);
    function processCurrentName(currentName) {
      // recursion to generate tree from redux store
      // map store into what charts.js wants: which is key: { }.
      let currentRoot = hiearchy[currentName];
      let childrenNames = [];
      for(let child in currentRoot) {
          if(active[child] == TaskState.deleted) {
            continue;
          }
          childrenNames.push(child);
      }
      let newTreeNodes = {children: [], className: 'hiearchy-cookie-trail-checkbox', value: currentName, label: name[currentName], isValid: true};
      let currentChildNode;

      if(childrenNames.length > 0) {
        for(let childName of childrenNames) {


          currentChildNode = processCurrentName(childName);
          if(currentChildNode.isValid && cookieTrail[childName].length > 0) {
            newTreeNodes.children.push(currentChildNode);
          }
        }
      } else {
        newTreeNodes["isValid"] = false;
      }
      return newTreeNodes;
    }
    this.treeNodes = [processCurrentName("idroot")];
    const { checked, expanded } = this.state;
    console.log(checked);
    return (


      <div id="plotsWrap">
        <div id="plots">
          <div className="bar"></div>
          <Leaf checkedTrails={checked} toggleVisibility={this.toggleVisibility} toggleExpansion={this.toggleExpansion}  expandedTrails={expanded} key={this.treeNodes[0].value} node={this.treeNodes[0]}/>
        </div>
      </div>
    );
  }

  //instantiate phaser game after render


  //commented out for now - this is not important as long as there is no need for the
  //immediate dom parent of the phaser game to rerender - but may be important
  //if there is a need
  // shouldComponentUpdate() {
  //   console.log(this.state.display);
  //   return true;
  // }
}

export default ChartNavigator;
