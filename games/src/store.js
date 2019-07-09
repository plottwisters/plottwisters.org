import twisterLandReducers from './redux/reducers';
import {TaskState} from './global_constants';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import {db} from './firebase/config';
import {syncer} from './firebase/firestore_sync';
import {getTasks} from './redux/actions/tbos/task';
import {getUser} from './utils';

let data = { //TODO: each time a user is created this should be the starting schema
  "hiearchy": {
    "idroot": {
    }
  },
  "name": {
    "idroot": "Your Main Trail"
  },
  "active": {
    "idroot": TaskState.active
  },
  "reverseHiearchy":{
  },
  "tbosRootPath": ["idroot"],
  "checkedCookieTrails": ["idroot"],
  "nameToTasks": {
  },
  "position": {
  },
  "taskAggregates": {
    "idroot": {
      "completed": 0,
      "deleted": 0,
      "total": 1,
      "moved": 0
    }
  },
  "tbosCookieTrail": {
    "idroot": []
  },
  "maxCookieVision": 1,
  "lastAction": {'type': 'NONE'}
};

let tasks = db.collection('tasks');

let users = db.collection("users");
export function getTasksThunk() {
  return dispatch => {
  let user = getUser();
  if(user == null)
    return;
  tasks.where("u", "==", user).get().then((coll) => { //TODO: userid used as filler for userid

    coll.forEach((doc) => {

      let docId = doc.id;
      docId = docId.split('_')[0]
      let docData = doc.data();
      if(data["nameToTasks"][docData["name"]] == undefined) {
          data["nameToTasks"][docData["name"]] = [docId];
      } else {

          data["nameToTasks"][docData["name"]].push(docId);
      }
      for(let key in docData) {
        if(key != 'u')
          data[key][docId] = docData[key];
      }
    })
    users.doc(user).get().then((userDoc) => { //todo userid is filler
        let userData = userDoc.data();
        data = {...data};
        data['checkedCookieTrails'] = [...userData['cT']];
        data['maxCookieVision'] = userData['mCV'];


    }).then(() => {
        
        dispatch(getTasks(data));
      })
  })
  }
 }


var store = createStore(twisterLandReducers, data, applyMiddleware(thunkMiddleware));
syncer(store);
export {store};
