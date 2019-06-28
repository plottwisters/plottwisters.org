import {ActionType} from './../actions/tbos/action_type'

export default function base (state = [], action) {
    switch (action.type) {
     case ActionType.GET_TASKS:
      return action.tasks
     default:
      return state
     }
}