import reverseHiearchy from './reverse_hiearchy'
import hiearchy from './hiearchy'
import active from './active'
import name from './name'
import tbosRootPath from './tbos_root_path'
import nameToTasks from './name_to_tasks'
import taskAggregates from './task_aggregates'
import tbosCookieTrail from './tbos_cookie_trail'
import checkedCookieTrails from './checked_cookie_trails'
import undoable, { distinctState , excludeAction} from 'redux-undo'
import position from './position';
import {ActionType} from './../actions/tbos/action_type';
import base from './base';
import lastAction from './last_action';

function tbosReducers(state = {}, action) {
  if(action.type == ActionType.GET_TASKS) {
    return base(state, action);
  }
  let intermediateResults = {
    reverseHiearchy: reverseHiearchy(state.reverseHiearchy, action),
    hiearchy: hiearchy(state.hiearchy, action),
    active: active(state, action),
    name: name(state.name, action),
    tbosRootPath:tbosRootPath(state.tbosRootPath, action),
    nameToTasks: nameToTasks(state.nameToTasks, action),
    maxCookieVision: state["maxCookieVision"],
    position: position(state.position, action),
    lastAction: lastAction(state.lastAction, action)
  }

  intermediateResults["taskAggregates"] = state["taskAggregates"];
  intermediateResults = Object.assign(intermediateResults, {taskAggregates: taskAggregates(intermediateResults, action)})
  intermediateResults["tbosCookieTrail"] = state["tbosCookieTrail"];

  intermediateResults = Object.assign(intermediateResults, tbosCookieTrail(intermediateResults, action))
  return intermediateResults;
}

function reducers(state = {}, action) {

  let firstResult = tbosReducers(state, action);
  return Object.assign(firstResult, {checkedCookieTrails: checkedCookieTrails(state.checkedCookieTrails, action)});
}

export default function undoableState(state = {}, action) {

  return Object.assign(undoable(reducers, {
        filter: excludeAction([ActionType.TOGGLE_TRAIL]),
        undoType: ActionType.UNDO,
        ignoreInitialState: true
      })(state, action), {
        lastAction: action
      })

};
