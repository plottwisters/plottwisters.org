import React, {Component} from 'react';
import Phaser from 'phaser';
import DragPlugin from './plugins/rexdragplugin.min.js';
import MainView from './scenes/main_view.js';
import CreateTask from './components/create_task.js';
class TwoBirdsOneStone extends Component {



  constructor(props) {
    super(props);
    this.state = {display: "none"};

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


  render() {

    return (
      <div>
        <div id="tbos-canvas"/>
        <CreateTask display={this.state.display}/>
      </div>
    );
  }
  // shouldComponentUpdate() {
  //   return false;
  // }
}

export default TwoBirdsOneStone;
