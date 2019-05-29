import Phaser from 'phaser';




class MainView extends Phaser.Scene {
  constructor(outerContext) {
      super({
          key: 'MainView'
      })
      this.outerContext = outerContext;

  }
  checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);

  }
  destroyTextCollision() {

    this.textCollision.circle.destroy();
    this.textCollision = null;
  }
  placeNewTask() {
    return {"x": Math.random() * this.game.scale.width, "y": Math.random() * this.game.scale.height};
  }
  preload ()
  {
      this.load.setBaseURL('http://labs.phaser.io');

      this.load.image('sky', 'assets/skies/space3.png');
      this.load.image('logo', 'assets/sprites/phaser3-logo.png');
      this.load.image('red', 'assets/particles/red.png');

      this.data.set("tasks",this.outerContext.state.tasks);
      this.textCollision = null;
      this.renderedTasks = {}
      this.tasksGroup = this.physics.add.group({});

  }

  createNewTaskGameObject(xPosition, yPosition, key) {
    let task = this.add.text(xPosition, yPosition, key, {fontSize:(this.game.scale.width < 400)?20:40}).setInteractive();

    task.drag = this.plugins.get('rexDrag').add(task);

    task.on('dragend', function(pointer, dragX, dragY, dropped) {

      if (this.textCollision != null) {

          if (this.checkOverlap(this.textCollision.objectA, this.textCollision.objectB)) {
            this.outerContext.setState({display:"block"});
          }
        }
    }, this);

    task.drag.drag();
    task.on('pointerdown', function (pointer) {
      //console.log(this.findRoot());
      console.log(this.text);
      //this.outerContext.state.rootPath.push(this.text);

      // if(Object.keys(this.findRoot()).length == 0) {
      //   rootPath.pop();
      // }
    });
    this.renderedTasks[key] = task;

    this.tasksGroup.add(this.renderedTasks[key]);
  }



  findRoot() {
    let rootPath = this.outerContext.state.rootPath;
    let tasksData = this.data.get("tasks");
    for(let key of rootPath) {
      tasksData = tasksData[key];
    }
    return tasksData;
  }

  create ()
  {


      let tasksData = this.data.get("tasks");
      for(let task of Object.keys(tasksData)) {
        const {x, y} = this.placeNewTask();
        this.createNewTaskGameObject(x, y, task);
      }


      var textOverlapCallback = (obj1, obj2) => {

        if (obj1.drag.isDragging|| obj2.drag.isDragging) {
          let x = (obj1.x + obj2.x) / 2;
          let y = (obj1.y + obj2.y) / 2;


          if (this.textCollision == null) {
            this.textCollision = {};
            this.textCollision.circle = this.add.ellipse(x, y, obj1.width * 2, obj1.width * 2, obj1.width, 0.4);

            this.textCollision.objectA = obj1;
            this.textCollision.objectB = obj2;
          }

        }
      }



      this.physics.add.collider(this.tasksGroup, this.tasksGroup, textOverlapCallback);




  }

  rerender() {


    let tasks = new Set(Object.keys(this.findRoot()));

    //add new tasks
    for(let task of tasks) {

      if(this.renderedTasks[task] ==  undefined) {

        let x;
        let y;
        if(this.textCollision != null) {

          x = (this.textCollision.objectA.x + this.textCollision.objectB.x)/2;
          y = (this.textCollision.objectA.y +  this.textCollision.objectB.y)/2;
          this.destroyTextCollision();

        } else {
          let point = this.placeNewTask();
          x = point.x;
          y  = point.y;
        }
        this.createNewTaskGameObject(x, y, task);

      }
    }

    //remove deleted tasks
    let difference = new Set([...Object.keys(this.renderedTasks)].filter(x => !tasks.has(x)));

    for(let key of difference) {

      this.renderedTasks[key].destroy();
      delete this.renderedTasks[key];
    }
  }
  update() {

    if (this.textCollision != null) {

      if (!this.checkOverlap(this.textCollision.objectA, this.textCollision.objectB)) {
        this.destroyTextCollision();
      } else {
        this.textCollision.circle.x =  (this.textCollision.objectA.x + this.textCollision.objectB.x)/2
        this.textCollision.circle.y =  (this.textCollision.objectA.y + this.textCollision.objectB.y)/2

      }
    }
    this.rerender()
  }

}

export default MainView;
