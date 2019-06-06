import {ActionType} from './../actions/tbos/action_type'
import {TaskState} from './../../global_constants'
export default function active(state = {}, action) {
  let newState = state;
  let newActionState = {}
  switch(action.type) {
    case ActionType.CREATE_TASK_COLLISION:
      newState = {...state}
      newState[action.taskId] = TaskState.active;
      break;
    case ActionType.DELETE_TASK:
      newState = {...state} //TODO: if you create a new task from an old task should be renewed --  turned back on
      newState[action.taskId] = TaskState.deleted;
      break;
    case ActionType.CREATE_TASKS:
      newState = {...state}
      for(let task of action.tasks) {
        newState[task.id] =  TaskState.active;
      }
    default:
      break;
  }

  return newState;
}
