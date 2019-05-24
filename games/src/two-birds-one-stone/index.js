import React, {Component} from 'react';
import Phaser from 'phaser';



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
        scene: {
            preload: this.preload,
            create: this.create
        }
    };
    new Phaser.Game(config);
  }

  preload ()
  {
      this.load.setBaseURL('http://labs.phaser.io');

      this.load.image('sky', 'assets/skies/space3.png');
      this.load.image('logo', 'assets/sprites/phaser3-logo.png');
      this.load.image('red', 'assets/particles/red.png');

      this.data.set("tasks",[
        {
          "name":"Task 1"
        },
        {
          "name":"Task 2"
        },
        {
          "name": "Task 3"
        },
        {
          "name": "Task 4"
        }
      ]);
  }
  create ()
  {



      let tasks = this.data.get("tasks").map((dataObject) => {
        let xPosition = Math.random() * this.game.scale.width;
        let yPosition = Math.random() * this.game.scale.height;
        let task = this.add.text(xPosition, yPosition, dataObject["name"], {fontSize:(this.game.scale.width < 400)?20:40}).setInteractive();
        this.physics.world.enable(task);
        this.input.setDraggable(task);
        task.body.onOverlap = true;
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
          gameObject.x = dragX;
          gameObject.y = dragY;
        });

        return task;
      });

      this.physics.world.addOverlap(tasks[0], tasks[1]);


      this.physics.world.on('overlap', function(){
        console.log('Testing. Hello.');
    });﻿


  }

  update() {
    console.log()
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
