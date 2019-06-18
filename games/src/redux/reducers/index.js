import reverseHiearchy from './reverse_hiearchy'
import hiearchy from './hiearchy'
import active from './active'
import name from './name'
import tbosRootPath from './tbos_root_path'
import nameToTasks from './name_to_tasks'
import taskAggregates from './task_aggregates'
import tbosCookieTrail from './tbos_cookie_trail'
import checkedCookieTrails from './checked_cookie_trails'
export default function reducers(state = {}, action) {
  let intermediateResults = {
    reverseHiearchy: reverseHiearchy(state.reverseHiearchy, action),
    hiearchy: hiearchy(state.hiearchy, action),
    active: active(state, action),
    name: name(state.name, action),
    tbosRootPath:tbosRootPath(state.tbosRootPath, action),
    nameToTasks: nameToTasks(state.nameToTasks, action),
    checkedCookieTrails: checkedCookieTrails(state.checkedCookieTrails, action),
    maxCookieVision: state["maxCookieVision"]
  }
  intermediateResults["taskAggregates"] = state["taskAggregates"];
  intermediateResults = Object.assign(intermediateResults, {taskAggregates: taskAggregates(intermediateResults, action)})
  intermediateResults["tbosCookieTrail"] = state["tbosCookieTrail"];

  intermediateResults = Object.assign(intermediateResults, tbosCookieTrail(intermediateResults, action))
  return intermediateResults;
}
