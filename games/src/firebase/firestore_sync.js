import {store} from './../store';
import {getUser} from './../utils';
import {ActionType} from './../redux/actions/tbos/action_type'
import {db} from './config';

function createDocFromStore(task, presentData, user) {
  let newDocument={}
  task = task.split("_")[0];

  for(let key in presentData) {
    if(presentData[key][task] != undefined) {
        newDocument[key] = presentData[key][task];
    }
  }
  newDocument["u"] = user; //TODO filler for actual userid

  return newDocument;
}
function returnUnderscoreUserId() {
  return "_" + getUser();
}

export function syncer(store) {

  store.subscribe(() => {
    let user = getUser();
    let data = store.getState().present;
    let action = store.getState().lastAction;
    let isUndo = false;

    if (action.type == ActionType.UNDO) {
      isUndo = true;

      action = store.getState().future[0].lastAction;

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
      batcher.update(usersCollection.doc(user), {
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
          batcher.set(tasksCollection.doc(task.id), createDocFromStore(task.id, data, user));
        }
      }

      batcher.set(tasksCollection.doc(currentRoot), createDocFromStore(currentRoot, data, user));

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
      batcher.set(tasksCollection.doc(action.parent), createDocFromStore(action.parent, data, user));
      batcher.set(tasksCollection.doc(currentRoot), createDocFromStore(currentRoot, data, user));
    }

    if (dragTaskActions.has(action.type)) {

      batcher.update(tasksCollection.doc(action.taskId), {
        "position": data["position"][action.taskId]
      });
    }

    if (toggleTrailActions.has(action.type)) {

      batcher.update(usersCollection.doc(user), {
        "cT": data["checkedCookieTrails"]
      }); //TODO: userid used as placeholder for actual user id
    }
    console.log(user);
    batcher.commit().then(function() {
      console.log("update succeeded");
    });

  });
}
