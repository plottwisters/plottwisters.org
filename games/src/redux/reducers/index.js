import reverseHiearchy from './reverse_hiearchy'
import hiearchy from './hiearchy'
import active from './active'


export default function reducers(state = {}, action) {
  return {
    reverseHiearchy: reverseHiearchy(state.reverseHiearchy, action),
    hiearchy: hiearchy(state.hiearchy, action),
    active: active(state.active, action),
    name: name(state.name, action),
    tbosRootPath:tbosRootPath(state.tbosRootPath, action)
  }
}
