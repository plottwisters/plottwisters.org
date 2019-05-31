import React, {Component} from 'react';
import Phaser from 'phaser';
import DragPlugin from './plugins/rexdragplugin.min.js';
import MainView from './scenes/main_view.js';
import CreateTask from './components/create_task.js';
import ToDo from './components/todo.js';

class TwoBirdsOneStone extends Component {



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
  createNewTask(taskName) {
    let tasks = this.state.tasks;
    tasks[taskName] = {}
    delete tasks[this.game.scene.getScene("MainView").textCollision.objectA.text];
    delete tasks[this.game.scene.getScene("MainView").textCollision.objectB.text];

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
  // shouldComponentUpdate() {
  //   return false;
  // }
}

export default TwoBirdsOneStone;
