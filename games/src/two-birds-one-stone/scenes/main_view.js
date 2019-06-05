import Phaser from 'phaser';
import * as tbosConstants from './../tbos_constants';



class MainView extends Phaser.Scene {
  //constructor that takes in state from parent component as parameter
  constructor(outerContext) {
      super({
          key: 'MainView'
      })
      this.outerContext = outerContext;
      ;
      for(let actionCreator in this.outerContext.boundActionCreators) {

        this[actionCreator] = this.outerContext.boundActionCreators[actionCreator];

      }
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
  createNewTaskGameObject(xPosition, yPosition, name, key) {
    //turnary conditional for responsiveness
    //TODO: replace hard coded values with reference to responsiveness configuration object in external const file
    let task = this.add.text(xPosition, yPosition, name, {fontSize:(this.game.scale.width < 400)?20:40}).setInteractive();
    task.idTbos = key;
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
            this.outerContext.changeDisplay(tbosConstants.displayTypes.createOne);
          }

        }
      if(this.collisions.widget != null){
        if (this.checkOverlap(this.collisions.widget.objectA, this.collisions.widget.objectB)) {

          this.deleteTaskAction(this.collisions.widget.objectA.idTbos, this.outerContext.getRootId());
        }
      }


    }, this);

    //nested category navigation if category clicked
    task.on('pointerup', (function(outerThis) {

      return function(pointer) {
        let distance = 0;
        if (pointer.start != null) { //calculate displacement from pointer start dragging (same as pointer down)
          distance = (pointer.y - pointer.start.y) * (pointer.y - pointer.start.y) + (pointer.x - pointer.start.x) * (pointer.x - pointer.start.x);
          distance = Math.sqrt(distance);
          pointer.start = null;
        }

        if (distance == 0) { //navigate if click release on category and not at end of dragging
          outerThis.addTaskTbosRoot(this.idTbos);
          
          if (!outerThis.outerContext.props.active[outerThis.outerContext.getRootId()] //undefined check needed for tasks deleted
            ||
            outerThis.outerContext.getRootTasksAsArray().length == 0) {
            outerThis.popTaskTbosRoot();
          }
        }
      }
    })(this));

    this.renderedTasks[key] = task;
    this.tasksGroup.add(this.renderedTasks[key]);
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

  //for re-rendering back button based on current parent state
  rerenderBackButton() {
    if (this.outerContext.props.tbosRootPath.length!=1) { // !=1 instead of !=0 because "root" container task exists
      if (this.backButton == null) {
        this.backButton = this.add.image(100, 100, 'back').setInteractive();

        this.backButton.setScale(0.2, 0.2);
        this.backButton.on('pointerdown', () => {
          this.popTaskTbosRoot();
        });
      }
    } else if(this.backButton != null) {

      this.backButton.destroy();
      this.backButton = null;
    }
  }

  //for re-rendering tasks  based on current parent state
  rerenderTasks() {

    let tasks = new Set(this.outerContext.getRootTasksAsArray());

    //add new tasks
    for(let task of tasks) {
      if(this.renderedTasks[task] ==  undefined) {
        let x;
        let y;
        let point = this.placeNewTask();
        x = point.x;
        y  = point.y;
        this.createNewTaskGameObject(x, y, this.outerContext.props.name[task], task);
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

  //update the rendered tasks and back button navigation based on parent state
  rerender() {
    this.rerenderBackButton();
    this.rerenderTasks();

  }

  //loads and defines all scene scope assets
  preload ()
  {
      //assets
      this.load.image('back', 'https://cdn3.iconfinder.com/data/icons/glyph/227/Button-Back-1-512.png');
      this.backButton = null;
      this.load.setBaseURL('http://localhost:1234/');
      this.trash = this.load.image('trash','trash_can-512.png');

      //collisions
      this.collisions = {};
      this.collisions.textToText = null;
      this.collisions.widget = null;

      //tasks

      this.renderedTasks = {}
      this.tasksGroup = this.physics.add.group({});

      //callbacks
      this.widgetOverlapCallback = this.widgetOverlapCallback.bind(this);
      this.textOverlapCallback = this.textOverlapCallback.bind(this);
  }


  //instantiates all assets in the scene
  create ()
  {

      //instantiate UI widgets
      this.trash = this.physics.add.image(45,680,'trash').setInteractive();

      //tasks
      let tasksData = this.outerContext.getRootTasksAsArray();
      for(let task of tasksData) {
        const {x, y} = this.placeNewTask();
        this.createNewTaskGameObject(x, y,this.outerContext.props.name[task], task);
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
      } else { //move the collision circle
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
