import * as ActionType from '../actions/action_type'

export default function active(state = {}, action) {
  let newState = state;
  case ActionType.CREATE_TASK_COLLISION:
    newState = {...state, {action.taskId: true}}
  case ActionType.DELETE_TASK:
    newState = {...state, {action.taskId: false}} //TODO: if you create a new task from an old task should be renewed --  turned back on
    break;
  case ActionType.CREATE_TASKS:
    newState = {...state}
    for(let task of action.tasks) {
      newState[task.id] =  true;
    }
  default:
    break;

  return newState;
}
