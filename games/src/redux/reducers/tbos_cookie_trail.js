import {ActionType} from './../actions/tbos/action_type'

function calculateActiveLeafTasks(agg) {
  return agg["total"] - agg["completed"] - agg["deleted"];
}

function calculateCategoryVisionScore(category, state) {
  let agg = state["aggregates"][category];
  let numRootTasks = Object.keys(state["hiearchy"][category]).length
  let activeTasks = calculateActiveTasks(agg);
  let visionScore = (activeTasks - numRootTasks)/activeTasks;
}

function calculateProductivityScore(category, state) {
  let agg = state["aggregates"][category];
  return agg["completed"]/(agg["total"] - agg["deleted"]);
}

function calculateScore(category, state, globalVision=null){
  if(globalVision == null)
    globalVision = calculateCategoryVisionScore("idroot", state);
  return 0.3 * globalVision + 0.4 * calculateProductivityScore(category, state) + 0.3 * calculateCategoryVisionScore(category, state)
}


export default function tbosCookieTrail(state = {}, action) {
  let newState = state["tbosCookieTrail"];
  let globalVision = calculateCategoryVisionScore("idroot", state);
  switch(action.type) {
    case ActionType.CREATE_TASK_COLLISION:
      let currentRootScore = calculateScore(action.currentRoot, state, globalVision);
      newState[action.currentRoot] = [...newState[action.currentRoot], currentRootScore];
      let newCategoryScore = calculateScore(action.taskId, state, globalVision);
      newState[action.taskId] = [...newState[action.taskId], newCategoryScore];
      break;
    case ActionType.DELETE_TASK:
    case ActionType.CREATE_TASKS:
      newState = {...state}
      let currentTask = action.taskId;
      while(currentTask != undefined) {
        newState[currentTask] = [...newState[currentTask], calculateScore(action.taskId,state, globalVision)];
        currentTask = state["reverseHiearchy"][currentTask];
      }
      break;
    default:
      break;
  }

  return newState;
}
