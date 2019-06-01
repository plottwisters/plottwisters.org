import React, {Component} from 'react';
import Phaser from 'phaser';
import DragPlugin from './plugins/rexdragplugin.min.js';
import MainView from './scenes/main_view.js';
import CreateTask from './components/create_task.js';
import ToDo from './components/todo.js';

class TwoBirdsOneStone extends Component {


  //react parent component
  constructor(props) {
    super(props);
    this.state = {
      display: "none",
      displayCreate: "none"
    };
    let tasks = {
      "Task 2": {},
      "Task 3": {},
      "Cat 1": {
        "Task 1": {}
      }
    };

    this.setState({
      tasks: tasks,
      rootPath: []
    });
    this.createNewTask =  this.createNewTask.bind(this);
    this.openCreateView = this.openCreateView.bind(this);
  }

  //handler for creating a new task from create new task view from pulling together
  //other tasks
  createNewTask(taskName) {
    let tasks = this.state.tasks;
    tasks[taskName] = {}
    let taskAKey = this.game.scene.getScene("MainView").collisions.textToText.objectA.text;
    let taskBKey = this.game.scene.getScene("MainView").collisions.textToText.objectB.text;

    tasks[taskName] = {}
    tasks[taskName][taskAKey] = tasks[taskAKey];
    tasks[taskName][taskBKey] = tasks[taskBKey];  
    delete tasks[taskAKey];
    delete tasks[taskBKey];

    this.setState({
      tasks: tasks,
      display:  "none",
      displayCreate: "none"
    });
  }



  openCreateView() {
    this.setState({
      displayCreate: "block"
    });
  }


  //add game container and hidden views into DOM
  render() {

    return (
      <div>
        <div id="tbos-canvas"/>

        <div className="button-new-task" onClick={this.openCreateView} ><img className="img-tbos-nav" src="https://cdn3.iconfinder.com/data/icons/buttons/512/Icon_31-512.png"></img></div>
        <CreateTask display={this.state.display} createNewTask={this.createNewTask}/>
        <ToDo display={this.state.displayCreate} />
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
