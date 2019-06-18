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


function calculateCategoryVisionScorev2(category, state) {
  return state["taskAggregates"][category]["moved"];
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

function makeDataPointv2(category, state, stopBoolean, timestamp) {
  console.log({"category": category, state, stopBoolean, timestamp })
  return {"productivity": calculateProductivityScore("idroot", state), "vision": calculateCategoryVisionScorev2(category, state), "timestamp":timestamp, "stop": stopBoolean}
}

function anyActiveTasks(state, currentTask) {
  let totalRemaining = Object.keys(state["hiearchy"][currentTask]);
  totalRemaining = totalRemaining.filter(task => state["active"][task] == TaskState.active);
  totalRemaining = totalRemaining.length;
  return (totalRemaining > 0);
}

export default function tbosCookieTrail(state = {}, action) {

  let newState = state["tbosCookieTrail"];
  let newMax = state["maxCookieVision"];
  let currentTask;
  let timestamp = action.timestamp;

  switch(action.type) {
    case ActionType.CREATE_TASK_COLLISION:
      newState = {...newState};
      //create data point for new category
      newState[action.taskId] = [];
      break;
    case ActionType.COMPLETE_TASK:
      newState = {...newState};
      let trailsToUpdate = [action.taskId];
      let currentTrailToUpdate;
      let activeChildren;
      let newDataPoint;
      while(trailsToUpdate.length > 0) {
        currentTrailToUpdate = trailsToUpdate.pop();
        activeChildren = false;
        for(let child in state["hiearchy"][currentTask]) {
          if(state["active"][child] == TaskState.active) {
            trailsToUpdate.push(child);
            activeChildren = true;
          }
        }
        if(!activeChildren) {
          newDataPoint = makeDataPointv2(currentTrailToUpdate,state, false, timestamp);
          newMax = Math.max(state["maxCookieVision"], newDataPoint["vision"]);
          currentTask = state["reverseHiearchy"][currentTrailToUpdate];
          while(currentTask != undefined) {
            newState[currentTask] = [...newState[currentTask], newDataPoint];
            currentTask = state["reverseHiearchy"][currentTask];
          }
        }
      }

      break;
    default:
      break;
  }

  return {"tbosCookieTrail":newState, "maxCookieVision": newMax};
}
