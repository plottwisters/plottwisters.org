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
            create: this.create,
            update: this.update
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
      this.textCollision = null;

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
      var tasksGroup = this.physics.add.group({});
      tasksGroup.addMultiple(tasks);

      var textOverlapCallback =(obj1, obj2) => {
        let x = (obj1.x + obj2.x)/2;
        let y = (obj1.y + obj2.y)/2;

        if(this.textCollision == null) {
          this.textCollision = {};
          this.textCollision.circle = this.add.ellipse(x, y, obj1.width *  2, obj1.width * 2, obj1.width, 0.4);
          this.textCollision.objectA = obj1;
          this.textCollision.objectB = obj2;
        }

      }

      this.physics.add.collider(tasksGroup, tasksGroup, textOverlapCallback);





  }

  update() {
    function checkOverlap(spriteA, spriteB) {

      var boundsA = spriteA.getBounds();
      var boundsB = spriteB.getBounds();

      return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);

    }
    if (this.textCollision != null) {

      if (!checkOverlap(this.textCollision.objectA, this.textCollision.objectB)) {

        this.textCollision.circle.destroy();
        this.textCollision = null;

      }
    }
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
