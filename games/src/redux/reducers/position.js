import {ActionType} from './../actions/tbos/action_type'

export default function position(state= {}, action) {
  let newState = state;
  switch(action.type) {
    case ActionType.CREATE_TASKS:

      newState = {...state};
      for(let task of action.tasks) {
        newState[task.id] =  {x: task.x, y: task.y};
      }
      break;
    case ActionType.DRAG_TASK:
      newState = {...state}
      console.log(action);
      newState[action.taskId] = {x: action.x, y: action.y}
      break;
    default:
      break;
  }
  return newState;
}
