import {ActionType} from './../actions/tbos/action_type'
import {TaskState} from './../../global_constants'
function calculateLeafTasks(agg) {
  return agg["total"];
}

function calculateCategoryVisionScore(category, state) {
  let agg = state["taskAggregates"][category];
  let rootLevelTasks = Object.keys(state["hiearchy"][category]);
  let numRootTasks = rootLevelTasks.length;

  let numTasks = calculateLeafTasks(agg);

  let visionScore = (numTasks - numRootTasks)/numTasks;
  return visionScore;
}

function calculateProductivityScore(category, state) {
  let agg = state["taskAggregates"][category];
  if(agg["total"] == agg["deleted"])
    return 0;

  return agg["completed"]/(agg["total"] - agg["deleted"]);
}

function makeDataPoint(category, state, stopBoolean, timestamp){
  console.log({"category": category, "vision": calculateCategoryVisionScore(category, state), "productivity":calculateProductivityScore(category, state) })
  return {"productivity": calculateProductivityScore(category, state), "vision": calculateCategoryVisionScore(category, state), "timestamp":timestamp, "stop": stopBoolean}
}

function anyActiveTasks(state, currentTask) {
  let totalRemaining = Object.keys(state["hiearchy"][currentTask]);
  totalRemaining = totalRemaining.filter(task => state["active"][task] == TaskState.active);
  totalRemaining = totalRemaining.length;
  return (totalRemaining > 0);
}

export default function tbosCookieTrail(state = {}, action) {

  let newState = state["tbosCookieTrail"];
  let currentTask = action.currentRoot;
  let currentTaskScore;
  let globalVision = calculateCategoryVisionScore("idroot", state);
  let timestamp = new Date().getTime();
  switch(action.type) {
    case ActionType.CREATE_TASK_COLLISION:

      //create data point for new category
      let newCategoryScore = makeDataPoint(action.taskId, state, false, timestamp);
      newState[action.taskId] = [newCategoryScore];
      while(currentTask != undefined) {
        currentTaskScore = makeDataPoint(currentTask,state, false, timestamp);
        newState[currentTask] = [...newState[currentTask], currentTaskScore];
        currentTask = state["reverseHiearchy"][currentTask];
      }

      
      break;
    case ActionType.COMPLETE_TASK:
    case ActionType.DELETE_TASK:
      newState = {...newState};
      if(Object.keys(state["hiearchy"][action.taskId]).length != 0)
        newState[action.taskId] = [...newState[action.taskId], makeDataPoint(action.taskId, state, true, timestamp)];


      //update score of ancestors



      while(currentTask != undefined) {
        currentTaskScore = makeDataPoint(currentTask,state, false, timestamp);
        newState[currentTask] = [...newState[currentTask], currentTaskScore];
        currentTask = state["reverseHiearchy"][currentTask];
      }
      break;
    case ActionType.CREATE_TASKS:
      newState = {...newState};
      //update score of ancestors
      while(currentTask != undefined) {
        currentTaskScore = makeDataPoint(currentTask,state, false, timestamp);
        newState[currentTask] = [...newState[currentTask], currentTaskScore];
        currentTask = state["reverseHiearchy"][currentTask];
      }
      break;
    default:
      break;
  }

  return newState;
}
