import React, {Component} from 'react';
import Phaser from 'phaser';
import DragPlugin from './plugins/rexdragplugin.min.js';
import MainView from './scenes/main_view.js';
import CreateTask from './components/create_task.js';
import ToDo from './components/todo.js';
import CheckView from './components/check_view.js';
import { connect } from 'react-redux'
import * as tbosConstants from './tbos_constants';
import * as tbosActionCreators from './../redux/actions/tbos';
import {bindActionCreators} from 'redux';
import {TaskState} from './../global_constants';
import { getTasksThunk } from '../store'
import * as firebaseApp from '../firebase/config'
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
    
    this.createNewTask =  this.createNewTask.bind(this);
    this.toggleCreateView = this.toggleCreateView.bind(this);
    this.toggleChecklistView = this.toggleChecklistView.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
    this.toggleCreateTask = this.toggleCreateTask.bind(this);
    const { dispatch } = props;
    this.boundActionCreators = bindActionCreators(tbosActionCreators, dispatch);
  }


  changeDisplay(view) {
    let newDisplayState = {...this.state.display};
    newDisplayState[view] = newDisplayState[view] == "block" ? "none": "block";
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
    if(this.props.active == undefined) {
      return [];
    }
    let tasks = Object.keys(this.props.hiearchy[this.getRootId()])
    return tasks.filter(task => this.props.active[task] == TaskState.active);
  }

  

  //add game container and hidden views into DOM
  render() {
    if(this.props.name == undefined) {
      return(<div></div>);
    }
    return (
      <div>
        <div id="tbos-canvas"/>
        <CreateTask display={this.state.display[tbosConstants.displayTypes.createOne]} cancelNewTask={this.toggleCreateTask} createNewTask={this.createNewTask}/>
        <ToDo {...this.boundActionCreators} outerProps = {this.props}  display={this.state.display[tbosConstants.displayTypes.createMany]} toggleCreateView={this.toggleCreateView} />
        <CheckView {...this.boundActionCreators} outerProps = {this.props}  display={this.state.display[tbosConstants.displayTypes.checkList]} toggleChecklistView={this.toggleChecklistView} />
        </div>
    );
  }

  //instantiate phaser game after render
  componentDidMount() {   
    if(document.cookie.length <= 0) { 
      firebaseApp.logIn();
    }
    let newScene = new MainView(this);
    let config = {
        type: Phaser.AUTO,
        width: "100",
        height: "100",
        parent: 'tbos-canvas',
        physics: {
            default: 'arcade'
        },
        scene: newScene,
        plugins: {
        global: [{
            key: 'rexDrag',
            plugin: DragPlugin,
            start: true
        }]
        }

    };

    this.game = new Phaser.Game(config);
  }

  //commented out for now - this is not important as long as there is no need for the
  //immediate dom parent of the phaser game to rerender - but may be important
  //if there is a need
  componentDidUpdate(prevProps, prevState) {
    if(this.props.name == undefined) {
      return;
    }
    if (prevProps !== this.props) {
      let currentScene = this.game.scene.getScene("MainView");
      currentScene.rerender();
    }

  }
}

function mapStateToProps(state){  
  return state.present;
}

const mapDispatch = dispatch => {
  dispatch(getTasksThunk())
  return {
  }
 }
 
export default connect(mapStateToProps,mapDispatch)(TwoBirdsOneStone);
