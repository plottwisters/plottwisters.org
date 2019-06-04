import * as ActionType from '../actions/action_type'

export default function reverseHiearchy(state= {}, action) {
  let newState = state;

  case ActionType.CREATE_TASK_COLLISION:

    newState = {...state};
    newState[action.taskA] = action.taskName;
    newState[action.taskB] = action.taskName;
    newState[action.taskName] = action.currentRoot;
    break;
  case ActionType.CREATE_TASKS:
    newState = {...state}
    for(let task of action.taskNames) {
      newState[task] =  action.currentRoot;
    }
  default:
    break;

  return newState;
}
