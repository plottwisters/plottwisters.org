import reverseHiearchy from './reverse_hiearchy'
import hiearchy from './hiearchy'
import active from './active'
import name from './name'
import tbosRootPath from './tbos_root_path'
import nameToTasks from './name_to_tasks'
import taskAggregates from './task_aggregates'
export default function reducers(state = {}, action) {
  let results = {
    reverseHiearchy: reverseHiearchy(state.reverseHiearchy, action),
    hiearchy: hiearchy(state.hiearchy, action),
    active: active(state, action),
    name: name(state.name, action),
    tbosRootPath:tbosRootPath(state.tbosRootPath, action),
    nameToTasks: nameToTasks(state.nameToTasks, action)
  }
  results = Object.assign(results, {taskAggregates: taskAggregates(state, action)})
  return results;
}
