import {ActionType} from './../actions/tbos/action_type'

export default function active(state = {}, action) {
  let newState = state;
  let newActionState = {}
  switch(action.type) {
    case ActionType.CREATE_TASK_COLLISION:
      newState = {...state}
      newState[action.taskId] = true
      break;
    case ActionType.DELETE_TASK:
      newState = {...state} //TODO: if you create a new task from an old task should be renewed --  turned back on
      newState[action.taskId] = false
      break;
    case ActionType.CREATE_TASKS:
      newState = {...state}
      for(let task of action.tasks) {
        newState[task.id] =  true;
      }
    default:
      break;
  }

  return newState;
}
