import * as ActionType from '../actions/action_type'

function hiearchy(state = {}, action) {
  let newState = state;
  //create new task action
  case ActionType.CREATE_TASK_COLLISION:
    newState = {...state}
    newState[action.taskName] = {action.taskA: action.taskA, action.taskB: action.taskB};
    newState[action.currentRoot] = action.taskName
    delete newState[action.currentRoot][action.taskA];
    delete newState[action.currentRoot][action.taskB];

    break;
  case ActionType.CREATE_TASKS:
    newState = {...state};
    //update tasks tree
    for(let task of action.taskNames) {
      newState[task]  = {};
      newState[action.currentRoot][task] =  task;
    }
  default:
    break;

  return  newState;

}
