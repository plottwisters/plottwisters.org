import {ActionType} from './../actions/tbos/action_type'

export default function tbosRootPath(state= {}, action) {
  let newState = state;
  switch(action.type) {
    case ActionType.TBOS_POP_ROOT:
      newState = [...state];
      newState.pop();
      break;
    case ActionType.TBOS_ADD_ROOT:
      newState = [...state, action.taskId]
      break;
    case ActionType.TBOS_POP_ROOT_UNTIL:
        newState = [...state]
        while (newState[newState.length - 1] != action.taskId) {
          newState.pop();
        }
    default:
      break;
  }
  return newState;
}
