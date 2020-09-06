import {ActionType} from './../actions/tbos/action_type'

export default function nameToTasks(state= {}, action) {
  let newState = state;
  switch(action.type) {
    case ActionType.CREATE_TASK_COLLISION:

      newState = {...state};

      if(newState[action.taskName] == undefined) {
        newState[action.taskName] = [];
      }
      newState[action.taskName] = [...newState[action.taskName], action.taskId];
      break;
    case ActionType.CREATE_TASKS:
      newState = {...state}
      for(let task of action.tasks) {
        if(newState[task.name] == undefined) {
          newState[task.name] = [];
        }
        newState[task.name] =  [...newState[task.name],task.id];
      }
      break;
    default:
      break;
  }
  return newState;
}
