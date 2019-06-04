import * as ActionType from '../actions/action_type'

function hiearchy(state = {}, action) {
  let newState = state;
  //create new task action
  case ActionType.CREATE_TASK_COLLISION:
    newState = {...state}
    newState[action.taskId] = {action.taskA: action.taskA, action.taskB: action.taskB};
    newState[action.currentRoot] = action.taskId
    delete newState[action.currentRoot][action.taskA];
    delete newState[action.currentRoot][action.taskB];

    break;
  case ActionType.CREATE_TASKS:
    newState = {...state};
    //update tasks tree
    for(let task of action.taskIds) {
      newState[task.id]  = {};
      newState[action.currentRoot][task.id] =  task.id;
    }
  default:
    break;

  return  newState;

}
