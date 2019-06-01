import Phaser from 'phaser';




class MainView extends Phaser.Scene {
  //constructor that takes in state from parent component as parameter
  constructor(outerContext) {
      super({
          key: 'MainView'
      })
      this.outerContext = outerContext;
  }
  //helper function that checks if parameters overlap
  //@spriteA - first GameObject
  //@spriteB - second GameObject
  checkOverlap(spriteA, spriteB) {
    if(spriteA == undefined || spriteB == undefined)
      return false;
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
  }

  //helper to destroy a collision object
  destroyCollision(collision) {
    collision.circle.destroy();
    return null;
  }

  //randomly placed a new task in the scene
  placeNewTask() {
    return {"x": Math.random() * this.game.scale.width, "y": Math.random() * this.game.scale.height};
  }

  //creates a new task
  createNewTaskGameObject(xPosition, yPosition, key) {
    //turnary conditional for responsiveness
    //TODO: replace hard coded values with reference to responsiveness configuration file
    let task = this.add.text(xPosition, yPosition, key, {fontSize:(this.game.scale.width < 400)?20:40}).setInteractive();

    //turns on dragging
    task.drag = this.plugins.get('rexDrag').add(task);

    //get original position to calculate displacement for pointerup later
    //to distinguish between category navigation and dropping dragged task
    task.on('dragstart',function(pointer){
      pointer.start = {}
      pointer.start.x = pointer.x;
      pointer.start.y = pointer.y;
    });

    //modifies parent component state if tasks dragged together or task dragged to interactive widget(checkmark or trash)
    task.on('dragend', function(pointer, dragX, dragY, dropped) {
      if (this.collisions.textToText != null) {

          if (this.checkOverlap(this.collisions.textToText.objectA, this.collisions.textToText.objectB)) {
            this.outerContext.setState({display:"block"});
          }

        }
      if(this.collisions.widget != null){
        if (this.checkOverlap(this.collisions.widget.objectA, this.collisions.widget.objectB)) {
          let rootData = this.findRoot();

          delete rootData[this.collisions.widget.objectA.text];
          this.syncRootData();
        }
      }


    }, this);

    //nested category navigation if category clicked
    task.on('pointerup', (function(outerThis) {

      return function(pointer) {
        let distance = 0;
        if(pointer.start!= null) { //calculate displacement from pointer start dragging (same as pointer down)
          distance = (pointer.y - pointer.start.y)*(pointer.y - pointer.start.y)  +  (pointer.x - pointer.start.x)*(pointer.x - pointer.start.x);
          distance = Math.sqrt(distance);
          pointer.start = null;
        }

        if(distance == 0) { //navigate if click release on category and not at end of dragging
          outerThis.outerContext.state.rootPath.push(this.text);
          if (outerThis.findRoot() == undefined || Object.keys(outerThis.findRoot()).length == 0) { //undefined check needed for tasks deleted
            outerThis.outerContext.state.rootPath.pop();
          }
        }
      }
    })(this));
    this.renderedTasks[key] = task;

    this.tasksGroup.add(this.renderedTasks[key]);
  }


  //find where you are in the task tree
  //and return it as the root
  findRoot() {
    let rootPath = this.outerContext.state.rootPath;
    let tasksData = this.data.get("tasks");
    for(let key of rootPath) {
      tasksData = tasksData[key];
    }
    return tasksData;
  }

  //sync state of parent state with scene state
  syncRootData() {
    this.outerContext.setState({tasks:this.data.get("tasks")});
  }


  //**************overlap callbacks for when one object overlaps with another

  //when text overlaps with text
  textOverlapCallback(obj1, obj2) {

    if (obj1.drag.isDragging|| obj2.drag.isDragging) {
      let x = (obj1.x + obj2.x) / 2;
      let y = (obj1.y + obj2.y) / 2;


      if (this.collisions.textToText == null) {

        this.collisions.textToText = {};
        this.collisions.textToText.circle = this.add.ellipse(x, y, obj1.width * 2, obj1.width * 2, obj1.width, 0.4);

        this.collisions.textToText.objectA = obj1;
        this.collisions.textToText.objectB = obj2;
      }

    }
  }

  //when text overlaps with widget icon
  widgetOverlapCallback(widget, obj1) {
    if (obj1.drag.isDragging) {
      if(this.collisions.widget == null){

        this.collisions.widget = {};
        this.collisions.widget.circle = this.add.ellipse(widget.x, widget.y, widget.width * 2, widget.width * 2, widget.width, 0.4);
        this.collisions.widget.objectA = obj1;
        this.collisions.widget.objectB = widget;
      }
    }
  }
  //**************

  //update the rendered tasks based on parent state
  rerender() {
    let tasks = new Set(Object.keys(this.findRoot()));

    //add new tasks
    for(let task of tasks) {
      if(this.renderedTasks[task] ==  undefined) {
        let x;
        let y;
        let point = this.placeNewTask();
        x = point.x;
        y  = point.y;
        this.createNewTaskGameObject(x, y, task);
      }
    }

    //remove deleted tasks
    let difference = new Set([...Object.keys(this.renderedTasks)].filter(x => !tasks.has(x)));



    for(let key of difference) {
      //if task deleted was part of a collision, remove dangling references in respective collision objects
      if(this.collisions.textToText != null && this.renderedTasks[key] == this.collisions.textToText.objectA) {
        this.collisions.textToText.objectA = null;
        this.collisions.textToText.objectB = null;
      }
      if(this.collisions.widget != null && this.renderedTasks[key] == this.collisions.widget.objectA) {
        this.collisions.widget.objectA = null;
      }


      this.renderedTasks[key].destroy();
      delete this.renderedTasks[key];
    }
  }

  //loads and defines all scene scope assets
  preload ()
  {
      this.load.setBaseURL('http://localhost:1234/');


      this.data.set("tasks",this.outerContext.state.tasks);
      this.collisions = {};
      this.collisions.textToText = null;
      this.collisions.widget = null;
      this.renderedTasks = {}
      this.tasksGroup = this.physics.add.group({});
      this.trash = this.load.image('trash','trash_can-512.png');
      this.widgetOverlapCallback = this.widgetOverlapCallback.bind(this);
      this.textOverlapCallback = this.textOverlapCallback.bind(this);

  }


  //instantiates all assets in the scene
  create ()
  {

      //instantiate UI widgets
      this.trash = this.physics.add.image(45,680,'trash').setInteractive();

      //tasks
      let tasksData = this.findRoot();
      for(let task of Object.keys(tasksData)) {
        const {x, y} = this.placeNewTask();
        this.createNewTaskGameObject(x, y, task);
      }

      //register overlap callbacks
      this.physics.add.collider(this.tasksGroup, this.tasksGroup, this.textOverlapCallback);
      this.physics.add.collider(this.trash, this.tasksGroup, this.widgetOverlapCallback);



  }



  //runs every frame - used to call renrender function and to destroy and update text collision objects
  //on appropriate events
  update() {

    if (this.collisions.textToText != null) {
      if (!this.checkOverlap(this.collisions.textToText.objectA, this.collisions.textToText.objectB)) {

        this.collisions.textToText = this.destroyCollision(this.collisions.textToText);
      } else {
        this.collisions.textToText.circle.x =  (this.collisions.textToText.objectA.x + this.collisions.textToText.objectB.x)/2
        this.collisions.textToText.circle.y =  (this.collisions.textToText.objectA.y + this.collisions.textToText.objectB.y)/2
      }
    }

    if (this.collisions.widget != null) {
      if (!this.checkOverlap(this.collisions.widget.objectA, this.collisions.widget.objectB)) {
        this.collisions.widget = this.destroyCollision(this.collisions.widget);
      }
    }
    this.rerender();
  }

}

export default MainView;
