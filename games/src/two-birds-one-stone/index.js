import React, {Component} from 'react';
import Phaser from 'phaser';
import DragPlugin from './plugins/rexdragplugin.min.js';
import MainView from './scenes/main_view.js';
import CreateTask from './components/create_task.js';
import ToDo from './components/todo.js';
import * from tbosConstants as './tbos_constants'
class TwoBirdsOneStone extends Component {


  //react parent component
  constructor(props) {
    super(props);
    let displayTypes = tbosConstants.displayTypes;
    let display = {};
    for (var type of Object.keys(displayTypes)) {
      display[type] = "none";
    }
    this.setState({
      display
    });
    this.createNewTask =  this.createNewTask.bind(this);
    this.toggleCreateView = this.toggleCreateView.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
  }


  changeDisplay(view) {
    let newDisplayState = Object.assign({}, this.props.display);
    newDisplayState[view] = newDisplayState[view] == "block" ? "none": "block";
    this.setState({"display": newDisplayState});
  }

  //handler for creating a new task from create new task view from pulling together
  //other tasks
  createNewTask(taskName) {

    let taskAKey = this.game.scene.getScene("MainView").collisions.textToText.objectA.id;
    let taskBKey = this.game.scene.getScene("MainView").collisions.textToText.objectB.id;
    createNewTaskAction(taskAKey, taskBKey, taskName, this.getRootId()); //dispatches action to make a new task from two subtasks
    this.changeDisplay(tbosConstants.displayTypes.createOne);
  }

  toggleCreateView() {
    this.changeDisplay(tbosConstants.displayTypes.createMany);
  }


  getRootId() {
    return this.props.tbosRootPath[-1];
  }

  getRootTasksAsArray() {
    let tasks = Object.keys(this.props.tasks[this.getRootId()])
    return tasks.filter(task=> this.props.active);
  }

  //add game container and hidden views into DOM
  render() {

    return (
      <div>
        <div id="tbos-canvas"/>

        <div className="button-new-task" onClick={this.toggleCreateView} ><img className="img-tbos-nav" src="https://cdn3.iconfinder.com/data/icons/buttons/512/Icon_31-512.png"></img></div>
        <CreateTask display={this.state.display[tbosConstants.displayTypes.createOne]} createNewTask={this.createNewTask}/>
        <ToDo display={this.state.display[tbosConstants.displayTypes.createMany]} toggleCreateView={this.toggleCreateView} />
        </div>
    );
  }

  //instantiate phaser game after render
  componentDidMount() {

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
  // shouldComponentUpdate() {
  //   return false;
  // }
}

export default TwoBirdsOneStone;
