import {ActionType} from './tbos/action_type';


export function toggleCookieTrail(trail) {
  return {
    type: ActionType.TOGGLE_TRAIL,
    trail
  }
}
