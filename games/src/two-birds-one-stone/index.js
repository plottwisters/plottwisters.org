import React, {Component} from 'react';
import Phaser from 'phaser';
import DragPlugin from './plugins/rexdragplugin.min.js';
import MainView from './scenes/main_view.js';

class TwoBirdsOneStone extends Component {




  componentDidMount() {

    let config = {
        type: Phaser.AUTO,
        width: "100",
        height: "100",
        parent: 'tbos-canvas',
        physics: {
            default: 'arcade'
        },
        scene: MainView,
        plugins: {
        global: [{
            key: 'rexDrag',
            plugin: DragPlugin,
            start: true
        }]
        }

    };
    
    new Phaser.Game(config);
  }


  render() {
    return (
      <div id="tbos-canvas"/>
    );
  }
  shouldComponentUpdate() {
    return false;
  }
}

export default TwoBirdsOneStone;
