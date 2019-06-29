import {ActionType} from './action_type'


export function popTaskTbosRoot() {
  return {
    type: ActionType.TBOS_POP_ROOT
  }
}

export function addTaskTbosRoot(taskId){
  return {
    type: ActionType.TBOS_ADD_ROOT,
    taskId: taskId
  }
}

export function popTaskTbosRootUntil(taskId) {
  return {
    type: ActionType.TBOS_POP_ROOT_UNTIL,
    taskId: taskId
  }
}
