import ActionType from './../actions/tbos/action_type'

export default function name(state= {}, action) {
  let newState = state;

  case ActionType.CREATE_TASK_COLLISION:

    newState = {...state};

    newState[action.taskId] = action.taskName;
    break;
  case ActionType.CREATE_TASKS:
    newState = {...state}
    for(let task of action.tasks) {
      newState[task.id] =  task.name;
    }
  default:
    break;

  return newState;
}
