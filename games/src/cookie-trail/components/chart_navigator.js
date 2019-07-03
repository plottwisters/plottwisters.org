import React, {Component} from 'react';
import Chart from 'chart.js';
import { connect } from 'react-redux';
import {TaskState} from './../../global_constants';
// import CheckboxTree from 'react-checkbox-tree';
// import TheTree from './jenny-attempt/TheTree.js';
import CheckboxTree from './checkboxes/CheckboxTree';
import 'react-checkbox-tree/src/scss/react-checkbox-tree.scss';
import 'font-awesome/scss/font-awesome.scss';
class ChartNavigator extends Component {


  //react parent component
  constructor(props) {
    super(props);


    let hiearchy = this.props.hiearchy;
    let active = this.props.active;
    let name = this.props.name;
    let cookieTrail = this.props.tbosCookieTrail;

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

    this.state = {
        checked: [],
        expanded: [],
    };
    this.onCheck = this.onCheck.bind(this);
    this.onExpand = this.onExpand.bind(this);
  }

  onCheck(checked) {
    this.props.toggleCookieTrail(checked);
  }

  onExpand(expanded) {
    this.setState({ expanded });

  }

  //add game container and hidden views into DOM
  render() {
    const { checked, expanded } = this.state;
    return (
      // <div id="plotsWrap">
      //   <CheckboxTree
      //     checked={this.props.checkedCookieTrails}
      //     expanded={expanded}
      //     noCascade
      //     nodes={this.treeNodes}
      //     onCheck={this.onCheck}
      //     onExpand={this.onExpand}
      //     showNodeIcon={false}
      //   />
      // </div>

      <div id="plotsWrap">
        <div id="plots">
          <div class="bar"></div>

          <label className="plot">
            <input className="plotVisibility" type="checkbox"/>
            <span className="plotName">Name of a category</span>
            <div className="expandCarrot"></div>
            <div class="divider"></div>

              <label className="plot">
                <input className="plotVisibility" type="checkbox"/>
                <span className="plotName">New category</span>
                <div class="divider"></div>

                  <label className="plot">
                    <input className="plotVisibility" type="checkbox"/>
                    <span className="plotName">Newer</span>
                    <div class="divider"></div>
                  </label>

                  <label className="plot">
                    <input className="plotVisibility" type="checkbox"/>
                    <span className="plotName">New nested category</span>
                    <div class="divider"></div>
                  </label>
              </label>

              <label className="plot">
                <input className="plotVisibility" type="checkbox"/>
                <span className="plotName">New category</span>
                <div class="divider"></div>

                <label className="plot">
                  <input className="plotVisibility" type="checkbox"/>
                  <span className="plotName">New category</span>
                  <div class="divider"></div>

                  <label className="plot">
                    <input className="plotVisibility" type="checkbox"/>
                    <span className="plotName">New category</span>
                    <div class="divider"></div>
                    <label className="plot">
                      <input className="plotVisibility" type="checkbox"/>
                      <span className="plotName">New category</span>
                      <div class="divider"></div>
                      <label className="plot">
                        <input className="plotVisibility" type="checkbox"/>
                        <span className="plotName">New category</span>
                        <div class="divider"></div>
                      </label>
                    </label>
                  </label>

                  <label className="plot">
                    <input className="plotVisibility" type="checkbox"/>
                    <span className="plotName">New category</span>
                    <div class="divider"></div>
                  </label>

                </label>

                <label className="plot">
                  <input className="plotVisibility" type="checkbox"/>
                  <span className="plotName">New category</span>
                  <div class="divider"></div>
                </label>

              </label>

          </label>

        <label className="plot">
          <input className="plotVisibility" type="checkbox"/>
          <span className="plotName">Name of yet another category</span>
          <div class="divider"></div>
        </label>

        </div>
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

export default ChartNavigator;
