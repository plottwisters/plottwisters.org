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

  destroyTrashOverlap() {

    this.trashOverlap.circle.destroy();
    this.trashOverlap = null;
  }
  placeNewTask() {
    return {"x": Math.random() * this.game.scale.width, "y": Math.random() * this.game.scale.height};
  }
  preload ()
  {
      this.load.setBaseURL('http://localhost:1234/');


      this.data.set("tasks",this.outerContext.state.tasks);
      this.textCollision = null;
      this.renderedTasks = {}
      this.tasksGroup = this.physics.add.group({});
      this.trash = this.load.image('trash','trash_can-512.png');
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
      if(this.trashOverlap != null){
        if (this.checkOverlap(this.trashOverlap.objectA, this.trashOverlap.objectB)) {
          let rootData = this.findRoot();
          console.log(this.trashOverlap.objectB.text);
          delete rootData[this.trashOverlap.objectB.text];

          this.setRootData();


        }
      }
    }, this);


    task.on('pointerup', (function(outerThis) {

      return function(pointer) {
        if(pointer.getDistance() == 0) {
          outerThis.outerContext.state.rootPath.push(this.text);
          if (Object.keys(outerThis.findRoot()).length == 0) {
            outerThis.outerContext.state.rootPath.pop();
          }
        }
      }
    })(this));
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

  setRootData() {
    this.outerContext.setState({tasks:this.data.get("tasks")});
  }

  create ()
  {

      this.trash = this.physics.add.image(45,680,'trash').setInteractive();
      let tasksData = this.findRoot();

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

      var trashOverlapCallback = (obj1, trash) => {

        if(this.trashOverlap == null ){

          this.trashOverlap = {};
          this.trashOverlap.circle = this.add.ellipse(45, 680, trash.width * 2, trash.width * 2, trash.width, 0.4);
          console.log(trash);
          this.trashOverlap.objectA = trash;
          this.trashOverlap.objectB = obj1;
        }
      }


      this.physics.add.collider(this.tasksGroup, this.tasksGroup, textOverlapCallback);

      this.physics.add.collider(this.trash, this.tasksGroup, trashOverlapCallback);



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

    if (this.trashOverlap != null) {

      if (!this.checkOverlap(this.trashOverlap.objectA, this.trashOverlap.objectB)) {
        console.log("here");
        this.destroyTrashOverlap();
      }
    }
    this.rerender()
  }

}

export default MainView;
