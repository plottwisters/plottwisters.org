import {ActionType} from './action_type'
const uuidv1 = require('uuid/v1');

export function deleteTaskAction(taskId, currentRoot) {
  return {
    type: ActionType.DELETE_TASK,
    taskId,
    currentRoot
  }
}

export function completeTaskAction(taskId, currentRoot, timestamp = new Date().getTime()) {
  return {
    type: ActionType.COMPLETE_TASK,
    taskId,
    currentRoot,
    timestamp
  }
}


export function createNewTaskAction(taskAKey, taskBKey, name, currentRoot) {
  let uuid=uuidv1();
  uuid=(uuid.split('-').join(""))

  return {
    type: ActionType.CREATE_TASK_COLLISION,
    taskA: taskAKey,
    taskB: taskBKey,
    taskId: uuid,
    taskName: name,
    currentRoot
  }
}
export function createNewTasksAction(tasks, currentRoot) {
  return {
    type: ActionType.CREATE_TASKS,
    tasks,
    currentRoot
  }
}
