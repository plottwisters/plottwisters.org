import React, { Component } from 'react';
import CheckViewItem from './check_view_item';
import { log } from 'util';

import {TaskState} from './../../global_constants';
import memoize from "memoize-one";
class CheckView extends Component {
    constructor(props) {
        super(props);
        this.state = {
          "completed": {}
        };
        this.processTasksState = this.processTasksState.bind(this);
        this.goback = this.goback.bind(this);
    };

    processTasksState(outerProps) {
        let tasksToAdd = [];
        let searchNodes = [outerProps.tbosRootPath[outerProps.tbosRootPath.length - 1]];
        let currentNode;
        let isLeaf;
        while(searchNodes.length > 0) {
          currentNode = searchNodes.pop();
          isLeaf = false;
          for (let key in outerProps.hiearchy[currentNode]) {
            if(outerProps.active[key]== TaskState.active) {
              isLeaf = true;
              searchNodes.push(key);
            }
          }
          if(!isLeaf) {
            tasksToAdd.push({
                "name": outerProps.name[currentNode],
                "key": currentNode
            });
          }
        }
        return tasksToAdd;
    }


    toggleCheck = item => {
        let completed = Object.assign({}, this.state["completed"]);
        if(completed[item] != undefined) {
          delete completed[item];
        } else {
          completed[item] = item;
        }
        this.setState({completed});

    };

    goback() {
        let currentTimestamp = new Date().getTime();
        for(let checkItem in this.state["completed"]) {
          
          this.props.completeTaskAction(checkItem, this.props.outerProps.tbosRootPath[this.props.outerProps.tbosRootPath.length - 1], currentTimestamp);
        }
        this.props.toggleChecklistView();

    };

    processTasksStateMain = memoize(
    (outerProps) => this.processTasksState(outerProps)
  );
    render() {
        const stateResult = this.processTasksStateMain(this.props.outerProps);

        return (
            <div style={{ display: this.props.display }} className="tbos-overlay">
                <div className="todo">
                    <div className="todo-content-container">
                        <div className="full-screen-popup-header">
                            <h1>Checklist view</h1>
                            <button className="ToDo-OK" onClick={this.goback}>OK</button>
                        </div>
                        <div className="todo-tasks-container">
                            {stateResult.map((item) => {
                                return <CheckViewItem
                                    key={item.key}
                                    id={item.key}
                                    name={item.name}
                                    toggleCheck={this.toggleCheck}
                                />
                            }
                            )}
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default CheckView;
