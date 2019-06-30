import {store} from './../store';


function createDocFromStore(task, presentData) {
  newDocument={}
  for(let key in presentData) {
    if(presentData[key][task] != undefined && key != "tbosCookieTrail") {
        newDocument[key] = presentData[key][task];
    }
  }
  return newDocument;
}

store.subscribe(()=>{
  let data = store.getState().present;

  let action = data.lastAction;
  let isUndo = false;
  if(action.type == ActionType.UNDO) {
    isUndo = true;
    action = store.getState().future[0].lastAction;
  }
  let batcher = db.batch();
  let tasksCollection = db.collection('tasks');
  let cookiesCollection = db.collection('cookies');
  let usersCollection = db.collection('users');

  let updateCurrentTaskStateActions = new Set([ActionType.COMPLETE_TASK, ActionType.DELETE_TASK, ActionType.CREATE_TASKS]);
  let categorizeTaskActions = new Set([ActionType.CATEGORIZE_TASK]);
  let dragTaskActions = new Set([ActionType.DRAG_TASK]);
  let toggleTrailActions = new Set([ActionType.TOGGLE_TRAIL]);
  let createCookie = new Set([ActionType.COMPLETE_TASK]);





  if(createCookie.has(action.type)) {
    if(isUndo) {
      batcher.delete(cookiesCollection.doc(action.taskId));
    } else {
      let currentTrail = data["tbosCookieTrail"][action.taskId];

      batcher.set(cookiesCollection.doc(action.taskId), currentTrail[currentTrail.length - 1]); //creates a new cookie
    }
  }


  if (updateCurrentTaskStateActions.has(action.type)) {
    let tasks = [action.taskId]
    if(tasks[0] == undefined && action.parent == undefined) {
      tasks = action.tasks;
    } else {
      tasks = [action.parent];
    }

    for(let task of tasks) {
        if(isUndo) {
          batcher.delete(tasksCollection.doc(task));
        } else {
          batcher.set(tasksCollection.doc(task), createDocFromStore(task,data));
        }
    }
    batcher.set(tasksCollection.doc(action.currentRoot), createDocFromStore(action.currentRoot, data));
  }


  if(categorizeTaskActions.has(action.type)) {
    batcher.update(tasksCollection.doc(action.child), {"reverseHiearchy": data["reverseHiearchy"][action.child]});
    batcher.update(tasksCollection.doc(action.parent), createDocFromStore(action.currentRoot, data));
    batcher.update(tasksCollection.doc(action.currentRoot), createDocFromStore(action.currentRoot, data));
  }

  if(dragTaskActions.has(action.type)) {
    batcher.update(tasksCollection.doc(action.taskId), {"position": data.present["position"][action.taskId]});
  }

  if(toggleTrailActions.has(action.type)) {
    batcher.update(usersCollection.doc(action.taskId), {"cT": data["checkedCookieTrails"]});
  }

  batch.commit().then(function () {
    console.log("update succeeded");
  });

});
