import {ActionType} from './../actions/tbos/action_type'
import {TaskState} from './../../global_constants'
function calculateActiveLeafTasks(agg) {
  return agg["total"] - agg["completed"] - agg["deleted"];
}

function calculateCategoryVisionScore(category, state) {
  let agg = state["taskAggregates"][category];
  let rootLevelTasks = Object.keys(state["hiearchy"][category]);
  rootLevelTasks = rootLevelTasks.filter(taskId=> state["active"][taskId] == TaskState.active)
  let numRootTasks = rootLevelTasks.length

  let activeTasks = calculateActiveLeafTasks(agg);

  let visionScore = (activeTasks - numRootTasks)/activeTasks;
  return visionScore;
}

function calculateProductivityScore(category, state) {
  let agg = state["taskAggregates"][category];

  return agg["completed"]/(agg["total"] - agg["deleted"]);
}

function calculateScore(category, state, globalVision=null){
  if(globalVision == null)
    globalVision = calculateCategoryVisionScore("idroot", state);
  console.log({"category": category, "globalVision": globalVision, "categoryVision": calculateCategoryVisionScore(category, state), "productivity":calculateProductivityScore(category, state) })
  return 0.3 * globalVision + 0.4 * calculateProductivityScore(category, state) + 0.3 * calculateCategoryVisionScore(category, state)
}

function anyActiveTasks(state, currentTask) {
  let totalRemaining = Object.keys(state["hiearchy"][currentTask]);
  totalRemaining = totalRemaining.filter(task => state["active"][task] == TaskState.active);
  totalRemaining = totalRemaining.length;
  return (totalRemaining > 0);
}

export default function tbosCookieTrail(state = {}, action) {

  let newState = state["tbosCookieTrail"];
  let globalVision = calculateCategoryVisionScore("idroot", state);
  switch(action.type) {
    case ActionType.CREATE_TASK_COLLISION:
      let currentRootScore = calculateScore(action.currentRoot, state, globalVision);

      newState[action.currentRoot] = [...newState[action.currentRoot], currentRootScore];
      let newCategoryScore = calculateScore(action.taskId, state, globalVision);
      newState[action.taskId] = [newCategoryScore];
      break;
    case ActionType.DELETE_TASK:
    case ActionType.CREATE_TASKS:
      newState = {...newState}
      let currentTask = action.currentRoot; //score gets updated for every task above the task deleted or completed
      let currentTaskScore;

      let anyRemaining = anyActiveTasks(state ,currentTask);

      //current root iteration
      if(anyRemaining) { //current root does not get updated if completed (no tasks under it)
        currentTaskScore = calculateScore(currentTask,state, globalVision);
        newState[currentTask] = [...newState[currentTask], currentTaskScore];
      } else { //an edge case where the current task has zero subtasks remaining
        newState[currentTask] = [...newState[currentTask], globalVision * 0.3 + (newState[currentTask]["completed"]>0?1:0) * 0.4 + 0.15];
      }
      currentTask = state["reverseHiearchy"][currentTask];


      //subsequent iterations
      while(currentTask != undefined) {
        currentTaskScore = calculateScore(currentTask,state, globalVision);
        newState[currentTask] = [...newState[currentTask], currentTaskScore];

        currentTask = state["reverseHiearchy"][currentTask];
      }
      break;
    default:
      break;
  }

  return newState;
}
