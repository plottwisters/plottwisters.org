import {ActionType} from './../actions/tbos/action_type';

export default function checkedCookieTrails(state= {}, action) {
  let newState = state;
  switch(action.type) {
    case ActionType.TOGGLE_TRAIL:
      newState = action.trail;
    default:
      break;
  }
  return newState;
}
