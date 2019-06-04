import * as ActionType from './../actions/action_type'
import reverseHiearchy from './reverse_hiearchy'
import hiearchy from './hiearchy'
import active from './active'


export default function reducers(state = {}, action) {
  return {
    reverseHiearchy: reverseHiearchy(state.reverseHiearchy, action),
    hiearchy: hiearchy(state.hiearchy, action),
    active: active(state.active, action)
  }
}
