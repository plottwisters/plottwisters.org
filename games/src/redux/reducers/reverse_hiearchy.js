import ActionType from './../actions/action_type'

export default function reverseHiearchy(state= {}, action) {
  let newState = state;

  case ActionType.CREATE_TASK_COLLISION:

    newState = {...state};
    newState[action.taskA] = action.taskId;
    newState[action.taskB] = action.taskId;
    newState[action.taskId] = action.currentRoot;
    break;
  case ActionType.CREATE_TASKS:
    newState = {...state}
    for(let task of action.tasks) {
      newState[task.id] =  action.currentRoot;
    }
  default:
    break;

  return newState;
}
