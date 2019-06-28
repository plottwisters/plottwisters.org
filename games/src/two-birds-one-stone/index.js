import React, {Component} from 'react';
import Phaser from 'phaser';
import DragPlugin from './plugins/rexdragplugin.min.js';
import MainView from './scenes/main_view.js';
import CreateTask from './components/create_task.js';
import ToDo from './components/todo.js';
import CheckView from './components/check_view.js';
import {connect} from 'react-redux'
import * as tbosConstants from './tbos_constants';
import * as tbosActionCreators from './../redux/actions/tbos';
import {bindActionCreators} from 'redux';
import {TaskState} from './../global_constants';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import TbosCanvas from './components/tbos_canvas';
import CheckList from './components/check_list';
import AddTask from './components/add_task';
import CustomDragLayer from './components/tbos_drag_canvas'
class TwoBirdsOneStone extends Component {




  //react parent component
  constructor(props) {
    super(props);
    let displayTypes = tbosConstants.displayTypes;
    let display = {};
    for (var type of Object.keys(displayTypes)) {
      display[type] = "none";
    }
    this.state = {
      display
    };

    this.createNewTask = this.createNewTask.bind(this);
    this.toggleCreateView = this.toggleCreateView.bind(this);
    this.toggleChecklistView = this.toggleChecklistView.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
    this.toggleCreateTask = this.toggleCreateTask.bind(this);
    const {dispatch} = props;
    this.boundActionCreators = bindActionCreators(tbosActionCreators, dispatch);



  }

  changeDisplay(view) {
    let newDisplayState = {
      ...this.state.display
    };
    newDisplayState[view] = newDisplayState[view] == "block"
      ? "none"
      : "block";
    this.setState({"display": newDisplayState});
  }

  //handler for creating a new task from create new task view from pulling together
  //other tasks
  createNewTask(taskId) {

    let taskAKey = this.game.scene.getScene("MainView").collisions.textToText.objectA.idTbos;
    let taskBKey = this.game.scene.getScene("MainView").collisions.textToText.objectB.idTbos;

    this.boundActionCreators.createNewTaskAction(taskAKey, taskBKey, taskId, this.getRootId()); //dispatches action to make a new task from two subtasks

    this.toggleCreateTask();
  }
  toggleCreateTask() {
    this.changeDisplay(tbosConstants.displayTypes.createOne);
  }
  toggleCreateView() {
    this.changeDisplay(tbosConstants.displayTypes.createMany);
  }

  toggleChecklistView() {
    this.changeDisplay(tbosConstants.displayTypes.checkList);
  }

  getRootId() {

    return this.props.tbosRootPath[this.props.tbosRootPath.length - 1];
  }

  getRootTasksAsArray() {
    let tasks = Object.keys(this.props.hiearchy[this.getRootId()])
    return tasks.filter(task => this.props.active[task] == TaskState.active);
  }



  /*drag and drop functionality*/







  //add game container and hidden views into DOM
  render() {

    return (

      <div>

          <div id="list">
            <div className="upTreeList"></div>
            <CheckList {...this.props}  actionCreators={this.boundActionCreators}  tasks={this.getRootTasksAsArray()}/>
            <AddTask actionCreators={this.boundActionCreators} currentRoot={this.props.tbosRootPath[this.props.tbosRootPath.length - 1]}/>

          </div>

        <DndProvider backend={HTML5Backend}>
          
          <TbosCanvas actionCreators={this.boundActionCreators} outerObject={this} {...this.props}></TbosCanvas>
          <CustomDragLayer />

        </DndProvider>

      </div>
    );
  }



}

function mapStateToProps(state) {

  return state.present;
}

export default connect(mapStateToProps)(TwoBirdsOneStone);
