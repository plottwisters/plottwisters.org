import {store} from './../store';
import {ActionType} from './../redux/actions/tbos/action_type'
import {db} from './config';

var user_id = document.cookie.replace('uid=', '');
function createDocFromStore(task, presentData) {
  let newDocument={}
  task = task.split("_")[0];
  for(let key in presentData) {
    if(presentData[key][task] != undefined) {
        newDocument[key] = presentData[key][task];
    }
  }
  newDocument["u"] = user_id; //TODO filler for actual userid

  return newDocument;
}
function returnUnderscoreUserId() {
  return "_" + user_id;
}
export function syncer(store) {

  store.subscribe(() => {

    let data = store.getState().present;

    let action = store.getState().lastAction;
    let isUndo = false;
    console.log(ActionType.UNDO)
    if (action.type == ActionType.UNDO) {
      isUndo = true;

      action = store.getState().future[0].lastAction;
      console.log(action);
    }
    let currentRoot = action.currentRoot;
    if(currentRoot == "idroot") {
      currentRoot += returnUnderscoreUserId();
    }
    let batcher = db.batch();
    let tasksCollection = db.collection('tasks');
    let usersCollection = db.collection('users');

    let updateCurrentTaskStateActions = new Set([ActionType.COMPLETE_TASK, ActionType.DELETE_TASK, ActionType.CREATE_TASKS]);
    let categorizeTaskActions = new Set([ActionType.CATEGORIZE_TASK]);
    let dragTaskActions = new Set([ActionType.DRAG_TASK]);
    let toggleTrailActions = new Set([ActionType.TOGGLE_TRAIL]);
    let createCookie = new Set([ActionType.COMPLETE_TASK]);



    if (createCookie.has(action.type)) {
      batcher.update(usersCollection.doc(user_id), {
        "mCV": data["maxCookieVision"]
      });
    }



    if (updateCurrentTaskStateActions.has(action.type)) {
      let tasks = [{"id":action.taskId}]
      if (tasks[0]["id"] == undefined) {
        tasks = action.tasks;
      }

      for (let task of tasks) {
        if (isUndo && action.type == ActionType.CREATE_TASKS) {
          batcher.delete(tasksCollection.doc(task.id));
        } else {
          let newId = tasksCollection.doc()
          batcher.set(tasksCollection.doc(task.id), createDocFromStore(task.id, data));
        }
      }


      batcher.set(tasksCollection.doc(currentRoot), createDocFromStore(currentRoot, data));
      let tempRoot = currentRoot;
      while (data["reverseHiearchy"][tempRoot] != null) {
        tempRoot = data["reverseHiearchy"][tempRoot];
        if(tempRoot == "idroot") {
          let suffixed = tempRoot +  returnUnderscoreUserId();
          batcher.update(tasksCollection.doc(suffixed), {
            "taskAggregates": data["taskAggregates"][tempRoot],
            "tbosCookieTrail": data["tbosCookieTrail"][tempRoot]
          })
        } else {
          batcher.update(tasksCollection.doc(tempRoot), {
            "taskAggregates": data["taskAggregates"][tempRoot],
            "tbosCookieTrail": data["tbosCookieTrail"][tempRoot]
          })
        }


      }
    }


    if (categorizeTaskActions.has(action.type)) {
      batcher.update(tasksCollection.doc(action.child), {
        "reverseHiearchy": data["reverseHiearchy"][action.child]
      });
      batcher.set(tasksCollection.doc(action.parent), createDocFromStore(action.parent, data));
      batcher.set(tasksCollection.doc(currentRoot), createDocFromStore(currentRoot, data));
    }

    if (dragTaskActions.has(action.type)) {

      batcher.update(tasksCollection.doc(action.taskId), {
        "position": data["position"][action.taskId]
      });
    }

    if (toggleTrailActions.has(action.type)) {
      batcher.update(usersCollection.doc(user_id), {
        "cT": data["checkedCookieTrails"]
      }); //TODO: userid used as placeholder for actual user id
    }

    batcher.commit().then(function() {
      console.log("update succeeded");
    });

  });
}
