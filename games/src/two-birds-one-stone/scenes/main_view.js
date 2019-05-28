import Phaser from 'phaser';
class MainView extends Phaser.Scene {
  constructor() {
      super({
          key: 'MainView'
      })
  }
  checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);

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

        task.drag = this.plugins.get('rexDrag').add(task);
        task.on('dragend', function(pointer, dragX, dragY, dropped) {

          if (this.textCollision != null) {
              if (this.checkOverlap(this.textCollision.objectA, this.textCollision.objectB)) {
                console.log("he")
              }
            }
        }, this);
        task.drag.drag();
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

    if (this.textCollision != null) {

      if (!this.checkOverlap(this.textCollision.objectA, this.textCollision.objectB)) {

        this.textCollision.circle.destroy();
        this.textCollision = null;

      }
    }
  }

}

export default MainView;
