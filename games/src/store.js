import twisterLandReducers from './redux/reducers';
import {TaskState} from './global_constants';
import { createStore } from 'redux';

let dummyData = {
  "hiearchy": {
    "idroot": {
      "id1": "id1",
      "id2": "id2",
      "id3": "id3",
      "id4": "id4",
    },
    "id1": {
    },
    "id2": {
    },
    "id3": {
    },
    "id4": {
    }
  },
  "name": {
    "id1": "Task 1",
    "id2": "Task 2",
    "id3": "Task 3",
    "id4": "Task 4",
    "idroot": "Your Main Trail"
  },
  "active": {
    "id1": TaskState.active,
    "id2": TaskState.active,
    "id3": TaskState.active,
    "id4": TaskState.active
  },
  "reverseHiearchy":{
    "id3": "idroot",
    "id1": "idroot",
    "id2": "idroot",
    "id4": "idroot"
  },
  "tbosRootPath": ["idroot"],
  "checkedCookieTrails": ["idroot"],
  "nameToTasks": {
    "Task 1": ["id1"],
    "Task 2": ["id2"],
    "Task 3": ["id3"],
    "Task 4": ["id4"]
  },
  "position": {
    "id1": {"x": 0.1, "y": 0.4},
    "id2": {"x": 0.5, "y": 0.3},
    "id3": {"x": 0.8, "y": 0.2},
    "id4": {"x": 0.3, "y": 0.5}
  },
  "taskAggregates": {
    "id1": {
      "completed": 0,
      "deleted": 0,
      "total": 1,
      "moved": 0
    },
    "id2": {
      "completed": 0,
      "deleted": 0,
      "total": 1,
      "moved": 0
    },
    "id3": {
      "completed": 0,
      "deleted": 0,
      "total": 1,
      "moved": 0
    },
    "id4": {
      "completed": 0,
      "deleted": 0,
      "total": 1,
      "moved": 0
    },
    "idroot": {
      "completed": 0,
      "deleted": 0,
      "total": 4,
      "moved": 0
    }
  },
  "tbosCookieTrail": {
    "idroot": [{"productivity":0, "vision":0, "timestamp": new Date().getTime(), "stop":false}]
  },
  "maxCookieVision": 1
};

export const store = createStore(twisterLandReducers, dummyData);
