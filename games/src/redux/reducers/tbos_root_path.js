import ActionType from './../actions/action_type'

export default function tbosRootPath(state= {}, action) {
  let newState = state;

  case ActionType.TBOS_POP_ROOT:
    newState = [...state];
    newState.pop();
    break;
  case ActionType.TBOS_ADD_ROOT:
    newState = [...state, action.taskId]
  default:
    break;
  return newState;
}
